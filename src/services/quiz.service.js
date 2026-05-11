const prisma = require('../config/prisma');

// Helper: hitung XP per soal berdasarkan waktu menjawab
const calculateQuestionXp = (baseXp, timeLimitSeconds, timeTakenSeconds) => {
  if (timeTakenSeconds >= timeLimitSeconds) return Math.floor(baseXp * 0.5);
  const timeBonus = 1 - timeTakenSeconds / timeLimitSeconds;
  return Math.floor(baseXp * (0.5 + 0.5 * timeBonus));
};

// Helper: hitung level dari total XP
const calculateLevel = (totalXp) => {
  const level = Math.floor(totalXp / 100) + 1;
  const xpToNextLevel = (level * 100) - totalXp;
  return { level, xpToNextLevel };
};

// Helper: tambah XP ke user (update UserXp + insert XpTransaction)
const grantXp = async (userId, xpAmount, sourceType, sourceId, tx) => {
  const client = tx ?? prisma;

  const userXp = await client.userXp.upsert({
    where: { userId },
    update: { totalXp: { increment: xpAmount } },
    create: { userId, totalXp: xpAmount },
    select: { totalXp: true },
  });

  const { level, xpToNextLevel } = calculateLevel(userXp.totalXp);

  await client.userXp.update({
    where: { userId },
    data: { level, xpToNextLevel },
  });

  await client.xpTransaction.create({
    data: {
      userId,
      xpAmount,
      sourceType,
      sourceId,
    },
  });

  return { totalXp: userXp.totalXp, level, xpToNextLevel };
};

// 1. GET QUIZ — diambil saat POST /sessions (bukan endpoint terpisah)
const getQuizWithQuestions = async (quizId) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      moduleId: true,
      title: true,
      timeLimitSeconds: true,
      passingScore: true,
      maxXp: true,
      isPublished: true,
      questions: {
        select: {
          id: true,
          questionText: true,
          imageUrl: true,
          timeLimitSeconds: true,
          baseXp: true,
          orderIndex: true,
          options: {
            select: {
              id: true,
              optionText: true,
              // isCorrect tidak dikirim ke client
            },
          },
        },
        orderBy: { orderIndex: 'asc' },
      },
    },
  });

  if (!quiz || !quiz.isPublished) {
    const err = new Error('Kuis tidak ditemukan');
    err.status = 404;
    throw err;
  }

  return quiz;
};

// 2. GET QUIZ DETAIL — endpoint GET /api/quizzes/:id
const getQuizById = async (quizId) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: {
      id: true,
      moduleId: true,
      title: true,
      timeLimitSeconds: true,
      passingScore: true,
      maxXp: true,
      isPublished: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          questionText: true,
          imageUrl: true,
          timeLimitSeconds: true,
          baseXp: true,
          orderIndex: true,
          options: {
            select: {
              id: true,
              optionText: true,
              // isCorrect tidak dikirim ke client
            },
          },
        },
        orderBy: { orderIndex: 'asc' },
      },
      _count: { select: { questions: true } },
    },
  });

  if (!quiz || !quiz.isPublished) {
    const err = new Error('Kuis tidak ditemukan');
    err.status = 404;
    throw err;
  }

  return quiz;
};

// 3. CREATE SESSION — return quiz + session sekaligus
const createSession = async (userId, quizId) => {
  const quiz = await getQuizWithQuestions(quizId);

  // Cek apakah ada sesi in_progress untuk quiz ini
  const activeSession = await prisma.quizSession.findFirst({
    where: { userId, quizId, status: 'in_progress' },
    select: { id: true },
  });

  if (activeSession) {
    const err = new Error('Masih ada sesi kuis yang belum selesai');
    err.status = 409;
    err.data = { activeSessionId: activeSession.id };
    throw err;
  }

  const session = await prisma.quizSession.create({
    data: { userId, quizId },
    select: {
      id: true,
      userId: true,
      quizId: true,
      status: true,
      startedAt: true,
    },
  });

  return { session, quiz };
};

// 4. SUBMIT ANSWER — 1 soal per request, return koreksi + xp langsung
const submitAnswer = async (sessionId, userId, questionId, optionId, timeTaken) => {
  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    select: { id: true, userId: true, status: true },
  });

  if (!session) {
    const err = new Error('Sesi kuis tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Sesi kuis sudah selesai');
    err.status = 400;
    throw err;
  }

  // Cek soal sudah dijawab di sesi ini
  const alreadyAnswered = await prisma.quizAnswer.findFirst({
    where: { sessionId, questionId },
    select: { id: true },
  });

  if (alreadyAnswered) {
    const err = new Error('Soal sudah dijawab dalam sesi ini');
    err.status = 409;
    throw err;
  }

  // Ambil opsi yang dipilih
  const selectedOption = await prisma.questionOption.findUnique({
    where: { id: optionId },
    select: {
      id: true,
      optionText: true,
      isCorrect: true,
      explanation: true,
      question: {
        select: {
          id: true,
          baseXp: true,
          timeLimitSeconds: true,
        },
      },
    },
  });

  if (!selectedOption) {
    const err = new Error('Opsi jawaban tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (selectedOption.question.id !== questionId) {
    const err = new Error('Opsi tidak termasuk dalam soal yang diberikan');
    err.status = 400;
    throw err;
  }

  const isCorrect = selectedOption.isCorrect;

  // Hitung XP soal (hanya jika benar)
  const xpEarned = isCorrect
    ? calculateQuestionXp(
        selectedOption.question.baseXp,
        selectedOption.question.timeLimitSeconds,
        timeTaken
      )
    : 0;

  // Simpan jawaban
  await prisma.quizAnswer.create({
    data: {
      sessionId,
      questionId,
      selectedOptionId: optionId,
      isCorrect,
      timeTakenSeconds: timeTaken,
      xpEarned,
    },
  });

  // Ambil opsi benar jika user salah
  let correctOption = null;
  if (!isCorrect) {
    correctOption = await prisma.questionOption.findFirst({
      where: { questionId, isCorrect: true },
      select: { id: true, optionText: true, explanation: true },
    });
  }

  return {
    questionId,
    selectedOptionId: optionId,
    isCorrect,
    xpEarned,
    explanation: isCorrect ? selectedOption.explanation : null,
    correctOption: isCorrect ? null : correctOption,
  };
};

// 5. FINISH SESSION — hitung skor, grant XP, update module progress
const finishSession = async (sessionId, userId) => {
  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      quizId: true,
      status: true,
      startedAt: true,
    },
  });

  if (!session) {
    const err = new Error('Sesi kuis tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Sesi kuis sudah selesai');
    err.status = 400;
    throw err;
  }

  // Ambil semua jawaban
  const answers = await prisma.quizAnswer.findMany({
    where: { sessionId },
    select: {
      isCorrect: true,
      xpEarned: true,
      timeTakenSeconds: true,
    },
  });

  if (answers.length === 0) {
    const err = new Error('Tidak ada jawaban ditemukan untuk sesi ini');
    err.status = 400;
    throw err;
  }

  // Ambil info quiz (untuk passingScore & maxXp & moduleId)
  const quiz = await prisma.quiz.findUnique({
    where: { id: session.quizId },
    select: {
      passingScore: true,
      maxXp: true,
      moduleId: true,
    },
  });

  // Hitung statistik
  const totalCorrect      = answers.filter((a) => a.isCorrect).length;
  const totalScore        = Math.round((totalCorrect / answers.length) * 100);
  const totalXpFromQuiz   = answers.reduce((sum, a) => sum + a.xpEarned, 0);
  const totalDuration     = answers.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
  const isPassed          = totalScore >= quiz.passingScore;

  // XP bonus dari modul jika lulus (ambil dari quiz.maxXp)
  const moduleBonusXp = isPassed ? quiz.maxXp : 0;
  const totalXpEarned = totalXpFromQuiz + moduleBonusXp;

  // Jalankan dalam transaksi
  const result = await prisma.$transaction(async (tx) => {
    // Update sesi jadi completed
    const completed = await tx.quizSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        totalScore,
        totalXpEarned,
        durationSeconds: totalDuration,
        completedAt: new Date(),
      },
      select: {
        id: true,
        quizId: true,
        totalScore: true,
        totalXpEarned: true,
        durationSeconds: true,
        status: true,
        startedAt: true,
        completedAt: true,
      },
    });

    // Grant XP dari soal
    let userXpResult = null;
    if (totalXpFromQuiz > 0) {
      userXpResult = await grantXp(userId, totalXpFromQuiz, 'quiz', sessionId, tx);
    }

    // Grant XP bonus modul jika lulus
    if (moduleBonusXp > 0) {
      userXpResult = await grantXp(userId, moduleBonusXp, 'module', session.quizId, tx);

      // Update module progress jadi completed
      await tx.userModuleProgress.upsert({
        where: { userId_moduleId: { userId, moduleId: quiz.moduleId } },
        update: {
          isCompleted: true,
          xpEarned: moduleBonusXp,
          completedAt: new Date(),
        },
        create: {
          userId,
          moduleId: quiz.moduleId,
          isCompleted: true,
          xpEarned: moduleBonusXp,
          completedAt: new Date(),
        },
      });
    }

    return { completed, userXpResult };
  });

  return {
    ...result.completed,
    totalCorrect,
    totalAnswers: answers.length,
    totalXpFromQuiz,
    moduleBonusXp,
    isPassed,
    userXp: result.userXpResult,
  };
};

// 6. GET RESULT — rekap lengkap dengan breakdown per soal
const getResult = async (sessionId, userId) => {
  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      quizId: true,
      totalScore: true,
      totalXpEarned: true,
      durationSeconds: true,
      status: true,
      startedAt: true,
      completedAt: true,
      quiz: {
        select: {
          title: true,
          passingScore: true,
          maxXp: true,
        },
      },
      answers: {
        select: {
          id: true,
          isCorrect: true,
          xpEarned: true,
          timeTakenSeconds: true,
          question: {
            select: {
              id: true,
              questionText: true,
              imageUrl: true,
              orderIndex: true,
              options: {
                select: {
                  id: true,
                  optionText: true,
                  isCorrect: true,
                  explanation: true,
                },
              },
            },
          },
          selectedOption: {
            select: {
              id: true,
              optionText: true,
              isCorrect: true,
              explanation: true,
            },
          },
        },
        orderBy: { question: { orderIndex: 'asc' } },
      },
    },
  });

  if (!session) {
    const err = new Error('Sesi kuis tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  if (session.status !== 'completed') {
    const err = new Error('Kuis belum diselesaikan');
    err.status = 400;
    throw err;
  }

  const isPassed = session.totalScore >= session.quiz.passingScore;

  return { ...session, isPassed };
};

module.exports = {
  getQuizById,
  createSession,
  submitAnswer,
  finishSession,
  getResult,
};