const prisma = require('../config/prisma');

// Helper: grant achievement + xp reward jika belum punya
const grantAchievement = async (userId, achievementCode, tx) => {
    const client = tx ?? prisma;

    const achievement = await client.achievement.findUnique({
        where: { code: achievementCode },
        select: { id: true, xpReward: true, title: true },
    });

    if (!achievement) return null;

    const already = await client.userAchievement.findUnique({
        where: { userId_achievementId: { userId, achievementId: achievement.id } },
        select: { id: true },
    });

    if (already) return null;

    const earned = await client.userAchievement.create({
        data: { userId, achievementId: achievement.id },
        select: {
            earnedAt: true,
            achievement: {
                select: { code: true, title: true, description: true, xpReward: true },
            },
        },
    });

    if (achievement.xpReward > 0) {
        const updatedXp = await client.userXp.upsert({
            where: { userId },
            update: { totalXp: { increment: achievement.xpReward } },
            create: { userId, totalXp: achievement.xpReward },
        });

        const newLevel = Math.floor(updatedXp.totalXp / 100) + 1;
        const newXpToNextLevel = (newLevel * 100) - updatedXp.totalXp;

        await client.userXp.update({
            where: { userId },
            data: { level: newLevel, xpToNextLevel: newXpToNextLevel }
        });

        await client.xpTransaction.create({
            data: {
                userId,
                xpAmount: achievement.xpReward,
                sourceType: 'achievement',
                sourceId: achievement.id,
            },
        });
    }

    return earned;
};

const checkAchievements = async (userId, trigger, context = {}, tx = prisma) => {
    const newlyEarned = [];
    const checkers = triggerCheckers[trigger];
    if (!checkers) return newlyEarned;

    for (const checker of checkers) {
        const result = await checker(userId, context, tx);
        if (result) newlyEarned.push(result);
    }

    return newlyEarned;
};

const triggerCheckers = {
    first_login: [
        async (userId, ctx, tx) => grantAchievement(userId, 'FIRST_LOGIN', tx),
    ],
    pretest_completed: [
        async (userId, ctx, tx) => grantAchievement(userId, 'PRETEST_DONE', tx),
    ],
    recommendation_received: [
        async (userId, ctx, tx) => grantAchievement(userId, 'FIRST_RECOMMENDATION', tx),
    ],
    quiz_passed: [
        async (userId, ctx, tx) => {
            const passedCount = await tx.quizSession.count({
                where: { userId, status: 'completed', totalScore: { gte: 70 } },
            });
            if (passedCount >= 1) return grantAchievement(userId, 'QUIZ_FIRST_PASS', tx);
            return null;
        },
        async (userId, { totalScore }, tx) => {
            if (totalScore === 100) return grantAchievement(userId, 'QUIZ_PERFECT', tx);
            return null;
        },
        async (userId, ctx, tx) => {
            const passedCount = await tx.quizSession.count({
                where: { userId, status: 'completed', totalScore: { gte: 70 } },
            });
            if (passedCount >= 5) return grantAchievement(userId, 'QUIZ_5_PASS', tx);
            return null;
        },
    ],
    module_completed: [
        async (userId, ctx, tx) => {
            const count = await tx.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 1) return grantAchievement(userId, 'MODULE_1', tx);
            return null;
        },
        async (userId, ctx, tx) => {
            const count = await tx.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 5) return grantAchievement(userId, 'MODULE_5', tx);
            return null;
        },
        async (userId, ctx, tx) => {
            const count = await tx.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 10) return grantAchievement(userId, 'MODULE_10', tx);
            return null;
        },
    ],
    streak_updated: [
        async (userId, { currentStreak }, tx) => {
            if (currentStreak >= 3) return grantAchievement(userId, 'STREAK_3', tx);
            return null;
        },
        async (userId, { currentStreak }, tx) => {
            if (currentStreak >= 7) return grantAchievement(userId, 'STREAK_7', tx);
            return null;
        },
        async (userId, { currentStreak }, tx) => {
            if (currentStreak >= 30) return grantAchievement(userId, 'STREAK_30', tx);
            return null;
        },
    ],
    xp_updated: [
        async (userId, { totalXp }, tx) => {
            if (totalXp >= 500) return grantAchievement(userId, 'XP_500', tx);
            return null;
        },
        async (userId, { totalXp }, tx) => {
            if (totalXp >= 1000) return grantAchievement(userId, 'XP_1000', tx);
            return null;
        },
        async (userId, { totalXp }, tx) => {
            if (totalXp >= 5000) return grantAchievement(userId, 'XP_5000', tx);
            return null;
        },
        async (userId, { level }, tx) => {
            if (level >= 5) return grantAchievement(userId, 'LEVEL_5', tx);
            return null;
        },
        async (userId, { level }, tx) => {
            if (level >= 10) return grantAchievement(userId, 'LEVEL_10', tx);
            return null;
        },
    ],
};

// GET badges user
const getMyBadges = async (userId) => {
    const [allAchievements, userAchievements] = await Promise.all([
        prisma.achievement.findMany({
            select: {
                id: true,
                code: true,
                title: true,
                description: true,
                iconUrl: true,
                category: true,
                xpReward: true,
            },
            orderBy: { category: 'asc' },
        }),
        prisma.userAchievement.findMany({
            where: { userId },
            select: {
                achievementId: true,
                earnedAt: true,
            },
        }),
    ]);

    const earnedMap = new Map(
        userAchievements.map(ua => [ua.achievementId, ua.earnedAt])
    );

    return allAchievements.map(achievement => ({
        achievement,
        earned: earnedMap.has(achievement.id),
        earnedAt: earnedMap.get(achievement.id) ?? null,
    }));
};

module.exports = { checkAchievements, grantAchievement, getMyBadges };