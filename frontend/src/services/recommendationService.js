import { apiFetch, authHeader } from './api';

export const requestRecommendation = async (sessionId) => {
  return apiFetch(`/recommendations/sessions/${sessionId}`, {
    method: 'POST',
    headers: authHeader(),
  });
};

export const getSavedRecommendations = async (sessionId) => {
  return apiFetch(`/recommendations/sessions/${sessionId}`, {
    headers: authHeader(),
  });
};

export const getOrRequestRecommendation = async (sessionId) => {
  try {
    return await requestRecommendation(sessionId);
  } catch (err) {
    if (err.status === 409) {
      return getSavedRecommendations(sessionId);
    }
    throw err;
  }
};