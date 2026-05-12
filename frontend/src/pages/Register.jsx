import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { registerUser } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  // ── Handle Register ────────────────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Password tidak cocok!');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { label: 'Minimal 8 karakter', pass: formData.password.length >= 8 },
    { label: 'Mengandung angka', pass: /\d/.test(formData.password) },
    { label: 'Password cocok', pass: formData.password && formData.password === formData.confirmPassword },
  ];

  const perks = [
    { icon: '🚀', title: 'Starter Pack', desc: '+500 XP langsung' },
    { icon: '🎖️', title: 'Lencana Pemula', desc: 'Achievement eksklusif' },
    { icon: '🗺️', title: 'Quest Perdana', desc: 'Akses modul gratis' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans flex">

      {/* ── Sisi Kiri: Form ── */}
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
          <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight mb-1">
            Buat Karakter
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-8">
            Sudah punya akun?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#0259DD] cursor-pointer hover:underline underline-offset-4"
            >
              Masuk di sini
            </span>
          </p>

          {/* Perk chips */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            {perks.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-3 text-center shadow-sm"
              >
                <span className="text-2xl block mb-1">{p.icon}</span>
                <p className="text-[10px] font-black text-[#0259DD] uppercase tracking-wider leading-tight">
                  {p.title}
                </p>
                <p className="text-[9px] text-slate-400 font-bold mt-0.5">{p.desc}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">
                Username Petualang
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={handleChange('username')}
                placeholder="MathHero123"
                className="w-full px-5 py-4 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="hero@mathquest.id"
                className="w-full px-5 py-4 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder="Min. 8 karakter"
                  className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0259DD] transition-colors"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2 ml-1">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  placeholder="Ulangi password"
                  className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-[#84AFFB]/40 bg-white focus:border-[#0259DD] focus:outline-none focus:ring-4 focus:ring-[#0259DD]/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0259DD] transition-colors"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password checklist */}
            {formData.password && (
              <div className="flex gap-4 flex-wrap px-1">
                {passwordChecks.map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    {c.pass
                      ? <CheckCircle2 size={13} className="text-green-500" fill="currentColor" />
                      : <Circle size={13} className="text-slate-300" />
                    }
                    <span className={`text-[10px] font-bold ${c.pass ? 'text-green-600' : 'text-slate-400'}`}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-sm font-bold text-red-500">⚠️ {errorMsg}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black text-lg uppercase italic tracking-tight transition-all flex items-center justify-center gap-2 mt-2
                ${isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#0259DD] text-white shadow-[0_5px_0_#013ca3] hover:translate-y-[-2px] hover:shadow-[0_7px_0_#013ca3] active:translate-y-1 active:shadow-[0_2px_0_#013ca3]'
                }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Membuat Karakter...
                </>
              ) : (
                <>🚀 Buat Karakter Sekarang!</>
              )}
            </button>
          </form>

          <p className="text-[10px] text-slate-400 font-bold text-center mt-6 leading-relaxed">
            Dengan mendaftar, kamu setuju dengan{' '}
            <span className="text-[#0259DD] cursor-pointer">Syarat & Ketentuan</span>{' '}
            MathQuest
          </p>
        </div>
      </div>

      {/* ── Sisi Kanan: Branding ── */}
      <div className="hidden lg:flex w-[45%] bg-[#FFE1D7]/30 border-l-4 border-[#FFE1D7] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#84AFFB]/10 rounded-full" />
        <div className="absolute bottom-24 right-8 w-32 h-32 bg-[#FF6648]/10 rounded-full" />

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#0259DD] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-[0_4px_0_#013ca3] group-active:translate-y-1 group-active:shadow-none transition-all">
            M
          </div>
          <h1 className="text-2xl font-black text-[#0259DD] tracking-tighter uppercase italic">
            MathQuest
          </h1>
        </div>

        {/* Teks tengah */}
        <div>
          <span className="inline-block px-3 py-1 bg-[#84AFFB] text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5 shadow-sm">
            Bergabung Sekarang Gratis!
          </span>
          <h2 className="text-4xl font-black text-slate-950 uppercase italic tracking-tight leading-tight mb-4">
            Jadilah{' '}
            <span className="text-[#0259DD] underline decoration-[#FF6648] decoration-4">
              Jawara
            </span>{' '}
            Matematika!
          </h2>
          <p className="text-slate-600 font-bold leading-relaxed text-sm max-w-xs">
            Bergabung bersama 100.000+ petualang. Mulai dari nol, raih puncak leaderboard!
          </p>

          {/* Top players preview */}
          <div className="mt-8 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Questers Minggu Ini</p>
            {[
              { name: 'ArhamAthillah', xp: '12.450 XP', rank: '🥇' },
              { name: 'NabilaZahira', xp: '11.200 XP', rank: '🥈' },
              { name: 'RafifAldino', xp: '10.800 XP', rank: '🥉' },
            ].map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-100 shadow-sm"
              >
                <span className="text-lg">{p.rank}</span>
                <div className="w-8 h-8 rounded-xl bg-[#84AFFB]/20 overflow-hidden border border-[#84AFFB]/30">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="flex-1 font-black text-slate-800 text-sm">{p.name}</p>
                <p className="text-xs font-black text-[#FF6648]">{p.xp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
          #AccessibleAdaptiveLearning
        </p>
      </div>
    </div>
  );
};

export default Register;