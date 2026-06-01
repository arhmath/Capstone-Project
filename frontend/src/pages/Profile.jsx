import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  User, Mail, Edit3, Check, X,
  Star, Zap, Flame, Trophy, Target,
  BookOpen, Award, TrendingUp,
  LogOut, Save, CheckCircle2, AlertCircle
} from 'lucide-react';
import { getXpLogs } from '../services/xpLogService';
import { getUserProgress } from '../services/progressService';
import { updateProfileApi } from '../services/authService';

// ─── MULTIAVATAR SEEDS ─────────────────────────────────────────────────────────
// Multiavatar: https://api.multiavatar.com/{seed}.svg
// Tiap seed menghasilkan avatar unik yang berbeda etnik/karakter
const AVATAR_SEEDS = [
  'MathHero', 'AlgebraKing', 'NumberNinja', 'PiMaster',
  'CalcWizard', 'GeomQueen', 'VectorAce', 'FractalBoss',
  'PrimeHunter', 'LogicLord', 'SetTheory', 'MatrixPro',
  'TrigStar', 'StatsGuru', 'InfinityX', 'EulerFan',
];

const getMultiavatar = (seed) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const JENJANG_LABEL = { primary: 'SD', middle: 'SMP', high: 'SMA' };

const SOURCE_CONFIG = {
  module:      { label: 'Menyelesaikan Modul',   icon: '📘' },
  quiz:        { label: 'Menyelesaikan Quiz',     icon: '🧠' },
  pretest:     { label: 'Menyelesaikan Pre-Test', icon: '📋' },
  achievement: { label: 'Mendapat Achievement',   icon: '🏆' },
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

const xpForLevel = (level) => level * 100;
const xpProgress = (xp, level) => {
  const start = (level - 1) * 100;
  const end = level * 100;
  return Math.min(((xp - start) / (end - start)) * 100, 100);
};

// ─── TOAST NOTIFIKASI ─────────────────────────────────────────────────────────
const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === 'success';
  return (
    <div
      className="fixed top-6 left-1/2 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl animate-toast-in"
      style={{
        transform: 'translateX(-50%)',
        background: isSuccess ? '#F0FFF4' : '#FFF1F1',
        border: `2px solid ${isSuccess ? '#BBF7D0' : '#FECACA'}`,
        minWidth: 280,
      }}
    >
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translate(-50%, -16px) scale(0.92); }
          to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        .animate-toast-in { animation: toast-in 0.35s cubic-bezier(0.34,1.4,0.64,1) forwards; }
      `}</style>
      {isSuccess
        ? <CheckCircle2 size={18} className="text-green-500 shrink-0" fill="currentColor" />
        : <AlertCircle size={18} className="text-red-400 shrink-0" />
      }
      <p className={`font-bold text-sm flex-1 ${isSuccess ? 'text-green-700' : 'text-red-600'}`}>
        {message}
      </p>
      <button onClick={onClose} className="text-slate-300 hover:text-slate-500">
        <X size={14} />
      </button>
    </div>
  );
};

// ─── AVATAR PICKER ────────────────────────────────────────────────────────────
const AvatarPicker = ({ currentUrl, onSelect, onClose }) => {
  const [hovered, setHovered] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md animate-in zoom-in duration-200"
        style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="font-black text-slate-800 text-lg">Pilih Avatar</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Powered by Dicebear · 16 karakter unik
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-5 grid grid-cols-4 gap-3">
          {AVATAR_SEEDS.map((seed) => {
            const url = getMultiavatar(seed);
            const isSelected = currentUrl === url;
            const isHov = hovered === seed;

            return (
              <button
                key={seed}
                onClick={() => onSelect(url)}
                onMouseEnter={() => setHovered(seed)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden transition-all duration-200 relative"
                  style={{
                    border: isSelected ? '3px solid #0259DD' : '3px solid #F1F5F9',
                    transform: isSelected || isHov ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: isSelected ? '0 0 0 3px #0259DD30' : 'none',
                    background: '#F8FAFC',
                  }}
                >
                  {!imgErrors[seed] ? (
                    <img
                      src={url}
                      alt={seed}
                      className="w-full h-full object-contain p-1"
                      onError={() => setImgErrors(prev => ({ ...prev, [seed]: true }))}
                    />
                  ) : (
                    // Fallback jika gambar gagal load (offline / rate limit)
                    <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                      {seed.charAt(0)}
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-mq-primary rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-bold text-slate-400 text-center leading-tight truncate w-full px-0.5">
                  {seed}
                </span>
              </button>
            );
          })}
        </div>

        <div className="px-5 pb-5 shrink-0">
          <p className="text-[10px] text-slate-400 text-center font-medium">
            Klik avatar untuk memilih · Simpan profil untuk menyimpan perubahan
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── SKELETON ─────────────────────────────────────────────────────────────────
const SkeletonBar = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-100 rounded-full ${className}`} />
);

// ─── MAIN: PROFILE PAGE ───────────────────────────────────────────────────────
const Profile = ({ onLogout }) => {
  const { user, setUser, refreshUser } = useApp();

  // ── Form state ──
  const [draftName, setDraftName]   = useState(user?.username || '');
  const [draftAvatar, setDraftAvatar] = useState(user?.foto || '');
  const [editingName, setEditingName] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ── Save state ──
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  // ── Data state ──
  const [activityLogs, setActivityLogs] = useState([]);
  const [loadingLogs, setLoadingLogs]   = useState(true);
  const [progress, setProgress] = useState({
    modulesCompleted: 0, totalModules: 9,
    achievementsUnlocked: 0, totalAchievements: 9,
  });
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Sinkronkan draft saat user context berubah (misal setelah refreshUser)
  useEffect(() => {
    setDraftName(user?.username || '');
    setDraftAvatar(user?.foto || '');
  }, [user?.username, user?.foto]);

  // Deteksi apakah ada perubahan belum disimpan
  const hasChanges =
    draftName !== (user?.username || '') ||
    draftAvatar !== (user?.foto || '');

  // ── Fetch XP Logs ──
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingLogs(true);
        const res = await getXpLogs();
        const formatted = (res?.logs || []).map((log) => {
          const config = SOURCE_CONFIG[log.sourceType] || { label: 'Mendapat XP', icon: '⭐' };
          return {
            id: log.id,
            action: config.label,
            icon: config.icon,
            xp: log.xpAmount,
            date: formatRelativeDate(log.createdAt),
          };
        });
        setActivityLogs(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLogs(false);
      }
    };
    fetch();
  }, []);

  // ── Fetch Progress ──
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoadingProgress(true);
        const res = await getUserProgress();
        setProgress({
          modulesCompleted: res?.modulesCompleted ?? 0,
          totalModules: res?.totalModules ?? 9,
          achievementsUnlocked: res?.achievementsUnlocked ?? 0,
          totalAchievements: res?.totalAchievements ?? 9,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProgress(false);
      }
    };
    fetch();
  }, []);

  // ── Save profil ke backend ──
  const handleSave = async () => {
    if (!hasChanges || saving) return;

    setSaving(true);
    try {
      const payload = {};
      if (draftName !== user?.username) payload.name = draftName;
      if (draftAvatar !== user?.foto)   payload.avatarUrl = draftAvatar;

      await updateProfileApi(payload);

      // Update context secara optimistis
      setUser((prev) => ({
        ...prev,
        username: draftName || prev.username,
        foto: draftAvatar || prev.foto,
      }));

      // Sync ulang dari backend untuk memastikan konsistensi
      await refreshUser();

      setEditingName(false);
      setToast({ type: 'success', message: 'Profil berhasil disimpan! 🎉' });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: err.message || 'Gagal menyimpan profil' });
    } finally {
      setSaving(false);
    }
  };

  // ── Batal edit ──
  const handleCancel = () => {
    setDraftName(user?.username || '');
    setDraftAvatar(user?.foto || '');
    setEditingName(false);
  };

  const level = user?.level || 1;
  const xp = user?.xp || 0;
  const progressPct = xpProgress(xp, level);
  const xpNeeded = xpForLevel(level) - xp;

  const STAT_CARDS = [
    { label: 'Total XP', value: xp.toLocaleString(), icon: <Star size={18} fill="currentColor" />, color: 'text-mq-orange', bg: 'bg-orange-50', border: 'border-orange-100' },
    { label: 'Level', value: level, icon: <Zap size={18} fill="currentColor" />, color: 'text-mq-primary', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'Streak', value: user?.streak || 0, icon: <Flame size={18} fill="currentColor" />, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
    { label: 'Pencapaian', value: `${progress.achievementsUnlocked} / ${progress.totalAchievements}`, icon: <Award size={18} />, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
  ];

  return (
    <div className="animate-in fade-in duration-500 w-full">

      {/* ── TOAST ── */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── HERO CARD ── */}
      <div className="relative bg-mq-primary rounded-[2.5rem] p-6 sm:p-8 mb-8 overflow-hidden shadow-xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-24 -mt-24 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl bg-white cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setShowAvatarPicker(true)}
              title="Klik untuk ganti avatar"
            >
              <img
                src={draftAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=MathHero`}
                alt="avatar"
                className="w-full h-full object-contain p-1"
              />
            </div>

            {/* Edit overlay */}
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="absolute -bottom-2 -right-2 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg hover:bg-mq-peach transition-all border-2 border-white"
              title="Ganti avatar"
            >
              <Edit3 size={14} className="text-mq-primary" />
            </button>

            {/* Badge perubahan avatar */}
            {draftAvatar !== user?.foto && (
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white" title="Ada perubahan belum disimpan" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left w-full">
            {/* Nama */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              {editingName ? (
                <input
                  autoFocus
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="text-2xl font-black text-white bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 border-2 border-white/40 focus:outline-none focus:border-white"
                  style={{ maxWidth: 260 }}
                  onKeyDown={(e) => { if (e.key === 'Enter') setEditingName(false); if (e.key === 'Escape') handleCancel(); }}
                />
              ) : (
                <h2
                  className="text-2xl sm:text-3xl font-black text-white cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setEditingName(true)}
                  title="Klik untuk edit nama"
                >
                  {draftName || 'Petualang'}
                </h2>
              )}

              <button
                onClick={() => setEditingName(!editingName)}
                className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                title={editingName ? 'Selesai edit' : 'Edit nama'}
              >
                {editingName
                  ? <Check size={13} className="text-white" />
                  : <Edit3 size={13} className="text-white" />
                }
              </button>

              <span className="px-3 py-1 bg-white/20 text-white text-xs font-black rounded-xl uppercase tracking-wider">
                {JENJANG_LABEL[user?.jenjang] || 'SD'}
              </span>
            </div>

            <p className="text-white/70 font-medium mb-4">{user?.email || ''}</p>

            {/* XP Bar */}
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-mq-orange rounded-xl flex items-center justify-center">
                    <Zap size={16} className="text-white" fill="white" />
                  </div>
                  <span className="font-black text-white text-lg">Level {level}</span>
                </div>
                <span className="text-white/60 text-sm font-bold">
                  {xp.toLocaleString()} / {xpForLevel(level).toLocaleString()} XP
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-white/50 text-xs font-bold mt-2">
                Butuh <span className="text-white font-black">{xpNeeded.toLocaleString()} XP</span> lagi untuk Level {level + 1}
              </p>
            </div>

            {/* Save / Cancel buttons */}
            {hasChanges && (
              <div className="flex items-center gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all active:scale-95 disabled:opacity-70"
                  style={{ background: '#fff', color: '#0259DD', boxShadow: '0 3px 0 rgba(255,255,255,0.3)' }}
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-mq-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={15} />
                  )}
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>

                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-sm bg-white/20 text-white hover:bg-white/30 transition-all"
                >
                  <X size={14} /> Batal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── KOLOM KIRI ── */}
        <div className="lg:col-span-3 space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            {STAT_CARDS.map((s, i) => (
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

          {/* Info Profil — readonly (email tidak bisa diubah) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={16} className="text-mq-primary" />
                <h3 className="font-black text-slate-800">Informasi Profil</h3>
              </div>
              {hasChanges && (
                <span className="text-[10px] font-black text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  Ada perubahan
                </span>
              )}
            </div>
            <div className="p-4 space-y-3">

              {/* Nama — editable */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-mq-primary/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-mq-primary shadow-sm border border-slate-100 shrink-0">
                  <User size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Username</p>
                  {editingName ? (
                    <input
                      autoFocus
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      className="w-full bg-white border border-mq-primary rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mq-primary/30"
                      onKeyDown={(e) => { if (e.key === 'Enter') setEditingName(false); if (e.key === 'Escape') handleCancel(); }}
                    />
                  ) : (
                    <p className="font-bold text-slate-800 truncate">{draftName}</p>
                  )}
                </div>
                <button
                  onClick={() => setEditingName(!editingName)}
                  className="w-8 h-8 bg-white text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 hover:border-mq-primary hover:text-mq-primary transition-all shrink-0"
                >
                  {editingName ? <Check size={13} className="text-green-500" /> : <Edit3 size={13} />}
                </button>
              </div>

              {/* Email — readonly */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-mq-primary shadow-sm border border-slate-100 shrink-0">
                  <Mail size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="font-bold text-slate-800 truncate">{user?.email || '—'}</p>
                </div>
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center shrink-0" title="Email tidak dapat diubah">
                  <span className="text-[9px] font-black text-slate-400">🔒</span>
                </div>
              </div>

              {/* Jenjang — readonly */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-mq-primary shadow-sm border border-slate-100 shrink-0">
                  <BookOpen size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Jenjang</p>
                  <p className="font-bold text-slate-800">{JENJANG_LABEL[user?.jenjang] || 'Belum dipilih'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── KOLOM KANAN ── */}
        <div className="lg:col-span-2 space-y-6 lg:flex lg:flex-col">

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={18} className="text-white" fill="white" />
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Peringkat Global</p>
              </div>
              <p className="text-5xl font-black mb-1">#{user?.rank}</p>
              <p className="text-sm opacity-70 font-medium">Selesaikan lebih banyak quest untuk naik peringkat!</p>
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
              {loadingProgress ? (
                [...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <SkeletonBar className="w-24 h-3" />
                      <SkeletonBar className="w-8 h-3" />
                    </div>
                    <SkeletonBar className="w-full h-2.5 rounded-full" />
                  </div>
                ))
              ) : (
                [
                  { label: 'Modul Selesai', value: progress.modulesCompleted, max: progress.totalModules, color: 'bg-mq-primary' },
                  { label: 'Achievement',   value: progress.achievementsUnlocked, max: progress.totalAchievements, color: 'bg-yellow-400' },
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
                ))
              )}
            </div>
          </div>

          {/* Riwayat Aktivitas */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden lg:flex-1 lg:flex lg:flex-col">
            <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
              <Flame size={16} className="text-mq-primary" />
              <h3 className="font-black text-slate-800">Aktivitas Terakhir</h3>
            </div>
            <div className="divide-y divide-slate-50 lg:flex-1 lg:overflow-y-auto">
              {loadingLogs ? (
                <div className="px-5 py-6 text-center text-sm text-slate-400 font-medium">Memuat aktivitas...</div>
              ) : activityLogs.length > 0 ? (
                activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-all">
                    <span className="text-xl shrink-0">{log.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 truncate">{log.action}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{log.date}</p>
                    </div>
                    <span className="text-xs font-black text-mq-orange shrink-0">+{log.xp} XP</span>
                  </div>
                ))
              ) : (
                <div className="px-5 py-6 text-center text-sm text-slate-400 font-medium">Belum ada aktivitas</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── LOGOUT BUTTON (mobile) ── */}
      {onLogout && (
        <div className="lg:hidden mt-4 mb-2">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-2xl font-black text-red-500 bg-red-50 border border-red-100 hover:bg-red-100 transition-all"
          >
            <LogOut size={18} />
            Keluar dari Akun
          </button>
        </div>
      )}

      {/* ── MODAL LOGOUT ── */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 animate-in slide-in-from-bottom duration-200">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="font-black text-slate-800 text-center text-lg mb-1">Keluar dari Akun?</h3>
            <p className="text-slate-400 text-sm text-center mb-6">Kamu harus login lagi untuk melanjutkan petualanganmu.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-3.5 rounded-2xl border-2 border-slate-200 font-black text-slate-500 hover:bg-slate-50 transition-all">
                Batal
              </button>
              <button onClick={onLogout} className="flex-1 py-3.5 rounded-2xl font-black text-white bg-red-500 hover:bg-red-600 transition-all" style={{ boxShadow: '0 4px 0 #CC2222' }}>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AVATAR PICKER ── */}
      {showAvatarPicker && (
        <AvatarPicker
          currentUrl={draftAvatar}
          onSelect={(url) => {
            setDraftAvatar(url);
            setShowAvatarPicker(false);
          }}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}
    </div>
  );
};

export default Profile;