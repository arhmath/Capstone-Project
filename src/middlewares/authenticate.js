const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const prisma = require('../config/prisma');
const api = require('../utils/apiResponse');

/**
 * Middleware autentikasi — wajib dipasang di semua route yang butuh login.
 *
 * Cara kerja:
 * 1. Ambil token dari header Authorization: Bearer <token>
 * 2. Verify token dengan JWT_SECRET
 * 3. Cari user di DB berdasarkan userId dari payload token
 * 4. Simpan data user ke req.user agar controller bisa pakai
 *
 * Usage di route:
 *   router.get('/me', authenticate, controller.me);
 */
const authenticate = async (req, res, next) => {
  try {
    // 1. Cek header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return api.unauthorized(res, 'Token tidak ditemukan. Silakan login terlebih dahulu.');
    }

    // 2. Ambil token (hapus prefix "Bearer ")
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 4. Cari user di database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        authProvider: true,
      },
    });

    if (!user) {
      return api.unauthorized(res, 'User tidak ditemukan. Token tidak valid.');
    }

    // 5. Attach user ke request — bisa diakses di controller via req.user
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return api.unauthorized(res, 'Token kadaluarsa. Silakan login kembali.');
    }
    if (err.name === 'JsonWebTokenError') {
      return api.unauthorized(res, 'Token tidak valid.');
    }
    next(err);
  }
};

module.exports = { authenticate };
