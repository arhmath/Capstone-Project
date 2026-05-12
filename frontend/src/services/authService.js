const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// ── Helper: parse response & handle error ────────────────────────────────────
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || data?.error || 'Terjadi kesalahan pada server.';
    throw new Error(message);
  }

  return data;
};

// ── REGISTER ─────────────────────────────────────────────────────────────────
// Sesuaikan field body dengan yang diminta backend kamu
export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  return handleResponse(response);
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
// Sesuaikan field body dengan yang diminta backend kamu
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);

  // Simpan token JWT dari response backend ke localStorage
  // Sesuaikan data?.token dengan key yang dikirim backend kamu
  // contoh lain: data?.access_token / data?.data?.token
  if (data?.token) {
    localStorage.setItem('mq_token', data.token);
  }

  return data;
};