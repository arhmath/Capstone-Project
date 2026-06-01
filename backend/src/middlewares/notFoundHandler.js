const api = require('../utils/apiResponse');

const notFoundHandler = (req, res) => {
  return api.notFound(res, `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`);
};

module.exports = { notFoundHandler };
