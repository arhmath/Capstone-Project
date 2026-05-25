import { apiFetch, authHeader, publicHeader } from './api';

export const registerUser = async ({ username, email, password }) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    headers: publicHeader(),
    body: JSON.stringify({
      name: username,
      email,
      password,
    }),
  });
};

export const loginUser = async ({ email, password }) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    headers: publicHeader(),
    body: JSON.stringify({ email, password }),
  });
};

export const getMe = async () => {
  return apiFetch('/auth/me', {
    headers: authHeader(),
  });
};

export const logoutUser = async () => {
  return apiFetch('/auth/logout', {
    method: 'POST',
    headers: authHeader(),
  });
};