
import React from 'react';
import { Task } from '../types';
import { Clock, CheckCircle2 } from 'lucide-react';

interface GeneratedScheduleCardProps {
  tasks: Task[];
}

export const GeneratedScheduleCard: React.FC<GeneratedScheduleCardProps> = ({ tasks }) => {
  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col relative overflow-hidden">
      {/* Background Decor - Enhanced Animation */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px] -z-10 animate-float-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] -z-10 animate-float"></div>

      <div className="mb-8 mt-4 animate-fade-up z-10">
        <h2 className="text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Your Blueprint</h2>
        <p className="text-white/50 text-sm">Optimized for flow and focus.</p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pr-2 relative z-10">
        {/* Continuous Line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-neon-purple via-neon-blue to-transparent opacity-30"></div>

        <div className="space-y-6 pl-10 pt-2 pb-12">
          {tasks.map((item, i) => (
            <div 
                key={i} 
                className="relative group animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
            >
              
              {/* Timeline Node */}
              <div className="absolute -left-[1.95rem] top-4 w-4 h-4 rounded-full bg-black border-2 border-neon-purple shadow-[0_0_10px_rgba(176,38,255,0.4)] group-hover:scale-125 group-hover:border-white transition-all duration-300 z-10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(176,38,255,0.8)]">
                 <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              </div>

              {/* Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-neon-purple/10">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3 h-3 text-neon-blue" />
                  <span className="text-neon-blue font-mono font-bold text-xs tracking-wider group-hover:text-neon-purple transition-colors">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-white font-medium text-base leading-snug group-hover:text-white transition-colors">
                  {item.task}
                </h3>
              </div>
            </div>
          ))}
          
          {/* End Node */}
          <div className="relative animate-fade-up" style={{ animationDelay: `${tasks.length * 100}ms` }}>
             <div className="absolute -left-[1.95rem] top-1 w-4 h-4 rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-3 h-3 text-neon-blue" />
             </div>
             <p className="text-white/30 text-xs italic pt-1 pl-2">Schedule complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};
