const achievementService = require('../services/achievement.service');
const api = require('../utils/apiResponse');

const getMyBadges = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const badges = await achievementService.getMyBadges(userId);

    return api.success(
      res,
      badges,
      'Berhasil mengambil daftar badge user.'
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMyBadges,
};