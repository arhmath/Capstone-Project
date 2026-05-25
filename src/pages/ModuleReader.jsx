import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
  } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import {
    getModuleById,
    getModulePage,
    updateModuleProgress,
  } from '../services/moduleService';
  import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
    CheckCircle2,
    Loader2,
    Sparkles,
    Star,
    Volume2,
    VolumeX,
  } from 'lucide-react';
  
  // ─── Typewriter Hook ───────────────────────────────────────────────────────────
  const useTypewriter = (text, speed = 18, onDone) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);
    const timerRef = useRef(null);
  
    useEffect(() => {
      setDisplayed('');
      setDone(false);
      indexRef.current = 0;
  
      if (!text) return;
  
      const tick = () => {
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          setDone(true);
          onDone && onDone();
        } else {
          timerRef.current = setTimeout(tick, speed);
        }
      };
  
      timerRef.current = setTimeout(tick, speed);
      return () => clearTimeout(timerRef.current);
    }, [text, speed]);
  
    const skip = useCallback(() => {
      clearTimeout(timerRef.current);
      setDisplayed(text);
      setDone(true);
      onDone && onDone();
    }, [text, onDone]);
  
    return { displayed, done, skip };
  };
  
  // ─── Page Type Config ──────────────────────────────────────────────────────────
  const PAGE_CONFIG = {
    story: {
      gradient: 'from-[#1CB0F6] to-[#0A91D0]',
      bg: 'bg-blue-50',
      accent: '#1CB0F6',
      icon: <BookOpen size={22} />,
      label: 'Kisah',
      particle: '📖',
    },
    summary: {
      gradient: 'from-[#58CC02] to-[#46A302]',
      bg: 'bg-green-50',
      accent: '#58CC02',
      icon: <Sparkles size={22} />,
      label: 'Ringkasan',
      particle: '✨',
    },
    explanation: {
      gradient: 'from-[#FF9600] to-[#E08600]',
      bg: 'bg-orange-50',
      accent: '#FF9600',
      icon: <Star size={22} />,
      label: 'Penjelasan',
      particle: '💡',
    },
  };
  
  // ─── Floating Particles ────────────────────────────────────────────────────────
  const FloatingParticles = ({ emoji, count = 6 }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-0 animate-float-particle"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
  
  // ─── Progress Steps ────────────────────────────────────────────────────────────
  const ProgressSteps = ({ current, total }) => (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: i === current - 1 ? 28 : i < current - 1 ? 20 : 8,
            background: i < current - 1 ? '#58CC02' : i === current - 1 ? '#1CB0F6' : '#E5E7EB',
          }}
        />
      ))}
    </div>
  );
  
  // ─── Main Component ────────────────────────────────────────────────────────────
  const ModuleReader = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams();
  
    const [module, setModule] = useState(null);
    const [page, setPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [typingDone, setTypingDone] = useState(false);
    const [pageKey, setPageKey] = useState(0);
    const [showSkipHint, setShowSkipHint] = useState(true);
    const contentRef = useRef(null);
  
    const config = PAGE_CONFIG[page?.pageType] || PAGE_CONFIG.story;
  
    useEffect(() => {
      const fetchModule = async () => {
        try {
          const res = await getModuleById(moduleId);
          setModule(res);
          const lastPage = res.progress?.lastPage || 1;
          setCurrentPage(lastPage);
        } catch (err) {
          console.error(err);
        }
      };
      fetchModule();
    }, [moduleId]);
  
    const fetchPage = useCallback(async (pageNumber) => {
      try {
        setLoading(true);
        setTypingDone(false);
        setShowSkipHint(true);
        const res = await getModulePage(moduleId, pageNumber);
        setPage(res);
        setPageKey(k => k + 1);
        await updateModuleProgress(moduleId, pageNumber);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, [moduleId]);
  
    useEffect(() => {
      if (currentPage) fetchPage(currentPage);
    }, [currentPage, fetchPage]);
  
    useEffect(() => {
      const t = setTimeout(() => setShowSkipHint(false), 4000);
      return () => clearTimeout(t);
    }, [pageKey]);
  
    const handleTypingDone = useCallback(() => {
      setTypingDone(true);
    }, []);
  
    const { displayed, done, skip } = useTypewriter(
      page?.storyContent || '',
      16,
      handleTypingDone
    );
  
    const handleNext = async () => {
      if (!done) { skip(); return; }
      if (!page) return;
      setSaving(true);
      try {
        if (page.isLastPage) {
          await updateModuleProgress(moduleId, currentPage);
          navigate('/dashboard/quest-map');
          return;
        }
        const nextPage = currentPage + 1;
        await updateModuleProgress(moduleId, nextPage);
        setCurrentPage(nextPage);
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    };
  
    const handlePrev = () => {
      if (currentPage <= 1) return;
      setCurrentPage(p => p - 1);
    };
  
    const progress = page ? (currentPage / page.totalPages) * 100 : 0;
  
    // ── Loading ──
    if (loading || !page || !module) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping" />
              <div className="absolute inset-2 rounded-full border-4 border-t-[#1CB0F6] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">📚</div>
            </div>
            <p className="font-black text-slate-500 text-sm uppercase tracking-[0.2em]">Membuka Modul...</p>
          </div>
        </div>
      );
    }
  
    return (
      <>
        <style>{`
          @keyframes float-particle {
            0% { opacity: 0; transform: translateY(0) scale(0.5); }
            20% { opacity: 0.4; }
            80% { opacity: 0.2; }
            100% { opacity: 0; transform: translateY(-80px) scale(1.2); }
          }
          .animate-float-particle { animation: float-particle var(--duration, 3s) ease-in-out infinite; }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-slide-up { animation: slide-up 0.5s ease forwards; }
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.4s ease forwards; }
          @keyframes typewriter-cursor {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor-blink { animation: typewriter-cursor 0.8s infinite; }
          @keyframes progress-glow {
            0%, 100% { box-shadow: 0 0 8px rgba(28,176,246,0.4); }
            50% { box-shadow: 0 0 20px rgba(28,176,246,0.8); }
          }
          .progress-glow { animation: progress-glow 2s infinite; }
          @keyframes bounce-in {
            0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
            60% { transform: scale(1.1) rotate(3deg); }
            100% { opacity: 1; transform: scale(1) rotate(0); }
          }
          .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          .line-by-line span { display: inline; }
          
          /* scrollbar */
          .story-scroll::-webkit-scrollbar { width: 4px; }
          .story-scroll::-webkit-scrollbar-track { background: transparent; }
          .story-scroll::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 9999px; }
        `}</style>
  
        <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
          {/* ── TOPBAR ── */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all active:scale-95 shrink-0"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
  
                <div className="flex-1 min-w-0">
                  <h1 className="font-black text-slate-800 text-sm sm:text-base leading-tight truncate">
                    {module.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    <ProgressSteps current={currentPage} total={page.totalPages} />
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">
                      {currentPage}/{page.totalPages}
                    </span>
                  </div>
                </div>
  
                <div
                  className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-black shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.accent}cc)` }}
                >
                  {Math.round(progress)}%
                </div>
              </div>
  
              {/* Progress Bar */}
              <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 progress-glow"
                  style={{ width: `${progress}%`, background: config.accent }}
                />
              </div>
            </div>
          </div>
  
          {/* ── MAIN CONTENT ── */}
          <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
  
            <div className="animate-slide-up" key={pageKey}>
              {/* Card */}
              <div className="bg-white rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100">
  
                {/* Header */}
                <div className={`relative bg-gradient-to-br ${config.gradient} p-6 sm:p-8 text-white overflow-hidden`}>
                  <FloatingParticles emoji={config.particle} count={5} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                      {config.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-70 block mb-1">
                        {config.label} · Halaman {currentPage}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black leading-tight">
                        {page.sceneTitle}
                      </h2>
                    </div>
                  </div>
  
                  {/* Decorative wave */}
                  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 30" preserveAspectRatio="none" style={{ height: 30 }}>
                    <path d="M0,30 C360,0 1080,0 1440,30 L1440,30 L0,30 Z" fill="white" fillOpacity="0.08" />
                    <path d="M0,30 C480,10 960,10 1440,30 L1440,30 L0,30 Z" fill="white" fillOpacity="0.05" />
                  </svg>
                </div>
  
                {/* Illustration */}
                {page.illustrationUrl && (
                  <div className="relative overflow-hidden" style={{ maxHeight: 360 }}>
                    <img
                      src={page.illustrationUrl}
                      alt={page.sceneTitle}
                      className="w-full object-cover"
                      style={{ maxHeight: 360 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                  </div>
                )}
  
                {/* Story Content */}
                <div className={`p-6 sm:p-10 ${config.bg} relative`} ref={contentRef}>
                  {/* Skip hint */}
                  {!done && showSkipHint && (
                    <div className="absolute top-4 right-4 animate-fade-in">
                      <button
                        onClick={skip}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl shadow-md border border-slate-100 text-xs font-black text-slate-500 hover:text-slate-700 transition-all"
                      >
                        Tap untuk skip ⏩
                      </button>
                    </div>
                  )}
  
                  {/* Decorative quote mark */}
                  <div className="text-[80px] leading-none font-black opacity-5 text-slate-800 absolute top-2 left-6 select-none pointer-events-none">"</div>
  
                  <div
                    className="relative z-10 story-scroll overflow-y-auto"
                    style={{ maxHeight: '50vh' }}
                    onClick={!done ? skip : undefined}
                  >
                    <p
                      className="text-slate-700 leading-8 sm:leading-9 text-base sm:text-lg font-medium whitespace-pre-line cursor-pointer select-none"
                      style={{ minHeight: 120 }}
                    >
                      {displayed}
                      {!done && (
                        <span className="cursor-blink inline-block w-[2px] h-5 bg-current ml-0.5 align-middle" />
                      )}
                    </p>
                  </div>
  
                  {/* Done indicator */}
                  {done && (
                    <div className="mt-4 flex items-center gap-2 animate-fade-in">
                      <div className="h-[1px] flex-1 bg-slate-200" />
                      <span className="text-[11px] font-black text-slate-300 uppercase tracking-wider">Selesai dibaca</span>
                      <div className="h-[1px] flex-1 bg-slate-200" />
                    </div>
                  )}
                </div>
              </div>
  
              {/* ── NAVIGATION BUTTONS ── */}
              <div className="flex items-center justify-between mt-6 gap-3">
                <button
                  onClick={handlePrev}
                  disabled={page.isFirstPage}
                  className="flex items-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl border-2 border-slate-200 font-black text-slate-500 hover:border-slate-300 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>
  
                <button
                  onClick={handleNext}
                  disabled={saving}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-white font-black transition-all active:translate-y-1 disabled:opacity-70 ${!done ? 'animate-pulse' : ''}`}
                  style={{
                    background: done
                      ? page.isLastPage ? '#58CC02' : config.accent
                      : '#94A3B8',
                    boxShadow: done
                      ? page.isLastPage ? '0 5px 0 #46A302' : `0 5px 0 ${config.accent}99`
                      : '0 5px 0 #6B7280',
                  }}
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : !done ? (
                    <>Tap untuk skip ⏩</>
                  ) : page.isLastPage ? (
                    <><CheckCircle2 size={18} /> Selesai! 🎉</>
                  ) : (
                    <>Halaman Selanjutnya <ChevronRight size={18} /></>
                  )}
                </button>
              </div>
  
              {/* Page dots */}
              <div className="flex justify-center gap-2 mt-5">
                {Array.from({ length: page.totalPages }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-400"
                    style={{
                      width: i === currentPage - 1 ? 28 : 8,
                      height: 8,
                      background: i < currentPage - 1
                        ? '#58CC02'
                        : i === currentPage - 1
                          ? config.accent
                          : '#E5E7EB',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ModuleReader;