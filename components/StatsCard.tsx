
import React, { useEffect, useState } from 'react';
import { getStats, UserStats } from '../services/statsService';
import { Hourglass, Flame, BrainCircuit } from 'lucide-react';

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(getStats());

  useEffect(() => {
    const handleStorageChange = () => {
      setStats(getStats());
    };

    // Listen for custom event dispatch from service
    window.addEventListener('stats-updated', handleStorageChange);
    return () => window.removeEventListener('stats-updated', handleStorageChange);
  }, []);

  return (
    <div className="w-full col-span-2 mb-2 animate-fade-up">
        <div className="flex justify-between gap-2">
            {/* Life Saved */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1 text-green-400">
                    <Hourglass className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Life Saved</span>
                </div>
                <span className="text-xl font-mono font-bold text-white">{stats.minutesSaved}m</span>
            </div>

            {/* Streak */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1 text-orange-400">
                    <Flame className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Streak</span>
                </div>
                <span className="text-xl font-mono font-bold text-white">{stats.streak} <span className="text-xs text-white/50 font-sans">days</span></span>
            </div>

             {/* Learning */}
             <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1 text-purple-400">
                    <BrainCircuit className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Learned</span>
                </div>
                <span className="text-xl font-mono font-bold text-white">{stats.learningMinutes}m</span>
            </div>
        </div>
    </div>
  );
};
