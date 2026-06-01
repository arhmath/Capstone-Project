const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Limit',
        educationLevel: 'high',
        topic: 'limit',
        description:
            'Mempelajari konsep limit fungsi, limit kiri dan kanan, sifat-sifat limit, limit fungsi aljabar dan trigonometri, serta hubungan limit dengan kekontinuan fungsi.',
        orderIndex: 2,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Mendekati Sebuah Nilai',
                storyContent:
                    'Ketika sebuah variabel bergerak semakin dekat ke suatu nilai tertentu, kita dapat mempelajari perilaku fungsi tanpa harus tepat berada pada nilai tersebut. Inilah ide dasar limit.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Pengertian Limit',
                storyContent:
                    'Limit adalah nilai yang didekati oleh suatu fungsi ketika variabel bebasnya mendekati nilai tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Pendekatan dari Kiri dan Kanan',
                storyContent:
                    'Limit dapat diamati dari dua arah yaitu limit kiri dan limit kanan terhadap suatu titik.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Syarat Keberadaan Limit',
                storyContent:
                    'Suatu limit ada jika limit kiri dan limit kanan bernilai sama.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Substitusi Langsung',
                storyContent:
                    'Untuk banyak fungsi, limit dapat dicari dengan mengganti nilai variabel langsung ke dalam fungsi.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Bentuk Tak Tentu',
                storyContent:
                    'Jika hasil substitusi menghasilkan bentuk tak tentu seperti 0/0, diperlukan metode lain untuk menyelesaikannya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Pemfaktoran',
                storyContent:
                    'Pada fungsi aljabar, bentuk 0/0 sering diselesaikan dengan memfaktorkan pembilang dan penyebut lalu menyederhanakannya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Perkalian Sekawan',
                storyContent:
                    'Untuk bentuk yang mengandung akar, perkalian sekawan sering digunakan untuk menghilangkan akar pada pembilang atau penyebut.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Sifat Penjumlahan Limit',
                storyContent:
                    'Limit dari jumlah dua fungsi sama dengan jumlah masing-masing limit fungsi tersebut.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Limit Fungsi Trigonometri',
                storyContent:
                    'Beberapa limit trigonometri penting sering digunakan sebagai dasar penyelesaian berbagai soal limit.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Limit Sinus',
                storyContent:
                    'Salah satu limit istimewa adalah lim (sin x)/x = 1 untuk x mendekati 0.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Limit Tangen',
                storyContent:
                    'Limit istimewa lainnya adalah lim (tan x)/x = 1 untuk x mendekati 0.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Limit Tak Hingga',
                storyContent:
                    'Untuk limit menuju tak hingga pada fungsi rasional, pembilang dan penyebut biasanya dibagi dengan pangkat tertinggi variabel.',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Kekontinuan Fungsi',
                storyContent:
                    'Fungsi kontinu di x=a jika f(a) terdefinisi, limit ada, dan nilai limit sama dengan f(a).',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Garis Sekan dan Turunan',
                storyContent:
                    'Kemiringan garis sekan diperoleh dari perubahan nilai fungsi terhadap perubahan variabel dan menjadi dasar konsep turunan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 16,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Limit adalah nilai pendekatan fungsi.\n• Limit ada jika limit kiri dan kanan sama.\n• Bentuk 0/0 dapat diselesaikan dengan pemfaktoran atau sekawan.\n• lim(sin x)/x = 1.\n• lim(tan x)/x = 1.\n• Fungsi kontinu jika limit sama dengan nilai fungsi.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Limit Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Konsep limit fungsi secara intuitif dapat dimaknai sebagai...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Kepastian nilai', isCorrect: false, explanation: '' },
                    { optionText: 'Batas pendekatan', isCorrect: true, explanation: '' },
                    { optionText: 'Nilai mutlak', isCorrect: false, explanation: '' },
                    { optionText: 'Perubahan tetap', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Syarat limit f(x) ada di titik c adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'f(c) terdefinisi', isCorrect: false, explanation: '' },
                    { optionText: 'Limit kiri = limit kanan', isCorrect: true, explanation: '' },
                    { optionText: 'f(c) = 0', isCorrect: false, explanation: '' },
                    { optionText: 'f(x) harus linear', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sifat limit lim[f(x) + g(x)] adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'lim f(x) × lim g(x)', isCorrect: false, explanation: '' },
                    { optionText: 'lim f(x) + lim g(x)', isCorrect: true, explanation: '' },
                    { optionText: 'f(c) + g(c)', isCorrect: false, explanation: '' },
                    { optionText: 'lim f(x) - lim g(x)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika hasil substitusi langsung menghasilkan bentuk 0/0, metode yang digunakan adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Penjumlahan', isCorrect: false, explanation: '' },
                    { optionText: 'Pemfaktoran atau perkalian sekawan', isCorrect: true, explanation: '' },
                    { optionText: 'Integrasi', isCorrect: false, explanation: '' },
                    { optionText: 'Diferensiasi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Fungsi f(x) dikatakan kontinu di x=a jika...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: 'f(a) ada', isCorrect: false, explanation: '' },
                    { optionText: 'Limit f(x) ada', isCorrect: false, explanation: '' },
                    { optionText: 'Limit f(x) = f(a)', isCorrect: false, explanation: '' },
                    { optionText: 'Semua benar', isCorrect: true, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai limit x mendekati 0 dari (sin x)/x adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: true, explanation: '' },
                    { optionText: 'Tak hingga', isCorrect: false, explanation: '' },
                    { optionText: '-1', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Strategi utama mencari limit x mendekati tak hingga pada fungsi rasional adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'Perkalian sekawan', isCorrect: false, explanation: '' },
                    { optionText: 'Membagi dengan pangkat tertinggi', isCorrect: true, explanation: '' },
                    { optionText: 'Substitusi langsung', isCorrect: false, explanation: '' },
                    { optionText: 'Pemfaktoran', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai limit x mendekati 0 dari (tan x)/x adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: true, explanation: '' },
                    { optionText: 'cos x', isCorrect: false, explanation: '' },
                    { optionText: 'sin x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Kemiringan garis sekan melalui dua titik pada kurva kontinu adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: "f'(x)", isCorrect: false, explanation: '' },
                    { optionText: '[f(x+dx)-f(x)]/dx', isCorrect: true, explanation: '' },
                    { optionText: 'f(x)', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Limit x mendekati c dari suatu konstanta k adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: 'c', isCorrect: false, explanation: '' },
                    { optionText: 'k', isCorrect: true, explanation: '' },
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: 'k + c', isCorrect: false, explanation: '' },
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