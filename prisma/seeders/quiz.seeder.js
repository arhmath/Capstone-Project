import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const quizzes = [
        {
            moduleId: '74ce8dd5-ba50-4030-a6e6-6866c632203b',
            title: 'Linear Equation Quiz',
            timeLimitSeconds: 120,
            passingScore: 70,
            maxXp: 100,
            isPublished: true,
            questions: [
                {
                    questionText: 'What is the value of x in 2x + 4 = 10?',
                    imageUrl: 'https://example.com/images/linear1.png',
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '2',
                            isCorrect: false,
                            explanation: '2x + 4 = 8, not 10',
                        },
                        {
                            optionText: '3',
                            isCorrect: true,
                            explanation: '2(3) + 4 = 10',
                        },
                        {
                            optionText: '4',
                            isCorrect: false,
                            explanation: '2(4) + 4 = 12',
                        },
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: '2(5) + 4 = 14',
                        },
                    ],
                },
                {
                    questionText: 'Solve: x - 5 = 7',
                    imageUrl: 'https://example.com/images/linear2.png',
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: '10',
                            isCorrect: false,
                            explanation: '10 - 5 = 5',
                        },
                        {
                            optionText: '11',
                            isCorrect: false,
                            explanation: '11 - 5 = 6',
                        },
                        {
                            optionText: '12',
                            isCorrect: true,
                            explanation: '12 - 5 = 7',
                        },
                        {
                            optionText: '13',
                            isCorrect: false,
                            explanation: '13 - 5 = 8',
                        },
                    ],
                },
            ],
        },

        {
            moduleId: '80524931-7b57-4e3d-a9a2-efe3aa034c3e',
            title: 'Basic Geometry Quiz',
            timeLimitSeconds: 120,
            passingScore: 70,
            maxXp: 100,
            isPublished: true,
            questions: [
                {
                    questionText: 'How many sides does a triangle have?',
                    imageUrl: 'https://example.com/images/geometry1.png',
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '3',
                            isCorrect: true,
                            explanation: 'A triangle has 3 sides',
                        },
                        {
                            optionText: '4',
                            isCorrect: false,
                            explanation: '4 sides belong to quadrilaterals',
                        },
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: '5 sides belong to pentagons',
                        },
                        {
                            optionText: '6',
                            isCorrect: false,
                            explanation: '6 sides belong to hexagons',
                        },
                    ],
                },
                {
                    questionText: 'A square has how many equal sides?',
                    imageUrl: 'https://example.com/images/geometry2.png',
                    timeLimitSeconds: 30,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: '2',
                            isCorrect: false,
                            explanation: 'Square sides are all equal',
                        },
                        {
                            optionText: '3',
                            isCorrect: false,
                            explanation: 'Square has more than 3 equal sides',
                        },
                        {
                            optionText: '4',
                            isCorrect: true,
                            explanation: 'A square has 4 equal sides',
                        },
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: 'A square only has 4 sides',
                        },
                    ],
                },
            ],
        },

        {
            moduleId: '8ee5042a-f690-4760-a547-ecea162e41a0',
            title: 'Basic Subtraction Quiz',
            timeLimitSeconds: 90,
            passingScore: 60,
            maxXp: 80,
            isPublished: true,
            questions: [
                {
                    questionText: 'What is 10 - 4?',
                    imageUrl: 'https://example.com/images/subtraction1.png',
                    timeLimitSeconds: 20,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: '10 - 4 is not 5',
                        },
                        {
                            optionText: '6',
                            isCorrect: true,
                            explanation: '10 - 4 = 6',
                        },
                        {
                            optionText: '7',
                            isCorrect: false,
                            explanation: '7 is incorrect',
                        },
                        {
                            optionText: '8',
                            isCorrect: false,
                            explanation: '8 is incorrect',
                        },
                    ],
                },
                {
                    questionText: 'What is 15 - 9?',
                    imageUrl: 'https://example.com/images/subtraction2.png',
                    timeLimitSeconds: 20,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: '15 - 9 is not 5',
                        },
                        {
                            optionText: '6',
                            isCorrect: true,
                            explanation: '15 - 9 = 6',
                        },
                        {
                            optionText: '7',
                            isCorrect: false,
                            explanation: '7 is incorrect',
                        },
                        {
                            optionText: '8',
                            isCorrect: false,
                            explanation: '8 is incorrect',
                        },
                    ],
                },
            ],
        },

        {
            moduleId: 'aa75af7d-5d16-49eb-8024-b8888463f37f',
            title: 'Introduction to Algebra Quiz',
            timeLimitSeconds: 120,
            passingScore: 75,
            maxXp: 100,
            isPublished: true,
            questions: [
                {
                    questionText: 'What is x if x + 2 = 5?',
                    imageUrl: 'https://example.com/images/algebra1.png',
                    timeLimitSeconds: 30,
                    baseXp: 15,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '1',
                            isCorrect: false,
                            explanation: '1 + 2 = 3',
                        },
                        {
                            optionText: '2',
                            isCorrect: false,
                            explanation: '2 + 2 = 4',
                        },
                        {
                            optionText: '3',
                            isCorrect: true,
                            explanation: '3 + 2 = 5',
                        },
                        {
                            optionText: '4',
                            isCorrect: false,
                            explanation: '4 + 2 = 6',
                        },
                    ],
                },
                {
                    questionText: 'What is 2a if a = 4?',
                    imageUrl: 'https://example.com/images/algebra2.png',
                    timeLimitSeconds: 30,
                    baseXp: 15,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: '6',
                            isCorrect: false,
                            explanation: '2 × 4 is not 6',
                        },
                        {
                            optionText: '7',
                            isCorrect: false,
                            explanation: '2 × 4 is not 7',
                        },
                        {
                            optionText: '8',
                            isCorrect: true,
                            explanation: '2 × 4 = 8',
                        },
                        {
                            optionText: '9',
                            isCorrect: false,
                            explanation: '2 × 4 is not 9',
                        },
                    ],
                },
            ],
        },

        {
            moduleId: 'ca462359-d97a-46ec-85db-c608564566ed',
            title: 'Basic Addition Quiz',
            timeLimitSeconds: 90,
            passingScore: 60,
            maxXp: 80,
            isPublished: true,
            questions: [
                {
                    questionText: 'What is 3 + 2?',
                    imageUrl: 'https://example.com/images/addition1.png',
                    timeLimitSeconds: 20,
                    baseXp: 10,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '4',
                            isCorrect: false,
                            explanation: '3 + 2 is not 4',
                        },
                        {
                            optionText: '5',
                            isCorrect: true,
                            explanation: '3 + 2 = 5',
                        },
                        {
                            optionText: '6',
                            isCorrect: false,
                            explanation: '6 is incorrect',
                        },
                        {
                            optionText: '7',
                            isCorrect: false,
                            explanation: '7 is incorrect',
                        },
                    ],
                },
                {
                    questionText: 'What is 7 + 6?',
                    imageUrl: 'https://example.com/images/addition2.png',
                    timeLimitSeconds: 20,
                    baseXp: 10,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: '11',
                            isCorrect: false,
                            explanation: '7 + 6 is not 11',
                        },
                        {
                            optionText: '12',
                            isCorrect: false,
                            explanation: '7 + 6 is not 12',
                        },
                        {
                            optionText: '13',
                            isCorrect: true,
                            explanation: '7 + 6 = 13',
                        },
                        {
                            optionText: '14',
                            isCorrect: false,
                            explanation: '14 is incorrect',
                        },
                    ],
                },
            ],
        },

        {
            moduleId: 'ed2a872e-df47-4413-a729-9a73a8e8b79a',
            title: 'Statistics Basics Quiz',
            timeLimitSeconds: 150,
            passingScore: 80,
            maxXp: 120,
            isPublished: true,
            questions: [
                {
                    questionText: 'What is the average of 2, 4, and 6?',
                    imageUrl: 'https://example.com/images/statistics1.png',
                    timeLimitSeconds: 40,
                    baseXp: 15,
                    orderIndex: 1,
                    options: [
                        {
                            optionText: '3',
                            isCorrect: false,
                            explanation: 'The average is not 3',
                        },
                        {
                            optionText: '4',
                            isCorrect: true,
                            explanation: '(2 + 4 + 6) / 3 = 4',
                        },
                        {
                            optionText: '5',
                            isCorrect: false,
                            explanation: 'The average is not 5',
                        },
                        {
                            optionText: '6',
                            isCorrect: false,
                            explanation: 'The average is not 6',
                        },
                    ],
                },
                {
                    questionText: 'Which chart is commonly used for statistics?',
                    imageUrl: 'https://example.com/images/statistics2.png',
                    timeLimitSeconds: 40,
                    baseXp: 15,
                    orderIndex: 2,
                    options: [
                        {
                            optionText: 'Bar Chart',
                            isCorrect: true,
                            explanation: 'Bar charts are commonly used in statistics',
                        },
                        {
                            optionText: 'Triangle',
                            isCorrect: false,
                            explanation: 'Triangle is not a chart type',
                        },
                        {
                            optionText: 'Rectangle',
                            isCorrect: false,
                            explanation: 'Rectangle is a shape, not chart',
                        },
                        {
                            optionText: 'Cube',
                            isCorrect: false,
                            explanation: 'Cube is a 3D object, not chart',
                        },
                    ],
                },
            ],
        },
    ];

    for (const quizData of quizzes) {
        await prisma.quiz.create({
            data: {
                moduleId: quizData.moduleId,
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
                            create: question.options.map((option) => ({
                                optionText: option.optionText,
                                isCorrect: option.isCorrect,
                                explanation: option.explanation,
                            })),
                        },
                    })),
                },
            },
        });
    }

    console.log('All quiz seeders inserted successfully!');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});