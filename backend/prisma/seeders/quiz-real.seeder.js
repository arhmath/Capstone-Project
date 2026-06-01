import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding quizzes...');

    const quizzes = [
        {
            moduleId: '641fe0b4-23c9-425d-bea9-d4f8d27a7df6',
            title: 'Penjumlahan Dan Pengurangan Sampai 20 Quiz',
            timeLimitSeconds: 300,
            passingScore: 70,
            maxXp: 100,
            isPublished: true,
            questions: [
                {
                    questionText: 'Hasil dari 10 + 5 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        { optionText: '14', isCorrect: false, explanation: '' },
                        { optionText: '15', isCorrect: true, explanation: '' },
                        { optionText: '16', isCorrect: false, explanation: '' },
                        { optionText: '17', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 12 + 4 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        { optionText: '15', isCorrect: false, explanation: '' },
                        { optionText: '16', isCorrect: true, explanation: '' },
                        { optionText: '17', isCorrect: false, explanation: '' },
                        { optionText: '18', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Andi punya 11 kelereng, menang main 3 kelereng. Kelereng Andi sekarang ada...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 3,
                    options: [
                        { optionText: '13', isCorrect: false, explanation: '' },
                        { optionText: '14', isCorrect: true, explanation: '' },
                        { optionText: '15', isCorrect: false, explanation: '' },
                        { optionText: '16', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 18 - 5 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 4,
                    options: [
                        { optionText: '12', isCorrect: false, explanation: '' },
                        { optionText: '13', isCorrect: true, explanation: '' },
                        { optionText: '14', isCorrect: false, explanation: '' },
                        { optionText: '15', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Di piring ada 15 pisang, dimakan 4 buah. Sisa pisang adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 5,
                    options: [
                        { optionText: '10', isCorrect: false, explanation: '' },
                        { optionText: '11', isCorrect: true, explanation: '' },
                        { optionText: '12', isCorrect: false, explanation: '' },
                        { optionText: '13', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 9 + 6 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 6,
                    options: [
                        { optionText: '14', isCorrect: false, explanation: '' },
                        { optionText: '15', isCorrect: true, explanation: '' },
                        { optionText: '16', isCorrect: false, explanation: '' },
                        { optionText: '17', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 17 - 8 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 7,
                    options: [
                        { optionText: '8', isCorrect: false, explanation: '' },
                        { optionText: '9', isCorrect: true, explanation: '' },
                        { optionText: '10', isCorrect: false, explanation: '' },
                        { optionText: '11', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Kakak punya 14 permen, diberikan kepada adik 7 permen. Sisa permen kakak adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 8,
                    options: [
                        { optionText: '6', isCorrect: false, explanation: '' },
                        { optionText: '7', isCorrect: true, explanation: '' },
                        { optionText: '8', isCorrect: false, explanation: '' },
                        { optionText: '9', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 8 + 7 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 9,
                    options: [
                        { optionText: '14', isCorrect: false, explanation: '' },
                        { optionText: '15', isCorrect: true, explanation: '' },
                        { optionText: '16', isCorrect: false, explanation: '' },
                        { optionText: '17', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Jika 15 - n = 10, maka nilai n adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 10,
                    options: [
                        { optionText: '4', isCorrect: false, explanation: '' },
                        { optionText: '5', isCorrect: true, explanation: '' },
                        { optionText: '6', isCorrect: false, explanation: '' },
                        { optionText: '7', isCorrect: false, explanation: '' },
                    ],
                },
            ],
        },
        {
            moduleId: '440e0a25-e023-4846-afc2-26491f4960b9',
            title: 'Ayo Membilang Sampai 100 Quiz',
            timeLimitSeconds: 300,
            passingScore: 70,
            maxXp: 100,
            isPublished: true,
            questions: [
                {
                    questionText: "Lambang bilangan dari 'enam puluh lima' adalah...",
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        { optionText: '56', isCorrect: false, explanation: '' },
                        { optionText: '65', isCorrect: true, explanation: '' },
                        { optionText: '605', isCorrect: false, explanation: '' },
                        { optionText: '66', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Angka 8 pada bilangan 82 menempati nilai tempat...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        { optionText: 'Satuan', isCorrect: false, explanation: '' },
                        { optionText: 'Puluhan', isCorrect: true, explanation: '' },
                        { optionText: 'Ratusan', isCorrect: false, explanation: '' },
                        { optionText: 'Ribuan', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Bilangan yang lebih besar dari 74 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 3,
                    options: [
                        { optionText: '70', isCorrect: false, explanation: '' },
                        { optionText: '73', isCorrect: false, explanation: '' },
                        { optionText: '78', isCorrect: true, explanation: '' },
                        { optionText: '72', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: '5 puluhan + 7 satuan sama dengan...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 4,
                    options: [
                        { optionText: '57', isCorrect: true, explanation: '' },
                        { optionText: '75', isCorrect: false, explanation: '' },
                        { optionText: '12', isCorrect: false, explanation: '' },
                        { optionText: '52', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Bilangan sebelum 90 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 5,
                    options: [
                        { optionText: '88', isCorrect: false, explanation: '' },
                        { optionText: '89', isCorrect: true, explanation: '' },
                        { optionText: '91', isCorrect: false, explanation: '' },
                        { optionText: '87', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Urutan dari yang terbesar: 45, 62, 55 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 6,
                    options: [
                        { optionText: '45, 55, 62', isCorrect: false, explanation: '' },
                        { optionText: '62, 55, 45', isCorrect: true, explanation: '' },
                        { optionText: '55, 62, 45', isCorrect: false, explanation: '' },
                        { optionText: '62, 45, 55', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Angka satuan pada bilangan 39 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 7,
                    options: [
                        { optionText: '3', isCorrect: false, explanation: '' },
                        { optionText: '9', isCorrect: true, explanation: '' },
                        { optionText: '30', isCorrect: false, explanation: '' },
                        { optionText: '39', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Bilangan di antara 21 dan 23 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 8,
                    options: [
                        { optionText: '20', isCorrect: false, explanation: '' },
                        { optionText: '22', isCorrect: true, explanation: '' },
                        { optionText: '24', isCorrect: false, explanation: '' },
                        { optionText: '25', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: 'Hasil dari 40 + 8 adalah...',
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 9,
                    options: [
                        { optionText: '48', isCorrect: true, explanation: '' },
                        { optionText: '84', isCorrect: false, explanation: '' },
                        { optionText: '408', isCorrect: false, explanation: '' },
                        { optionText: '44', isCorrect: false, explanation: '' },
                    ],
                },
                {
                    questionText: "Lambang bilangan 'seratus' adalah...",
                    imageUrl: null,
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 10,
                    options: [
                        { optionText: '10', isCorrect: false, explanation: '' },
                        { optionText: '100', isCorrect: true, explanation: '' },
                        { optionText: '1000', isCorrect: false, explanation: '' },
                        { optionText: '110', isCorrect: false, explanation: '' },
                    ],
                },
            ],
        }
    ];

    for (const quizData of quizzes) {
        await prisma.quiz.create({
            data: {
                moduleId: quizData.moduleId,
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
                            create: question.options.map((option) => ({
                                optionText: option.optionText,
                                isCorrect: option.isCorrect,
                                explanation: option.explanation,
                            })),
                        },
                    })),
                },
            },
        });
    }

    console.log('Quiz seeder berhasil dijalankan');
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });