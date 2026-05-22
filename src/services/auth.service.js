const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const { checkAchievements } = require('./achievement.service');

const isEmailTaken = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
};

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
      pretestSessions: {
        orderBy: { completedAt: 'desc' },
        take: 1,
        select: { id: true },
      },
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

  const newAchievements = await checkAchievements(user.id, 'first_login');

  // Hapus passwordHash dari return value — jangan pernah kirim ke client
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
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
      userStreak: {
        select: { currentStreak: true, longestStreak: true, lastActivityDate: true },
      },
      userAchievements: {
        select: {
          achievement: {
            select: { code: true, title: true, description: true, xpReward: true },
          },
          earnedAt: true,
        },
      },
      _count: {
        select: {
          userAchievements: true,
        }
      }
    },
  });

  if (!user) return null;

  const totalXp = user.userXp?.totalXp ?? 0;

  const countAboveMe = await prisma.userXp.count({
    where: {
      totalXp: {
        gt: totalXp,
      },

      // hanya user yg punya education level
      user: {
        userEducationLevels: {
          some: {},
        },
      },
    },
  });

  return {
    ...user,

    leaderboardRank: countAboveMe + 1,
  };
};

module.exports = { isEmailTaken, createUser, verifyCredentials, getUserById };
