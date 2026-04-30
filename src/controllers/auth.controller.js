const authService = require('../services/auth.service');
const { generateToken } = require('../utils/generateToken');
const api = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Cek apakah email sudah terdaftar
    const emailTaken = await authService.isEmailTaken(email);
    if (emailTaken) {
      return api.conflict(res, 'Email sudah terdaftar. Silakan gunakan email lain atau login.');
    }

    // 2. Buat user baru (service handle bcrypt + transaction)
    const user = await authService.createUser({ name, email, password });

    // 3. Generate JWT token
    const token = generateToken(user.id);

    // 4. Kirim response 201 Created
    return api.created(res, { user, token }, 'Registrasi berhasil! Selamat datang di MathQuest.');
  } catch (err) {
    next(err); // Lempar ke global errorHandler
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Verifikasi kredensial
    const user = await authService.verifyCredentials(email, password);

    // Gunakan pesan yang sama untuk email/password salah
    // supaya tidak bisa di-enumerate (attacker tidak tahu mana yang salah)
    if (!user) {
      return api.unauthorized(res, 'Email atau password salah.');
    }

    // 2. Generate JWT token
    const token = generateToken(user.id);

    // 3. Kirim response
    return api.success(res, { user, token }, 'Login berhasil!');
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    // req.user sudah diisi oleh middleware authenticate
    // Tapi di sini kita ambil data lebih lengkap (include XP & jenjang)
    const user = await authService.getUserById(req.user.id);

    if (!user) {
      return api.notFound(res, 'User tidak ditemukan');
    }

    return api.success(res, user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  return api.success(res, null, 'Logout berhasil.');
};

module.exports = { register, login, me, logout };
