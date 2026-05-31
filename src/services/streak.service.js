const prisma = require('../config/prisma');
const { checkAchievements } = require('./achievement.service');

const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

const updateUserStreak = async (userId, tx = prisma) => {
    const today = formatDate(new Date());

    let streak = await tx.userStreak.findUnique({ where: { userId } });

    const user = await tx.user.findUnique({
        where: { id: userId },
        select: { createdAt: true },
    });

    const registerDate = formatDate(user.createdAt);

    // ✅ Konsisten: selalu return { streak, newAchievements }
    if (!streak) {
        const newStreak = await tx.userStreak.create({
            data: {
                userId,
                currentStreak: 1,
                longestStreak: 1,
                lastActivityDate: today,
            },
        });
        return { streak: newStreak, newAchievements: [] };
    }

    const lastActivityDate = formatDate(new Date(streak.lastActivityDate));

    // ✅ Sudah aktif hari ini — return konsisten
    if (lastActivityDate === today) {
        return { streak, newAchievements: [] };
    }

    const diffDays = Math.floor(
        (new Date(today) - new Date(lastActivityDate)) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
        return { streak, newAchievements: [] };
    }

    let newCurrentStreak = 1;

    if (diffDays === 1) {
        newCurrentStreak = streak.currentStreak + 1;
    }

    if (registerDate === today) {
        newCurrentStreak = streak.currentStreak + 1;
    }

    const newLongestStreak = Math.max(streak.longestStreak, newCurrentStreak);

    const updatedStreak = await tx.userStreak.update({
        where: { userId },
        data: {
            currentStreak: newCurrentStreak,
            longestStreak: newLongestStreak,
            lastActivityDate: new Date(),
        },
    });

    const newAchievements = await checkAchievements(userId, 'streak_updated', {
        currentStreak: updatedStreak.currentStreak,
    });

    return { streak: updatedStreak, newAchievements };
};

module.exports = {
    updateUserStreak,
};