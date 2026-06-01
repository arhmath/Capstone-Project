const router = require('express').Router();
const { body } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate } = require('../middlewares/validate');
const authController = require('../controllers/auth.controller');

const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nama wajib diisi')
    .isLength({ min: 2, max: 100 }).withMessage('Nama harus 2–100 karakter'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password wajib diisi')
    .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
    .matches(/\d/).withMessage('Password harus mengandung minimal 1 angka'),
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email wajib diisi')
    .isEmail().withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password wajib diisi'),
];

const updateProfileRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Nama harus 2–100 karakter'),
  body('avatarUrl')
    .optional()
    .isURL().withMessage('URL avatar tidak valid'),
];

// Public routes
router.post('/register', validate(registerRules), authController.register);
router.post('/login',    validate(loginRules),    authController.login);

// Protected routes
router.get('/me',      authenticate, authController.me);
router.post('/logout', authenticate, authController.logout);
router.patch('/profile', authenticate, validate(updateProfileRules), authController.updateProfile);

module.exports = router;