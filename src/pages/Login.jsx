import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Star, Flame, Trophy, Zap, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login({ username: email.split('@')[0], email });
      navigate('/pilih-jenjang');
    }, 800);
  };

  const stats = [
    { icon: <Trophy size={16} className="text-[#0259DD]" />, value: '100K+', label: 'Questers' },
    { icon: <Flame size={16} className="text-[#FF6648]" />, value: '5M+', label: 'Soal Selesai' },
    { icon: <Star size={16} className="text-[#0259DD]" fill="#0259DD" />, value: '4.9', label: 'Rating' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex">

      {/* ── Sisi Kiri: Branding ── */}
      <div className="hidden lg:flex w-[45%] bg-[#0259DD] flex-col justify-between p-12 relative overflow-hidden">
        {/* Dekorasi lingkaran */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute bottom-32 -left-16 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-[#FF6648]/20 rounded-full" />

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-[#0259DD] text-xl shadow-[0_4px_0_rgba(0,0,0,0.2)] group-active:translate-y-1 group-active:shadow-none transition-all">
            M
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
            MathQuest
          </h1>
        </div>

        {/* Teks Tengah */}
        <div>
          <span className="inline-block px-3 py-1 bg-white/10 text-white/70 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5">
            Selamat Datang Kembali!
          </span>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tight leading-tight mb-4">
            Lanjutkan <br />
            <span className="text-[#FFE1D7] underline decoration-[#FF6648] decoration-4">
              Petualanganmu!
            </span>
          </h2>
          <p className="text-white/60 font-bold leading-relaxed text-sm max-w-xs">
            Quest menunggumu. XP-mu masih tersimpan. Jadilah jawara matematika hari ini!
          </p>

          {/* Kartu streak */}
          <div className="mt-8 bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-4 max-w-xs">
            <div className="w-12 h-12 bg-[#FF6648] rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🔥
            </div>
            <div>
              <p className="text-white font-black text-sm">7 Hari Streak!</p>
              <p className="text-white/50 text-xs font-bold">Pertahankan semangat belajarmu</p>
            </div>
          </div>
        </div>

        {/* Stats bawah */}
        <div className="flex gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  {s.icon}
                </div>
              </div>
              <p className="font-black text-white text-lg leading-none">{s.value}</p>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sisi Kanan: Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo mobile */}
        <div
          onClick={() => navigate('/')}
          className="flex lg:hidden items-center gap-2 cursor-pointer mb-10"
        >
          <div className="w-9 h-9 bg-[#0259DD] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-[0_3px_0_#013ca3]">
            M
          </div>
          <h1 className="text-xl font-black text-[#0259DD] tracking-tighter uppercase italic">MathQuest</h1>
        </div>

        <div className="w-full max-w-md">
          {/* Badge XP */}
          <div className="flex items-center gap-3 bg-[#FFE1D7]/40 border border-[#FFE1D7] rounded-2xl px-4 py-3 mb-8">
            <div className="w-8 h-8 bg-[#FF6648] rounded-xl flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-slate-700 uppercase tracking-wider">Login = +50 XP Harian</p>
              <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                <div className="h-full w-[72%] bg-[#0259DD] rounded-full" />
              </div>
            </div>
            <span className="text-xs font-black text-[#0259DD]">Lv.5</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight mb-1">
            Masuk Akun
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-8">
            Belum punya akun?{' '}
            <span
              onClick={() => navigate('/register')}
              className="text-[#0259DD] cursor-pointer hover:underline underline-offset-4"
            >
              Daftar Sekarang
            </span>
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hero@mathquest.id"
                className="w-full px-5 py-4 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-xs font-black text-slate-600 uppercase tracking-widest">
                  Password
                </label>
                <span className="text-xs text-[#0259DD] font-black cursor-pointer hover:text-[#FF6648] transition-colors">
                  Lupa Password?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0259DD] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black text-lg uppercase italic tracking-tight transition-all flex items-center justify-center gap-2
                ${isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#FF6648] text-white shadow-[0_5px_0_#d14d33] hover:translate-y-[-2px] hover:shadow-[0_7px_0_#d14d33] active:translate-y-1 active:shadow-[0_2px_0_#d14d33]'
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Memuat Quest...
                </>
              ) : (
                <>⚔️ Mulai Petualangan!</>
              )}
            </button>
          </form>

          {/* Achievement chips */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-center">
              Yang menanti setelah login
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {[
                { icon: '🗺️', label: 'Quest Map' },
                { icon: '🏆', label: 'Leaderboard' },
                { icon: '🎖️', label: 'Achievement' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-100 rounded-xl shadow-sm"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-black text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;