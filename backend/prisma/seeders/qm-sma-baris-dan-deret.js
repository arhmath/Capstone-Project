const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Barisan dan Deret',
        educationLevel: 'high',
        topic: 'barisan_dan_deret',
        description:
            'Mempelajari konsep barisan aritmetika, barisan geometri, deret, deret tak hingga, barisan Fibonacci, serta penerapannya pada bunga tunggal dan bunga majemuk.',
        orderIndex: 1,
        xpReward: 150,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Pola Bilangan di Sekitar Kita',
                storyContent:
                    'Barisan dan deret sering ditemukan dalam kehidupan sehari-hari, seperti pola kursi stadion, tabungan, hingga pertumbuhan populasi.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Pengertian Barisan',
                storyContent:
                    'Barisan adalah urutan bilangan yang tersusun menurut aturan tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Barisan Aritmetika',
                storyContent:
                    'Barisan aritmetika adalah barisan yang memiliki selisih (beda) tetap antara dua suku yang berurutan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Beda Barisan Aritmetika',
                storyContent:
                    'Beda dilambangkan dengan b. Contoh: 4, 6, 8, 10 memiliki beda 2.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Rumus Suku ke-n Aritmetika',
                storyContent:
                    'Rumus suku ke-n barisan aritmetika adalah Un = a + (n − 1)b.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Barisan Geometri',
                storyContent:
                    'Barisan geometri adalah barisan yang memiliki perbandingan atau rasio tetap antara dua suku berurutan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Rasio Barisan Geometri',
                storyContent:
                    'Rasio dilambangkan dengan r. Contoh: 64, 32, 16, 8 memiliki rasio 1/2.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Rumus Suku ke-n Geometri',
                storyContent:
                    'Rumus suku ke-n barisan geometri adalah Un = a × r^(n−1).',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Deret Aritmetika',
                storyContent:
                    'Deret adalah penjumlahan suku-suku dalam suatu barisan. Contohnya 1 + 2 + 3 + ... + 100.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Deret Geometri Tak Hingga',
                storyContent:
                    'Deret geometri tak hingga konvergen jika nilai mutlak rasio memenuhi |r| < 1.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Barisan Fibonacci',
                storyContent:
                    'Setiap suku Fibonacci diperoleh dari jumlah dua suku sebelumnya, misalnya 1, 1, 2, 3, 5, 8, 13.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Penerapan dalam Keuangan',
                storyContent:
                    'Konsep deret digunakan dalam bunga tunggal dan bunga majemuk untuk menghitung pertumbuhan nilai uang.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Bunga Tunggal',
                storyContent:
                    'Bunga tunggal dihitung hanya berdasarkan pokok tabungan atau pinjaman awal.',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Bunga Majemuk',
                storyContent:
                    'Pada bunga majemuk, bunga periode sebelumnya ditambahkan ke pokok sehingga menghasilkan bunga yang lebih besar pada periode berikutnya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Barisan aritmetika memiliki beda tetap.\n• Barisan geometri memiliki rasio tetap.\n• Rumus Un aritmetika: a + (n−1)b.\n• Rumus Un geometri: a × r^(n−1).\n• Deret adalah penjumlahan suku-suku barisan.\n• Fibonacci terbentuk dari penjumlahan dua suku sebelumnya.\n• Bunga tunggal dan majemuk merupakan penerapan barisan dan deret.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Barisan dan Deret Quiz',
        timeLimitSeconds: 600,
        passingScore: 70,
        maxXp: 150,
        isPublished: true,

        questions: [
            {
                questionText: 'Beda (b) pada barisan aritmetika 4, 6, 8, 10 adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: '4', isCorrect: false, explanation: '' },
                    { optionText: '2', isCorrect: true, explanation: '' },
                    { optionText: '6', isCorrect: false, explanation: '' },
                    { optionText: '10', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rumus suku ke-n barisan aritmetika adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'Un = a + (n - 1)b', isCorrect: true, explanation: '' },
                    { optionText: 'Un = a × r^(n - 1)', isCorrect: false, explanation: '' },
                    { optionText: 'Un = n²', isCorrect: false, explanation: '' },
                    { optionText: 'Un = a + nb', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rasio (r) dari barisan geometri 64, 32, 16, 8 adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '2', isCorrect: false, explanation: '' },
                    { optionText: '1/2', isCorrect: true, explanation: '' },
                    { optionText: '-2', isCorrect: false, explanation: '' },
                    { optionText: '4', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rumus suku ke-n barisan geometri adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Un = a + (n - 1)b', isCorrect: false, explanation: '' },
                    { optionText: 'Un = a × r^(n - 1)', isCorrect: true, explanation: '' },
                    { optionText: 'Un = a/r', isCorrect: false, explanation: '' },
                    { optionText: 'Un = r^n', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari deret 1 + 2 + 3 + ... + 100 adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '5.000', isCorrect: false, explanation: '' },
                    { optionText: '5.050', isCorrect: true, explanation: '' },
                    { optionText: '5.500', isCorrect: false, explanation: '' },
                    { optionText: '1.000', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Deret geometri tak hingga konvergen memiliki syarat...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'r > 1', isCorrect: false, explanation: '' },
                    { optionText: '|r| < 1', isCorrect: true, explanation: '' },
                    { optionText: 'r = 1', isCorrect: false, explanation: '' },
                    { optionText: 'r = 0', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Barisan Fibonacci 1, 1, 2, 3, 5, 8 memiliki suku berikutnya...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '10', isCorrect: false, explanation: '' },
                    { optionText: '13', isCorrect: true, explanation: '' },
                    { optionText: '11', isCorrect: false, explanation: '' },
                    { optionText: '15', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bunga yang dihitung berdasarkan pokok uang saja disebut...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'Bunga Majemuk', isCorrect: false, explanation: '' },
                    { optionText: 'Bunga Tunggal', isCorrect: true, explanation: '' },
                    { optionText: 'Deposito', isCorrect: false, explanation: '' },
                    { optionText: 'Kredit', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Pada bunga majemuk, bunga periode sebelumnya...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: 'Dihilangkan', isCorrect: false, explanation: '' },
                    { optionText: 'Dimasukkan ke pokok tabungan', isCorrect: true, explanation: '' },
                    { optionText: 'Tetap sama', isCorrect: false, explanation: '' },
                    { optionText: 'Berkurang', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika a = 2 dan b = 3, maka U10 barisan aritmetika adalah...',
                imageUrl: null,
                timeLimitSeconds: 45,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '27', isCorrect: false, explanation: '' },
                    { optionText: '29', isCorrect: true, explanation: '' },
                    { optionText: '31', isCorrect: false, explanation: '' },
                    { optionText: '32', isCorrect: false, explanation: '' },
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