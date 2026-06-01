const prisma = require('../config/prisma');
const { checkAchievements } = require('./achievement.service');

// Helper: bangun payload AI dari data pretest session
const buildAiPayload = async (userId, sessionId) => {
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      status: true,
      answers: {
        select: {
          isCorrect: true,
          timeTakenSeconds: true,
          question: {
            select: {
              topic: true,
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

  if (session.status !== 'completed') {
    const err = new Error(
      'Selesaikan pretest terlebih dahulu sebelum mendapatkan rekomendasi'
    );

    err.status = 400;

    throw err;
  }

  // Build records sesuai schema FastAPI
  const records = session.answers.map(
    (answer, index) => ({
      user_id: userId,

      // nomor urut manual
      no_soal: index + 1,

      materi: answer.question.topic,

      benar_salah: answer.isCorrect ? 1 : 0,

      // fallback minimal 1 detik
      waktu_pengerjaan:
        answer.timeTakenSeconds > 0
          ? answer.timeTakenSeconds
          : 1,
    })
  );

  return {
    records,
  };
};

// Helper: resolve weak topic -> module
const resolveModulesFromWeakTopics = async (
  weakRecommendations,
  userId
) => {
  // Ambil jenjang user
  const userEducation = await prisma.userEducationLevel.findFirst({
    where: { userId },
    select: { educationLevel: true },
  });

  const educationLevel = userEducation?.educationLevel;

  const results = [];

  for (const rec of weakRecommendations) {
    // Cari module berdasarkan topic + jenjang
    const module = await prisma.module.findFirst({
      where: {
        topic: rec.weak_topic,
        educationLevel,
        isPublished: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
      select: {
        id: true,
        title: true,
        topic: true,
        educationLevel: true,
        orderIndex: true,
        xpReward: true,
      },
    });

    results.push({
      weak_topic: rec.weak_topic,
      confidence: rec.confidence,
      module,
    });
  }

  return results;
};

// Helper: simpan rekomendasi ke DB
const saveRecommendations = async (
  userId,
  sessionId,
  recommendations
) => {

  console.log(
    JSON.stringify(recommendations, null, 2)
  );
  // Hapus rekomendasi lama
  await prisma.aiRecommendation.deleteMany({
    where: {
      userId,
      pretestSessionId: sessionId,
    },
  });

  // Filter hanya yang punya module
  const validRecommendations = recommendations.filter(
    (rec) => rec.module
  );

  if (validRecommendations.length === 0) {
    return;
  }

  const data = validRecommendations.map((rec) => ({
    userId,
    pretestSessionId: sessionId,
    recommendedModuleId: rec.module.id,
    confidence: rec.confidence,
  }));

  // Karena pretestSessionId unique
  // simpan hanya confidence tertinggi
  const bestRecommendation = data.sort(
    (a, b) => b.confidence - a.confidence
  )[0];

  await prisma.aiRecommendation.create({
    data: bestRecommendation,
  });

  const newAchievements = await checkAchievements(userId, 'recommendation_received');
};

// 1. REQUEST RECOMMENDATION
const requestRecommendation = async (userId, sessionId) => {
  // Cek apakah sudah pernah dibuat
  const existing = await prisma.aiRecommendation.findFirst({
    where: {
      userId,
      pretestSessionId: sessionId,
    },
    select: {
      id: true,
      createdAt: true,
    },
  });

  if (existing) {
    const err = new Error(
      'Rekomendasi untuk sesi ini sudah pernah dibuat'
    );

    err.status = 409;
    err.data = { alreadyExists: true };

    throw err;
  }

  const aiServiceUrl = process.env.AI_SERVICE_URL;

  if (!aiServiceUrl) {
    const err = new Error(
      'AI service belum tersedia, coba beberapa saat lagi'
    );

    err.status = 503;

    throw err;
  }

  // Build payload
  const payload = await buildAiPayload(userId, sessionId);

  // Request ke AI
  let aiResponse;

  try {
    const response = await fetch(aiServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = new Error(
        'AI service gagal memproses permintaan'
      );

      err.status = 502;

      throw err;
    }

    aiResponse = await response.json();
  } catch (fetchErr) {
    if (fetchErr.status) throw fetchErr;

    const err = new Error(
      'Tidak dapat terhubung ke AI service, coba lagi nanti'
    );

    err.status = 503;

    throw err;
  }

  /**
   * Format AI response sekarang:
   * {
   *   recommendations: [
   *     {
   *       weak_topic: "Mathematics",
   *       confidence: 0.91
   *     }
   *   ]
   * }
   */

  if (
    !aiResponse?.weak_topics ||
    !Array.isArray(aiResponse.weak_topics)
  ) {
    const err = new Error('Respons AI tidak valid');
    err.status = 502;
    throw err;
  }

  // Resolve weak topic -> module
  const weakRecommendations =
    aiResponse.weak_topics.map((topic) => ({
      weak_topic: topic,
      confidence: aiResponse.confidence,
    }));

  const recommendations =
    await resolveModulesFromWeakTopics(
      weakRecommendations,
      userId
    );


  // Simpan ke DB
  await saveRecommendations(
    userId,
    sessionId,
    recommendations
  );

  return {
    user_id: userId,
    session_id: sessionId,
    recommendations,
  };
};

// 2. GET SAVED RECOMMENDATIONS
const getSavedRecommendations = async (
  userId,
  sessionId
) => {
  const session = await prisma.pretestSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      userId: true,
      status: true,
    },
  });

  if (!session) {
    const err = new Error('Sesi pretest tidak ditemukan');

    err.status = 404;

    throw err;
  }

  if (session.userId !== userId) {
    const err = new Error(
      'Akses ditolak untuk sesi ini'
    );

    err.status = 403;

    throw err;
  }

  const saved = await prisma.aiRecommendation.findMany({
    where: {
      userId,
      pretestSessionId: sessionId,
    },
    select: {
      id: true,
      confidence: true,
      createdAt: true,
      module: {
        select: {
          id: true,
          title: true,
          topic: true,
          educationLevel: true,
          orderIndex: true,
          xpReward: true,
        },
      },
    },
    orderBy: {
      confidence: 'desc',
    },
  });

  return {
    total: saved.length,
    recommendations: saved,
  };
};

module.exports = {
  requestRecommendation,
  getSavedRecommendations,
};