import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Award, Star, CheckCircle2, XCircle,
  ArrowRight, ChevronRight, Loader2,
} from 'lucide-react';
import {
  getPretestQuestions,
  submitPretestAnswer,
  finishPretestSession,
} from '../services/pretestService';
import {
  getOrRequestRecommendation,
} from '../services/recommendationService';

// ─── Config ───────────────────────────────────────────────────────────────────

const JENJANG_META = {
  primary: { label: 'SD', icon: '🏫', color: '#E53935', shadow: '#b71c1c' },
  middle: { label: 'SMP', icon: '⚡', color: '#0259DD', shadow: '#003a9e' },
  high: { label: 'SMA', icon: '🛡️', color: '#616161', shadow: '#212121' },
};

const optionLabel = (idx) => String.fromCharCode(65 + idx);

const normaliseOpt = (opt) => ({
  id: opt.id,
  text: opt.optionText ?? opt.text ?? String(opt),
});

/**
 * apiFetch bisa mengembalikan response dalam berbagai bentuk:
 *   { success, data: { ... } }   ← envelope
 *   { ... }                      ← langsung
 * Fungsi ini selalu mengembalikan payload yang sebenarnya.
 */
const unwrap = (res) => res?.data ?? res;

const getRecommendation = (pct) => {
  if (pct === 100) return { text: 'Luar biasa! Kamu sudah menguasai materi dasar. Langsung coba Expert Quest!', icon: '🏆' };
  if (pct >= 60) return { text: 'Bagus! Perdalam sedikit materi yang belum dikuasai ya.', icon: '💪' };
  return { text: 'Tetap semangat! Kami rekomendasikan mulai dari modul Dasar agar fondasi lebih kuat.', icon: '🚀' };
};

// ─── OptionButton ─────────────────────────────────────────────────────────────

const STATE_CLS = {
  idle: 'bg-white border-slate-100 hover:border-[#0259DD] hover:bg-[#84AFFB]/5 text-slate-700 cursor-pointer active:scale-[0.98]',
  correct: 'bg-green-50 border-green-400 text-green-800 cursor-default',
  wrong: 'bg-red-50 border-red-300 text-red-700 cursor-default opacity-80',
  dim: 'bg-slate-50 border-slate-100 text-slate-300 cursor-default',
};
const KEY_CLS = {
  idle: 'bg-slate-100 text-slate-500 group-hover:bg-[#0259DD] group-hover:text-white',
  correct: 'bg-green-400 text-white',
  wrong: 'bg-red-300 text-white',
  dim: 'bg-slate-100 text-slate-300',
};

const OptionButton = ({ label, text, state, onClick }) => (
  <button
    onClick={onClick}
    disabled={state !== 'idle'}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 font-bold text-left transition-all duration-200 group ${STATE_CLS[state]}`}
  >
    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${KEY_CLS[state]}`}>
      {label}
    </span>
    <span className="flex-1 text-sm leading-snug">{text}</span>
    {state === 'correct' && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" fill="currentColor" />}
    {state === 'wrong' && <XCircle size={18} className="text-red-400   flex-shrink-0" fill="currentColor" />}
  </button>
);

// ─── Shared helpers ───────────────────────────────────────────────────────────

const Blobs = () => (
  <>
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#84AFFB]/8 rounded-full -mr-48 -mt-48 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFE1D7]/50 rounded-full -ml-32 -mb-32 pointer-events-none" />
  </>
);

const CTAButton = ({ meta, onClick, disabled, children }) => {
  const shadow = `0 5px 0 ${meta.shadow}`;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-2xl font-black text-lg uppercase italic tracking-tight text-white flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px] active:translate-y-1 disabled:opacity-70 disabled:cursor-wait"
      style={{ background: meta.color, boxShadow: shadow }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.boxShadow = `0 7px 0 ${meta.shadow}`; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.boxShadow = shadow; }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.boxShadow = `0 2px 0 ${meta.shadow}`; }}
      onMouseUp={e => { if (!disabled) e.currentTarget.style.boxShadow = shadow; }}
    >
      {children}
    </button>
  );
};

const LoadingScreen = ({ meta }) => (
  <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 size={40} className="animate-spin" style={{ color: meta.color }} />
      <p className="font-black text-slate-500 text-sm uppercase tracking-widest">Memuat Soal…</p>
    </div>
  </div>
);

const ErrorScreen = ({ message, onRetry }) => (
  <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-6">
    <div className="text-center space-y-4 max-w-sm">
      <p className="text-5xl">⚠️</p>
      <h2 className="text-xl font-black text-slate-800">Gagal Memuat Soal</h2>
      <p className="text-sm text-slate-500 font-semibold">{message}</p>
      <button onClick={onRetry} className="mt-4 px-8 py-3 rounded-2xl font-black text-white bg-[#FF6648] active:scale-95 transition-all">
        Coba Lagi
      </button>
    </div>
  </div>
);

// ─── Result Screen ────────────────────────────────────────────────────────────

const ResultScreen = ({ jenjang, result, questions, localAnswers, sessionId }) => {
  const navigate = useNavigate();
  const meta = JENJANG_META[jenjang];

  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [recommendationError, setRecommendationError] = useState(null);
  const [hasRequestedRecommendation, setHasRequestedRecommendation] = useState(false);

  // Backend fields: totalCorrect, totalAnswers
  const total = result.totalAnswers ?? questions.length;
  const correctCount = result.totalCorrect ?? 0;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const rec = getRecommendation(pct);

  // finishPretestSession tidak mengembalikan breakdown per soal,
  // gunakan localAnswers yang dibangun selama sesi dari submitPretestAnswer
  const answerMap = Object.fromEntries(
    (localAnswers ?? []).map(a => [a.questionId, a])
  );

  const handleGetRecommendation = async () => {
    try {
      setLoadingRecommendation(true);
      setRecommendationError(null);

      const raw = await getOrRequestRecommendation(sessionId);

      // handle dua bentuk response:
      // POST -> { user_id, session_id, recommendations }
      // GET  -> { total, recommendations }

      const recs = raw?.recommendations ?? [];

      setRecommendations(recs);
      setHasRequestedRecommendation(true);
    } catch (err) {
      console.error(err);
      setRecommendationError(
        err.message || 'Gagal mengambil rekomendasi AI.'
      );
    } finally {
      setLoadingRecommendation(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <Blobs />
      <div className="w-full max-w-xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">

          {/* Banner */}
          <div className="p-8 text-center" style={{ background: `${meta.color}12` }}>
            <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: `${meta.color}20` }}>
              <Award size={40} style={{ color: meta.color }} />
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ background: `${meta.color}15`, color: meta.color }}>
              {meta.icon} Pre-Test {meta.label} Selesai!
            </span>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">Hasil Ujianmu</h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Score */}
            <div className="flex items-center gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="text-center">
                <p className="text-6xl font-black leading-none" style={{ color: meta.color }}>{pct}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Skor</p>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Jawaban Benar</span>
                    <span style={{ color: meta.color }}>{correctCount}/{total}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: meta.color }} />
                  </div>
                </div>
                {result.xpEarned != null && (
                  <div className="flex items-center gap-2 bg-[#FFE1D7]/50 rounded-xl px-3 py-2 border border-[#FFE1D7]">
                    <Star size={14} className="text-[#FF6648]" fill="#FF6648" />
                    <span className="text-xs font-black text-slate-700">+{result.xpEarned} XP didapat!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Review */}
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Review Jawaban</p>
              <div className="space-y-2">
                {questions.map((q) => {
                  const ans = answerMap[q.id];
                  const ok = ans?.correct ?? false;
                  // localAnswers menyimpan correctOptionText dari res.correctOption.optionText
                  const correctText = ans?.correctOptionText;
                  return (
                    <div key={q.id} className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${ok ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                      {ok
                        ? <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" fill="currentColor" />
                        : <XCircle size={16} className="text-red-400   flex-shrink-0" fill="currentColor" />
                      }
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-slate-700 truncate">{q.questionText}</p>
                        {!ok && correctText && (
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                            Jawaban benar: <span className="text-green-600 font-black">{correctText}</span>
                          </p>
                        )}
                      </div>
                      {q.topic && (
                        <span className="text-[10px] font-black px-2 py-1 rounded-lg flex-shrink-0" style={{ background: `${meta.color}15`, color: meta.color }}>
                          {q.topic}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rekomendasi */}
            <div className="bg-[#FFE1D7]/40 border border-[#FFE1D7] rounded-2xl p-4 flex gap-3">
              <span className="text-2xl flex-shrink-0">{rec.icon}</span>
              <p className="text-sm text-slate-700 font-semibold leading-relaxed italic">"{rec.text}"</p>
            </div>

            <div className="space-y-4">

              {/* Tombol AI Recommendation */}
              {!hasRequestedRecommendation && (
                <CTAButton
                  meta={meta}
                  disabled={loadingRecommendation}
                  onClick={handleGetRecommendation}
                >
                  {loadingRecommendation ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Meminta AI...
                    </>
                  ) : (
                    <>
                      🤖 Lihat Rekomendasi AI
                    </>
                  )}
                </CTAButton>
              )}

              {/* Error */}
              {recommendationError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                  <p className="text-sm font-bold text-red-600">
                    {recommendationError}
                  </p>
                </div>
              )}

              {/* Recommendation List */}
              {recommendations.length > 0 && (
                <div className="space-y-3">

                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <h3 className="font-black text-slate-800 uppercase tracking-wide">
                      Rekomendasi Modul AI
                    </h3>
                  </div>

                  {recommendations.map((rec, idx) => {
                    const moduleData = rec.module;

                    if (!moduleData) return null;

                    const confidence =
                      Math.round((rec.confidence ?? 0) * 100);

                    return (
                      <div
                        key={moduleData.id}
                        className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                                style={{
                                  background: `${meta.color}15`,
                                  color: meta.color,
                                }}
                              >
                                #{idx + 1} Recommended
                              </span>

                              <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-green-100 text-green-700">
                                {confidence}% Match
                              </span>
                            </div>

                            <h4 className="text-lg font-black text-slate-800 leading-snug">
                              {moduleData.title}
                            </h4>

                            <div className="flex flex-wrap items-center gap-2 mt-3">

                              {moduleData.topic && (
                                <span className="text-xs font-black px-3 py-1 rounded-xl bg-slate-100 text-slate-600">
                                  📘 {moduleData.topic}
                                </span>
                              )}

                              <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#FFE1D7] text-[#FF6648]">
                                ⭐ {moduleData.xpReward} XP
                              </span>

                              <span className="text-xs font-black px-3 py-1 rounded-xl bg-[#84AFFB]/20 text-[#0259DD]">
                                Level {moduleData.orderIndex}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tombol dashboard */}
              <CTAButton meta={meta} onClick={() => navigate('/dashboard/quest-map')}>
                Masuk ke Dashboard <ChevronRight size={22} />
              </CTAButton>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PreTest (main) ───────────────────────────────────────────────────────────

const PreTest = () => {
  const { sessionId } = useParams();

  const [educationLevel, setEducationLevel] = useState(
    window.history.state?.usr?.educationLevel ?? 'primary'
  );
  const meta = JENJANG_META[educationLevel] || JENJANG_META.primary;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);
  const [pickedCorrect, setPickedCorrect] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const questionStartRef = useRef(Date.now());

  // ── useCallback agar bisa masuk dependency array useEffect (fix ESLint) ──
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const raw = await getPretestQuestions(sessionId);
      const payload = unwrap(raw); // { session, total, questions }

      if (payload.session?.educationLevel) {
        setEducationLevel(payload.session.educationLevel);
      }

      setQuestions(payload.questions ?? []);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat soal.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]); // sessionId stabil dari useParams, tidak akan trigger ulang

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);
  useEffect(() => { questionStartRef.current = Date.now(); }, [current]);

  // ── Pilih jawaban ──
  const handlePick = async (optObj) => {
    if (picked || submitting) return;

    const timeTaken = Math.round((Date.now() - questionStartRef.current) / 1000);
    const q = questions[current];

    // Optimistic: tandai picked dulu agar UI tidak freeze
    setPicked(optObj.id);
    setSubmitting(true);

    try {
      const raw = await submitPretestAnswer(sessionId, {
        questionId: q.id,
        optionId: optObj.id,
        timeTaken,
      });

      /*
       * Unwrap envelope. apiFetch bisa mengembalikan:
       *   { success, data: { isCorrect, correctOption: { optionText } } }
       * Gunakan unwrap() untuk handle keduanya.
       */
      const res = unwrap(raw);
      // Backend fields: { isCorrect, correctOption: { id, optionText, explanation } }
      const isCorrect = res.isCorrect === true;
      const correctText = res.correctOption?.optionText ?? null;

      setPickedCorrect(isCorrect);
      setAnswers(prev => [...prev, {
        questionId: q.id,
        correct: isCorrect,
        pickedOptionId: optObj.id,
        correctOptionText: correctText,
      }]);
    } catch (err) {
      console.error('submitPretestAnswer error:', err);
      setPickedCorrect(false);
      setAnswers(prev => [...prev, {
        questionId: q.id, correct: false, pickedOptionId: optObj.id, correctOptionText: null,
      }]);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Soal berikutnya / selesai ──
  const handleNext = async () => {
    const isLast = current === questions.length - 1;

    if (!isLast) {
      setCurrent(c => c + 1);
      setPicked(null);
      setPickedCorrect(false);
      return;
    }

    // Soal terakhir: finish session lalu ambil result
    try {
      setSubmitting(true);
      // finishPretestSession sudah mengembalikan semua data yang dibutuhkan
      // { id, educationLevel, totalScore, totalAnswers, totalCorrect, topicScores, ... }
      const raw = await finishPretestSession(sessionId);
      setResult(unwrap(raw));
    } catch (err) {
      console.error('finishPretestSession error:', err);
      // Fallback hitung di FE
      const correctCount = answers.filter(a => a.correct).length;
      setResult({ total: questions.length, correctCount, answers });
    } finally {
      setSubmitting(false);
      setShowResult(true);
    }
  };

  // ── Guards ──
  if (!sessionId || sessionId === 'undefined') {
    return <ErrorScreen message="Sesi tidak valid. Silakan mulai dari halaman pilih jenjang." onRetry={() => window.location.replace('/pilih-jenjang')} />;
  }
  if (loading) return <LoadingScreen meta={meta} />;
  if (error || !questions.length) return <ErrorScreen message={error ?? 'Tidak ada soal tersedia.'} onRetry={fetchQuestions} />;
  if (showResult) return <ResultScreen jenjang={educationLevel} result={result} questions={questions} localAnswers={answers} sessionId={sessionId} />;

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const progressPct = (current / questions.length) * 100;
  const lastAnswer = answers.at(-1);

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <Blobs />

      <div className="w-full max-w-2xl relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm" style={{ background: `${meta.color}15` }}>
              {meta.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pre-Test</p>
              <p className="font-black text-slate-800 text-sm leading-tight">{meta.label}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soal</p>
            <p className="font-black text-slate-800">
              <span style={{ color: meta.color }}>{current + 1}</span>
              <span className="text-slate-300"> / {questions.length}</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full mb-8 overflow-hidden shadow-inner">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: meta.color }} />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden mb-5">
          <div className="px-8 pt-7 pb-2 flex items-center gap-2">
            {q.emoji && <span className="text-lg">{q.emoji}</span>}
            {q.topic && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full" style={{ background: `${meta.color}15`, color: meta.color }}>
                {q.topic}
              </span>
            )}
          </div>
          <div className="px-8 pb-8 pt-3">
            <h3 className="text-xl font-black text-slate-800 leading-relaxed mb-7">{q.questionText}</h3>
            <div className="grid grid-cols-1 gap-3">
              {(q.options ?? []).map((opt, idx) => {
                const optObj = normaliseOpt(opt);
                let state = 'idle';
                if (picked) {
                  const isThisCorrect =
                    opt.isCorrect === true ||
                    (pickedCorrect && optObj.id === picked);
                  state = isThisCorrect ? 'correct' : optObj.id === picked ? 'wrong' : 'dim';
                }
                return (
                  <OptionButton
                    key={optObj.id ?? idx}
                    label={optionLabel(idx)}
                    text={optObj.text}
                    state={state}
                    onClick={() => handlePick(optObj)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Feedback + tombol lanjut */}
        {picked && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={`flex items-start gap-4 px-5 py-4 rounded-2xl border mb-4 ${pickedCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <span className="text-2xl flex-shrink-0">{pickedCorrect ? '🎉' : '💡'}</span>
              <div>
                <p className={`font-black text-sm mb-0.5 ${pickedCorrect ? 'text-green-700' : 'text-red-600'}`}>
                  {pickedCorrect ? 'Jawaban Benar!' : 'Kurang tepat...'}
                </p>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {pickedCorrect
                    ? `Kamu menguasai topik ${q.topic ?? 'ini'} dengan baik!`
                    : lastAnswer?.correctOptionText
                      ? `Jawaban yang benar adalah "${lastAnswer.correctOptionText}". Pelajari lagi yuk!`
                      : 'Pelajari lagi materi ini yuk!'
                  }
                </p>
              </div>
            </div>
            <CTAButton meta={meta} disabled={submitting} onClick={handleNext}>
              {submitting
                ? <><Loader2 size={20} className="animate-spin" /> Memproses…</>
                : isLast
                  ? <><Award size={20} /> Lihat Hasil Akhir</>
                  : <>Soal Berikutnya <ArrowRight size={20} /></>
              }
            </CTAButton>
          </div>
        )}

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 10,
                height: 10,
                background: i < answers.length
                  ? (answers[i].correct ? '#22c55e' : '#ef4444')
                  : i === current ? meta.color : '#e2e8f0',
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default PreTest;