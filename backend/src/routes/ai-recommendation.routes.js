const router = require('express').Router();
const { param } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate } = require('../middlewares/validate');
const recommendationController = require('../controllers/ai-recommendation.controller');

const sessionParamRules = [
  param('sessionId')
    .notEmpty().withMessage('Session pretest tidak ditemukan')
];

// POST /api/recommendations/sessions/:sessionId
// Trigger: user tekan tombol "Lihat Rekomendasi Modul Untukmu"
router.post(
  '/sessions/:sessionId',
  authenticate,
  validate(sessionParamRules),
  recommendationController.requestRecommendation
);

// GET /api/recommendations/sessions/:sessionId
// Ambil rekomendasi yang sudah tersimpan
router.get(
  '/sessions/:sessionId',
  authenticate,
  validate(sessionParamRules),
  recommendationController.getSavedRecommendations
);

module.exports = router;