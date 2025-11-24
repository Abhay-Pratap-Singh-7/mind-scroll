
import React, { useState } from 'react';
import { MicroLearningData } from '../types';
import { Lightbulb, BookOpen, CalendarDays, Terminal, Quote, Radio, CheckCircle, Plus, Feather, Puzzle, HelpCircle } from 'lucide-react';
import { addLearningMinutes } from '../services/statsService';
import { playUISound } from '../utils/audio';

interface MicroLearningCardProps {
  data: MicroLearningData;
}

export const MicroLearningCard: React.FC<MicroLearningCardProps> = ({ data }) => {
  const [revealed, setRevealed] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveToBrain = () => {
    if (saved) return;
    setSaved(true);
    addLearningMinutes(1);
    playUISound('success');
  };

  const getIcon = () => {
    switch (data.type) {
        case 'VOCAB': return <BookOpen className="w-8 h-8 text-pink-400" />;
        case 'TRIVIA': return <Lightbulb className="w-8 h-8 text-yellow-400" />;
        case 'HISTORY': return <CalendarDays className="w-8 h-8 text-orange-400" />;
        case 'CODE': return <Terminal className="w-8 h-8 text-green-400" />;
        case 'BOOK': return <Quote className="w-8 h-8 text-blue-300" />;
        case 'NEWS_SUMMARY': return <Radio className="w-8 h-8 text-blue-400" />;
        case 'FICTION': return <Feather className="w-8 h-8 text-indigo-400" />;
        case 'PUZZLE': return <Puzzle className="w-8 h-8 text-teal-400" />;
        default: return <Lightbulb className="w-8 h-8 text-white" />;
    }
  };

  const getLabel = () => {
    switch (data.type) {
        case 'NEWS_SUMMARY': return '60-Second Brief';
        case 'VOCAB': return 'Word of the Now';
        case 'HISTORY': return 'On This Day';
        case 'CODE': return 'Tech Logic';
        case 'BOOK': return 'Book Nugget';
        case 'FICTION': return 'Micro-Story';
        case 'PUZZLE': return 'Mental Fitness';
        default: return 'Knowledge Drop';
    }
  };

  const getBgColor = () => {
      switch (data.type) {
          case 'VOCAB': return 'bg-pink-500';
          case 'HISTORY': return 'bg-orange-500';
          case 'CODE': return 'bg-green-500';
          case 'BOOK': return 'bg-blue-500';
          case 'FICTION': return 'bg-indigo-600';
          case 'PUZZLE': return 'bg-teal-500';
          default: return 'bg-purple-500';
      }
  }

  // Render specific content based on type
  const renderContent = () => {
      // Logic Puzzles & Code Snippets (Interactive Reveal)
      if (data.type === 'CODE' || data.type === 'PUZZLE') {
          return (
              <div className="w-full">
                  {data.codeSnippet && (
                    <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-xs text-green-400 mb-4 overflow-x-auto whitespace-pre-wrap">
                        {data.codeSnippet}
                    </div>
                  )}
                  
                  <div className={`text-center text-white/90 ${data.type === 'PUZZLE' ? 'text-xl font-bold leading-relaxed' : 'text-sm'} mb-8`}>
                    {data.content}
                  </div>
                  
                  {!revealed ? (
                      <button 
                        onClick={() => { setRevealed(true); playUISound('click'); }}
                        className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold text-xs tracking-widest transition-all animate-pulse-slow group"
                      >
                          <span className="group-hover:scale-105 inline-block transition-transform">TAP TO REVEAL ANSWER</span>
                      </button>
                  ) : (
                      <div className={`${data.type === 'PUZZLE' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-green-500/10 border-green-500/30'} border rounded-xl p-6 animate-pop`}>
                          <div className={`flex items-center gap-2 mb-2 ${data.type === 'PUZZLE' ? 'text-teal-400' : 'text-green-400'} font-bold text-xs uppercase tracking-wider`}>
                              {data.type === 'PUZZLE' ? <Lightbulb className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />} 
                              Answer
                          </div>
                          <p className="text-white font-medium text-lg">{data.answer}</p>
                      </div>
                  )}
              </div>
          );
      }

      if (data.type === 'BOOK') {
          return (
              <div className="relative">
                  <Quote className="absolute -top-6 -left-4 w-12 h-12 text-white/10 rotate-180" />
                  <p className="text-xl font-serif italic leading-relaxed text-white/90 mb-6 relative z-10">
                      {data.content}
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="w-8 h-10 bg-white/10 rounded-sm border-l-2 border-white/30"></div>
                      <div className="text-sm">
                          <p className="text-white/80 font-bold">{data.subContent?.split(' by ')[1] || 'Unknown Author'}</p>
                          <p className="text-white/50 italic text-xs">{data.subContent?.split(' by ')[0] || 'Book'}</p>
                      </div>
                  </div>
              </div>
          );
      }

      if (data.type === 'HISTORY') {
          return (
            <div className="text-center">
                 <div className="inline-block px-4 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-bold tracking-widest mb-6">
                     {data.subContent}
                 </div>
                 <p className="text-lg text-white/90 leading-relaxed font-serif">
                    {data.content}
                 </p>
            </div>
          );
      }

      // Micro-Fiction
      if (data.type === 'FICTION') {
        return (
          <div className="text-left relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-transparent opacity-50"></div>
              <p className="text-2xl font-serif font-medium leading-relaxed text-white drop-shadow-lg mb-6 pl-4">
                "{data.content}"
              </p>
              <p className="text-right text-indigo-300 text-xs uppercase tracking-widest opacity-70">
                 {data.subContent}
              </p>
          </div>
        );
      }

      // Default (Vocab, Trivia)
      return (
        <div className="text-center">
             <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                {data.title === 'Word of the Now' ? data.content : data.title}
             </h2>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                    {data.title === 'Word of the Now' ? data.subContent : data.content}
                </p>
             </div>
        </div>
      );
  };

  return (
    <div className="w-full h-full max-w-md mx-auto p-8 flex flex-col justify-center relative">
      <div className="absolute top-1/3 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
         <div className={`w-64 h-64 rounded-full blur-[80px] ${getBgColor()}`}></div>
      </div>

      <div className="relative z-10 animate-fade-up">
        <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                {getIcon()}
            </div>
        </div>

        <h3 className="text-center text-xs font-bold tracking-[0.3em] text-white/40 mb-8 uppercase">
            {getLabel()}
        </h3>

        {renderContent()}

        {/* Saved to Brain Button - Hide for Fiction, show for others */}
        {data.type !== 'FICTION' && (
            <div className="mt-8 flex justify-center">
                <button 
                    onClick={handleSaveToBrain}
                    disabled={saved}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 
                    ${saved 
                        ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    {saved ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span className="text-xs font-bold uppercase tracking-wider">{saved ? 'Learned (+1m)' : 'Mark as Learned'}</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
