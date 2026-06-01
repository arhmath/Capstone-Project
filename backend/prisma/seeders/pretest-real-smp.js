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
        // SMP KELAS VII
        // Topic: bilangan_bulat
        // Difficulty: easy
        // =========================

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Hasil dari -12 + 7 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '-5',
                ['5', '19', '-19'],
                '-12 + 7 = -5'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Hasil dari (-4) × (-3) adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '12',
                ['-12', '-7', '7'],
                'Bilangan negatif dikali negatif menghasilkan positif'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Suhu awal 5°C. Jika turun 8°C, suhu sekarang adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '-3',
                ['13', '3', '-13'],
                '5 - 8 = -3'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Di antara bilangan berikut, manakah yang paling kecil?',
            difficulty: 'easy',
            options: generateOptions(
                '-10',
                ['-5', '0', '2'],
                'Bilangan negatif dengan nilai mutlak terbesar adalah yang paling kecil'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Hasil dari 20 ÷ (-4) adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '-5',
                ['5', '16', '-16'],
                'Positif dibagi negatif menghasilkan negatif'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Selisih antara angka 8 dan -3 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '11',
                ['5', '-5', '-11'],
                '8 - (-3) = 11'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Hasil dari operasi campuran -2 + (-3) × 4 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '-14',
                ['-20', '-12', '-10'],
                '-2 + (-12) = -14'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Jika a = -2 dan b = 3, maka nilai dari 2a + b adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '-1',
                ['-7', '1', '7'],
                '2(-2) + 3 = -1'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'Hasil dari 10 - 2 × (-3) adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '16',
                ['-24', '-16', '4'],
                '10 - (-6) = 16'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_bulat',
            questionText: 'FPB dari 24 dan 36 adalah...',
            difficulty: 'easy',
            options: generateOptions(
                '12',
                ['6', '8', '24'],
                'FPB(24,36)=12'
            ),
        },

        // =========================
        // SMP KELAS VII
        // Topic: aljabar
        // Difficulty: medium
        // =========================

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Koefisien x pada bentuk aljabar 3x - 5 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '3',
                ['-5', '5', 'x'],
                'Koefisien adalah angka yang mengalikan variabel'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Bentuk sederhana dari 2a + 3b - a + 2b adalah...',
            difficulty: 'medium',
            options: generateOptions(
                'a + 5b',
                ['3a + 5b', 'a + b', '2a + 2b'],
                '2a-a=a dan 3b+2b=5b'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Hasil dari 4(x - 2) adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '4x - 8',
                ['4x - 2', '4x + 8', 'x - 8'],
                'Gunakan sifat distributif'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Nilai dari 2x + 5 jika x = 3 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '11',
                ['6', '10', '13'],
                '2(3)+5=11'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Suku-suku yang sejenis dari 2x + 3y - x + 5 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '2x dan -x',
                ['2x dan 3y', '3y dan 5', '-x dan 5'],
                'Suku sejenis memiliki variabel yang sama'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Hasil penjumlahan (2x + 3) + (4x - 5) adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '6x - 2',
                ['6x + 8', '2x - 2', '8x - 15'],
                '(2x+4x)+(3-5)=6x-2'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Variabel pada bentuk aljabar 7p - 3 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                'p',
                ['7', '-3', '7p'],
                'Variabel adalah simbol yang nilainya dapat berubah'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Hasil pengurangan 3a dari 7a adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '4a',
                ['-4a', '10a', '-10a'],
                '7a - 3a = 4a'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: "Kalimat matematika dari '5 lebihnya dari x' adalah...",
            difficulty: 'medium',
            options: generateOptions(
                'x + 5',
                ['5x', 'x - 5', '5 - x'],
                'Lebihnya berarti ditambah'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'aljabar',
            questionText: 'Hasil dari 12x ÷ 3 adalah...',
            difficulty: 'medium',
            options: generateOptions(
                '4x',
                ['4', '9x', '36x'],
                '12x ÷ 3 = 4x'
            ),
        },

        // =========================
        // SMP KELAS VIII
        // Topic: bilangan_berpangkat
        // Difficulty: hard
        // =========================

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Nilai dari (5²)³ adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '5⁶',
                ['5⁵', '10³', '125'],
                '(a^m)^n = a^(m×n)'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Bentuk sederhana dari m¹⁰ : m² adalah...',
            difficulty: 'hard',
            options: generateOptions(
                'm⁸',
                ['m⁵', 'm¹²', 'm²⁰'],
                'm¹⁰ ÷ m² = m⁸'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Nilai dari 7⁰ adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1',
                ['0', '7', '49'],
                'Setiap bilangan berpangkat nol bernilai 1'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Bentuk pangkat positif dari 3⁻² adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '1/9',
                ['-9', '1/6', '-1/6'],
                '3⁻² = 1/(3²)'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Hasil dari akar pangkat dua dari 225 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '15',
                ['13', '14', '25'],
                '√225 = 15'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Nilai dari √2 × √8 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '4',
                ['8', '16', '2'],
                '√2 × √8 = √16 = 4'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Bentuk baku dari bilangan 0,000025 adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '2,5 × 10⁻⁵',
                ['2,5 × 10⁻⁴', '25 × 10⁻⁶', '0,25 × 10⁻⁴'],
                '0,000025 = 2,5 × 10⁻⁵'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Hasil dari (1/2)⁻³ adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '8',
                ['1/8', '-8', '6'],
                '(1/2)⁻³ = 2³ = 8'
            ),
        },

        {
            educationLevel: 'middle',
            topic: 'bilangan_berpangkat',
            questionText: 'Hasil dari 8^(2/3) adalah...',
            difficulty: 'hard',
            options: generateOptions(
                '4',
                ['2', '16', '64'],
                '8^(2/3) = (∛8)² = 2² = 4'
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