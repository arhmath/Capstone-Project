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

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
            path="/pre-test/:jenjang" 
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
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;