// src/services/educationLevelService.js
// Endpoint: /api/education-levels
// Routes: POST /select

import { apiFetch, authHeader, jenjangToLevel } from './api';

/**
 * Simpan pilihan jenjang user ke database.
 *
 * Dipanggil di PilihJenjang.jsx saat user klik "Mulai Pre-Test".
 */
export const selectEducationLevel = async (educationLevel) => {

  if (!educationLevel) {
    throw new Error('Wajib memilih jenjang pendidikan sebelum memulai pre-test.');
  }

  return apiFetch('/education-levels/select', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
};