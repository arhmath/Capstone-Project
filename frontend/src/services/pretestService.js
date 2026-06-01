import { apiFetch, authHeader} from './api';

export const createPretestSession = async (educationLevel) => {

  if (!educationLevel) {
    throw new Error('Wajib memilih jenjang pendidikan sebelum memulai pre-test.');
  }

  return apiFetch('/pretest/sessions', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
};

export const getPretestQuestions = async (sessionId) => {

  if (!sessionId) {
    throw new Error('Wajib memilih sesi pre-test sebelum mengambil soal.');
  }

  return apiFetch(`/pretest/sessions/${sessionId}/questions`, {
    headers: authHeader(),
  });
};

export const submitPretestAnswer = async (sessionId, { questionId, optionId, timeTaken }) => {
  return apiFetch(`/pretest/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ questionId, optionId, timeTaken }),
  });
};

export const finishPretestSession = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/finish`, {
    method: 'POST',
    headers: authHeader(),
  });
};

export const getPretestResult = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/result`, {
    headers: authHeader(),
  });
};