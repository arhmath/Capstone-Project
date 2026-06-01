import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import ProtectedRoute from './components/ProtectedRoute'; // Tetap di components

// Import dari folder PAGES
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PilihJenjang from './pages/PilihJenjang';
import PreTest from './pages/Pretest';
import ModuleReader from './pages/ModuleReader';
import QuizPage from './pages/QuizPage';
import QuizResultPage from './pages/QuizResultPage';
import TermsAndConditions from './pages/TermsAndConditions';


function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Halaman yang diproteksi */}
          <Route
            path="/pilih-jenjang"
            element={
              <ProtectedRoute>
                <PilihJenjang />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pre-test/:sessionId"
            element={
              <ProtectedRoute>
                <PreTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modules/:moduleId"
            element={<ModuleReader />}
          />
          <Route
            path="/quiz/:quizId"
            element={<QuizPage />}
          />
          <Route
            path="/quiz-result/:sessionId"
            element={<QuizResultPage />}
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;