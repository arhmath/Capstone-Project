const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' })); // izinkan request dari React
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ── Test route ───────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'MathQuest API berjalan!' });
});

// ── Jalankan server ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});