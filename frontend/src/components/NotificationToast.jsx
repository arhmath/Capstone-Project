import { useEffect, useState, useRef, useCallback } from 'react';
import { Zap, TrendingUp, Award, Flame, X } from 'lucide-react';

const CONFIGS = {
    xp_gained: {
        icon: <Zap size={24} className="text-yellow-500" fill="#EAB308" />,
        bg: 'bg-yellow-50', border: 'border-yellow-200',
        label: 'XP Diperoleh', labelColor: 'text-yellow-600', barColor: '#EAB308',
    },
    level_up: {
        icon: <TrendingUp size={24} className="text-blue-500" />,
        bg: 'bg-blue-50', border: 'border-blue-200',
        label: 'Level Up! 🎉', labelColor: 'text-blue-600', barColor: '#3B82F6',
    },
    achievement: {
        icon: <Award size={24} className="text-yellow-500" />,
        bg: 'bg-amber-50', border: 'border-amber-200',
        label: 'Achievement Baru!', labelColor: 'text-amber-600', barColor: '#F59E0B',
    },
    streak_updated: {
        icon: <Flame size={24} fill="#FF4B4B" style={{ color: '#FF4B4B' }} />,
        bg: 'bg-red-50', border: 'border-red-200',
        label: 'Streak Bertambah! 🔥', labelColor: 'text-red-600', barColor: '#FF4B4B',
    },
};

const MESSAGES = {
    xp_gained:      (n) => `+${n.xpGained} XP diperoleh! Total: ${n.totalXp} XP`,
    level_up:       (n) => `Naik dari Level ${n.levelBefore} ke Level ${n.levelNow}!`,
    achievement:    (n) => n.achievement?.title ?? 'Achievement baru!',
    streak_updated: (n) => `Streak kamu sekarang ${n.currentStreak} hari!`,
};

const DURATION = 3500;

const NotificationToast = ({ notifications = [], onDone }) => {
    const queueRef = useRef([]);
    const [current, setCurrent] = useState(null);
    const [animating, setAnimating] = useState(false);
    const dismissTimerRef = useRef(null);
    const nextTimerRef = useRef(null);

    useEffect(() => {
        if (notifications.length > 0) {
            queueRef.current = notifications.map((n, i) => ({
                ...n,
                _key: `${Date.now()}-${i}`,
            }));
            showNext();
        }
    }, [notifications]);

    const showNext = useCallback(() => {
        if (queueRef.current.length === 0) {
            setCurrent(null);
            onDone?.();
            return;
        }
        const [next, ...rest] = queueRef.current;
        queueRef.current = rest;
        setCurrent(next);
        setAnimating(true);

        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = setTimeout(() => hide(), DURATION);
    }, [onDone]);

    const hide = useCallback(() => {
        clearTimeout(dismissTimerRef.current);
        setAnimating(false);
        clearTimeout(nextTimerRef.current);
        nextTimerRef.current = setTimeout(() => showNext(), 400);
    }, [showNext]);

    useEffect(() => {
        return () => {
            clearTimeout(dismissTimerRef.current);
            clearTimeout(nextTimerRef.current);
        };
    }, []);

    if (!current) return null;

    const cfg = CONFIGS[current.type] ?? CONFIGS.achievement;

    return (
        <>
            <style>{`
                @keyframes toast-in {
                    from { opacity: 0; transform: translate(-50%, -24px) scale(0.92); }
                    to   { opacity: 1; transform: translate(-50%, 0) scale(1); }
                }
                @keyframes toast-out {
                    from { opacity: 1; transform: translate(-50%, 0) scale(1); }
                    to   { opacity: 0; transform: translate(-50%, -24px) scale(0.92); }
                }
                @keyframes shrink-bar {
                    from { width: 100%; }
                    to   { width: 0%; }
                }
                .toast-enter { animation: toast-in  0.4s cubic-bezier(0.34, 1.4, 0.64, 1) forwards; }
                .toast-exit  { animation: toast-out 0.35s ease forwards; }
                .bar-shrink  { animation: shrink-bar ${DURATION}ms linear forwards; }
            `}</style>

            <div
                className={`fixed top-6 left-1/2 z-[9999] w-[90vw] max-w-sm
                    ${animating ? 'toast-enter' : 'toast-exit'}`}
                style={{ transform: 'translateX(-50%)' }}
            >
                <div className={`relative ${cfg.bg} border-2 ${cfg.border} rounded-3xl shadow-2xl p-5 overflow-hidden`}>
                    <button
                        onClick={hide}
                        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-all z-10"
                    >
                        <X size={14} className="text-slate-400" />
                    </button>

                    <div className="flex items-center gap-4 pr-6">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0">
                            {cfg.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-xs font-black uppercase tracking-wider ${cfg.labelColor} mb-0.5`}>
                                {cfg.label}
                            </p>
                            <p className="font-black text-slate-800 text-sm leading-snug">
                                {MESSAGES[current.type]?.(current)}
                            </p>
                            {current.type === 'achievement' && current.achievement?.description && (
                                <p className="text-xs text-slate-400 mt-1 leading-snug">
                                    {current.achievement.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 h-1 bg-black/10 rounded-full overflow-hidden">
                        <div
                            key={current._key}
                            className="bar-shrink h-full rounded-full"
                            style={{ backgroundColor: cfg.barColor }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationToast;