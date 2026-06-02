import { apiFetch, authHeader } from './api';

export const getUserProgress = async () => {
  return apiFetch('/user/progress', {
    headers: authHeader(),
  });
};

export const getUserAchievements = async () => {
  return apiFetch('/user/achievements', {
    headers: authHeader(),
  });
};