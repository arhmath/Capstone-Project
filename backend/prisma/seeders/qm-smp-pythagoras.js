const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Teorema Pythagoras',
        educationLevel: 'middle',
        topic: 'teorema_pythagoras',
        description:
            'Mempelajari Teorema Pythagoras, tripel Pythagoras, dan penerapannya dalam menghitung panjang sisi segitiga siku-siku.',
        orderIndex: 2,
        xpReward: 100,
        isPublished: true,
        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Tangga dan Tembok',
                storyContent:
                    'Budi meletakkan tangga sepanjang 5 meter pada sebuah tembok. Kaki tangga berada 3 meter dari tembok. Ia ingin mengetahui tinggi yang dicapai tangga. Untuk menyelesaikannya digunakan Teorema Pythagoras.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Pengertian Teorema Pythagoras',
                storyContent:
                    'Teorema Pythagoras menyatakan bahwa pada segitiga siku-siku, kuadrat sisi miring sama dengan jumlah kuadrat kedua sisi lainnya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Rumus Pythagoras',
                storyContent:
                    'Jika sisi siku-siku adalah a dan b, serta sisi miring adalah c, maka berlaku:\na² + b² = c²',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Contoh Menghitung Hipotenusa',
                storyContent:
                    'Segitiga dengan alas 3 cm dan tinggi 4 cm memiliki sisi miring:\n√(3² + 4²) = √25 = 5 cm.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Tripel Pythagoras',
                storyContent:
                    'Tripel Pythagoras adalah tiga bilangan yang memenuhi rumus Pythagoras, seperti 3,4,5 atau 5,12,13.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Menentukan Jenis Segitiga',
                storyContent:
                    'Jika a² + b² = c² maka segitiga siku-siku.\nJika a² + b² > c² maka segitiga lancip.\nJika a² + b² < c² maka segitiga tumpul.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Diagonal Persegi',
                storyContent:
                    'Diagonal persegi dapat dicari menggunakan Teorema Pythagoras karena membentuk segitiga siku-siku.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Penerapan Dalam Kehidupan',
                storyContent:
                    'Teorema Pythagoras digunakan dalam konstruksi bangunan, pengukuran jarak, pemetaan, dan perancangan teknik.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Contoh Soal',
                storyContent:
                    'Jika alas segitiga 6 cm dan tinggi 8 cm, maka sisi miringnya adalah:\n√(6² + 8²) = √100 = 10 cm.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Contoh Tangga',
                storyContent:
                    'Tangga 5 meter yang berjarak 3 meter dari tembok memiliki tinggi:\n√(5² - 3²) = √16 = 4 meter.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Teorema Pythagoras berlaku pada segitiga siku-siku.\n• Rumus: a² + b² = c².\n• Digunakan untuk mencari panjang sisi segitiga.\n• Dapat digunakan menentukan jenis segitiga dan menghitung diagonal.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        topic: 'teorema_pythagoras',
        title: 'Teorema Pythagoras Quiz',
        timeLimitSeconds: 300,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,
        questions: [
            {
                questionText: 'Pada segitiga siku-siku, kuadrat sisi miring sama dengan...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Jumlah kuadrat sisi-sisi lainnya', isCorrect: true, explanation: '' },
                    { optionText: 'Selisih kuadrat sisi-sisi lainnya', isCorrect: false, explanation: '' },
                    { optionText: 'Perkalian sisi-sisi lainnya', isCorrect: false, explanation: '' },
                    { optionText: 'Jumlah sisi-sisi lainnya', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Segitiga dengan sisi 3 cm, 4 cm, dan 5 cm merupakan segitiga...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'Lancip', isCorrect: false, explanation: '' },
                    { optionText: 'Tumpul', isCorrect: false, explanation: '' },
                    { optionText: 'Siku-siku', isCorrect: true, explanation: '' },
                    { optionText: 'Sama kaki', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Panjang sisi miring segitiga siku-siku jika alas 6 cm dan tinggi 8 cm adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: '10 cm', isCorrect: true, explanation: '' },
                    { optionText: '12 cm', isCorrect: false, explanation: '' },
                    { optionText: '14 cm', isCorrect: false, explanation: '' },
                    { optionText: '100 cm', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Pasangan bilangan berikut yang merupakan Tripel Pythagoras adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: '4, 5, 6', isCorrect: false, explanation: '' },
                    { optionText: '7, 24, 25', isCorrect: true, explanation: '' },
                    { optionText: '8, 10, 12', isCorrect: false, explanation: '' },
                    { optionText: '10, 20, 30', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Panjang diagonal persegi yang sisinya 10 cm adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '10√2', isCorrect: true, explanation: '' },
                    { optionText: '20', isCorrect: false, explanation: '' },
                    { optionText: '10√3', isCorrect: false, explanation: '' },
                    { optionText: '100', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sebuah tangga sepanjang 5 m bersandar di tembok. Kaki tangga berjarak 3 m dari tembok. Tinggi tembok adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '2 m', isCorrect: false, explanation: '' },
                    { optionText: '4 m', isCorrect: true, explanation: '' },
                    { optionText: '4,5 m', isCorrect: false, explanation: '' },
                    { optionText: '5 m', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika a² + b² < c², maka jenis segitiganya adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'Lancip', isCorrect: false, explanation: '' },
                    { optionText: 'Siku-siku', isCorrect: false, explanation: '' },
                    { optionText: 'Tumpul', isCorrect: true, explanation: '' },
                    { optionText: 'Sama sisi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Panjang hipotenusa segitiga siku-siku sama kaki dengan sisi 5 cm adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: '5√2', isCorrect: true, explanation: '' },
                    { optionText: '5√3', isCorrect: false, explanation: '' },
                    { optionText: '10', isCorrect: false, explanation: '' },
                    { optionText: '25', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sisi sebuah segitiga adalah 9, 40, dan 41. Segitiga ini adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: 'Siku-siku', isCorrect: true, explanation: '' },
                    { optionText: 'Lancip', isCorrect: false, explanation: '' },
                    { optionText: 'Tumpul', isCorrect: false, explanation: '' },
                    { optionText: 'Sembarang', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Tinggi segitiga sama sisi dengan sisi 6 cm adalah...',
                imageUrl: null,
                timeLimitSeconds: 30,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: '3 cm', isCorrect: false, explanation: '' },
                    { optionText: '3√3 cm', isCorrect: true, explanation: '' },
                    { optionText: '6√3 cm', isCorrect: false, explanation: '' },
                    { optionText: '3√2 cm', isCorrect: false, explanation: '' },
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