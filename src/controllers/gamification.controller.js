const gamificationService = require('../services/gamification.service');
const api = require('../utils/apiResponse');

// GET /api/gamification/xp/me
const getMyXp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await gamificationService.getMyXp(userId);
    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

// GET /api/gamification/xp/log?limit=20
const getXpLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const limit  = parseInt(req.query.limit, 10) || 20;

    const logs = await gamificationService.getXpLog(userId, limit);

    return api.success(res, {
      total: logs.length,
      logs,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/gamification/streak/me
const getMyStreak = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await gamificationService.getMyStreak(userId);
    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

// GET /api/gamification/leaderboard?educationLevel=SMP
// ?educationLevel=all → semua jenjang
// tanpa param → default jenjang user login
const getLeaderboard = async (req, res, next) => {
  try {
    const userId             = req.user.id;
    const educationLevel     = req.query.educationLevel ?? null;
    const limit              = parseInt(req.query.limit, 10) || 20;

    const result = await gamificationService.getLeaderboard(
      userId,
      educationLevel,
      limit
    );

    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

// GET /api/gamification/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await gamificationService.getDashboard(userId);
    return api.success(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMyXp, getXpLog, getMyStreak, getLeaderboard, getDashboard };