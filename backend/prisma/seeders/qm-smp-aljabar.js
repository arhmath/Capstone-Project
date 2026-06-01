const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log(`Seeding module with quiz...`);

    const moduleData = {
        title: 'Aljabar',
        educationLevel: 'middle',
        topic: 'aljabar',
        description:
            'Mempelajari bentuk aljabar, variabel, koefisien, suku sejenis, serta operasi hitung aljabar sederhana.',
        orderIndex: 3,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Menghitung Harga Barang',
                storyContent:
                    'Rina membeli beberapa pensil dengan harga yang sama. Karena jumlah pensil belum diketahui, ia menggunakan huruf x untuk mewakili banyaknya pensil. Dari situ Rina mulai mengenal konsep aljabar.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Aljabar?',
                storyContent:
                    'Aljabar adalah cabang matematika yang menggunakan huruf atau simbol untuk mewakili bilangan yang belum diketahui.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Variabel',
                storyContent:
                    'Variabel adalah simbol atau huruf yang digunakan untuk menyatakan nilai yang belum diketahui. Contohnya x, y, dan p.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Koefisien',
                storyContent:
                    'Koefisien adalah bilangan yang berada di depan variabel. Pada 3x, angka 3 adalah koefisien.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Konstanta',
                storyContent:
                    'Konstanta adalah bilangan yang tidak memiliki variabel. Pada 3x - 5, angka 5 adalah konstanta.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Suku Sejenis',
                storyContent:
                    'Suku sejenis adalah suku yang memiliki variabel dan pangkat yang sama, seperti 2x dan -x.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Penjumlahan dan Pengurangan Aljabar',
                storyContent:
                    'Suku sejenis dapat dijumlahkan atau dikurangkan dengan menjumlahkan koefisiennya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Perkalian Bentuk Aljabar',
                storyContent:
                    'Bilangan dapat dikalikan ke dalam tanda kurung menggunakan sifat distributif. Contoh: 4(x - 2) = 4x - 8.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Substitusi Nilai',
                storyContent:
                    'Substitusi dilakukan dengan mengganti variabel menggunakan nilai tertentu untuk mencari hasil suatu bentuk aljabar.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Penerapan Aljabar',
                storyContent:
                    'Aljabar digunakan untuk menghitung harga barang, umur, jarak, dan berbagai permasalahan sehari-hari yang melibatkan nilai belum diketahui.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Variabel menyatakan nilai yang belum diketahui.\n• Koefisien adalah angka di depan variabel.\n• Konstanta adalah bilangan tanpa variabel.\n• Suku sejenis dapat dijumlahkan atau dikurangkan.\n• Aljabar digunakan untuk memodelkan berbagai masalah matematika.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Aljabar Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Koefisien x pada bentuk aljabar 3x - 5 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: '3', isCorrect: true, explanation: '' },
                    { optionText: '-5', isCorrect: false, explanation: '' },
                    { optionText: '5', isCorrect: false, explanation: '' },
                    { optionText: 'x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bentuk sederhana dari 2a + 3b - a + 2b adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'a + 5b', isCorrect: true, explanation: '' },
                    { optionText: '3a + 5b', isCorrect: false, explanation: '' },
                    { optionText: 'a + b', isCorrect: false, explanation: '' },
                    { optionText: '2a + 2b', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari 4(x - 2) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '4x - 2', isCorrect: false, explanation: '' },
                    { optionText: '4x + 8', isCorrect: false, explanation: '' },
                    { optionText: '4x - 8', isCorrect: true, explanation: '' },
                    { optionText: 'x - 8', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai dari 2x + 5 jika x diganti dengan angka 3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '6', isCorrect: false, explanation: '' },
                    { optionText: '10', isCorrect: false, explanation: '' },
                    { optionText: '11', isCorrect: true, explanation: '' },
                    { optionText: '13', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Suku-suku yang sejenis dari bentuk aljabar 2x + 3y - x + 5 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '2x dan 3y', isCorrect: false, explanation: '' },
                    { optionText: '2x dan -x', isCorrect: true, explanation: '' },
                    { optionText: '3y dan 5', isCorrect: false, explanation: '' },
                    { optionText: '-x dan 5', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil penjumlahan (2x + 3) + (4x - 5) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '6x + 8', isCorrect: false, explanation: '' },
                    { optionText: '6x - 2', isCorrect: true, explanation: '' },
                    { optionText: '2x - 2', isCorrect: false, explanation: '' },
                    { optionText: '8x - 15', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Variabel pada bentuk aljabar 7p - 3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '7', isCorrect: false, explanation: '' },
                    { optionText: 'p', isCorrect: true, explanation: '' },
                    { optionText: '-3', isCorrect: false, explanation: '' },
                    { optionText: '7p', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil pengurangan 3a dari 7a adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '4a', isCorrect: true, explanation: '' },
                    { optionText: '-4a', isCorrect: false, explanation: '' },
                    { optionText: '10a', isCorrect: false, explanation: '' },
                    { optionText: '-10a', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: "Kalimat matematika dari '5 lebihnya dari x' adalah...",
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '5x', isCorrect: false, explanation: '' },
                    { optionText: 'x - 5', isCorrect: false, explanation: '' },
                    { optionText: 'x + 5', isCorrect: true, explanation: '' },
                    { optionText: '5 - x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari 12x : 3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '4', isCorrect: false, explanation: '' },
                    { optionText: '4x', isCorrect: true, explanation: '' },
                    { optionText: '9x', isCorrect: false, explanation: '' },
                    { optionText: '36x', isCorrect: false, explanation: '' },
                ],
            },
        ],
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