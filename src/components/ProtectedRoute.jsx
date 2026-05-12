import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

/**
 * ProtectedRoute berfungsi untuk memproteksi halaman yang membutuhkan autentikasi.
 * Jika user tidak ada di context, arahkan kembali ke login.
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    // Simpan lokasi terakhir agar setelah login bisa diarahkan kembali ke halaman ini
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;