
import React, { useState } from 'react';
import { BrainCircuit, Loader2, Sparkles } from 'lucide-react';

interface QuizInputCardProps {
  onGenerate: (topic: string) => Promise<void>;
}

export const QuizInputCard: React.FC<QuizInputCardProps> = ({ onGenerate }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    await onGenerate(topic);
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute top-10 right-0 w-40 h-40 bg-neon-yellow/10 rounded-full blur-[60px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-[60px] animate-float-slow pointer-events-none"></div>

      {/* Content Container */}
      <div className="w-full max-w-md p-6 flex flex-col relative z-10">
        <div className="mb-8 animate-fade-up">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-yellow via-white to-neon-purple bg-clip-text text-transparent mb-2 animate-shimmer bg-[length:200%_100%]">
                Quiz Mode
            </h2>
            <p className="text-gray-400 text-sm tracking-wide">Challenge your mind.</p>
        </div>

        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-xl animate-fade-up group focus-within:bg-white/10 focus-within:border-neon-yellow/50 focus-within:shadow-[0_0_20px_rgba(255,240,31,0.2)] transition-all duration-500" style={{ animationDelay: '0.1s' }}>
            <div className="p-5">
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-3 group-focus-within:text-neon-yellow transition-colors">
                    Enter a topic
                </label>
                
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Space, 90s Music, JavaScript..."
                    className="w-full bg-transparent border-none text-white placeholder-white/20 focus:outline-none focus:ring-0 font-mono text-lg"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
            </div>
        </div>

        <div className="mt-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <button
            onClick={handleSubmit}
            disabled={isLoading || !topic.trim()}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group
                ${isLoading 
                    ? 'bg-white/5 text-white/50 cursor-not-allowed' 
                    : 'bg-white text-black hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                }`}
            >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            GENERATING...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 group-hover:animate-spin-slow" />
                            START QUIZ
                        </>
                    )}
                </span>
            </button>
        </div>
        
        <p className="text-center text-[10px] uppercase tracking-widest text-white/20 mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            AI Powered Knowledge
        </p>
      </div>
    </div>
  );
};
