const success = (res, data = null, message = 'Berhasil', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const created = (res, data = null, message = 'Data berhasil dibuat') => {
  return success(res, data, message, 201);
};

const error = (res, message = 'Terjadi kesalahan', statusCode = 500, errors = null) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

const notFound = (res, message = 'Data tidak ditemukan') => {
  return error(res, message, 404);
};

const unauthorized = (res, message = 'Email atau password salah') => {
  return error(res, message, 401);
};

const forbidden = (res, message = 'Tidak memiliki akses') => {
  return error(res, message, 403);
};

const badRequest = (res, message = 'Request tidak valid', errors = null) => {
  return error(res, message, 400, errors);
};

const conflict = (res, message = 'Data sudah ada') => {
  return error(res, message, 409);
};

module.exports = { success, created, error, notFound, unauthorized, forbidden, badRequest, conflict };
