import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {
  Map as MapIcon,
  Trophy,
  Award,
  LogOut,
  Zap,
  Flame,
  User
} from 'lucide-react';

import QuestMap from './QuestMap';
import Leaderboard from './Leaderboard';
import Achievement from './Achievement';
import Profile from './Profile';

const Dashboard = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Quest Map', path: '/dashboard/quest-map', icon: <MapIcon size={20} /> },
    { name: 'Leaderboard', path: '/dashboard/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Achievement', path: '/dashboard/achievement', icon: <Award size={20} /> },
    { name: 'Profil', path: '/dashboard/profile', icon: <User size={20} /> },
  ];

  const pageDescriptions = {
    '/dashboard/quest-map': 'Jelajahi modul belajar dan selesaikan tantangan quiz',
    '/dashboard/leaderboard': 'Lihat peringkat dan bandingkan skormu dengan petualang lain',
    '/dashboard/achievement': 'Koleksi lencana dan pencapaian yang telah kamu raih',
    '/dashboard/profile': 'Kelola informasi akun dan pantau perkembanganmu',
  };

  const currentDesc = pageDescriptions[location.pathname] ?? 'Selamat datang di MathQuest!';
  const currentPageName = navLinks.find(l => l.path === location.pathname)?.name ?? 'Dashboard';

  const xpPercent = Math.min(((user?.xp || 0) % 100) / 100 * 100, 100);

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">

      <aside className="hidden lg:flex w-72 bg-white border-r border-mq-peach/40 flex-col sticky top-0 h-screen z-20">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mq-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">M</div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight italic">MathQuest</h1>
          </div>
        </div>

        <div className="mx-4 mb-4 p-4 bg-mq-primary/5 rounded-2xl border border-mq-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0">
              <img src={user?.foto} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-black text-slate-800 text-sm leading-tight truncate">{user?.username || 'Petualang'}</p>
              <p className="text-[10px] font-bold text-mq-primary uppercase tracking-wider">
                Lv.{user?.level || 1} · {{ primary: 'SD', middle: 'SMP', high: 'SMA' }[user?.jenjang] || 'SD'}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>{user?.xp || 0} XP</span>
              <span>{(user?.level || 1) * 100} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-mq-primary rounded-full transition-all duration-700" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Menu Utama</p>
          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300 ${isActive ? 'bg-mq-primary text-white shadow-xl shadow-blue-200 translate-x-2'
                      : 'text-slate-500 hover:bg-mq-peach/30 hover:text-mq-primary'
                    }`}
                >
                  {link.icon}{link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6 border-t border-slate-50 shrink-0">
          <button onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl font-bold text-mq-orange hover:bg-orange-50 transition-all"
          >
            <LogOut size={20} />Keluar Sesi
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        <header className="sticky top-0 z-20 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-slate-100/60">

          <div className="h-14 px-4 lg:h-20 lg:px-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex lg:hidden w-8 h-8 bg-mq-primary rounded-lg items-center justify-center text-white font-black text-base shadow shadow-blue-100">M</div>
              <div>
                <p className="text-sm lg:text-xl font-black text-slate-800 leading-tight">{currentPageName}</p>
                <p className="text-[10px] lg:text-xs text-slate-400 font-medium hidden sm:block">{currentDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <div className="hidden lg:flex items-center gap-1.5 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                <Flame size={16} fill="#FF4B4B" style={{ color: '#FF4B4B' }} />
                <span className="font-black text-slate-700 text-sm">{user?.streak ?? 0} Hari</span>
              </div>
              <div className="hidden lg:flex items-center gap-1.5 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                <Zap className="text-mq-orange" fill="#FF6648" size={16} />
                <span className="font-black text-slate-700 text-sm">{user?.xp || 0} XP</span>
              </div>

              <div className="flex lg:hidden items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                <Flame size={14} fill="#FF4B4B" style={{ color: '#FF4B4B' }} />
                <span className="font-black text-slate-700 text-xs">{user?.streak ?? 0}</span>
              </div>

              <Link to="/dashboard/profile"
                className="flex items-center gap-2 lg:gap-4 lg:pl-3 lg:ml-0.5 lg:border-l lg:border-slate-200 hover:opacity-80 transition-opacity"
              >
                <div className="hidden lg:block text-right">
                  <p className="text-sm font-black text-slate-800">{user?.username || 'Petualang'}</p>
                  <p className="text-[10px] font-bold text-mq-primary uppercase tracking-wider">Level {user?.level || 1} Apprentice</p>
                </div>
                <div className="w-9 h-9 lg:w-12 lg:h-12 bg-mq-peach rounded-xl lg:rounded-2xl border-2 border-white shadow-md overflow-hidden">
                  <img src={user?.foto} alt="avatar" className="w-full h-full object-cover" />
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:hidden px-4 pb-2.5 flex items-center gap-2">
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[10px] font-black text-mq-primary leading-none">Lv.{user?.level || 1}</span>
            </div>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-mq-orange rounded-full transition-all duration-700"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-slate-500 shrink-0">{user?.xp || 0} XP</span>
          </div>
        </header>

        <main className="p-4 lg:p-10 lg:pt-8 pb-24 lg:pb-10">
          <Routes>
            <Route path="/" element={<Navigate to="quest-map" replace />} />
            <Route path="quest-map" element={<QuestMap />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="achievement" element={<Achievement />} />
            <Route path="profile" element={<Profile onLogout={handleLogout} />} />
          </Routes>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100">
        <div className="flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${isActive ? 'text-mq-primary' : 'text-slate-400'
                  }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-mq-primary/10' : ''}`}>
                  {link.icon}
                </div>
                <span className={`text-[10px] font-black leading-none ${isActive ? 'text-mq-primary' : 'text-slate-400'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;