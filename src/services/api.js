// src/services/api.js
// Base helper — semua service pakai file ini

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Ambil token dari localStorage.
 * Token disimpan saat login berhasil.
 */
const getToken = () => localStorage.getItem('mq_token');

/**
 * Header standar untuk request yang butuh autentikasi.
 */
export const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

/**
 * Header untuk request publik (tanpa token).
 */
export const publicHeader = () => ({
  'Content-Type': 'application/json',
});

/**
 * Wrapper fetch utama.
 * Otomatis parse JSON dan lempar error jika success: false.
 *
 * @param {string} endpoint  - Path setelah BASE_URL, contoh: '/auth/login'
 * @param {object} options   - Fetch options (method, headers, body, dll)
 * @returns {Promise<any>}   - data dari response.data
 */
export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const json = await res.json();

  if (!json.success) {
    // Lempar error dengan pesan dari backend
    const err = new Error(json.message || 'Terjadi kesalahan');
    err.status = res.status;
    err.errors = json.errors || null; // validation errors dari express-validator
    throw err;
  }

  return json.data;
};

/**
 * Mapping jenjang FE → BE.
 * FE pakai "SD/SMP/SMA", BE pakai enum "primary/middle/high".
 */
export const jenjangToLevel = {
  SD:  'primary',
  SMP: 'middle',
  SMA: 'high',
};

/**
 * Mapping balik BE → FE (untuk display).
 */
export const levelToJenjang = {
  primary: 'SD',
  middle:  'SMP',
  high:    'SMA',
};