const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const corsMiddleware = require('./config/cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { notFoundHandler } = require('./middlewares/notFoundHandler');

const authRoutes = require('./routes/auth.routes');
const educationLevelRoutes = require('./routes/education-level.routes');
const pretestRoutes = require('./routes/pretest.routes');
const aiRecommendationRoutes = require('./routes/ai-recommendation.routes');
const moduleRoutes = require('./routes/module.routes');
const quizRoutes = require('./routes/quiz.routes');
const gamificationRoutes = require('./routes/gamification.routes');
const achievementRoutes = require('./routes/achievement.routes');
const progressRoutes = require('./routes/progress.routes');

const app = express();

app.use(helmet());                              // Set security HTTP headers
app.use(corsMiddleware);                        // Handle CORS
app.use(morgan('dev'));                         // HTTP request logger
app.use(express.json({ limit: '10mb' }));       // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/education-levels', educationLevelRoutes);
app.use('/api/pretest', pretestRoutes);
app.use('/api/recommendations', aiRecommendationRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/gamification', gamificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/user', progressRoutes);

app.use(notFoundHandler); // 404 untuk route yang tidak ada
app.use(errorHandler);    // Global error handler

module.exports = app;
