const router = require('express').Router();
const { body, param } = require('express-validator');
const { authenticate }  = require('../middlewares/authenticate');
const { validate }      = require('../middlewares/validate');
const quizController    = require('../controllers/quiz.controller');

const submitAnswerRules = [
  body('questionId').notEmpty().isUUID().withMessage('question_id tidak valid'),
  body('optionId').notEmpty().isUUID().withMessage('option_id tidak valid'),
  body('timeTaken')
    .notEmpty().withMessage('time_taken wajib diisi')
    .isInt({ min: 0 }).withMessage('time_taken harus berupa angka')
    .toInt(),
];

// GET /api/quizzes/:id
router.get('/:id',
  authenticate,
  validate([param('id').isUUID().withMessage('ID kuis tidak valid')]),
  quizController.getQuizById);

// POST /api/quizzes/:id/sessions
router.post('/:id/sessions',
  authenticate,
  validate([param('id').isUUID().withMessage('ID kuis tidak valid')]),
  quizController.createSession);

// POST /api/quizzes/sessions/:sid/answer
router.post('/sessions/:sid/answer',
  authenticate,
  validate([
    param('sid').isUUID().withMessage('Session ID tidak valid'),
    ...submitAnswerRules,
  ]),
  quizController.submitAnswer);

// POST /api/quizzes/sessions/:sid/finish
router.post('/sessions/:sid/finish',
  authenticate,
  validate([param('sid').isUUID().withMessage('Session ID tidak valid')]),
  quizController.finishSession);

// GET /api/quizzes/sessions/:sid/result
router.get('/sessions/:sid/result',
  authenticate,
  validate([param('sid').isUUID().withMessage('Session ID tidak valid')]),
  quizController.getResult);

module.exports = router;