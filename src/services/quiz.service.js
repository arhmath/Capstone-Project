const prisma = require('../config/prisma');
const { updateUserStreak } = require('./streak.service');
const { checkAchievements } = require('./achievement.service');
const { grantXp } = require('./xp.service');

// Helper: hitung XP per soal berdasarkan waktu menjawab
const calculateQuestionXp = (baseXp, timeLimitSeconds, timeTakenSeconds) => {
  if (timeTakenSeconds >= timeLimitSeconds) return Math.floor(baseXp * 0.5);
  const timeBonus = 1 - timeTakenSeconds / timeLimitSeconds;
  return Math.floor(baseXp * (0.5 + 0.5 * timeBonus));
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
  await prisma.quizSession.updateMany({
    where: {
      userId,
      quizId,
      status: 'in_progress',
    },
    data: {
      status: 'completed',
      completedAt: new Date(),
    },
  });

  // Buat sesi baru
  const session = await prisma.quizSession.create({
    data: {
      userId,
      quizId,
      status: 'in_progress',
      startedAt: new Date(),
    },
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
const submitAnswer = async (
  sessionId,
  userId,
  questionId,
  optionId,
  timeTaken
) => {
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

  // Cek apakah soal sudah dijawab
  const alreadyAnswered = await prisma.quizAnswer.findFirst({
    where: {
      sessionId,
      questionId,
    },
    select: {
      id: true,
    },
  });

  if (alreadyAnswered) {
    const err = new Error(
      'Soal sudah dijawab dalam sesi ini'
    );
    err.status = 409;
    throw err;
  }

  // Ambil opsi yang dipilih + data soal
  const selectedOption =
    await prisma.questionOption.findUnique({
      where: { id: optionId },
      select: {
        id: true,
        optionText: true,
        isCorrect: true,
        explanation: true,

        question: {
          select: {
            id: true,
            questionText: true,
            baseXp: true,
            timeLimitSeconds: true,

            quiz: {
              select: {
                module: {
                  select: {
                    title: true,
                  },
                },
              },
            },

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
      },
    });

  if (!selectedOption) {
    const err = new Error(
      'Opsi jawaban tidak ditemukan'
    );
    err.status = 404;
    throw err;
  }

  if (selectedOption.question.id !== questionId) {
    const err = new Error(
      'Opsi tidak termasuk dalam soal yang diberikan'
    );
    err.status = 400;
    throw err;
  }

  const isCorrect = selectedOption.isCorrect;

  // Hitung XP
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

  // Ambil jawaban benar
  const correctOption =
    await prisma.questionOption.findFirst({
      where: {
        questionId,
        isCorrect: true,
      },
      select: {
        id: true,
        optionText: true,
        explanation: true,
      },
    });

  let generatedExplanation = null;

  const emptyExplanation =
    selectedOption.explanation == null ||
    selectedOption.explanation.trim().length === 0;

  console.log(
    'EXPLANATION DB:',
    selectedOption.explanation
  );

  console.log(
    'EMPTY EXPLANATION:',
    emptyExplanation
  );

  if (emptyExplanation) {
    try {
      const pilihan = {};

      // Mapping pilihan menjadi A, B, C, D, dst.
      selectedOption.question.options.forEach((opt, index) => {
        const key = String.fromCharCode(65 + index);
        pilihan[key] = opt.optionText;
      });

      // Cari key jawaban siswa
      const jawabanSiswaKey =
        Object.entries(pilihan).find(
          ([_, value]) => value === selectedOption.optionText
        )?.[0] || '';

      // Cari key jawaban benar
      const jawabanBenarKey =
        Object.entries(pilihan).find(
          ([_, value]) => value === correctOption?.optionText
        )?.[0] || '';

      console.log('GEN URL:', process.env.GEN_AI_SERVICE_URL);

      // Request ke FastAPI AI Service
      const response = await fetch(process.env.GEN_AI_SERVICE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          soal: selectedOption.question.questionText,
          pilihan,
          jawaban_siswa: jawabanSiswaKey,
          jawaban_benar: jawabanBenarKey,
          materi:
            selectedOption.question.quiz?.module?.title || 'Matematika',
          jenjang: 'sma',
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Service Error ${response.status}`);
      }

      const aiData = await response.json();

      console.log('AI RESPONSE:', aiData);

      generatedExplanation = aiData?.pembahasan || null;

      // Simpan pembahasan ke database
      if (generatedExplanation) {
        await prisma.questionOption.update({
          where: {
            id: optionId,
          },
          data: {
            explanation: generatedExplanation,
          },
        });
      }
    } catch (error) {
      console.error(
        'Gagal generate pembahasan AI FULL:',
        error
      );
    }


  }
  return {
    questionId,
    selectedOptionId: optionId,
    isCorrect,
    xpEarned,

    explanation:
      selectedOption.explanation ||
      generatedExplanation ||
      null,

    correctOption: isCorrect
      ? null
      : {
        id: correctOption?.id,
        optionText: correctOption?.optionText || null,
      },
  };
};

// 5. FINISH SESSION — hitung skor, grant XP, update module progress
const finishSession = async (sessionId, userId) => {
  const session = await prisma.quizSession.findUnique({
    where: { id: sessionId },
    select: { id: true, userId: true, quizId: true, status: true, startedAt: true },
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

  const answers = await prisma.quizAnswer.findMany({
    where: { sessionId },
    select: { isCorrect: true, xpEarned: true, timeTakenSeconds: true },
  });

  if (answers.length === 0) {
    const err = new Error('Tidak ada jawaban ditemukan untuk sesi ini');
    err.status = 400;
    throw err;
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: session.quizId },
    select: { passingScore: true, maxXp: true, moduleId: true },
  });

  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const totalScore = Math.round((totalCorrect / answers.length) * 100);
  const totalXpFromQuiz = answers.reduce((sum, a) => sum + a.xpEarned, 0);
  const totalDuration = answers.reduce((sum, a) => sum + a.timeTakenSeconds, 0);
  const isPassed = totalScore >= quiz.passingScore;

  const moduleBonusXp = isPassed ? quiz.maxXp : 0;
  const totalXpToGrant = totalXpFromQuiz + moduleBonusXp;

  const result = await prisma.$transaction(async (tx) => {
    const completed = await tx.quizSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        totalScore,
        totalXpEarned: totalXpToGrant,
        durationSeconds: totalDuration,
        completedAt: new Date(),
      },
      select: {
        id: true, quizId: true, totalScore: true, totalXpEarned: true,
        durationSeconds: true, status: true, startedAt: true, completedAt: true,
      },
    });

    let userXpResult = null;
    if (totalXpToGrant > 0) {
      userXpResult = await grantXp(userId, totalXpToGrant, 'quiz', sessionId, tx);
    }

    if (moduleBonusXp > 0) {
      await tx.userModuleProgress.upsert({
        where: { userId_moduleId: { userId, moduleId: quiz.moduleId } },
        update: { isCompleted: true, xpEarned: moduleBonusXp, completedAt: new Date() },
        create: { userId, moduleId: quiz.moduleId, isCompleted: true, xpEarned: moduleBonusXp, completedAt: new Date() },
      });
    }

    if (!userXpResult) {
      userXpResult = await tx.userXp.findUnique({
        where: { userId },
        select: { totalXp: true, level: true },
      });
    }

    const { streak, newAchievements: streakAch } = await updateUserStreak(userId, tx);

    return { completed, userXpResult, streak, streakAch };
  }, {
    timeout: 10000,
  });

  const extraAchievements = [];
  if (isPassed) {
    const quizAch = await checkAchievements(userId, 'quiz_passed', { totalScore }, prisma);
    extraAchievements.push(...quizAch);
  }

  if (moduleBonusXp > 0) {
    const moduleAch = await checkAchievements(userId, 'module_completed', {}, prisma);
    extraAchievements.push(...moduleAch);
  }

  // Bungkus semua notifikasi
  const notifications = [];
  if (result.userXpResult?.xpGained) {
    notifications.push({ type: 'xp_gained', xpGained: result.userXpResult.xpGained, totalXp: result.userXpResult.totalXp });
  }
  if (result.userXpResult?.leveledUp) {
    notifications.push({ type: 'level_up', levelBefore: result.userXpResult.levelBefore, levelNow: result.userXpResult.level });
  }
  if (result.userXpResult?.newAchievements?.length > 0) {
    notifications.push(...result.userXpResult.newAchievements.map((a) => ({ type: 'achievement', ...a })));
  }
  if (result.streak) {
    notifications.push({ type: 'streak_updated', currentStreak: result.streak.currentStreak });
  }
  if (result.streakAch?.length > 0) {
    notifications.push(...result.streakAch.map((a) => ({ type: 'achievement', ...a })));
  }
  if (extraAchievements.length > 0) {
    notifications.push(...extraAchievements.map((a) => ({ type: 'achievement', ...a })));
  }

  return {
    ...result.completed,
    totalCorrect,
    totalAnswers: answers.length,
    totalXpFromQuiz,
    moduleBonusXp,
    isPassed,
    userXp: result.userXpResult,
    notifications,
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