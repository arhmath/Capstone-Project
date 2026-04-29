const prisma = require('../config/prisma');

const selectLevel = async (userId, educationLevel) => {
  const userEducationLevel = await prisma.userEducationLevel.create({
    data: {
      userId,
      educationLevel,
    },
    select: {
      id: true,
      userId: true,
      educationLevel: true,
      selectedAt: true,
    },
  });

  return userEducationLevel;
};

const getActiveLevel = async (userId) => {
  const userEducationLevel = await prisma.userEducationLevel.findFirst({
    where: { userId },
    orderBy: { selectedAt: 'desc' },
    select: {
      educationLevel: true,
      selectedAt: true,
    },
  });

  return userEducationLevel;
};

module.exports = { selectLevel, getActiveLevel };
