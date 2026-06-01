import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { loginUser, logoutUser, getMe } from '../services/authService';
import { selectEducationLevel } from '../services/educationLevelService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ── STATE ─────────────────────────────────────────────────────────────────

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mq_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [preTestResult, setPreTestResult] = useState(() => {
    try {
      const saved = localStorage.getItem('mq_pretest');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Step', icon: '🚀', desc: 'Selesaikan Pre-test pertama', unlocked: true },
    { id: 2, title: 'Math Warrior', icon: '⚔️', desc: 'Selesaikan 10 tantangan', unlocked: false },
    { id: 3, title: '7 Days Streak', icon: '🔥', desc: 'Belajar 7 hari berturut-turut', unlocked: false },
  ]);

  // Cegah refreshUser duplikat saat mount
  const hasMounted = useRef(false);

  // ── SYNC KE LOCALSTORAGE ──────────────────────────────────────────────────

  useEffect(() => {
    if (user) {
      localStorage.setItem('mq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mq_user');
    }
  }, [user]);

  // Refresh sekali saat app pertama dimuat (bukan setelah login)
  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    const token = localStorage.getItem('mq_token');
    if (token) {
      refreshUser();
    }
  }, []);

  // ── HELPERS ───────────────────────────────────────────────────────────────

  /**
   * Normalisasi data user dari BE ke format FE.
   * Satu sumber kebenaran — tidak ada transformasi di tempat lain.
   */
  const normalizeUser = (beUser) => {
    const latestLevel =
      beUser.userEducationLevels?.[0]?.educationLevel || null;

    return {
      id: beUser.id,
      username: beUser.name,
      email: beUser.email,
      foto:
        beUser.avatarUrl ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(beUser.name)}`,
      xp: beUser.userXp?.totalXp ?? 0,
      level: beUser.userXp?.level ?? 1,
      xpToNext: beUser.userXp?.xpToNextLevel ?? 100,
      streak: beUser.userStreak?.currentStreak ?? 0,
      jenjang: latestLevel,
      rank: beUser.leaderboardRank ?? null,
      totalAchievements: beUser.totalAchievements ?? 0,
    };
  };

  // ── AUTH ──────────────────────────────────────────────────────────────────

  /**
   * Login → simpan token → fetch /me agar data selalu lengkap
   * sebelum komponen pemanggil melakukan navigate().
   */
  const login = async (credentials) => {
    const { user: beUser, token } = await loginUser(credentials);

    // Simpan token lebih dulu supaya refreshUser bisa pakai
    localStorage.setItem('mq_token', token);

    // Set data awal dari response login (cepat)
    setUser(normalizeUser(beUser));

    // Fetch /me untuk data yang paling lengkap & up-to-date
    // (XP, streak, rank, dll. mungkin sudah berubah sejak token diterbitkan)
    try {
      const freshBeUser = await getMe();
      setUser(normalizeUser(freshBeUser));
    } catch {
      // Jika /me gagal, data dari login tetap cukup untuk lanjut
    }

    return { user: beUser, token };
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Abaikan error dari BE
    }
    setUser(null);
    setPreTestResult(null);
    localStorage.removeItem('mq_token');
    localStorage.removeItem('mq_user');
    localStorage.removeItem('mq_pretest');
  };

  // ── USER MUTATIONS ────────────────────────────────────────────────────────

  const updateJenjang = async (educationLevel) => {
    await selectEducationLevel(educationLevel);
    setUser((prev) => ({ ...prev, jenjang: educationLevel }));
  };

  /**
   * Sinkronisasi XP dari respons BE (misal setelah selesai quiz).
   */
  const syncXpFromBE = (userXpFromBE) => {
    setUser((prev) => ({
      ...prev,
      xp: userXpFromBE.totalXp,
      level: userXpFromBE.level,
      xpToNext: userXpFromBE.xpToNextLevel,
    }));
  };

  /**
   * Tambah XP secara optimistis (tanpa menunggu BE).
   * Gunakan syncXpFromBE setelahnya untuk sinkronisasi.
   */
  const addXP = (amount) => {
    setUser((prev) => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  /**
   * Ambil ulang data user dari BE.
   * Dipanggil otomatis saat mount (jika ada token) atau manual dari komponen.
   */
  const refreshUser = async () => {
    try {
      const beUser = await getMe();
      setUser(normalizeUser(beUser));
    } catch (err) {
      if (err?.status === 401) logout();
    }
  };

  const updateUserStats = (userXp) => {
    if (!userXp) return;
    setUser(prev => ({
      ...prev,
      xp: userXp.totalXp,
      level: userXp.level,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateJenjang,
        preTestResult,
        setPreTestResult,
        achievements,
        setAchievements,
        addXP,
        syncXpFromBE,
        refreshUser,
        updateUserStats,
        normalizeUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};