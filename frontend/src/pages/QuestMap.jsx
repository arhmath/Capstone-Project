import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

import { getModules }  from '../services/moduleService';
import { getQuizById } from '../services/quizService';

import {
  Lock, CheckCircle2, Play,
  Star, Trophy, Zap, Flame,
  Target, Clock, BookOpen, Brain,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  green:    '#58CC02',
  greenDk:  '#46A302',
  blue:     '#1CB0F6',
  blueDk:   '#0A91D0',
  red:      '#FF4B4B',
  redDk:    '#CC2222',
  gray:     '#E5E7EB',
  grayDk:   '#9CA3AF',
};

const ZIGZAG_OFFSETS = [80, 0];

// ─────────────────────────────────────────────────────────────────────────────
// UNIT BANNER
// ─────────────────────────────────────────────────────────────────────────────

const UnitBanner = ({ module }) => {
  const completed  = module.progress?.isCompleted;
  const totalPages = module._count?.pages || 0;
  const lastPage   = module.progress?.lastPage || 0;
  const progress   = totalPages ? Math.min((lastPage / totalPages) * 100, 100) : 0;

  const isRec  = module.isRecommended;
  const from   = isRec ? C.green  : C.blue;
  const to     = isRec ? C.greenDk : C.blueDk;

  return (
    <div
      className="rounded-3xl p-5 text-white relative overflow-hidden mb-5"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-10 pointer-events-none select-none">
        {isRec ? '⭐' : '📘'}
      </div>

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-1">
          MODULE
        </p>
        <h2 className="font-black text-xl leading-tight mb-1">{module.title}</h2>
        <p className="text-sm opacity-80 mb-4 leading-relaxed">{module.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 text-xs font-bold">
            <Star size={14} fill="currentColor" />
            {module.xpReward} XP
          </div>
          <div className="flex items-center gap-1 text-xs font-bold">
            <BookOpen size={14} />
            {totalPages} Halaman
          </div>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden bg-black/20">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'rgba(255,255,255,0.9)' }}
          />
        </div>

        {isRec && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Zap size={12} />
            <span className="text-[10px] font-black uppercase tracking-wide">Recommended By AI</span>
          </div>
        )}

        {completed && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={12} />
            <span className="text-[10px] font-black uppercase tracking-wide">Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NODE POPUP
// ─────────────────────────────────────────────────────────────────────────────

const NodePopup = ({ node, onClose, onStart }) => {
  const isLearning = node.type === 'learning';
  const color      = isLearning ? C.blue : C.red;
  const colorDk    = isLearning ? C.blueDk : C.redDk;

  return (
    <div
      className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[calc(100%+16px)] w-72"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}
    >
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
            style={{ background: color }}
          >
            {isLearning ? <BookOpen size={24} /> : <Brain size={24} />}
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">
              {isLearning ? 'Learning Module' : 'Quiz Challenge'}
            </p>
            <h3 className="font-black text-slate-800 leading-tight">{node.title}</h3>
          </div>
        </div>

        <div className="flex gap-4 text-xs font-bold text-slate-500 mb-5">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {node.duration}
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star size={12} fill="currentColor" />
            {node.xp} XP
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-slate-500 font-black text-sm"
          >
            Tutup
          </button>
          <button
            onClick={onStart}
            className="flex-1 py-3 rounded-2xl text-white font-black text-sm active:translate-y-0.5 transition-transform"
            style={{ background: color, boxShadow: `0 4px 0 ${colorDk}` }}
          >
            {isLearning ? 'Mulai Belajar' : 'Mulai Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PATH NODE
// ─────────────────────────────────────────────────────────────────────────────

const PathNode = ({ node, leftOffset, onPress }) => {
  const [showPopup, setShowPopup] = useState(false);

  const isCompleted = node.status === 'completed';
  const isCurrent   = node.status === 'current';
  const isLocked    = node.status === 'locked';

  const NODE_SIZE = 90;

  // Warna & ikon berdasarkan status + tipe
  let bg     = C.gray;
  let shadow = C.grayDk;
  let icon   = <Lock size={34} className="text-slate-400" />;

  if (!isLocked) {
    if (node.type === 'learning') { bg = C.blue; shadow = C.blueDk; icon = <BookOpen size={34} className="text-white" />; }
    if (node.type === 'quiz')     { bg = C.red;  shadow = C.redDk;  icon = <Brain    size={34} className="text-white" />; }
  }

  if (isCompleted) {
    icon = <CheckCircle2 size={36} className="text-white" fill="white" />;
  }

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ marginLeft: leftOffset }}
    >
      {/* Popup */}
      {showPopup && !isLocked && (
        <NodePopup
          node={node}
          onClose={() => setShowPopup(false)}
          onStart={() => { setShowPopup(false); onPress(node); }}
        />
      )}

      {/* Indikator current */}
      {isCurrent && (
        <div className="absolute -top-1 -right-1 z-10">
          <span className="relative flex h-6 w-6">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: '#FFD700' }}
            />
            <span
              className="relative inline-flex rounded-full h-6 w-6 border-2 border-white"
              style={{ background: '#FFD700' }}
            />
          </span>
        </div>
      )}

      <button
        onClick={() => !isLocked && setShowPopup((p) => !p)}
        className={`rounded-full flex items-center justify-center transition-all duration-150 ${
          !isLocked ? 'hover:brightness-105 active:translate-y-1' : 'cursor-not-allowed'
        }`}
        style={{
          width: NODE_SIZE, height: NODE_SIZE,
          background: bg,
          boxShadow: `0 7px 0 ${shadow}`,
          border: '6px solid white',
        }}
      >
        {icon}
      </button>

      <div className="mt-3 text-center max-w-[120px]">
        <p className={`text-xs font-black leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
          {node.title}
        </p>
        {isCurrent   && <p className="text-[10px] font-black text-green-600 mt-1">CURRENT</p>}
        {isCompleted && <p className="text-[10px] font-black text-slate-400 mt-1">COMPLETED</p>}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// ZIGZAG PATH
// ─────────────────────────────────────────────────────────────────────────────

const ZigzagPath = ({ nodes, onPress }) => (
  <div className="relative" style={{ width: 280 }}>
    {nodes.map((node, idx) => (
      <div key={node.id}>
        {idx > 0 && (
          <div
            className="w-2 h-12 rounded-full mx-auto"
            style={{ background: node.status === 'locked' ? C.gray : C.green }}
          />
        )}
        <PathNode
          node={node}
          leftOffset={ZIGZAG_OFFSETS[idx % ZIGZAG_OFFSETS.length]}
          onPress={onPress}
        />
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BUILD QUEST NODES
// ─────────────────────────────────────────────────────────────────────────────

const buildQuestNodes = (module) => {
  const totalPages       = module._count?.pages || 0;
  const finishedLearning = module.progress?.isCompleted === true;
  const quizCompleted    = module.quizzes?.some((quiz) =>
    quiz.sessions?.some((s) => s.status === 'completed')
  );

  return [
    {
      id:       `${module.id}-learning`,
      type:     'learning',
      title:    module.title,
      duration: `${totalPages} halaman`,
      xp:       module.xpReward,
      status:   finishedLearning ? 'completed' : 'current',
      module,
    },
    {
      id:       `${module.id}-quiz`,
      type:     'quiz',
      title:    `Quiz ${module.title}`,
      duration: 'Quiz',
      xp:       module.xpReward,
      status:   quizCompleted
        ? 'completed'
        : finishedLearning
          ? 'current'
          : 'locked',
      module,
    },
  ];
};

// ─────────────────────────────────────────────────────────────────────────────
// SIDE PANEL
// ─────────────────────────────────────────────────────────────────────────────

const SidePanel = ({ user }) => (
  <div className="w-72 shrink-0 hidden lg:block">
    {/* Leaderboard snippet */}
    <div className="bg-white rounded-3xl border-2 border-slate-100 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#FFF9E6]">
          <Trophy size={18} style={{ color: '#FFD700' }} />
        </div>
        <h3 className="font-black text-slate-700">Leaderboard</h3>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-black text-sm text-slate-400">#{user?.rank ?? '-'}</span>
        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
          <img
            src={user?.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-slate-700 truncate">{user?.username || 'User'}</p>
          <p className="text-xs text-slate-400">Adventurer</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-black text-orange-500">{(user?.xp ?? 0).toLocaleString()} XP</p>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────

const QuizDetailModal = ({ quiz, onClose, onStart }) => (
  <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden">
      {/* Header */}
      <div className="p-8 text-white" style={{ background: 'linear-gradient(135deg,#FF4B4B,#D92D2D)' }}>
        <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-5">
          <Brain size={40} />
        </div>
        <p className="uppercase text-xs tracking-[0.3em] font-black opacity-80 mb-2">Quiz Challenge</p>
        <h2 className="text-3xl font-black mb-3">{quiz.title}</h2>
        <p className="text-white/80">Selesaikan quiz untuk mendapatkan XP dan menyelesaikan module.</p>
      </div>

      {/* Stats grid */}
      <div className="p-8">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { label: 'QUESTIONS',     value: quiz._count?.questions, color: 'text-slate-700'  },
            { label: 'MAX XP',        value: quiz.maxXp,             color: 'text-yellow-500' },
            { label: 'PASSING SCORE', value: quiz.passingScore,      color: 'text-green-600'  },
            { label: 'TIME LIMIT',    value: `${quiz.timeLimitSeconds}s`, color: 'text-blue-500' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-black text-slate-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl border-2 border-slate-200 font-black text-slate-500"
          >
            Tutup
          </button>
          <button
            onClick={onStart}
            className="flex-1 py-4 rounded-2xl text-white font-black"
            style={{ background: '#FF4B4B', boxShadow: '0 4px 0 #CC2222' }}
          >
            Mulai Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — QUEST MAP
// ─────────────────────────────────────────────────────────────────────────────

const QuestMap = () => {
  const navigate  = useNavigate();
  const { user }  = useApp();   // data sudah lengkap karena login() menunggu /me

  const [modules,       setModules]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [selectedQuiz,  setSelectedQuiz]  = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // ── Fetch modules ────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    const fetchModules = async () => {
      try {
        const res = await getModules();
        if (!cancelled) setModules(res.modules || []);
      } catch (err) {
        console.error('Gagal mengambil modules:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchModules();
    return () => { cancelled = true; };
  }, []);

  // ── Current module (modul pertama yang belum selesai) ────────────────────

  const currentModule = useMemo(
    () => modules.find((m) => !m.progress?.isCompleted),
    [modules],
  );

  // ── Node press handler ───────────────────────────────────────────────────

  const handleNodePress = async (node) => {
    if (node.type === 'learning') {
      navigate(`/modules/${node.module.id}`);
      return;
    }

    if (node.type === 'quiz') {
      try {
        const quiz = await getQuizById(node.module.quizzes[0]?.id);
        setSelectedQuiz(quiz);
        setShowQuizModal(true);
      } catch (err) {
        console.error('Gagal mengambil quiz:', err);
      }
    }
  };

  const closeQuizModal = () => {
    setShowQuizModal(false);
    setSelectedQuiz(null);
  };

  // ── Loading ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: C.green, borderTopColor: 'transparent' }}
          />
          <p className="font-black text-slate-500">Loading Quest Map...</p>
        </div>
      </div>
    );
  }

  // ── Empty ────────────────────────────────────────────────────────────────

  if (!modules.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4">📭</div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">Belum Ada Module</h2>
          <p className="text-slate-400">Module akan muncul di sini.</p>
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="flex gap-8 animate-in fade-in duration-500">

      {/* CENTER */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <Flame size={18} fill="#FF4B4B" style={{ color: '#FF4B4B' }} />
            <span className="font-black text-slate-700">{user?.streak ?? 0} Hari Streak</span>
          </div>

          <div className="flex-1" />

          {currentModule && (
            <button
              onClick={() => navigate(`/modules/${currentModule.id}`)}
              className="px-5 py-3 rounded-2xl text-white font-black text-sm flex items-center gap-2 active:translate-y-0.5 transition-transform"
              style={{ background: C.green, boxShadow: `0 4px 0 ${C.greenDk}` }}
            >
              <Play size={14} fill="currentColor" />
              Continue Learning
            </button>
          )}
        </div>

        {/* Quest path */}
        <div className="mx-auto" style={{ width: 280 }}>
          {modules.map((module, idx) => (
            <div key={module.id} className={idx > 0 ? 'mt-10' : ''}>
              <UnitBanner module={module} />
              <ZigzagPath nodes={buildQuestNodes(module)} onPress={handleNodePress} />
            </div>
          ))}

          {/* Coming soon */}
          <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Lock size={32} className="text-slate-300" />
            </div>
            <h3 className="font-black text-slate-400 text-lg mb-1">More Modules Coming Soon</h3>
            <p className="text-sm text-slate-300">Stay tuned for new adventures.</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <SidePanel user={user} />

      {/* QUIZ MODAL */}
      {showQuizModal && selectedQuiz && (
        <QuizDetailModal
          quiz={selectedQuiz}
          onClose={closeQuizModal}
          onStart={() => navigate(`/quiz/${selectedQuiz.id}`)}
        />
      )}
    </div>
  );
};

export default QuestMap;