const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');
    const moduleData = {
        title: 'Matriks',
        educationLevel: 'high',
        topic: 'matriks',
        description:
            'Mempelajari konsep dasar matriks, jenis-jenis matriks, operasi matriks, determinan, invers, dan penerapannya dalam berbagai bidang.',
        orderIndex: 3,
        xpReward: 100,
        isPublished: true,

        pages: [
            {
                pageNumber: 1,
                sceneTitle: 'Data dalam Bentuk Tabel',
                storyContent:
                    'Sebuah perusahaan menyimpan data penjualan dalam bentuk baris dan kolom. Penyajian seperti ini menjadi dasar konsep matriks.',
                pageType: 'story',
            },
            {
                pageNumber: 2,
                sceneTitle: 'Apa Itu Matriks?',
                storyContent:
                    'Matriks adalah susunan bilangan yang ditulis dalam bentuk baris dan kolom serta dikelilingi tanda kurung atau siku.',
                pageType: 'explanation',
            },
            {
                pageNumber: 3,
                sceneTitle: 'Ordo Matriks',
                storyContent:
                    'Ordo matriks menunjukkan banyaknya baris dan kolom. Matriks 3×4 memiliki 3 baris dan 4 kolom.',
                pageType: 'explanation',
            },
            {
                pageNumber: 4,
                sceneTitle: 'Jenis Matriks',
                storyContent:
                    'Beberapa jenis matriks antara lain matriks baris, kolom, persegi, diagonal, identitas, dan nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 5,
                sceneTitle: 'Kesamaan Matriks',
                storyContent:
                    'Dua matriks dikatakan sama jika memiliki ordo yang sama dan setiap elemen yang seletak memiliki nilai yang sama.',
                pageType: 'explanation',
            },
            {
                pageNumber: 6,
                sceneTitle: 'Transpose Matriks',
                storyContent:
                    'Transpose matriks diperoleh dengan menukar posisi elemen pada baris menjadi kolom dan sebaliknya.',
                pageType: 'explanation',
            },
            {
                pageNumber: 7,
                sceneTitle: 'Matriks Segitiga Atas',
                storyContent:
                    'Matriks segitiga atas adalah matriks persegi yang seluruh elemen di bawah diagonal utamanya bernilai nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 8,
                sceneTitle: 'Determinan Matriks',
                storyContent:
                    'Determinan merupakan nilai khusus yang dapat dihitung dari matriks persegi. Untuk ordo 2×2 digunakan rumus ad - bc.',
                pageType: 'explanation',
            },
            {
                pageNumber: 9,
                sceneTitle: 'Metode Sarrus',
                storyContent:
                    'Metode Sarrus digunakan untuk menghitung determinan matriks berordo 3×3 secara lebih sederhana.',
                pageType: 'explanation',
            },
            {
                pageNumber: 10,
                sceneTitle: 'Invers Matriks',
                storyContent:
                    'Invers matriks dinotasikan dengan A⁻¹ dan hanya dimiliki oleh matriks yang determinannya tidak sama dengan nol.',
                pageType: 'explanation',
            },
            {
                pageNumber: 11,
                sceneTitle: 'Matriks Singular',
                storyContent:
                    'Matriks yang memiliki determinan sama dengan nol disebut matriks singular dan tidak memiliki invers.',
                pageType: 'explanation',
            },
            {
                pageNumber: 12,
                sceneTitle: 'Operasi Matriks',
                storyContent:
                    'Matriks dapat dijumlahkan, dikurangkan, dan dikalikan sesuai aturan tertentu.',
                pageType: 'explanation',
            },
            {
                pageNumber: 13,
                sceneTitle: 'Sifat Perkalian Matriks',
                storyContent:
                    'Perkalian matriks memiliki sifat asosiatif dan distributif, tetapi tidak selalu memenuhi sifat komutatif.',
                pageType: 'explanation',
            },
            {
                pageNumber: 14,
                sceneTitle: 'Penerapan Matriks',
                storyContent:
                    'Matriks digunakan dalam grafika komputer, sistem persamaan linear, kecerdasan buatan, dan kriptografi.',
                pageType: 'explanation',
            },
            {
                pageNumber: 15,
                sceneTitle: 'Rangkuman',
                storyContent:
                    '• Matriks tersusun atas baris dan kolom.\n• Transpose diperoleh dengan menukar baris dan kolom.\n• Determinan 2×2 = ad - bc.\n• Matriks singular memiliki determinan nol.\n• Invers dinotasikan A⁻¹.\n• Perkalian matriks tidak bersifat komutatif.\n• Matriks banyak digunakan dalam teknologi dan kriptografi.',
                pageType: 'summary',
            },
        ],
    };

    const quizData = {
        title: 'Matriks Quiz',
        timeLimitSeconds: 400,
        passingScore: 70,
        maxXp: 100,
        isPublished: true,

        questions: [
            {
                questionText: 'Matriks yang diperoleh dengan cara menukar elemen pada baris menjadi elemen pada kolom disebut matriks...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 1,
                options: [
                    { optionText: 'Identitas', isCorrect: false, explanation: '' },
                    { optionText: 'Transpos', isCorrect: true, explanation: '' },
                    { optionText: 'Diagonal', isCorrect: false, explanation: '' },
                    { optionText: 'Simetris', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Determinan matriks 2×2 [a b; c d] dirumuskan dengan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 2,
                options: [
                    { optionText: 'ad + bc', isCorrect: false, explanation: '' },
                    { optionText: 'ab - cd', isCorrect: false, explanation: '' },
                    { optionText: 'ad - bc', isCorrect: true, explanation: '' },
                    { optionText: 'ac - bd', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Dua matriks A dan B dikatakan sama jika...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 3,
                options: [
                    { optionText: 'Ordonya sama', isCorrect: false, explanation: '' },
                    { optionText: 'Elemen seletaknya sama', isCorrect: false, explanation: '' },
                    { optionText: 'Ordo sama dan elemen seletak sama', isCorrect: true, explanation: '' },
                    { optionText: 'Jumlah barisnya sama', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Matriks persegi yang elemen di bawah diagonal utama bernilai nol disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 4,
                options: [
                    { optionText: 'Segitiga bawah', isCorrect: false, explanation: '' },
                    { optionText: 'Segitiga atas', isCorrect: true, explanation: '' },
                    { optionText: 'Identitas', isCorrect: false, explanation: '' },
                    { optionText: 'Diagonal', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Jika matriks A berordo 3×4 maka termasuk matriks...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 5,
                options: [
                    { optionText: 'Persegi', isCorrect: false, explanation: '' },
                    { optionText: 'Tegak', isCorrect: false, explanation: '' },
                    { optionText: 'Datar', isCorrect: true, explanation: '' },
                    { optionText: 'Kolom', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Metode Sarrus digunakan untuk mencari determinan matriks berordo...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 6,
                options: [
                    { optionText: '1×1', isCorrect: false, explanation: '' },
                    { optionText: '2×2', isCorrect: false, explanation: '' },
                    { optionText: '3×3', isCorrect: true, explanation: '' },
                    { optionText: '4×4', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Invers dari matriks A dinotasikan dengan...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 7,
                options: [
                    { optionText: 'Aᵀ', isCorrect: false, explanation: '' },
                    { optionText: '|A|', isCorrect: false, explanation: '' },
                    { optionText: 'A⁻¹', isCorrect: true, explanation: '' },
                    { optionText: 'adj(A)', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Matriks yang determinannya bernilai nol disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 8,
                options: [
                    { optionText: 'Nonsingular', isCorrect: false, explanation: '' },
                    { optionText: 'Singular', isCorrect: true, explanation: '' },
                    { optionText: 'Identitas', isCorrect: false, explanation: '' },
                    { optionText: 'Simetris', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Sifat yang tidak berlaku pada perkalian dua matriks adalah...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 9,
                options: [
                    { optionText: 'Asosiatif', isCorrect: false, explanation: '' },
                    { optionText: 'Distributif', isCorrect: false, explanation: '' },
                    { optionText: 'Komutatif', isCorrect: true, explanation: '' },
                    { optionText: 'Identitas', isCorrect: false, explanation: '' },
                ],
            },
            {
                questionText: 'Ilmu menyandikan pesan yang dapat memanfaatkan perkalian matriks disebut...',
                imageUrl: null,
                timeLimitSeconds: 40,
                baseXp: 10,
                orderIndex: 10,
                options: [
                    { optionText: 'Kalkulus', isCorrect: false, explanation: '' },
                    { optionText: 'Statistika', isCorrect: false, explanation: '' },
                    { optionText: 'Kriptografi', isCorrect: true, explanation: '' },
                    { optionText: 'Geometri', isCorrect: false, explanation: '' },
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