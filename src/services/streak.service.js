const { differenceInCalendarDays, startOfDay } = require('date-fns');
const prisma = require('../config/prisma');

const updateUserStreak = async (userId, tx = prisma) => {
    const today = startOfDay(new Date());

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

    const lastActivityDate = startOfDay(new Date(streak.lastActivityDate));

    const diffDays = differenceInCalendarDays(
        today,
        lastActivityDate
    );

    // Sudah aktif hari ini
    if (diffDays === 0) {
        return streak;
    }

    let newCurrentStreak = 1; 

    // Beruntun
    if (diffDays === 1) {
        newCurrentStreak = streak.currentStreak + 1;
    }

    const newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);

    return tx.userStreak.update({
        where: { userId },
        data: {
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastActivityDate: today,
        },
    });
};

module.exports = {
    updateUserStreak,
};