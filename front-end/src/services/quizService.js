// src/services/quizService.js
// Endpoint: /api/quizzes
// Routes:
//   GET  /:id                    → detail quiz + soal-soal
//   POST /:id/sessions           → mulai sesi quiz baru
//   POST /sessions/:sid/answer   → kirim jawaban 1 soal
//   POST /sessions/:sid/finish   → selesaikan sesi quiz
//   GET  /sessions/:sid/result   → ambil hasil quiz

import { apiFetch, authHeader } from './api';

/**
 * Ambil detail quiz beserta semua soal dan opsi jawaban.
 * isCorrect TIDAK dikirim BE — hanya dikirim setelah user menjawab.
 *
 * Response: {
 *   id, moduleId, title,
 *   timeLimitSeconds, passingScore, maxXp,
 *   isPublished, createdAt,
 *   questions: [
 *     {
 *       id, questionText, imageUrl,
 *       timeLimitSeconds, baseXp, orderIndex,
 *       options: [{ id, optionText }]  ← tanpa isCorrect
 *     }
 *   ],
 *   _count: { questions: 5 }
 * }
 */
export const getQuizById = async (quizId) => {
  return apiFetch(`/quizzes/${quizId}`, {
    headers: authHeader(),
  });
  // Returns: detail quiz
};

/**
 * Mulai sesi quiz baru untuk quiz tertentu.
 * Jika user masih punya sesi in_progress untuk quiz ini,
 * BE return 409 dengan activeSessionId.
 *
 * Response: {
 *   session: { id, userId, quizId, status: "in_progress", startedAt },
 *   quiz: { ... soal-soal lengkap ... }   ← sama seperti getQuizById
 * }
 *
 * Simpan session.id di state untuk submitAnswer & finishSession.
 */
export const createQuizSession = async (quizId) => {
  return apiFetch(`/quizzes/${quizId}/sessions`, {
    method: 'POST',
    headers: authHeader(),
  });
  // Returns: { session, quiz }
};

/**
 * Kirim jawaban untuk 1 soal quiz.
 * Dipanggil setiap kali user memilih opsi.
 *
 * Body BE: { questionId, optionId, timeTaken }
 *   - timeTaken: waktu menjawab dalam detik (integer, min 0)
 *
 * Response: {
 *   questionId,
 *   selectedOptionId,
 *   isCorrect: true | false,
 *   xpEarned: number,           ← XP soal ini (0 jika salah)
 *   explanation: "..." | null,  ← ada jika benar
 *   correctOption: { id, optionText, explanation } | null  ← ada jika salah
 * }
 *
 * XP dihitung BE berdasarkan seberapa cepat user menjawab:
 *   - Cepat → XP penuh
 *   - Lambat → XP berkurang (min 50% baseXp)
 */
export const submitQuizAnswer = async (sessionId, { questionId, optionId, timeTaken }) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ questionId, optionId, timeTaken }),
  });
  // Returns: { questionId, selectedOptionId, isCorrect, xpEarned, explanation, correctOption }
};

/**
 * Selesaikan sesi quiz.
 * BE menghitung skor, grant XP, dan update progress modul jika lulus.
 *
 * Response: {
 *   id, quizId, totalScore, totalXpEarned,
 *   durationSeconds, status: "completed",
 *   startedAt, completedAt,
 *   totalCorrect, totalAnswers,
 *   totalXpFromQuiz,  ← XP dari jawaban benar
 *   moduleBonusXp,    ← XP bonus jika lulus (= quiz.maxXp)
 *   isPassed: true | false,
 *   userXp: { totalXp, level, xpToNextLevel }  ← state XP user terbaru
 * }
 *
 * Jika isPassed = true, modul otomatis di-mark completed di BE.
 * Update AppContext dengan userXp terbaru dari response ini.
 */
export const finishQuizSession = async (sessionId) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/finish`, {
    method: 'POST',
    headers: authHeader(),
  });
  // Returns: hasil lengkap sesi
};

/**
 * Ambil hasil quiz yang sudah selesai.
 * Termasuk breakdown per soal.
 *
 * Response: {
 *   id, quizId, totalScore, totalXpEarned, isPassed,
 *   quiz: { title, passingScore, maxXp },
 *   answers: [
 *     {
 *       id, isCorrect, xpEarned, timeTakenSeconds,
 *       question: { id, questionText, imageUrl, orderIndex, options: [...] },
 *       selectedOption: { id, optionText, isCorrect, explanation }
 *     }
 *   ]
 * }
 */
export const getQuizResult = async (sessionId) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/result`, {
    headers: authHeader(),
  });
  // Returns: hasil lengkap dengan breakdown per soal
};