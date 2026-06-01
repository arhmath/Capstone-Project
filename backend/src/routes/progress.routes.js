const express = require('express');
const router = express.Router();
const { getProgress, getAchievements } = require('../controllers/progress.controller');
const { authenticate } = require('../middlewares/authenticate');

router.get('/progress', authenticate, getProgress);
router.get('/achievements', authenticate, getAchievements);

module.exports = router;