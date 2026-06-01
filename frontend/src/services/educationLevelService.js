import { apiFetch, authHeader } from './api';

export const selectEducationLevel = async (educationLevel) => {

  if (!educationLevel) {
    throw new Error('Wajib memilih jenjang pendidikan sebelum memulai pre-test.');
  }

  return apiFetch('/education-levels/select', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
};