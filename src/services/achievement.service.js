const prisma = require('../config/prisma');

// Helper: grant achievement + xp reward jika belum punya
const grantAchievement = async (userId, achievementCode, tx) => {
    const client = tx ?? prisma;

    const achievement = await client.achievement.findUnique({
        where: { code: achievementCode },
        select: { id: true, xpReward: true, title: true },
    });

    if (!achievement) return null;

    // Cek sudah punya belum
    const already = await client.userAchievement.findUnique({
        where: { userId_achievementId: { userId, achievementId: achievement.id } },
        select: { id: true },
    });

    if (already) return null;

    // Simpan achievement
    const earned = await client.userAchievement.create({
        data: { userId, achievementId: achievement.id },
        select: {
            earnedAt: true,
            achievement: {
                select: { code: true, title: true, description: true, xpReward: true },
            },
        },
    });

    const calculateLevel = (totalXp) => {
        const level = Math.floor(totalXp / 100) + 1;
        const xpToNextLevel = (level * 100) - totalXp;
        return { level, xpToNextLevel };
    };

    // Grant XP reward jika ada
    if (achievement.xpReward > 0) {
        const userXp = await client.userXp.upsert({
            where: { userId },
            update: { totalXp: { increment: achievement.xpReward } },
            create: { userId, totalXp: achievement.xpReward },
        });

        const { level, xpToNextLevel } = calculateLevel(userXp.totalXp);

        await client.userXp.update({
            where: { userId },
            data: { level, xpToNextLevel },
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

// Cek semua achievement yang relevan, return list yang baru didapat
const checkAchievements = async (userId, trigger, context = {}) => {
    const newlyEarned = [];

    // Jalankan checker sesuai trigger
    const checkers = triggerCheckers[trigger];
    if (!checkers) return newlyEarned;

    for (const checker of checkers) {
        const result = await checker(userId, context);
        if (result) newlyEarned.push(result);
    }

    return newlyEarned;
};

const triggerCheckers = {

    // Dipanggil saat: user pertama kali login / register
    first_login: [
        async (userId) => grantAchievement(userId, 'FIRST_LOGIN'),
    ],

    // Dipanggil saat: finishSession pretest
    pretest_completed: [
        async (userId) => grantAchievement(userId, 'PRETEST_DONE'),
    ],

    // Dipanggil saat: requestRecommendation berhasil
    recommendation_received: [
        async (userId) => grantAchievement(userId, 'FIRST_RECOMMENDATION'),
    ],

    // Dipanggil saat: finishSession quiz (jika isPassed)
    quiz_passed: [
        async (userId) => {
            // Cek apakah ini kuis pertama yang lulus
            const passedCount = await prisma.quizSession.count({
                where: { userId, status: 'completed', totalScore: { gte: 70 } },
            });
            if (passedCount >= 1) return grantAchievement(userId, 'QUIZ_FIRST_PASS');
            return null;
        },
        async (userId, { totalScore }) => {
            if (totalScore === 100) return grantAchievement(userId, 'QUIZ_PERFECT');
            return null;
        },
        async (userId) => {
            const passedCount = await prisma.quizSession.count({
                where: { userId, status: 'completed', totalScore: { gte: 70 } },
            });
            if (passedCount >= 5) return grantAchievement(userId, 'QUIZ_5_PASS');
            return null;
        },
    ],

    // Dipanggil saat: finishSession quiz trigger module completed
    module_completed: [
        async (userId) => {
            const count = await prisma.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 1) return grantAchievement(userId, 'MODULE_1');
            return null;
        },
        async (userId) => {
            const count = await prisma.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 5) return grantAchievement(userId, 'MODULE_5');
            return null;
        },
        async (userId) => {
            const count = await prisma.userModuleProgress.count({
                where: { userId, isCompleted: true },
            });
            if (count >= 10) return grantAchievement(userId, 'MODULE_10');
            return null;
        },
    ],

    // Dipanggil saat: update streak
    streak_updated: [
        async (userId, { currentStreak }) => {
            if (currentStreak >= 3) return grantAchievement(userId, 'STREAK_3');
            return null;
        },
        async (userId, { currentStreak }) => {
            if (currentStreak >= 7) return grantAchievement(userId, 'STREAK_7');
            return null;
        },
        async (userId, { currentStreak }) => {
            if (currentStreak >= 30) return grantAchievement(userId, 'STREAK_30');
            return null;
        },
    ],

    // Dipanggil saat: grantXp selesai
    xp_updated: [
        async (userId, { totalXp }) => {
            if (totalXp >= 500) return grantAchievement(userId, 'XP_500');
            return null;
        },
        async (userId, { totalXp }) => {
            if (totalXp >= 1000) return grantAchievement(userId, 'XP_1000');
            return null;
        },
        async (userId, { totalXp }) => {
            if (totalXp >= 5000) return grantAchievement(userId, 'XP_5000');
            return null;
        },
        async (userId, { level }) => {
            if (level >= 5) return grantAchievement(userId, 'LEVEL_5');
            return null;
        },
        async (userId, { level }) => {
            if (level >= 10) return grantAchievement(userId, 'LEVEL_10');
            return null;
        },
    ],
};

// GET badges user
const getMyBadges = async (userId) => {
    const badges = await prisma.userAchievement.findMany({
        where: { userId },
        select: {
            earnedAt: true,
            achievement: {
                select: {
                    code: true,
                    title: true,
                    description: true,
                    iconUrl: true,
                    category: true,
                    xpReward: true,
                },
            },
        },
        orderBy: { earnedAt: 'desc' },
    });

    return badges;
};

module.exports = { checkAchievements, grantAchievement, getMyBadges };