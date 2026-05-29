import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Star, Flame, Trophy, Zap, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate  = useNavigate();
  const { login } = useApp();

  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { user: beUser } = await login({ email, password });
      const hasCompletedPreTest = beUser.pretestSessions?.length > 0;
      navigate(hasCompletedPreTest ? '/dashboard/quest-map' : '/pilih-jenjang');
    } catch (err) {
      setError(err.message || 'Login gagal. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { icon: <Trophy size={15} />, value: '100K+', label: 'Questers'     },
    { icon: <Flame  size={15} />, value: '5M+',   label: 'Soal Selesai' },
    { icon: <Star   size={15} />, value: '4.9',   label: 'Rating'       },
  ];

  const postLoginFeatures = [
    { icon: '🗺️', label: 'Quest Map'   },
    { icon: '🏆', label: 'Leaderboard' },
    { icon: '🎖️', label: 'Achievement' },
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }} className="min-h-screen bg-[#F0F5FF] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');

        .login-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 14px;
          border: 2px solid #DBEAFE;
          background: #fff;
          font-family: 'Nunito', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #1E3A5F;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input::placeholder { color: #BFD0EE; }
        .login-input:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
        }

        .btn-login {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          background: #FF6B35;
          color: white;
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 16px;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          box-shadow: 0 5px 0 #c44e1e;
          transition: transform 0.15s, box-shadow 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 0 #c44e1e;
        }
        .btn-login:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #c44e1e;
        }
        .btn-login:disabled {
          background: #E2E8F0;
          color: #94A3B8;
          box-shadow: 0 3px 0 #CBD5E1;
          cursor: not-allowed;
        }

        .login-label {
          display: block;
          font-size: 11px;
          font-weight: 900;
          color: #4A6FA5;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .badge-welcome {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 107, 53, 0.15);
          color: #FF9A70;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
          border: 1px solid rgba(255,107,53,0.2);
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 14px 18px;
          flex: 1;
        }

        .streak-card {
          background: rgba(255, 107, 53, 0.12);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 20px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
          max-width: 320px;
        }

        .xp-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #FFF5F0;
          border: 1.5px solid #FFD4C2;
          border-radius: 14px;
          padding: 12px 16px;
          margin-bottom: 28px;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Kiri: Branding Panel ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
          background: 'linear-gradient(160deg, #0F1B36 0%, #0F2554 55%, #0E3275 100%)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorations */}
        <div style={{ position: 'absolute', top: -60, left: -60, width: 260, height: 260, background: 'rgba(255,107,53,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 60, right: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '45%', left: 20, width: 90, height: 90, background: 'rgba(255,107,53,0.08)', borderRadius: '50%' }} />

        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', zIndex: 1 }}
        >
          <div
            style={{
              width: 40, height: 40,
              background: 'white',
              borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900,
              color: '#0259DD', fontSize: 20,
              boxShadow: '0 4px 0 rgba(0,0,0,0.25)',
            }}
          >
            M
          </div>
          <h1
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900, fontSize: 22, color: 'white', letterSpacing: '-0.03em', textTransform: 'uppercase', margin: 0 }}
          >
            MathQuest
          </h1>
        </div>

        {/* Main copy */}
        <div style={{ zIndex: 1 }}>
          <div className="badge-welcome">
            <span>🔥</span> Selamat Datang Kembali!
          </div>

          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900,
              fontSize: 42, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', margin: '0 0 16px',
            }}
          >
            Lanjutkan<br />
            <span style={{ color: '#FF9A70', textDecoration: 'underline', textDecorationColor: '#FF6B35', textDecorationThickness: 4 }}>
              Petualanganmu!
            </span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 14, lineHeight: 1.7, maxWidth: 280, margin: '0 0 0' }}>
            Quest menunggumu. XP-mu masih tersimpan. Jadilah jawara matematika hari ini!
          </p>

          {/* Achievement card */}
          <div className="streak-card">
            <div
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                boxShadow: '0 4px 0 #c44e1e',
              }}
            >
              🚀
            </div>
            <div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 14, color: 'white', margin: '0 0 3px' }}>
                Langkah Pertama!
              </p>
              <p style={{ fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                Pertahankan semangat belajarmu
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, zIndex: 1 }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{
                width: 28, height: 28, background: i === 1 ? '#FF6B35' : 'white',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i === 1 ? 'white' : '#0259DD', marginBottom: 2,
              }}>
                {s.icon}
              </div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: 'white', fontSize: 17, margin: 0, lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Kanan: Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div
          onClick={() => navigate('/')}
          className="flex lg:hidden items-center gap-2 cursor-pointer mb-10"
        >
          <div
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900 }}
            className="w-9 h-9 bg-[#0259DD] rounded-xl flex items-center justify-center text-white text-lg shadow-[0_3px_0_#013ca3]"
          >
            M
          </div>
          <h1
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900 }}
            className="text-xl text-[#0259DD] tracking-tighter uppercase"
          >
            MathQuest
          </h1>
        </div>

        <div className="w-full max-w-md">

          {/* XP Banner */}
          <div className="xp-banner">
            <div style={{
              width: 34, height: 34, background: '#FF6B35', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Zap size={16} color="white" fill="white" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 11, color: '#7A3520', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 5px' }}>
                Login = +50 XP Harian
              </p>
              <div style={{ width: '100%', height: 6, background: '#FFD4C2', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '72%', background: '#FF6B35', borderRadius: 999 }} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900 }}
            className="text-3xl text-slate-900 uppercase tracking-tight mb-1"
          >
            Masuk Akun
          </h2>
          <p style={{ fontWeight: 700, fontSize: 14 }} className="text-slate-500 mb-8">
            Belum punya akun?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{ color: '#FF6B35', cursor: 'pointer' }}
              className="hover:underline underline-offset-4"
            >
              Daftar Sekarang
            </span>
          </p>

          {/* Form fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email */}
            <div>
              <label className="login-label">Email</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  ✉️
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hero@mathquest.id"
                  className="login-input"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginLeft: 4 }}>
                <label className="login-label" style={{ margin: 0 }}>Password</label>
                <span
                  style={{ fontSize: 11, fontWeight: 900, color: '#FF6B35', cursor: 'pointer', textDecoration: 'none' }}
                  onMouseOver={e => e.target.style.textDecoration = 'underline'}
                  onMouseOut={e => e.target.style.textDecoration = 'none'}
                >
                  Lupa Password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  🔒
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="login-input"
                  style={{ paddingLeft: 44, paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 14, padding: '12px 16px' }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="btn-login"
              style={{ marginTop: 4 }}
            >
              {isLoading ? (
                <>
                  <div
                    className="spin"
                    style={{ width: 18, height: 18, border: '2px solid #CBD5E1', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                  Memuat Quest...
                </>
              ) : (
                <>⚔️ Mulai Petualangan!</>
              )}
            </button>
          </div>

          {/* Post-login features */}
          <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1.5px solid #EEF2FF' }}>
            <p style={{ fontSize: 10, fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.2em', textAlign: 'center', marginBottom: 12 }}>
              Yang menanti setelah login
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {postLoginFeatures.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '8px 14px',
                    background: 'white',
                    border: '1.5px solid #EEF2FF',
                    borderRadius: 12,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 12, color: '#4A6FA5' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
            Dengan masuk, kamu setuju dengan{' '}
            <span style={{ color: '#FF6B35', cursor: 'pointer' }}>Syarat & Ketentuan</span> MathQuest
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;