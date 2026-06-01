const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Perbandingan Trigonometri',
        educationLevel: 'high',
        topic: 'perbandingan_trigonometri',
        description:
            'Mempelajari konsep dasar trigonometri, perbandingan sinus, cosinus, tangen, identitas dasar, sudut elevasi, dan penerapannya dalam kehidupan sehari-hari.',
        orderIndex: 2,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Menaksir Tinggi Gedung',
                storyContent:
                    'Seorang surveyor ingin mengetahui tinggi sebuah gedung tanpa harus memanjatnya. Ia menggunakan konsep trigonometri untuk menghitung tinggi gedung berdasarkan sudut dan jarak pengamatan.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Trigonometri?',
                storyContent:
                    'Trigonometri adalah cabang matematika yang mempelajari hubungan antara sudut dan sisi pada segitiga.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Segitiga Siku-Siku',
                storyContent:
                    'Trigonometri dasar menggunakan segitiga siku-siku yang memiliki satu sudut 90 derajat.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Hipotenusa',
                storyContent:
                    'Hipotenusa atau sisi miring adalah sisi yang berhadapan langsung dengan sudut siku-siku dan merupakan sisi terpanjang.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Sisi Depan dan Sisi Samping',
                storyContent:
                    'Terhadap suatu sudut tertentu, terdapat sisi depan (opposite) dan sisi samping (adjacent).',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Perbandingan Sinus',
                storyContent:
                    'Sinus adalah perbandingan panjang sisi depan terhadap sisi miring. Sin θ = depan / miring.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Perbandingan Cosinus',
                storyContent:
                    'Cosinus adalah perbandingan panjang sisi samping terhadap sisi miring. Cos θ = samping / miring.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Perbandingan Tangen',
                storyContent:
                    'Tangen adalah perbandingan sisi depan terhadap sisi samping. Tan θ = depan / samping.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Nilai Sudut Istimewa',
                storyContent:
                    'Beberapa nilai penting: sin 30° = 1/2, cos 60° = 1/2, dan tan 45° = 1.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Identitas Dasar',
                storyContent:
                    'Identitas trigonometri paling dasar adalah sin²x + cos²x = 1.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Fungsi Kebalikan',
                storyContent:
                    'Cosecan adalah kebalikan sinus, secan adalah kebalikan cosinus, dan cotangen adalah kebalikan tangen.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Sudut Elevasi',
                storyContent:
                    'Sudut elevasi adalah sudut yang dibentuk antara garis horizontal dan arah pandang ke atas.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Alat Pengukur Sudut',
                storyContent:
                    'Teodolit dan klinometer sering digunakan untuk mengukur sudut elevasi maupun depresi dalam survei lapangan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Hubungan dengan Teorema Pythagoras',
                storyContent:
                    'Trigonometri sering digunakan bersama Teorema Pythagoras untuk menentukan panjang sisi segitiga yang belum diketahui.',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Hipotenusa adalah sisi miring.\n• Sin = depan/miring.\n• Cos = samping/miring.\n• Tan = depan/samping.\n• Sin²x + Cos²x = 1.\n• Sudut elevasi mengarah ke atas.\n• Trigonometri digunakan dalam pengukuran jarak dan tinggi.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Perbandingan Trigonometri Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Sisi yang berada di seberang sudut siku-siku disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Sisi depan', isCorrect: false, explanation: '' },
                    { optionText: 'Sisi samping', isCorrect: false, explanation: '' },
                    { optionText: 'Sisi miring (hipotenusa)', isCorrect: true, explanation: '' },
                    { optionText: 'Sisi tegak', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Perbandingan sisi depan terhadap sisi samping disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'Sinus', isCorrect: false, explanation: '' },
                    { optionText: 'Cosinus', isCorrect: false, explanation: '' },
                    { optionText: 'Tangen', isCorrect: true, explanation: '' },
                    { optionText: 'Cosecan', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai sin 30 derajat adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: false, explanation: '' },
                    { optionText: '1/2', isCorrect: true, explanation: '' },
                    { optionText: '1/2√2', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai cos 60 derajat adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '1/2√3', isCorrect: false, explanation: '' },
                    { optionText: '1/2√2', isCorrect: false, explanation: '' },
                    { optionText: '1/2', isCorrect: true, explanation: '' },
                    { optionText: '1', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Identitas trigonometri dasar adalah sin²x + cos²x = ...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: true, explanation: '' },
                    { optionText: '2', isCorrect: false, explanation: '' },
                    { optionText: 'tan x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Alat yang digunakan untuk mengukur sudut elevasi adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'Teodolit / Klinometer', isCorrect: true, explanation: '' },
                    { optionText: 'Termometer', isCorrect: false, explanation: '' },
                    { optionText: 'Barometer', isCorrect: false, explanation: '' },
                    { optionText: 'Speedometer', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai tan 45 derajat adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '1/2', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: true, explanation: '' },
                    { optionText: '√3', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Kebalikan dari sinus adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'Secan', isCorrect: false, explanation: '' },
                    { optionText: 'Cotangen', isCorrect: false, explanation: '' },
                    { optionText: 'Cosecan', isCorrect: true, explanation: '' },
                    { optionText: 'Cosinus', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sudut elevasi dibentuk antara garis horizontal dengan arah pandang ke...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: 'Bawah', isCorrect: false, explanation: '' },
                    { optionText: 'Atas', isCorrect: true, explanation: '' },
                    { optionText: 'Samping', isCorrect: false, explanation: '' },
                    { optionText: 'Belakang', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Panjang sisi miring segitiga dengan sisi tegak 3 dan 4 adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '5', isCorrect: true, explanation: '' },
                    { optionText: '7', isCorrect: false, explanation: '' },
                    { optionText: '12', isCorrect: false, explanation: '' },
                    { optionText: '25', isCorrect: false, explanation: '' },
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