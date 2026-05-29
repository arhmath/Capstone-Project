
import { apiFetch, authHeader} from './api';

/**
 * Buat sesi pretest baru.
 * Simpan session.id di state — dibutuhkan untuk submitAnswer & finishSession.
 */
export const createPretestSession = async (educationLevel) => {

  if (!educationLevel) {
    throw new Error('Wajib memilih jenjang pendidikan sebelum memulai pre-test.');
  }

  return apiFetch('/pretest/sessions', {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ educationLevel }),
  });
  // Returns: { id, userId, educationLevel, status }
};

export const getPretestQuestions = async (sessionId) => {

  if (!sessionId) {
    throw new Error('Wajib memilih sesi pre-test sebelum mengambil soal.');
  }

  return apiFetch(`/pretest/sessions/${sessionId}/questions`, {
    headers: authHeader(),
  });
  // Returns: { educationLevel, total, questions }
};

/**
 * Kirim jawaban untuk 1 soal.
 * Dipanggil setiap kali user memilih opsi jawaban.
 *
 * FE bisa langsung tampilkan feedback benar/salah dari response ini
 * sebelum pindah ke soal berikutnya.
 */
export const submitPretestAnswer = async (sessionId, { questionId, optionId, timeTaken }) => {
  return apiFetch(`/pretest/sessions/${sessionId}/answer`, {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({ questionId, optionId, timeTaken }),
  });
};

/**
 * Selesaikan sesi pretest.
 */
export const finishPretestSession = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/finish`, {
    method: 'POST',
    headers: authHeader(),
  });
};

/**
 * Ambil hasil pretest yang sudah selesai.
 * Termasuk breakdown per soal (jawaban user + jawaban benar).
 */
export const getPretestResult = async (sessionId) => {
  return apiFetch(`/pretest/sessions/${sessionId}/result`, {
    headers: authHeader(),
  });
};