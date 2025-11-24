
import React, { useState, useEffect } from 'react';
import { FocusModeData } from '../types';
import { Shield, Lock, Smartphone, Check, AlertTriangle, Instagram, Twitter, Facebook, Youtube, Music, Ghost, Zap, CheckCircle2 } from 'lucide-react';
import { addMinutesSaved } from '../services/statsService';
import { DO_ONE_THING_TASKS } from '../constants';
import { playUISound } from '../utils/audio';

interface FocusModeCardProps {
  data: FocusModeData;
  onRequestTrade?: () => void; // Callback to App to trigger trade
}

const DURATIONS = [15, 30, 45, 60];

export const FocusModeCard: React.FC<FocusModeCardProps> = ({ data, onRequestTrade }) => {
  const [isActive, setIsActive] = useState(false);
  const [blockedApps, setBlockedApps] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [mission, setMission] = useState<string | null>(null);

  // Initialize logic: Check if a session is already running
  useEffect(() => {
    const savedEnd = localStorage.getItem('mindscroll_focus_end');
    const savedApps = localStorage.getItem('mindscroll_blocked_apps');

    if (savedEnd) {
        const endTime = parseInt(savedEnd, 10);
        const now = Date.now();
        if (endTime > now) {
            setIsActive(true);
            setTimeLeft(Math.ceil((endTime - now) / 1000));
            if (savedApps) {
                setBlockedApps(JSON.parse(savedApps));
            }
        } else {
            // Expired while closed
            localStorage.removeItem('mindscroll_focus_end');
            localStorage.removeItem('mindscroll_blocked_apps');
        }
    }
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
        interval = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Timer finished gracefully
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleApp = (app: string) => {
    if (isActive) return;
    if (blockedApps.includes(app)) {
      setBlockedApps(blockedApps.filter(a => a !== app));
    } else {
      setBlockedApps([...blockedApps, app]);
    }
  };

  const handleActivate = () => {
    if (blockedApps.length === 0) return;
    
    const durationSeconds = selectedDuration * 60;
    const endTime = Date.now() + (durationSeconds * 1000);

    // Persistence Logic
    localStorage.setItem('mindscroll_focus_end', endTime.toString());
    localStorage.setItem('mindscroll_blocked_apps', JSON.stringify(blockedApps));

    setTimeLeft(durationSeconds);
    setIsActive(true);
  };

  const handleFinish = () => {
      // Add minutes saved to stats
      const duration = selectedDuration; // Approximate, assuming they finished the block
      addMinutesSaved(duration);

      setIsActive(false);
      localStorage.removeItem('mindscroll_focus_end');
      localStorage.removeItem('mindscroll_blocked_apps');
      setBlockedApps([]);
  };

  const handleDeactivate = () => {
    // Early exit
    setIsActive(false);
    localStorage.removeItem('mindscroll_focus_end');
    localStorage.removeItem('mindscroll_blocked_apps');
    setBlockedApps([]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Simulate trying to open a blocked app
  const handleSimulateAppOpen = (app: string) => {
     const randomTask = DO_ONE_THING_TASKS[Math.floor(Math.random() * DO_ONE_THING_TASKS.length)];
     setMission(randomTask);
     setShowTradeModal(true);
     playUISound('error');
  };

  const handleMissionComplete = () => {
      playUISound('success');
      setShowTradeModal(false);
      setMission(null);
      if(onRequestTrade) onRequestTrade();
  };

  const getAppIcon = (appName: string) => {
      const lower = appName.toLowerCase();
      if (lower.includes('instagram')) return Instagram;
      if (lower.includes('twitter') || lower.includes('/x')) return Twitter;
      if (lower.includes('facebook')) return Facebook;
      if (lower.includes('youtube')) return Youtube;
      if (lower.includes('tiktok')) return Music; // Use Music for TikTok
      if (lower.includes('snapchat')) return Ghost; // Use Ghost for Snapchat
      return Smartphone;
  };

  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col justify-center relative overflow-hidden">
        
      {/* Active State Overlay (Locked) */}
      <div className={`absolute inset-0 z-20 bg-black flex flex-col items-center justify-center transition-all duration-700 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-10'}`}>
         
         {showTradeModal && mission ? (
            <div className="w-full max-w-xs bg-black/90 backdrop-blur-xl p-8 rounded-[2rem] border border-neon-yellow/50 animate-pop flex flex-col items-center text-center shadow-[0_0_50px_rgba(255,240,31,0.2)]">
                <div className="w-16 h-16 bg-neon-yellow/10 rounded-full flex items-center justify-center mb-6 border border-neon-yellow/30 animate-pulse-slow">
                    <Zap className="w-8 h-8 text-neon-yellow" />
                </div>

                <p className="text-neon-yellow text-xs font-bold uppercase tracking-[0.2em] mb-4">Your Mission</p>
                
                <h3 className="text-xl font-bold text-white mb-8 leading-snug">
                   {mission}
                </h3>
                
                <button 
                    onClick={handleMissionComplete}
                    className="w-full py-4 bg-neon-yellow text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-neon-yellow/50"
                >
                    <CheckCircle2 className="w-5 h-5" />
                    MISSION COMPLETE
                </button>
                <button 
                    onClick={() => setShowTradeModal(false)}
                    className="mt-4 text-white/30 text-xs font-bold hover:text-white transition-colors uppercase tracking-wider"
                >
                    Cancel
                </button>
            </div>
         ) : (
            <>
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full animate-pulse-slow"></div>
                    <div className="relative z-10 border-4 border-red-500 rounded-full p-6 bg-black">
                        <Shield className="w-20 h-20 text-red-500 animate-pulse" />
                    </div>
                </div>
                
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-mono font-bold text-white mb-2 tracking-widest">{formatTime(timeLeft)}</h2>
                    <p className="text-red-400 text-sm uppercase tracking-[0.2em] animate-pulse">Shield Active</p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center max-w-[80%] mb-12">
                    {blockedApps.map(app => (
                        <button 
                            key={app} 
                            onClick={() => handleSimulateAppOpen(app)}
                            className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                        >
                            {app}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={handleDeactivate}
                    className="group px-8 py-3 rounded-full border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all text-xs tracking-widest flex items-center gap-2"
                >
                    <AlertTriangle className="w-4 h-4" />
                    GIVE UP
                </button>
            </>
         )}
      </div>

      {/* Setup UI */}
      <div className={`transition-all duration-500 flex flex-col h-full ${isActive ? 'scale-90 opacity-0 blur-sm' : 'scale-100 opacity-100'}`}>
        
        <div className="mb-4 text-center mt-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-3 border border-red-500/30">
                <Lock className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">App Shield</h2>
            <p className="text-gray-400 text-xs">Block apps. Lock focus.</p>
        </div>

        {/* App Selection - Bigger cards with Icons */}
        <div className="flex-1 overflow-y-auto no-scrollbar mb-4 space-y-3">
            {data.apps.map(app => {
                const isSelected = blockedApps.includes(app);
                const AppIcon = getAppIcon(app);
                
                return (
                    <button
                        key={app}
                        onClick={() => toggleApp(app)}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-200 active:scale-95
                        ${isSelected 
                            ? 'bg-red-900/20 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.2)]' 
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-red-500/20' : 'bg-white/5'}`}>
                                <AppIcon className={`w-6 h-6 ${isSelected ? 'text-red-400' : 'text-white/40'}`} />
                            </div>
                            <span className="font-semibold text-lg tracking-wide">{app}</span>
                        </div>
                        {isSelected && <Check className="w-6 h-6 text-red-400" />}
                    </button>
                )
            })}
        </div>

        {/* Duration Selection */}
        <div className="mb-6">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2 text-center">Duration (Minutes)</p>
            <div className="flex justify-between gap-2">
                {DURATIONS.map(dur => (
                    <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all
                        ${selectedDuration === dur
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-white/50 border-white/10 hover:bg-white/5'
                        }`}
                    >
                        {dur}
                    </button>
                ))}
            </div>
        </div>

        <button
            onClick={handleActivate}
            disabled={blockedApps.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-lg tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mb-auto
            ${blockedApps.length > 0 
                ? 'bg-red-600 text-white hover:bg-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                : 'bg-white/10 text-white/20 cursor-not-allowed'
            }`}
        >
            <Shield className="w-5 h-5" />
            ACTIVATE SHIELD
        </button>
      </div>
    </div>
  );
};
