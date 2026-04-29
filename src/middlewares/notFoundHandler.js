const api = require('../utils/apiResponse');

/**
 * Handler untuk route yang tidak ditemukan (404).
 * Dipasang SETELAH semua routes, tapi SEBELUM errorHandler.
 */
const notFoundHandler = (req, res) => {
  return api.notFound(res, `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`);
};

module.exports = { notFoundHandler };
