import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronDown, ChevronUp,
  Shield, BookOpen, Trophy, Users, AlertTriangle,
  Zap, Lock, RefreshCw, Mail, CheckCircle2
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'acceptance',
    icon: <CheckCircle2 size={20} />,
    color: '#0259DD',
    colorLight: '#EEF4FF',
    title: '1. Penerimaan Syarat',
    content: [
      'Dengan mendaftar, mengakses, atau menggunakan MathQuest, kamu menyatakan bahwa kamu telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini.',
      'Jika kamu berusia di bawah 13 tahun, penggunaan aplikasi ini harus dengan persetujuan orang tua atau wali. Jika berusia antara 13–17 tahun, orang tua atau wali kamu harus menyetujui syarat ini atas namamu.',
      'MathQuest berhak mengubah syarat ini sewaktu-waktu. Perubahan akan diumumkan melalui notifikasi dalam aplikasi. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuanmu.',
    ],
  },
  {
    id: 'account',
    icon: <Users size={20} />,
    color: '#FF6648',
    colorLight: '#FFF3F0',
    title: '2. Akun & Keamanan',
    content: [
      'Kamu wajib menyediakan informasi yang akurat, lengkap, dan terkini saat mendaftarkan akun. Penggunaan informasi palsu dapat mengakibatkan pembekuan akun.',
      'Kamu bertanggung jawab atas kerahasiaan kata sandi dan seluruh aktivitas yang terjadi di bawah akunmu. Segera beritahu kami jika terjadi akses tidak sah ke akunmu.',
      'Dilarang membuat lebih dari satu akun, berbagi akun dengan orang lain, atau menggunakan akun orang lain tanpa izin. Pelanggaran ini dapat mengakibatkan penghapusan akun permanen.',
      'Nama pengguna yang mengandung kata-kata kasar, diskriminatif, atau menyinggung tidak diperbolehkan dan dapat dihapus tanpa pemberitahuan.',
    ],
  },
  {
    id: 'content',
    icon: <BookOpen size={20} />,
    color: '#58CC02',
    colorLight: '#F0FFF4',
    title: '3. Konten & Penggunaan',
    content: [
      'Seluruh konten dalam MathQuest — termasuk materi pelajaran, soal latihan, ilustrasi, dan elemen gamifikasi — adalah milik MathQuest dan dilindungi hak cipta.',
      'Kamu diberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk menggunakan aplikasi ini hanya untuk keperluan belajar pribadi dan non-komersial.',
      'Dilarang menyalin, mereproduksi, mendistribusikan, memodifikasi, atau menjual konten apa pun dari MathQuest tanpa izin tertulis dari kami.',
      'Kamu tidak boleh menggunakan teknik rekayasa balik, scraping data, atau metode otomatis lainnya untuk mengekstrak konten dari platform kami.',
    ],
  },
  {
    id: 'gamification',
    icon: <Trophy size={20} />,
    color: '#FFD700',
    colorLight: '#FFFBEB',
    title: '4. Sistem Gamifikasi & XP',
    content: [
      'Poin XP, level, streak, badge, dan peringkat leaderboard adalah penghargaan virtual dalam sistem gamifikasi MathQuest yang tidak memiliki nilai moneter di dunia nyata.',
      'MathQuest berhak menyesuaikan, mereset, atau mengubah sistem poin dan reward kapan saja demi keseimbangan pengalaman belajar tanpa kompensasi.',
      'Dilarang keras melakukan kecurangan untuk mendapatkan XP atau naik peringkat, termasuk menggunakan bot, script otomatis, atau eksploitasi celah sistem. Akun yang terbukti curang akan dihapus permanen.',
      'Peringkat leaderboard bersifat dinamis dan diperbarui secara berkala. MathQuest tidak bertanggung jawab atas perubahan peringkat yang disebabkan oleh pembaruan sistem.',
    ],
  },
  {
    id: 'privacy',
    icon: <Lock size={20} />,
    color: '#8B5CF6',
    colorLight: '#F5F3FF',
    title: '5. Privasi & Data',
    content: [
      'Kami mengumpulkan data yang diperlukan untuk menyediakan layanan, termasuk nama, email, progres belajar, dan data penggunaan aplikasi. Data ini digunakan untuk personalisasi pengalaman belajarmu.',
      'Kami tidak akan menjual data pribadimu kepada pihak ketiga untuk tujuan pemasaran. Data dapat dibagikan kepada mitra teknologi yang membantu operasional layanan kami, dengan kewajiban kerahasiaan yang ketat.',
      'Kamu berhak meminta akses, koreksi, atau penghapusan data pribadimu dengan menghubungi tim kami. Permintaan penghapusan akan diproses dalam 30 hari kerja.',
      'Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna. Kamu dapat menonaktifkan cookie melalui pengaturan browser, namun ini mungkin mempengaruhi fungsionalitas aplikasi.',
    ],
  },
  {
    id: 'conduct',
    icon: <Shield size={20} />,
    color: '#EC4899',
    colorLight: '#FFF0F6',
    title: '6. Perilaku Pengguna',
    content: [
      'MathQuest adalah platform belajar yang aman dan inklusif. Segala bentuk pelecehan, intimidasi, ujaran kebencian, atau diskriminasi berdasarkan ras, agama, gender, atau latar belakang lainnya tidak akan ditoleransi.',
      'Dilarang mengunggah, mengirim, atau berbagi konten yang bersifat berbahaya, tidak pantas, atau melanggar hukum. Pelanggaran akan dilaporkan kepada pihak berwenang jika diperlukan.',
      'Jika kamu menemukan pelanggaran atau konten yang tidak pantas, harap laporkan kepada kami melalui fitur laporan yang tersedia. Laporan akan ditindaklanjuti dalam 48 jam.',
    ],
  },
  {
    id: 'liability',
    icon: <AlertTriangle size={20} />,
    color: '#F59E0B',
    colorLight: '#FFFBEB',
    title: '7. Batasan Tanggung Jawab',
    content: [
      'MathQuest disediakan "sebagaimana adanya" (as-is). Kami tidak menjamin bahwa layanan akan bebas dari gangguan, error, atau keamanan data yang sempurna, namun kami berkomitmen untuk terus meningkatkan kualitas layanan.',
      'Kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan MathQuest.',
      'Konten edukatif yang disediakan bertujuan sebagai suplemen belajar dan tidak menggantikan bimbingan guru atau tenaga pendidik profesional.',
      'MathQuest tidak bertanggung jawab atas konten pihak ketiga yang mungkin dapat diakses melalui tautan dalam aplikasi kami.',
    ],
  },
  {
    id: 'updates',
    icon: <RefreshCw size={20} />,
    color: '#06B6D4',
    colorLight: '#ECFEFF',
    title: '8. Pembaruan & Penghentian',
    content: [
      'Kami berhak memperbarui, memodifikasi, atau menghentikan fitur apa pun kapan saja. Kami akan memberikan pemberitahuan wajar untuk perubahan signifikan yang mempengaruhi pengalaman pengguna.',
      'Kami berhak menangguhkan atau menghapus akun yang melanggar syarat ini tanpa pemberitahuan sebelumnya. Keputusan ini bersifat final dan tidak dapat digugat.',
      'Jika kamu ingin menghapus akunmu, kamu dapat melakukannya melalui pengaturan profil atau dengan menghubungi tim dukungan kami.',
    ],
  },
  {
    id: 'contact',
    icon: <Mail size={20} />,
    color: '#0259DD',
    colorLight: '#EEF4FF',
    title: '9. Hubungi Kami',
    content: [
      'Jika kamu memiliki pertanyaan, kekhawatiran, atau keluhan terkait Syarat & Ketentuan ini atau layanan kami, silakan hubungi tim kami.',
      'Email: support@mathquest.id',
      'Waktu respons: 1–3 hari kerja',
      'Syarat & Ketentuan ini berlaku sejak 1 Januari 2025 dan diperbarui terakhir pada 31 Mei 2026.',
    ],
  },
];

const AccordionSection = ({ section, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-[1.5rem] overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? `2px solid ${section.color}40` : '2px solid #F1F5F9',
        background: isOpen ? section.colorLight : '#fff',
        boxShadow: isOpen ? `0 8px 24px ${section.color}15` : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left transition-all"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all"
          style={{
            background: isOpen ? section.color : '#F1F5F9',
            color: isOpen ? 'white' : '#94A3B8',
          }}
        >
          {section.icon}
        </div>
        <h3
          className="flex-1 font-black text-base uppercase tracking-tight"
          style={{ color: isOpen ? section.color : '#334155' }}
        >
          {section.title}
        </h3>
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all"
          style={{ background: isOpen ? `${section.color}20` : '#F1F5F9' }}
        >
          {isOpen
            ? <ChevronUp size={16} style={{ color: section.color }} />
            : <ChevronDown size={16} className="text-slate-400" />
          }
        </div>
      </button>

      {/* Content */}
      <div
        style={{ height, overflow: 'hidden', transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div
            className="h-px mb-5"
            style={{ background: `${section.color}30` }}
          />
          <ul className="space-y-3">
            {section.content.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                  style={{ background: section.color }}
                />
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = (id) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }} className="min-h-screen bg-[#F0F5FF]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,800;1,900&display=swap');

        .terms-body { font-family: 'Nunito', sans-serif; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.6s ease forwards; }

        @keyframes badge-in {
          from { opacity: 0; transform: scale(0.8) rotate(-6deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-badge-in { animation: badge-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards 0.3s; opacity: 0; }

        .checkbox-custom {
          appearance: none;
          width: 22px;
          height: 22px;
          border: 2.5px solid #0259DD;
          border-radius: 7px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          background: white;
          flex-shrink: 0;
        }
        .checkbox-custom:checked {
          background: #0259DD;
          border-color: #0259DD;
        }
        .checkbox-custom:checked::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 2px;
          width: 6px;
          height: 11px;
          border: 2.5px solid white;
          border-top: none;
          border-left: none;
          transform: rotate(45deg);
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 14px;
          background: white;
          border: 2px solid #E2E8F0;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 13px;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .btn-back:hover {
          border-color: #0259DD;
          color: #0259DD;
          transform: translateX(-2px);
        }

        .btn-agree {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          background: #0259DD;
          color: white;
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 16px;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          border: none;
          cursor: pointer;
          box-shadow: 0 5px 0 #013ca3;
          transition: all 0.15s;
        }
        .btn-agree:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 7px 0 #013ca3;
        }
        .btn-agree:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #013ca3;
        }
        .btn-agree:disabled {
          background: #E2E8F0;
          color: #94A3B8;
          box-shadow: 0 3px 0 #CBD5E1;
          cursor: not-allowed;
        }

        .section-nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transition: all 0.2s;
          cursor: pointer;
          flex-shrink: 0;
        }

        .sticky-nav {
          transition: all 0.3s;
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav
        className="sticky-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '2px solid #FFE1D7' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <button className="btn-back" onClick={() => navigate(-1)}>
          <ChevronLeft size={16} />
          Kembali
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontStyle: 'italic',
              fontWeight: 900,
              width: 36,
              height: 36,
              background: '#0259DD',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 18,
              boxShadow: '0 3px 0 #013ca3',
            }}
          >
            M
          </div>
          <h1
            style={{ fontFamily: "'Nunito', sans-serif", fontStyle: 'italic', fontWeight: 900, fontSize: 18 }}
            className="text-[#0259DD] tracking-tighter uppercase hidden sm:block"
          >
            MathQuest
          </h1>
        </div>

        <div className="w-[90px] sm:w-[120px]" /> {/* Spacer */}
      </nav>

      {/* ── HERO HEADER ── */}
      <div
        className="relative pt-28 pb-14 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0F1B36 0%, #0F2554 55%, #0E3275 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -60, left: -60, width: 260, height: 260, background: 'rgba(255,107,53,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 30, right: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="animate-badge-in inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-5"
            style={{ background: 'rgba(255,107,53,0.15)', color: '#FF9A70', border: '1px solid rgba(255,107,53,0.2)' }}
          >
            <Shield size={12} />
            Dokumen Legal
          </div>

          <h1
            className="animate-fade-up font-black uppercase italic tracking-tight mb-4 text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1 }}
          >
            Syarat &{' '}
            <span style={{ color: '#FF9A70', textDecoration: 'underline', textDecorationColor: '#FF6B35', textDecorationThickness: 4 }}>
              Ketentuan
            </span>
          </h1>

          <p
            className="animate-fade-up text-sm font-bold leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto', animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Baca dan pahami syarat penggunaan MathQuest sebelum memulai petualanganmu. Dengan menggunakan layanan kami, kamu menyetujui seluruh ketentuan berikut.
          </p>

          {/* Stats bar */}
          <div
            className="animate-fade-up flex items-center justify-center gap-6 mt-8"
            style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {[
              { value: '9', label: 'Bagian' },
              { value: '31 Mei 2026', label: 'Diperbarui' },
              { value: 'v2.0', label: 'Versi' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: 'white', fontSize: 16, margin: 0 }}>{stat.value}</p>
                <p style={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {/* Quick nav */}
        <div
          className="bg-white rounded-[1.5rem] p-5 mb-8 border-2 border-slate-100"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Daftar Isi
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setOpenSection(s.id)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ background: s.colorLight }}
              >
                <span style={{ color: s.color, flexShrink: 0 }}>{s.icon}</span>
                <span style={{ fontWeight: 800, fontSize: 12, color: '#334155' }}>{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3 mb-10">
          {SECTIONS.map((section) => (
            <AccordionSection
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => handleToggle(section.id)}
            />
          ))}
        </div>

        {/* Agreement card */}
        <div
          className="rounded-[2rem] p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, #EEF4FF, #FFF5F0)',
            border: '2px solid #DBEAFE',
            boxShadow: '0 8px 32px rgba(2,89,221,0.08)',
          }}
        >
          <div className="flex items-start gap-4 mb-2">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: '#0259DD' }}
            >
              <Zap size={22} color="white" fill="white" />
            </div>
            <div>
              <h3
                style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 18, color: '#0F172A', margin: '0 0 4px' }}
                className="uppercase italic tracking-tight"
              >
                Siap Mulai Petualangan?
              </h3>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#64748B', margin: 0 }}>
                Centang kotak di bawah untuk menyatakan persetujuanmu.
              </p>
            </div>
          </div>

          <div
            className="my-5 h-px"
            style={{ background: 'linear-gradient(to right, #DBEAFE, transparent)' }}
          />

          {/* Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group mb-6">
            <input
              type="checkbox"
              className="checkbox-custom mt-0.5"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span style={{ fontWeight: 700, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
              Saya telah membaca, memahami, dan <strong style={{ color: '#0259DD' }}>menyetujui</strong> seluruh Syarat & Ketentuan MathQuest, termasuk{' '}
              <strong style={{ color: '#0259DD' }}>Kebijakan Privasi</strong> yang berlaku.
            </span>
          </label>

          <button
            className="btn-agree"
            disabled={!agreed}
            onClick={() => navigate(-1)}
          >
            <CheckCircle2 size={20} />
            {agreed ? 'Setuju & Kembali' : 'Centang untuk Melanjutkan'}
          </button>

          <p style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', textAlign: 'center', marginTop: 14, lineHeight: 1.6 }}>
            Pertanyaan? Hubungi kami di{' '}
            <a href="mailto:support@mathquest.id" style={{ color: '#0259DD' }}>
              support@mathquest.id
            </a>
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="text-center py-10 px-6 mt-2"
        style={{ borderTop: '4px solid #0259DD', background: '#0F172A' }}
      >
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: 'rgba(255,255,255,0.3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
          &copy; {new Date().getFullYear()} MATHQUEST — ACCESSIBLE & ADAPTIVE LEARNING
        </p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;