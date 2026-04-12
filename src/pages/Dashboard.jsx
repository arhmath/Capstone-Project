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
  ChevronRight,
  Star
} from 'lucide-react';

// Sub-Pages (Bisa dipisah ke file berbeda nanti)
const QuestMap = () => {
  const { user } = useApp();
  
  const quests = [
    { id: 1, title: "Dasar Angka", status: "completed", xp: 100 },
    { id: 2, title: "Operasi Campuran", status: "current", xp: 250 },
    { id: 3, title: "Logika Pecahan", status: "locked", xp: 400 },
    { id: 4, title: "Geometri Dasar", status: "locked", xp: 500 },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-mq-primary rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Lanjutkan Petualanganmu!</h2>
          <p className="opacity-80 font-medium">Kamu sedang berada di modul {quests[1].title}</p>
          <button className="mt-6 px-6 py-3 bg-white text-mq-primary rounded-xl font-black hover:bg-mq-peach transition-colors">
            Main Sekarang
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
      </div>

      <h3 className="text-xl font-black text-slate-800 mb-6">Quest Map - Jenjang {user?.jenjang}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quests.map((q) => (
          <div key={q.id} className={`p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${
            q.status === 'completed' ? 'bg-green-50 border-green-100' : 
            q.status === 'current' ? 'bg-white border-mq-primary shadow-lg' : 'bg-slate-50 border-slate-100 opacity-60'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                q.status === 'completed' ? 'bg-green-500 text-white' : 
                q.status === 'current' ? 'bg-mq-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {q.id}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{q.title}</h4>
                <p className="text-xs font-bold text-mq-orange">{q.xp} XP</p>
              </div>
            </div>
            {q.status !== 'locked' && <ChevronRight className="text-slate-400" />}
          </div>
        ))}
      </div>
    </div>
  );
};

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

        <nav className="flex-1 px-4 mt-4">
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
        <header className="h-24 px-10 flex items-center justify-between sticky top-0 bg-[#FDFCFB]/80 backdrop-blur-md z-10">
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

            {/* Profile Section */}
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
        <main className="p-10 pt-2">
          <Routes>
            <Route path="/" element={<Navigate to="quest-map" replace />} />
            <Route path="quest-map" element={<QuestMap />} />
            <Route path="leaderboard" element={<div className="p-10 text-center font-bold text-slate-400">Papan Peringkat Segera Hadir!</div>} />
            <Route path="achievement" element={<div className="p-10 text-center font-bold text-slate-400">Pencapaian Segera Hadir!</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;