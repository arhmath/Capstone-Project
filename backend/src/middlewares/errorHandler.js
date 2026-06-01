const api = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err);

  // ── Prisma Errors ─────────────────────────────────────────
  // P2002: Unique constraint violation (misal: email sudah ada)
  if (err.code === 'P2002') {
    const field = err.meta?.target?.join(', ') || 'field';
    return api.conflict(res, `${field} sudah digunakan`);
  }

  // P2025: Record not found
  if (err.code === 'P2025') {
    return api.notFound(res, err.meta?.cause || 'Data tidak ditemukan');
  }

  // P2003: Foreign key constraint
  if (err.code === 'P2003') {
    return api.badRequest(res, 'Relasi data tidak valid');
  }

  // ── JWT Errors (safety net, harusnya sudah ditangani di authenticate.js)
  if (err.name === 'JsonWebTokenError') {
    return api.unauthorized(res, 'Token tidak valid');
  }
  if (err.name === 'TokenExpiredError') {
    return api.unauthorized(res, 'Token kadaluarsa');
  }

  // ── Custom HTTP errors (error yang di-throw manual dengan .status)
  if (err.status || err.statusCode) {
    return api.error(res, err.message, err.status || err.statusCode);
  }

  // ── Default: 500 Internal Server Error
  return api.error(
    res,
    process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    500
  );
};

module.exports = { errorHandler };
