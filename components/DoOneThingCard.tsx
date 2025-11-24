
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Zap, CheckCircle2, X } from 'lucide-react';
import { playUISound } from '../utils/audio';
import { DO_ONE_THING_TASKS } from '../constants';

export const DoOneThingCard: React.FC = () => {
    const [activeTask, setActiveTask] = useState<string | null>(null);

    const handleStart = () => {
        playUISound('click');
        const randomTask = DO_ONE_THING_TASKS[Math.floor(Math.random() * DO_ONE_THING_TASKS.length)];
        setActiveTask(randomTask);
    };

    const handleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        playUISound('success');
        setActiveTask(null);
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        playUISound('back');
        setActiveTask(null);
    }

    return (
        <>
            <button 
                onClick={handleStart}
                className="h-40 w-full relative group overflow-hidden rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between items-start text-left transition-all duration-300 active:scale-95 active:bg-white/10 active:border-neon-yellow/40 active:shadow-[0_0_20px_rgba(255,240,31,0.15)]"
            >
                <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
                    <Zap className="w-24 h-24 text-neon-yellow transform -rotate-12 translate-x-2 animate-pulse-slow" />
                </div>
                
                <div className="relative z-10 w-full">
                    <div className="w-12 h-12 bg-neon-yellow/10 border border-neon-yellow/20 rounded-xl flex items-center justify-center mb-4 animate-pulse-slow">
                        <Zap className="w-6 h-6 text-neon-yellow group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-white leading-none mb-1">Do One Thing</h3>
                    <p className="text-white/40 text-[10px]">Instant dopamine</p>
                </div>
            </button>

            {/* Modal Overlay using Portal to escape parent transforms */}
            {activeTask && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-fade-up">
                    <div className="w-full max-w-sm bg-black border border-neon-yellow/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_50px_rgba(255,240,31,0.15)] relative">
                        
                        <button 
                            onClick={handleCancel}
                            className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="w-20 h-20 bg-neon-yellow/10 rounded-full flex items-center justify-center mb-6 border border-neon-yellow/30 animate-pulse-slow shadow-[0_0_30px_rgba(255,240,31,0.2)]">
                            <Zap className="w-10 h-10 text-neon-yellow" />
                        </div>

                        <p className="text-neon-yellow text-xs font-bold uppercase tracking-[0.2em] mb-4">Your Mission</p>
                        
                        <h2 className="text-2xl font-bold text-white mb-8 leading-tight">
                            {activeTask}
                        </h2>

                        <button 
                            onClick={handleComplete}
                            className="w-full py-4 bg-neon-yellow text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-neon-yellow/50"
                        >
                            <CheckCircle2 className="w-5 h-5" /> 
                            MISSION COMPLETE
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};
