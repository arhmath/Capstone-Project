import { apiFetch, authHeader } from './api';

export const getMyAchievements = async () => {
  return apiFetch('/achievements/my-badges', {
    headers: authHeader(),
  });
};