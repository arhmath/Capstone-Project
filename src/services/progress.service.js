const prisma = require('../config/prisma');

const getUserProgress = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            userEducationLevels: true,
        },
    });

    const completedSessions = await prisma.quizSession.findMany({
        where: {
            userId,
            status: 'completed',
        },
        select: {
            quiz: {
                select: {
                    moduleId: true,
                },
            },
        },
    });

    const completedQuizModuleIds = [
        ...new Set(completedSessions.map((session) => session.quiz?.moduleId).filter(Boolean))
    ];
    const [
        modulesCompleted,
        totalModules,
        achievementsUnlocked,
        totalAchievements,
        chaptersUnlocked,
        totalChapters,
    ] = await Promise.all([
        prisma.userModuleProgress.count({
            where: { userId, isCompleted: true, moduleId: { in: completedQuizModuleIds } },
        }),

        prisma.module.count({
            where: {
                educationLevel: user.userEducationLevels[0].educationLevel,
                isPublished: true,
            },
        }),

        prisma.userAchievement.count({
            where: { userId },
        }),

        prisma.achievement.count(),
    ]);

    return {
        modulesCompleted,
        totalModules,
        achievementsUnlocked,
        totalAchievements,
    };
};

const getUserAchievements = async (userId) => {
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
            orderBy: [
                { category: 'asc' },
                { id: 'asc' },
            ],
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
        userAchievements.map((ua) => [ua.achievementId, ua.earnedAt])
    );

    const achievements = allAchievements.map((ach) => ({
        id: ach.id,
        code: ach.code,
        title: ach.title,
        description: ach.description,
        icon: ach.iconUrl,
        category: ach.category,
        xpReward: ach.xpReward,
        isUnlocked: earnedMap.has(ach.id),
        unlockedAt: earnedMap.get(ach.id) ?? null,
    }));

    return { achievements };
};

module.exports = { getUserProgress, getUserAchievements };