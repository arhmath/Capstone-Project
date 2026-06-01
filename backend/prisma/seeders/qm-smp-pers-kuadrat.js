const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Persamaan Dan Fungsi Kuadrat',
        educationLevel: 'middle',
        topic: 'persamaan_dan_fungsi_kuadrat',
        description:
            'Mempelajari persamaan kuadrat, fungsi kuadrat, diskriminan, akar-akar persamaan, serta grafik parabola.',
        orderIndex: 2,
        xpReward: 120,
        isPublished: true,
        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Melacak Lintasan Bola',
                storyContent:
                    'Saat menendang bola ke udara, lintasan bola membentuk kurva tertentu. Dalam matematika, lintasan seperti ini dapat dimodelkan menggunakan fungsi kuadrat yang menghasilkan grafik berbentuk parabola.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Persamaan Kuadrat?',
                storyContent:
                    'Persamaan kuadrat adalah persamaan yang memiliki pangkat tertinggi dua.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Bentuk Umum Persamaan Kuadrat',
                storyContent:
                    'Bentuk umum persamaan kuadrat adalah:\nax² + bx + c = 0\ndengan a ≠ 0.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Akar-Akar Persamaan Kuadrat',
                storyContent:
                    'Akar persamaan kuadrat adalah nilai x yang membuat persamaan bernilai nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Diskriminan',
                storyContent:
                    'Diskriminan digunakan untuk menentukan jenis akar persamaan kuadrat.\nRumus diskriminan adalah D = b² − 4ac.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Makna Nilai Diskriminan',
                storyContent:
                    'Jika D > 0 maka memiliki dua akar real berbeda.\nJika D = 0 maka memiliki akar kembar.\nJika D < 0 maka tidak memiliki akar real.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Fungsi Kuadrat',
                storyContent:
                    'Fungsi kuadrat berbentuk f(x) = ax² + bx + c dan menghasilkan grafik parabola.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Sumbu Simetri dan Titik Puncak',
                storyContent:
                    'Setiap parabola memiliki sumbu simetri dan titik puncak yang menjadi titik tertinggi atau terendah grafik.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Arah Bukaan Parabola',
                storyContent:
                    'Jika a > 0 maka parabola terbuka ke atas.\nJika a < 0 maka parabola terbuka ke bawah.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Penerapan Dalam Kehidupan',
                storyContent:
                    'Fungsi kuadrat digunakan dalam fisika, teknik, ekonomi, dan berbagai bidang lain untuk memodelkan perubahan yang membentuk kurva parabola.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Bentuk umum persamaan kuadrat adalah ax² + bx + c = 0.\n• Diskriminan menentukan jenis akar.\n• Grafik fungsi kuadrat berbentuk parabola.\n• Nilai a menentukan arah bukaan parabola.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        topic: 'persamaan_dan_fungsi_kuadrat',
        title: 'Persamaan Dan Fungsi Kuadrat Quiz',
        timeLimitSeconds: 300,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,
        questions: [
            {
                questionText: 'Bentuk umum persamaan kuadrat adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'ax + b = 0', isCorrect: false, explanation: '' },
                    { optionText: 'ax² + bx + c = 0', isCorrect: true, explanation: '' },
                    { optionText: 'y = mx + c', isCorrect: false, explanation: '' },
                    { optionText: 'x² + y² = r²', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Akar-akar dari x² - 5x + 6 = 0 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: '2 dan 3', isCorrect: true, explanation: '' },
                    { optionText: '-2 dan -3', isCorrect: false, explanation: '' },
                    { optionText: '1 dan 6', isCorrect: false, explanation: '' },
                    { optionText: '0 dan 6', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai diskriminan (D) dari x² - 4x + 4 = 0 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '0', isCorrect: true, explanation: '' },
                    { optionText: '4', isCorrect: false, explanation: '' },
                    { optionText: '8', isCorrect: false, explanation: '' },
                    { optionText: '16', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika D > 0, maka persamaan kuadrat memiliki akar...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Kembar', isCorrect: false, explanation: '' },
                    { optionText: 'Tidak nyata', isCorrect: false, explanation: '' },
                    { optionText: 'Dua akar real berbeda', isCorrect: true, explanation: '' },
                    { optionText: 'Tidak memiliki akar', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sumbu simetri dari f(x) = x² - 4x + 3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: 'x = 1', isCorrect: false, explanation: '' },
                    { optionText: 'x = 2', isCorrect: true, explanation: '' },
                    { optionText: 'x = 3', isCorrect: false, explanation: '' },
                    { optionText: 'x = 4', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Titik potong f(x) = x² - 9 dengan sumbu y adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '(3, 0)', isCorrect: false, explanation: '' },
                    { optionText: '(-3, 0)', isCorrect: false, explanation: '' },
                    { optionText: '(0, -9)', isCorrect: true, explanation: '' },
                    { optionText: '(0, 9)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bentuk kurva dari fungsi kuadrat disebut...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'Hiperbola', isCorrect: false, explanation: '' },
                    { optionText: 'Parabola', isCorrect: true, explanation: '' },
                    { optionText: 'Elips', isCorrect: false, explanation: '' },
                    { optionText: 'Lingkaran', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Rumus untuk mencari nilai diskriminan adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'b² - 4ac', isCorrect: true, explanation: '' },
                    { optionText: 'b - 4ac', isCorrect: false, explanation: '' },
                    { optionText: 'b² + 4ac', isCorrect: false, explanation: '' },
                    { optionText: '2ab + c', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Titik puncak parabola f(x) = x² adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '(1, 1)', isCorrect: false, explanation: '' },
                    { optionText: '(0, 0)', isCorrect: true, explanation: '' },
                    { optionText: '(1, 0)', isCorrect: false, explanation: '' },
                    { optionText: '(0, 1)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika a > 0, maka grafik fungsi kuadrat terbuka ke...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: 'Bawah', isCorrect: false, explanation: '' },
                    { optionText: 'Atas', isCorrect: true, explanation: '' },
                    { optionText: 'Kanan', isCorrect: false, explanation: '' },
                    { optionText: 'Kiri', isCorrect: false, explanation: '' },
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