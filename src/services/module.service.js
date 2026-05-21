const prisma = require('../config/prisma');
const { updateUserStreak } = require('./streak.service');

const getModules = async (userId) => {
    // 1. Ambil jenjang dari profil user yang login
    const userEducation = await prisma.userEducationLevel.findFirst({
        where: { userId },
        select: { educationLevel: true },
    });

    if (!userEducation) {
        const err = new Error('Profil pendidikan user belum diatur');
        err.status = 400;
        throw err;
    }

    const { educationLevel } = userEducation;

    // 2. Ambil modul sesuai jenjang user
    const modules = await prisma.module.findMany({
        where: {
            isPublished: true,
            educationLevel,
        },
        select: {
            id: true,
            title: true,
            description: true,
            educationLevel: true,
            topic: true,
            orderIndex: true,
            xpReward: true,
            createdAt: true,
            _count: {
                select: { pages: true },
            },
            quizzes: {
                select: {
                    id: true,
                    title: true,
                    sessions: {
                        where: {
                            userId: userId,
                        }
                    }
                },
            },
        },
        orderBy: [
            { topic: 'asc' },
            { orderIndex: 'asc' },
        ],
    });

    // 3. Ambil rekomendasi AI terbaru milik user (jika ada)
    const latestRecommendation = await prisma.aiRecommendation.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { pretestSessionId: true },
    });

    let recommendedMap = new Map();

    if (latestRecommendation) {
        const recommendations = await prisma.aiRecommendation.findMany({
            where: {
                userId,
                pretestSessionId: latestRecommendation.pretestSessionId,
            },
            select: {
                recommendedModuleId: true,
                confidence: true,
            },
        });

        recommendedMap = new Map(
            recommendations.map((r) => [r.recommendedModuleId, r.confidence])
        );
    }

    // 4. Ambil progress user untuk semua modul sekaligus
    const progresses = await prisma.userModuleProgress.findMany({
        where: { userId },
        select: {
            moduleId: true,
            lastPage: true,
            isCompleted: true,
            xpEarned: true,
        },
    });

    const progressMap = new Map(
        progresses.map((p) => [p.moduleId, p])
    );

    // 5. Gabungkan semua data
    const result = modules.map((module) => {
        const confidence = recommendedMap.get(module.id) ?? null;
        const progress = progressMap.get(module.id) ?? null;

        return {
            ...module,
            progress,
            isRecommended: confidence !== null,
            confidence,
        };
    });

    // 6. Urutkan: rekomendasi di atas (sorted by confidence), lalu sisanya
    result.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
    });

    return {
        educationLevel,
        modules: result,
    };
};

// GET /api/modules/:id
const getModuleById = async (moduleId, userId) => {
    const module = await prisma.module.findUnique({
        where: { id: moduleId },
        select: {
            id: true,
            title: true,
            description: true,
            educationLevel: true,
            topic: true,
            orderIndex: true,
            xpReward: true,
            isPublished: true,
            createdAt: true,
            pages: {
                select: {
                    id: true,
                    pageNumber: true,
                    sceneTitle: true,
                    pageType: true,
                },
                orderBy: { pageNumber: 'asc' },
            },
            _count: {
                select: { pages: true },
            },
        },
    });

    if (!module) {
        const err = new Error('Modul tidak ditemukan');
        err.status = 404;
        throw err;
    }

    if (!module.isPublished) {
        const err = new Error('Modul tidak tersedia');
        err.status = 403;
        throw err;
    }

    // Ambil progress user untuk modul ini
    const progress = await prisma.userModuleProgress.findUnique({
        where: { userId_moduleId: { userId, moduleId } },
        select: {
            lastPage: true,
            isCompleted: true,
            xpEarned: true,
            startedAt: true,
            completedAt: true,
        },
    });

    // Cek apakah modul ini direkomendasikan AI untuk user
    const recommendation = await prisma.aiRecommendation.findFirst({
        where: { userId, recommendedModuleId: moduleId },
        orderBy: { createdAt: 'desc' },
        select: { confidence: true },
    });

    return {
        ...module,
        progress: progress ?? null,
        isRecommended: recommendation !== null,
        confidence: recommendation?.confidence ?? null,
    };
};

// GET /api/modules/:id/pages/:pageNumber
const getModulePage = async (moduleId, pageNumber) => {
    const module = await prisma.module.findUnique({
        where: { id: moduleId },
        select: {
            id: true,
            isPublished: true,
            _count: { select: { pages: true } },
        },
    });

    if (!module || !module.isPublished) {
        const err = new Error('Modul tidak ditemukan');
        err.status = 404;
        throw err;
    }

    const page = await prisma.modulePage.findUnique({
        where: { moduleId_pageNumber: { moduleId, pageNumber } },
        select: {
            id: true,
            pageNumber: true,
            sceneTitle: true,
            storyContent: true,
            illustrationUrl: true,
            pageType: true,
        },
    });

    if (!page) {
        const err = new Error('Halaman tidak ditemukan');
        err.status = 404;
        throw err;
    }

    return {
        ...page,
        totalPages: module._count.pages,
        isFirstPage: pageNumber === 1,
        isLastPage: pageNumber === module._count.pages,
    };
};

// PUT /api/modules/:id/progress
const updateProgress = async (moduleId, userId, lastPage) => {
    const pageNum = parseInt(lastPage, 10);

    if (isNaN(pageNum)) {
        const err = new Error('Nomor halaman tidak valid');
        err.status = 400;
        throw err;
    }

    const module = await prisma.module.findUnique({
        where: { id: moduleId },
        select: {
            id: true,
            isPublished: true,
            _count: { select: { pages: true } },
        },
    });

    if (!module || !module.isPublished) {
        const err = new Error('Modul tidak ditemukan');
        err.status = 404;
        throw err;
    }

    const totalPages = module._count.pages;

    if (pageNum < 1 || pageNum > totalPages) {
        const err = new Error(`Nomor halaman tidak valid. Harus antara 1 dan ${totalPages}`);
        err.status = 400;
        throw err;
    }

    const existingProgress = await prisma.userModuleProgress.findUnique({
        where: {
            userId_moduleId: {
                userId,
                moduleId,
            },
        },
    });

    const isCompleted =
        existingProgress?.isCompleted ||
        pageNum === totalPages;

    const progress = await prisma.userModuleProgress.upsert({
        where: { userId_moduleId: { userId, moduleId } },
        update: {
            lastPage: pageNum,
            isCompleted: isCompleted,
            completedAt: isCompleted && !existingProgress?.completedAt
                ? new Date()
                : existingProgress?.completedAt,
        },
        create: {
            userId,
            moduleId,
            lastPage: pageNum,
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
        },
        select: {
            moduleId: true,
            lastPage: true,
            isCompleted: true,
            xpEarned: true,
            startedAt: true,
            completedAt: true,
        },
    });

    await updateUserStreak(userId);

    return { ...progress, totalPages };
};

module.exports = { getModules, getModuleById, getModulePage, updateProgress };