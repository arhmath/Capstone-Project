const getToken = () => localStorage.getItem('mq_token');

export const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const publicHeader = () => ({
  'Content-Type': 'application/json',
});

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, options);
  const json = await res.json();

  if (!json.success) {
    const err = new Error(json.message || 'Terjadi kesalahan');
    err.status = res.status;
    err.errors = json.errors || null;
    throw err;
  }

  return json.data;
};