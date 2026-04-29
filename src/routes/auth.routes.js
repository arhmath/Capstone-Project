const router = require('express').Router();
const { body } = require('express-validator');
const { authenticate } = require('../middlewares/authenticate');
const { validate } = require('../middlewares/validate');
const authController = require('../controllers/auth.controller');

// ─── Validation rules ─────────────────────────────────────────

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

// ─── Route Definitions ────────────────────────────────────────

// Public routes (tidak butuh token)
router.post('/register', validate(registerRules), authController.register);
router.post('/login',    validate(loginRules),    authController.login);

// Protected routes (butuh token — authenticate middleware wajib)
router.get('/me',     authenticate, authController.me);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
