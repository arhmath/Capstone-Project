import { apiFetch, authHeader } from './api';

const EDUCATION_LEVEL_MAP = {
  SD: 'primary',
  SMP: 'middle',
  SMA: 'high',
  all: 'all',
};

export const getLeaderboard = async (educationLevel, limit = 20) => {
  const params = new URLSearchParams();

  const beValue = EDUCATION_LEVEL_MAP[educationLevel];
  if (beValue) params.append('educationLevel', beValue);
  params.append('limit', String(limit));

  return apiFetch(`/gamification/leaderboard?${params.toString()}`, {
    headers: authHeader(),
  });
};