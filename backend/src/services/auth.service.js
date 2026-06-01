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

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, avatarUrl: true },
    });

    await tx.userXp.create({
      data: { userId: newUser.id },
    });

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

  if (!user) return null;
  if (!user.passwordHash) return null;

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  }).catch(console.error);

  const newAchievements = await checkAchievements(user.id, 'first_login');

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

// ── BARU: Update nama & avatar ──
const updateProfile = async (userId, { name, avatarUrl }) => {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name      && { name }),
      ...(avatarUrl && { avatarUrl }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
    },
  });
  return updated;
};

module.exports = { isEmailTaken, createUser, verifyCredentials, getUserById, updateProfile };