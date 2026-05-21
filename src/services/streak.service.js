const prisma = require('../config/prisma');

const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

const updateUserStreak = async (userId, tx = prisma) => {
    const today = formatDate(new Date());

    let streak = await tx.userStreak.findUnique({
        where: { userId },
    });

    const user = await tx.user.findUnique({
        where: { id: userId },
        select: {
            createdAt: true,
        },
    });

    const registerDate = formatDate(user.createdAt);

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

    const lastActivityDate = formatDate(new Date(streak.lastActivityDate));

    if (lastActivityDate === today) {
        return streak;
    }

    const diffDays = Math.floor(
        (new Date(today) - new Date(lastActivityDate)) / (1000 * 60 * 60 * 24)
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

    if (registerDate === today) {
        newCurrentStreak = streak.currentStreak + 1;
    }

    const newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);

    return tx.userStreak.update({
        where: { userId },
        data: {
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastActivityDate: new Date(),
        },
    });
};

module.exports = {
    updateUserStreak,
};