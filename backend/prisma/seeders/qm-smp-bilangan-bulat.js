const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding bilangan bulat...');

    const moduleData = {
        title: 'Bilangan Bulat',
        educationLevel: 'middle',
        topic: 'bilangan_bulat',
        description:
            'Mempelajari konsep bilangan bulat, operasi hitung bilangan bulat, serta penerapannya dalam kehidupan sehari-hari.',
        orderIndex: 1,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Perubahan Suhu',
                storyContent:
                    'Pada pagi hari suhu udara 5°C. Saat malam hari suhu turun 8°C sehingga menjadi -3°C. Dari peristiwa ini kita dapat memahami penggunaan bilangan bulat positif dan negatif dalam kehidupan sehari-hari.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Pengertian Bilangan Bulat',
                storyContent:
                    'Bilangan bulat adalah himpunan bilangan yang terdiri dari bilangan negatif, nol, dan bilangan positif.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Bilangan Positif dan Negatif',
                storyContent:
                    'Bilangan positif berada di sebelah kanan nol pada garis bilangan, sedangkan bilangan negatif berada di sebelah kiri nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Penjumlahan Bilangan Bulat',
                storyContent:
                    'Penjumlahan bilangan bulat dapat dilakukan dengan menggunakan garis bilangan atau aturan tanda.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Pengurangan Bilangan Bulat',
                storyContent:
                    'Pengurangan dapat diubah menjadi penjumlahan dengan lawan bilangannya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Perkalian Bilangan Bulat',
                storyContent:
                    'Positif × Positif = Positif, Negatif × Negatif = Positif, Positif × Negatif = Negatif.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Pembagian Bilangan Bulat',
                storyContent:
                    'Aturan tanda pada pembagian sama seperti pada perkalian bilangan bulat.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Operasi Campuran',
                storyContent:
                    'Kerjakan perkalian dan pembagian terlebih dahulu, kemudian penjumlahan dan pengurangan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Penerapan Dalam Kehidupan',
                storyContent:
                    'Bilangan bulat digunakan untuk menunjukkan suhu, kedalaman laut, ketinggian tempat, dan transaksi keuangan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Contoh Soal',
                storyContent:
                    '(-4) × (-3) = 12 karena dua bilangan negatif jika dikalikan menghasilkan bilangan positif.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Bilangan bulat terdiri dari bilangan negatif, nol, dan positif.\n• Operasi hitung mengikuti aturan tanda.\n• Operasi campuran mengikuti urutan pengerjaan.\n• Bilangan bulat banyak digunakan dalam kehidupan sehari-hari.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Bilangan Bulat Quiz',
        timeLimitSeconds: 300,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Hasil dari -12 + 7 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: '5', isCorrect: false, explanation: '' },
                    { optionText: '-5', isCorrect: true, explanation: '' },
                    { optionText: '19', isCorrect: false, explanation: '' },
                    { optionText: '-19', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari (-4) × (-3) adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: '-12', isCorrect: false, explanation: '' },
                    { optionText: '-7', isCorrect: false, explanation: '' },
                    { optionText: '12', isCorrect: true, explanation: '' },
                    { optionText: '7', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Suhu awal di sebuah ruangan adalah 5 derajat Celsius. Jika suhu turun 8 derajat, maka suhu sekarang adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '13', isCorrect: false, explanation: '' },
                    { optionText: '3', isCorrect: false, explanation: '' },
                    { optionText: '-3', isCorrect: true, explanation: '' },
                    { optionText: '-13', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Di antara bilangan berikut, manakah yang nilainya paling kecil?',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '-10', isCorrect: true, explanation: '' },
                    { optionText: '-5', isCorrect: false, explanation: '' },
                    { optionText: '0', isCorrect: false, explanation: '' },
                    { optionText: '2', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari 20 : (-4) adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '5', isCorrect: false, explanation: '' },
                    { optionText: '-5', isCorrect: true, explanation: '' },
                    { optionText: '16', isCorrect: false, explanation: '' },
                    { optionText: '-16', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Selisih antara angka 8 dan -3 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '5', isCorrect: false, explanation: '' },
                    { optionText: '-5', isCorrect: false, explanation: '' },
                    { optionText: '11', isCorrect: true, explanation: '' },
                    { optionText: '-11', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari operasi campuran -2 + (-3) × 4 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '-20', isCorrect: false, explanation: '' },
                    { optionText: '-14', isCorrect: true, explanation: '' },
                    { optionText: '-12', isCorrect: false, explanation: '' },
                    { optionText: '-10', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika a = -2 dan b = 3, maka nilai dari 2a + b adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '-1', isCorrect: true, explanation: '' },
                    { optionText: '-7', isCorrect: false, explanation: '' },
                    { optionText: '1', isCorrect: false, explanation: '' },
                    { optionText: '7', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Hasil dari 10 - 2 × (-3) adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '-24', isCorrect: false, explanation: '' },
                    { optionText: '-16', isCorrect: false, explanation: '' },
                    { optionText: '16', isCorrect: true, explanation: '' },
                    { optionText: '4', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'FPB (Faktor Persekutuan Terbesar) dari 24 dan 36 adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '6', isCorrect: false, explanation: '' },
                    { optionText: '8', isCorrect: false, explanation: '' },
                    { optionText: '12', isCorrect: true, explanation: '' },
                    { optionText: '24', isCorrect: false, explanation: '' },
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

    console.log('Bilangan Cacah Sampai 1000 seeded successfully');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });