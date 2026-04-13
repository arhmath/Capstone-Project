import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  ChevronRight, Lock, CheckCircle2, Play, Star,
  Clock, Target, BookOpen, X, ArrowRight, Zap,
  Trophy, AlertCircle, Timer
} from 'lucide-react';

// ─── KONSTANTA TIMER & SCORING ───────────────────────────────────────────────
const MAX_TIME = 60;
const calculateScore = (timeLeft, baseXP) => {
  const ratio = timeLeft / MAX_TIME;
  if (ratio > 0.66) return Math.round(baseXP);        // > 40 detik sisa → 100%
  if (ratio > 0.33) return Math.round(baseXP * 0.8);  // 20-40 detik sisa → 80%
  if (ratio > 0.10) return Math.round(baseXP * 0.6);  // 6-20 detik sisa  → 60%
  return Math.round(baseXP * 0.4);                    // < 6 detik sisa   → 40%
};

// ─── DATA SOAL ────────────────────────────────────────────────────────────────
const questData = {
  SD: [
    {
      chapter: 1, title: "Dunia Angka", emoji: "🌍",
      color: "from-green-400 to-teal-500",
      lightBg: "bg-green-50", border: "border-green-200", textColor: "text-green-700",
      modules: [
        {
          id: "sd-1-1", title: "Penjumlahan Dasar", emoji: "➕",
          xp: 100, duration: "±5 mnt", status: "completed", stars: 3, type: "Latihan",
          story: {
            title: "Warung Bu Sari",
            illustration: "🏪",
            text: `Bu Sari adalah penjual sayur di pasar. Setiap pagi ia membawa dagangan dengan penuh semangat.\n\nHari ini Bu Sari membawa 24 ikat bayam dan 15 ikat kangkung dari kebunnya. Di perjalanan, ia bertemu Pak Andi yang ingin titip jual 8 ikat selada.\n\nBantu Bu Sari menghitung total dagangannya sebelum pasar dibuka!`,
          },
          questions: [
            {
              id: 1,
              question: "Berapa total ikat sayuran milik Bu Sari dari kebunnya?",
              context: "Bu Sari membawa 24 ikat bayam dan 15 ikat kangkung.",
              options: ["37 ikat", "39 ikat", "41 ikat", "43 ikat"],
              correct: "39 ikat",
              explanation: "24 bayam + 15 kangkung = 39 ikat sayuran milik Bu Sari.",
            },
            {
              id: 2,
              question: "Berapa TOTAL semua sayuran yang akan dijual hari ini?",
              context: "Bu Sari punya 39 ikat, ditambah titipan 8 ikat selada dari Pak Andi.",
              options: ["45 ikat", "47 ikat", "49 ikat", "51 ikat"],
              correct: "47 ikat",
              explanation: "39 ikat + 8 ikat titipan = 47 ikat total.",
            },
            {
              id: 3,
              question: "Sebelum buka, 12 ikat terjual ke pembeli grosir. Berapa sisa dagangannya?",
              context: "Total 47 ikat, lalu terjual 12 ikat lebih awal.",
              options: ["33 ikat", "35 ikat", "37 ikat", "39 ikat"],
              correct: "35 ikat",
              explanation: "47 - 12 = 35 ikat sisa dagangan Bu Sari.",
            },
          ],
        },
        {
          id: "sd-1-2", title: "Pengurangan Dasar", emoji: "➖",
          xp: 100, duration: "±5 mnt", status: "completed", stars: 2, type: "Latihan",
          story: {
            title: "Celengan Rafi",
            illustration: "🐷",
            text: `Rafi adalah anak yang rajin menabung. Ia punya celengan berbentuk babi berwarna merah muda yang lucu.\n\nSelama sebulan, Rafi berhasil mengumpulkan Rp 85.000 dari uang jajan yang ia sisihkan setiap hari.\n\nMinggu ini, Rafi ingin membeli beberapa barang keperluan sekolah. Bantu Rafi menghitung sisa tabungannya!`,
          },
          questions: [
            {
              id: 1,
              question: "Rafi beli buku tulis seharga Rp 32.000. Berapa sisa tabungan Rafi?",
              context: "Tabungan awal Rp 85.000, beli buku Rp 32.000.",
              options: ["Rp 51.000", "Rp 53.000", "Rp 55.000", "Rp 57.000"],
              correct: "Rp 53.000",
              explanation: "Rp 85.000 - Rp 32.000 = Rp 53.000 sisa tabungan.",
            },
            {
              id: 2,
              question: "Rafi juga beli pensil warna seharga Rp 18.000. Sisa tabungannya sekarang?",
              context: "Sisa Rp 53.000, dikurang pensil warna Rp 18.000.",
              options: ["Rp 33.000", "Rp 35.000", "Rp 37.000", "Rp 39.000"],
              correct: "Rp 35.000",
              explanation: "Rp 53.000 - Rp 18.000 = Rp 35.000 sisa tabungan Rafi.",
            },
          ],
        },
        {
          id: "sd-1-3", title: "Boss: Operasi Campuran", emoji: "⚔️",
          xp: 250, duration: "±8 mnt", status: "current", stars: 0, type: "Boss",
          story: {
            title: "Festival Matematika Kota",
            illustration: "🎪",
            text: `Kota Angkaria mengadakan Festival Matematika tahunan yang meriah! Semua warga berbondong-bondong datang.\n\nKamu adalah Ketua Panitia yang bertanggung jawab mengatur semua kebutuhan festival. Ada banyak perhitungan yang harus diselesaikan agar acara berjalan lancar.\n\nSebagai bos festival, kamu harus bisa menggabungkan operasi penjumlahan DAN pengurangan. Bersiaplah, Petualang!`,
          },
          questions: [
            {
              id: 1,
              question: "Panitia memesan 150 kursi. Datang 47 kursi pagi, lalu 68 kursi sore. Masih kurang berapa?",
              context: "Target 150 kursi. Datang 47 + 68 kursi.",
              options: ["33 kursi", "35 kursi", "37 kursi", "39 kursi"],
              correct: "35 kursi",
              explanation: "47 + 68 = 115 kursi datang. 150 - 115 = 35 kursi masih kurang.",
            },
            {
              id: 2,
              question: "Ada 200 tiket dicetak. Terjual 85 online dan 72 offline. Berapa tiket BELUM terjual?",
              context: "200 tiket total, terjual 85 online + 72 offline.",
              options: ["41 tiket", "43 tiket", "45 tiket", "47 tiket"],
              correct: "43 tiket",
              explanation: "85 + 72 = 157 tiket terjual. 200 - 157 = 43 tiket belum terjual.",
            },
            {
              id: 3,
              question: "Anggaran snack Rp 500.000. Beli kue Rp 175.000 & minuman Rp 230.000. Sisa anggaran?",
              context: "Anggaran Rp 500.000. Pengeluaran Rp 175.000 + Rp 230.000.",
              options: ["Rp 90.000", "Rp 95.000", "Rp 100.000", "Rp 105.000"],
              correct: "Rp 95.000",
              explanation: "Rp 175.000 + Rp 230.000 = Rp 405.000. Rp 500.000 - Rp 405.000 = Rp 95.000.",
            },
            {
              id: 4,
              question: "Peserta SD 120 anak, SMP 95 anak. Kapasitas aula 250. Berapa kursi kosong?",
              context: "SD 120 + SMP 95 peserta. Kapasitas 250.",
              options: ["33 kursi", "35 kursi", "37 kursi", "39 kursi"],
              correct: "35 kursi",
              explanation: "120 + 95 = 215 peserta. 250 - 215 = 35 kursi masih kosong.",
            },
          ],
        },
      ],
    },
    {
      chapter: 2, title: "Kerajaan Perkalian", emoji: "👑",
      color: "from-blue-400 to-indigo-500",
      lightBg: "bg-blue-50", border: "border-blue-200", textColor: "text-blue-700",
      modules: [
        {
          id: "sd-2-1", title: "Perkalian 1–5", emoji: "✖️",
          xp: 120, duration: "±5 mnt", status: "locked", stars: 0, type: "Latihan",
          story: {
            title: "Kebun Pak Hendra",
            illustration: "🌻",
            text: `Pak Hendra memiliki kebun bunga yang sangat indah di pinggir desa. Kebunnya terkenal karena selalu rapi dan teratur.\n\nPak Hendra menanam bunga dalam barisan yang rapi — setiap baris memiliki jumlah bunga yang sama, sehingga tampak seperti pola indah dari atas.\n\nBantu Pak Hendra menghitung total bunganya menggunakan perkalian!`,
          },
          questions: [
            {
              id: 1,
              question: "Ada 4 baris bunga mawar, tiap baris ada 5 bunga. Berapa total bunga mawar?",
              context: "4 baris × 5 bunga per baris.",
              options: ["16 bunga", "18 bunga", "20 bunga", "22 bunga"],
              correct: "20 bunga",
              explanation: "4 × 5 = 20 bunga mawar total.",
            },
            {
              id: 2,
              question: "Ada 3 baris bunga matahari, masing-masing 4 bunga. Berapa totalnya?",
              context: "3 baris × 4 bunga matahari.",
              options: ["10 bunga", "12 bunga", "14 bunga", "16 bunga"],
              correct: "12 bunga",
              explanation: "3 × 4 = 12 bunga matahari.",
            },
          ],
        },
        {
          id: "sd-2-2", title: "Perkalian 6–10", emoji: "🔢",
          xp: 120, duration: "±5 mnt", status: "locked", stars: 0, type: "Latihan",
          story: {
            title: "Toko Roti Bu Dewi",
            illustration: "🍞",
            text: `Bu Dewi membuka toko roti yang terkenal lezat di kota. Setiap pagi ia membuat roti dalam loyang-loyang yang rapi.\n\nBu Dewi ingin tahu berapa total roti yang ia buat hari ini. Ia mencatat dalam buku kecilnya.\n\nBantu Bu Dewi menghitung total rotinya!`,
          },
          questions: [
            {
              id: 1,
              question: "Bu Dewi membuat 7 loyang roti coklat, tiap loyang berisi 8 roti. Berapa totalnya?",
              context: "7 loyang × 8 roti per loyang.",
              options: ["52 roti", "54 roti", "56 roti", "58 roti"],
              correct: "56 roti",
              explanation: "7 × 8 = 56 roti coklat.",
            },
            {
              id: 2,
              question: "Ada juga 6 loyang roti keju, tiap loyang berisi 9 roti. Berapa totalnya?",
              context: "6 loyang × 9 roti per loyang.",
              options: ["50 roti", "52 roti", "54 roti", "56 roti"],
              correct: "54 roti",
              explanation: "6 × 9 = 54 roti keju.",
            },
          ],
        },
      ],
    },
  ],
  SMP: [
    {
      chapter: 1, title: "Alam Aljabar", emoji: "🔢",
      color: "from-violet-400 to-purple-500",
      lightBg: "bg-violet-50", border: "border-violet-200", textColor: "text-violet-700",
      modules: [
        {
          id: "smp-1-1", title: "Persamaan Linear", emoji: "📐",
          xp: 150, duration: "±6 mnt", status: "current", stars: 0, type: "Latihan",
          story: {
            title: "Toko Sepatu Pak Bimo",
            illustration: "👟",
            text: `Pak Bimo membuka toko sepatu baru di pusat perbelanjaan. Ia sangat teliti dalam mencatat stok dan penjualan.\n\nSuatu hari, Pak Bimo mendapat kiriman sepatu baru dan ia ingin kamu membantunya menghitung menggunakan persamaan matematika.\n\n"Kalau kamu bisa bantu saya, nanti kamu dapat diskon 50%!" kata Pak Bimo sambil tersenyum.`,
          },
          questions: [
            {
              id: 1,
              question: "Pak Bimo punya x pasang sepatu. Dapat kiriman 25 pasang, totalnya jadi 73. Berapa nilai x?",
              context: "x + 25 = 73. Cari nilai x.",
              options: ["x = 46", "x = 47", "x = 48", "x = 49"],
              correct: "x = 48",
              explanation: "x + 25 = 73 → x = 73 - 25 = 48 pasang sepatu awal.",
            },
            {
              id: 2,
              question: "Harga sepatu 2y ribu rupiah. Jika 3 pasang = Rp 360.000, berapa nilai y?",
              context: "3 × 2y = 360.000. Cari nilai y.",
              options: ["y = 55", "y = 60", "y = 65", "y = 70"],
              correct: "y = 60",
              explanation: "6y = 360 → y = 60. Harga 1 sepatu = 2 × 60.000 = Rp 120.000.",
            },
          ],
        },
      ],
    },
  ],
  SMA: [
    {
      chapter: 1, title: "Galaksi Kalkulus", emoji: "🌌",
      color: "from-rose-400 to-pink-500",
      lightBg: "bg-rose-50", border: "border-rose-200", textColor: "text-rose-700",
      modules: [
        {
          id: "sma-1-1", title: "Turunan Fungsi", emoji: "📈",
          xp: 250, duration: "±8 mnt", status: "current", stars: 0, type: "Latihan",
          story: {
            title: "Roket ke Luar Angkasa",
            illustration: "🚀",
            text: `Tim ilmuwan muda sedang merancang roket eksperimental yang akan diluncurkan dari stasiun penelitian di gurun.\n\nPosisi roket pada detik ke-t dinyatakan dalam fungsi h(t) = 3t² + 2t + 5 (dalam meter).\n\nSebagai anggota tim termuda, kamu ditugaskan menghitung kecepatan dan akselerasi menggunakan konsep turunan!`,
          },
          questions: [
            {
              id: 1,
              question: "Turunan pertama dari f(x) = 4x³ + 2x² adalah...",
              context: "Aturan pangkat: d/dx(xⁿ) = n·xⁿ⁻¹",
              options: ["12x² + 4x", "12x² + 2x", "4x² + 4x", "12x³ + 4x"],
              correct: "12x² + 4x",
              explanation: "f'(x) = 4·3x² + 2·2x = 12x² + 4x.",
            },
            {
              id: 2,
              question: "Kecepatan roket adalah h'(t). Jika h(t) = 3t² + 2t + 5, berapakah h'(t)?",
              context: "Turunkan h(t) = 3t² + 2t + 5 terhadap t.",
              options: ["6t + 2", "6t + 5", "3t + 2", "6t² + 2"],
              correct: "6t + 2",
              explanation: "h'(t) = 6t + 2. Konstanta 5 hilang saat diturunkan.",
            },
          ],
        },
      ],
    },
  ],
};

// ─── TIMER RING ───────────────────────────────────────────────────────────────
const TimerRing = ({ timeLeft }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timeLeft / MAX_TIME);
  const color = timeLeft > 30 ? '#0259DD' : timeLeft > 15 ? '#FF6648' : '#EF4444';
  const bgColor = timeLeft > 30 ? '#EEF4FF' : timeLeft > 15 ? '#FFF0EC' : '#FEE2E2';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width="88" height="88" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="44" cy="44" r={radius} fill="none" stroke={bgColor} strokeWidth="8" />
        <circle cx="44" cy="44" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
        />
      </svg>
      <div className="relative z-10 text-center">
        <span className="font-black text-2xl leading-none" style={{ color }}>{timeLeft}</span>
        <p className="text-[9px] font-bold text-slate-400 mt-0.5">detik</p>
      </div>
    </div>
  );
};

// ─── SCORE INDICATOR ─────────────────────────────────────────────────────────
const ScoreIndicator = ({ timeLeft, baseXP }) => {
  const score = calculateScore(timeLeft, baseXP);
  const ratio = score / baseXP;
  const config = ratio >= 1
    ? { label: '🔥 MAKS!', cls: 'bg-blue-100 text-blue-700' }
    : ratio >= 0.8
    ? { label: '⚡ Cepat!', cls: 'bg-orange-100 text-orange-700' }
    : ratio >= 0.6
    ? { label: '👍 Oke', cls: 'bg-yellow-100 text-yellow-700' }
    : { label: '⏰ Pelan', cls: 'bg-red-100 text-red-700' };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black ${config.cls}`}>
      {config.label} · +{score} XP
    </span>
  );
};

// ─── PHASE 1: STORY ───────────────────────────────────────────────────────────
const StoryPhase = ({ mod, onStart, onClose }) => (
  <div className="flex flex-col">
    <div className="bg-gradient-to-br from-mq-peach/30 to-mq-blue-light/20 rounded-3xl p-8 mb-5 text-center">
      <div className="text-8xl mb-4 animate-bounce">{mod.story.illustration}</div>
      <h3 className="text-2xl font-black text-slate-800">{mod.story.title}</h3>
      <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-white rounded-full border border-slate-100 text-xs font-bold text-slate-500">
        <BookOpen size={12} className="text-mq-primary" /> Studi Kasus
      </span>
    </div>

    <div className="bg-white rounded-3xl border border-slate-100 p-5 mb-5">
      <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{mod.story.text}</p>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-5">
      <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
        <Timer size={16} className="text-mq-primary mx-auto mb-1" />
        <p className="font-black text-sm text-slate-800">{MAX_TIME}s</p>
        <p className="text-[10px] text-slate-400">per soal</p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
        <Target size={16} className="text-mq-primary mx-auto mb-1" />
        <p className="font-black text-sm text-slate-800">{mod.questions.length} soal</p>
        <p className="text-[10px] text-slate-400">total</p>
      </div>
      <div className="bg-orange-50 rounded-2xl p-3 text-center border border-orange-100">
        <Star size={16} className="text-mq-orange mx-auto mb-1" fill="currentColor" />
        <p className="font-black text-sm text-orange-700">{mod.xp} XP</p>
        <p className="text-[10px] text-orange-400">max hadiah</p>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex gap-3">
      <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" fill="currentColor" />
      <p className="text-xs text-amber-700 font-medium leading-relaxed">
        <strong>Tips Kahoot:</strong> Jawab lebih cepat = nilai lebih tinggi! &gt;40s sisa → 100% XP · 20–40s → 80% · 6–20s → 60% · &lt;6s → 40%.
      </p>
    </div>

    <button onClick={onStart}
      className="w-full py-4 bg-mq-primary text-white rounded-2xl font-black text-lg hover:bg-mq-orange transition-all shadow-lg flex items-center justify-center gap-2">
      <Play size={20} fill="currentColor" /> Mulai Quest!
    </button>
  </div>
);

// ─── PHASE 2: QUIZ ────────────────────────────────────────────────────────────
const OPTION_STYLES = [
  { base: 'bg-red-500 hover:bg-red-600', correct: 'bg-green-500 ring-4 ring-green-300', wrong: 'bg-red-400 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-blue-500 hover:bg-blue-600', correct: 'bg-green-500 ring-4 ring-green-300', wrong: 'bg-red-400 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-yellow-400 hover:bg-yellow-500', correct: 'bg-green-500 ring-4 ring-green-300', wrong: 'bg-red-400 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-green-500 hover:bg-green-600', correct: 'bg-green-500 ring-4 ring-green-300', wrong: 'bg-red-400 opacity-70', dim: 'bg-slate-200' },
];
const LABELS = ['A', 'B', 'C', 'D'];

const QuizPhase = ({ mod, onFinish }) => {
  const [step, setStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [selected, setSelected] = useState(null);
  const [showFb, setShowFb] = useState(false);
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);
  const baseXP = Math.round(mod.xp / mod.questions.length);
  const q = mod.questions[step];

  useEffect(() => {
    setTimeLeft(MAX_TIME);
    setSelected(null);
    setShowFb(false);
  }, [step]);

  useEffect(() => {
    if (showFb) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          const newRes = { correct: false, xpEarned: 0, timeLeft: 0 };
          setResults(r => [...r, newRes]);
          setSelected('__timeout__');
          setShowFb(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step, showFb]);

  const handleAnswer = (opt) => {
    if (selected) return;
    clearInterval(timerRef.current);
    const correct = opt === q.correct;
    const xpEarned = correct ? calculateScore(timeLeft, baseXP) : 0;
    setSelected(opt);
    setShowFb(true);
    setResults(r => [...r, { correct, xpEarned, timeLeft }]);
  };

  const handleNext = () => {
    const finalResults = results; // already has current result
    if (step + 1 < mod.questions.length) {
      setStep(s => s + 1);
    } else {
      onFinish(finalResults);
    }
  };

  const isTimeout = selected === '__timeout__';
  const lastResult = results[results.length - 1];

  return (
    <div className="flex flex-col">
      {/* Header Timer + Progress */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
            <span>Soal {step + 1} dari {mod.questions.length}</span>
            <span>{mod.title}</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-mq-primary rounded-full transition-all duration-500"
              style={{ width: `${(step / mod.questions.length) * 100}%` }} />
          </div>
        </div>
        <TimerRing timeLeft={timeLeft} />
      </div>

      {/* Konteks Mini */}
      {q.context && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 flex gap-2 items-start">
          <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">{q.context}</p>
        </div>
      )}

      {/* Pertanyaan + Score Badge */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 mb-4">
        <p className="text-lg font-bold text-slate-800 leading-relaxed mb-3">{q.question}</p>
        {!showFb && <ScoreIndicator timeLeft={timeLeft} baseXP={baseXP} />}
      </div>

      {/* Pilihan — Kahoot Style */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {q.options.map((opt, idx) => {
          const s = OPTION_STYLES[idx % 4];
          const isSelected = selected === opt;
          const isCorrect = opt === q.correct;
          let cls = '';
          if (!showFb) cls = `${s.base} text-white cursor-pointer active:scale-95 hover:scale-105`;
          else if (isCorrect) cls = `${s.correct} text-white`;
          else if (isSelected && !isCorrect) cls = `${s.wrong} text-white`;
          else cls = `${s.dim} text-slate-400`;

          return (
            <button key={idx} onClick={() => handleAnswer(opt)} disabled={!!selected}
              className={`rounded-2xl p-4 font-black flex items-center gap-3 transition-all duration-200 ${cls}`}>
              <span className="w-8 h-8 bg-black/15 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                {LABELS[idx]}
              </span>
              <span className="text-sm text-left leading-tight">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFb && (
        <div className={`rounded-2xl p-4 ${isTimeout ? 'bg-slate-100 border border-slate-200' : lastResult?.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{isTimeout ? '⏰' : lastResult?.correct ? '✅' : '❌'}</span>
            <div>
              <p className={`font-black ${isTimeout ? 'text-slate-600' : lastResult?.correct ? 'text-green-700' : 'text-red-600'}`}>
                {isTimeout ? 'Waktu Habis!' : lastResult?.correct ? `Benar! +${lastResult.xpEarned} XP` : 'Kurang tepat...'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
          <button onClick={handleNext}
            className="w-full py-3 bg-mq-primary text-white rounded-xl font-black hover:bg-mq-orange transition-all flex items-center justify-center gap-2">
            {step + 1 < mod.questions.length ? 'Soal Berikutnya' : 'Lihat Hasil'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── PHASE 3: RESULT ──────────────────────────────────────────────────────────
const ResultPhase = ({ mod, results, onClose }) => {
  const { addXP } = useApp();
  const totalXP = results.reduce((s, r) => s + r.xpEarned, 0);
  const correctCount = results.filter(r => r.correct).length;
  const avgTime = results.length ? Math.round(results.reduce((s, r) => s + r.timeLeft, 0) / results.length) : 0;
  const stars = correctCount === mod.questions.length ? 3 : correctCount >= Math.ceil(mod.questions.length / 2) ? 2 : correctCount > 0 ? 1 : 0;

  useEffect(() => { if (totalXP > 0) addXP(totalXP); }, []);

  const emojis = ['😅', '💪', '🎉', '🏆'];
  const labels = ['Coba Lagi Ya!', 'Terus Semangat!', 'Bagus Sekali!', 'Sempurna!'];

  return (
    <div className="text-center">
      <div className="text-7xl mb-4 animate-bounce">{emojis[stars]}</div>
      <h3 className="text-2xl font-black text-slate-800 mb-1">{labels[stars]}</h3>
      <p className="text-slate-400 text-sm mb-5">{mod.title}</p>

      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <Star key={s} size={36}
            className={s <= stars ? 'text-yellow-400' : 'text-slate-200'} fill="currentColor" />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
          <p className="font-black text-2xl text-mq-primary">{correctCount}</p>
          <p className="text-[10px] text-slate-400 font-bold">BENAR</p>
          <p className="text-[9px] text-slate-300">dari {mod.questions.length}</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
          <p className="font-black text-2xl text-mq-orange">+{totalXP}</p>
          <p className="text-[10px] text-orange-400 font-bold">XP</p>
          <p className="text-[9px] text-orange-300">terkumpul</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
          <p className="font-black text-2xl text-slate-700">{avgTime}s</p>
          <p className="text-[10px] text-slate-400 font-bold">RATA SISA</p>
          <p className="text-[9px] text-slate-300">waktu/soal</p>
        </div>
      </div>

      {/* Breakdown per soal */}
      <div className="space-y-2 mb-6 text-left">
        {results.map((r, idx) => (
          <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${r.correct ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <span className="text-lg">{r.correct ? '✅' : '❌'}</span>
            <span className="flex-1 text-sm font-bold text-slate-700">Soal {idx + 1}</span>
            <span className="text-xs font-black text-slate-500">{r.timeLeft}s sisa</span>
            <span className={`text-xs font-black ${r.correct ? 'text-green-600' : 'text-red-400'}`}>
              +{r.xpEarned} XP
            </span>
          </div>
        ))}
      </div>

      <button onClick={onClose}
        className="w-full py-4 bg-mq-primary text-white rounded-2xl font-black text-lg hover:bg-mq-orange transition-all shadow-lg flex items-center justify-center gap-2">
        <Trophy size={20} /> Kembali ke Quest Map
      </button>
    </div>
  );
};

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
const QuestModal = ({ mod, onClose }) => {
  const [phase, setPhase] = useState('story');
  const [results, setResults] = useState([]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl animate-in zoom-in duration-300 flex flex-col" style={{ maxHeight: '92vh' }}>
        {/* Modal Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <span className="text-2xl">{mod.emoji}</span>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mod.type}</p>
            <h3 className="font-black text-slate-800 leading-tight">{mod.title}</h3>
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5">
            {['story', 'quiz', 'result'].map((p) => (
              <div key={p} className={`h-2 rounded-full transition-all duration-300 ${phase === p ? 'bg-mq-primary w-6' : 'bg-slate-200 w-2'}`} />
            ))}
          </div>
          {phase === 'story' && (
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all ml-1">
              <X size={16} className="text-slate-500" />
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {phase === 'story' && <StoryPhase mod={mod} onStart={() => setPhase('quiz')} onClose={onClose} />}
          {phase === 'quiz' && <QuizPhase mod={mod} onFinish={(r) => { setResults(r); setPhase('result'); }} />}
          {phase === 'result' && <ResultPhase mod={mod} results={results} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

// ─── QUEST MAP MAIN ───────────────────────────────────────────────────────────
const QuestMap = () => {
  const { user } = useApp();
  const [selectedMod, setSelectedMod] = useState(null);

  const jenjang = user?.jenjang || 'SD';
  const chapters = questData[jenjang] || questData.SD;
  const allMods = chapters.flatMap(c => c.modules);
  const completedCount = allMods.filter(m => m.status === 'completed').length;
  const currentMod = allMods.find(m => m.status === 'current');

  return (
    <div className="animate-in fade-in duration-500">
      {/* Banner */}
      <div className="bg-mq-primary rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Jenjang · {jenjang}</p>
            <h2 className="text-3xl font-black mb-1">Quest Map</h2>
            <p className="opacity-80 text-sm">{completedCount} dari {allMods.length} modul selesai</p>
            {currentMod && (
              <button onClick={() => setSelectedMod(currentMod)}
                className="mt-4 px-5 py-2.5 bg-white text-mq-primary rounded-xl font-black text-sm hover:bg-mq-peach transition-all flex items-center gap-2">
                <Play size={14} fill="currentColor" /> Lanjutkan: {currentMod.title}
              </button>
            )}
          </div>
          <span className="text-5xl opacity-80 hidden md:block">📍</span>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {chapters.map((chapter) => {
          const done = chapter.modules.filter(m => m.status === 'completed').length;
          const locked = chapter.modules.every(m => m.status === 'locked');
          return (
            <div key={chapter.chapter} className={`rounded-[2rem] border-2 overflow-hidden transition-all ${locked ? 'border-slate-100 opacity-60' : chapter.border}`}>
              {/* Chapter Header */}
              <div className={`bg-gradient-to-r ${chapter.color} p-5 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black/10 rounded-2xl flex items-center justify-center text-2xl">{chapter.emoji}</div>
                  <div>
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">Bab {chapter.chapter}</p>
                    <h3 className="text-xl font-black text-white">{chapter.title}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-lg">{done}/{chapter.modules.length}</p>
                  <p className="text-white/60 text-xs font-bold">selesai</p>
                </div>
              </div>

              {/* Modules */}
              <div className={`p-4 space-y-3 ${chapter.lightBg}`}>
                {chapter.modules.map((mod) => (
                  <div key={mod.id}
                    onClick={() => mod.status !== 'locked' && setSelectedMod(mod)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                      mod.status === 'locked' ? 'bg-white/50 cursor-not-allowed' :
                      mod.status === 'current' ? 'bg-white border-2 border-mq-primary shadow-lg shadow-blue-100 cursor-pointer hover:shadow-xl hover:-translate-y-0.5' :
                      'bg-white border border-slate-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5'
                    }`}>
                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      mod.status === 'completed' ? 'bg-green-100' :
                      mod.status === 'current' ? 'bg-mq-primary/10' : 'bg-slate-100'
                    }`}>
                      {mod.status === 'completed' ? <CheckCircle2 size={20} className="text-green-500" fill="currentColor" /> :
                       mod.status === 'current' ? <Play size={18} className="text-mq-primary" fill="currentColor" /> :
                       <Lock size={15} className="text-slate-300" />}
                    </div>

                    <span className="text-2xl shrink-0">{mod.emoji}</span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-bold ${mod.status === 'locked' ? 'text-slate-400' : 'text-slate-800'}`}>{mod.title}</p>
                        {mod.type === 'Boss' && (
                          <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100 shrink-0">⚔️ BOSS</span>
                        )}
                        {mod.status === 'current' && (
                          <span className="text-[10px] font-black text-mq-primary bg-mq-blue-light/20 px-2 py-0.5 rounded-lg shrink-0">▶ MAIN</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} />{mod.duration}</span>
                        <span className="text-xs font-bold text-mq-orange flex items-center gap-1"><Star size={11} fill="currentColor" />{mod.xp} XP</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1"><Target size={11} />{mod.questions.length} soal</span>
                        {mod.status === 'completed' && (
                          <div className="flex gap-0.5">
                            {[1,2,3].map(s => <Star key={s} size={11} className={s <= mod.stars ? 'text-yellow-400' : 'text-slate-200'} fill="currentColor" />)}
                          </div>
                        )}
                      </div>
                    </div>

                    {mod.status !== 'locked' && <ChevronRight size={16} className="text-slate-300 shrink-0 group-hover:text-mq-primary transition-colors" />}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedMod && <QuestModal mod={selectedMod} onClose={() => setSelectedMod(null)} />}
    </div>
  );
};

export default QuestMap;