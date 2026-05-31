const {
  getUserProgress,
  getUserAchievements,
} = require('../services/progress.service');

const api = require('../utils/apiResponse');

const getProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await getUserProgress(userId);

    return api.success(res, data);
  } catch (err) {
    next(err);
  }
};

const getAchievements = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const data = await getUserAchievements(userId);

    return api.success(res, data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProgress,
  getAchievements,
};