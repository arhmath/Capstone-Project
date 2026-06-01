import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { registerUser } from '../services/authService';

import TrophyIcon from '../assets/trophy.png'; 
import CompassIcon from '../assets/compass.png';

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
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await registerUser({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordChecks = [
    { label: 'Minimal 8 karakter', pass: formData.password.length >= 8 },
    { label: 'Mengandung angka', pass: /\d/.test(formData.password) },
    { label: 'Password cocok', pass: formData.password && formData.password === formData.confirmPassword },
  ];

  const features = [
    {
      icon: TrophyIcon,
      title: 'Raih Lencana Langka',
      desc: 'Koleksi achievement unik dan puncaki Leaderboard',
    },
    {
      icon: CompassIcon,
      title: 'Jelajahi Peta Quest',
      desc: 'Taklukkan tantangan angka lewat rute Quest Map yang seru',
    },
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }} className="min-h-screen bg-[#F0F5FF] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');

        .input-field {
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
        .input-field::placeholder { color: #BFD0EE; }
        .input-field:focus {
          border-color: #0259DD;
          box-shadow: 0 0 0 4px rgba(2, 89, 221, 0.1);
        }
        .btn-primary {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          background: #0259DD;
          color: white;
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 16px;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          box-shadow: 0 5px 0 #013ca3;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 0 #013ca3;
        }
        .btn-primary:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #013ca3;
        }
        .btn-primary:disabled {
          background: #E2E8F0;
          color: #94A3B8;
          box-shadow: 0 3px 0 #CBD5E1;
          cursor: not-allowed;
        }

        .feature-card {
          background: #F5C842;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 20px;
          padding: 20px;
          backdrop-filter: blur(8px);
          text-align: center;
          flex: 1;
        }

        .weekly-mission {
          background: #F5C842;
          border-radius: 20px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
        }

        .label {
          display: block;
          font-size: 11px;
          font-weight: 900;
          color: #4A6FA5;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .badge-new {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #013ca3;
          color: #A8C4FF;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── Left: Form ── */}
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
          {/* Header */}
          <h2
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900 }}
            className="text-3xl text-slate-900 uppercase tracking-tight mb-1"
          >
            Mulai Petualanganmu
          </h2>
          <p style={{ fontWeight: 700, fontSize: 14 }} className="text-slate-500 mb-8">
            Satu langkah lagi untuk menjadi master matematika di jagat raya MathQuest.{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#0259DD] cursor-pointer hover:underline underline-offset-4"
            >
              Masuk di sini
            </span>
          </p>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Username */}
            <div>
              <label className="label">Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  👤
                </span>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange('username')}
                  placeholder="Nama petualangmu"
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  ✉️
                </span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="email@quest.com"
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  🔒
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder="Min. 8 karakter"
                  className="input-field"
                  style={{ paddingLeft: 44, paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">Konfirmasi Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BFD0EE', fontSize: 16 }}>
                  🔒
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  placeholder="Ulangi password"
                  className="input-field"
                  style={{ paddingLeft: 44, paddingRight: 48 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password checklist */}
            {formData.password && (
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingLeft: 4 }}>
                {passwordChecks.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {c.pass
                      ? <CheckCircle2 size={13} style={{ color: '#22C55E' }} fill="currentColor" />
                      : <Circle size={13} style={{ color: '#CBD5E1' }} />
                    }
                    <span style={{ fontSize: 10, fontWeight: 700, color: c.pass ? '#16A34A' : '#94A3B8' }}>
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 14, padding: '12px 16px' }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', margin: 0 }}>{error}</p>
              </div>
            )}

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="btn-primary"
              style={{ marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {isLoading ? (
                <>
                  <div
                    className="spin"
                    style={{ width: 18, height: 18, border: '2px solid #CBD5E1', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                  Membuat Akun...
                </>
              ) : (
                'Buat Akun Sekarang'
              )}
            </button>
          </div>

          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
            Dengan mendaftar, kamu setuju dengan{' '}
            <span onClick={() => navigate('/terms')} style={{ color: '#FF6B35', cursor: 'pointer' }}>Syarat & Ketentuan</span> MathQuest
          </p>
        </div>
      </div>

      {/* ── Right: Branding Panel ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
          background: 'linear-gradient(160deg, #0259DD 0%, #0140A8 60%, #012F80 100%)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 80, left: -40, width: 180, height: 180, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '40%', right: 20, width: 80, height: 80, background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />

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
              boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
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

        {/* Main content */}
        <div style={{ zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900,
              fontSize: 44, color: 'white', lineHeight: 1.1, letterSpacing: '-0.02em',
              textTransform: 'uppercase', margin: '0 0 16px',
            }}
          >
            Siap<br />Berpetualang?
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 14, maxWidth: 300, margin: '0 0 32px' }}>
          Ubah rumus menjadi petualangan, kumpulkan pencapaian hebat, dan buktikan bahwa kamulah master matematika sejati!
          </p>

          {/* Feature cards */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent: 'center', textAlign: 'center' }}>
                <img 
                  src={f.icon} 
                  alt={f.title} 
                  style={{ width: 44, height: 44, objectFit: 'contain', marginBottom: 10 }} 
                />
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 13, color: '#1E3A5F', margin: '0 0 4px' }}>
                  {f.title}
                </p>
                <p style={{ fontWeight: 700, fontSize: 11, color: '#4A6FA5', margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 10,
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.2em',
            zIndex: 1, margin: 0,
          }}
        >
          #AccessibleAdaptiveLearning
        </p>
      </div>
    </div>
  );
};

export default Register;