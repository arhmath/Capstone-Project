const quizService = require('../services/quiz.service');
const api = require('../utils/apiResponse');

// GET /api/quizzes/:id
const getQuizById = async (req, res, next) => {
  try {
    const quizId = req.params.id;

    const quiz = await quizService.getQuizById(quizId);

    return api.success(res, quiz);
  } catch (err) {
    next(err);
  }
};

// POST /api/quizzes/:id/sessions
const createSession = async (req, res, next) => {
  try {
    const quizId = req.params.id;
    const userId = req.user.id;

    const result = await quizService.createSession(userId, quizId);

    return api.created(res, result, 'Sesi kuis berhasil dimulai');
  } catch (err) {
    if (err.status === 409) {
      return api.error(res, err.message, 409, err.data);
    }
    next(err);
  }
};

// POST /api/quizzes/sessions/:sid/answer
// Body: { question_id, option_id, time_taken }
const submitAnswer = async (req, res, next) => {
  try {
    const sessionId  = req.params.sid;
    const userId     = req.user.id;
    const { questionId, optionId, timeTaken } = req.body;

    const result = await quizService.submitAnswer(
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

// POST /api/quizzes/sessions/:sid/finish
const finishSession = async (req, res, next) => {
  try {
    const sessionId = req.params.sid;
    const userId    = req.user.id;

    const result = await quizService.finishSession(sessionId, userId);

    const message = result.isPassed
      ? `Selamat! Kamu lulus dengan skor ${result.totalScore}. +${result.totalXpEarned} XP`
      : `Kuis selesai. Skor kamu ${result.totalScore}, belum mencapai passing score.`;

    return api.success(res, result, message);
  } catch (err) {
    next(err);
  }
};

// GET /api/quizzes/sessions/:sid/result
const getResult = async (req, res, next) => {
  try {
    const sessionId = req.params.sid;
    const userId    = req.user.id;

    const result = await quizService.getResult(sessionId, userId);

    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getQuizById, createSession, submitAnswer, finishSession, getResult };