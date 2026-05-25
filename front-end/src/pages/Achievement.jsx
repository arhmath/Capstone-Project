import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Lock, CheckCircle2, Star, Flame, Zap, BookOpen, Trophy, Target, Award, Shield, Clock, Heart } from 'lucide-react';

const allAchievements = [
  {
    id: 1,
    title: "First Step",
    icon: "🚀",
    lucideIcon: <Target size={28} />,
    desc: "Selesaikan Pre-test pertamamu",
    category: "Pemula",
    xpReward: 50,
    unlocked: true,
    progress: 1,
    total: 1,
  },
  {
    id: 2,
    title: "Math Warrior",
    icon: "⚔️",
    lucideIcon: <Shield size={28} />,
    desc: "Selesaikan 10 tantangan soal",
    category: "Petarung",
    xpReward: 150,
    unlocked: false,
    progress: 3,
    total: 10,
  },
  {
    id: 3,
    title: "7 Days Streak",
    icon: "🔥",
    lucideIcon: <Flame size={28} />,
    desc: "Belajar 7 hari berturut-turut",
    category: "Konsisten",
    xpReward: 200,
    unlocked: false,
    progress: 2,
    total: 7,
  },
  {
    id: 4,
    title: "Speed Solver",
    icon: "⚡",
    lucideIcon: <Zap size={28} />,
    desc: "Jawab 5 soal dalam waktu 60 detik",
    category: "Cepat",
    xpReward: 100,
    unlocked: false,
    progress: 0,
    total: 5,
  },
  {
    id: 5,
    title: "Knowledge Seeker",
    icon: "📚",
    lucideIcon: <BookOpen size={28} />,
    desc: "Buka semua modul di satu jenjang",
    category: "Eksplorasi",
    xpReward: 300,
    unlocked: false,
    progress: 2,
    total: 4,
  },
  {
    id: 6,
    title: "Perfect Score",
    icon: "💯",
    lucideIcon: <Star size={28} />,
    desc: "Raih nilai sempurna di pre-test",
    category: "Master",
    xpReward: 250,
    unlocked: false,
    progress: 0,
    total: 1,
  },
  {
    id: 7,
    title: "Top 10 Global",
    icon: "🏆",
    lucideIcon: <Trophy size={28} />,
    desc: "Masuk 10 besar leaderboard global",
    category: "Legenda",
    xpReward: 500,
    unlocked: false,
    progress: 0,
    total: 1,
  },
  {
    id: 8,
    title: "Early Bird",
    icon: "🌅",
    lucideIcon: <Clock size={28} />,
    desc: "Login dan belajar sebelum jam 7 pagi",
    category: "Rajin",
    xpReward: 75,
    unlocked: false,
    progress: 0,
    total: 3,
  },
  {
    id: 9,
    title: "Helpful Friend",
    icon: "💛",
    lucideIcon: <Heart size={28} />,
    desc: "Bagikan Math Quest ke 3 temanmu",
    category: "Sosial",
    xpReward: 120,
    unlocked: false,
    progress: 0,
    total: 3,
  },
];

const categoryColors = {
  "Pemula":     { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  icon: "text-green-500" },
  "Petarung":   { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    icon: "text-red-500" },
  "Konsisten":  { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: "text-orange-500" },
  "Cepat":      { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", icon: "text-yellow-500" },
  "Eksplorasi": { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   icon: "text-blue-500" },
  "Master":     { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: "text-purple-500" },
  "Legenda":    { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  icon: "text-amber-500" },
  "Rajin":      { bg: "bg-cyan-50",   text: "text-cyan-700",   border: "border-cyan-200",   icon: "text-cyan-500" },
  "Sosial":     { bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-200",   icon: "text-pink-500" },
};

const Achievement = () => {
  const { user } = useApp();
  const [activeFilter, setActiveFilter] = useState('Semua');

  const unlockedCount = allAchievements.filter(a => a.unlocked).length;
  const totalXPFromAchievements = allAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  const categories = ['Semua', ...new Set(allAchievements.map(a => a.category))];
  const filtered = activeFilter === 'Semua' ? allAchievements : allAchievements.filter(a => a.category === activeFilter);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-mq-primary">{unlockedCount}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Terbuka</p>
          <p className="text-[10px] text-slate-300 mt-0.5">dari {allAchievements.length} total</p>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-mq-orange">{totalXPFromAchievements}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">XP Didapat</p>
          <p className="text-[10px] text-slate-300 mt-0.5">dari achievement</p>
        </div>
        <div className="bg-white rounded-3xl p-5 border border-slate-100 text-center shadow-sm">
          <p className="text-3xl font-black text-slate-800">
            {Math.round((unlockedCount / allAchievements.length) * 100)}%
          </p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Selesai</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
            <div
              className="h-full bg-mq-primary rounded-full transition-all duration-700"
              style={{ width: `${(unlockedCount / allAchievements.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === cat
                ? 'bg-mq-primary text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-500 border border-slate-100 hover:border-mq-primary hover:text-mq-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((ach) => {
          const color = categoryColors[ach.category] || categoryColors["Pemula"];
          const progressPct = Math.round((ach.progress / ach.total) * 100);

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
                ach.unlocked
                  ? `${color.bg} ${color.border} shadow-md`
                  : 'bg-white border-slate-100 opacity-70'
              }`}
            >
              {/* Status Icon */}
              <div className="absolute top-4 right-4">
                {ach.unlocked
                  ? <CheckCircle2 size={20} className={color.icon} fill="currentColor" />
                  : <Lock size={16} className="text-slate-300" />
                }
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                  ach.unlocked ? 'bg-white shadow-md' : 'bg-slate-100 grayscale'
                }`}>
                  {ach.icon}
                </div>
                <div>
                  <p className={`font-black text-base ${ach.unlocked ? color.text : 'text-slate-500'}`}>
                    {ach.title}
                  </p>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                    ach.unlocked ? `${color.bg} ${color.text}` : 'bg-slate-100 text-slate-400'
                  }`}>
                    {ach.category}
                  </span>
                </div>
              </div>

              {/* Desc */}
              <p className="text-sm text-slate-500 font-medium mb-4">{ach.desc}</p>

              {/* Progress Bar */}
              {!ach.unlocked && ach.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-600">{ach.progress}/{ach.total}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-mq-primary rounded-full transition-all duration-700"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* XP Reward */}
              <div className={`flex items-center gap-1.5 mt-2 ${ach.unlocked ? color.text : 'text-slate-400'}`}>
                <Star size={13} fill="currentColor" />
                <span className="text-xs font-black">+{ach.xpReward} XP</span>
                {ach.unlocked && <span className="text-xs font-medium opacity-70">· Sudah diklaim!</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;