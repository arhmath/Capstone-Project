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
        // KELAS 1
        // Topic: penjumlahan_dan_pengurangan_sampai_20
        // Difficulty: easy
        // =========================

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            questionText: 'Hasil dari 10 + 5 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '15',
                ['14', '16', '17'],
                '10 + 5 = 15'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            questionText: 'Hasil dari 12 + 4 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '16',
                ['15', '17', '18'],
                '12 + 4 = 16'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            questionText:
                'Andi punya 11 kelereng, menang main 3 kelereng. Kelereng Andi sekarang ada...',
            difficulty: 'easy',
            options: generateOptions(
                '14',
                ['13', '15', '16'],
                '11 + 3 = 14'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            questionText: 'Hasil dari 18 - 5 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '13',
                ['12', '14', '15'],
                '18 - 5 = 13'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_20',
            questionText:
                'Di piring ada 15 pisang, dimakan 4 buah. Sisa pisang adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '11',
                ['10', '12', '13'],
                '15 - 4 = 11'
            ),
        },

        // =========================
        // KELAS 2
        // Topic: ayo_membilang_sampai_100
        // Difficulty: easy
        // =========================

        {
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            questionText:
                "Lambang bilangan dari 'enam puluh lima' adalah...",
            difficulty: 'easy',
            options: generateOptions(
                '65',
                ['56', '605', '66'],
                'Enam puluh lima ditulis 65'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            questionText:
                'Angka 8 pada bilangan 82 menempati nilai tempat...',
            difficulty: 'easy',
            options: generateOptions(
                'Puluhan',
                ['Satuan', 'Ratusan', 'Ribuan'],
                '82 = 8 puluhan dan 2 satuan'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            questionText:
                'Bilangan yang lebih besar dari 74 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '78',
                ['70', '73', '72'],
                '78 lebih besar dari 74'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            questionText:
                '5 puluhan + 7 satuan sama dengan...',
            difficulty: 'easy',
            options: generateOptions(
                '57',
                ['75', '12', '67'],
                '5 puluhan = 50 dan 7 satuan = 7, jadi 57'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'ayo_membilang_sampai_100',
            questionText:
                'Bilangan sebelum 90 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '89',
                ['88', '91', '90'],
                'Bilangan sebelum 90 adalah 89'
            ),
        },
        // =========================
        // KELAS 3
        // Topic: bilangan_cacah_sampai_1000
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: "Lambang bilangan dari 'tiga ratus lima belas' adalah...",
            difficulty: 'medium',
            options: generateOptions(
                '315',
                ['305', '351', '350'],
                'Tiga ratus lima belas ditulis 315'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Angka 7 pada bilangan 872 menempati nilai tempat...',
            difficulty: 'medium',
            options: generateOptions(
                'Puluhan',
                ['Satuan', 'Ratusan', 'Ribuan'],
                '872 = 8 ratusan, 7 puluhan, 2 satuan'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Hasil dari 400 + 50 + 6 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '456',
                ['465', '546', '450'],
                '400 + 50 + 6 = 456'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Bilangan di antara 567 dan 569 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '568',
                ['566', '570', '565'],
                'Bilangan di antara 567 dan 569 adalah 568'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Tanda yang tepat untuk membandingkan 345 ... 354 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '<',
                ['>', '=', '≤'],
                '345 lebih kecil dari 354'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Selisih antara 500 dan 200 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '300',
                ['100', '200', '400'],
                '500 - 200 = 300'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Urutan bilangan 234, 214, 254 dari yang terbesar adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '254, 234, 214',
                ['214, 234, 254', '234, 254, 214', '254, 214, 234'],
                '254 > 234 > 214'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: '3 ratusan + 0 puluhan + 9 satuan menjadi bilangan...',
            difficulty: 'medium',
            options: generateOptions(
                '309',
                ['390', '903', '3009'],
                '300 + 0 + 9 = 309'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: 'Hasil dari 150 + 250 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '400',
                ['300', '350', '450'],
                '150 + 250 = 400'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_1000',
            questionText: "Lambang bilangan dari 'sembilan ratus dua' adalah...",
            difficulty: 'medium',
            options: generateOptions(
                '902',
                ['920', '209', '9002'],
                'Sembilan ratus dua ditulis 902'
            ),
        },

        // =========================
        // KELAS 3
        // Topic: penjumlahan_dan_pengurangan_sampai_1000
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            questionText: 'Hasil dari 345 + 123 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '468',
                ['458', '478', '488'],
                '345 + 123 = 468'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            questionText: 'Hasil dari 560 - 240 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '320',
                ['310', '330', '340'],
                '560 - 240 = 320'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            questionText:
                'Ibu membeli 250 gram terigu dan 150 gram gula. Total beratnya adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '400 gram',
                ['300 gram', '350 gram', '450 gram'],
                '250 + 150 = 400 gram'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            questionText: 'Hasil dari 458 + 215 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '673',
                ['663', '683', '693'],
                '458 + 215 = 673'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'penjumlahan_dan_pengurangan_sampai_1000',
            questionText: 'Hasil dari 700 - 325 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '375',
                ['365', '385', '395'],
                '700 - 325 = 375'
            ),
        },

        // =========================
        // KELAS 4
        // Topic: bilangan_cacah_sampai_10000
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_10000',
            questionText: 'Jika 3.450 + n = 4.000, maka n adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '550',
                ['450', '600', '650'],
                '4.000 - 3.450 = 550'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_10000',
            questionText: 'Bentuk panjang dari 6.072 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '6.000 + 70 + 2',
                ['6.000 + 700 + 2', '6.000 + 7 + 2', '600 + 70 + 2'],
                '6072 = 6000 + 70 + 2'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_10000',
            questionText: 'Manakah yang merupakan bilangan ganjil?',
            difficulty: 'medium',
            options: generateOptions(
                '7.891',
                ['1.234', '4.560', '8.888'],
                'Bilangan ganjil berakhiran 1,3,5,7,9'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_10000',
            questionText: 'Bilangan loncat 1.000 setelah 3.500 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '4.500',
                ['4.000', '5.500', '3.600'],
                '3.500 + 1.000 = 4.500'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'bilangan_cacah_sampai_10000',
            questionText: 'Hasil dari 9.000 - 4.500 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '4.500',
                ['4.000', '5.000', '3.500'],
                '9.000 - 4.500 = 4.500'
            ),
        },

        // =========================
        // KELAS 4
        // Topic: pecahan
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'primary',
            topic: 'pecahan',
            questionText: 'Pecahan yang senilai dengan 1/2 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '2/4',
                ['1/4', '3/4', '4/8'],
                '1/2 = 2/4'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan',
            questionText: 'Tanda yang tepat untuk 3/4 ... 1/4 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '>',
                ['<', '=', '≤'],
                '3/4 lebih besar dari 1/4'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan',
            questionText: 'Hasil dari 2/5 + 1/5 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '3/5',
                ['3/10', '4/5', '2/10'],
                '2/5 + 1/5 = 3/5'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan',
            questionText: 'Bentuk desimal dari 1/10 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '0,1',
                ['0,01', '1,0', '0,001'],
                '1/10 = 0,1'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan',
            questionText: 'Desimal 0,5 jika diubah ke pecahan paling sederhana menjadi...',
            difficulty: 'medium',
            options: generateOptions(
                '1/2',
                ['1/5', '5/10', '2/5'],
                '0,5 = 1/2'
            ),
        },
        // =========================
        // KELAS 5
        // Topic: kpk_dan_fpb
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            questionText: 'Kelipatan dari 4 antara 10 dan 20 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '12, 16',
                ['12, 16, 20', '14, 18', '8, 12'],
                'Kelipatan 4 antara 10 dan 20 adalah 12 dan 16'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            questionText: 'Faktor dari 12 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1, 2, 3, 4, 6, 12',
                ['2, 3, 4, 6', '1, 2, 4, 12', '1, 3, 6, 12'],
                'Faktor 12 adalah 1, 2, 3, 4, 6, dan 12'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            questionText: 'Faktorisasi prima dari bilangan 20 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '2² × 5',
                ['2 × 10', '4 × 5', '2 × 2 × 10'],
                '20 = 2 × 2 × 5 = 2² × 5'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            questionText: 'KPK dari 6 dan 8 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '24',
                ['12', '18', '48'],
                'Kelipatan persekutuan terkecil 6 dan 8 adalah 24'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'kpk_dan_fpb',
            questionText: 'FPB dari 15 dan 25 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '5',
                ['3', '15', '25'],
                'Faktor persekutuan terbesar 15 dan 25 adalah 5'
            ),
        },

        // =========================
        // KELAS 5
        // Topic: keliling_bangun_datar
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'primary',
            topic: 'keliling_bangun_datar',
            questionText: 'Keliling persegi dengan sisi 6 cm adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '24 cm',
                ['12 cm', '36 cm', '18 cm'],
                'Keliling persegi = 4 × sisi = 4 × 6 = 24 cm'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'keliling_bangun_datar',
            questionText:
                'Persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Kelilingnya adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '26 cm',
                ['13 cm', '40 cm', '30 cm'],
                'Keliling = 2 × (8 + 5) = 26 cm'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'keliling_bangun_datar',
            questionText:
                'Segitiga sama sisi memiliki panjang sisi 10 cm. Kelilingnya adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '30 cm',
                ['20 cm', '40 cm', '25 cm'],
                'Keliling segitiga sama sisi = 3 × 10 = 30 cm'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'keliling_bangun_datar',
            questionText:
                'Jika keliling persegi adalah 40 cm, maka panjang sisinya adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '10 cm',
                ['5 cm', '20 cm', '8 cm'],
                'Sisi = 40 ÷ 4 = 10 cm'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'keliling_bangun_datar',
            questionText:
                'Jari-jari lingkaran adalah 7 cm. Kelilingnya adalah (π = 22/7)...',
            difficulty: 'hard',
            options: generateOptions(
                '44 cm',
                ['22 cm', '154 cm', '88 cm'],
                'Keliling = 2 × π × r = 2 × 22/7 × 7 = 44 cm'
            ),
        },

        // =========================
        // KELAS 6
        // Topic: pecahan_dan_desimal
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            questionText: 'Hasil dari 1/2 × 1/3 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1/6',
                ['1/5', '2/5', '1/3'],
                '1/2 × 1/3 = 1/6'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            questionText: 'Hasil dari 3/4 : 1/2 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '3/2',
                ['3/8', '1/2', '4/3'],
                '3/4 ÷ 1/2 = 3/4 × 2 = 3/2'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            questionText: 'Hasil dari 0,5 × 0,4 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '0,2',
                ['0,02', '2,0', '0,8'],
                '0,5 × 0,4 = 0,2'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            questionText: 'Bentuk persen dari 1/4 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '25%',
                ['10%', '20%', '40%'],
                '1/4 = 25%'
            ),
        },

        {
            educationLevel: 'primary',
            topic: 'pecahan_dan_desimal',
            questionText: '20% dari 50.000 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '10.000',
                ['5.000', '15.000', '20.000'],
                '20% × 50.000 = 10.000'
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