// src/services/recommendationService.js
// Endpoint: /api/recommendations
// Routes:
//   POST /sessions/:sessionId  → request rekomendasi dari AI (1x per sesi)
//   GET  /sessions/:sessionId  → ambil rekomendasi yang sudah tersimpan

import { apiFetch, authHeader } from './api';

/**
 * Request rekomendasi modul dari AI berdasarkan hasil pretest.
 * Hanya bisa dipanggil SEKALI per sesi (BE return 409 jika sudah ada).
 *
 * Flow:
 *   1. User selesai pretest → finishPretestSession
 *   2. FE tampilkan hasil → ada tombol "Lihat Rekomendasi Modul"
 *   3. User klik → panggil fungsi ini
 *   4. Jika 409 (sudah ada) → panggil getSavedRecommendations
 *
 * Response: {
 *   user_id,
 *   session_id,
 *   recommendations: [
 *     {
 *       module_id,
 *       confidence: 0.92,     ← skor kepercayaan AI (0-1)
 *       module: {
 *         id, title, topic, educationLevel,
 *         orderIndex, xpReward
 *       }
 *     }
 *   ]
 * }
 */
export const requestRecommendation = async (sessionId) => {
  return apiFetch(`/recommendations/sessions/${sessionId}`, {
    method: 'POST',
    headers: authHeader(),
  });
  // Returns: { user_id, session_id, recommendations }
};

/**
 * Ambil rekomendasi yang sudah tersimpan untuk sesi pretest tertentu.
 * Dipanggil jika requestRecommendation pernah dipanggil sebelumnya (409).
 *
 * Response: {
 *   total: 3,
 *   recommendations: [
 *     {
 *       id,
 *       userId,
 *       confidence: 0.92,
 *       createdAt,
 *       module: { id, title, topic, educationLevel, orderIndex, xpReward }
 *     }
 *   ]
 * }
 *
 * Diurutkan BE dari confidence tertinggi ke terendah.
 */
export const getSavedRecommendations = async (sessionId) => {
  return apiFetch(`/recommendations/sessions/${sessionId}`, {
    headers: authHeader(),
  });
  // Returns: { total, recommendations }
};

/**
 * Helper: request atau ambil rekomendasi (handle 409 otomatis).
 * Gunakan fungsi ini di komponen agar tidak perlu handle 409 manual.
 *
 * Urutan:
 *   1. Coba POST (request baru)
 *   2. Jika error 409 (sudah ada) → GET (ambil yang tersimpan)
 *   3. Jika error lain → lempar ke caller
 */
export const getOrRequestRecommendation = async (sessionId) => {
  try {
    return await requestRecommendation(sessionId);
  } catch (err) {
    if (err.status === 409) {
      // Rekomendasi sudah pernah dibuat, ambil yang tersimpan
      return getSavedRecommendations(sessionId);
    }
    throw err; // error lain (403, 404, 503) tetap dilempar
  }
};