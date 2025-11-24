import React, { useState } from 'react';
import { QuizData, QuizOption } from '../types';
import { CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

interface QuizCardProps {
  data: QuizData;
}

export const QuizCard: React.FC<QuizCardProps> = ({ data }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (selectedOptionId) return; // Prevent multiple selections
    setSelectedOptionId(optionId);
  };

  const isAnswered = selectedOptionId !== null;

  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col justify-center">
      <div className="mb-8 flex justify-center animate-fade-up">
        <div className="p-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <BrainCircuit className="w-10 h-10 text-neon-blue" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8 text-white/90 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {data.question}
      </h2>

      <div className="space-y-3">
        {data.options.map((option, idx) => {
          let stateStyles = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]";
          let Icon = null;
          let animationClass = "animate-fade-up";

          if (isAnswered) {
            animationClass = ""; // Stop entry animation logic once answered
            if (option.id === selectedOptionId) {
              if (option.isCorrect) {
                stateStyles = "bg-green-500/20 border-green-500 text-green-400 animate-pop shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                Icon = CheckCircle2;
              } else {
                stateStyles = "bg-red-500/20 border-red-500 text-red-400 animate-pop";
                Icon = XCircle;
              }
            } else if (option.isCorrect) {
               // Show correct answer if wrong one was picked
               stateStyles = "bg-green-500/10 border-green-500/50 text-green-400/70";
               Icon = CheckCircle2;
            } else {
                stateStyles = "opacity-40 border-transparent scale-95 grayscale";
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}
              className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 active:scale-95 ${stateStyles} ${animationClass}`}
            >
              <span className="font-medium text-sm">{option.text}</span>
              {Icon && <Icon className="w-5 h-5 animate-pop" />}
            </button>
          );
        })}
      </div>

      <div className={`mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 text-blue-200 text-sm transition-all duration-500 transform ${isAnswered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="font-bold mb-1 text-neon-blue flex items-center gap-2">
            <BrainCircuit className="w-4 h-4" /> Insight
        </p>
        {data.explanation}
      </div>
    </div>
  );
};