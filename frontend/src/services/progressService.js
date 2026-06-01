import { apiFetch, authHeader, BASE_URL } from './api';

export const getUserProgress = async () => {
  const res = await fetch(`${BASE_URL}/user/progress`, {
    headers: authHeader(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};

export const getUserAchievements = async () => {
  const res = await fetch(`${BASE_URL}/user/achievements`, {
    headers: authHeader(),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.data;
};