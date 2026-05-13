// src/services/pretestService.js
// Endpoint: /api/pretest
// Routes:
//   GET  /questions?educationLevel=
//   POST /sessions
//   POST /sessions/:id/answer
//   POST /sessions/:id/finish
//   GET  /sessions/:id/result

import { apiFetch, authHeader, jenjangToLevel } from './api';

/**
 * Ambil daftar soal pretest berdasarkan jenjang.
 *
 * BE query param: educationLevel = "primary" | "middle" | "high"
 * FE kirim: jenjang "SD" | "SMP" | "SMA" → dikonversi otomatis
 *
 * Response: {
 *   educationLevel: "primary",
 *   total: 10,
 *   questions: [
 *     {
 *       id, topic, questionText, imageUrl, difficulty,
 *       options: [{ id, optionText }]   ← isCorrect TIDAK dikirim BE
 *     }
 *   ]
 * }
 *
 * Dipanggil di Pretest.jsx saat halaman dimuat.
 */
export const getPretestQuestions = async (jenjang) => {
  const educationLevel = jenjangToLevel[jenjang];

  if (!educationLevel) {
    throw new Error(`Jenjang tidak valid: ${jenjang}`);
  }

  return apiFetch(`/pretest/questions?educationLevel=${educationLevel}`, {
    headers: authHeader(),
  });
  // Returns: { educationLevel, total, questions }
};

/**
 * Buat sesi pretest baru.
 * Harus dipanggil SEBELUM menjawab soal.
 *
 * Body BE: { educationLevel: "primary" | "middle" | "high" }
 * Response: { id, userId, educationLevel, status: "in_progress" }
 *
 * Simpan session.id di state — dibutuhkan untuk submitAnswer & finishSession.
 */
export const createPretestSession = async (jenjang) => {
  const educationLevel = jenjangToLevel[jenjang];

  if (!educationLevel) {
    throw new Error(`Jenjang tidak valid: ${jenjang}`);
  }

  return apiFetch('/pretest/sessions', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
  // Returns: { id, userId, educationLevel, status }
};

/**
 * Kirim jawaban untuk 1 soal.
 * Dipanggil setiap kali user memilih opsi jawaban.
 *
 * Body BE: { questionId, optionId, timeTaken }
 *   - questionId: ID soal yang dijawab
 *   - optionId  : ID opsi yang dipilih user
 *   - timeTaken : waktu menjawab dalam detik (integer)
 *
 * Response: {
 *   questionId,
 *   selectedOptionId,
 *   isCorrect: true | false,
 *   explanation: "..." | null,      ← ada jika benar
 *   correctOption: { id, optionText, explanation } | null  ← ada jika salah
 * }
 *
 * FE bisa langsung tampilkan feedback benar/salah dari response ini
 * sebelum pindah ke soal berikutnya.
 */
export const submitPretestAnswer = async (sessionId, { questionId, optionId, timeTaken }) => {
  return apiFetch(`/pretest/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ questionId, optionId, timeTaken }),
  });
  // Returns: { questionId, selectedOptionId, isCorrect, explanation, correctOption }
};

/**
 * Selesaikan sesi pretest.
 * Dipanggil SETELAH semua soal dijawab.
 * BE menghitung total skor & topic scores dari semua jawaban yang tersimpan.
 *
 * Response: {
 *   id, educationLevel,
 *   totalScore: 80,          ← persentase (0-100)
 *   topicScores: { "Aljabar": 67, "Aritmatika": 100 },
 *   durationSeconds: 120,
 *   status: "completed",
 *   completedAt,
 *   totalAnswers, totalCorrect
 * }
 */
export const finishPretestSession = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/finish`, {
    method: 'POST',
    headers: authHeader(),
  });
  // Returns: hasil lengkap sesi
};

/**
 * Ambil hasil pretest yang sudah selesai.
 * Termasuk breakdown per soal (jawaban user + jawaban benar).
 *
 * Response: {
 *   id, educationLevel, totalScore, topicScores, status, completedAt,
 *   answers: [
 *     {
 *       isCorrect, timeTakenSeconds,
 *       question: { id, questionText, topic, difficulty, options: [...] },
 *       selectedOption: { id, optionText, isCorrect, explanation }
 *     }
 *   ]
 * }
 */
export const getPretestResult = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/result`, {
    headers: authHeader(),
  });
  // Returns: hasil lengkap dengan breakdown per soal
};