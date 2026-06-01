const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Turunan Fungsi',
        educationLevel: 'high',
        topic: 'turunan_fungsi',
        description:
            'Mempelajari konsep turunan fungsi, aturan diferensiasi, turunan fungsi aljabar dan trigonometri, serta penerapannya dalam menentukan gradien, titik stasioner, nilai maksimum, dan minimum.',
        orderIndex: 7,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Kecepatan Sesaat',
                storyContent:
                    'Ketika sebuah mobil bergerak, kita dapat menghitung kecepatan rata-rata. Namun untuk mengetahui kecepatan tepat pada suatu saat tertentu, digunakan konsep turunan.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Turunan?',
                storyContent:
                    'Turunan adalah ukuran laju perubahan suatu fungsi terhadap perubahan variabelnya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Hubungan Limit dan Turunan',
                storyContent:
                    'Konsep turunan dibangun dari limit. Turunan merupakan limit dari gradien garis secan ketika dua titik semakin berdekatan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Notasi Turunan',
                storyContent:
                    "Turunan fungsi f(x) dapat ditulis sebagai f'(x), dy/dx, atau Df(x).",
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Turunan Fungsi Pangkat',
                storyContent:
                    "Jika f(x)=xⁿ maka f'(x)=n·xⁿ⁻¹. Aturan ini disebut aturan pangkat.",
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Contoh Aturan Pangkat',
                storyContent:
                    "Jika f(x)=x³ maka f'(x)=3x². Jika f(x)=5x⁴ maka f'(x)=20x³.",
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Turunan Konstanta',
                storyContent:
                    'Turunan dari bilangan konstan selalu bernilai nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Turunan Penjumlahan dan Pengurangan',
                storyContent:
                    'Turunan dapat diterapkan pada setiap suku secara terpisah dalam operasi penjumlahan maupun pengurangan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Aturan Rantai',
                storyContent:
                    'Aturan rantai digunakan untuk mencari turunan fungsi komposisi, yaitu fungsi yang berada di dalam fungsi lain.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Turunan Sinus',
                storyContent:
                    'Turunan dari sin x adalah cos x. Aturan ini sangat penting dalam diferensiasi fungsi trigonometri.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Turunan Cosinus',
                storyContent:
                    'Turunan dari cos x adalah -sin x.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Makna Geometri Turunan',
                storyContent:
                    'Nilai turunan pada suatu titik menyatakan kemiringan garis singgung kurva di titik tersebut.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Fungsi Naik dan Turun',
                storyContent:
                    "Jika f'(x) > 0 maka fungsi naik. Jika f'(x) < 0 maka fungsi turun.",
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Titik Stasioner',
                storyContent:
                    "Titik stasioner terjadi ketika f'(x)=0. Pada titik ini kurva dapat memiliki nilai maksimum, minimum, atau titik belok.",
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Uji Turunan Kedua',
                storyContent:
                    "Jika f''(x)>0 maka titik stasioner merupakan minimum lokal. Jika f''(x)<0 maka merupakan maksimum lokal.",
                pageType: 'explanation',
            },
            {
                pageNumber: 16,
                sceneTitle: 'Penerapan Turunan',
                storyContent:
                    'Turunan digunakan dalam fisika untuk menghitung kecepatan dan percepatan, dalam ekonomi untuk optimasi keuntungan, dan dalam teknik untuk analisis perubahan.',
                pageType: 'explanation',
            },
            {
                pageNumber: 17,
                sceneTitle: 'Rangkuman',
                storyContent:
                    "• Turunan menyatakan laju perubahan.\n• Notasi umum adalah f'(x).\n• Turunan xⁿ adalah n·xⁿ⁻¹.\n• Turunan sin x = cos x.\n• Turunan cos x = -sin x.\n• f'(x)=0 menghasilkan titik stasioner.\n• Nilai maksimum dan minimum dapat dianalisis menggunakan turunan kedua.",
                pageType: 'summary',
            },
        ],
    };

    // Formatted quizData configuration to prevent undefined errors
    const quizData = {
        title: 'Kuis Turunan Fungsi',
        timeLimitSeconds: 600,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,
        questions: [
            {
                questionText: 'Laju perubahan sesaat dari suatu fungsi di suatu titik disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Limit', isCorrect: false, explanation: '' },
                    { optionText: 'Turunan', isCorrect: true, explanation: '' },
                    { optionText: 'Integral', isCorrect: false, explanation: '' },
                    { optionText: 'Kontinuitas', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Notasi turunan pertama f(x) terhadap x yang sering digunakan adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: "f'(x)", isCorrect: true, explanation: '' },
                    { optionText: '∫f(x)', isCorrect: false, explanation: '' },
                    { optionText: 'lim f(x)', isCorrect: false, explanation: '' },
                    { optionText: 'f(x)²', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Turunan dari f(x) = xⁿ adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'nx', isCorrect: false, explanation: '' },
                    { optionText: 'n·x^(n-1)', isCorrect: true, explanation: '' },
                    { optionText: 'x^(n+1)', isCorrect: false, explanation: '' },
                    { optionText: 'n^x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Aturan untuk mencari turunan fungsi komposisi disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Aturan Tambah', isCorrect: false, explanation: '' },
                    { optionText: 'Aturan Rantai', isCorrect: true, explanation: '' },
                    { optionText: 'Aturan Bagi', isCorrect: false, explanation: '' },
                    { optionText: 'Aturan Sarrus', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Turunan dari fungsi trigonometri f(x) = sin x adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: '-sin x', isCorrect: false, explanation: '' },
                    { optionText: 'cos x', isCorrect: true, explanation: '' },
                    { optionText: '-cos x', isCorrect: false, explanation: '' },
                    { optionText: 'tan x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Turunan dari fungsi trigonometri f(x) = cos x adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'sin x', isCorrect: false, explanation: '' },
                    { optionText: '-sin x', isCorrect: true, explanation: '' },
                    { optionText: 'cos x', isCorrect: false, explanation: '' },
                    { optionText: '-cos x', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: "Nilai turunan f'(x) pada suatu titik secara geometri menyatakan...",
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'Luas kurva', isCorrect: false, explanation: '' },
                    { optionText: 'Kemiringan garis singgung', isCorrect: true, explanation: '' },
                    { optionText: 'Titik potong sumbu y', isCorrect: false, explanation: '' },
                    { optionText: 'Panjang busur', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Fungsi f(x) dikatakan naik pada suatu interval jika...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: "f'(x) < 0", isCorrect: false, explanation: '' },
                    { optionText: "f'(x) > 0", isCorrect: true, explanation: '' },
                    { optionText: "f'(x) = 0", isCorrect: false, explanation: '' },
                    { optionText: 'f(x) = 0', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Titik stasioner terjadi pada grafik fungsi jika...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: "f'(x) > 0", isCorrect: false, explanation: '' },
                    { optionText: "f'(x) = 0", isCorrect: true, explanation: '' },
                    { optionText: "f'(x) < 0", isCorrect: false, explanation: '' },
                    { optionText: 'f(x) = k', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Nilai balik minimum atau maksimum dapat ditentukan dengan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: 'Uji turunan kedua', isCorrect: true, explanation: '' },
                    { optionText: 'Uji limit', isCorrect: false, explanation: '' },
                    { optionText: 'Uji integral', isCorrect: false, explanation: '' },
                    { optionText: 'Uji diskriminan', isCorrect: false, explanation: '' },
                ],
            },
        ]
    };

    // Changed variable name 'module' to 'createdModule' to avoid global conflict
    const createdModule = await prisma.module.create({
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
            moduleId: createdModule.id,
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