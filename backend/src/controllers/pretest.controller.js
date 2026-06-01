const pretestService = require('../services/pretest.service');
const api = require('../utils/apiResponse');

// POST /api/pretest/sessions
// Body: { educationLevel: "middle" }
const createSession = async (req, res, next) => {
  try {
    const { educationLevel } = req.body;
    const userId = req.user.id;

    const session = await pretestService.createSession(userId, educationLevel);

    return api.created(res, session, 'Sesi pretest baru berhasil dibuat');
  } catch (err) {
    next(err);
  }
};

// GET /api/pretest/sessions/:id/questions
const getSessionQuestions = async (req, res, next) => {
  try {

    const userId = req.user.id;
    const sessionId = req.params.id;

    const result = await pretestService.getSessionQuestions(
      sessionId,
      userId
    );

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil soal pretest',
      data: result,
    });

  } catch (err) {
    next(err);
  }
};

// POST /api/pretest/sessions/:id/answer
// Body: { questionId, optionId, timeTaken }
// Dipanggil setiap kali user memilih jawaban.
// Response langsung berisi isCorrect + correctOption (jika salah)
// supaya frontend bisa tampilkan halaman koreksi sebelum soal berikutnya.
const submitAnswer = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;
    const { questionId, optionId, timeTaken } = req.body;

    const result = await pretestService.submitAnswer(
      sessionId,
      userId,
      questionId,
      optionId,
      timeTaken
    );

    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

// POST /api/pretest/sessions/:id/finish
// Dipanggil setelah user selesai menjawab semua soal.
// Menghitung total skor dan topicScores dari semua jawaban.
const finishSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    const result = await pretestService.finishSession(sessionId, userId);

    return api.success(res, result, 'Sesi pretest berhasil diselesaikan');
  } catch (err) {
    next(err);
  }
};

// GET /api/pretest/sessions/:id/result
const getResult = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    const userId = req.user.id;

    const result = await pretestService.getResult(sessionId, userId);

    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getSessionQuestions, createSession, submitAnswer, finishSession, getResult };