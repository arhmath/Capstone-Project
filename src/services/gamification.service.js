const prisma = require('../config/prisma');

// 1. GET XP ME
const getMyXp = async (userId) => {
  const userXp = await prisma.userXp.findUnique({
    where: { userId },
    select: {
      totalXp: true,
      level: true,
      xpToNextLevel: true,
      updatedAt: true,
    },
  });

  if (!userXp) {
    return {
      totalXp: 0,
      level: 1,
      xpToNextLevel: 100,
      updatedAt: null,
    };
  }

  return userXp;
};

// 2. GET XP LOG
const getXpLog = async (userId, limit = 20) => {
  const logs = await prisma.xpTransaction.findMany({
    where: { userId },
    select: {
      id: true,
      xpAmount: true,
      sourceType: true,
      sourceId: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return logs;
};

// 3. GET STREAK ME
const getMyStreak = async (userId) => {
  const streak = await prisma.userStreak.findUnique({
    where: { userId },
    select: {
      currentStreak: true,
      longestStreak: true,
      lastActivityDate: true,
      updatedAt: true,
    },
  });

  if (!streak) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      updatedAt: null,
    };
  }

  // Cek apakah streak masih aktif (lastActivityDate harus kemarin atau hari ini)
  const today     = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastDate  = new Date(streak.lastActivityDate);
  lastDate.setHours(0, 0, 0, 0);

  const isActive  = lastDate >= yesterday;

  return {
    ...streak,
    isActive,
  };
};

// 4. GET LEADERBOARD
const getLeaderboard = async (userId, educationLevelFilter, limit = 20) => {
  // Ambil educationLevel user yang login
  const userEducation = await prisma.userEducationLevel.findFirst({
    where: { userId },
    select: { educationLevel: true },
  });

  // Tentukan filter educationLevel yang dipakai
  const useFilter = educationLevelFilter === 'all'
    ? null                                          
    : (educationLevelFilter ?? userEducation?.educationLevel ?? null);

  // Query leaderboard dari UserXp join User join UserEducationLevel
  const leaderboard = await prisma.userXp.findMany({
    where: useFilter
      ? {
          user: {
            userEducationLevels: {
              some: { educationLevel: useFilter },
            },
          },
        }
      : undefined,
    select: {
      userId: true,
      totalXp: true,
      level: true,
      user: {
        select: {
          name: true,
          avatarUrl: true,
          userEducationLevels: {
            select: { educationLevel: true },
            take: 1,
          },
        },
      },
    },
    orderBy: { totalXp: 'desc' },
    take: limit,
  });

  // Tambahkan rank & tandai posisi user yang login
  const ranked = leaderboard.map((entry, index) => ({
    rank: index + 1,
    userId: entry.userId,
    name: entry.user.name,
    avatarUrl: entry.user.avatarUrl ?? null,
    educationLevel: entry.user.userEducationLevels[0]?.educationLevel ?? null,
    totalXp: entry.totalXp,
    level: entry.level,
    isMe: entry.userId === userId,
  }));

  // Cari posisi user yang login jika tidak masuk top limit
  const myRankInList = ranked.find((r) => r.isMe);
  let myRank = null;

  if (!myRankInList) {
    const countAboveMe = await prisma.userXp.count({
      where: {
        totalXp: {
          gt: (await prisma.userXp.findUnique({
            where: { userId },
            select: { totalXp: true },
          }))?.totalXp ?? 0,
        },
        ...(useFilter && {
          user: {
            userEducationLevels: {
              some: { educationLevel: useFilter },
            },
          },
        }),
      },
    });

    myRank = {
      rank: countAboveMe + 1,
      isMe: true,
    };
  }

  return {
    educationLevelFilter: useFilter ?? 'all',
    leaderboard: ranked,
    myRank: myRankInList ?? myRank,
  };
};

// 5. GET DASHBOARD — aggregated semua data gamifikasi
const getDashboard = async (userId) => {
  const [xp, streak, userEducation] = await Promise.all([
    getMyXp(userId),
    getMyStreak(userId),
    prisma.userEducationLevel.findFirst({
      where: { userId },
      select: { educationLevel: true },
    }),
  ]);

  // Rank user di educationLevel-nya
  const myXpData = await prisma.userXp.findUnique({
    where: { userId },
    select: { totalXp: true },
  });

  const rankInLevel = userEducation
    ? await prisma.userXp.count({
        where: {
          totalXp: { gt: myXpData?.totalXp ?? 0 },
          user: {
            userEducationLevels: {
              some: { educationLevel: userEducation.educationLevel },
            },
          },
        },
      })
    : null;

  // Progress modul
  const [totalModules, completedModules] = await Promise.all([
    prisma.module.count({
      where: {
        isPublished: true,
        ...(userEducation && { educationLevel: userEducation.educationLevel }),
      },
    }),
    prisma.userModuleProgress.count({
      where: { userId, isCompleted: true },
    }),
  ]);

  // XP log terbaru (5 terakhir)
  const recentXpLog = await getXpLog(userId, 5);

  return {
    xp,
    streak,
    rank: rankInLevel !== null ? rankInLevel + 1 : null,
    educationLevel: userEducation?.educationLevel ?? null,
    moduleProgress: {
      completed: completedModules,
      total: totalModules,
      percentage: totalModules > 0
        ? Math.round((completedModules / totalModules) * 100)
        : 0,
    },
    recentXpLog,
  };
};

module.exports = { getMyXp, getXpLog, getMyStreak, getLeaderboard, getDashboard };