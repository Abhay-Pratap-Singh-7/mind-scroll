
import React, { useEffect, useState } from 'react';
import { FeedItemType, AppMode } from '../types';
import { Newspaper, BrainCircuit, Wind, CalendarClock, ShieldAlert, GraduationCap, Gamepad2, Flame, Quote, Hourglass } from 'lucide-react';
import { DoOneThingCard } from './DoOneThingCard';
import { getStats, UserStats } from '../services/statsService';

interface BentoGridProps {
  onSelect: (mode: AppMode) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onSelect }) => {
  const [stats, setStats] = useState<UserStats>(getStats());

  useEffect(() => {
    const handleStorageChange = () => {
      setStats(getStats());
    };
    window.addEventListener('stats-updated', handleStorageChange);
    return () => window.removeEventListener('stats-updated', handleStorageChange);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="h-full w-full overflow-y-auto no-scrollbar flex flex-col items-center py-8 px-6 animate-fade-up">
      
      {/* Header Section */}
      <div className="w-full max-w-lg mb-8 flex flex-col gap-4">
        
        <div className="flex justify-between items-start">
            <div className="relative">
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <h2 className="text-sm font-bold text-neon-blue tracking-widest uppercase mb-1 opacity-80">{getGreeting()}</h2>
                <h1 className="text-4xl font-bold text-white tracking-tight relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">MindScroll</h1>
            </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 text-sm font-medium text-white/60 relative z-10 pl-1">
            <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-white/80">{stats.streak} <span className="text-[10px] uppercase opacity-60">Day Streak</span></span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-green-400" />
                <span className="text-white/80">{stats.minutesSaved}m <span className="text-[10px] uppercase opacity-60">Saved</span></span>
            </div>
             <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span className="text-white/80">{stats.learningMinutes}m <span className="text-[10px] uppercase opacity-60">Learned</span></span>
            </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-lg grid grid-cols-2 gap-4 pb-12 perspective-1000">
        
        {/* App Shield - Hero */}
        <button 
          onClick={() => onSelect(FeedItemType.FOCUS_MODE)}
          className="col-span-2 h-40 relative group overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
            <ShieldAlert className="w-40 h-40 text-red-500/20 transform rotate-12 translate-x-10 -translate-y-4 animate-float-slow" />
          </div>
          
          <div className="relative z-10 w-full">
             <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse-slow">
                <ShieldAlert className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform duration-300" />
             </div>
             <h3 className="text-2xl font-bold text-white">App Shield</h3>
             <p className="text-gray-400 text-xs mt-1 w-full">Block distractions & reclaim your time.</p>
          </div>
          
          <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
             Activate <div className="w-4 h-[1px] bg-red-400"></div>
          </div>
        </button>

        {/* Do One Thing */}
        <DoOneThingCard />

        {/* Plan Day */}
        <button 
          onClick={() => onSelect(FeedItemType.SCHEDULER_INPUT)}
          className="h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-green-500/30"
        >
          <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <CalendarClock className="w-24 h-24 text-green-400 transform -rotate-12 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10">
             <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <CalendarClock className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
             </div>
             <h3 className="text-lg font-bold text-white leading-none mb-1">Plan Day</h3>
             <p className="text-white/40 text-[10px]">AI Scheduler</p>
          </div>
        </button>

        {/* Smart Scroll */}
        <button 
          onClick={() => onSelect(FeedItemType.MICRO_LEARNING)}
          className="h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-pink-500/30"
        >
          <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <GraduationCap className="w-24 h-24 text-pink-400 transform -rotate-12 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10">
             <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
             </div>
             <h3 className="text-lg font-bold text-white leading-none mb-1">Smart Scroll</h3>
             <p className="text-white/40 text-[10px]">Micro-Learning</p>
          </div>
        </button>

        {/* Quiz */}
        <button 
          onClick={() => onSelect(FeedItemType.QUIZ)}
          className="h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-yellow-500/30"
        >
           <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <BrainCircuit className="w-24 h-24 text-yellow-400 transform -rotate-12 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
              <BrainCircuit className="w-6 h-6 text-yellow-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg font-bold text-white leading-none mb-1">Quiz</h3>
            <p className="text-white/40 text-[10px]">Challenge</p>
          </div>
        </button>
        
        {/* Mind Games */}
        <button 
          onClick={() => onSelect(FeedItemType.OFFLINE_GAMES)}
          className="col-span-2 h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:border-neon-green/30"
        >
          <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <Gamepad2 className="w-40 h-40 text-neon-green transform rotate-12 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10 w-full">
             <div className="w-12 h-12 bg-neon-green/10 border border-neon-green/20 rounded-xl flex items-center justify-center mb-4">
                <Gamepad2 className="w-6 h-6 text-neon-green group-hover:scale-110 transition-transform duration-300" />
             </div>
             <h3 className="text-2xl font-bold text-white">Mind Games</h3>
             <p className="text-white/40 text-[10px]">Offline Arcade</p>
          </div>
        </button>

        {/* Section Divider Text */}
        <div className="col-span-2 py-2 mt-2">
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-white/20">Daily Digest</p>
        </div>

        {/* News */}
        <button 
          onClick={() => onSelect(FeedItemType.NEWS)}
          className="col-span-2 h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:border-purple-500/30"
        >
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-500/10 to-transparent"></div>
          <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <Newspaper className="w-40 h-40 text-purple-400 transform -rotate-12 translate-x-2 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10 flex items-start">
             <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
             </div>
          </div>
          <div className="relative z-10 text-left">
            <h3 className="text-2xl font-bold text-white">Curated News</h3>
            <p className="text-white/40 text-[10px]">Read today's top stories</p>
          </div>
        </button>

        {/* Mindfulness */}
        <button 
          onClick={() => onSelect(FeedItemType.MINDFULNESS)}
          className="col-span-2 h-40 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 hover:border-cyan-500/30"
        >
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]"></div>
           <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
            <Wind className="w-40 h-40 text-cyan-400 transform rotate-6 animate-pulse-slow" />
          </div>
          
          <div className="relative z-10 w-full">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
              <Wind className="w-6 h-6 text-cyan-300 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-white">Breathe & Focus</h3>
            <p className="text-white/40 text-[10px]">Mindfulness exercises</p>
          </div>
        </button>

        {/* Footer Wisdom */}
        <div className="col-span-2 mt-8 mb-4 opacity-40 hover:opacity-100 transition-opacity text-center">
            <Quote className="w-4 h-4 text-white/30 mx-auto mb-2" />
            <p className="text-xs italic font-serif text-white/60">"The best way to predict the future is to create it."</p>
        </div>

      </div>
    </div>
  );
};
