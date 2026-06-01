require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config/env');

const server = app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
  console.log(`Environment : ${process.env.NODE_ENV}`);
  console.log(`API Base    : http://localhost:${PORT}/api\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});
