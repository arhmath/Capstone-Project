import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext'; // Import Context

const Login = () => {
  const navigate = useNavigate();
  const { login } = useApp(); // Ambil fungsi login dari context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulasi login sukses
    // Kita kirim data dasar, AppContext akan melengkapinya dengan XP, Level, dan Avatar
    login({ 
      username: email.split('@')[0], 
      email: email 
    });

    // Arahkan ke menu pilih jenjang
    navigate('/pilih-jenjang');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mq-peach/30 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-mq-peach relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-mq-blue-light/10 rounded-bl-full"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-mq-primary">Selamat Datang!</h2>
          <p className="text-slate-500 mt-2 font-medium">Masuk untuk melanjutkan quest-mu</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 ml-1 text-slate-700">Email</label>
            <input 
              type="email"
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <span className="text-xs text-mq-primary font-bold cursor-pointer hover:text-mq-orange">Lupa Password?</span>
            </div>
            <input 
              type="password"
              required
              className="w-full px-5 py-4 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-mq-primary text-white rounded-2xl font-black text-lg hover:bg-mq-orange hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-1 active:scale-95 transition-all shadow-md"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm font-medium">
            Belum punya akun? <span onClick={() => navigate('/register')} className="text-mq-primary font-bold cursor-pointer hover:underline underline-offset-4">Daftar Sekarang</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;