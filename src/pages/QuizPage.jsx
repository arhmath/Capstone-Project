import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createQuizSession,
  submitQuizAnswer,
  finishQuizSession,
} from '../services/quizService';
import { CheckCircle2, XCircle, Loader2, Brain, Star, Zap, Clock } from 'lucide-react';

// ─── Helpers ───────────────────────────────────────────────────────────────────
const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

const COLORS = {
  green: '#58CC02',
  greenDark: '#46A302',
  red: '#FF4B4B',
  redDark: '#CC2222',
  blue: '#1CB0F6',
  blueDark: '#0A91D0',
  yellow: '#FFD700',
};

// ─── Confetti ──────────────────────────────────────────────────────────────────
const ConfettiPiece = ({ style }) => (
  <div className="absolute top-0 pointer-events-none" style={style} />
);

const Confetti = ({ active }) => {
  const pieces = Array.from({ length: 20 }).map((_, i) => ({
    style: {
      left: `${Math.random() * 100}%`,
      width: 8,
      height: 8,
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      background: [COLORS.green, COLORS.blue, COLORS.yellow, '#FF9600', '#FF4B4B'][i % 5],
      opacity: 0,
      transform: 'translateY(-20px)',
      animation: active ? `confetti-fall ${0.8 + Math.random() * 0.6}s ease-out forwards ${Math.random() * 0.4}s` : 'none',
    },
  }));

  if (!active) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {pieces.map((p, i) => <ConfettiPiece key={i} style={p.style} />)}
    </div>
  );
};

// ─── Circular Timer ────────────────────────────────────────────────────────────
const CircularTimer = ({ elapsed, limit }) => {
  if (!limit) return null;
  const pct = Math.min(elapsed / limit, 1);
  const r = 22;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - pct);
  const color = pct > 0.8 ? COLORS.red : pct > 0.5 ? '#FF9600' : COLORS.green;

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#E5E7EB" strokeWidth="4" />
        <circle
          cx="28" cy="28" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span className="absolute text-xs font-black" style={{ color }}>{limit - elapsed}s</span>
    </div>
  );
};

// ─── XP Burst ──────────────────────────────────────────────────────────────────
const XpBurst = ({ xp, visible }) => {
  if (!visible || !xp) return null;
  return (
    <div className="absolute top-2 right-2 animate-xp-burst z-20 pointer-events-none">
      <div className="flex items-center gap-1 bg-yellow-400 text-white font-black text-sm px-3 py-1.5 rounded-xl shadow-lg">
        <Star size={14} fill="white" />+{xp} XP
      </div>
    </div>
  );
};

// ─── Option Button ─────────────────────────────────────────────────────────────
const OptionBtn = ({ label, text, state, onClick, delay }) => {
  const styles = {
    idle: {
      border: '2.5px solid #E5E7EB',
      background: 'white',
      color: '#1E293B',
      labelBg: '#F1F5F9',
      labelColor: '#64748B',
      cursor: 'pointer',
      transform: 'none',
    },
    correct: {
      border: `2.5px solid ${COLORS.green}`,
      background: '#F0FDF4',
      color: '#166534',
      labelBg: COLORS.green,
      labelColor: 'white',
      cursor: 'default',
      transform: 'scale(1.01)',
    },
    wrong: {
      border: `2.5px solid ${COLORS.red}`,
      background: '#FFF1F1',
      color: '#991B1B',
      labelBg: COLORS.red,
      labelColor: 'white',
      cursor: 'default',
      transform: 'scale(0.99)',
    },
    dim: {
      border: '2.5px solid #F1F5F9',
      background: '#FAFAFA',
      color: '#CBD5E1',
      labelBg: '#F1F5F9',
      labelColor: '#CBD5E1',
      cursor: 'default',
      transform: 'none',
    },
  };

  const s = styles[state] || styles.idle;

  return (
    <button
      onClick={state === 'idle' ? onClick : undefined}
      disabled={state !== 'idle'}
      className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl font-bold text-left transition-all duration-300 group hover:shadow-md animate-option-in"
      style={{
        border: s.border,
        background: s.background,
        color: s.color,
        cursor: s.cursor,
        transform: s.transform,
        animationDelay: `${delay}ms`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300"
        style={{ background: s.labelBg, color: s.labelColor }}
      >
        {label}
      </span>
      <span className="flex-1 text-sm sm:text-base leading-snug">{text}</span>
      {state === 'correct' && <CheckCircle2 size={20} className="shrink-0 text-green-500" fill="currentColor" />}
      {state === 'wrong' && <XCircle size={20} className="shrink-0 text-red-500" fill="currentColor" />}
    </button>
  );
};

// ─── Feedback Bar ──────────────────────────────────────────────────────────────
const FeedbackBar = ({ result, onNext, isLast, submitting }) => {
  const correct = result?.isCorrect;
  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 animate-slide-up ${correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}
    >
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${correct ? 'bg-green-100' : 'bg-red-100'}`}>
          {correct ? '🎉' : '💡'}
        </div>
        <div>
          <h3 className={`font-black text-lg mb-1 ${correct ? 'text-green-700' : 'text-red-700'}`}>
            {correct ? 'Jawaban Benar!' : 'Kurang Tepat...'}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {correct
              ? result.explanation || 'Hebat! Kamu menjawab dengan benar.'
              : result.correctOption?.explanation || `Jawaban yang benar adalah "${result.correctOption?.optionText}".`
            }
          </p>
          {!correct && result.correctOption && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-black">
              <CheckCircle2 size={12} /> Benar: {result.correctOption.optionText}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={submitting}
        className="w-full py-3.5 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 transition-all active:translate-y-1"
        style={{
          background: correct ? COLORS.green : COLORS.blue,
          boxShadow: correct ? `0 4px 0 ${COLORS.greenDark}` : `0 4px 0 ${COLORS.blueDark}`,
        }}
      >
        {submitting ? <Loader2 size={18} className="animate-spin" /> : isLast ? ' Selesaikan Quiz' : 'Lanjut →'}
      </button>
    </div>
  );
};

// ─── Main QuizPage ─────────────────────────────────────────────────────────────
const QuizPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const [session, setSession] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [showXp, setShowXp] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const startQuiz = async () => {
      try {
        const res = await createQuizSession(quizId);
        setSession(res.session);
        setQuiz(res.quiz);
        setStartTime(Date.now());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    startQuiz();
  }, [quizId]);

  // Timer
  useEffect(() => {
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  useEffect(() => {
    if (answerResult) clearInterval(timerRef.current);
  }, [answerResult]);

  const handleAnswer = async (optionId) => {
    if (submitting || answerResult) return;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const q = quiz.questions[currentIndex];
    setSelectedOption(optionId);
    setSubmitting(true);
    try {
      const res = await submitQuizAnswer(session.id, { questionId: q.id, optionId, timeTaken });
      setAnswerResult(res);
      if (res.isCorrect) {
        setShowXp(true);
        setTimeout(() => setShowXp(false), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (currentIndex === quiz.questions.length - 1) {
      try {
        const result = await finishQuizSession(session.id);
        navigate(`/quiz-result/${session.id}`, { state: result });
      } catch (err) {
        console.error(err);
      }
      return;
    }
    setCurrentIndex(p => p + 1);
    setSelectedOption(null);
    setAnswerResult(null);
    setElapsed(0);
    setStartTime(Date.now());
    setCardKey(k => k + 1);
  };

  if (loading || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full bg-red-100 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-t-red-500 border-transparent animate-spin" />
            <Brain className="absolute inset-0 m-auto text-red-500" size={24} />
          </div>
          <p className="font-black text-slate-500 uppercase tracking-widest text-sm">Menyiapkan Quiz...</p>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;
  const progressPct = ((currentIndex + 1) / quiz.questions.length) * 100;

  return (
    <>
      <style>{`
        @keyframes option-in {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-option-in { animation: option-in 0.35s ease forwards; }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s ease forwards; }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-in { animation: card-in 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) forwards; }
        @keyframes xp-burst {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          40% { opacity: 1; transform: translateY(-12px) scale(1.15); }
          100% { opacity: 0; transform: translateY(-30px) scale(1); }
        }
        .animate-xp-burst { animation: xp-burst 1.8s ease forwards; }
        @keyframes confetti-fall {
          0% { opacity: 1; transform: translateY(-10px) rotate(0deg); }
          100% { opacity: 0; transform: translateY(300px) rotate(720deg); }
        }
        @keyframes header-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>

      <div className="min-h-screen bg-[#F8F9FC]">
        {/* ── TOP BAR ── */}
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3 mb-3">
              {/* Quiz info */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                  <Brain size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Quiz Challenge</p>
                  <p className="text-xs font-black text-slate-700 leading-tight">{quiz.title}</p>
                </div>
              </div>
              <div className="flex-1" />
              {/* Timer */}
              <CircularTimer elapsed={elapsed} limit={question.timeLimitSeconds || null} />
              {/* XP counter */}
              <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-1.5">
                <Zap size={13} className="text-yellow-500" fill="currentColor" />
                <span className="text-xs font-black text-yellow-700">
                  {currentIndex + 1}/{quiz.questions.length}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(90deg, ${COLORS.red}, #FF9600)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div key={cardKey} className="animate-card-in">
            {/* Question Card */}
            <div className="bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 mb-5 relative">
              <Confetti active={answerResult?.isCorrect} />
              <XpBurst xp={answerResult?.xpEarned} visible={showXp} />

              {/* Card header */}
              <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-2 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                  style={{ background: `linear-gradient(135deg, ${COLORS.red}, #FF6B6B)` }}
                >
                  {currentIndex + 1}
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Pertanyaan {currentIndex + 1} dari {quiz.questions.length}
                </p>
              </div>

              {/* Question text */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight mb-6 sm:mb-8">
                  {question.questionText}
                </h2>

                {question.imageUrl && (
                  <div className="rounded-2xl overflow-hidden mb-6 border border-slate-100">
                    <img src={question.imageUrl} alt="" className="w-full object-contain max-h-52" />
                  </div>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((opt, idx) => {
                    let state = 'idle';
                    if (answerResult) {
                      const isThisCorrect = opt.isCorrect || (answerResult.isCorrect && opt.id === selectedOption);
                      state = isThisCorrect ? 'correct' : opt.id === selectedOption ? 'wrong' : 'dim';
                    }
                    return (
                      <OptionBtn
                        key={opt.id}
                        label={OPTION_LABELS[idx]}
                        text={opt.optionText}
                        state={state}
                        onClick={() => handleAnswer(opt.id)}
                        delay={idx * 80}
                      />
                    );
                  })}
                </div>

                {/* Loading overlay */}
                {submitting && !answerResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-[36px] z-10">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 size={32} className="animate-spin text-red-400" />
                      <p className="text-xs font-black text-slate-500">Mengecek jawaban...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback */}
            {answerResult && (
              <FeedbackBar
                result={answerResult}
                onNext={handleNext}
                isLast={isLast}
                submitting={submitting}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizPage;