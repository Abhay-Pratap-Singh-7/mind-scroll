import React, { useEffect, useState } from 'react';
import { MindfulnessData } from '../types';

interface MindfulnessCardProps {
  data: MindfulnessData;
}

export const MindfulnessCard: React.FC<MindfulnessCardProps> = ({ data }) => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  useEffect(() => {
    const cycle = () => {
      setPhase('Inhale');
      setTimeout(() => {
        setPhase('Hold');
        setTimeout(() => {
          setPhase('Exhale');
          setTimeout(() => {
             setPhase('Hold');
          }, 4000); // Hold after exhale
        }, 4000); // Hold after inhale
      }, 4000); // Inhale duration
    };

    // Total cycle is 16s (4-4-4-4 box breathing)
    cycle();
    const interval = setInterval(cycle, 16000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-64 h-64 rounded-full blur-[100px] transition-all duration-[4000ms] ${phase === 'Inhale' ? 'bg-cyan-500/40 scale-150' : phase === 'Exhale' ? 'bg-purple-900/30 scale-50' : 'bg-cyan-500/20 scale-100'}`}></div>
        </div>

      <div className="relative z-10 text-center">
        <h3 className="text-white/50 tracking-[0.3em] uppercase text-sm mb-12">{data.title}</h3>

        {/* Pulsing Circle */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center mb-12">
           <div className={`absolute w-full h-full rounded-full border border-white/20 transition-transform duration-[4000ms] ease-in-out ${phase === 'Inhale' ? 'scale-100' : phase === 'Exhale' ? 'scale-50' : 'scale-100'}`}></div>
           <div className={`absolute w-48 h-48 rounded-full border border-white/40 transition-transform duration-[4000ms] ease-in-out delay-75 ${phase === 'Inhale' ? 'scale-100' : phase === 'Exhale' ? 'scale-50' : 'scale-100'}`}></div>
           <div className={`absolute w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-transform duration-[4000ms] ease-in-out delay-150 ${phase === 'Inhale' ? 'scale-100' : phase === 'Exhale' ? 'scale-75' : 'scale-100'}`}>
                <span className="text-2xl font-light text-white">{phase}</span>
           </div>
        </div>

        <p className="text-white/80 max-w-xs mx-auto font-light leading-relaxed">
          {data.instruction}
        </p>
      </div>
    </div>
  );
};