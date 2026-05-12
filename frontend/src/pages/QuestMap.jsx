import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  Lock, CheckCircle2, Play, Star, X, ArrowRight, Zap,
  Trophy, AlertCircle, Timer, Flame, Target, Clock
} from 'lucide-react';

// ─── KONSTANTA TIMER & SCORING ───────────────────────────────────────────────
const MAX_TIME = 60;
const calculateScore = (timeLeft, baseXP) => {
  const ratio = timeLeft / MAX_TIME;
  if (ratio > 0.66) return Math.round(baseXP);
  if (ratio > 0.33) return Math.round(baseXP * 0.8);
  if (ratio > 0.10) return Math.round(baseXP * 0.6);
  return Math.round(baseXP * 0.4);
};

// ─── DATA SOAL ────────────────────────────────────────────────────────────────
const questData = {
  SD: [
    {
      chapter: 1,
      title: "Bab 1: Gerbang Penjumlahan",
      desc: "Kuasai seni kuno penjumlahan dan buka rahasia dunia angka.",
      emoji: "⚡",
      color: "#58CC02", darkColor: "#46A302",
      modules: [
        {
          id: "sd-1-1", title: "Dasar Penjumlahan", emoji: "➕",
          xp: 100, duration: "±5 mnt", status: "completed", stars: 3, type: "Latihan",
          story: { title: "Warung Bu Sari", illustration: "🏪", text: `Bu Sari adalah penjual sayur di pasar. Setiap pagi ia membawa dagangan dengan penuh semangat.\n\nHari ini Bu Sari membawa 24 ikat bayam dan 15 ikat kangkung. Di perjalanan, ia bertemu Pak Andi yang ingin titip jual 8 ikat selada.\n\nBantu Bu Sari menghitung total dagangannya!` },
          questions: [
            { id: 1, question: "Berapa total ikat sayuran milik Bu Sari?", context: "Bu Sari membawa 24 ikat bayam dan 15 ikat kangkung.", options: ["37 ikat", "39 ikat", "41 ikat", "43 ikat"], correct: "39 ikat", explanation: "24 + 15 = 39 ikat sayuran." },
            { id: 2, question: "Berapa TOTAL semua sayuran termasuk titipan?", context: "Bu Sari punya 39 ikat + titipan 8 ikat selada.", options: ["45 ikat", "47 ikat", "49 ikat", "51 ikat"], correct: "47 ikat", explanation: "39 + 8 = 47 ikat total." },
            { id: 3, question: "Sebelum buka, 12 ikat terjual. Berapa sisa?", context: "Total 47 ikat, terjual 12 ikat.", options: ["33 ikat", "35 ikat", "37 ikat", "39 ikat"], correct: "35 ikat", explanation: "47 - 12 = 35 ikat sisa." },
          ],
        },
        {
          id: "sd-1-2", title: "Lompatan Dua Digit", emoji: "🔢",
          xp: 120, duration: "±5 mnt", status: "current", stars: 0, type: "Latihan",
          story: { title: "Celengan Rafi", illustration: "🐷", text: `Rafi adalah anak yang rajin menabung. Ia punya celengan berbentuk babi berwarna merah muda.\n\nSelama sebulan, Rafi berhasil mengumpulkan Rp 85.000 dari uang jajan.\n\nBantu Rafi menghitung sisa tabungannya!` },
          questions: [
            { id: 1, question: "Rafi beli buku seharga Rp 32.000. Sisa tabungan?", context: "Tabungan Rp 85.000, beli buku Rp 32.000.", options: ["Rp 51.000", "Rp 53.000", "Rp 55.000", "Rp 57.000"], correct: "Rp 53.000", explanation: "Rp 85.000 - Rp 32.000 = Rp 53.000." },
            { id: 2, question: "Rafi beli pensil Rp 18.000. Sisa tabungan?", context: "Sisa Rp 53.000, dikurang Rp 18.000.", options: ["Rp 33.000", "Rp 35.000", "Rp 37.000", "Rp 39.000"], correct: "Rp 35.000", explanation: "Rp 53.000 - Rp 18.000 = Rp 35.000." },
          ],
        },
        {
          id: "sd-1-3", title: "Master Simpan Pindah", emoji: "🔄",
          xp: 150, duration: "±6 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Pasar Seni", illustration: "🎨", text: "Di pasar seni, kamu belajar menghitung dengan cara yang menyenangkan!" },
          questions: [{ id: 1, question: "Hitung: 45 + 37 = ?", context: "Penjumlahan dua angka.", options: ["79", "82", "84", "86"], correct: "82", explanation: "45 + 37 = 82." }],
        },
        {
          id: "sd-1-4", title: "Kilat Mental", emoji: "⚡",
          xp: 150, duration: "±6 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Arena Matematika", illustration: "🏟️", text: "Uji kecepatanmu dalam menghitung mental!" },
          questions: [{ id: 1, question: "99 + 11 = ?", context: "Hitung cepat.", options: ["108", "110", "112", "114"], correct: "110", explanation: "99 + 11 = 110." }],
        },
        {
          id: "sd-1-5", title: "BOSS: Arch-Lich", emoji: "💀",
          xp: 250, duration: "±8 mnt", status: "locked", stars: 0, type: "Boss",
          story: { title: "Festival Matematika Kota", illustration: "🎪", text: `Kota Angkaria mengadakan Festival Matematika tahunan!\n\nSebagai Ketua Panitia, kamu harus bisa menggabungkan penjumlahan DAN pengurangan. Bersiaplah!` },
          questions: [
            { id: 1, question: "Panitia pesan 150 kursi. Datang 47 pagi + 68 sore. Masih kurang berapa?", context: "Target 150 kursi. Datang 47 + 68.", options: ["33 kursi", "35 kursi", "37 kursi", "39 kursi"], correct: "35 kursi", explanation: "47 + 68 = 115. 150 - 115 = 35 kursi." },
            { id: 2, question: "200 tiket, terjual 85 online + 72 offline. Belum terjual?", context: "200 tiket total.", options: ["41 tiket", "43 tiket", "45 tiket", "47 tiket"], correct: "43 tiket", explanation: "85 + 72 = 157. 200 - 157 = 43 tiket." },
            { id: 3, question: "Anggaran Rp 500.000. Beli kue Rp 175.000 + minuman Rp 230.000. Sisa?", context: "Pengeluaran dua jenis.", options: ["Rp 90.000", "Rp 95.000", "Rp 100.000", "Rp 105.000"], correct: "Rp 95.000", explanation: "175 + 230 = 405. 500 - 405 = Rp 95.000." },
          ],
        },
      ],
    },
    {
      chapter: 2,
      title: "Bab 2: Lembah Variabel",
      desc: "Jelajahi perkalian dan pembagian dalam petualangan baru.",
      emoji: "👑",
      color: "#1CB0F6", darkColor: "#0A91D0",
      modules: [
        {
          id: "sd-2-1", title: "Perkalian 1–5", emoji: "✖️",
          xp: 120, duration: "±5 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Kebun Pak Hendra", illustration: "🌻", text: "Pak Hendra menanam bunga dalam barisan rapi. Bantu menghitung dengan perkalian!" },
          questions: [{ id: 1, question: "4 baris bunga, tiap baris 5. Total?", context: "4 × 5 = ?", options: ["16", "18", "20", "22"], correct: "20", explanation: "4 × 5 = 20 bunga." }],
        },
        {
          id: "sd-2-2", title: "Perkalian 6–10", emoji: "🔢",
          xp: 120, duration: "±5 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Toko Roti Bu Dewi", illustration: "🍞", text: "Bu Dewi membuat roti dalam loyang-loyang rapi. Bantu menghitung totalnya!" },
          questions: [{ id: 1, question: "7 loyang × 8 roti = ?", context: "7 × 8.", options: ["52", "54", "56", "58"], correct: "56", explanation: "7 × 8 = 56 roti." }],
        },
      ],
    },
  ],
  SMP: [
    {
      chapter: 1, title: "Bab 1: Alam Aljabar", desc: "Eksplorasi persamaan dan himpunan.", emoji: "🔢",
      color: "#CE82FF", darkColor: "#A855F7",
      modules: [
        {
          id: "smp-1-1", title: "Persamaan Linear", emoji: "📐",
          xp: 150, duration: "±6 mnt", status: "current", stars: 0, type: "Latihan",
          story: { title: "Toko Sepatu Pak Bimo", illustration: "👟", text: "Pak Bimo butuh bantuanmu menghitung stok sepatu dengan persamaan!" },
          questions: [
            { id: 1, question: "x + 25 = 73. Berapa x?", context: "Selesaikan persamaan.", options: ["x = 46", "x = 47", "x = 48", "x = 49"], correct: "x = 48", explanation: "x = 73 - 25 = 48." },
            { id: 2, question: "3 × 2y = 360.000. Berapa y?", context: "6y = 360. Cari y.", options: ["y = 55", "y = 60", "y = 65", "y = 70"], correct: "y = 60", explanation: "6y = 360 → y = 60." },
          ],
        },
        {
          id: "smp-1-2", title: "Himpunan & Irisan", emoji: "🔵",
          xp: 140, duration: "±5 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Klub Sekolah", illustration: "🏫", text: "Bantu temukan anggota yang ikut kedua klub sekolah!" },
          questions: [{ id: 1, question: "A = {1,2,3}, B = {2,3,4}. A ∩ B = ?", context: "Irisan dua himpunan.", options: ["{1,2}", "{2,3}", "{3,4}", "{1,4}"], correct: "{2,3}", explanation: "Irisan = elemen di kedua himpunan: {2,3}." }],
        },
      ],
    },
    {
      chapter: 2, title: "Bab 2: Kerajaan Geometri", desc: "Kuasai bentuk-bentuk dan ukurannya.", emoji: "📐",
      color: "#FF9600", darkColor: "#CC7700",
      modules: [
        {
          id: "smp-2-1", title: "Luas & Keliling", emoji: "📏",
          xp: 150, duration: "±6 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Taman Kota", illustration: "🌳", text: "Walikota minta kamu menghitung luas dan keliling taman kota!" },
          questions: [{ id: 1, question: "Persegi sisi 8cm. Kelilingnya?", context: "Keliling = 4 × sisi.", options: ["24cm", "28cm", "32cm", "36cm"], correct: "32cm", explanation: "4 × 8 = 32cm." }],
        },
      ],
    },
  ],
  SMA: [
    {
      chapter: 1, title: "Bab 1: Galaksi Kalkulus", desc: "Jelajahi dunia turunan dan integral.", emoji: "🌌",
      color: "#FF4B4B", darkColor: "#CC2222",
      modules: [
        {
          id: "sma-1-1", title: "Turunan Fungsi", emoji: "📈",
          xp: 250, duration: "±8 mnt", status: "current", stars: 0, type: "Latihan",
          story: { title: "Roket ke Luar Angkasa", illustration: "🚀", text: "Tim ilmuwan muda merancang roket. Hitung kecepatan menggunakan turunan!" },
          questions: [
            { id: 1, question: "Turunan f(x) = 4x³ + 2x² adalah...", context: "Aturan pangkat: d/dx(xⁿ) = n·xⁿ⁻¹", options: ["12x² + 4x", "12x² + 2x", "4x² + 4x", "12x³ + 4x"], correct: "12x² + 4x", explanation: "f'(x) = 12x² + 4x." },
            { id: 2, question: "h(t) = 3t² + 2t + 5. Berapa h'(t)?", context: "Turunkan h(t) terhadap t.", options: ["6t + 2", "6t + 5", "3t + 2", "6t² + 2"], correct: "6t + 2", explanation: "h'(t) = 6t + 2." },
          ],
        },
      ],
    },
    {
      chapter: 2, title: "Bab 2: Dunia Trigonometri", desc: "Kuasai sin, cos, dan tan.", emoji: "📡",
      color: "#CE82FF", darkColor: "#A855F7",
      modules: [
        {
          id: "sma-2-1", title: "Sin, Cos, Tan", emoji: "📡",
          xp: 200, duration: "±7 mnt", status: "locked", stars: 0, type: "Latihan",
          story: { title: "Menara Pengamat", illustration: "🗼", text: "Bantu insinyur menghitung sudut dan ketinggian menara!" },
          questions: [{ id: 1, question: "sin 90° = ?", context: "Nilai trigonometri standar.", options: ["0", "0.5", "1", "√2"], correct: "1", explanation: "sin 90° = 1." }],
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
  const color = timeLeft > 30 ? '#58CC02' : timeLeft > 15 ? '#FF9600' : '#FF4B4B';
  return (
    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
      <svg width="88" height="88" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx="44" cy="44" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle cx="44" cy="44" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }} />
      </svg>
      <div className="relative z-10 text-center">
        <span className="font-black text-2xl leading-none" style={{ color }}>{timeLeft}</span>
        <p className="text-[9px] font-bold text-slate-400 mt-0.5">detik</p>
      </div>
    </div>
  );
};

// ─── STORY PHASE ──────────────────────────────────────────────────────────────
const StoryPhase = ({ mod, onStart, onClose }) => (
  <div className="flex flex-col">
    <div className="rounded-3xl p-8 mb-5 text-center" style={{ background: 'linear-gradient(135deg,#FFF9E6,#FFF3CC)' }}>
      <div className="text-8xl mb-4 animate-bounce">{mod.story.illustration}</div>
      <h3 className="text-2xl font-black text-slate-800">{mod.story.title}</h3>
    </div>
    <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 mb-5">
      <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">{mod.story.text}</p>
    </div>
    <div className="grid grid-cols-3 gap-3 mb-5">
      <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
        <Timer size={16} className="mx-auto mb-1 text-blue-500" />
        <p className="font-black text-sm">{MAX_TIME}s</p>
        <p className="text-[10px] text-slate-400">per soal</p>
      </div>
      <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
        <Target size={16} className="mx-auto mb-1 text-purple-500" />
        <p className="font-black text-sm">{mod.questions.length} soal</p>
        <p className="text-[10px] text-slate-400">total</p>
      </div>
      <div className="bg-yellow-50 rounded-2xl p-3 text-center border border-yellow-100">
        <Star size={16} className="mx-auto mb-1 text-yellow-500" fill="currentColor" />
        <p className="font-black text-sm text-yellow-700">{mod.xp} XP</p>
        <p className="text-[10px] text-yellow-400">max</p>
      </div>
    </div>
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 flex gap-3">
      <Zap size={16} className="text-amber-500 shrink-0 mt-0.5" fill="currentColor" />
      <p className="text-xs text-amber-700 font-medium leading-relaxed">
        <strong>Tips:</strong> Jawab lebih cepat = nilai lebih tinggi! &gt;40s → 100% · 20–40s → 80% · 6–20s → 60%
      </p>
    </div>
    <button onClick={onStart}
      className="w-full py-4 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 active:translate-y-1 transition-transform"
      style={{ background: '#58CC02', boxShadow: '0 5px 0 #46A302' }}>
      <Play size={20} fill="currentColor" /> Mulai Quest!
    </button>
  </div>
);

// ─── QUIZ PHASE ───────────────────────────────────────────────────────────────
const OPTION_STYLES = [
  { base: 'bg-[#FF4B4B]', correct: 'bg-green-500 ring-4 ring-green-200', wrong: 'bg-red-300 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-[#1CB0F6]', correct: 'bg-green-500 ring-4 ring-green-200', wrong: 'bg-red-300 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-[#FF9600]', correct: 'bg-green-500 ring-4 ring-green-200', wrong: 'bg-red-300 opacity-70', dim: 'bg-slate-200' },
  { base: 'bg-[#58CC02]', correct: 'bg-green-500 ring-4 ring-green-200', wrong: 'bg-red-300 opacity-70', dim: 'bg-slate-200' },
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

  useEffect(() => { setTimeLeft(MAX_TIME); setSelected(null); setShowFb(false); }, [step]);
  useEffect(() => {
    if (showFb) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setResults(r => [...r, { correct: false, xpEarned: 0, timeLeft: 0 }]);
          setSelected('__timeout__'); setShowFb(true); return 0;
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
    setSelected(opt); setShowFb(true);
    setResults(r => [...r, { correct, xpEarned, timeLeft }]);
  };

  const handleNext = () => {
    if (step + 1 < mod.questions.length) setStep(s => s + 1);
    else onFinish(results);
  };

  const isTimeout = selected === '__timeout__';
  const lastResult = results[results.length - 1];

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
            <span>Soal {step + 1}/{mod.questions.length}</span>
            <span>{mod.title}</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(step / mod.questions.length) * 100}%`, background: '#58CC02' }} />
          </div>
        </div>
        <TimerRing timeLeft={timeLeft} />
      </div>
      {q.context && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 flex gap-2">
          <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">{q.context}</p>
        </div>
      )}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 mb-4">
        <p className="text-lg font-bold text-slate-800 leading-relaxed">{q.question}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {q.options.map((opt, idx) => {
          const s = OPTION_STYLES[idx % 4];
          const isCorrect = opt === q.correct;
          let cls = !showFb ? `${s.base} text-white cursor-pointer active:scale-95 hover:brightness-110`
            : isCorrect ? `${s.correct} text-white`
            : selected === opt ? `${s.wrong} text-white`
            : `${s.dim} text-slate-400`;
          return (
            <button key={idx} onClick={() => handleAnswer(opt)} disabled={!!selected}
              className={`rounded-2xl p-4 font-black flex items-center gap-3 transition-all duration-200 ${cls}`}>
              <span className="w-8 h-8 bg-black/15 rounded-xl flex items-center justify-center font-black text-sm shrink-0">{LABELS[idx]}</span>
              <span className="text-sm text-left leading-tight">{opt}</span>
            </button>
          );
        })}
      </div>
      {showFb && (
        <div className={`rounded-2xl p-4 ${isTimeout ? 'bg-slate-100 border border-slate-200' : lastResult?.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{isTimeout ? '⏰' : lastResult?.correct ? '✅' : '❌'}</span>
            <div>
              <p className={`font-black ${isTimeout ? 'text-slate-600' : lastResult?.correct ? 'text-green-700' : 'text-red-600'}`}>
                {isTimeout ? 'Waktu Habis!' : lastResult?.correct ? `Benar! +${lastResult.xpEarned} XP` : 'Kurang tepat...'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{q.explanation}</p>
            </div>
          </div>
          <button onClick={handleNext}
            className="w-full py-3 text-white rounded-xl font-black flex items-center justify-center gap-2 active:translate-y-0.5 transition-transform"
            style={{ background: '#58CC02', boxShadow: '0 3px 0 #46A302' }}>
            {step + 1 < mod.questions.length ? 'Soal Berikutnya' : 'Lihat Hasil'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── RESULT PHASE ─────────────────────────────────────────────────────────────
const ResultPhase = ({ mod, results, onClose }) => {
  const { addXP } = useApp();
  const totalXP = results.reduce((s, r) => s + r.xpEarned, 0);
  const correctCount = results.filter(r => r.correct).length;
  const avgTime = results.length ? Math.round(results.reduce((s, r) => s + r.timeLeft, 0) / results.length) : 0;
  const stars = correctCount === mod.questions.length ? 3 : correctCount >= Math.ceil(mod.questions.length / 2) ? 2 : correctCount > 0 ? 1 : 0;
  useEffect(() => { if (totalXP > 0) addXP(totalXP); }, []);
  const emojis = ['😅', '💪', '🎉', '🏆'];
  const labels = ['Coba Lagi!', 'Terus Semangat!', 'Bagus Sekali!', 'Sempurna!'];
  return (
    <div className="text-center">
      <div className="text-7xl mb-4 animate-bounce">{emojis[stars]}</div>
      <h3 className="text-2xl font-black text-slate-800 mb-1">{labels[stars]}</h3>
      <p className="text-slate-400 text-sm mb-5">{mod.title}</p>
      <div className="flex justify-center gap-2 mb-6">
        {[1,2,3].map(s => <Star key={s} size={36} className={s <= stars ? 'text-yellow-400' : 'text-slate-200'} fill="currentColor" />)}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
          <p className="font-black text-2xl" style={{ color: '#58CC02' }}>{correctCount}</p>
          <p className="text-[10px] text-slate-400 font-bold">BENAR</p>
          <p className="text-[9px] text-slate-300">dari {mod.questions.length}</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
          <p className="font-black text-2xl text-orange-500">+{totalXP}</p>
          <p className="text-[10px] text-orange-400 font-bold">XP</p>
        </div>
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
          <p className="font-black text-2xl text-slate-700">{avgTime}s</p>
          <p className="text-[10px] text-slate-400 font-bold">SISA RATA</p>
        </div>
      </div>
      <div className="space-y-2 mb-6 text-left">
        {results.map((r, idx) => (
          <div key={idx} className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${r.correct ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <span className="text-lg">{r.correct ? '✅' : '❌'}</span>
            <span className="flex-1 text-sm font-bold text-slate-700">Soal {idx + 1}</span>
            <span className="text-xs font-black text-slate-500">{r.timeLeft}s</span>
            <span className={`text-xs font-black ${r.correct ? 'text-green-600' : 'text-red-400'}`}>+{r.xpEarned} XP</span>
          </div>
        ))}
      </div>
      <button onClick={onClose}
        className="w-full py-4 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 active:translate-y-0.5 transition-transform"
        style={{ background: '#58CC02', boxShadow: '0 5px 0 #46A302' }}>
        <Trophy size={20} /> Kembali ke Quest Map
      </button>
    </div>
  );
};

// ─── QUEST MODAL ──────────────────────────────────────────────────────────────
const QuestModal = ({ mod, onClose }) => {
  const [phase, setPhase] = useState('story');
  const [results, setResults] = useState([]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl animate-in zoom-in duration-300 flex flex-col" style={{ maxHeight: '92vh' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <span className="text-2xl">{mod.emoji}</span>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mod.type}</p>
            <h3 className="font-black text-slate-800 leading-tight">{mod.title}</h3>
          </div>
          <div className="flex gap-1.5">
            {['story','quiz','result'].map(p => (
              <div key={p} className={`h-2 rounded-full transition-all duration-300 ${phase === p ? 'w-6' : 'bg-slate-200 w-2'}`}
                style={phase === p ? { background: '#58CC02' } : {}} />
            ))}
          </div>
          {phase === 'story' && (
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all ml-1">
              <X size={16} className="text-slate-500" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {phase === 'story' && <StoryPhase mod={mod} onStart={() => setPhase('quiz')} onClose={onClose} />}
          {phase === 'quiz' && <QuizPhase mod={mod} onFinish={r => { setResults(r); setPhase('result'); }} />}
          {phase === 'result' && <ResultPhase mod={mod} results={results} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

// ─── NODE POPUP ───────────────────────────────────────────────────────────────
const NodePopup = ({ mod, chapterColor, chapterDark, onStart, onClose }) => {
  const isBoss = mod.type === 'Boss';
  return (
    <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[calc(100%+14px)] w-72"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}>
      <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
        style={{ background: isBoss ? '#1a1a2e' : 'white', border: isBoss ? '' : '2px solid #E5E7EB', zIndex: -1 }} />
      <div className={`rounded-2xl p-5 ${isBoss ? 'bg-[#1a1a2e]' : 'bg-white border-2 border-slate-100'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{mod.emoji}</span>
          <div>
            <p className={`font-black text-base leading-tight ${isBoss ? 'text-white' : 'text-slate-800'}`}>{mod.title}</p>
            {isBoss && <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">⚔️ BOSS BATTLE</span>}
          </div>
        </div>
        <div className="flex gap-4 mb-4 text-xs">
          <span className={`flex items-center gap-1 ${isBoss ? 'text-slate-400' : 'text-slate-500'}`}><Clock size={12} /> {mod.duration}</span>
          <span className={`flex items-center gap-1 font-black ${isBoss ? 'text-yellow-400' : 'text-yellow-600'}`}><Star size={12} fill="currentColor" /> {mod.xp} XP</span>
          <span className={`flex items-center gap-1 ${isBoss ? 'text-slate-400' : 'text-slate-500'}`}><Target size={12} /> {mod.questions.length} soal</span>
        </div>
        {mod.status === 'completed' && mod.stars > 0 && (
          <div className="flex gap-1 mb-3">
            {[1,2,3].map(s => <Star key={s} size={18} className={s <= mod.stars ? 'text-yellow-400' : 'text-slate-200'} fill="currentColor" />)}
          </div>
        )}
        <div className="flex gap-2">
          <button onClick={onClose}
            className="px-3 py-2.5 rounded-xl font-black text-sm border-2 border-slate-200 text-slate-500 hover:bg-slate-50 transition-all">✕</button>
          <button onClick={onStart}
            className="flex-1 py-2.5 rounded-xl font-black text-sm text-white active:translate-y-0.5 transition-transform"
            style={{ background: isBoss ? '#FF4B4B' : chapterColor, boxShadow: `0 3px 0 ${isBoss ? '#CC2222' : chapterDark}` }}>
            {mod.status === 'completed' ? '🔁 Ulangi' : '▶ Mulai Quest'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── PATH NODE ────────────────────────────────────────────────────────────────
// Duolingo-scale nodes: Boss=100px, Normal=88px
const PathNode = ({ mod, chapterColor, chapterDark, leftOffset, onOpenModal }) => {
  const [showPopup, setShowPopup] = useState(false);
  const isBoss = mod.type === 'Boss';
  const isCompleted = mod.status === 'completed';
  const isCurrent = mod.status === 'current';
  const isLocked = mod.status === 'locked';

  const size = isBoss ? 100 : 88;

  let nodeStyle, nodeInner;

  if (isBoss) {
    nodeStyle = isLocked
      ? { background: '#D1D5DB', boxShadow: '0 7px 0 #9CA3AF', border: '6px solid #E5E7EB' }
      : { background: 'linear-gradient(160deg,#2d1b4e,#1a1a2e)', boxShadow: '0 7px 0 #0d0d1a', border: '6px solid #FF4B4B' };
    nodeInner = isLocked ? <Lock size={36} className="text-slate-400" /> : <span style={{ fontSize: 40, lineHeight: 1 }}>💀</span>;
  } else if (isCompleted) {
    nodeStyle = { background: chapterColor, boxShadow: `0 7px 0 ${chapterDark}`, border: '6px solid white' };
    nodeInner = <CheckCircle2 size={40} className="text-white" fill="white" />;
  } else if (isCurrent) {
    nodeStyle = { background: chapterColor, boxShadow: `0 7px 0 ${chapterDark}`, border: '6px solid white' };
    nodeInner = <Star size={38} className="text-white" fill="white" />;
  } else {
    nodeStyle = { background: '#E5E7EB', boxShadow: '0 7px 0 #9CA3AF', border: '6px solid white' };
    nodeInner = <Lock size={34} className="text-slate-400" />;
  }

  return (
    <div className="relative flex flex-col items-center" style={{ marginLeft: leftOffset }}>
      {showPopup && !isLocked && (
        <NodePopup
          mod={mod} chapterColor={chapterColor} chapterDark={chapterDark}
          onStart={() => { setShowPopup(false); onOpenModal(mod); }}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Ping for current */}
      {isCurrent && (
        <div className="absolute -top-1 -right-1 z-10">
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FF9600' }} />
            <span className="relative inline-flex rounded-full h-6 w-6 border-2 border-white" style={{ background: '#FF9600' }} />
          </span>
        </div>
      )}

      <button
        onClick={() => !isLocked && setShowPopup(p => !p)}
        className={`rounded-full flex items-center justify-center transition-all duration-150 ${!isLocked ? 'hover:brightness-105 active:translate-y-1.5' : 'cursor-not-allowed'}`}
        style={{ width: size, height: size, ...nodeStyle }}>
        {nodeInner}
      </button>

      {/* Stars */}
      {isCompleted && (
        <div className="flex gap-1 mt-2.5">
          {[1,2,3].map(s => <Star key={s} size={14} className={s <= mod.stars ? 'text-yellow-400' : 'text-slate-300'} fill="currentColor" />)}
        </div>
      )}

      {/* Label */}
      <div className="mt-2 text-center" style={{ maxWidth: 120 }}>
        <p className="text-xs font-black leading-tight"
          style={{ color: isLocked ? '#9CA3AF' : isBoss && !isLocked ? '#FF4B4B' : chapterDark }}>
          {mod.title}
        </p>
        {isCurrent && <p className="text-[10px] font-bold mt-0.5" style={{ color: chapterColor }}>IN PROGRESS</p>}
        {isCompleted && <p className="text-[10px] font-bold mt-0.5 text-slate-400">SELESAI</p>}
      </div>
    </div>
  );
};

// ─── ZIGZAG PATH ─────────────────────────────────────────────────────────────
// Duolingo zigzag: nodes curve left–center–right across a ~280px container
// leftOffset is from the left of the path container
const ZIGZAG = [80, 160, 80, 0, 80]; // px offset from container left edge

const ZigzagPath = ({ modules, chapterColor, chapterDark, onOpenModal }) => {
  return (
    <div className="relative" style={{ width: 280 }}>
      {modules.map((mod, idx) => {
        const offset = ZIGZAG[idx % ZIGZAG.length];
        const prevOffset = idx > 0 ? ZIGZAG[(idx - 1) % ZIGZAG.length] : null;

        // connector vertical bar sits at midpoint between prev and current node center
        const nodeSize = mod.type === 'Boss' ? 100 : 88;
        const nodeCenterX = offset + nodeSize / 2;

        return (
          <div key={mod.id}>
            {/* Connector */}
            {idx > 0 && (() => {
              const prevSize = modules[idx - 1].type === 'Boss' ? 100 : 88;
              const prevCenter = prevOffset + prevSize / 2;
              const curCenter = offset + nodeSize / 2;
              const minX = Math.min(prevCenter, curCenter);
              const maxX = Math.max(prevCenter, curCenter);
              const isLocked = mod.status === 'locked';
              const connColor = isLocked ? '#E5E7EB' : chapterColor;

              return (
                <div style={{ position: 'relative', height: 32, width: 280 }}>
                  {/* Vertical from prev node bottom */}
                  <div style={{
                    position: 'absolute', left: prevCenter - 5, top: 0,
                    width: 10, height: 16,
                    background: connColor, borderRadius: 6, opacity: isLocked ? 0.4 : 0.7
                  }} />
                  {/* Horizontal connector if nodes differ in X */}
                  {prevCenter !== curCenter && (
                    <div style={{
                      position: 'absolute',
                      left: minX - 5, top: 10,
                      width: maxX - minX + 10, height: 10,
                      background: connColor, borderRadius: 6, opacity: isLocked ? 0.4 : 0.7
                    }} />
                  )}
                  {/* Vertical into current node */}
                  <div style={{
                    position: 'absolute', left: curCenter - 5, top: 16,
                    width: 10, height: 16,
                    background: connColor, borderRadius: 6, opacity: isLocked ? 0.4 : 0.7
                  }} />
                </div>
              );
            })()}

            {/* Node */}
            <PathNode
              mod={mod}
              chapterColor={chapterColor}
              chapterDark={chapterDark}
              leftOffset={offset}
              onOpenModal={onOpenModal}
            />
          </div>
        );
      })}
    </div>
  );
};

// ─── UNIT BANNER ─────────────────────────────────────────────────────────────
const UnitBanner = ({ chapter, completedCount, totalCount }) => (
  <div className="w-full max-w-2xl rounded-2xl p-5 text-white mb-5 relative overflow-hidden"
    style={{ background: `linear-gradient(135deg, ${chapter.color}, ${chapter.darkColor})` }}>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-7xl opacity-15 select-none pointer-events-none">{chapter.emoji}</div>
    <div className="relative z-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-0.5">UNIT {chapter.chapter}</p>
      <h3 className="text-lg font-black leading-tight mb-0.5">{chapter.title}</h3>
      <p className="text-sm opacity-75 mb-3 leading-snug">{chapter.desc}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2.5 rounded-full overflow-hidden bg-black/20">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / totalCount) * 100}%`, background: 'rgba(255,255,255,0.85)' }} />
        </div>
        <span className="text-xs font-black opacity-75">{completedCount}/{totalCount}</span>
      </div>
    </div>
  </div>
);

// ─── COMING SOON ──────────────────────────────────────────────────────────────
const ComingSoonCard = () => (
  <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Lock size={32} className="text-slate-300" />
    </div>
    <h4 className="font-black text-slate-400 text-lg mb-1">Bab Selanjutnya</h4>
    <p className="text-sm text-slate-300 font-medium mb-4">Sedang dalam pengembangan...</p>
    <div className="flex gap-1.5 mb-4">
      {[0,1,2].map(i => (
        <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-200 animate-pulse"
          style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
    </div>
    <span className="px-5 py-2 rounded-full text-xs font-black bg-slate-100 text-slate-400 uppercase tracking-widest">
      🚀 Coming Soon
    </span>
  </div>
);

// ─── DAILY GOALS PANEL ────────────────────────────────────────────────────────
const DailyGoalsPanel = () => (
  <div className="bg-white rounded-2xl border-2 border-slate-100 p-5 mb-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#FFF3E0' }}>
        <Target size={16} style={{ color: '#FF9600' }} />
      </div>
      <h3 className="font-black text-slate-700">Target Harian</h3>
    </div>
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-600">Kumpulkan 50 XP</span>
          <span className="text-slate-400">30/50</span>
        </div>
        <div className="w-full h-3.5 rounded-full overflow-hidden bg-slate-100">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: '60%', background: '#58CC02' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs font-bold mb-1.5">
          <span className="text-slate-600">Selesaikan 10 Soal</span>
          <span className="text-slate-400">8/10</span>
        </div>
        <div className="w-full h-3.5 rounded-full overflow-hidden bg-slate-100">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: '80%', background: '#58CC02' }} />
        </div>
      </div>
    </div>
    <button className="w-full mt-4 py-2.5 text-sm font-black rounded-xl border-2 transition-all hover:bg-green-50"
      style={{ borderColor: '#58CC02', color: '#58CC02' }}>
      Lihat Semua Tugas
    </button>
  </div>
);

// ─── LEADERBOARD PANEL ────────────────────────────────────────────────────────
const LeaderboardPanel = ({ user }) => {
  const players = [
    { rank: 1, name: "MathWizard99", xp: 12400, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wizard" },
    { rank: 2, name: "Algebro", xp: 11200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=algebro" },
    { rank: 14, name: user?.username || "You", xp: user?.xp || 2450, avatar: user?.foto, isUser: true },
  ];
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#FFF9E6' }}>
          <Trophy size={16} style={{ color: '#FFD700' }} />
        </div>
        <h3 className="font-black text-slate-700">Top Archmages</h3>
      </div>
      <div className="space-y-2">
        {players.map(p => (
          <div key={p.rank}
            className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${p.isUser ? 'border-2' : 'hover:bg-slate-50'}`}
            style={p.isUser ? { background: '#F0FFF4', borderColor: '#58CC02' } : {}}>
            <span className="font-black text-sm w-5 text-center text-slate-400">{p.rank}</span>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-100 shrink-0">
              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <span className={`flex-1 text-xs font-bold truncate ${p.isUser ? 'text-green-700' : 'text-slate-700'}`}>{p.name}</span>
            <span className="text-xs font-black" style={{ color: '#FF9600' }}>{p.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── QUEST MAP MAIN ───────────────────────────────────────────────────────────
const QuestMap = () => {
  const { user } = useApp();
  const [selectedMod, setSelectedMod] = useState(null);

  const jenjang = user?.jenjang || 'SD';
  const allChapters = questData[jenjang] || questData.SD;

  // Show only 2 chapters, then Coming Soon
  const visibleChapters = allChapters.slice(0, 2);

  const allMods = visibleChapters.flatMap(c => c.modules);
  const currentMod = allMods.find(m => m.status === 'current');

  return (
    <div className="flex gap-8 animate-in fade-in duration-500">

      {/* ── CENTER: Path ── */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2 bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <Zap size={18} fill="#FFD700" style={{ color: '#FFD700' }} />
            <span className="font-black text-slate-700">{user?.xp || 0} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <Flame size={18} fill="#FF4B4B" style={{ color: '#FF4B4B' }} />
            <span className="font-black text-slate-700">14 Hari Streak</span>
          </div>
          <div className="flex-1" />
          {currentMod && (
            <button onClick={() => setSelectedMod(currentMod)}
              className="px-5 py-2.5 text-white rounded-2xl font-black text-sm flex items-center gap-2 active:translate-y-0.5 transition-transform"
              style={{ background: '#58CC02', boxShadow: '0 4px 0 #46A302' }}>
              <Play size={14} fill="currentColor" /> Lanjutkan
            </button>
          )}
        </div>

        {/* Path — max-width narrow like Duolingo, centered */}
        <div style={{ width: 280, margin: '0 auto' }}>
          {visibleChapters.map((chapter, cIdx) => {
            const completedInChapter = chapter.modules.filter(m => m.status === 'completed').length;
            const isChapterLocked = chapter.modules.every(m => m.status === 'locked');

            return (
              <div key={chapter.chapter} className={cIdx > 0 ? 'mt-10' : ''}>
                {/* Banner */}
                {isChapterLocked && cIdx > 0 ? (
                  <div className="relative mb-5">
                    <UnitBanner chapter={chapter} completedCount={0} totalCount={chapter.modules.length} />
                    <div className="absolute inset-0 bg-white/75 rounded-2xl flex flex-col items-center justify-center backdrop-blur-[2px]">
                      <Lock size={24} className="text-slate-400 mb-1" />
                      <p className="font-black text-slate-500 text-sm">Selesaikan Bab {cIdx} dulu</p>
                    </div>
                  </div>
                ) : (
                  <UnitBanner chapter={chapter} completedCount={completedInChapter} totalCount={chapter.modules.length} />
                )}

                {/* Zigzag nodes */}
                <ZigzagPath
                  modules={chapter.modules}
                  chapterColor={chapter.color}
                  chapterDark={chapter.darkColor}
                  onOpenModal={setSelectedMod}
                />
              </div>
            );
          })}

          <ComingSoonCard />
        </div>
      </div>

      {/* ── RIGHT: Panels ── */}
      <div className="w-72 shrink-0 hidden lg:block">
        <DailyGoalsPanel />
        <LeaderboardPanel user={user} />
      </div>

      {selectedMod && <QuestModal mod={selectedMod} onClose={() => setSelectedMod(null)} />}
    </div>
  );
};

export default QuestMap;