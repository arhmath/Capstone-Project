import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Award, Star, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const questionsData = {
  SD: [
    { q: "Berapakah hasil dari 12 × 5?", options: ["50", "60", "70", "80"], correct: "60", topic: "Perkalian", emoji: "✖️" },
    { q: "Berapakah hasil dari 100 ÷ 4?", options: ["20", "25", "30", "35"], correct: "25", topic: "Pembagian", emoji: "➗" },
    { q: "Berapakah hasil dari 125 + 75?", options: ["190", "200", "210", "220"], correct: "200", topic: "Penjumlahan", emoji: "➕" },
  ],
  SMP: [
    { q: "Jika 2x + 5 = 15, berapakah nilai x?", options: ["3", "5", "7", "10"], correct: "5", topic: "Aljabar", emoji: "📐" },
    { q: "Segitiga siku-siku dengan alas 3cm & tinggi 4cm. Berapakah sisi miringnya?", options: ["5cm", "6cm", "7cm", "8cm"], correct: "5cm", topic: "Pythagoras", emoji: "📏" },
    { q: "Himpunan penyelesaian dari x < 3 adalah...", options: ["{1,2}", "{3,4}", "{0,1,2,3}", "{...0,1,2}"], correct: "{...0,1,2}", topic: "Himpunan", emoji: "🔢" },
  ],
  SMA: [
    { q: "Turunan pertama dari f(x) = 3x² adalah...", options: ["3x", "6x", "9x", "6"], correct: "6x", topic: "Kalkulus", emoji: "📈" },
    { q: "Nilai dari sin 90° adalah...", options: ["0", "0.5", "1", "√3"], correct: "1", topic: "Trigonometri", emoji: "📡" },
    { q: "Logaritma basis 10 dari 1000 adalah...", options: ["1", "2", "3", "4"], correct: "3", topic: "Logaritma", emoji: "🔬" },
  ],
};

const jenjangMeta = {
  SD:  { color: '#22c55e', shadow: '#15803d', label: 'Sekolah Dasar',          icon: '🌱' },
  SMP: { color: '#0259DD', shadow: '#013ca3', label: 'Sekolah Menengah Pertama', icon: '⚡' },
  SMA: { color: '#FF6648', shadow: '#d14d33', label: 'Sekolah Menengah Atas',   icon: '🔥' },
};

/* ── Pilihan jawaban ── */
const OPTION_KEYS = ['A', 'B', 'C', 'D'];

const OptionButton = ({ label, text, onClick, state }) => {
  const base =
    'w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 font-bold text-left transition-all duration-200 group';

  const styles = {
    idle:    'bg-white border-slate-100 hover:border-[#0259DD] hover:bg-[#84AFFB]/5 text-slate-700 cursor-pointer active:scale-[0.98]',
    correct: 'bg-green-50 border-green-400 text-green-800 cursor-default',
    wrong:   'bg-red-50 border-red-300 text-red-700 cursor-default opacity-80',
    dim:     'bg-slate-50 border-slate-100 text-slate-300 cursor-default',
  };

  const keyStyles = {
    idle:    'bg-slate-100 text-slate-500 group-hover:bg-[#0259DD] group-hover:text-white',
    correct: 'bg-green-400 text-white',
    wrong:   'bg-red-300 text-white',
    dim:     'bg-slate-100 text-slate-300',
  };

  return (
    <button onClick={onClick} disabled={state !== 'idle'} className={`${base} ${styles[state]}`}>
      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${keyStyles[state]}`}>
        {label}
      </span>
      <span className="flex-1 text-sm leading-snug">{text}</span>
      {state === 'correct' && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" fill="currentColor" />}
      {state === 'wrong'   && <XCircle     size={18} className="text-red-400   flex-shrink-0" fill="currentColor" />}
    </button>
  );
};

/* ── Layar Hasil ── */
const ResultScreen = ({ jenjang, score, total, answers, questions }) => {
  const navigate = useNavigate();
  const { updateJenjang, addXP } = useApp();
  const meta = jenjangMeta[jenjang] || jenjangMeta.SD;
  const pct  = Math.round((score / total) * 100);

  React.useEffect(() => {
    updateJenjang(jenjang);
    addXP(score * 100);
  }, []);

  const getRecommendation = () => {
    if (pct === 100) return { text: 'Luar biasa! Kamu sudah menguasai materi dasar. Langsung coba Expert Quest!', icon: '🏆' };
    if (pct >= 60)  return { text: `Bagus! Perdalam sedikit materi ${answers.find(a => !a.correct)?.topic || 'yang salah'} ya.`, icon: '💪' };
    return { text: 'Tetap semangat! Kami rekomendasikan mulai dari modul Dasar agar fondasi lebih kuat.', icon: '🚀' };
  };

  const rec = getRecommendation();

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Dekorasi */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#84AFFB]/8 rounded-full -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFE1D7]/50 rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Kartu utama */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Banner atas */}
          <div className="p-8 text-center" style={{ background: `${meta.color}12` }}>
            <div
              className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg"
              style={{ background: `${meta.color}20` }}
            >
              <Award size={40} style={{ color: meta.color }} />
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3"
              style={{ background: `${meta.color}15`, color: meta.color }}
            >
              {meta.icon} Pre-Test {jenjang} Selesai!
            </span>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Hasil Ujianmu</h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Skor besar */}
            <div className="flex items-center gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="text-center">
                <p
                  className="text-6xl font-black leading-none"
                  style={{ color: meta.color }}
                >
                  {pct}
                </p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Skor</p>
              </div>
              <div className="flex-1 space-y-3">
                {/* Progress bar skor */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Jawaban Benar</span>
                    <span style={{ color: meta.color }}>{score}/{total}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: meta.color }}
                    />
                  </div>
                </div>
                {/* XP yang didapat */}
                <div className="flex items-center gap-2 bg-[#FFE1D7]/50 rounded-xl px-3 py-2 border border-[#FFE1D7]">
                  <Star size={14} className="text-[#FF6648]" fill="#FF6648" />
                  <span className="text-xs font-black text-slate-700">+{score * 100} XP didapat!</span>
                </div>
              </div>
            </div>

            {/* Review per soal */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Review Jawaban</p>
              <div className="space-y-2">
                {answers.map((a, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                      a.correct
                        ? 'bg-green-50 border-green-100'
                        : 'bg-red-50 border-red-100'
                    }`}
                  >
                    {a.correct
                      ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" fill="currentColor" />
                      : <XCircle     size={16} className="text-red-400   flex-shrink-0" fill="currentColor" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-700 truncate">{questions[i].q}</p>
                      {!a.correct && (
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          Jawaban benar: <span className="text-green-600 font-black">{questions[i].correct}</span>
                        </p>
                      )}
                    </div>
                    <span
                      className="text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0"
                      style={{ background: `${meta.color}15`, color: meta.color }}
                    >
                      {questions[i].topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rekomendasi */}
            <div className="bg-[#FFE1D7]/40 border border-[#FFE1D7] rounded-2xl p-4 flex gap-3">
              <span className="text-2xl flex-shrink-0">{rec.icon}</span>
              <p className="text-sm text-slate-700 font-semibold leading-relaxed italic">"{rec.text}"</p>
            </div>

            {/* Tombol */}
            <button
              onClick={() => navigate('/dashboard/quest-map')}
              className="w-full py-4 rounded-2xl font-black text-lg uppercase italic tracking-tight text-white flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:translate-y-1"
              style={{
                background: meta.color,
                boxShadow: `0 5px 0 ${meta.shadow}`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 7px 0 ${meta.shadow}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 5px 0 ${meta.shadow}`}
              onMouseDown={e  => e.currentTarget.style.boxShadow = `0 2px 0 ${meta.shadow}`}
              onMouseUp={e    => e.currentTarget.style.boxShadow = `0 5px 0 ${meta.shadow}`}
            >
              Masuk ke Dashboard <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Komponen Utama ── */
const PreTest = () => {
  const { jenjang } = useParams();
  const navigate    = useNavigate();
  const meta        = jenjangMeta[jenjang] || jenjangMeta.SD;

  const questions = questionsData[jenjang] || questionsData.SD;

  const [current,    setCurrent]    = useState(0);
  const [score,      setScore]      = useState(0);
  const [answers,    setAnswers]    = useState([]);
  const [picked,     setPicked]     = useState(null);   // jawaban yang dipilih
  const [showResult, setShowResult] = useState(false);

  const q      = questions[current];
  const isLast = current === questions.length - 1;

  const handlePick = (opt) => {
    if (picked) return;
    const correct = opt === q.correct;
    setPicked(opt);
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct, topic: q.topic, picked: opt }]);
  };

  const handleNext = () => {
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrent(c => c + 1);
      setPicked(null);
    }
  };

  if (showResult) {
    return (
      <ResultScreen
        jenjang={jenjang}
        score={score}
        total={questions.length}
        answers={answers}
        questions={questions}
      />
    );
  }

  const progressPct = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Dekorasi */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#84AFFB]/8 rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFE1D7]/50 rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          {/* Info jenjang */}
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
              style={{ background: `${meta.color}15` }}
            >
              {meta.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pre-Test</p>
              <p className="font-black text-slate-800 text-sm leading-tight">{meta.label}</p>
            </div>
          </div>

          {/* Nomor soal */}
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soal</p>
            <p className="font-black text-slate-800">
              <span style={{ color: meta.color }}>{current + 1}</span>
              <span className="text-slate-300"> / {questions.length}</span>
            </p>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="w-full h-3 bg-slate-100 rounded-full mb-8 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: meta.color }}
          />
        </div>

        {/* ── Kartu Soal ── */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden mb-5">
          {/* Badge topik */}
          <div className="px-8 pt-7 pb-2 flex items-center gap-2">
            <span className="text-lg">{q.emoji}</span>
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
              style={{ background: `${meta.color}15`, color: meta.color }}
            >
              {q.topic}
            </span>
          </div>

          {/* Pertanyaan */}
          <div className="px-8 pb-8 pt-3">
            <h3 className="text-xl font-black text-slate-800 leading-relaxed mb-7">
              {q.q}
            </h3>

            {/* Opsi jawaban */}
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, idx) => {
                let state = 'idle';
                if (picked) {
                  if (opt === q.correct)           state = 'correct';
                  else if (opt === picked)          state = 'wrong';
                  else                              state = 'dim';
                }
                return (
                  <OptionButton
                    key={idx}
                    label={OPTION_KEYS[idx]}
                    text={opt}
                    state={state}
                    onClick={() => handlePick(opt)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Feedback + Tombol Lanjut ── */}
        {picked && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Feedback */}
            <div
              className={`flex items-start gap-4 px-5 py-4 rounded-2xl border mb-4 ${
                picked === q.correct
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <span className="text-2xl flex-shrink-0">
                {picked === q.correct ? '🎉' : '💡'}
              </span>
              <div>
                <p className={`font-black text-sm mb-0.5 ${picked === q.correct ? 'text-green-700' : 'text-red-600'}`}>
                  {picked === q.correct ? 'Jawaban Benar! +100 XP' : 'Kurang tepat...'}
                </p>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {picked === q.correct
                    ? `Kamu menguasai topik ${q.topic} dengan baik!`
                    : `Jawaban yang benar adalah "${q.correct}". Pelajari lagi yuk!`
                  }
                </p>
              </div>
            </div>

            {/* Tombol lanjut */}
            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl font-black text-lg uppercase italic tracking-tight text-white flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:translate-y-1"
              style={{
                background: meta.color,
                boxShadow: `0 5px 0 ${meta.shadow}`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 7px 0 ${meta.shadow}`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 5px 0 ${meta.shadow}`}
              onMouseDown={e  => e.currentTarget.style.boxShadow = `0 2px 0 ${meta.shadow}`}
              onMouseUp={e    => e.currentTarget.style.boxShadow = `0 5px 0 ${meta.shadow}`}
            >
              {isLast ? (
                <><Award size={20} /> Lihat Hasil Akhir</>
              ) : (
                <>Soal Berikutnya <ArrowRight size={20} /></>
              )}
            </button>
          </div>
        )}

        {/* Dots navigasi bawah */}
        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, i) => {
            const isDone    = i < answers.length;
            const isCurrent = i === current;
            const wasCorrect = answers[i]?.correct;
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  isCurrent ? 24 : 10,
                  height: 10,
                  background: isDone
                    ? (wasCorrect ? '#22c55e' : '#ef4444')
                    : isCurrent
                    ? meta.color
                    : '#e2e8f0',
                }}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default PreTest;