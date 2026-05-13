// src/services/moduleService.js
// Endpoint: /api/modules
// Routes:
//   GET /              → list modul sesuai jenjang user (dari token)
//   GET /:id           → detail modul + progress user
//   GET /:id/pages/:pageNumber → konten halaman
//   PUT /:id/progress  → update halaman terakhir yang dibaca

import { apiFetch, authHeader } from './api';

/**
 * Ambil semua modul sesuai jenjang user yang sedang login.
 * Jenjang diambil otomatis dari token di BE — FE tidak perlu kirim parameter.
 *
 * Response: {
 *   educationLevel: "primary",
 *   total: 6,
 *   modules: [
 *     {
 *       id, title, description, educationLevel, topic,
 *       orderIndex, xpReward, createdAt,
 *       _count: { pages: 5 },
 *       progress: { lastPage, isCompleted, xpEarned } | null,
 *       isRecommended: true | false,
 *       confidence: 0.92 | null
 *     }
 *   ]
 * }
 *
 * Dipakai di QuestMap.jsx untuk menampilkan daftar modul/quest.
 */
export const getModules = async () => {
  return apiFetch('/modules', {
    headers: authHeader(),
  });
  // Returns: { educationLevel, total, modules }
};

/**
 * Ambil detail satu modul + daftar halaman + progress user.
 *
 * Response: {
 *   id, title, description, educationLevel, topic,
 *   orderIndex, xpReward, isPublished, createdAt,
 *   pages: [{ id, pageNumber, sceneTitle, pageType }],
 *   _count: { pages: 5 },
 *   progress: { lastPage, isCompleted, xpEarned, startedAt, completedAt } | null,
 *   isRecommended: boolean,
 *   confidence: number | null
 * }
 */
export const getModuleById = async (moduleId) => {
  return apiFetch(`/modules/${moduleId}`, {
    headers: authHeader(),
  });
  // Returns: detail modul
};

/**
 * Ambil konten satu halaman modul.
 * Dipakai saat user membaca modul halaman demi halaman.
 *
 * Response: {
 *   id, pageNumber, sceneTitle,
 *   storyContent,       ← teks utama halaman
 *   illustrationUrl,    ← URL gambar (bisa null)
 *   pageType,           ← "story" | "explanation" | "summary"
 *   totalPages: 5,
 *   isFirstPage: true | false,
 *   isLastPage: true | false
 * }
 */
export const getModulePage = async (moduleId, pageNumber) => {
  return apiFetch(`/modules/${moduleId}/pages/${pageNumber}`, {
    headers: authHeader(),
  });
  // Returns: konten halaman
};

/**
 * Simpan progress membaca user (halaman terakhir yang dibaca).
 * Dipanggil setiap kali user pindah halaman.
 *
 * Body BE: { lastPage: number }
 *
 * Response: {
 *   moduleId, lastPage, isCompleted, xpEarned,
 *   startedAt, completedAt, totalPages
 * }
 *
 * Catatan: isCompleted di-set oleh BE hanya via finishSession quiz,
 * bukan dari endpoint ini. Endpoint ini hanya update lastPage.
 */
export const updateModuleProgress = async (moduleId, lastPage) => {
  return apiFetch(`/modules/${moduleId}/progress`, {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify({ lastPage }),
  });
  // Returns: progress terbaru
};