const authService = require('../services/auth.service');
const { generateToken } = require('../utils/generateToken');
const api = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const emailTaken = await authService.isEmailTaken(email);
    if (emailTaken) {
      return api.conflict(res, 'Email sudah terdaftar. Silakan gunakan email lain atau login.');
    }

    const user = await authService.createUser({ name, email, password });
    const token = generateToken(user.id);

    return api.created(res, { user, token }, 'Registrasi berhasil! Selamat datang di MathQuest.');
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.verifyCredentials(email, password);
    if (!user) {
      return api.unauthorized(res, 'Email atau password salah.');
    }

    const token = generateToken(user.id);
    return api.success(res, { user, token }, 'Login berhasil!');
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
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

// ── BARU: Update nama & avatar ──
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, avatarUrl } = req.body;

    if (!name && !avatarUrl) {
      return api.badRequest(res, 'Tidak ada data yang diperbarui');
    }

    const updated = await authService.updateProfile(userId, { name, avatarUrl });
    return api.success(res, updated, 'Profil berhasil diperbarui');
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, me, logout, updateProfile };