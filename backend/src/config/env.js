require('dotenv').config();

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = {
  PORT:          process.env.PORT || 5000,
  NODE_ENV:      process.env.NODE_ENV || 'development',
  JWT_SECRET:    process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  FRONTEND_URL:  process.env.FRONTEND_URL || 'http://localhost:5173',
};
