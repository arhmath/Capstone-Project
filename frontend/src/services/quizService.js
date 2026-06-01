import { apiFetch, authHeader } from './api';

export const getQuizById = async (quizId) => {
  return apiFetch(`/quizzes/${quizId}`, {
    headers: authHeader(),
  });
};

export const createQuizSession = async (quizId) => {
  return apiFetch(`/quizzes/${quizId}/sessions`, {
    method: 'POST',
    headers: authHeader(),
  });
};

export const submitQuizAnswer = async (sessionId, { questionId, optionId, timeTaken }) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ questionId, optionId, timeTaken }),
  });
};

export const finishQuizSession = async (sessionId) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/finish`, {
    method: 'POST',
    headers: authHeader(),
  });
};

export const getQuizResult = async (sessionId) => {
  return apiFetch(`/quizzes/sessions/${sessionId}/result`, {
    headers: authHeader(),
  });
};