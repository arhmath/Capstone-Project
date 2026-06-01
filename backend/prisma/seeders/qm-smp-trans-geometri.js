const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Transformasi Geometri',
        educationLevel: 'middle',
        topic: 'transformasi_geometri',
        description:
            'Mempelajari translasi, refleksi, rotasi, dan dilatasi beserta penerapannya dalam bidang koordinat kartesius.',
        orderIndex: 3,
        xpReward: 100,
        isPublished: true,
        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Transformasi Dalam Kehidupan Sehari-hari',
                storyContent:
                    'Saat melihat bayangan di cermin, memindahkan benda, atau memperbesar gambar, sebenarnya kita sedang menggunakan konsep transformasi geometri.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Transformasi Geometri?',
                storyContent:
                    'Transformasi geometri adalah perubahan posisi, ukuran, atau bentuk suatu objek pada bidang koordinat.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Jenis-Jenis Transformasi',
                storyContent:
                    'Transformasi geometri terdiri dari translasi, refleksi, rotasi, dan dilatasi.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Translasi',
                storyContent:
                    'Translasi adalah pergeseran suatu titik atau bangun dengan arah dan jarak tertentu tanpa mengubah bentuk maupun ukuran.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Rumus Translasi',
                storyContent:
                    'Jika titik (x, y) ditranslasikan oleh T(a, b), maka bayangannya adalah (x + a, y + b).',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Contoh Translasi',
                storyContent:
                    'Titik (2, 3) ditranslasikan oleh T(1, 2).\nHasilnya adalah (3, 5).',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Refleksi',
                storyContent:
                    'Refleksi adalah pencerminan suatu titik atau bangun terhadap garis tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Refleksi Terhadap Sumbu X',
                storyContent:
                    'Titik (x, y) jika dicerminkan terhadap sumbu X menjadi (x, -y).',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Refleksi Terhadap Sumbu Y',
                storyContent:
                    'Titik (x, y) jika dicerminkan terhadap sumbu Y menjadi (-x, y).',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Refleksi Terhadap Garis y = x',
                storyContent:
                    'Titik (x, y) akan berubah menjadi (y, x). Contoh: (3, -4) menjadi (-4, 3).',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rotasi',
                storyContent:
                    'Rotasi adalah perputaran suatu titik atau bangun terhadap titik pusat tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Rotasi 90° dan 180°',
                storyContent:
                    'Pusat di (0,0):\n90° berlawanan arah jarum jam: (x,y) → (-y,x)\n180°: (x,y) → (-x,-y)',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Contoh Rotasi',
                storyContent:
                    'Titik (1,0) diputar 90° berlawanan arah jarum jam terhadap pusat (0,0) menjadi (0,1).',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Dilatasi',
                storyContent:
                    'Dilatasi adalah transformasi yang mengubah ukuran bangun dengan faktor skala tertentu.\nJika pusat di (0,0), maka (x,y) menjadi (kx,ky).',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Translasi menggeser bangun.\n• Refleksi mencerminkan bangun.\n• Rotasi memutar bangun.\n• Dilatasi memperbesar atau memperkecil bangun.\n• Faktor skala k > 1 memperbesar dan 0 < k < 1 memperkecil.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        topic: 'transformasi_geometri',
        title: 'Transformasi Geometri Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Bayangan titik (2, 3) oleh translasi T(1, 2) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: '(1, 1)', isCorrect: false, explanation: '' },
                    { optionText: '(3, 5)', isCorrect: true, explanation: '' },
                    { optionText: '(2, 5)', isCorrect: false, explanation: '' },
                    { optionText: '(4, 5)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Refleksi titik (x, y) terhadap sumbu x menghasilkan bayangan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: '(-x, y)', isCorrect: false, explanation: '' },
                    { optionText: '(x, -y)', isCorrect: true, explanation: '' },
                    { optionText: '(-x, -y)', isCorrect: false, explanation: '' },
                    { optionText: '(y, x)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rotasi titik (1, 0) sebesar 90 derajat berlawanan arah jarum jam dengan pusat (0,0) menghasilkan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '(0, 1)', isCorrect: true, explanation: '' },
                    { optionText: '(0, -1)', isCorrect: false, explanation: '' },
                    { optionText: '(-1, 0)', isCorrect: false, explanation: '' },
                    { optionText: '(1, 1)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Dilatasi titik (2, 4) dengan pusat (0,0) dan faktor skala 2 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '(1, 2)', isCorrect: false, explanation: '' },
                    { optionText: '(4, 8)', isCorrect: true, explanation: '' },
                    { optionText: '(4, 6)', isCorrect: false, explanation: '' },
                    { optionText: '(2, 8)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bayangan titik (3, -4) dicerminkan terhadap garis y = x adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '(3, 4)', isCorrect: false, explanation: '' },
                    { optionText: '(-3, -4)', isCorrect: false, explanation: '' },
                    { optionText: '(-4, 3)', isCorrect: true, explanation: '' },
                    { optionText: '(4, -3)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Transformasi yang memindahkan titik dengan jarak dan arah tertentu adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'Refleksi', isCorrect: false, explanation: '' },
                    { optionText: 'Translasi', isCorrect: true, explanation: '' },
                    { optionText: 'Rotasi', isCorrect: false, explanation: '' },
                    { optionText: 'Dilatasi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Refleksi terhadap garis x = h akan mengubah koordinat...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'y saja', isCorrect: false, explanation: '' },
                    { optionText: 'x saja', isCorrect: true, explanation: '' },
                    { optionText: 'x dan y', isCorrect: false, explanation: '' },
                    { optionText: 'Tidak ada yang berubah', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rotasi 180 derajat dengan pusat (0,0) memetakan (x, y) menjadi...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '(y, x)', isCorrect: false, explanation: '' },
                    { optionText: '(-y, -x)', isCorrect: false, explanation: '' },
                    { optionText: '(-x, -y)', isCorrect: true, explanation: '' },
                    { optionText: '(x, y)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Faktor skala k pada dilatasi yang memperkecil bangun adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: 'k > 1', isCorrect: false, explanation: '' },
                    { optionText: 'k = 1', isCorrect: false, explanation: '' },
                    { optionText: '0 < k < 1', isCorrect: true, explanation: '' },
                    { optionText: 'k < 0', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Pencerminan terhadap sumbu y memetakan titik (5, 2) menjadi...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '(-5, 2)', isCorrect: true, explanation: '' },
                    { optionText: '(5, -2)', isCorrect: false, explanation: '' },
                    { optionText: '(-5, -2)', isCorrect: false, explanation: '' },
                    { optionText: '(2, 5)', isCorrect: false, explanation: '' },
                ],
            },
        ]
    };

    const module = await prisma.module.create({
        data: {
            title: moduleData.title,
            educationLevel: moduleData.educationLevel,
            topic: moduleData.topic,
            description: moduleData.description,
            orderIndex: moduleData.orderIndex,
            xpReward: moduleData.xpReward,
            isPublished: moduleData.isPublished,

            pages: {
                create: moduleData.pages,
            },
        },
    });

    await prisma.quiz.create({
        data: {
            moduleId: module.id,
            title: quizData.title,
            timeLimitSeconds: quizData.timeLimitSeconds,
            passingScore: quizData.passingScore,
            maxXp: quizData.maxXp,
            isPublished: quizData.isPublished,

            questions: {
                create: quizData.questions.map((question) => ({
                    questionText: question.questionText,
                    imageUrl: question.imageUrl,
                    timeLimitSeconds: question.timeLimitSeconds,
                    baseXp: question.baseXp,
                    orderIndex: question.orderIndex,

                    options: {
                        create: question.options,
                    },
                })),
            },
        },
    });

    console.log(`Module '${moduleData.title}' with quiz '${quizData.title}' seeded successfully`);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });