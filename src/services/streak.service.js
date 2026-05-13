const { differenceInCalendarDays } = require('date-fns');
const prisma = require('../config/prisma');

const updateUserStreak = async (userId, tx = prisma) => {
  const today = new Date();

  let streak = await tx.userStreak.findUnique({
    where: { userId },
  });

  if (!streak) {
    return tx.userStreak.create({
      data: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today,
      },
    });
  }

  const diffDays = differenceInCalendarDays(
    today,
    streak.lastActivityDate
  );

  // Sudah aktif hari ini
  if (diffDays === 0) {
    return streak;
  }

  // Beruntun
  if (diffDays === 1) {
    const newCurrentStreak = streak.currentStreak + 1;

    return tx.userStreak.update({
      where: { userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: Math.max(
          streak.longestStreak,
          newCurrentStreak
        ),
        lastActivityDate: today,
      },
    });
  }

  // Putus → mulai lagi dari 1
  return tx.userStreak.update({
    where: { userId },
    data: {
      currentStreak: 1,
      lastActivityDate: today,
    },
  });
};

module.exports = {
  updateUserStreak,
};