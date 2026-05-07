const prisma = require('../config/prisma');

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
            select: { topic: true },
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
    const err = new Error('Selesaikan pretest terlebih dahulu sebelum mendapatkan rekomendasi');
    err.status = 400;
    throw err;
  }

  // Hitung statistik per topik
  const topicStats = {};

  for (const answer of session.answers) {
    const topic = answer.question.topic;

    if (!topicStats[topic]) {
      topicStats[topic] = { correct: 0, total: 0, totalDuration: 0 };
    }

    topicStats[topic].total += 1;
    topicStats[topic].totalDuration += answer.timeTakenSeconds || 0;
    if (answer.isCorrect) topicStats[topic].correct += 1;
  }

  // Format sesuai kontrak AI
  const topicScores = {};
  for (const [topic, stat] of Object.entries(topicStats)) {
    topicScores[topic] = {
      score: Math.round((stat.correct / stat.total) * 100),
      average_duration_seconds: Math.round(stat.totalDuration / stat.total),
      number_of_questions: stat.total,
    };
  }

  return {
    user_id: userId,
    topic_scores: topicScores,
  };
};

// Helper: resolve detail modul dari DB berdasarkan id rekomendasi AI
const resolveModules = async (recommendations) => {
  const moduleIds = recommendations.map((r) => r.module_id);

  const modules = await prisma.module.findMany({
    where: { id: { in: moduleIds } },
    select: {
      id: true,
      title: true,
      topic: true,
      educationLevel: true,
      orderIndex: true,
      xpReward: true,
    },
  });

  const moduleMap = Object.fromEntries(modules.map((m) => [m.id, m]));

  return recommendations.map((rec) => ({
    module_id: rec.module_id,
    confidence: rec.confidence,
    module: moduleMap[rec.module_id] ?? null,
  }));
};

// Helper: simpan rekomendasi ke DB
const saveRecommendations = async (userId, sessionId, recommendations) => {
  // Hapus semua rekomendasi lama untuk sesi ini (jika ada)
  await prisma.aiRecommendation.deleteMany({
    where: {
      userId,
      pretestSessionId: sessionId, 
    },
  });

  const data = recommendations.map((rec) => ({
    userId,
    pretestSessionId: sessionId,  
    recommendedModuleId: rec.module_id,
    confidence: rec.confidence,
  }));

  await prisma.aiRecommendation.createMany({ data });
};

// 1. REQUEST RECOMMENDATION — kirim ke AI & simpan hasilnya
const requestRecommendation = async (userId, sessionId) => {
  // Cek apakah rekomendasi sudah pernah dibuat untuk sesi ini
  const existing = await prisma.aiRecommendation.findFirst({
    where: {
      userId,
      pretestSessionId: sessionId, 
    },
    select: { id: true, createdAt: true },
  });

  if (existing) {
    const err = new Error('Rekomendasi untuk sesi ini sudah pernah dibuat');
    err.status = 409;
    err.data = { alreadyExists: true };
    throw err;
  }

  const aiServiceUrl = process.env.AI_SERVICE_URL;
  if (!aiServiceUrl) {
    const err = new Error('AI service belum tersedia, coba beberapa saat lagi');
    err.status = 503;
    throw err;
  }

  // Bangun payload
  const payload = await buildAiPayload(userId, sessionId);

  // Kirim ke AI
  let aiResponse;
  try {
    const response = await fetch(aiServiceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = new Error('AI service gagal memproses permintaan');
      err.status = 502;
      throw err;
    }

    aiResponse = await response.json();
  } catch (fetchErr) {
    if (fetchErr.status) throw fetchErr;
    const err = new Error('Tidak dapat terhubung ke AI service, coba lagi nanti');
    err.status = 503;
    throw err;
  }

  // Validasi struktur respons AI
  if (!aiResponse?.recommendations || !Array.isArray(aiResponse.recommendations)) {
    const err = new Error('Respons AI tidak valid');
    err.status = 502;
    throw err;
  }

  // Resolve modul & simpan
  const recommendations = await resolveModules(aiResponse.recommendations);
  await saveRecommendations(userId, sessionId, aiResponse.recommendations);

  return {
    user_id: userId,
    session_id: sessionId,
    recommendations,
  };
};

// 2. GET SAVED RECOMMENDATIONS — ambil rekomendasi tersimpan
const getSavedRecommendations = async (userId, sessionId) => {
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

  const saved = await prisma.aiRecommendation.findMany({
    where: {
      userId,
      pretestSessionId: sessionId, 
    },
    select: {
      id: true,
      userId: true,
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
    orderBy: { confidence: 'desc' },
  });

  return {
    total: saved.length,
    recommendations: saved,
  };
};

module.exports = { requestRecommendation, getSavedRecommendations };