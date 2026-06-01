const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');

    const moduleData = {
        title: 'Vektor',
        educationLevel: 'high',
        topic: 'vektor',
        description:
            'Mempelajari konsep vektor, besar vektor, vektor posisi, vektor satuan, operasi vektor, hasil kali titik, dan penerapan vektor dalam geometri.',
        orderIndex: 4,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Arah dan Besaran',
                storyContent:
                    'Saat berjalan 5 meter ke timur, informasi yang diberikan tidak hanya jarak tetapi juga arah. Besaran seperti ini disebut vektor.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Vektor?',
                storyContent:
                    'Vektor adalah besaran yang memiliki nilai (besar) dan arah. Contohnya perpindahan, kecepatan, dan gaya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Besaran Skalar',
                storyContent:
                    'Skalar adalah besaran yang hanya memiliki nilai tanpa arah, seperti massa, suhu, waktu, dan energi.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Representasi Vektor',
                storyContent:
                    'Vektor biasanya digambarkan sebagai ruas garis berarah. Panjang garis menunjukkan besar vektor dan panah menunjukkan arahnya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Vektor Posisi',
                storyContent:
                    'Vektor posisi adalah vektor yang pangkalnya berada di titik asal koordinat dan ujungnya menunjukkan posisi suatu titik.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Magnitudo Vektor',
                storyContent:
                    'Magnitudo atau modulus vektor adalah panjang vektor. Untuk vektor <x,y>, panjangnya adalah √(x²+y²).',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Vektor Satuan',
                storyContent:
                    'Vektor satuan adalah vektor yang memiliki panjang tepat satu satuan dan digunakan untuk menunjukkan arah.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Penjumlahan Vektor',
                storyContent:
                    'Penjumlahan vektor dapat dilakukan dengan aturan segitiga atau jajargenjang serta dengan menjumlahkan komponen-komponennya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Komponen Vektor',
                storyContent:
                    'Jika titik A(x₁,y₁) dan B(x₂,y₂), maka vektor AB memiliki komponen <x₂−x₁, y₂−y₁>.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Hasil Kali Titik',
                storyContent:
                    'Dot product atau hasil kali titik menghasilkan bilangan skalar. Rumusnya u·v = |u||v| cos θ.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Vektor Tegak Lurus',
                storyContent:
                    'Jika hasil kali titik dua vektor bernilai nol, maka kedua vektor tersebut saling tegak lurus.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Proyeksi Vektor',
                storyContent:
                    'Proyeksi skalar vektor u pada v dapat dihitung dengan rumus (u·v)/|v|.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Sudut Antar Vektor',
                storyContent:
                    'Sudut antara dua vektor dapat dicari menggunakan cos θ = (u·v)/(|u||v|).',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Penerapan Vektor',
                storyContent:
                    'Vektor digunakan dalam fisika, navigasi, grafika komputer, teknik sipil, dan pemodelan gerak benda.',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Vektor memiliki besar dan arah.\n• Skalar hanya memiliki besar.\n• Magnitudo menyatakan panjang vektor.\n• Dot product menghasilkan skalar.\n• Dot product nol menunjukkan dua vektor tegak lurus.\n• Sudut antar vektor dapat dicari menggunakan kosinus.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Vektor Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Besaran yang memiliki nilai dan arah disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Skalar', isCorrect: false, explanation: '' },
                    { optionText: 'Vektor', isCorrect: true, explanation: '' },
                    { optionText: 'Massa', isCorrect: false, explanation: '' },
                    { optionText: 'Suhu', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Vektor yang pangkalnya di titik asal (0,0) disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'Vektor nol', isCorrect: false, explanation: '' },
                    { optionText: 'Vektor posisi', isCorrect: true, explanation: '' },
                    { optionText: 'Vektor bebas', isCorrect: false, explanation: '' },
                    { optionText: 'Vektor negatif', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Panjang atau besar dari suatu vektor disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'Komponen', isCorrect: false, explanation: '' },
                    { optionText: 'Resultan', isCorrect: false, explanation: '' },
                    { optionText: 'Modulus atau Magnitudo', isCorrect: true, explanation: '' },
                    { optionText: 'Proyeksi', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Operasi u · v yang menghasilkan besaran skalar disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Hasil kali silang', isCorrect: false, explanation: '' },
                    { optionText: 'Hasil kali titik (dot product)', isCorrect: true, explanation: '' },
                    { optionText: 'Penjumlahan vektor', isCorrect: false, explanation: '' },
                    { optionText: 'Perkalian skalar', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika hasil kali titik dua vektor bernilai nol, maka kedua vektor...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: 'Sejajar', isCorrect: false, explanation: '' },
                    { optionText: 'Berimpit', isCorrect: false, explanation: '' },
                    { optionText: 'Tegak lurus', isCorrect: true, explanation: '' },
                    { optionText: 'Searah', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Vektor yang memiliki panjang satu satuan disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: 'Vektor nol', isCorrect: false, explanation: '' },
                    { optionText: 'Vektor posisi', isCorrect: false, explanation: '' },
                    { optionText: 'Vektor satuan', isCorrect: true, explanation: '' },
                    { optionText: 'Vektor basis', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Komponen vektor dari titik A(x₁,y₁) ke B(x₂,y₂) adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: '<x₁+x₂, y₁+y₂>', isCorrect: false, explanation: '' },
                    { optionText: '<x₂−x₁, y₂−y₁>', isCorrect: true, explanation: '' },
                    { optionText: '<x₁−x₂, y₁−y₂>', isCorrect: false, explanation: '' },
                    { optionText: '<x₁·x₂, y₁·y₂>', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Penjumlahan dua vektor secara geometris dapat menggunakan aturan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'Aturan Sarrus', isCorrect: false, explanation: '' },
                    { optionText: 'Aturan Cramer', isCorrect: false, explanation: '' },
                    { optionText: 'Aturan Jajargenjang atau Segitiga', isCorrect: true, explanation: '' },
                    { optionText: 'Teorema Sisa', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Proyeksi skalar vektor u pada v dirumuskan dengan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: '(u · v) / |v|', isCorrect: true, explanation: '' },
                    { optionText: '(u · v) / |u|', isCorrect: false, explanation: '' },
                    { optionText: 'u · v', isCorrect: false, explanation: '' },
                    { optionText: '|u| · |v|', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sudut antara dua vektor dapat dicari menggunakan nilai...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: 'Sinus', isCorrect: false, explanation: '' },
                    { optionText: 'Kosinus', isCorrect: true, explanation: '' },
                    { optionText: 'Tangen', isCorrect: false, explanation: '' },
                    { optionText: 'Sekan', isCorrect: false, explanation: '' },
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