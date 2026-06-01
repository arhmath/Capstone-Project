import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Lock, CheckCircle2, Star } from 'lucide-react';
import { getMyAchievements } from '../services/achievementService';

const CATEGORY_LABELS = {
  onboarding: 'Onboarding',
  module:     'Modul',
  quiz:       'Quiz',
  streak:     'Streak',
  xp:         'XP',
  level:      'Level',
};

const CATEGORY_COLORS = {
  onboarding: { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  icon: 'text-green-500' },
  module:     { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   icon: 'text-blue-500' },
  quiz:       { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: 'text-purple-500' },
  streak:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-500' },
  xp:         { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: 'text-yellow-500' },
  level:      { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200',  icon: 'text-amber-500' },
};

const CATEGORY_ICONS = {
  onboarding: '🚀',
  module:     '📚',
  quiz:       '💯',
  streak:     '🔥',
  xp:         '⚡',
  level:      '🏆',
};

const FILTER_ORDER = ['Semua', ...Object.keys(CATEGORY_LABELS)];

const Achievement = () => {
  const { user } = useApp();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Semua');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getMyAchievements();
        setAchievements(data);
      } catch (err) {
        console.error('Failed to fetch achievements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const unlockedCount = achievements.filter(a => a.earnedAt).length;
  const totalXPFromAchievements = achievements
    .filter(a => a.earnedAt)
    .reduce((sum, a) => sum + (a.achievement?.xpReward ?? 0), 0);

  const filtered =
    activeFilter === 'Semua'
      ? achievements
      : achievements.filter(a => a.achievement?.category === activeFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-mq-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-mq-primary">{unlockedCount}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Terbuka</p>
          <p className="text-[10px] text-slate-300 mt-0.5">dari {achievements.length} total</p>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-mq-orange">{totalXPFromAchievements}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">XP Didapat</p>
          <p className="text-[10px] text-slate-300 mt-0.5">dari achievement</p>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-slate-800">
            {achievements.length > 0
              ? Math.round((unlockedCount / achievements.length) * 100)
              : 0}%
          </p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Selesai</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
            <div
              className="h-full bg-mq-primary rounded-full transition-all duration-700"
              style={{
                width: `${achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTER_ORDER.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === cat
                ? 'bg-mq-primary text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-500 border border-slate-100 hover:border-mq-primary hover:text-mq-primary'
            }`}
          >
            {cat === 'Semua' ? 'Semua' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const ach = item.achievement ?? item; // support flat or nested shape
          const category = ach.category;
          const color = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['onboarding'];
          const icon = ach.iconUrl ? null : (CATEGORY_ICONS[category] ?? '🎖️');
          const unlocked = !!item.earnedAt;

          return (
            <div
              key={ach.code}
              className={`p-5 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
                unlocked
                  ? `${color.bg} ${color.border} shadow-md`
                  : 'bg-white border-slate-100 opacity-70'
              }`}
            >
              {/* Status Icon */}
              <div className="absolute top-4 right-4">
                {unlocked
                  ? <CheckCircle2 size={20} className={color.icon} fill="currentColor" />
                  : <Lock size={16} className="text-slate-300" />
                }
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
                  unlocked ? 'bg-white shadow-md' : 'bg-slate-100 grayscale'
                }`}>
                  {ach.iconUrl
                    ? <img src={ach.iconUrl} alt={ach.title} className="w-8 h-8 object-contain" />
                    : <span className="text-3xl">{icon}</span>
                  }
                </div>
                <div>
                  <p className={`font-black text-base ${unlocked ? color.text : 'text-slate-500'}`}>
                    {ach.title}
                  </p>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                    unlocked ? `${color.bg} ${color.text}` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {CATEGORY_LABELS[category] ?? category}
                  </span>
                </div>
              </div>

              {/* Desc */}
              <p className="text-sm text-slate-500 font-medium mb-4">{ach.description}</p>

              {/* Earned Date */}
              {unlocked && item.earnedAt && (
                <p className="text-[11px] text-slate-400 mb-2">
                  Diraih: {new Date(item.earnedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              )}

              {/* XP Reward */}
              <div className={`flex items-center gap-1.5 mt-2 ${unlocked ? color.text : 'text-slate-400'}`}>
                <Star size={13} fill="currentColor" />
                <span className="text-xs font-black">+{ach.xpReward} XP</span>
                {unlocked && <span className="text-xs font-medium opacity-70">· Sudah didapat!</span>}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-400">
            <p className="text-4xl mb-3">🎖️</p>
            <p className="font-bold">Belum ada achievement di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievement;