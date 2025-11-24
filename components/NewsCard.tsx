
import React from 'react';
import { NewsData } from '../types';
import { ArrowRight, Newspaper } from 'lucide-react';

interface NewsCardProps {
  data: NewsData;
}

const tagBgMap: Record<string, string> = {
  purple: 'bg-purple-500/10 text-purple-300 border border-purple-500/20',
  green: 'bg-green-500/10 text-green-300 border border-green-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20',
  blue: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
};

export const NewsCard: React.FC<NewsCardProps> = ({ data }) => {
  const tagClass = tagBgMap[data.color] || tagBgMap.blue;
  
  // Determine ambient glow color based on category
  const glowColorClass = 
    data.color === 'purple' ? 'bg-purple-500/20' :
    data.color === 'green' ? 'bg-green-500/20' :
    data.color === 'yellow' ? 'bg-yellow-500/20' : 'bg-cyan-500/20';

  const handleReadMore = () => {
    if (data.url) {
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback if no URL is provided
      window.open(`https://www.google.com/search?q=${encodeURIComponent(data.headline)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full h-full max-w-md mx-auto flex flex-col justify-center p-6 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none animate-pulse-slow ${glowColorClass}`}></div>
      <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[80px] pointer-events-none animate-float ${glowColorClass}`}></div>

      <div className="relative z-10 animate-fade-up">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md ${tagClass}`}>
            {data.category}
            </div>
            <div className="p-2 bg-white/5 rounded-full border border-white/10">
                 <Newspaper className="w-5 h-5 text-white/50" />
            </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 leading-tight font-sans tracking-tight">
          {data.headline}
        </h2>

        {/* Summary Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md mb-8 relative group hover:bg-white/10 transition-colors duration-300">
             <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
             <p className="text-gray-300 text-base leading-relaxed font-mono pl-4">
                {data.summary}
            </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleReadMore}
          className={`
            w-full flex items-center justify-center gap-2 font-bold text-xs tracking-widest transition-all duration-300
            text-white hover:text-black hover:bg-white group/btn
            py-4 px-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md
        `}>
          READ FULL STORY
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};