import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizResult } from '../services/quizService';
import {
  Trophy, Star, CheckCircle2, XCircle,
  Home, Loader2, Clock, Zap, Target,
  ChevronDown, ChevronUp, Brain,
} from 'lucide-react';

const COLORS = {
  green: '#58CC02',
  greenDark: '#46A302',
  red: '#FF4B4B',
  redDark: '#D92D2D',
  yellow: '#FFD700',
  blue: '#1CB0F6',
  blueDark: '#0A91D0',
  orange: '#FF9600',
};

// ─── Animated Counter ──────────────────────────────────────────────────────────
const AnimatedNumber = ({ target, duration = 1200, suffix = '' }) => {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * ease));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return <>{value}{suffix}</>;
};

// ─── Score Ring ────────────────────────────────────────────────────────────────
const ScoreRing = ({ score, max, passed, delay = 0 }) => {
  const [animated, setAnimated] = useState(false);
  const pct = max > 0 ? score / max : 0;
  const r = 54;
  const circ = 2 * Math.PI * r;
  const color = passed ? COLORS.green : COLORS.red;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="144" height="144" className="-rotate-90">
        <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - pct) : circ}
          strokeLinecap="round"
          style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.34, 1.1, 0.64, 1) ${delay}ms` }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-black text-white">
          <AnimatedNumber target={score} duration={1200} />
        </p>
        <p className="text-xs font-black text-white/60 uppercase tracking-wider">Score</p>
      </div>
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color, bg, delay }) => (
  <div
    className="bg-white rounded-[24px] p-5 border-2 border-slate-100 flex flex-col items-center gap-2 animate-stat-in"
    style={{ animationDelay: `${delay}ms`, opacity: 0, animationFillMode: 'forwards' }}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg}`}>
      <span style={{ color }}>{icon}</span>
    </div>
    <p className="text-2xl sm:text-3xl font-black" style={{ color }}>{value}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-center">{label}</p>
  </div>
);

// ─── Answer Review Item ────────────────────────────────────────────────────────
const AnswerItem = ({ answer, index }) => {
  const [expanded, setExpanded] = useState(false);
  const correct = answer.isCorrect;
  const correctOpt = answer.question.options.find(o => o.isCorrect);

  return (
    <div
      className={`rounded-[24px] border-2 overflow-hidden transition-all duration-300 animate-answer-in`}
      style={{
        borderColor: correct ? '#BBF7D0' : '#FECACA',
        background: correct ? '#F0FFF4' : '#FFF5F5',
        animationDelay: `${index * 80}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left"
        onClick={() => setExpanded(e => !e)}
      >
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${correct ? 'bg-green-100' : 'bg-red-100'}`}
        >
          {correct
            ? <CheckCircle2 size={18} className="text-green-600" fill="currentColor" />
            : <XCircle size={18} className="text-red-500" fill="currentColor" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
            Soal {index + 1} {correct ? '· ✓ Benar' : '· ✗ Salah'}
          </p>
          <p className="font-bold text-slate-700 text-sm truncate">{answer.question.questionText}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {correct && (
            <span className="text-xs font-black text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <Star size={11} fill="currentColor" />+{answer.xpEarned}
            </span>
          )}
          {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </button>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-5 space-y-3 animate-fade-in border-t border-black/5 pt-4">
          {answer.question.imageUrl && (
            <img src={answer.question.imageUrl} alt="" className="rounded-2xl max-h-40 object-contain border border-white shadow" />
          )}
          <div className="space-y-2">
            {answer.question.options.map(opt => {
              const isSelected = opt.id === answer.selectedOption?.id;
              const isCorrect = opt.isCorrect;
              return (
                <div
                  key={opt.id}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border ${
                    isCorrect ? 'bg-green-100 border-green-200 text-green-800'
                    : isSelected ? 'bg-red-100 border-red-200 text-red-700'
                    : 'bg-white/70 border-transparent text-slate-500'
                  }`}
                >
                  {isCorrect && <CheckCircle2 size={14} className="text-green-600 shrink-0" fill="currentColor" />}
                  {!isCorrect && isSelected && <XCircle size={14} className="text-red-500 shrink-0" fill="currentColor" />}
                  {!isCorrect && !isSelected && <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />}
                  <span>{opt.optionText}</span>
                </div>
              );
            })}
          </div>
          {correctOpt?.explanation && (
            <div className="bg-white/80 rounded-xl p-3 border border-black/5">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Penjelasan</p>
              <p className="text-sm text-slate-600 leading-relaxed">{correctOpt.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main QuizResultPage ───────────────────────────────────────────────────────
const QuizResultPage = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getQuizResult(sessionId);
        setResult(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [sessionId]);

  if (loading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-t-green-500 border-transparent animate-spin" />
            <Trophy className="absolute inset-0 m-auto text-green-500" size={24} />
          </div>
          <p className="font-black text-slate-500 uppercase tracking-widest text-sm">Memuat Hasil...</p>
        </div>
      </div>
    );
  }

  const passed = result.isPassed;
  const correctCount = result.answers.filter(a => a.isCorrect).length;
  const totalQ = result.answers.length;
  const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

  return (
    <>
      <style>{`
        @keyframes stat-in {
          from { opacity: 0; transform: translateY(24px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-stat-in { animation: stat-in 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards; }
        @keyframes answer-in {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-answer-in { animation: answer-in 0.4s ease forwards; }
        @keyframes hero-in {
          from { opacity: 0; transform: scale(0.95) translateY(-20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-hero-in { animation: hero-in 0.6s cubic-bezier(0.34, 1.1, 0.64, 1) forwards; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease forwards; }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, currentColor 25%, #ffffff80 50%, currentColor 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes star-pop {
          0% { transform: scale(0) rotate(-30deg); opacity: 0; }
          70% { transform: scale(1.3) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        .animate-star-pop { animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="min-h-screen bg-[#F8F9FC] pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">

          {/* ── HERO CARD ── */}
          <div
            className="rounded-[32px] sm:rounded-[40px] overflow-hidden mb-6 relative animate-hero-in shadow-2xl"
            style={{
              background: passed
                ? `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 50%, #2D7A00 100%)`
                : `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redDark} 50%, #9B1212 100%)`,
            }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'white', filter: 'blur(60px)', transform: 'translate(30%,-30%)' }} />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'white', filter: 'blur(40px)', transform: 'translate(-30%,30%)' }} />

            <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              {/* Score ring */}
              <ScoreRing score={result.totalScore} max={100} passed={passed} delay={400} />

              <div className="flex-1 text-center sm:text-left text-white">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">
                  {passed ? '🏆 Quiz Passed!' : '💪 Quiz Failed'}
                </p>
                <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight">
                  {passed ? 'Luar Biasa!' : 'Hampir Berhasil!'}
                </h1>
                <p className="text-white/70 text-sm font-medium max-w-xs mb-5">
                  {passed
                    ? 'Kamu berhasil melewati quiz dan membuka materi berikutnya!'
                    : `Butuh skor ${result.quiz.passingScore} untuk lulus. Coba lagi, kamu pasti bisa!`}
                </p>

                {/* XP earned */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-2.5">
                  <Star size={18} fill="white" className="text-white animate-star-pop" style={{ animationDelay: '800ms', opacity: 0 }} />
                  <span className="font-black text-lg text-white">+{result.totalXpEarned} XP</span>
                  <span className="text-white/60 text-sm">diperoleh</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── STATS GRID ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <StatCard icon={<Target size={20} />} label="Skor" value={result.totalScore} color={passed ? COLORS.green : COLORS.red} bg={passed ? 'bg-green-100' : 'bg-red-100'} delay={100} />
            <StatCard icon={<CheckCircle2 size={20} />} label="Benar" value={`${correctCount}/${totalQ}`} color="#166534" bg="bg-green-100" delay={200} />
            <StatCard icon={<Zap size={20} />} label="Akurasi" value={`${accuracy}%`} color={COLORS.blue} bg="bg-blue-100" delay={300} />
            <StatCard icon={<Clock size={20} />} label="Waktu" value={`${result.durationSeconds}s`} color={COLORS.orange} bg="bg-orange-100" delay={400} />
          </div>

          {/* ── PASSING INFO ── */}
          {!passed && (
            <div className="bg-white rounded-[24px] border-2 border-orange-200 p-4 sm:p-5 mb-6 flex items-center gap-3 animate-fade-in">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0 text-xl">💡</div>
              <div>
                <p className="font-black text-slate-800 text-sm">Terus Berlatih!</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Skor kamu <strong>{result.totalScore}</strong>, passing score <strong>{result.quiz.passingScore}</strong>. Selisih {result.quiz.passingScore - result.totalScore} poin lagi.
                </p>
              </div>
            </div>
          )}

          {/* ── ANSWER REVIEW ── */}
          <div className="bg-white rounded-[28px] border-2 border-slate-100 overflow-hidden mb-6 shadow-sm">
            <button
              className="w-full flex items-center justify-between p-5 sm:p-6 font-black text-slate-700 hover:bg-slate-50 transition-all"
              onClick={() => setShowAnswers(v => !v)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Brain size={18} className="text-blue-500" />
                </div>
                <span>Review Jawaban ({totalQ} soal)</span>
              </div>
              <div className={`transition-transform duration-300 ${showAnswers ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} className="text-slate-400" />
              </div>
            </button>

            {showAnswers && (
              <div className="px-4 sm:px-5 pb-5 space-y-3 border-t border-slate-100 pt-4">
                {result.answers.map((ans, i) => (
                  <AnswerItem key={ans.id} answer={ans} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* ── ACTIONS ── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/dashboard/quest-map')}
              className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-black text-base transition-all active:translate-y-1 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
                boxShadow: `0 6px 0 ${COLORS.greenDark}`,
              }}
            >
              <Home size={20} />
              Kembali ke Quest Map
            </button>
            {!passed && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-black text-base border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultPage;