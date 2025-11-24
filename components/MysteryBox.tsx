
import React, { useState } from 'react';
import { Gift, X } from 'lucide-react';
import { Reward } from '../types';

interface MysteryBoxProps {
  onClose: () => void;
}

export const MysteryBox: React.FC<MysteryBoxProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
    // Simulate random reward - Generic Themes/Tokens
    const rewards: Reward[] = [
        { id: 'r1', name: 'Cyber Theme', type: 'THEME', icon: '🌃' },
        { id: 'r2', name: 'Cheat Day Token', type: 'TOKEN', icon: '🎫' },
        { id: 'r3', name: 'Golden Badge', type: 'ACCESSORY', icon: '🏆' },
    ];
    setTimeout(() => {
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-sm bg-black border border-neon-purple/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(176,38,255,0.2)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
            <X className="w-6 h-6" />
        </button>

        {!isOpen ? (
            <>
                <h2 className="text-2xl font-bold text-white mb-6">Focus Session Complete!</h2>
                <div 
                    onClick={handleOpen}
                    className="w-32 h-32 bg-gradient-to-br from-neon-purple to-neon-blue rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 animate-pulse-slow shadow-xl mb-6"
                >
                    <Gift className="w-16 h-16 text-white" />
                </div>
                <p className="text-white/60 text-sm animate-pulse">Tap to open Mystery Box</p>
            </>
        ) : !reward ? (
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neon-purple font-bold">Opening...</p>
            </div>
        ) : (
            <div className="animate-pop">
                <h2 className="text-2xl font-bold text-neon-green mb-2">You found a reward!</h2>
                <div className="text-6xl mb-4">{reward.icon}</div>
                <h3 className="text-xl text-white font-bold mb-2">{reward.name}</h3>
                <p className="text-white/50 text-xs uppercase tracking-widest">{reward.type}</p>
                
                <button 
                    onClick={onClose}
                    className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                    CLAIM
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
