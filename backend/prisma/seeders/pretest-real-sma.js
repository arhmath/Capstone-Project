const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


function generateOptions(correctAnswer, wrongAnswers, explanation) {
    const options = [
        {
            optionText: correctAnswer,
            isCorrect: true,
            explanation,
        },
        ...wrongAnswers.map((w) => ({
            optionText: w,
            isCorrect: false,
            explanation: null,
        })),
    ];

    return options.sort(() => Math.random() - 0.5);
}

async function main() {
    const questions = [
        // =========================
        // SMA KELAS X
        // Topic: barisan_dan_deret
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Beda (b) pada barisan aritmetika 4, 6, 8, 10 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '2',
                ['4', '6', '10'],
                'Beda barisan aritmetika diperoleh dari selisih dua suku berurutan: 6 - 4 = 2'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Rumus suku ke-n barisan aritmetika adalah...',
            difficulty: 'medium',
            options: generateOptions(
                'Un = a + (n - 1)b',
                ['Un = a · r^(n - 1)', 'Un = n²', 'Un = a + nb'],
                'Rumus suku ke-n barisan aritmetika adalah Un = a + (n - 1)b'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Rasio (r) dari barisan geometri 64, 32, 16, 8 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '1/2',
                ['2', '-2', '4'],
                'Rasio diperoleh dari 32 ÷ 64 = 1/2'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Rumus suku ke-n barisan geometri adalah...',
            difficulty: 'medium',
            options: generateOptions(
                'Un = a · r^(n - 1)',
                ['Un = a + (n - 1)b', 'Un = a / r', 'Un = r^n'],
                'Rumus suku ke-n barisan geometri adalah Un = a · r^(n - 1)'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Hasil dari deret 1 + 2 + 3 + ... + 100 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '5050',
                ['5000', '5500', '1000'],
                'Jumlah 100 bilangan pertama adalah n(n+1)/2 = 100×101/2 = 5050'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Deret geometri tak hingga konvergen memiliki syarat...',
            difficulty: 'medium',
            options: generateOptions(
                '|r| < 1',
                ['r > 1', 'r = 1', 'r = 0'],
                'Deret geometri tak hingga konvergen jika nilai mutlak rasio kurang dari 1'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Barisan Fibonacci 1, 1, 2, 3, 5, 8 memiliki suku berikutnya...',
            difficulty: 'medium',
            options: generateOptions(
                '13',
                ['10', '11', '15'],
                'Setiap suku merupakan jumlah dua suku sebelumnya: 5 + 8 = 13'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Bunga yang dihitung berdasarkan pokok uang saja disebut...',
            difficulty: 'medium',
            options: generateOptions(
                'Bunga Tunggal',
                ['Bunga Majemuk', 'Deposito', 'Kredit'],
                'Bunga tunggal dihitung hanya dari modal awal'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Pada bunga majemuk, bunga periode sebelumnya...',
            difficulty: 'medium',
            options: generateOptions(
                'Dimasukkan ke pokok tabungan',
                ['Dihilangkan', 'Tetap sama', 'Berkurang'],
                'Pada bunga majemuk, bunga sebelumnya ditambahkan ke modal'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'barisan_dan_deret',
            questionText: 'Jika a = 2 dan b = 3, maka U₁₀ barisan aritmetika adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '29',
                ['27', '31', '32'],
                'U₁₀ = 2 + (10 - 1)(3) = 29'
            ),
        },// =========================
        // SMA KELAS X
        // Topic: perbandingan_trigonometri
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Sisi yang berada di seberang sudut siku-siku disebut...',
            difficulty: 'hard',
            options: generateOptions(
                'Sisi miring (hipotenusa)',
                ['Sisi depan', 'Sisi samping', 'Sisi tegak'],
                'Sisi yang berhadapan dengan sudut siku-siku disebut hipotenusa atau sisi miring'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Perbandingan sisi depan terhadap sisi samping disebut...',
            difficulty: 'hard',
            options: generateOptions(
                'Tangen',
                ['Sinus', 'Cosinus', 'Cosecan'],
                'tan θ = sisi depan / sisi samping'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Nilai sin 30° adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1/2',
                ['0', '1', '√2/2'],
                'sin 30° = 1/2'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Nilai cos 60° adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1/2',
                ['√3/2', '√2/2', '1'],
                'cos 60° = 1/2'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Identitas trigonometri dasar sin²x + cos²x = ...',
            difficulty: 'hard',
            options: generateOptions(
                '1',
                ['0', '2', 'tan x'],
                'Identitas dasar trigonometri adalah sin²x + cos²x = 1'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Alat yang digunakan untuk mengukur sudut elevasi adalah...',
            difficulty: 'hard',
            options: generateOptions(
                'Teodolit / Klinometer',
                ['Termometer', 'Barometer', 'Speedometer'],
                'Teodolit dan klinometer digunakan untuk mengukur sudut elevasi dan depresi'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Nilai tan 45° adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1',
                ['0', '1/2', '√3'],
                'tan 45° = 1'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Kebalikan dari sinus adalah...',
            difficulty: 'hard',
            options: generateOptions(
                'Cosecan',
                ['Secan', 'Cotangen', 'Cosinus'],
                'cosec θ = 1 / sin θ'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Sudut elevasi dibentuk antara garis horizontal dengan arah pandang ke...',
            difficulty: 'hard',
            options: generateOptions(
                'Atas',
                ['Bawah', 'Samping', 'Belakang'],
                'Sudut elevasi adalah sudut antara garis horizontal dan arah pandang ke atas'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'perbandingan_trigonometri',
            questionText: 'Panjang sisi miring segitiga siku-siku dengan sisi tegak 3 dan sisi alas 4 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '5',
                ['7', '12', '25'],
                'Menurut Teorema Pythagoras: √(3² + 4²) = √25 = 5'
            ),
        },// =========================
        // SMA KELAS XI
        // Topic: matriks
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Matriks yang diperoleh dengan cara menukar elemen pada baris menjadi elemen pada kolom disebut matriks...',
            difficulty: 'hard',
            options: generateOptions(
                'Transpos',
                ['Identitas', 'Diagonal', 'Simetris'],
                'Matriks transpos diperoleh dengan menukar baris menjadi kolom dan kolom menjadi baris'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Determinan dari matriks persegi berordo 2×2 [a b; c d] dirumuskan dengan...',
            difficulty: 'hard',
            options: generateOptions(
                'ad - bc',
                ['ad + bc', 'ab - cd', 'ac - bd'],
                'Rumus determinan matriks 2×2 adalah ad - bc'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Dua buah matriks A dan B dikatakan sama jika memenuhi syarat...',
            difficulty: 'hard',
            options: generateOptions(
                'Ordo sama dan elemen seletak sama',
                ['Ordonya sama', 'Elemen seletaknya sama', 'Jumlah barisnya sama'],
                'Dua matriks sama jika memiliki ordo yang sama dan setiap elemen seletaknya bernilai sama'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Matriks persegi yang elemen-elemen di bawah diagonal utamanya bernilai nol disebut matriks...',
            difficulty: 'hard',
            options: generateOptions(
                'Segitiga atas',
                ['Segitiga bawah', 'Identitas', 'Skalar'],
                'Pada matriks segitiga atas, semua elemen di bawah diagonal utama bernilai nol'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Jika matriks A berordo 3×4, maka matriks A tersebut termasuk jenis matriks...',
            difficulty: 'hard',
            options: generateOptions(
                'Datar',
                ['Persegi', 'Tegak', 'Segitiga'],
                'Karena jumlah kolom lebih banyak daripada jumlah baris, matriks disebut matriks datar'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Metode Sarrus merupakan metode yang digunakan untuk mencari determinan matriks berordo...',
            difficulty: 'hard',
            options: generateOptions(
                '3×3',
                ['1×1', '2×2', '4×4'],
                'Aturan Sarrus digunakan khusus untuk menghitung determinan matriks 3×3'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Invers dari matriks A dinotasikan dengan...',
            difficulty: 'hard',
            options: generateOptions(
                'A⁻¹',
                ['Aᵀ', '|A|', 'adj(A)'],
                'Notasi invers matriks adalah A⁻¹'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Matriks yang determinannya bernilai nol disebut matriks...',
            difficulty: 'hard',
            options: generateOptions(
                'Singular',
                ['Nonsingular', 'Identitas', 'Simetris'],
                'Matriks singular adalah matriks yang memiliki determinan sama dengan nol'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Dalam operasi matriks, sifat yang tidak berlaku pada perkalian dua matriks adalah...',
            difficulty: 'hard',
            options: generateOptions(
                'Komutatif',
                ['Asosiatif', 'Distributif', 'Identitas'],
                'Secara umum A × B ≠ B × A sehingga sifat komutatif tidak berlaku'
            ),
        },

        {
            educationLevel: 'high',
            topic: 'matriks',
            questionText: 'Ilmu menyandikan pesan yang dapat memanfaatkan perkalian matriks disebut...',
            difficulty: 'hard',
            options: generateOptions(
                'Kriptografi',
                ['Kalkulus', 'Statistika', 'Geometri'],
                'Kriptografi menggunakan teknik matematika, termasuk matriks, untuk menyandikan pesan'
            ),
        },
    ];
    console.log('Seeding soal pretest...');

    await prisma.pretestAnswer.deleteMany();
    await prisma.pretestQuestionOption.deleteMany();
    await prisma.pretestQuestion.deleteMany();

    for (const question of questions) {
        await prisma.pretestQuestion.create({
            data: {
                educationLevel: question.educationLevel,
                topic: question.topic,
                questionText: question.questionText,
                difficulty: question.difficulty,
                options: {
                    create: question.options,
                },
            },
        });
    }

    console.log(`Berhasil menambahkan ${questions.length} soal`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());