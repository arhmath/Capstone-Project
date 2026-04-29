const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

/**
 * Generate JWT token untuk user yang berhasil login/register.
 * Payload hanya menyimpan userId — data lain diambil dari DB
 * lewat middleware authenticate saat dibutuhkan.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = { generateToken };
