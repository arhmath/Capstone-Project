// src/services/educationLevelService.js
// Endpoint: /api/education-levels
// Routes: POST /select

import { apiFetch, authHeader, jenjangToLevel } from './api';

/**
 * Simpan pilihan jenjang user ke database.
 *
 * BE menerima: { educationLevel: "primary" | "middle" | "high" }
 * FE mengirim: jenjang "SD" | "SMP" | "SMA" → dikonversi dulu
 *
 * Dipanggil di PilihJenjang.jsx saat user klik "Mulai Pre-Test".
 * Response: { id, userId, educationLevel, selectedAt }
 */
export const selectEducationLevel = async (jenjang) => {
  const educationLevel = jenjangToLevel[jenjang];

  if (!educationLevel) {
    throw new Error(`Jenjang tidak valid: ${jenjang}. Gunakan SD, SMP, atau SMA.`);
  }

  return apiFetch('/education-levels/select', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
  // Returns: { id, userId, educationLevel, selectedAt }
};