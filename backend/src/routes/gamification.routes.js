const router = require('express').Router();
const { query } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate }     = require('../middlewares/validate');
const gamificationController = require('../controllers/gamification.controller');

const leaderboardRules = [
  query('educationLevel')
    .optional()
    .isString().withMessage('educationLevel tidak valid'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('limit harus antara 1 dan 100')
    .toInt(),
];

const xpLogRules = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('limit harus antara 1 dan 100')
    .toInt(),
];

router.get('/xp/me',
  authenticate,
  gamificationController.getMyXp);

router.get('/xp/log',
  authenticate,
  validate(xpLogRules),
  gamificationController.getXpLog);

router.get('/streak/me',
  authenticate,
  gamificationController.getMyStreak);

router.get('/leaderboard',
  authenticate,
  validate(leaderboardRules),
  gamificationController.getLeaderboard);

router.get('/dashboard',
  authenticate,
  gamificationController.getDashboard);

module.exports = router;