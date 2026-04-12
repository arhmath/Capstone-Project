import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Award, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const PreTest = () => {
  const { jenjang } = useParams(); // Menangkap SD, SMP, atau SMA
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  // Data Soal Berdasarkan Jenjang
  const questionsData = {
    SD: [
      { q: "Berapakah hasil dari 12 x 5?", options: ["50", "60", "70", "80"], correct: "60", topic: "Perkalian" },
      { q: "Berapakah hasil dari 100 : 4?", options: ["20", "25", "30", "35"], correct: "25", topic: "Pembagian" },
      { q: "Berapakah hasil dari 125 + 75?", options: ["190", "200", "210", "220"], correct: "200", topic: "Penjumlahan" },
    ],
    SMP: [
      { q: "Jika 2x + 5 = 15, berapakah nilai x?", options: ["3", "5", "7", "10"], correct: "5", topic: "Aljabar" },
      { q: "Sebuah segitiga siku-siku memiliki alas 3cm dan tinggi 4cm. Berapakah miringnya?", options: ["5cm", "6cm", "7cm", "8cm"], correct: "5cm", topic: "Pythagoras" },
      { q: "Himpunan penyelesaian dari x < 3 adalah...", options: ["{1,2}", "{3,4}", "{0,1,2,3}", "{...0,1,2}"], correct: "{...0,1,2}", topic: "Himpunan" },
    ],
    SMA: [
      { q: "Turunan pertama dari f(x) = 3x² adalah...", options: ["3x", "6x", "9x", "6"], correct: "6x", topic: "Kalkulus" },
      { q: "Nilai dari sin 90° adalah...", options: ["0", "0.5", "1", "√3"], correct: "1", topic: "Trigonometri" },
      { q: "Logaritma basis 10 dari 1000 adalah...", options: ["1", "2", "3", "4"], correct: "3", topic: "Logaritma" },
    ]
  };

  const currentQuestions = questionsData[jenjang] || questionsData.SD;

  const handleAnswer = (answer) => {
    const isCorrect = answer === currentQuestions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);
    
    setUserAnswers([...userAnswers, { question: currentQuestion, isCorrect, topic: currentQuestions[currentQuestion].topic }]);

    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  // Logika Rekomendasi Adaptif
  const getRecommendation = () => {
    const total = currentQuestions.length;
    const percentage = (score / total) * 100;
    
    if (percentage === 100) return "Luar biasa! Kamu sudah menguasai materi dasar. Kamu bisa langsung mencoba 'Expert Quest'.";
    if (percentage >= 60) return "Bagus! Kamu cukup paham, tapi perlu memperdalam bagian " + userAnswers.find(a => !a.isCorrect)?.topic + ".";
    return "Tetap semangat! Kami merekomendasikanmu untuk mulai dari modul Dasar agar fondasimu lebih kuat.";
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-mq-peach/20 flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full rounded-[3rem] shadow-2xl p-10 text-center border-4 border-white">
          <div className="w-24 h-24 bg-mq-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-mq-primary">
            <Award size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Hasil Pre-Test</h2>
          <p className="text-slate-500 mb-8 font-medium">Jenjang: {jenjang}</p>
          
          <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
            <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">Skor Kamu</p>
            <h3 className="text-6xl font-black text-mq-primary leading-none">{((score/currentQuestions.length)*100).toFixed(0)}</h3>
            <p className="mt-4 text-slate-700 font-semibold italic">"{getRecommendation()}"</p>
          </div>

          <button 
            onClick={() => navigate('/dashboard/quest-map')}
            className="w-full py-4 bg-mq-primary text-white rounded-2xl font-bold text-lg hover:bg-mq-orange transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Masuk ke Dashboard <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mq-peach/20 flex flex-col items-center justify-center p-6">
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-mq-primary">Pre-Test {jenjang}</h2>
          <p className="text-slate-500 font-medium">Pertanyaan {currentQuestion + 1} dari {currentQuestions.length}</p>
        </div>
        <div className="text-right">
          <span className="text-mq-orange font-black text-xl">Math Quest</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl h-3 bg-white rounded-full mb-12 overflow-hidden shadow-sm">
        <div 
          className="h-full bg-mq-primary transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-xl p-10 border border-mq-peach">
        <h3 className="text-2xl font-bold text-slate-800 mb-10 leading-relaxed">
          {currentQuestions[currentQuestion].q}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestions[currentQuestion].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className="group flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-mq-primary hover:bg-mq-blue-light/5 transition-all text-left"
            >
              <span className="font-bold text-slate-700 group-hover:text-mq-primary">{opt}</span>
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-mq-primary flex items-center justify-center">
                 <div className="w-2.5 h-2.5 bg-mq-primary rounded-full opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreTest;