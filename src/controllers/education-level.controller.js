const educationLevelService = require('../services/education-level.service');
const api = require('../utils/apiResponse');

const selectLevel = async (req, res, next) => {
    try {
        const { educationLevel } = req.body;
        const userId = req.user.id; // dari middleware authenticate

        const userEducationLevel = await educationLevelService.selectLevel(userId, educationLevel);

        let label = '';

        if (educationLevel === 'primary') {
            label = 'SD';
        } else if (educationLevel === 'middle') {
            label = 'SMP';
        } else if (educationLevel === 'high') {
            label = 'SMA';
        }

        return api.created(res, userEducationLevel, `Jenjang ${label} berhasil dipilih`);
    } catch (err) {
        next(err);
    }
};

module.exports = { selectLevel };
