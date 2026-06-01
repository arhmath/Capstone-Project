const router = require('express').Router();
const { authenticate } = require('../middlewares/authenticate');
const achievementController = require('../controllers/achievement.controller');

router.get(
  '/my-badges',
  authenticate,
  achievementController.getMyBadges
);

module.exports = router;