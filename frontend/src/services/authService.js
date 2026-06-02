import { authHeader, apiFetch } from './api';

export const registerUser = async ({ name, email, password }) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async ({ email, password }) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getMe = async () => {
  return apiFetch('/auth/me', {
    method: 'GET',
    headers: authHeader(),
  });
};

export const logoutUser = async () => {
  return apiFetch('/auth/logout', {
    method: 'POST',
    headers: authHeader(),
  });
};

export const updateProfileApi = async ({ name, avatarUrl }) => {
  const body = {};

  if (name) body.name = name;
  if (avatarUrl) body.avatarUrl = avatarUrl;

  return apiFetch('/auth/profile', {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify(body),
  });
};