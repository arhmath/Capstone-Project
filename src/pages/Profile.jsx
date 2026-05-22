import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  User, Mail, Shield, Edit3, Check, X,
  Star, Zap, Flame, Trophy, Target,
  Camera, BookOpen, Award, TrendingUp,
  ChevronRight, Lock
} from 'lucide-react';
import { getXpLogs } from '../services/xpLogService';

const JENJANG_OPTIONS = ['SD', 'SMP', 'SMA'];

const STAT_CARDS = (user) => [
  { label: 'Total XP', value: (user?.xp || 0).toLocaleString(), icon: <Star size={18} fill="currentColor" />, color: 'text-mq-orange', bg: 'bg-orange-50', border: 'border-orange-100' },
  { label: 'Level', value: user?.level || 1, icon: <Zap size={18} fill="currentColor" />, color: 'text-mq-primary', bg: 'bg-blue-50', border: 'border-blue-100' },
  { label: 'Streak', value: user?.streak || 0, icon: <Flame size={18} fill="currentColor" />, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
  { label: 'Pencapaian', value: `${user?.totalAchievements || 0} / 9`, icon: <Award size={18} />, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
];

// ─── XP PROGRESS UTIL ────────────────────────────────────────────────────────
const xpForLevel = (level) => level * 100;
const xpProgress = (xp, level) => {
  const start = (level - 1) * 100;
  const end = level * 100;
  return Math.min(((xp - start) / (end - start)) * 100, 100);
};

// ─── AVATAR SEEDS (untuk pilih avatar) ───────────────────────────────────────
const AVATAR_SEEDS = ['hero', 'mage', 'archer', 'knight', 'wizard', 'ranger', 'warrior', 'sage'];

const SOURCE_CONFIG = {
  module: {
    label: 'Menyelesaikan Modul',
    icon: '📘',
  },
  quiz: {
    label: 'Menyelesaikan Quiz',
    icon: '🧠',
  },
  pretest: {
    label: 'Menyelesaikan Pre-Test',
    icon: '📋',
  },
  achievement: {
    label: 'Mendapat Achievement',
    icon: '🏆',
  },
};

const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Baru saja';
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return 'Kemarin';

  return `${diffDays} hari lalu`;
};

// ─── KOMPONEN: EDIT FIELD ─────────────────────────────────────────────────────
const EditableField = ({ label, value, icon, onSave, type = 'text', options }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };
  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-mq-primary/30 transition-all">
      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-mq-primary shadow-sm border border-slate-100 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        {editing ? (
          options ? (
            <select
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="w-full bg-white border border-mq-primary rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mq-primary/30"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input
              type={type}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="w-full bg-white border border-mq-primary rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mq-primary/30"
              autoFocus
            />
          )
        ) : (
          <p className="font-bold text-slate-800 truncate">{value}</p>
        )}
      </div>
      {editing ? (
        <div className="flex gap-2 shrink-0">
          <button onClick={handleSave} className="w-8 h-8 bg-green-100 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-200 transition-all">
            <Check size={14} />
          </button>
          <button onClick={handleCancel} className="w-8 h-8 bg-red-100 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-200 transition-all">
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="w-8 h-8 bg-white text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 hover:border-mq-primary hover:text-mq-primary transition-all shrink-0 opacity-0 group-hover:opacity-100"
        >
          <Edit3 size={13} />
        </button>
      )}
    </div>
  );
};

// ─── KOMPONEN: AVATAR PICKER ──────────────────────────────────────────────────
const AvatarPicker = ({ currentSeed, onSelect, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm animate-in zoom-in duration-200">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <h3 className="font-black text-slate-800">Pilih Avatar</h3>
        <button onClick={onClose} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">
          <X size={16} className="text-slate-500" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3 p-5">
        {AVATAR_SEEDS.map(seed => (
          <button
            key={seed}
            onClick={() => { onSelect(seed); onClose(); }}
            className={`aspect-square rounded-2xl overflow-hidden border-3 transition-all hover:scale-105 ${currentSeed === seed ? 'border-mq-primary ring-2 ring-mq-primary/30' : 'border-slate-100'
              }`}
            style={{ border: currentSeed === seed ? '3px solid #0259DD' : '3px solid #f1f5f9' }}
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
              alt={seed}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="px-5 pb-5">
        <p className="text-xs text-slate-400 text-center font-medium">Pilih karakter petualangmu!</p>
      </div>
    </div>
  </div>
);

// ─── MAIN: PROFILE PAGE ───────────────────────────────────────────────────────
const Profile = () => {
  const { user, setUser } = useApp();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(user?.username || 'hero');

  const [activityLogs, setActivityLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  const level = user?.level || 1;
  const xp = user?.xp || 0;
  const progressPct = xpProgress(xp, level);
  const xpNeeded = xpForLevel(level) - xp;

  const handleSaveField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectAvatar = (seed) => {
    setAvatarSeed(seed);
    const newFoto = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    setUser(prev => ({ ...prev, foto: newFoto }));
  };

  useEffect(() => {
    const fetchXpLogs = async () => {
      try {
        setLoadingLogs(true);

        const res = await getXpLogs();

        const formattedLogs = (res?.logs || []).map((log) => {
          const config = SOURCE_CONFIG[log.sourceType] || {
            label: 'Mendapat XP',
            icon: '⭐',
          };

          return {
            id: log.id,
            action: config.label,
            icon: config.icon,
            xp: log.xpAmount,
            date: formatRelativeDate(log.createdAt),
          };
        });

        setActivityLogs(formattedLogs);
      } catch (error) {
        console.error('Gagal mengambil XP logs:', error);
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchXpLogs();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl">

      {/* ── HERO CARD ── */}
      <div className="relative bg-mq-primary rounded-[2.5rem] p-8 mb-8 overflow-hidden shadow-xl shadow-blue-200">
        {/* Dekorasi latar */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-24 -mt-24 pointer-events-none" />
        <div className="absolute bottom-0 right-32 w-40 h-40 bg-white/5 rounded-full -mb-12 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-mq-peach">
              <img
                src={user?.foto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="absolute -bottom-2 -right-2 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-mq-peach transition-all border-2 border-white"
            >
              <Camera size={15} className="text-mq-primary" />
            </button>
          </div>

          {/* Info Utama */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <h2 className="text-3xl font-black text-white">{user?.username || 'Petualang'}</h2>
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-black rounded-xl uppercase tracking-wider">
                {
                  (
                    {
                      primary: 'SD',
                      middle: 'SMP',
                      high: 'SMA',
                    }[user?.jenjang]
                  ) || 'SD'
                }
              </span>
            </div>
            <p className="text-white/70 font-medium mb-4">{user?.email || 'petualang@mathquest.id'}</p>

            {/* XP Bar */}
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-mq-orange rounded-xl flex items-center justify-center">
                    <Zap size={16} className="text-white" fill="white" />
                  </div>
                  <span className="font-black text-white text-lg">Level {level}</span>
                </div>
                <span className="text-white/60 text-sm font-bold">{xp.toLocaleString()} / {xpForLevel(level).toLocaleString()} XP</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-white/50 text-xs font-bold mt-2">
                Butuh <span className="text-white font-black">{xpNeeded.toLocaleString()} XP</span> lagi untuk Level {level + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* ── KOLOM KIRI ── */}
        <div className="md:col-span-3 space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            {STAT_CARDS(user).map((s, i) => (
              <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-4 flex items-center gap-3`}>
                <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center ${s.color} shadow-sm`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-black text-slate-800 text-lg leading-tight">{s.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Profil */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
              <User size={16} className="text-mq-primary" />
              <h3 className="font-black text-slate-800">Informasi Profil</h3>
            </div>
            <div className="p-4 space-y-3">
              <EditableField
                label="Username"
                value={user?.username || 'Petualang'}
                icon={<User size={15} />}
                onSave={(v) => handleSaveField('username', v)}
              />
              <EditableField
                label="Email"
                value={user?.email || 'petualang@mathquest.id'}
                icon={<Mail size={15} />}
                type="email"
                onSave={(v) => handleSaveField('email', v)}
              />
              <EditableField
                label="Jenjang"
                value={
                  (
                    {
                      primary: 'SD',
                      middle: 'SMP',
                      high: 'SMA',
                    }[user?.jenjang]
                  ) || 'SD'
                }
                icon={<BookOpen size={15} />}
                options={JENJANG_OPTIONS}
                onSave={(v) => handleSaveField('jenjang', v)}
              />
            </div>
          </div>

          {/* Keamanan */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
              <Shield size={16} className="text-mq-primary" />
              <h3 className="font-black text-slate-800">Keamanan Akun</h3>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-mq-primary/30 hover:bg-blue-50/30 transition-all group text-left">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-mq-primary shadow-sm border border-slate-100">
                  <Lock size={15} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">Ganti Password</p>
                  <p className="text-xs text-slate-400">Terakhir diubah: {user?.lastPasswordChange || 'Belum pernah'}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-mq-primary transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* ── KOLOM KANAN ── */}
        <div className="md:col-span-2 space-y-6">

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={18} className="text-white" fill="white" />
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Peringkat Global</p>
              </div>
              <p className="text-5xl font-black mb-1">#{user?.rank}</p>
              <p className="text-sm opacity-70 font-medium">Selesaikan lebih banyak quest untuk masuk leaderboard!</p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp size={14} />
                <span className="text-xs font-bold">XP kamu: {xp.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Progress Quest */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <Target size={16} className="text-mq-primary" />
              <h3 className="font-black text-slate-800">Progress Quest</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: 'Modul Selesai', value: 2, max: 9, color: 'bg-mq-primary' },
                { label: 'Achievement', value: 1, max: 9, color: 'bg-yellow-400' },
                { label: 'Bab Terbuka', value: 1, max: 3, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="text-slate-400">{item.value}/{item.max}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${Math.round((item.value / item.max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Riwayat Aktivitas */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <Flame size={16} className="text-mq-primary" />
              <h3 className="font-black text-slate-800">Aktivitas Terakhir</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {loadingLogs ? (
                <div className="px-5 py-6 text-center text-sm text-slate-400 font-medium">
                  Memuat aktivitas...
                </div>
              ) : activityLogs.length > 0 ? (
                activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-all"
                  >
                    <span className="text-xl shrink-0">{log.icon}</span>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">
                        {log.action}
                      </p>

                      <p className="text-[10px] text-slate-400 font-medium">
                        {log.date}
                      </p>
                    </div>

                    <span className="text-xs font-black text-mq-orange shrink-0">
                      +{log.xp} XP
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-5 py-6 text-center text-sm text-slate-400 font-medium">
                  Belum ada aktivitas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <AvatarPicker
          currentSeed={avatarSeed}
          onSelect={handleSelectAvatar}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}
    </div>
  );
};

export default Profile;