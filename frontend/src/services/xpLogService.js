import { apiFetch, authHeader } from './api';

export const getXpLogs = async (limit = 5) => {
  const params = new URLSearchParams();

  params.append('limit', String(limit));

  return apiFetch(`/gamification/xp/log?${params.toString()}`, {
    headers: authHeader(),
  });
};