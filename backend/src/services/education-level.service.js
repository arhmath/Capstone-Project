const prisma = require('../config/prisma');

const selectLevel = async (userId, educationLevel) => {
  const existingLevel = await prisma.userEducationLevel.findFirst({
    where: { userId },
  });

  if (existingLevel) {
    // Jika sudah ada, update data lama
    return await prisma.userEducationLevel.update({
      where: {
        id: existingLevel.id,
      },
      data: {
        educationLevel,
        selectedAt: new Date(),
      },
      select: {
        id: true,
        userId: true,
        educationLevel: true,
        selectedAt: true,
      },
    });
  }

  // Jika belum ada, buat baru
  return await prisma.userEducationLevel.create({
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
