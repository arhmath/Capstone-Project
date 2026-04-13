import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Trophy, Star, Medal, Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const mockPlayers = [
  { rank: 1, username: "ArhamAthillah", xp: 12450, level: 13, jenjang: "SMA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArhamAthillah", streak: 14, change: 0 },
  { rank: 2, username: "NabilaZahira", xp: 11200, level: 12, jenjang: "SMA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NabilaZahira", streak: 9, change: 1 },
  { rank: 3, username: "RafifAldino", xp: 10800, level: 11, jenjang: "SMP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RafifAldino", streak: 7, change: -1 },
  { rank: 4, username: "SalsabilaAyu", xp: 9500, level: 10, jenjang: "SMA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SalsabilaAyu", streak: 5, change: 2 },
  { rank: 5, username: "FarisHakimi", xp: 8750, level: 9, jenjang: "SMP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FarisHakimi", streak: 3, change: -1 },
  { rank: 6, username: "DivaAndini", xp: 7900, level: 8, jenjang: "SD", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DivaAndini", streak: 6, change: 0 },
  { rank: 7, username: "RizkiPratama", xp: 7100, level: 8, jenjang: "SMP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RizkiPratama", streak: 2, change: 3 },
  { rank: 8, username: "AmeliaKusuma", xp: 6500, level: 7, jenjang: "SD", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AmeliaKusuma", streak: 4, change: -2 },
  { rank: 9, username: "BagasWicak", xp: 5800, level: 6, jenjang: "SMA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BagasWicak", streak: 1, change: 0 },
  { rank: 10, username: "CindyPuspita", xp: 5200, level: 6, jenjang: "SMP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CindyPuspita", streak: 8, change: 1 },
];

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

const Leaderboard = () => {
  const { user } = useApp();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const filters = ['Semua', 'SD', 'SMP', 'SMA'];

  const filteredPlayers = activeFilter === 'Semua'
    ? mockPlayers
    : mockPlayers.filter(p => p.jenjang === activeFilter);

  const top3 = filteredPlayers.slice(0, 3);
  const rest = filteredPlayers.slice(3);

  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]
    : top3;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Papan Peringkat</h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Update setiap hari · Minggu ini</p>
        </div>
        {/* Filter */}
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeFilter === f
                  ? 'bg-mq-primary text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-mq-primary hover:text-mq-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* PODIUM TOP 3 */}
      {top3.length >= 3 && (
        <div className="bg-gradient-to-br from-[#EEF4FF] to-[#FFE1D7]/40 rounded-[2rem] p-8 mb-8 border border-slate-100">
          <div className="flex items-end justify-center gap-4">
            {podiumOrder.map((player, idx) => {
              const isFirst = player.rank === 1;
              const podiumHeight = isFirst ? 'h-32' : 'h-20';
              const podiumColor = player.rank === 1 ? 'bg-yellow-400' : player.rank === 2 ? 'bg-slate-300' : 'bg-orange-300';
              const textColor = player.rank === 1 ? 'text-yellow-800' : player.rank === 2 ? 'text-slate-600' : 'text-orange-700';

              return (
                <div key={player.rank} className={`flex flex-col items-center ${isFirst ? 'order-2' : player.rank === 2 ? 'order-1' : 'order-3'}`}>
                  {isFirst && (
                    <div className="mb-2 animate-bounce">
                      <Crown size={24} className="text-yellow-500" fill="currentColor" />
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl overflow-hidden border-4 mb-2 shadow-lg ${
                    player.rank === 1 ? 'border-yellow-400 w-20 h-20' : player.rank === 2 ? 'border-slate-300' : 'border-orange-300'
                  }`}>
                    <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
                  </div>
                  <p className={`font-black text-slate-800 text-sm mb-0.5 ${isFirst ? 'text-base' : ''}`}>{player.username}</p>
                  <p className="text-xs text-mq-orange font-bold">{player.xp.toLocaleString()} XP</p>
                  <div className={`mt-3 w-24 ${podiumHeight} ${podiumColor} rounded-t-2xl flex items-center justify-center`}>
                    <span className={`font-black text-2xl ${textColor}`}>{player.rank}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LIST RANK 4+ */}
      <div className="space-y-3">
        {rest.map((player) => {
          const isCurrentUser = player.username === user?.username;
          return (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                isCurrentUser
                  ? 'bg-mq-primary/10 border-2 border-mq-primary'
                  : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <RankBadge rank={player.rank} />

              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-bold ${isCurrentUser ? 'text-mq-primary' : 'text-slate-800'}`}>
                    {player.username}
                    {isCurrentUser && <span className="ml-2 text-xs font-black text-mq-primary">(Kamu)</span>}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-400 font-medium">Level {player.level}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-xs font-bold text-mq-primary bg-mq-blue-light/20 px-2 py-0.5 rounded-lg">{player.jenjang}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-xs text-orange-400 font-bold">🔥 {player.streak} hari</span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-black text-slate-800">{player.xp.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">XP</p>
              </div>

              <div className="w-8 flex justify-center">
                <ChangeIndicator change={player.change} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Posisi User Sendiri jika tidak ada di list */}
      <div className="mt-6 p-4 rounded-2xl bg-white border-2 border-dashed border-mq-primary/30 flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
          <span className="font-black text-slate-500 text-sm">#{mockPlayers.length + 1}+</span>
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm">
          <img src={user?.foto} alt="You" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-slate-800">{user?.username || 'Petualang'} <span className="text-xs font-black text-mq-primary">(Kamu)</span></p>
          <p className="text-xs text-slate-400">Terus belajar untuk naik peringkat!</p>
        </div>
        <div className="text-right">
          <p className="font-black text-slate-800">{(user?.xp || 0).toLocaleString()}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">XP</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;