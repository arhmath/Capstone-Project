import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, BarChart3, ChevronRight } from 'lucide-react';

const PilihJenjang = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const jenjangData = [
    {
      id: 'SD',
      title: 'Sekolah Dasar (SD)',
      desc: 'Fondasi matematika dengan cara yang menyenangkan.',
      image: 'https://via.placeholder.com/300x200?text=SD+Illustration', // Ganti dengan aset gambar kamu
      materi: ['Penjumlahan & Pengurangan', 'Perkalian Dasar', 'Pembagian Dasar', 'Pecahan Sederhana'],
      stats: [
        { name: 'Perkalian', difficulty: '80%' },
        { name: 'Pembagian', difficulty: '70%' },
      ]
    },
    {
      id: 'SMP',
      title: 'Sekolah Menengah Pertama (SMP)',
      desc: 'Eksplorasi aljabar dan geometri yang menantang.',
      image: 'https://via.placeholder.com/300x200?text=SMP+Illustration',
      materi: ['Aljabar', 'Himpunan', 'Persamaan Linear', 'Teorema Pythagoras'],
      stats: [
        { name: 'Aljabar', difficulty: '85%' },
        { name: 'Geometri', difficulty: '75%' },
      ]
    },
    {
      id: 'SMA',
      title: 'Sekolah Menengah Atas (SMA)',
      desc: 'Persiapan tingkat lanjut dengan kalkulus dan trigonometri.',
      image: 'https://via.placeholder.com/300x200?text=SMA+Illustration',
      materi: ['Trigonometri', 'Kalkulus Dasar', 'Logaritma', 'Matriks'],
      stats: [
        { name: 'Kalkulus', difficulty: '90%' },
        { name: 'Trigonometri', difficulty: '85%' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-mq-peach/20 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Pilih Jenjang Pendidikan</h2>
          <p className="text-slate-600">Sesuaikan tantangan dengan tingkat sekolahmu saat ini.</p>
        </div>

        {/* Grid Card Landscape */}
        <div className="space-y-6">
          {jenjangData.map((item) => (
            <div 
              key={item.id}
              onClick={() => setSelectedLevel(item)}
              className="bg-white rounded-3xl p-4 flex flex-col md:flex-row items-center gap-8 cursor-pointer border-2 border-transparent hover:border-mq-primary hover:shadow-2xl transition-all group overflow-hidden shadow-lg"
            >
              {/* Image Section */}
              <div className="w-full md:w-72 h-48 bg-slate-100 rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-mq-primary mb-2">{item.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">{item.desc}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-mq-orange font-bold">
                  <span>Lihat Detail Pelajaran</span>
                  <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Pop-up */}
      {selectedLevel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="relative p-8 md:p-10">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedLevel(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-mq-peach rounded-full transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-mq-blue-light/20 rounded-2xl text-mq-primary">
                  <Star fill="currentColor" size={28} />
                </div>
                <h3 className="text-3xl font-black text-slate-900">{selectedLevel.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Deskripsi Materi */}
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-mq-primary" />
                    Apa yang akan kamu pelajari?
                  </h4>
                  <ul className="space-y-3">
                    {selectedLevel.materi.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-600">
                        <div className="w-2 h-2 bg-mq-orange rounded-full" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Statistik Kesulitan */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-mq-primary" />
                    Tingkat Kesulitan
                  </h4>
                  <div className="space-y-5">
                    {selectedLevel.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span>{stat.name}</span>
                          <span className="text-mq-primary">{stat.difficulty}</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-mq-primary rounded-full transition-all duration-1000"
                            style={{ width: stat.difficulty }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => navigate(`/pre-test/${selectedLevel.id}`)}
                className="w-full mt-10 py-4 bg-mq-primary text-white rounded-2xl font-bold text-xl hover:bg-mq-orange shadow-lg shadow-blue-200 hover:shadow-orange-200 transition-all flex items-center justify-center gap-3"
              >
                Mulai Pre-Test Sekarang
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Icon for Modal
const BookOpen = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"/>
  </svg>
);

export default PilihJenjang;