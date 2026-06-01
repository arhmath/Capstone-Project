const prisma = require('../config/prisma');
const { checkAchievements } = require('./achievement.service');

const calculateLevel = (totalXp) => {
    const level = Math.floor(totalXp / 100) + 1;
    const xpToNextLevel = (level * 100) - totalXp;
    return { level, xpToNextLevel };
};

const grantXp = async (userId, xpAmount, sourceType, sourceId, tx = prisma) => {
    const client = tx ?? prisma;

    const before = await client.userXp.findUnique({ where: { userId } });
    const levelBefore = before?.level ?? 1;

    const updated = await client.userXp.upsert({
        where: { userId },
        update: { totalXp: { increment: xpAmount } },
        create: { userId, totalXp: xpAmount },
    });

    const level = Math.floor(updated.totalXp / 100) + 1;
    const xpToNextLevel = (level * 100) - updated.totalXp;

    await client.userXp.update({
        where: { userId },
        data: { level, xpToNextLevel },
    });

    await client.xpTransaction.create({
        data: { userId, xpAmount, sourceType, sourceId },
    });

    const leveledUp = level > levelBefore;

    const newAchievements = await checkAchievements(userId, 'xp_updated', {
        totalXp: updated.totalXp,
        level,
    }, client);

    return {
        xpGained: xpAmount,
        totalXp: updated.totalXp,
        level,
        xpToNextLevel,
        leveledUp,
        levelBefore,
        newAchievements,
    };
};

module.exports = { grantXp, calculateLevel };