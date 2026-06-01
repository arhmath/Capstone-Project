const BASE_URL = 'http://localhost:5000/api';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('mq_token')}`,
});

export const registerUser = async ({ name, email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: authHeader(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: authHeader(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.message;
};

export const updateProfileApi = async ({ name, avatarUrl }) => {
  const body = {};
  if (name)      body.name = name;
  if (avatarUrl) body.avatarUrl = avatarUrl;

  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};