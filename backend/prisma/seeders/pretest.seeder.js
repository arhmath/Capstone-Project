const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateOptions(correctAnswer, wrongAnswers, explanation) {
  const options = [
    { optionText: correctAnswer, isCorrect: true, explanation },
    ...wrongAnswers.map((w) => ({ optionText: w, isCorrect: false })),
  ];

  // shuffle biar posisi jawaban tidak selalu A
  return options.sort(() => Math.random() - 0.5);
}

async function main() {
  console.log('Seeding soal pretest...');

  await prisma.pretestAnswer.deleteMany();
  await prisma.pretestQuestionOption.deleteMany();
  await prisma.pretestQuestion.deleteMany();

  const questions = [];

  for (let i = 1; i <= 10; i++) {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const correct = a + b;

    questions.push({
      educationLevel: 'primary',
      topic: 'Aritmatika',
      questionText: `Berapa hasil dari ${a} + ${b}?`,
      difficulty: 'easy',
      options: generateOptions(
        `${correct}`,
        [`${correct + 1}`, `${correct + 2}`, `${correct - 1}`],
        `${a} + ${b} = ${correct}`
      ),
    });
  }

  for (let i = 1; i <= 10; i++) {
    const x = Math.floor(Math.random() * 10) + 1;
    const result = x + 5;

    questions.push({
      educationLevel: 'middle',
      topic: 'Aljabar',
      questionText: `Jika x + 5 = ${result}, berapa nilai x?`,
      difficulty: 'medium',
      options: generateOptions(
        `${x}`,
        [`${x + 1}`, `${x + 2}`, `${x - 1}`],
        `${result} - 5 = ${x}`
      ),
    });
  }

  for (let i = 1; i <= 10; i++) {
    const num = [4, 9, 16, 25][Math.floor(Math.random() * 4)];
    const root = Math.sqrt(num);

    questions.push({
      educationLevel: 'high',
      topic: 'Aljabar',
      questionText: `Berapakah akar dari x² = ${num}?`,
      difficulty: 'medium',
      options: generateOptions(
        `±${root}`,
        [`${root}`, `${num}`, `${root + 1}`],
        `x = ±${root}`
      ),
    });
  }

  for (const q of questions) {
    await prisma.pretestQuestion.create({
      data: {
        educationLevel: q.educationLevel,
        topic: q.topic,
        questionText: q.questionText,
        difficulty: q.difficulty,
        options: {
          create: q.options,
        },
      },
    });
  }

  console.log('Pretest seeder berhasil dijalankan');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());