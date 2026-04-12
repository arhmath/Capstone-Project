import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Cek konfirmasi password sederhana
    if(formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    console.log("Mendaftarkan user:", formData.username);
    
    // Setelah register selesai, user dikembalikan ke menu Login
    // Sesuai permintaan: "user menginputkan lagi" di menu login
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mq-peach/30 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-md border border-mq-peach">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-mq-primary">Daftar Akun</h2>
          <p className="text-slate-500 mt-2 font-medium">Mulai perjalanan belajarmu di sini</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1.5 ml-1">Username</label>
            <input 
              type="text"
              required
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="Username unikmu"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5 ml-1">Email</label>
            <input 
              type="email"
              required
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="email@sekolah.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5 ml-1">Password</label>
            <input 
              type="password"
              required
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1.5 ml-1">Konfirmasi Password</label>
            <input 
              type="password"
              required
              className="w-full px-5 py-3.5 rounded-2xl border-2 border-mq-blue-light/30 focus:border-mq-primary focus:outline-none transition-all"
              placeholder="Ulangi password"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-mq-primary text-white rounded-2xl font-black text-lg hover:bg-mq-orange hover:shadow-lg transition-all mt-4"
          >
            Buat Akun
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 text-sm font-medium">
          Sudah jadi petualang? <span onClick={() => navigate('/login')} className="text-mq-primary font-bold cursor-pointer hover:underline">Login di sini</span>
        </p>
      </div>
    </div>
  );
};

export default Register;