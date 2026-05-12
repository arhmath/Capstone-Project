const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ── Simulasi database pakai array ────────────────────────────────────────────
// Nanti diganti dengan koneksi database sungguhan (MySQL, MongoDB, dll)
const users = [];

// ── REGISTER ─────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi: semua field harus diisi
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
    };
    users.push(newUser);

    return res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi: semua field harus diisi
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    // Cek apakah user terdaftar
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Cek apakah password cocok
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Response yang dikirim ke frontend
    // Inilah yang dimaksud "key token & user" di authService.js
    return res.status(200).json({
      message: 'Login berhasil!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { register, login };