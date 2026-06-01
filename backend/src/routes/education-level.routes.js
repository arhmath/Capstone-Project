const router = require('express').Router();
const { body } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate } = require('../middlewares/validate');
const educationLevelController = require('../controllers/education-level.controller');

const selectLevelRules = [
  body('educationLevel')
    .notEmpty().withMessage('Jenjang wajib dipilih')
    .isIn(['primary', 'middle', 'high']).withMessage('Jenjang tidak valid. Pilih SD, SMP, atau SMA'),
];

router.post(
  '/select',
  authenticate,
  validate(selectLevelRules),
  educationLevelController.selectLevel
);

module.exports = router;
