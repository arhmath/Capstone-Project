const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Bilangan Berpangkat',
        educationLevel: 'middle',
        topic: 'bilangan_berpangkat',
        description:
            'Mempelajari sifat-sifat bilangan berpangkat, akar, pangkat negatif, pangkat pecahan, dan bentuk baku.',
        orderIndex: 1,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Pertumbuhan Bakteri',
                storyContent:
                    'Sebuah bakteri membelah menjadi 2 setiap jam. Untuk menghitung jumlah bakteri setelah beberapa jam, digunakan konsep bilangan berpangkat.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Pengertian Bilangan Berpangkat',
                storyContent:
                    'Bilangan berpangkat adalah bentuk perkalian berulang dari suatu bilangan dengan dirinya sendiri.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Perkalian Bilangan Berpangkat',
                storyContent:
                    'Jika basis sama, pangkat dijumlahkan. Contoh: 2³ × 2⁴ = 2⁷.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Pembagian Bilangan Berpangkat',
                storyContent:
                    'Jika basis sama, pangkat dikurangkan. Contoh: m¹⁰ : m² = m⁸.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Pangkat dari Pangkat',
                storyContent:
                    'Jika suatu pangkat dipangkatkan lagi, maka pangkat dikalikan. Contoh: (5²)³ = 5⁶.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Pangkat Nol',
                storyContent:
                    'Setiap bilangan selain nol yang dipangkatkan nol bernilai 1.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Pangkat Negatif',
                storyContent:
                    'Pangkat negatif dapat diubah menjadi pecahan. Contoh: 3⁻² = 1/3² = 1/9.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Akar dan Pangkat Pecahan',
                storyContent:
                    'Akar merupakan kebalikan dari perpangkatan. Contoh: √225 = 15 dan 8^(2/3) = 4.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Bentuk Baku',
                storyContent:
                    'Bentuk baku digunakan untuk menuliskan bilangan sangat besar atau sangat kecil dengan pangkat sepuluh.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Penerapan Bilangan Berpangkat',
                storyContent:
                    'Bilangan berpangkat digunakan dalam ilmu pengetahuan, teknologi, astronomi, dan perhitungan pertumbuhan populasi.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Pangkat dengan basis sama dapat dijumlahkan atau dikurangkan sesuai operasinya.\n• Pangkat nol bernilai 1.\n• Pangkat negatif menjadi pecahan.\n• Akar adalah kebalikan perpangkatan.\n• Bentuk baku menggunakan pangkat 10.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Bilangan Berpangkat Quiz',
        timeLimitSeconds: 300,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Hasil dari 2^3 × 2^4 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: '2^7', isCorrect: true, explanation: '' },
                    { optionText: '2^12', isCorrect: false, explanation: '' },
                    { optionText: '4^7', isCorrect: false, explanation: '' },
                    { optionText: '4^12', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai dari (5^2)^3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: '5^5', isCorrect: false, explanation: '' },
                    { optionText: '5^6', isCorrect: true, explanation: '' },
                    { optionText: '10^3', isCorrect: false, explanation: '' },
                    { optionText: '125', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bentuk sederhana dari m^10 : m^2 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'm^5', isCorrect: false, explanation: '' },
                    { optionText: 'm^8', isCorrect: true, explanation: '' },
                    { optionText: 'm^12', isCorrect: false, explanation: '' },
                    { optionText: 'm^20', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai dari 7^0 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: true, explanation: '' },
                    { optionText: '7', isCorrect: false, explanation: '' },
                    { optionText: '49', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bentuk pangkat positif dari 3^-2 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '-9', isCorrect: false, explanation: '' },
                    { optionText: '1/6', isCorrect: false, explanation: '' },
                    { optionText: '1/9', isCorrect: true, explanation: '' },
                    { optionText: '-1/6', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari akar pangkat dua dari 225 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '13', isCorrect: false, explanation: '' },
                    { optionText: '14', isCorrect: false, explanation: '' },
                    { optionText: '15', isCorrect: true, explanation: '' },
                    { optionText: '25', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai dari √2 × √8 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '4', isCorrect: true, explanation: '' },
                    { optionText: '8', isCorrect: false, explanation: '' },
                    { optionText: '16', isCorrect: false, explanation: '' },
                    { optionText: '2', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bentuk baku dari bilangan 0,000025 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '2,5 × 10^-5', isCorrect: true, explanation: '' },
                    { optionText: '2,5 × 10^-4', isCorrect: false, explanation: '' },
                    { optionText: '25 × 10^-6', isCorrect: false, explanation: '' },
                    { optionText: '0,25 × 10^-4', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari (1/2)^-3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '1/8', isCorrect: false, explanation: '' },
                    { optionText: '8', isCorrect: true, explanation: '' },
                    { optionText: '-8', isCorrect: false, explanation: '' },
                    { optionText: '6', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari 8^(2/3) adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '2', isCorrect: false, explanation: '' },
                    { optionText: '4', isCorrect: true, explanation: '' },
                    { optionText: '16', isCorrect: false, explanation: '' },
                    { optionText: '64', isCorrect: false, explanation: '' },
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