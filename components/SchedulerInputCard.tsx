
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';

interface SchedulerInputCardProps {
  onGenerate: (goals: string, isRecovery?: boolean) => Promise<void>;
}

export const SchedulerInputCard: React.FC<SchedulerInputCardProps> = ({ onGenerate }) => {
  const [goals, setGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (isRecovery = false) => {
    if (!isRecovery && !goals.trim()) return;
    setIsLoading(true);
    await onGenerate(goals, isRecovery);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col justify-center relative overflow-hidden">
        
      {/* Background Ambient Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple/20 rounded-full blur-[80px] animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-blue/20 rounded-full blur-[80px] animate-float-slow"></div>

      <div className="mb-8 animate-fade-up relative z-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-purple via-white to-neon-blue bg-clip-text text-transparent mb-2 animate-shimmer bg-[length:200%_100%]">
            Mind Plan
        </h2>
        <p className="text-gray-400 text-sm tracking-wide">Convert your thoughts into action.</p>
      </div>

      <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-xl animate-fade-up group focus-within:bg-white/10 focus-within:border-neon-purple/50 focus-within:shadow-[0_0_20px_rgba(176,38,255,0.2)] transition-all duration-500" style={{ animationDelay: '0.1s' }}>
        <div className="p-5 relative">
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-3 group-focus-within:text-neon-purple transition-colors">
                What are your goals for today?
            </label>
            
            <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="I need to finish the quarterly report, go for a run, and read 20 pages..."
            className="w-full h-32 bg-transparent border-none text-white placeholder-white/20 focus:outline-none focus:ring-0 resize-none font-mono text-sm leading-relaxed"
            />
        </div>
      </div>

      <div className="mt-6 animate-fade-up space-y-3 relative z-10" style={{ animationDelay: '0.2s' }}>
        <button
          onClick={() => handleSubmit(false)}
          disabled={isLoading || !goals.trim()}
          className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group
            ${isLoading 
                ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                : 'bg-white text-black hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
            }`}
        >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        PROCESSING...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
                        GENERATE SCHEDULE
                    </>
                )}
            </span>
        </button>

        {/* Recover Day Button */}
        <button
          onClick={() => handleSubmit(true)}
          disabled={isLoading}
          className="w-full py-3 rounded-xl font-bold text-xs tracking-widest flex items-center justify-center gap-2 text-white/50 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            RECOVER THE DAY (AI ADJUST)
        </button>
      </div>
      
      <p className="text-center text-[10px] uppercase tracking-widest text-white/20 mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        Powered by Gemini 2.5 AI
      </p>
    </div>
  );
};
