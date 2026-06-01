const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const modules = [
    // ================= PRIMARY =================
    {
      title: 'Basic Addition',
      educationLevel: 'primary',
      topic: 'Mathematics',
      description: 'Belajar penjumlahan dasar',
      orderIndex: 1,
      xpReward: 50,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'Introduction to Addition',
          storyContent:
            'Addition adalah proses menjumlahkan dua angka atau lebih.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Simple Examples',
          storyContent:
            'Contoh: 2 + 3 = 5 dan 4 + 1 = 5.',
          pageType: 'story',
        },
      ],
    },
    {
      title: 'Basic Subtraction',
      educationLevel: 'primary',
      topic: 'Mathematics',
      description: 'Belajar pengurangan dasar',
      orderIndex: 2,
      xpReward: 50,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'Introduction to Subtraction',
          storyContent:
            'Subtraction digunakan untuk mengurangi suatu angka.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Simple Subtraction Examples',
          storyContent:
            'Contoh: 5 - 2 = 3 dan 10 - 4 = 6.',
          pageType: 'story',
        },
      ],
    },

    // ================= MIDDLE =================
    {
      title: 'Introduction to Algebra',
      educationLevel: 'middle',
      topic: 'Mathematics',
      description: 'Dasar-dasar aljabar',
      orderIndex: 1,
      xpReward: 75,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'What is Algebra?',
          storyContent:
            'Algebra menggunakan simbol dan huruf untuk mewakili angka.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Simple Algebra Equation',
          storyContent:
            'Contoh: x + 2 = 5, maka x = 3.',
          pageType: 'story',
        },
      ],
    },
    {
      title: 'Basic Geometry',
      educationLevel: 'middle',
      topic: 'Geometry',
      description: 'Pengenalan bentuk dan bangun datar',
      orderIndex: 2,
      xpReward: 75,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'Introduction to Shapes',
          storyContent:
            'Bangun datar terdiri dari persegi, segitiga, dan lingkaran.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Geometry Examples',
          storyContent:
            'Persegi memiliki 4 sisi yang sama panjang.',
          pageType: 'story',
        },
      ],
    },

    // ================= HIGH =================
    {
      title: 'Linear Equation',
      educationLevel: 'high',
      topic: 'Algebra',
      description: 'Persamaan linear dasar',
      orderIndex: 1,
      xpReward: 100,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'Understanding Linear Equations',
          storyContent:
            'Persamaan linear memiliki variabel berpangkat satu.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Linear Equation Example',
          storyContent:
            'Contoh: 2x + 4 = 10, maka x = 3.',
          pageType: 'story',
        },
      ],
    },
    {
      title: 'Statistics Basics',
      educationLevel: 'high',
      topic: 'Statistics',
      description: 'Pengenalan statistika dasar',
      orderIndex: 2,
      xpReward: 100,
      isPublished: true,
      pages: [
        {
          pageNumber: 1,
          sceneTitle: 'What is Statistics?',
          storyContent:
            'Statistika digunakan untuk mengolah dan menganalisis data.',
          pageType: 'story',
        },
        {
          pageNumber: 2,
          sceneTitle: 'Mean and Median',
          storyContent:
            'Mean adalah rata-rata dari sekumpulan data.',
          pageType: 'story',
        },
      ],
    },
  ];

  for (const moduleData of modules) {
    const { pages, ...moduleOnly } = moduleData;

    await prisma.module.create({
      data: {
        ...moduleOnly,
        pages: {
          create: pages,
        },
      },
    });
  }

  console.log('Module & pages seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });