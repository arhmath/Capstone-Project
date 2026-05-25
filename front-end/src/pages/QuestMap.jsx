import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

import { getModules } from '../services/moduleService';
import { getQuizById } from '../services/quizService';

import {
  Lock,
  CheckCircle2,
  Play,
  Star,
  Trophy,
  Zap,
  Flame,
  Target,
  Clock,
  BookOpen,
  Brain,
  X,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// COLORS
// ─────────────────────────────────────────────────────────────
const COLORS = {
  green:      '#58CC02',
  greenDark:  '#46A302',
  blue:       '#1CB0F6',
  blueDark:   '#0A91D0',
  gray:       '#E5E7EB',
  grayDark:   '#9CA3AF',
  red:        '#FF4B4B',
  redDark:    '#CC2222',
  gold:       '#FFD700',
};

// Zigzag offsets (Duolingo snake path)
const ZIGZAG = [80, 0];

// ─────────────────────────────────────────────────────────────
// UNIT BANNER
// ─────────────────────────────────────────────────────────────
const UnitBanner = ({ module }) => {
  const completed  = module.progress?.isCompleted;
  const totalPages = module._count?.pages || 0;
  const lastPage   = module.progress?.lastPage || 0;
  const progress   = totalPages
    ? Math.min((lastPage / totalPages) * 100, 100)
    : 0;

  return (
    <div
      className="rounded-3xl p-5 text-white relative overflow-hidden mb-5"
      style={{
        background: `linear-gradient(135deg, ${
          module.isRecommended ? COLORS.green : COLORS.blue
        }, ${
          module.isRecommended ? COLORS.greenDark : COLORS.blueDark
        })`,
      }}
    >
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-10">
        {module.isRecommended ? '⭐' : '📘'}
      </div>

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-1">
          MODULE
        </p>

        <h2 className="font-black text-xl leading-tight mb-1">
          {module.title}
        </h2>

        <p className="text-sm opacity-80 mb-4 leading-relaxed">
          {module.description}
        </p>

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
            style={{
              width: `${progress}%`,
              background: 'rgba(255,255,255,0.9)',
            }}
          />
        </div>

        {module.isRecommended && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Zap size={12} />
            <span className="text-[10px] font-black uppercase tracking-wide">
              Recommended By AI
            </span>
          </div>
        )}

        {completed && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={12} />
            <span className="text-[10px] font-black uppercase tracking-wide">
              Completed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// NODE POPUP
// ─────────────────────────────────────────────────────────────
const NodePopup = ({ node, onClose, onStart }) => {
  return (
    <div
      className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[calc(100%+16px)] w-72"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}
    >
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-all"
        >
          <X size={13} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
            style={{
              background:
                node.type === 'learning' ? COLORS.blue : COLORS.red,
            }}
          >
            {node.type === 'learning' ? (
              <BookOpen size={24} />
            ) : (
              <Brain size={24} />
            )}
          </div>

          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">
              {node.type === 'learning' ? 'Learning Module' : 'Quiz Challenge'}
            </p>
            <h3 className="font-black text-slate-800 leading-tight">
              {node.title}
            </h3>
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
            style={{
              background:
                node.type === 'learning' ? COLORS.blue : COLORS.red,
              boxShadow:
                node.type === 'learning'
                  ? `0 4px 0 ${COLORS.blueDark}`
                  : `0 4px 0 ${COLORS.redDark}`,
            }}
          >
            {node.type === 'learning' ? 'Mulai Belajar' : 'Mulai Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PATH NODE
// ─────────────────────────────────────────────────────────────
const PathNode = ({ node, leftOffset, onPress }) => {
  const [showPopup, setShowPopup] = useState(false);

  const isCompleted = node.status === 'completed';
  const isCurrent   = node.status === 'current';
  const isLocked    = node.status === 'locked';

  const size = 90;

  let bg     = COLORS.gray;
  let shadow = COLORS.grayDark;
  let icon   = <Lock size={34} className="text-slate-400" />;

  if (node.type === 'learning') {
    bg     = COLORS.blue;
    shadow = COLORS.blueDark;
    icon   = <BookOpen size={34} className="text-white" />;
  }

  if (node.type === 'quiz') {
    bg     = COLORS.red;
    shadow = COLORS.redDark;
    icon   = <Brain size={34} className="text-white" />;
  }

  if (isLocked) {
    bg     = COLORS.gray;
    shadow = COLORS.grayDark;
    icon   = <Lock size={34} className="text-slate-400" />;
  }

  if (isCompleted) {
    icon = (
      <CheckCircle2 size={36} className="text-white" fill="white" />
    );
  }

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ marginLeft: leftOffset }}
    >
      {showPopup && !isLocked && (
        <NodePopup
          node={node}
          onClose={() => setShowPopup(false)}
          onStart={() => {
            setShowPopup(false);
            onPress(node);
          }}
        />
      )}

      {/* "MULAI" label — Duolingo style, only for current node */}
      {isCurrent && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
          <div
            className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md relative"
            style={{ background: COLORS.gold, color: '#6b4c00' }}
          >
            MULAI
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: `6px solid ${COLORS.gold}`,
              }}
            />
          </div>
        </div>
      )}

      {/* Pulsing ring for current node */}
      {isCurrent && (
        <div
          className="absolute rounded-full animate-ping opacity-30 pointer-events-none"
          style={{
            width: size + 16,
            height: size + 16,
            top: -8,
            left: -8,
            background: COLORS.gold,
          }}
        />
      )}

      <button
        onClick={() => !isLocked && setShowPopup((p) => !p)}
        className={`rounded-full flex items-center justify-center transition-all duration-150 ${
          !isLocked
            ? 'hover:brightness-105 active:translate-y-1'
            : 'cursor-not-allowed'
        }`}
        style={{
          width:     size,
          height:    size,
          background: bg,
          boxShadow: `0 7px 0 ${shadow}`,
          border:    '6px solid white',
        }}
      >
        {icon}
      </button>

      <div className="mt-3 text-center max-w-[120px]">
        <p
          className={`text-xs font-black leading-tight ${
            isLocked ? 'text-slate-400' : 'text-slate-700'
          }`}
        >
          {node.title}
        </p>

        {isCurrent && (
          <p className="text-[10px] font-black text-green-600 mt-1">
            CURRENT
          </p>
        )}

        {isCompleted && (
          <p className="text-[10px] font-black text-slate-400 mt-1">
            COMPLETED
          </p>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// ZIGZAG PATH
// ─────────────────────────────────────────────────────────────
const ZigzagPath = ({ nodes, onPress }) => {
  return (
    <div className="relative" style={{ width: 280 }}>
      {nodes.map((node, idx) => {
        const offset = ZIGZAG[idx % ZIGZAG.length];

        return (
          <div key={node.id}>
            {idx > 0 && (
              <div
                className="w-2 h-12 rounded-full mx-auto"
                style={{
                  background:
                    node.status === 'locked' ? COLORS.gray : COLORS.green,
                }}
              />
            )}

            <PathNode
              node={node}
              leftOffset={offset}
              onPress={onPress}
            />
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// BUILD QUEST NODES
// ─────────────────────────────────────────────────────────────
const buildQuestNodes = (module) => {
  const totalPages       = module._count?.pages || 0;
  const lastPage         = module.progress?.lastPage || 0;
  const finishedLearning = module.progress?.isCompleted === true;
  const quizCompleted    = module.quizzes?.some((quiz) =>
    quiz.sessions?.some((session) => session.status === 'completed')
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

// ─────────────────────────────────────────────────────────────
// QUIZ DETAIL MODAL
// ─────────────────────────────────────────────────────────────
const QuizDetailModal = ({ quiz, onClose, onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div
          className="p-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDark})`,
          }}
        >
          <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-5">
            <Brain size={40} />
          </div>
          <p className="uppercase text-xs tracking-[0.3em] font-black opacity-80 mb-2">
            Quiz Challenge
          </p>
          <h2 className="text-3xl font-black mb-3">{quiz.title}</h2>
          <p className="text-white/80">
            Selesaikan quiz untuk mendapatkan XP dan menyelesaikan module.
          </p>
        </div>

        {/* Stats */}
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-black text-slate-400 mb-1">QUESTIONS</p>
              <p className="text-2xl font-black text-slate-700">
                {quiz._count?.questions}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-black text-slate-400 mb-1">MAX XP</p>
              <p className="text-2xl font-black text-yellow-500">{quiz.maxXp}</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-black text-slate-400 mb-1">PASSING SCORE</p>
              <p className="text-2xl font-black text-green-600">
                {quiz.passingScore}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-xs font-black text-slate-400 mb-1">TIME LIMIT</p>
              <p className="text-2xl font-black text-blue-500">
                {quiz.timeLimitSeconds}s
              </p>
            </div>
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
              style={{
                background: COLORS.red,
                boxShadow: `0 4px 0 ${COLORS.redDark}`,
              }}
            >
              Mulai Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// RIGHT PANEL
// ─────────────────────────────────────────────────────────────
const SidePanel = ({ user }) => {
  return (
    <div className="w-72 shrink-0 hidden lg:block">
      {/* Daily Goals */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: '#FFF3E0' }}
          >
            <Target size={18} style={{ color: '#FF9600' }} />
          </div>
          <h3 className="font-black text-slate-700">Daily Goals</h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-black mb-2">
              <span>Collect 100 XP</span>
              <span>40/100</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{ width: '40%', background: COLORS.green }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-black mb-2">
              <span>Finish 1 Quiz</span>
              <span>0/1</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{ width: '0%', background: COLORS.green }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard snippet */}
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5">
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: '#FFF9E6' }}
          >
            <Trophy size={18} style={{ color: '#FFD700' }} />
          </div>
          <h3 className="font-black text-slate-700">Leaderboard</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-black text-sm text-slate-400">
              #{user?.rank}
            </span>
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
              <img
                src={
                  user?.foto ||
                  'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
                }
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-slate-700">
                {user?.username || 'User'}
              </p>
              <p className="text-xs text-slate-400">Adventurer</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-orange-500">
                {user?.xp || 0} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN QUEST MAP
// ─────────────────────────────────────────────────────────────
const QuestMap = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [modules,       setModules]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [selectedQuiz,  setSelectedQuiz]  = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // ── Fetch modules ───────────────────────────────────────────
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModules();
        setModules(res.modules || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  // ── Current module (first unfinished) ──────────────────────
  const currentModule = useMemo(
    () => modules.find((m) => !m.progress?.isCompleted),
    [modules]
  );

  // ── Node press handler ──────────────────────────────────────
  const handleNodePress = async (node) => {
    if (node.type === 'learning') {
      navigate(`/modules/${node.module.id}`);
      return;
    }

    if (node.type === 'quiz') {
      try {
        const quizId = await getQuizById(node.module.quizzes[0]?.id);
        setSelectedQuiz(quizId);
        setShowQuizModal(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // ── Loading ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
            style={{ borderColor: COLORS.green, borderTopColor: 'transparent' }}
          />
          <p className="font-black text-slate-500">Loading Quest Map...</p>
        </div>
      </div>
    );
  }

  // ── Empty ───────────────────────────────────────────────────
  if (!modules.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4">📭</div>
          <h2 className="text-2xl font-black text-slate-700 mb-2">
            Belum Ada Module
          </h2>
          <p className="text-slate-400">Module akan muncul di sini.</p>
        </div>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="flex gap-8 animate-in fade-in duration-500">

      {/* CENTER */}
      <div className="flex-1">
        {/* TOP BAR */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <Zap size={18} fill={COLORS.gold} style={{ color: COLORS.gold }} />
            <span className="font-black text-slate-700">{user?.xp || 0} XP</span>
          </div>

          <div className="flex items-center gap-2 bg-white border-2 border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm">
            <Flame size={18} fill={COLORS.red} style={{ color: COLORS.red }} />
            <span className="font-black text-slate-700">
              {user?.streak || 0} Hari Streak
            </span>
          </div>

          <div className="flex-1" />

          {currentModule && (
            <button
              onClick={() => navigate(`/modules/${currentModule.id}`)}
              className="px-5 py-3 rounded-2xl text-white font-black text-sm flex items-center gap-2 active:translate-y-0.5 transition-transform"
              style={{
                background: COLORS.green,
                boxShadow: `0 4px 0 ${COLORS.greenDark}`,
              }}
            >
              <Play size={14} fill="currentColor" />
              Continue Learning
            </button>
          )}
        </div>

        {/* QUEST PATH */}
        <div className="mx-auto" style={{ width: 280 }}>
          {modules.map((module, idx) => (
            <div key={module.id} className={idx > 0 ? 'mt-10' : ''}>
              <UnitBanner module={module} />
              <ZigzagPath
                nodes={buildQuestNodes(module)}
                onPress={handleNodePress}
              />
            </div>
          ))}

          {/* Coming soon */}
          <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Lock size={32} className="text-slate-300" />
            </div>
            <h3 className="font-black text-slate-400 text-lg mb-1">
              More Modules Coming Soon
            </h3>
            <p className="text-sm text-slate-300">
              Stay tuned for new adventures.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <SidePanel user={user} />

      {/* QUIZ MODAL */}
      {showQuizModal && selectedQuiz && (
        <QuizDetailModal
          quiz={selectedQuiz}
          onClose={() => {
            setShowQuizModal(false);
            setSelectedQuiz(null);
          }}
          onStart={() => {
            navigate(`/quiz/${selectedQuiz.id}`);
          }}
        />
      )}
    </div>
  );
};

export default QuestMap;