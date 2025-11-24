
import React, { useState } from 'react';
import { TaskTriageData } from '../types';
import { CalendarClock, Trash2, CheckCircle } from 'lucide-react';

interface TaskTriageCardProps {
  data: TaskTriageData;
}

export const TaskTriageCard: React.FC<TaskTriageCardProps> = ({ data }) => {
  const [swiped, setSwiped] = useState<'LEFT' | 'RIGHT' | 'UP' | null>(null);

  const handleAction = (direction: 'LEFT' | 'RIGHT' | 'UP') => {
    setSwiped(direction);
  };

  if (swiped) {
    return (
        <div className="w-full h-full flex items-center justify-center animate-pop">
            {swiped === 'RIGHT' && (
                <div className="text-center">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-400">DO IT NOW</h2>
                    <p className="text-white/50">Timer started: 25min</p>
                </div>
            )}
            {swiped === 'LEFT' && (
                <div className="text-center">
                    <CalendarClock className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-yellow-400">LATER</h2>
                    <p className="text-white/50">Rescheduled for tomorrow</p>
                </div>
            )}
            {swiped === 'UP' && (
                <div className="text-center">
                    <Trash2 className="w-20 h-20 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-400">DELETED</h2>
                    <p className="text-white/50">Task removed</p>
                </div>
            )}
        </div>
    );
  }

  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col justify-center relative">
      <div className="text-center mb-8 animate-fade-up">
         <h3 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">Task Triage</h3>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center shadow-2xl animate-fade-up">
         <p className="text-2xl font-bold text-center">{data.text}</p>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
         <button 
            onClick={() => handleAction('LEFT')}
            className="flex flex-col items-center gap-2 group"
         >
            <div className="w-14 h-14 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center group-hover:bg-yellow-500/40 transition-colors">
                <CalendarClock className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-[10px] font-bold text-white/50">LATER</span>
         </button>

         <button 
            onClick={() => handleAction('UP')}
            className="flex flex-col items-center gap-2 group -translate-y-8"
         >
            <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center group-hover:bg-red-500/40 transition-colors">
                <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-[10px] font-bold text-white/50">DELETE</span>
         </button>

         <button 
            onClick={() => handleAction('RIGHT')}
            className="flex flex-col items-center gap-2 group"
         >
            <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-[10px] font-bold text-white/50">NOW</span>
         </button>
      </div>
    </div>
  );
};
