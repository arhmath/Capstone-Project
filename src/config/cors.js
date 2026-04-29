const cors = require('cors');
const { FRONTEND_URL } = require('./env');

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173', // Vite default
  'http://localhost:3000', // fallback CRA
];

module.exports = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} tidak diizinkan`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
