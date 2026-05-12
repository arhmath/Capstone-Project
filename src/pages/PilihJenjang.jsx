import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Star, BarChart3, Users, Zap, Lock, CheckCircle2, X } from 'lucide-react';

const jenjangData = [
  {
    id: 'SD',
    title: 'Sekolah Dasar',
    subtitle: 'Kelas 1 – 6',
    emoji: '🌱',
    desc: 'Fondasi matematika yang kuat dengan cara yang menyenangkan dan interaktif.',
    color: '#22c55e',
    lightBg: 'bg-green-50',
    border: 'border-green-200',
    textColor: 'text-green-700',
    badgeBg: 'bg-green-100',
    difficulty: 1,
    xpBonus: 500,
    questers: '52.4K',
    badge: 'First Steps',
    materi: ['Penjumlahan & Pengurangan', 'Perkalian Dasar', 'Pembagian Dasar', 'Pecahan Sederhana'],
    stats: [
      { name: 'Aritmatika', value: 80 },
      { name: 'Perkalian', value: 70 },
      { name: 'Pecahan', value: 55 },
    ],
  },
  {
    id: 'SMP',
    title: 'Sekolah Menengah Pertama',
    subtitle: 'Kelas 7 – 9',
    emoji: '⚡',
    desc: 'Eksplorasi aljabar dan geometri dengan tantangan yang semakin seru.',
    color: '#0259DD',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100',
    difficulty: 2,
    xpBonus: 750,
    questers: '38.1K',
    badge: 'Explorer',
    materi: ['Aljabar Linear', 'Himpunan', 'Persamaan Linear', 'Teorema Pythagoras'],
    stats: [
      { name: 'Aljabar', value: 85 },
      { name: 'Geometri', value: 75 },
      { name: 'Statistika', value: 65 },
    ],
  },
  {
    id: 'SMA',
    title: 'Sekolah Menengah Atas',
    subtitle: 'Kelas 10 – 12',
    emoji: '🔥',
    desc: 'Persiapan tingkat lanjut dengan kalkulus, trigonometri, dan matriks.',
    color: '#FF6648',
    lightBg: 'bg-orange-50',
    border: 'border-orange-200',
    textColor: 'text-orange-700',
    badgeBg: 'bg-orange-100',
    difficulty: 3,
    xpBonus: 1000,
    questers: '21.9K',
    badge: 'Champion',
    materi: ['Trigonometri', 'Kalkulus Dasar', 'Logaritma', 'Matriks & Vektor'],
    stats: [
      { name: 'Kalkulus', value: 90 },
      { name: 'Trigonometri', value: 85 },
      { name: 'Matriks', value: 80 },
    ],
  },
];

const DifficultyStars = ({ count }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((i) => (
      <Star
        key={i}
        size={12}
        className={i <= count ? 'text-[#FF6648]' : 'text-slate-200'}
        fill={i <= count ? '#FF6648' : '#e2e8f0'}
      />
    ))}
  </div>
);

const StatBar = ({ name, value, color }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-1.5">
      <span className="text-slate-600">{name}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  </div>
);

const PilihJenjang = () => {
  const navigate = useNavigate();
  const { updateJenjang } = useApp();
  const [selected, setSelected] = useState(null);

  const handleSelect = (jenjang) => {
    setSelected(jenjang);
  };

  const handleConfirm = () => {
    if (!selected) return;
    updateJenjang(selected.id);
    navigate(`/pre-test/${selected.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans py-12 px-6 relative overflow-hidden">
      {/* Dekorasi background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#84AFFB]/8 rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFE1D7]/50 rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          {/* Breadcrumb langkah */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {['Daftar', 'Pilih Jenjang', 'Pre-Test', 'Dashboard'].map((step, i) => (
              <React.Fragment key={step}>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  i === 1
                    ? 'bg-[#0259DD] text-white'
                    : i < 1
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {i < 1 && <CheckCircle2 size={10} />}
                  {step}
                </div>
                {i < 3 && <ChevronRight size={14} className="text-slate-300" />}
              </React.Fragment>
            ))}
          </div>

          <span className="inline-block px-4 py-1 bg-[#FFE1D7] text-[#FF6648] rounded-full text-[10px] font-black mb-4 uppercase tracking-[0.2em]">
            Langkah 2 dari 4
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tight mb-4">
            Pilih <span className="text-[#0259DD] underline decoration-[#FF6648] decoration-4">Jenjangmu</span>
          </h2>
          <p className="text-slate-600 font-bold max-w-md mx-auto leading-relaxed">
            Sesuaikan petualangan dengan tingkat sekolahmu. Setiap jenjang punya quest dan reward eksklusif!
          </p>
        </div>

        {/* ── Grid Kartu Jenjang ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {jenjangData.map((item) => {
            const isSelected = selected?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`bg-white rounded-[2rem] border-4 cursor-pointer transition-all duration-300 overflow-hidden group relative
                  ${isSelected
                    ? 'shadow-2xl -translate-y-2'
                    : 'border-slate-100 hover:border-slate-200 hover:-translate-y-1 hover:shadow-xl shadow-md'
                  }`}
                style={isSelected ? { borderColor: item.color, boxShadow: `0 20px 60px ${item.color}25` } : {}}
              >
                {/* Selected check */}
                {isSelected && (
                  <div
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center z-10"
                    style={{ background: item.color }}
                  >
                    <CheckCircle2 size={16} className="text-white" fill="white" />
                  </div>
                )}

                {/* Header kartu */}
                <div
                  className="p-6 pb-5"
                  style={{ background: `${item.color}12` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      {item.emoji}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color: item.color }}>
                        {item.subtitle}
                      </p>
                      <h3 className="font-black text-slate-900 text-lg leading-tight">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>

                {/* Body kartu */}
                <div className="p-6 pt-5 space-y-4">
                  {/* Difficulty & Questers */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Kesulitan</p>
                      <DifficultyStars count={item.difficulty} />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Questers</p>
                      <div className="flex items-center gap-1">
                        <Users size={11} className="text-slate-400" />
                        <span className="text-xs font-black text-slate-600">{item.questers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Materi */}
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Materi Quest</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.materi.map((m, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold px-2 py-1 rounded-lg"
                          style={{ background: `${item.color}15`, color: item.color }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stat bars */}
                  <div className="space-y-2.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tingkat Kesulitan</p>
                    {item.stats.map((s) => (
                      <StatBar key={s.name} name={s.name} value={s.value} color={item.color} />
                    ))}
                  </div>

                  {/* XP Reward */}
                  <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: item.color }}
                    >
                      <Zap size={14} className="text-white" fill="white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: item.color }}>
                        Bonus Starter
                      </p>
                      <p className="text-xs font-black text-slate-700">
                        +{item.xpBonus.toLocaleString()} XP &bull; Lencana "{item.badge}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Tombol Konfirmasi ── */}
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className={`px-10 py-5 rounded-[2rem] font-black text-xl uppercase italic tracking-tight transition-all flex items-center gap-3
              ${selected
                ? 'bg-[#FF6648] text-white shadow-[0_6px_0_#d14d33] hover:translate-y-[-2px] hover:shadow-[0_8px_0_#d14d33] active:translate-y-1 active:shadow-[0_2px_0_#d14d33]'
                : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
              }`}
          >
            {selected ? (
              <>
                {selected.emoji} Mulai Pre-Test {selected.id}
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <Lock size={20} /> Pilih Jenjang Dulu
              </>
            )}
          </button>
        </div>

        {selected && (
          <p className="text-center text-xs text-slate-400 font-bold mt-4">
            Kamu memilih <span className="text-[#0259DD] font-black">{selected.title}</span> &bull; Pre-Test hanya 3 soal &bull; Tidak sampai 5 menit!
          </p>
        )}
      </div>
    </div>
  );
};

export default PilihJenjang;