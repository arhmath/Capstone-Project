import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Trophy, Layout, ChevronRight, MapPin, Target, Sparkles, Star } from 'lucide-react';

import imgDashboard from '../assets/imgdashboard.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  // Data Alur (Snake Flow)
  const flowSteps = [
    { step: 1, icon: <User size={35} />, title: "Register", desc: "Buat avatar petualangmu.", color: "border-[#84AFFB]" },
    { step: 2, icon: <BookOpen size={35} />, title: "Pilih Jenjang", desc: "SD, SMP, atau SMA.", color: "border-[#84AFFB]" },
    { step: 3, icon: <Target size={35} />, title: "Pre-test", desc: "Ukur *Power Level*-mu.", color: "border-[#0259DD]" },
    { step: 4, icon: <MapPin size={35} />, title: "Mulai Quest", desc: "Hadapi monster matematika.", color: "border-[#0259DD]" },
    // Baris Kedua (Arah balik)
    { step: 5, icon: <Trophy size={35} />, title: "Jadilah Top", desc: "Kuasai Leaderboard global.", color: "border-[#FF6648]" },
    { step: 6, icon: <Sparkles size={35} />, title: "Unlock Skill", desc: "Buka *math skill* baru.", color: "border-[#FF6648]" },
    { step: 7, icon: <Layout size={35} />, title: "Materi Adaptif", desc: "Tantangan sesuai *skill*-mu.", color: "border-[#0259DD]" },
    { step: 8, icon: <Star size={35} />, title: "Peroleh XP", desc: "Kumpulkan XP & Level Up!", color: "border-[#0259DD]" },
  ];

  // Komponen Helper untuk Panah
  const Arrow = ({ direction }) => {
    const directions = {
      right: "→",
      down: "↓",
      left: "←",
    };
    return (
      <div className="text-6xl font-black text-[#0259DD]/30 animate-pulse hidden md:block relative z-10 drop-shadow-sm">
        {directions[direction]}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-slate-800">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b-4 border-[#FFE1D7] sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#0259DD] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_0_#013ca3] group-active:translate-y-1 group-active:shadow-none transition-all">
            M
          </div>
          <h1 className="text-2xl font-black text-[#0259DD] tracking-tighter uppercase italic">Math Quest</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="px-6 py-2 text-[#0259DD] font-black hover:text-[#FF6648] transition-colors uppercase text-sm tracking-widest">Login</button>
          <button onClick={() => navigate('/register')} className="px-6 py-2 bg-[#0259DD] text-white rounded-full font-black shadow-[0_4px_0_#013ca3] hover:bg-[#FF6648] hover:shadow-[0_4px_0_#d14d33] active:translate-y-1 active:shadow-none transition-all uppercase text-sm tracking-widest">Register</button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#FFE1D7]/20 px-8 py-20 overflow-hidden border-b-4 border-[#FFE1D7]/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#84AFFB]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-in slide-in-from-left duration-700">
            <span className="inline-block px-4 py-1 bg-white border-2 border-[#FFE1D7] text-[#0259DD] rounded-full text-[10px] font-black mb-4 shadow-sm uppercase tracking-[0.2em]">#AccessibleAdaptiveLearning</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-tight mb-6 uppercase italic tracking-tight">
              Taklukkan Matematika dengan <span className="text-[#0259DD] underline decoration-[#FF6648] decoration-4">Petualangan!</span>
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed font-bold italic">Math Quest mengubah cara belajar matematika yang membosankan menjadi petualangan yang seru. Selesaikan quest, dapatkan XP, dan jadilah jawara!</p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/register')} 
                className="px-8 py-5 bg-[#FF6648] text-white rounded-[2rem] font-black text-xl uppercase tracking-tight shadow-[0_6px_0_#d14d33] hover:translate-y-1 hover:shadow-[0_3px_0_#d14d33] active:translate-y-1.5 active:shadow-none transition-all flex items-center gap-3"
              >
                Mulai Petualangan <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="relative flex justify-center animate-in zoom-in duration-700">
            <div className="w-full h-80 md:h-[400px] bg-[#84AFFB] rounded-[3rem] shadow-2xl border-[10px] border-white overflow-hidden group relative transform rotate-1">
              <img src={imgDashboard} alt="Math Quest Dashboard" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0259DD]/30 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-[2.5rem] shadow-2xl border-4 border-[#FF6648] flex items-center gap-4 animate-bounce-slow">
              <div className="w-14 h-14 bg-[#FF6648] rounded-2xl flex items-center justify-center text-white shadow-lg"><Trophy size={28} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">Top Leaderboard</p>
                <p className="font-black text-slate-950 text-xl tracking-tighter italic">Arham Athillah</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- BENTO GRID FEATURES --- */}
<section className="py-16 px-8 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Grid Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
      
      {/* 1. Gamified Progression (Besar - Horisontal) */}
      <div className="md:col-span-2 row-span-2 bg-[#FFE1D7]/40 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group border-2 border-[#FFE1D7]/50 shadow-sm">
        <div className="relative z-10 h-full flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-[#84AFFB] text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 w-fit shadow-sm">
            Interactive
          </span>
          <h4 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter mb-3">
            Gamified <span className="text-[#0259DD]">Progression</span>
          </h4>
          <p className="text-xm text-slate-600 font-bold max-w-xm leading-relaxed">
            Dapatkan poin, buka lencana eksotis, dan daki leaderboard global saat kamu menaklukkan tantangan matematika.
          </p>
        </div>
        {/* Dekorasi Gambar/Ikon melayang */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:opacity-40 transition-opacity">
          <Trophy size={200} className="rotate-12 text-[#FF6648]" />
        </div>
      </div>

      {/* 2. Adaptive AI (Kecil - Vertikal) */}
      <div className="md:col-span-1 row-span-2 bg-[#0259DD] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg shadow-[#0259DD]/20 flex flex-col justify-end">
        <div className="absolute top-8 left-8 p-3 bg-white/20 rounded-2xl backdrop-blur-md">
          <Sparkles size={28} />
        </div>
        <div className="relative z-10">
          <h4 className="text-4xl font-black uppercase italic tracking-tighter mb-6">Adaptive AI</h4>
          <p className="text-xm text-blue-100 font-bold leading-relaxed">
            Sistem kami menyesuaikan tingkat kesulitan secara real-time. Tidak membosankan, tidak melelahkan.
          </p>
        </div>
      </div>

      {/* 3. Inclusive Design (Kecil) */}
      <div className="md:col-span-1 row-span-1 bg-[#84AFFB]/10 border-2 border-[#84AFFB]/20 rounded-[2.5rem] p-6 flex flex-col justify-center group hover:bg-[#84AFFB]/20 transition-all">
        <div className="flex items-center gap-4 mb-2 text-[#0259DD]">
          <User size={30} />
          <h4 className="text-2xl font-black uppercase italic tracking-tighter">Inklusif</h4>
        </div>
        <p className="text-[13px] text-slate-500 font-bold leading-tight">
          Dukungan multibahasa dan karakter beragam agar semua orang merasa di rumah.
        </p>
      </div>

      {/* 4. Stats Quick View (Kuning/Orange Style) */}
      <div className="md:col-span-2 row-span-1 bg-[#FF6648] rounded-[2.5rem] p-8 flex items-center justify-around text-white shadow-lg shadow-[#FF6648]/20 relative overflow-hidden">
        <div className="text-center relative z-10">
          <p className="text-4xl font-black tracking-tighter">100k+</p>
          <p className="text-[9px] font-black uppercase opacity-80">Questers</p>
        </div>
        <div className="w-[2px] h-10 bg-white/20"></div>
        <div className="text-center relative z-10">
          <p className="text-4xl font-black tracking-tighter">5M+</p>
          <p className="text-[9px] font-black uppercase opacity-80">Solved</p>
        </div>
        <div className="w-[2px] h-10 bg-white/20"></div>
        <div className="text-center relative z-10">
          <p className="text-4xl font-black tracking-tighter">4.9/5</p>
          <p className="text-[9px] font-black uppercase opacity-80">Rating</p>
        </div>
        {/* Ikon Star Melayang */}
        <Star className="absolute right-4 top-[-10px] opacity-10 rotate-12" size={100} fill="white" />
      </div>

    </div>
  </div>
</section>

      {/* --- BAGIAN CARA BERMAIN --- */}
      <section className="py-24 px-8 bg-[#FDFCFB] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 italic font-black uppercase tracking-tight">
            <span className="text-[#FF6648] tracking-[0.3em] text-sm">Panduan Petualang</span>
            <h3 className="text-4xl md:text-5xl text-slate-950 mt-2">8 Langkah Menjadi Juara</h3>
            <div className="w-24 h-2 bg-[#FF6648] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative space-y-12 md:space-y-0">
            
            {/* BARIS 1: Langkah 1-4 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
              {flowSteps.slice(0, 4).map((item, index) => (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center text-center group w-full max-w-xs md:max-w-[22%]">
                    <div className={`w-full h-52 bg-white border-4 ${item.color} rounded-[2.5rem] flex flex-col items-center justify-center p-6 shadow-[0_8px_0_#FFE1D7] group-hover:translate-y-[-8px] group-hover:shadow-[0_12px_0_#FFE1D7] transition-all duration-300 relative overflow-hidden`}>
                      <span className="absolute top-2 left-4 text-5xl font-black text-[#84AFFB]/30 group-hover:text-[#0259DD]/20 transition-colors italic select-none pointer-events-none">
                        {item.step}
                      </span>
                      <div className="text-[#0259DD] mb-3 relative z-10 group-hover:scale-110 transition-transform drop-shadow-sm">
                        {item.icon}
                      </div>
                      <h4 className="font-black text-slate-900 text-xl mb-1 relative z-10 uppercase tracking-tighter leading-none">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-tight px-2 relative z-10">{item.desc}</p>
                    </div>
                  </div>
                  {index < 3 && <Arrow direction="right" />}
                </React.Fragment>
              ))}
            </div>

            {/* PERBAIKAN: Garis Penghubung Snake (U-Turn) */}
            <div className="hidden md:block absolute right-[-15px] top-[140px] w-20 h-32 z-0">
              <div className="w-full h-full border-r-[6px] border-b-[6px] border-[#FFE1D7] rounded-br-[3rem] relative opacity-60">
                <div className="absolute -bottom-7 left-[-15px] rotate-180 scale-75">
                   <Arrow direction="right" />
                </div>
              </div>
            </div>

            {/* BARIS 2: Langkah 8-5 */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 pt-8 md:pt-20 relative">
              {flowSteps.slice(4, 8).map((item, index) => (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center text-center group w-full max-w-xs md:max-w-[22%]">
                    <div className={`w-full h-52 bg-white border-4 ${item.color} rounded-[2.5rem] flex flex-col items-center justify-center p-6 shadow-[0_8px_0_#FFE1D7] group-hover:translate-y-[-8px] group-hover:shadow-[0_12px_0_#FFE1D7] transition-all duration-300 relative overflow-hidden`}>
                      <span className="absolute top-2 left-4 text-5xl font-black text-[#84AFFB]/40 group-hover:text-[#0259DD]/20 transition-colors italic select-none pointer-events-none">
                        {item.step}
                      </span>
                      <div className="text-[#0259DD] mb-3 relative z-10 group-hover:scale-110 transition-transform drop-shadow-sm">
                        {item.icon}
                      </div>
                      <h4 className="font-black text-slate-900 text-xl mb-1 relative z-10 uppercase tracking-tighter leading-none">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-tight px-2 relative z-10">{item.desc}</p>
                    </div>
                  </div>
                  {index < 3 && <Arrow direction="left" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-white py-16 px-8 border-t-8 border-[#0259DD]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-center">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 bg-[#0259DD] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">M</div>
            <h1 className="text-2xl font-black tracking-tighter italic uppercase">MathQuest</h1>
          </div>
          
          <div className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
             Created for Future Heroes
          </div>

          <div className="flex gap-4 justify-center md:justify-end text-[10px] font-black uppercase">
            <span className="hover:text-[#FF6648] cursor-pointer transition-colors">Support</span>
            <span className="hover:text-[#FF6648] cursor-pointer transition-colors">Community</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-[9px] font-bold tracking-[0.2em]">
          &copy; {new Date().getFullYear()} MATH QUEST - ACCESSIBLE & ADAPTIVE LEARNING PROJECT
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;