const { validationResult } = require('express-validator');
const api = require('../utils/apiResponse');

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
