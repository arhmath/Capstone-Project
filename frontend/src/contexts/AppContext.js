import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Inisialisasi State dari localStorage agar data tidak hilang saat refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mq_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [preTestResult, setPreTestResult] = useState(() => {
    const savedResult = localStorage.getItem('mq_pretest');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: "First Step", icon: "🚀", desc: "Selesaikan Pre-test pertama", unlocked: true },
    { id: 2, title: "Math Warrior", icon: "⚔️", desc: "Selesaikan 10 tantangan", unlocked: false },
    { id: 3, title: "7 Days Streak", icon: "🔥", desc: "Belajar 7 hari berturut-turut", unlocked: false },
  ]);

  // 2. Efek untuk mensinkronkan data ke localStorage setiap ada perubahan
  useEffect(() => {
    if (user) {
      localStorage.setItem('mq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mq_user');
    }
  }, [user]);

  // 3. Fungsi Login
  const login = (userData) => {
    const newUser = {
      username: userData.username || "Petualang",
      email: userData.email,
      foto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
      jenjang: "SD", // Default, nanti diupdate saat pilih jenjang
      xp: 0,
      level: 1,
      rank: "-"
    };
    setUser(newUser);
  };

  // 4. Fungsi Update Jenjang (Dipanggil di PilihJenjang.jsx)
  const updateJenjang = (jenjang) => {
    setUser(prev => ({ ...prev, jenjang }));
  };

  // 5. Fungsi untuk menambah XP
  const addXP = (amount) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  // 6. Fungsi Logout
  const logout = () => {
    setUser(null);
    setPreTestResult(null);
    localStorage.clear(); // Bersihkan semua memori browser
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      login,
      updateJenjang,
      preTestResult, 
      setPreTestResult, 
      achievements, 
      setAchievements,
      addXP,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};