const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const achievements = [
        // onboarding
        {
            code: 'FIRST_LOGIN',
            title: 'Langkah Pertama',
            description: 'Berhasil login untuk pertama kali',
            category: 'onboarding',
            requirement: 1,
            xpReward: 50,
        },
        {
            code: 'PRETEST_DONE',
            title: 'Siap Belajar',
            description: 'Menyelesaikan pretest pertama kali',
            category: 'onboarding',
            requirement: 1,
            xpReward: 100,
        },
        {
            code: 'FIRST_RECOMMENDATION',
            title: 'Jalur Terbuka',
            description:
                'Mendapatkan rekomendasi modul dari AI untuk pertama kali',
            category: 'onboarding',
            requirement: 1,
            xpReward: 50,
        },

        // modul
        {
            code: 'MODULE_1',
            title: 'Modul Pertama',
            description: 'Menyelesaikan 1 modul',
            category: 'module',
            requirement: 1,
            xpReward: 100,
        },
        {
            code: 'MODULE_5',
            title: 'Rajin Belajar',
            description: 'Menyelesaikan 5 modul',
            category: 'module',
            requirement: 5,
            xpReward: 200,
        },
        {
            code: 'MODULE_10',
            title: 'Pelajar Sejati',
            description: 'Menyelesaikan 10 modul',
            category: 'module',
            requirement: 10,
            xpReward: 500,
        },

        // quiz
        {
            code: 'QUIZ_FIRST_PASS',
            title: 'Lulus Perdana',
            description: 'Lulus kuis untuk pertama kali',
            category: 'quiz',
            requirement: 1,
            xpReward: 100,
        },
        {
            code: 'QUIZ_PERFECT',
            title: 'Sempurna!',
            description: 'Mendapatkan skor 100 dalam satu kuis',
            category: 'quiz',
            requirement: 100,
            xpReward: 300,
        },
        {
            code: 'QUIZ_5_PASS',
            title: 'Jagoan Kuis',
            description: 'Lulus 5 kuis',
            category: 'quiz',
            requirement: 5,
            xpReward: 200,
        },

        // ── STREAK ────────────────────────────────────────────────
        {
            code: 'STREAK_3',
            title: 'Konsisten',
            description: 'Belajar 3 hari berturut-turut',
            category: 'streak',
            requirement: 3,
            xpReward: 100,
        },
        {
            code: 'STREAK_7',
            title: 'Satu Minggu Penuh',
            description: 'Belajar 7 hari berturut-turut',
            category: 'streak',
            requirement: 7,
            xpReward: 250,
        },
        {
            code: 'STREAK_30',
            title: 'Dedikasi Tinggi',
            description: 'Belajar 30 hari berturut-turut',
            category: 'streak',
            requirement: 30,
            xpReward: 1000,
        },

        // ── XP ────────────────────────────────────────────────────
        {
            code: 'XP_500',
            title: 'Mengumpulkan Ilmu',
            description: 'Mengumpulkan total 500 XP',
            category: 'xp',
            requirement: 500,
            xpReward: 100,
        },
        {
            code: 'XP_1000',
            title: 'Seribu Langkah',
            description: 'Mengumpulkan total 1.000 XP',
            category: 'xp',
            requirement: 1000,
            xpReward: 200,
        },
        {
            code: 'XP_5000',
            title: 'Master Belajar',
            description: 'Mengumpulkan total 5.000 XP',
            category: 'xp',
            requirement: 5000,
            xpReward: 500,
        },

        // ── LEVEL ─────────────────────────────────────────────────
        {
            code: 'LEVEL_5',
            title: 'Naik Kelas',
            description: 'Mencapai level 5',
            category: 'level',
            requirement: 5,
            xpReward: 200,
        },
        {
            code: 'LEVEL_10',
            title: 'Puncak Prestasi',
            description: 'Mencapai level 10',
            category: 'level',
            requirement: 10,
            xpReward: 500,
        },
    ];

    for (const achievement of achievements) {
        await prisma.achievement.upsert({
            where: {
                code: achievement.code,
            },
            update: {
                title: achievement.title,
                description: achievement.description,
                category: achievement.category,
                requirement: achievement.requirement,
                xpReward: achievement.xpReward,
            },
            create: {
                ...achievement,
            },
        });
    }

    console.log('Achievements seeded successfully');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});