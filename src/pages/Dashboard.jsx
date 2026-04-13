import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  Map as MapIcon, 
  Trophy, 
  Award, 
  LogOut, 
  Bell,
  Search,
  Star
} from 'lucide-react';

// Import sub-pages
import QuestMap from './QuestMap';
import Leaderboard from './Leaderboard';
import Achievement from './Achievement';

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
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCFB]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-mq-peach/40 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mq-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
              M
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight italic">MathQuest</h1>
          </div>
        </div>

        {/* User Card di Sidebar */}
        <div className="mx-4 mb-4 p-4 bg-mq-primary/5 rounded-2xl border border-mq-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-white shadow-md">
              <img src={user?.foto} alt="User" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm leading-tight">{user?.username || 'Petualang'}</p>
              <p className="text-[10px] font-bold text-mq-primary uppercase tracking-wider">Lv.{user?.level || 1} · {user?.jenjang || 'SD'}</p>
            </div>
          </div>
          {/* XP Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>{user?.xp || 0} XP</span>
              <span>{((user?.level || 1) * 1000)} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-mq-primary rounded-full transition-all duration-700"
                style={{ width: `${Math.min(((user?.xp || 0) % 1000) / 10, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Menu Utama</p>
          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300 ${
                    isActive 
                    ? 'bg-mq-primary text-white shadow-xl shadow-blue-200 translate-x-2' 
                    : 'text-slate-500 hover:bg-mq-peach/30 hover:text-mq-primary'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl font-bold text-mq-orange hover:bg-orange-50 transition-all"
          >
            <LogOut size={20} />
            Keluar Sesi
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="h-24 px-10 flex items-center justify-between sticky top-0 bg-[#FDFCFB]/80 backdrop-blur-md z-10 border-b border-slate-100/50">
          <div className="relative w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari quest atau materi..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mq-blue-light/50 transition-all text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
              <Star className="text-mq-orange" fill="#FF6648" size={18} />
              <span className="font-black text-slate-700">{user?.xp || 0} XP</span>
            </div>
            
            <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-mq-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-mq-orange rounded-full border-2 border-white"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-800">{user?.username || 'Petualang'}</p>
                <p className="text-[10px] font-bold text-mq-primary uppercase tracking-wider">Level {user?.level || 1} Apprentice</p>
              </div>
              <div className="w-12 h-12 bg-mq-peach rounded-2xl border-2 border-white shadow-md overflow-hidden">
                <img src={user?.foto} alt="User Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="p-10 pt-8">
          <Routes>
            <Route path="/" element={<Navigate to="quest-map" replace />} />
            <Route path="quest-map" element={<QuestMap />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="achievement" element={<Achievement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;