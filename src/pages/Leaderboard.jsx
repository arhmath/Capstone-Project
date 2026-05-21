import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus, AlertCircle, RefreshCw } from 'lucide-react';
import { getLeaderboard } from '../services/leaderboardService';

const AVATAR_BASE = "https://api.dicebear.com/9.x/dylan/svg?seed=";

// Konversi nilai BE → label UI
const EDUCATION_LEVEL_LABEL = {
  primary: 'SD',
  middle: 'SMP',
  high: 'SMA',
};

// Konversi nilai BE (user.jenjang) → value filter FE
const JENJANG_TO_FILTER = {
  primary: 'SD',
  middle: 'SMP',
  high: 'SMA',
};

const RankBadge = ({ rank }) => {
  if (rank === 1) return (
    <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-200">
      <Crown size={20} className="text-yellow-800" fill="currentColor" />
    </div>
  );
  if (rank === 2) return (
    <div className="w-10 h-10 rounded-2xl bg-slate-300 flex items-center justify-center shadow-md">
      <Medal size={20} className="text-slate-600" fill="currentColor" />
    </div>
  );
  if (rank === 3) return (
    <div className="w-10 h-10 rounded-2xl bg-orange-300 flex items-center justify-center shadow-md">
      <Medal size={20} className="text-orange-700" fill="currentColor" />
    </div>
  );
  return (
    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
      <span className="font-black text-slate-500 text-sm">#{rank}</span>
    </div>
  );
};

// Catatan: field `change` tidak tersedia dari API saat ini, disiapkan untuk nanti.
const ChangeIndicator = ({ change }) => {
  if (change > 0) return (
    <div className="flex items-center gap-0.5 text-green-500">
      <TrendingUp size={13} />
      <span className="text-[11px] font-bold">{change}</span>
    </div>
  );
  if (change < 0) return (
    <div className="flex items-center gap-0.5 text-red-400">
      <TrendingDown size={13} />
      <span className="text-[11px] font-bold">{Math.abs(change)}</span>
    </div>
  );
  return <Minus size={13} className="text-slate-300" />;
};

const SkeletonRow = () => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 animate-pulse">
    <div className="w-10 h-10 rounded-2xl bg-slate-200" />
    <div className="w-10 h-10 rounded-xl bg-slate-200" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-3 bg-slate-100 rounded w-1/4" />
    </div>
    <div className="text-right space-y-1">
      <div className="h-4 bg-slate-200 rounded w-16" />
      <div className="h-3 bg-slate-100 rounded w-10" />
    </div>
  </div>
);

const JenjangBadge = ({ educationLevel }) => {
  const label = EDUCATION_LEVEL_LABEL[educationLevel];
  if (!label) return null;
  return (
    <span className="text-[10px] font-bold text-mq-primary bg-blue-50 px-2 py-0.5 rounded-lg">
      {label}
    </span>
  );
};

const Leaderboard = () => {
  const { user } = useApp();

  // Filter default: jenjang user yang login (misal 'SD', 'SMP', 'SMA')
  // Jika user.jenjang tidak dikenali, fallback ke undefined (BE pakai jenjang dari token)
  const defaultFilter = JENJANG_TO_FILTER[user?.jenjang] ?? undefined;
  const [activeFilter, setActiveFilter] = useState(defaultFilter);

  const [leaderboard, setLeaderboard] = useState([]);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { label: 'Semua', value: 'all' },
    { label: 'SD', value: 'SD' },
    { label: 'SMP', value: 'SMP' },
    { label: 'SMA', value: 'SMA' },
  ];

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeaderboard(activeFilter);
      setLeaderboard(data.leaderboard || []);
      setMyRank(data.myRank || null);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat memuat data.');
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const getAvatarUrl = (avatarUrl, name) =>
    avatarUrl || `${AVATAR_BASE}${encodeURIComponent(name || 'User')}`;

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const getPodiumOrder = (list) => {
    if (list.length === 3) return [list[1], list[0], list[2]];
    if (list.length === 2) return [list[1], list[0]];
    return list;
  };

  const getPodiumStyles = (rank, topRank) => {
    const isFirst = rank === topRank;
    if (isFirst) return { height: 'h-32', color: 'bg-yellow-400', text: 'text-yellow-800', border: 'border-yellow-400', size: 'w-20 h-20 md:w-24 md:h-24' };
    if (rank === 2) return { height: 'h-24', color: 'bg-slate-300', text: 'text-slate-600', border: 'border-white', size: 'w-16 h-16 md:w-20 md:h-20' };
    return { height: 'h-16', color: 'bg-orange-300', text: 'text-orange-700', border: 'border-white', size: 'w-16 h-16 md:w-20 md:h-20' };
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Papan Peringkat</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Update setiap hari</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLeaderboard}
            disabled={loading}
            className="p-2 rounded-xl border border-slate-100 bg-white text-slate-400 hover:text-mq-primary hover:border-mq-primary transition-all disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {filters.map(f => (
              <button
                key={f.value ?? 'default'}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeFilter === f.value
                    ? 'bg-mq-primary text-white shadow-lg shadow-blue-200'
                    : 'bg-white text-slate-500 border border-slate-100 hover:border-mq-primary hover:text-mq-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 mb-6">
          <AlertCircle size={20} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-600 font-medium flex-1">{error}</p>
          <button onClick={loadLeaderboard} className="text-xs font-bold text-red-500 hover:text-red-700 underline">
            Coba lagi
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <>
          <div className="bg-gradient-to-br from-[#EEF4FF] to-[#FFE1D7]/40 rounded-[2rem] p-8 mb-8 border border-slate-100 animate-pulse">
            <div className="flex items-end justify-center gap-8">
              {[1, 0, 2].map((i) => (
                <div key={i} className="flex flex-col items-center flex-1 max-w-[120px] gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-2 bg-slate-100 rounded w-1/2" />
                  <div className={`w-full ${i === 0 ? 'h-32' : i === 1 ? 'h-24' : 'h-16'} bg-slate-200 rounded-t-2xl`} />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        </>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {leaderboard.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Trophy size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-bold">Belum ada data leaderboard</p>
              <p className="text-sm mt-1">Jadilah yang pertama masuk papan peringkat!</p>
            </div>
          ) : (
            <>
              {/* PODIUM TOP 3 */}
              {top3.length > 0 && (
                <div className="bg-gradient-to-br from-[#EEF4FF] to-[#FFE1D7]/40 rounded-[2rem] p-8 mb-8 border border-slate-100">
                  <div className="flex items-end justify-center gap-2 md:gap-8">
                    {getPodiumOrder(top3).map((player) => {
                      const styles = getPodiumStyles(player.rank, top3[0].rank);
                      return (
                        <div key={player.userId} className="flex flex-col items-center flex-1 max-w-[120px]">
                          {player.rank === 1 && (
                            <div className="mb-2 animate-bounce">
                              <Crown size={24} className="text-yellow-500" fill="currentColor" />
                            </div>
                          )}
                          <div className={`relative rounded-2xl overflow-hidden border-4 mb-2 shadow-lg transition-all ${styles.border} ${styles.size}`}>
                            <img
                              src={getAvatarUrl(player.avatarUrl, player.name)}
                              alt={player.name}
                              className="w-full h-full object-cover bg-white"
                            />
                          </div>
                          <p className="font-black text-slate-800 text-xs md:text-sm mb-0.5 truncate w-full text-center">
                            {player.name}
                            {player.isMe && <span className="ml-1 text-[10px] text-mq-primary">(Kamu)</span>}
                          </p>
                          <p className="text-[10px] md:text-xs text-mq-orange font-bold mb-1">
                            {player.totalXp.toLocaleString()} XP
                          </p>
                          {/* Jenjang di podium */}
                          <JenjangBadge educationLevel={player.educationLevel} />
                          <div className={`mt-3 w-full ${styles.height} ${styles.color} rounded-t-2xl flex items-center justify-center transition-all duration-700`}>
                            <span className={`font-black text-xl md:text-2xl ${styles.text}`}>{player.rank}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LIST RANK 4+ */}
              {rest.length > 0 && (
                <div className="space-y-3">
                  {rest.map((player) => (
                    <div
                      key={player.userId}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        player.isMe
                          ? 'bg-mq-primary/10 border-2 border-mq-primary'
                          : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm'
                      }`}
                    >
                      <RankBadge rank={player.rank} />

                      <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-slate-50">
                        <img
                          src={getAvatarUrl(player.avatarUrl, player.name)}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`font-bold truncate ${player.isMe ? 'text-mq-primary' : 'text-slate-800'}`}>
                          {player.name}
                          {player.isMe && <span className="ml-2 text-xs font-black text-mq-primary">(Kamu)</span>}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-[10px] md:text-xs text-slate-400 font-medium whitespace-nowrap">
                            Level {player.level}
                          </span>
                          {EDUCATION_LEVEL_LABEL[player.educationLevel] && (
                            <>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span className="text-[10px] font-bold text-mq-primary bg-blue-50 px-2 py-0.5 rounded-lg">
                                {EDUCATION_LEVEL_LABEL[player.educationLevel]}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-black text-slate-800 text-sm md:text-base">
                          {player.totalXp.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">XP</p>
                      </div>

                      <div className="w-6 flex justify-center shrink-0">
                        <ChangeIndicator change={player.change ?? 0} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Posisi user jika tidak masuk top list */}
          {myRank && !myRank.isMe && (
            <div className="mt-6 p-4 rounded-2xl bg-white border-2 border-dashed border-mq-primary/30 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                <span className="font-black text-slate-500 text-sm">#{myRank.rank}</span>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-slate-50">
                <img src={getAvatarUrl(user?.foto, user?.username)} alt="Kamu" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800">
                  {user?.username || 'Petualang'}
                  <span className="ml-2 text-xs font-black text-mq-primary">(Kamu)</span>
                </p>
                <p className="text-xs text-slate-400">Main lagi untuk masuk papan peringkat!</p>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800">{(user?.xp || 0).toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">XP</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;