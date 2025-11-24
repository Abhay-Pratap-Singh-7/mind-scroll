
import React from 'react';
import { PetState } from '../types';
import { Cat, Zap, Heart, Utensils, PartyPopper } from 'lucide-react';

interface PetWidgetProps {
  pet: PetState;
  onInteract?: (type: 'FEED' | 'PLAY') => void;
}

export const PetWidget: React.FC<PetWidgetProps> = ({ pet, onInteract }) => {
  return (
    <div className="col-span-1 relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-4 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 hover:border-pink-500/40">
      
      {/* Status Header */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${pet.mood === 'Sick' ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
            <span className="text-[10px] uppercase tracking-wider text-white/60">{pet.mood}</span>
        </div>
        <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/5">
            <span className="text-[10px] font-bold text-yellow-300">🦴 {pet.treats}</span>
        </div>
      </div>

      {/* Pet Visual */}
      <div className="flex-1 flex flex-col items-center justify-center py-1 z-10 relative">
        <div className={`relative transition-all duration-500 ${pet.mood === 'Sleepy' ? 'grayscale opacity-70' : ''} ${pet.mood === 'Sick' ? 'opacity-50 animate-pulse' : ''}`}>
             <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full"></div>
             <Cat className={`w-12 h-12 text-white drop-shadow-lg ${pet.mood === 'Happy' || pet.mood === 'Focused' ? 'animate-bounce' : ''}`} />
        </div>
      </div>

      {/* Stats Bars & Interactions */}
      <div className="z-10 space-y-3">
         {/* Stats */}
         <div className="space-y-1">
            <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-red-400" />
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full transition-all duration-500" style={{ width: `${pet.health}%` }}></div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400" />
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${pet.xp}%` }}></div>
                </div>
            </div>
         </div>

         {/* Interaction Buttons */}
         <div className="flex gap-2 pt-1 border-t border-white/5">
            <button 
                onClick={(e) => { e.stopPropagation(); onInteract?.('FEED'); }}
                disabled={pet.treats <= 0}
                className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white/5 rounded-lg border border-white/10 hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-300 transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                title="Feed (Cost: 1 Treat)"
            >
                <Utensils className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase">Feed</span>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onInteract?.('PLAY'); }}
                disabled={pet.treats <= 0}
                className="flex-1 py-1.5 flex items-center justify-center gap-1 bg-white/5 rounded-lg border border-white/10 hover:bg-yellow-500/20 hover:border-yellow-500/50 hover:text-yellow-300 transition-all disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:cursor-not-allowed"
                title="Play (Cost: 1 Treat)"
            >
                <PartyPopper className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase">Play</span>
            </button>
         </div>
      </div>

       {/* Background Gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};
