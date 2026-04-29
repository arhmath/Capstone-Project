const { validationResult } = require('express-validator');
const api = require('../utils/apiResponse');

/**
 * Wrapper untuk express-validator.
 * Terima array validation rules, jalankan semua, lalu cek hasilnya.
 *
 * Usage di route:
 *   router.post('/register',
 *     validate([
 *       body('email').isEmail().withMessage('Email tidak valid'),
 *       body('password').isLength({ min: 6 }),
 *     ]),
 *     controller.register
 *   );
 */
const validate = (rules) => [
  // Spread semua validation rules
  ...rules,

  // Middleware terakhir: cek hasil validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return api.badRequest(
        res,
        'Validasi gagal',
        errors.array().map((e) => ({ field: e.path, message: e.msg }))
      );
    }
    next();
  },
];

module.exports = { validate };
