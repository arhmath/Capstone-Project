const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

/**
 * AUTH SERVICE
 * Berisi semua business logic untuk auth.
 * Controller hanya handle request/response — logic ada di sini.
 */

/**
 * Cek apakah email sudah terdaftar.
 * @param {string} email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
};

/**
 * Buat user baru + inisialisasi data gamifikasi (user_xp, user_streaks).
 * Semua dibungkus dalam satu transaction supaya kalau salah satu gagal,
 * semua rollback — tidak ada user tanpa XP atau streak.
 *
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ id, name, email, avatarUrl }>}
 */
const createUser = async ({ name, email, password }) => {
  const passwordHash = await bcrypt.hash(password, 12);

  // Prisma transaction: semua query dijalankan sekaligus
  const user = await prisma.$transaction(async (tx) => {
    // 1. Buat user
    const newUser = await tx.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, avatarUrl: true },
    });

    // 2. Init tabel user_xp (untuk track XP & level)
    await tx.userXp.create({
      data: { userId: newUser.id },
    });

    // 3. Init tabel user_streaks (untuk track streak harian)
    await tx.userStreak.create({
      data: {
        userId: newUser.id,
        lastActivityDate: new Date(),
      },
    });

    return newUser;
  });

  return user;
};

/**
 * Verifikasi kredensial login.
 * Menggunakan bcrypt.compare untuk check password — TIDAK pernah
 * compare plain text langsung supaya aman dari timing attack.
 *
 * @param {string} email
 * @param {string} password - plain text dari request body
 * @returns {Promise<{ id, name, email, avatarUrl } | null>} null jika gagal
 */
const verifyCredentials = async (email, password) => {
  // Ambil user beserta passwordHash — field ini tidak di-select di tempat lain
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      passwordHash: true,
      authProvider: true,
    },
  });

  // User tidak ada
  if (!user) return null;

  // User daftar via Google/school — tidak punya password
  if (!user.passwordHash) return null;

  // Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  // Update last_login_at (fire and forget — tidak perlu await)
  prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  }).catch(console.error);

  // Hapus passwordHash dari return value — jangan pernah kirim ke client
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

/**
 * Ambil profil lengkap user berdasarkan ID.
 * Digunakan oleh endpoint GET /auth/me.
 *
 * @param {string} userId
 * @returns {Promise<object | null>}
 */
const getUserById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      authProvider: true,
      createdAt: true,
      // Sertakan data XP dan jenjang aktif
      userXp: {
        select: { totalXp: true, level: true, xpToNextLevel: true },
      },
      userEducationLevels: {
        orderBy: { selectedAt: 'desc' },
        take: 1,
        select: { educationLevel: true, selectedAt: true },
      },
    },
  });
};

module.exports = { isEmailTaken, createUser, verifyCredentials, getUserById };
