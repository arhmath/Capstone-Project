const prisma = require('../config/prisma');
const { updateUserStreak } = require('./streak.service');
const { checkAchievements } = require('./achievement.service');

// 1. CREATE SESSION
const createSession = async (userId, educationLevel) => {
  const session = await prisma.pretestSession.create({
    data: {
      userId,
      educationLevel,
      status: 'in_progress',
    },
    select: {
      id: true,
      userId: true,
      educationLevel: true,
      status: true,
      completedAt: true,
    },
  });

  return session;
};

// 2. Get questions untuk sesi pretest yang sedang berjalan
const getSessionQuestions = async (sessionId, userId) => {

  const TOTAL_QUESTIONS = 10;

  // VALIDASI SESSION
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      educationLevel: true,
      status: true,
    },
  });

  if (!session) {
    const err = new Error('Sesi pretest tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak');
    err.status = 403;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Sesi sudah selesai');
    err.status = 400;
    throw err;
  }

  // AMBIL MODULE BERDASARKAN EDUCATION LEVEL
  const modules = await prisma.module.findMany({
    where: {
      educationLevel: session.educationLevel,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      topic: true,
    },
    orderBy: {
      orderIndex: 'asc',
    },
  });

  if (modules.length === 0) {
    const err = new Error('Module tidak ditemukan');
    err.status = 404;
    throw err;
  }

  // HITUNG DISTRIBUSI SOAL
  const questionPerModule = Math.floor(
    TOTAL_QUESTIONS / modules.length
  );

  const remainder = TOTAL_QUESTIONS % modules.length;

  let finalQuestions = [];

  // LOOP MODULE
  for (let i = 0; i < modules.length; i++) {

    const module = modules[i];

    const takeCount =
      i < remainder
        ? questionPerModule + 1
        : questionPerModule;

    const questions = await prisma.pretestQuestion.findMany({
      where: {
        educationLevel: session.educationLevel,
        topic: module.topic,
        isActive: true,
      },

      select: {
        id: true,
        topic: true,
        questionText: true,
        imageUrl: true,
        difficulty: true,

        options: {
          select: {
            id: true,
            optionText: true,
          },
        },
      },
    });

    // RANDOM
    const shuffled = questions.sort(
      () => Math.random() - 0.5
    );

    // AMBIL SESUAI JATAH
    finalQuestions.push(
      ...shuffled.slice(0, takeCount)
    );
  }

  // SHUFFLE FINAL
  finalQuestions = finalQuestions.sort(
    () => Math.random() - 0.5
  );

  return {
    session: {
      id: session.id,
      educationLevel: session.educationLevel,
      status: session.status,
    },

    total: finalQuestions.length,

    questions: finalQuestions,
  };
};

// 3. SUBMIT ANSWER — 1 soal per request
//    Return langsung: isCorrect, explanation, correct option
const submitAnswer = async (sessionId, userId, questionId, optionId, timeTaken) => {
  // Validasi sesi
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: { id: true, userId: true, status: true },
  });

  if (!session) {
    const err = new Error('Sesi pretest tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Sesi sudah selesai');
    err.status = 400;
    throw err;
  }

  // Cek apakah soal ini sudah pernah dijawab di sesi ini
  const alreadyAnswered = await prisma.pretestAnswer.findFirst({
    where: { sessionId, questionId },
    select: { id: true },
  });

  if (alreadyAnswered) {
    const err = new Error('Soal sudah dijawab dalam sesi ini');
    err.status = 409;
    throw err;
  }

  // Ambil opsi yang dipilih beserta info benar/salah dan explanation
  const selectedOption = await prisma.pretestQuestionOption.findUnique({
    where: { id: optionId },
    select: {
      id: true,
      optionText: true,
      isCorrect: true,
      explanation: true,
      question: {
        select: {
          id: true,
          topic: true,
        },
      },
    },
  });

  if (!selectedOption) {
    const err = new Error('Opsi jawaban tidak ditemukan');
    err.status = 404;
    throw err;
  }

  // Validasi opsi milik soal yang benar
  if (selectedOption.question.id !== questionId) {
    const err = new Error('Opsi tidak termasuk dalam soal yang diberikan');
    err.status = 400;
    throw err;
  }

  const isCorrect = selectedOption.isCorrect;

  // Simpan jawaban
  await prisma.pretestAnswer.create({
    data: {
      sessionId,
      questionId,
      selectedOptionId: optionId,
      isCorrect,
      timeTakenSeconds: timeTaken,
    },
  });

  // Ambil opsi yang benar (untuk ditampilkan jika user salah)
  let correctOption = null;
  if (!isCorrect) {
    correctOption = await prisma.pretestQuestionOption.findFirst({
      where: { questionId, isCorrect: true },
      select: {
        id: true,
        optionText: true,
        explanation: true,
      },
    });
  }

  return {
    questionId,
    selectedOptionId: optionId,
    isCorrect,
    // Jika benar: tampilkan explanation dari opsi yang dipilih
    // Jika salah: tampilkan correctOption lengkap dengan explanation
    explanation: isCorrect ? selectedOption.explanation : null,
    correctOption: isCorrect ? null : correctOption,
  };
};

// 4. FINISH SESSION
//    Hitung total skor & topicScores dari semua jawaban yang sudah masuk
//    Dipanggil setelah user selesai menjawab semua soal
const finishSession = async (sessionId, userId) => {
  // Validasi sesi
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: { id: true, userId: true, status: true, completedAt: true },
  });

  if (!session) {
    const err = new Error('Sesi pretest tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  if (session.status === 'completed') {
    const err = new Error('Sesi sudah selesai');
    err.status = 400;
    throw err;
  }

  // Ambil semua jawaban beserta info topik
  const answers = await prisma.pretestAnswer.findMany({
    where: { sessionId },
    select: {
      isCorrect: true,
      timeTakenSeconds: true,
      question: {
        select: { topic: true },
      },
    },
  });

  if (answers.length === 0) {
    const err = new Error('Tidak ada jawaban ditemukan untuk sesi ini');
    err.status = 400;
    throw err;
  }

  // Hitung topicScores: { "Aljabar": 67, "Geometri": 100 }
  const topicStats = {};
  let totalDuration = 0;

  for (const answer of answers) {
    const topic = answer.question.topic;
    if (!topicStats[topic]) {
      topicStats[topic] = { correct: 0, total: 0 };
    }
    topicStats[topic].total += 1;
    if (answer.isCorrect) topicStats[topic].correct += 1;
    totalDuration += answer.timeTakenSeconds || 0;
  }

  const topicScores = {};
  for (const [topic, stat] of Object.entries(topicStats)) {
    topicScores[topic] = Math.round((stat.correct / stat.total) * 100);
  }

  // Hitung total skor keseluruhan
  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const totalScore = Math.round((totalCorrect / answers.length) * 100);

  // Update sesi jadi completed
  const completed = await prisma.pretestSession.update({
    where: { id: sessionId },
    data: {
      status: 'completed',
      totalScore,
      topicScores,
      durationSeconds: totalDuration,
      completedAt: new Date(),
    },
    select: {
      id: true,
      educationLevel: true,
      totalScore: true,
      topicScores: true,
      durationSeconds: true,
      status: true,
      completedAt: true,
    },
  });

  await updateUserStreak(userId);
  const newAchievements = await checkAchievements(userId, 'pretest_completed');

  return {
    ...completed,
    totalAnswers: answers.length,
    totalCorrect,
  };
};

// 5. GET RESULT — hasil lengkap dengan breakdown per soal
const getResult = async (sessionId, userId) => {
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      educationLevel: true,
      totalScore: true,
      topicScores: true,
      durationSeconds: true,
      status: true,
      completedAt: true,
      answers: {
        select: {
          id: true,
          isCorrect: true,
          timeTakenSeconds: true,
          question: {
            select: {
              id: true,
              questionText: true,
              topic: true,
              difficulty: true,
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
      },
    },
  });

  if (!session) {
    const err = new Error('Sesi pretest tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error('Akses ditolak untuk sesi ini');
    err.status = 403;
    throw err;
  }

  return session;
};

module.exports = { getSessionQuestions, createSession, submitAnswer, finishSession, getResult };