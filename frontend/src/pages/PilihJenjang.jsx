import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Star, CheckCircle2, Sword, Zap, Shield } from 'lucide-react';
import { createPretestSession } from '../services/pretestService';

// ── Import gambar hero ───────────────────────────────────────────────────────
import imgSD from '../assets/SD.jpg';
import imgSMP from '../assets/SMP.jpg';
import imgSMA from '../assets/SMA.jpg';

// ─── DATA JENJANG ─────────────────────────────────────────────────────────────
const jenjangData = [
  {
    id: 'primary',
    label: 'SD',
    title: 'Sekolah Dasar',
    subtitle: 'Kelas 1 – 6',
    classLabel: 'SD',
    classIcon: <Sword size={12} />,
    img: imgSD,
    color: '#E53935',
    colorLight: '#fff8f7',
    difficulty: 1,
    xpBonus: 500,
    badge: 'First Steps',
    materi: ['Penjumlahan & Pengurangan', 'Perkalian Dasar', 'Pembagian Dasar', 'Pecahan Sederhana'],
  },
  {
    id: 'middle',
    label: 'SMP',
    title: 'Sekolah Menengah Pertama',
    subtitle: 'Kelas 7 – 9',
    classLabel: 'SMP',
    classIcon: <Zap size={12} />,
    img: imgSMP,
    color: '#0259DD',
    colorLight: '#f7f9ff',
    difficulty: 2,
    xpBonus: 750,
    badge: 'Explorer',
    materi: ['Aljabar Linear', 'Himpunan', 'Persamaan Linear', 'Teorema Pythagoras'],
  },
  {
    id: 'high',
    label: 'SMA',
    title: 'Sekolah Menengah Atas',
    subtitle: 'Kelas 10 – 12',
    classLabel: 'SMA',
    classIcon: <Shield size={12} />,
    img: imgSMA,
    color: '#616161',
    colorLight: '#f8f8f8',
    difficulty: 3,
    xpBonus: 1000,
    badge: 'Champion',
    materi: ['Trigonometri', 'Kalkulus Dasar', 'Logaritma', 'Matriks & Vektor'],
  },
];

// ─── HERO CARD ────────────────────────────────────────────────────────────────
const HeroCard = ({ jenjang, isSelected, onClick }) => (
  <div
    onClick={onClick}
    className="flex-1 cursor-pointer group"
    style={{ minWidth: 0 }}
  >
    {/* Image frame — sama persis referensi: border oranye saat selected */}
    <div
      className="relative rounded-[1.4rem] overflow-hidden transition-all duration-300"
      style={{
        border: isSelected ? `3px solid ${jenjang.color}` : '3px solid transparent',
        boxShadow: isSelected
          ? `0 0 0 1px ${jenjang.color}33`
          : '0 2px 14px rgba(0,0,0,0.08)',
        background: '#fff',
        transform: isSelected ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={jenjang.img}
          alt={jenjang.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Class badge bottom-left — persis referensi */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
        style={{ backgroundColor: jenjang.color }}
      >
        <span className="text-white">{jenjang.classIcon}</span>
        <span className="text-white font-black text-[10px] uppercase tracking-widest">{jenjang.classLabel}</span>
      </div>
    </div>

    {/* Label bawah — persis referensi */}
    <div className="mt-3 text-center">
      <p className="font-black text-slate-800 text-sm uppercase tracking-wide">{jenjang.label}</p>
      <div className="flex justify-center gap-0.5 mt-1">
        {[1, 2, 3, 4, 5].map(s => (
          <Star
            key={s}
            size={12}
            style={{ color: s <= 4 ? '#FF9800' : '#e2e8f0' }}
            fill={s <= 4 ? '#FF9800' : '#e2e8f0'}
          />
        ))}
      </div>
    </div>
  </div>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const PilihJenjang = () => {
  const navigate = useNavigate();
  const { updateJenjang } = useApp();
  const [selected, setSelected] = useState(jenjangData[0]);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // update global state + select education level
      await updateJenjang(selected.id);

      // create pretest session
      const session = await createPretestSession(
        selected.id
      );

      // redirect menggunakan sessionId
      navigate(`/pre-test/${session.id}`);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: '#FAF7F4' }}>

      {/* ── HEADER ── */}
      <div className="text-center pt-10 pb-6 px-4">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tight mb-1">
          PILIH <span className="text-[#FF6648]">JENJANGMU</span>
        </h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Silahkan Pilih Jenjang Pendidikan yang Ingin Kamu Pelajari
        </p>
      </div>

      {/* ── HERO CARDS — sama lebar dengan panel bawah ── */}
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 mb-8">
        <div className="flex gap-6 md:gap-10">
          {jenjangData.map(j => (
            <HeroCard
              key={j.id}
              jenjang={j}
              isSelected={selected.id === j.id}
              onClick={() => setSelected(j)}
            />
          ))}
        </div>
      </div>

      {/* ── DETAIL PANEL — rounded, ada padding kiri kanan, persis referensi ── */}
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 pb-12">
        <div
          key={selected.id}
          className="w-full rounded-[2rem] overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 4px 40px rgba(0,0,0,0.07)',
          }}
        >
          <div className="flex">

            {/* LEFT: info */}
            <div className="flex-1 px-8 md:px-12 py-10">

              {/* Tags — persis referensi */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <span
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: selected.color }}
                >
                  {selected.classIcon} CLASS: {selected.classLabel}
                </span>
                <span
                  className="flex items-center px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider border"
                  style={{ color: selected.color, borderColor: selected.color + '44', backgroundColor: selected.color + '0a' }}
                >
                  ISLAND: {selected.label}
                </span>
              </div>

              {/* Big title — persis referensi */}
              <h2 className="font-black uppercase tracking-tight mb-4 leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                <span className="text-slate-900">{selected.classLabel}</span>{' '}
                <span className="text-slate-300">PATH</span>
              </h2>

              {/* Materi */}
              <div className="mb-7">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                  Materi yang akan dipelajari
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.materi.map((m, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl"
                      style={{ backgroundColor: selected.color + '12', color: selected.color }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                        style={{ backgroundColor: selected.color }}
                      >
                        {i + 1}
                      </span>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Difficulty stars */}
              <div className="mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                  Tingkat Kesulitan
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map(s => (
                    <Star
                      key={s}
                      size={24}
                      style={{ color: s <= selected.difficulty ? selected.color : '#e2e8f0' }}
                      fill={s <= selected.difficulty ? selected.color : '#e2e8f0'}
                    />
                  ))}
                  <span className="text-sm font-black ml-1" style={{ color: selected.color }}>
                    {['', 'Mudah', 'Sedang', 'Sulit'][selected.difficulty]}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleConfirm} disabled={loading}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wider text-white transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: '#FF6648',
                  boxShadow: '0 5px 0 #c94e35',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 7px 0 #c94e35'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 5px 0 #c94e35'}
                onMouseDown={e => { e.currentTarget.style.boxShadow = '0 2px 0 #c94e35'; e.currentTarget.style.transform = 'translateY(3px)'; }}
                onMouseUp={e => { e.currentTarget.style.boxShadow = '0 5px 0 #c94e35'; e.currentTarget.style.transform = 'none'; }}
              >
                {
                  loading
                    ? 'Memulai...'
                    : `Mulai Pre-Test ${selected.label}`
                }
              </button>

              <p className="mt-3 text-[10px] text-slate-400 font-bold">
                Hanya 3 soal · Tidak sampai 5 menit
              </p>
            </div>

            {/* RIGHT: hero image besar — persis referensi, tidak ada border/rounded ketat */}
            <div
              className="hidden md:block relative overflow-hidden shrink-0"
              style={{ width: '38%', minHeight: 380 }}
            >
              <img
                src={selected.img}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500"
              />
              {/* gradient fade ke kiri biar nyambung dengan konten */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #fff, transparent)' }}
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PilihJenjang;