import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

import { getModules } from '../services/moduleService';
import { getQuizById } from '../services/quizService';
import NotificationToast from '../components/NotificationToast';
import useNotifications from '../hooks/useNotifications';

import {
  Lock, CheckCircle2, Play,
  Star, Trophy, Zap,
  Clock, BookOpen, Brain,
} from 'lucide-react';

const C = {
  green: '#58CC02', greenDk: '#46A302',
  blue: '#1CB0F6', blueDk: '#0A91D0',
  red: '#FF4B4B', redDk: '#CC2222',
  gray: '#E5E7EB', grayDk: '#9CA3AF',
};

const ZIGZAG_OFFSETS = [80, 0];

const UnitBanner = ({ module, isLockedGroup }) => {
  const completed = module.progress?.isCompleted;
  const totalPages = module._count?.pages || 0;
  const lastPage = module.progress?.lastPage || 0;
  const progress = totalPages ? Math.min((lastPage / totalPages) * 100, 100) : 0;
  const isRec = module.isRecommended;

  const quizCompleted = module.quizzes?.some(q => q.sessions?.some(s => s.status === 'completed'));
  const isFullyCompleted = completed && quizCompleted;

  return (
    <div
      className={`rounded-3xl p-5 text-white relative overflow-hidden mb-5 transition-opacity duration-300 ${isLockedGroup ? 'opacity-50' : ''}`}
      style={{ 
        background: isLockedGroup 
          ? `linear-gradient(135deg, ${C.gray}, ${C.grayDk})` 
          : `linear-gradient(135deg, ${isRec ? C.green : C.blue}, ${isRec ? C.greenDk : C.blueDk})` 
      }}
    >
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-10 pointer-events-none select-none">
        {isLockedGroup ? '🔒' : isRec ? '⭐' : '📘'}
      </div>
      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-1">MODUL</p>
        <h2 className="font-black text-xl leading-tight mb-1">{module.title}</h2>
        <p className="text-sm opacity-80 mb-4 leading-relaxed">{module.description}</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 text-xs font-bold"><Star size={14} fill="currentColor" />{module.xpReward} XP</div>
          <div className="flex items-center gap-1 text-xs font-bold"><BookOpen size={14} />{totalPages} Halaman</div>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden bg-black/20">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${isLockedGroup ? 0 : progress}%`, background: 'rgba(255,255,255,0.9)' }} />
        </div>
        {!isLockedGroup && isRec && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <Zap size={12} /><span className="text-[10px] font-black uppercase tracking-wide">Direkomendasikan AI</span>
          </div>
        )}
        
        {!isLockedGroup && isFullyCompleted && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={12} /><span className="text-[10px] font-black uppercase tracking-wide">Selesai</span>
          </div>
        )}
      </div>
    </div>
  );
};

const NodePopup = ({ node, onClose, onStart, loadingQuiz }) => {
  const isLearning = node.type === 'learning';
  const color = isLearning ? C.blue : C.red;
  const colorDk = isLearning ? C.blueDk : C.redDk;

  return (
    <div
      className="absolute z-50 left-1/2 -translate-x-1/2 bottom-[calc(100%+16px)] w-72"
      style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.22))' }}
    >
      <div className="bg-white rounded-3xl border-2 border-slate-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0"
            style={{ background: color }}
          >
            {isLearning ? <BookOpen size={24} /> : <Brain size={24} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">
              {isLearning ? 'Learning Module' : 'Quiz Challenge'}
            </p>
            <h3 className="font-black text-slate-800 leading-tight truncate">{node.title}</h3>
          </div>
        </div>

        <div className="flex gap-4 text-xs font-bold text-slate-500 mb-5">
          <div className="flex items-center gap-1">
            <Clock size={12} />{node.duration}
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star size={12} fill="currentColor" />{node.xp} XP
          </div>
          {!isLearning && loadingQuiz && (
            <div className="flex items-center gap-1 text-slate-400 ml-auto">
              <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: C.red, borderTopColor: 'transparent' }} />
              <span>Memuat...</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all"
          >
            Tutup
          </button>
          <button
            onClick={onStart}
            disabled={!isLearning && loadingQuiz}
            className="flex-1 py-3 rounded-2xl text-white font-black text-sm active:translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: color, boxShadow: `0 4px 0 ${colorDk}` }}
          >
            {isLearning ? 'Mulai Belajar' : 'Mulai Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PathNode = ({ node, leftOffset, onPress, quizState }) => {
  const [showPopup, setShowPopup] = useState(false);

  const isCompleted = node.status === 'completed';
  const isCurrent = node.status === 'current';
  const isLocked = node.status === 'locked';
  const isQuiz = node.type === 'quiz';

  const NODE_SIZE = 90;

  let bg = C.gray, shadow = C.grayDk;
  let icon = <Lock size={34} className="text-slate-400" />;

  if (!isLocked) {
    if (!isQuiz) { bg = C.blue; shadow = C.blueDk; icon = <BookOpen size={34} className="text-white" />; }
    else { bg = C.red; shadow = C.redDk; icon = <Brain size={34} className="text-white" />; }
  }
  if (isCompleted) icon = <CheckCircle2 size={36} className="text-white" fill="white" />;

  const handleClick = () => {
    if (isLocked) return;
    setShowPopup((p) => !p);
    if (isQuiz && !showPopup) onPress(node, 'prefetch');
  };

  const handleStart = () => {
    setShowPopup(false);
    onPress(node, 'start');
  };

  const loadingQuiz = isQuiz && quizState?.loadingId === node.id;

  return (
    <div className="relative flex flex-col items-center" style={{ marginLeft: leftOffset }}>
      {showPopup && !isLocked && (
        <NodePopup
          node={node}
          onClose={() => setShowPopup(false)}
          onStart={handleStart}
          loadingQuiz={loadingQuiz}
        />
      )}

      {isCurrent && (
        <div className="absolute -top-1 -right-1 z-10">
          <span className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#FFD700' }} />
            <span className="relative inline-flex rounded-full h-6 w-6 border-2 border-white" style={{ background: '#FFD700' }} />
          </span>
        </div>
      )}

      <button
        onClick={handleClick}
        className={`rounded-full flex items-center justify-center transition-all duration-150 ${!isLocked ? 'hover:brightness-105 active:translate-y-1' : 'cursor-not-allowed'
          }`}
        style={{ width: NODE_SIZE, height: NODE_SIZE, background: bg, boxShadow: `0 7px 0 ${shadow}`, border: '6px solid white' }}
      >
        {icon}
      </button>

      <div className="mt-3 text-center max-w-[120px]">
        <p className={`text-xs font-black leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>{node.title}</p>
        {isCurrent && <p className="text-[10px] font-black text-green-600 mt-1">CURRENT</p>}
        {isCompleted && <p className="text-[10px] font-black text-slate-400 mt-1">COMPLETED</p>}
      </div>
    </div>
  );
};

const ZigzagPath = ({ nodes, onPress, quizState }) => (
  <div className="relative" style={{ width: 280 }}>
    {nodes.map((node, idx) => (
      <div key={node.id}>
        {idx > 0 && (
          <div className="w-2 h-12 rounded-full mx-auto"
            style={{ background: node.status === 'locked' ? C.gray : C.green }}
          />
        )}
        <PathNode node={node} leftOffset={ZIGZAG_OFFSETS[idx % ZIGZAG_OFFSETS.length]}
          onPress={onPress} quizState={quizState} />
      </div>
    ))}
  </div>
);

const buildQuestNodes = (module, isModuleLocked) => {
  const totalPages = module._count?.pages || 0;
  const finishedLearning = module.progress?.isCompleted === true;
  const quizCompleted = module.quizzes?.some(q => q.sessions?.some(s => s.status === 'completed'));

  const learningStatus = isModuleLocked ? 'locked' : (finishedLearning ? 'completed' : 'current');
  const quizStatus = isModuleLocked ? 'locked' : (quizCompleted ? 'completed' : finishedLearning ? 'current' : 'locked');

  return [
    {
      id: `${module.id}-learning`,
      type: 'learning',
      title: module.title,
      duration: `${totalPages} halaman`,
      xp: module.xpReward,
      status: learningStatus,
      module,
    },
    {
      id: `${module.id}-quiz`,
      type: 'quiz',
      title: `Quiz ${module.title}`,
      duration: 'Quiz',
      xp: module.xpReward,
      status: quizStatus,
      module,
    },
  ];
};

const SidePanel = ({ user }) => (
  <div className="w-72 shrink-0 hidden lg:block">
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
          <img src={user?.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-slate-700 truncate">{user?.username || 'User'}</p>
          <p className="text-xs text-slate-400">Adventurer</p>
        </div>
        <p className="text-xs font-black text-orange-500 shrink-0">{(user?.xp ?? 0).toLocaleString()} XP</p>
      </div>
    </div>
  </div>
);

const QuestMap = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState({ loadingId: null, cache: {} });

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const res = await getModules();
        if (!cancelled) setModules(res.modules || []);
      } catch (e) { console.error(e); }
      finally { if (!cancelled) setLoading(false); }
    };
    fetch();
    return () => { cancelled = true; };
  }, []);

  // 1. Urutkan semua modul berdasarkan properti orderIndex (dari terkecil ke terbesar)
  const sortedModules = useMemo(() => {
    return [...modules].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }, [modules]);

  // 2. Tentukan status kunci (lock) berbasis per modul menggunakan data orderIndex
  const moduleLockStatus = useMemo(() => {
    const statusMap = {};
    if (!sortedModules.length) return statusMap;

    // Ambil semua daftar orderIndex unik yang sudah terurut
    const uniqueOrderIndexes = [...new Set(sortedModules.map(m => m.orderIndex))].sort((a, b) => a - b);

    sortedModules.forEach((module) => {
      const currentOrder = module.orderIndex;
      const orderRank = uniqueOrderIndexes.indexOf(currentOrder);

      // Skenario awal login: 3 modul dengan urutan orderIndex pertama (rank 0, 1, 2) langsung TERBUKA
      if (orderRank < 3) {
        statusMap[module.id] = false;
        return;
      }

      // Untuk modul ke-4 dst, ambil modul-modul yang orderIndex-nya LEBIH KECIL dari modul saat ini
      const prevModules = sortedModules.filter(m => m.orderIndex < currentOrder);

      // Periksa apakah materi DAN kuis dari semua modul sebelumnya tersebut sudah beres
      const isAllPrevCompleted = prevModules.every(m => {
        const finishedLearning = m.progress?.isCompleted === true;
        const quizCompleted = m.quizzes?.some(q => q.sessions?.some(s => s.status === 'completed'));
        return finishedLearning && quizCompleted;
      });

      // Jika modul-modul sebelumnya sudah rampung, hilangkan kunci (lock = false)
      statusMap[module.id] = !isAllPrevCompleted;
    });

    return statusMap;
  }, [sortedModules]);

  // 3. Tentukan modul aktif untuk tombol "Continue Learning"
  const currentModule = useMemo(() => {
    return sortedModules.find((m) => {
      const isLocked = moduleLockStatus[m.id];
      const finishedLearning = m.progress?.isCompleted === true;
      const quizCompleted = m.quizzes?.some(q => q.sessions?.some(s => s.status === 'completed'));
      
      return !isLocked && !(finishedLearning && quizCompleted);
    });
  }, [sortedModules, moduleLockStatus]);

  const handleNodePress = async (node, mode) => {
    if (node.type === 'learning') {
      if (mode === 'start') navigate(`/modules/${node.module.id}`);
      return;
    }

    if (quizState.cache[node.id]) {
      if (mode === 'start') navigate(`/quiz/${quizState.cache[node.id].id}`);
      return;
    }

    setQuizState(s => ({ ...s, loadingId: node.id }));
    try {
      const quiz = await getQuizById(node.module.quizzes[0]?.id);
      setQuizState(s => ({
        loadingId: null,
        cache: { ...s.cache, [node.id]: quiz },
      }));
      if (mode === 'start') navigate(`/quiz/${quiz.id}`);
    } catch (e) {
      console.error('Gagal mengambil quiz:', e);
      setQuizState(s => ({ ...s, loadingId: null }));
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4"
          style={{ borderColor: C.green, borderTopColor: 'transparent' }} />
        <p className="font-black text-slate-500">Loading Quest Map...</p>
      </div>
    </div>
  );

  if (!modules.length) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-7xl mb-4">📭</div>
        <h2 className="text-2xl font-black text-slate-700 mb-2">Belum Ada Module</h2>
        <p className="text-slate-400">Module akan muncul di sini.</p>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8 animate-in fade-in duration-500">
      <div className="flex-1 min-w-0">
        {/* Tombol Lanjut Belajar */}
        {currentModule && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate(`/modules/${currentModule.id}`)}
              className="px-4 py-2.5 lg:px-5 lg:py-3 rounded-2xl text-white font-black text-sm flex items-center gap-2 active:translate-y-0.5 transition-transform"
              style={{ background: C.green, boxShadow: `0 4px 0 ${C.greenDk}` }}
            >
              <Play size={14} fill="currentColor" />
              <span className="hidden sm:inline">Continue Learning</span>
              <span className="sm:hidden">Lanjut</span>
            </button>
          </div>
        )}

        {/* Peta Jalur Modul */}
        <div className="mx-auto" style={{ width: 280 }}>
          {sortedModules.map((module, idx) => {
            const isLocked = moduleLockStatus[module.id];

            return (
              <div key={module.id} className={idx > 0 ? 'mt-10' : ''}>
                <UnitBanner module={module} isLockedGroup={isLocked} />
                <ZigzagPath 
                  nodes={buildQuestNodes(module, isLocked)} 
                  onPress={handleNodePress} 
                  quizState={quizState} 
                />
              </div>
            );
          })}

          <div className="mt-10 rounded-3xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Lock size={32} className="text-slate-300" />
            </div>
            <h3 className="font-black text-slate-400 text-lg mb-1">More Modules Coming Soon</h3>
            <p className="text-sm text-slate-300">Stay tuned for new adventures.</p>
          </div>
        </div>
      </div>  

      <SidePanel user={user} />
    </div>
  );
};

export default QuestMap;