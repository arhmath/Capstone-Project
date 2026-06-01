const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Transformasi Geometri',
        educationLevel: 'high',
        topic: 'transformasi_geometri',
        description:
            'Mempelajari translasi, refleksi, rotasi, dilatasi, matriks transformasi, dan komposisi transformasi dalam bidang koordinat.',
        orderIndex: 5,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Perubahan Posisi Objek',
                storyContent:
                    'Dalam kehidupan sehari-hari, suatu objek dapat digeser, diputar, dicerminkan, atau diperbesar. Semua perubahan ini dipelajari dalam transformasi geometri.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Transformasi Geometri?',
                storyContent:
                    'Transformasi geometri adalah proses mengubah posisi, ukuran, atau orientasi suatu bangun pada bidang koordinat.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Translasi',
                storyContent:
                    'Translasi adalah transformasi yang memindahkan setiap titik dengan arah dan jarak yang sama.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Rumus Translasi',
                storyContent:
                    'Jika translasi T = (a,b), maka titik (x,y) berpindah menjadi (x+a, y+b).',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Refleksi',
                storyContent:
                    'Refleksi atau pencerminan adalah transformasi yang menghasilkan bayangan suatu titik terhadap garis tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Refleksi Terhadap Sumbu X',
                storyContent:
                    'Refleksi terhadap sumbu x mengubah titik (x,y) menjadi (x,-y). Matriks transformasinya adalah [1 0; 0 -1].',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Rotasi',
                storyContent:
                    'Rotasi adalah transformasi yang memutar suatu titik terhadap pusat tertentu dengan besar sudut tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Matriks Rotasi',
                storyContent:
                    'Rotasi sebesar θ terhadap titik asal menggunakan matriks [cosθ -sinθ; sinθ cosθ].',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Dilatasi',
                storyContent:
                    'Dilatasi adalah transformasi yang memperbesar atau memperkecil ukuran bangun tanpa mengubah bentuknya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Faktor Skala',
                storyContent:
                    'Jika faktor skala k > 1 maka bangun diperbesar. Jika 0 < k < 1 maka bangun diperkecil.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Matriks Dilatasi',
                storyContent:
                    'Dilatasi berpusat di titik asal dengan faktor skala k menggunakan matriks [k 0; 0 k].',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Komposisi Transformasi',
                storyContent:
                    'Komposisi transformasi adalah gabungan dua atau lebih transformasi yang dilakukan secara berurutan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Transformasi dan Matriks',
                storyContent:
                    'Berbagai transformasi geometri dapat direpresentasikan menggunakan matriks sehingga perhitungan menjadi lebih mudah.',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Penerapan Transformasi',
                storyContent:
                    'Transformasi geometri digunakan pada desain grafis, animasi komputer, robotika, dan pemetaan digital.',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Translasi memindahkan titik.\n• Refleksi mencerminkan titik.\n• Rotasi memutar titik.\n• Dilatasi mengubah ukuran bangun.\n• Transformasi dapat direpresentasikan dengan matriks.\n• Beberapa transformasi dapat digabungkan dalam komposisi transformasi.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Transformasi Geometri Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Transformasi yang memindahkan setiap titik dengan arah dan jarak yang sama disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Refleksi', isCorrect: false, explanation: '' },
                    { optionText: 'Translasi', isCorrect: true, explanation: '' },
                    { optionText: 'Rotasi', isCorrect: false, explanation: '' },
                    { optionText: 'Dilatasi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Pencerminan suatu titik terhadap suatu garis disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'Translasi', isCorrect: false, explanation: '' },
                    { optionText: 'Refleksi', isCorrect: true, explanation: '' },
                    { optionText: 'Rotasi', isCorrect: false, explanation: '' },
                    { optionText: 'Dilatasi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Transformasi yang memutar titik terhadap pusat tertentu dengan sudut tertentu disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'Refleksi', isCorrect: false, explanation: '' },
                    { optionText: 'Translasi', isCorrect: false, explanation: '' },
                    { optionText: 'Rotasi', isCorrect: true, explanation: '' },
                    { optionText: 'Dilatasi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Perubahan ukuran suatu bangun tanpa mengubah bentuknya disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Refleksi', isCorrect: false, explanation: '' },
                    { optionText: 'Translasi', isCorrect: false, explanation: '' },
                    { optionText: 'Rotasi', isCorrect: false, explanation: '' },
                    { optionText: 'Dilatasi', isCorrect: true, explanation: '' },
                ],
            },
            {
                questionText: 'Matriks [1 0; 0 -1] merepresentasikan refleksi terhadap...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: 'Sumbu x', isCorrect: true, explanation: '' },
                    { optionText: 'Sumbu y', isCorrect: false, explanation: '' },
                    { optionText: 'Garis y = x', isCorrect: false, explanation: '' },
                    { optionText: 'Titik asal', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Gabungan dari dua atau lebih transformasi disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'Matriks transformasi', isCorrect: false, explanation: '' },
                    { optionText: 'Komposisi transformasi', isCorrect: true, explanation: '' },
                    { optionText: 'Transformasi tunggal', isCorrect: false, explanation: '' },
                    { optionText: 'Matriks identitas', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Matriks yang merepresentasikan rotasi sebesar θ terhadap pusat (0,0) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '[cosθ -sinθ; sinθ cosθ]', isCorrect: true, explanation: '' },
                    { optionText: '[sinθ cosθ; cosθ -sinθ]', isCorrect: false, explanation: '' },
                    { optionText: '[1 0; 0 1]', isCorrect: false, explanation: '' },
                    { optionText: '[0 1; 1 0]', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika faktor skala dilatasi k > 1, maka bangun bayangan akan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'Diperkecil', isCorrect: false, explanation: '' },
                    { optionText: 'Diperbesar', isCorrect: true, explanation: '' },
                    { optionText: 'Tetap sama', isCorrect: false, explanation: '' },
                    { optionText: 'Berubah bentuk', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Matriks transformasi untuk dilatasi dengan pusat (0,0) dan faktor skala k adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '[k 0; 0 k]', isCorrect: true, explanation: '' },
                    { optionText: '[1 k; k 1]', isCorrect: false, explanation: '' },
                    { optionText: '[0 k; k 0]', isCorrect: false, explanation: '' },
                    { optionText: '[k 1; 1 k]', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Bayangan titik (x,y) oleh translasi T=(a,b) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '(x-a, y-b)', isCorrect: false, explanation: '' },
                    { optionText: '(ax, by)', isCorrect: false, explanation: '' },
                    { optionText: '(x+a, y+b)', isCorrect: true, explanation: '' },
                    { optionText: '(-x, -y)', isCorrect: false, explanation: '' },
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