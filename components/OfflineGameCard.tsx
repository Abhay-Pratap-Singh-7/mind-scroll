
import React, { useState, useEffect } from 'react';
import { GameData } from '../types';
import { Gamepad2, RotateCcw, HelpCircle, Scissors, Scroll, Box } from 'lucide-react';
import { playUISound } from '../utils/audio';

interface OfflineGameCardProps {
  data: GameData;
}

export const OfflineGameCard: React.FC<OfflineGameCardProps> = ({ data }) => {
  return (
    <div className="w-full h-full max-w-md mx-auto p-6 flex flex-col justify-center relative">
       {/* Ambient Background */}
       <div className="absolute top-20 right-0 w-40 h-40 bg-neon-green/10 rounded-full blur-[80px] pointer-events-none"></div>
       <div className="absolute bottom-20 left-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 animate-fade-up">
        <div className="flex justify-center mb-4">
           <div className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
             <Gamepad2 className="w-8 h-8 text-neon-green" />
           </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-1">{data.title}</h2>
        <p className="text-center text-white/40 text-xs mb-8 uppercase tracking-widest">{data.description}</p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-lg">
            {data.gameType === 'TIC_TAC_TOE' && <TicTacToe />}
            {data.gameType === 'RPS' && <RockPaperScissors />}
            {data.gameType === 'MEMORY' && <MemoryMatch />}
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components for Games ---

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true); // Player is X
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number) => {
        if (board[i] || winner) return;
        
        playUISound('click');
        const newBoard = [...board];
        newBoard[i] = 'X';
        setBoard(newBoard);
        
        const win = checkWinner(newBoard);
        if (win) {
            setWinner(win);
            playUISound('success');
        } else if (!newBoard.includes(null)) {
            setWinner('Draw');
            playUISound('error'); // Draw sound
        } else {
            setIsXNext(false);
            // Simple CPU Move
            setTimeout(() => {
                makeCpuMove(newBoard);
            }, 500);
        }
    };

    const makeCpuMove = (currentBoard: any[]) => {
        const emptyIndices = currentBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (emptyIndices.length > 0) {
            const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            if (randomIdx !== null) {
                 const newBoard = [...currentBoard];
                 newBoard[randomIdx] = 'O';
                 setBoard(newBoard);
                 playUISound('click');
                 const win = checkWinner(newBoard);
                 if (win) {
                    setWinner(win);
                    playUISound('error'); // CPU Won
                 } else if (!newBoard.includes(null)) {
                    setWinner('Draw');
                 }
                 setIsXNext(true);
            }
        }
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsXNext(true);
        playUISound('select');
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-2 mb-6">
                {board.map((cell, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => handleClick(idx)}
                        disabled={!!cell || !!winner || !isXNext}
                        className={`w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold transition-all
                            ${cell === 'X' ? 'text-neon-blue' : 'text-neon-purple'}
                            ${!cell && !winner ? 'hover:bg-white/10' : ''}
                        `}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            
            {winner && (
                <div className="text-center animate-pop">
                    <p className="text-xl font-bold text-white mb-4">
                        {winner === 'Draw' ? 'Draw!' : winner === 'X' ? 'You Won!' : 'AI Won!'}
                    </p>
                    <button onClick={reset} className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm">Play Again</button>
                </div>
            )}
            {!winner && (
                <p className="text-white/50 text-xs animate-pulse">
                    {isXNext ? 'Your Turn' : 'AI Thinking...'}
                </p>
            )}
        </div>
    );
};

const RockPaperScissors = () => {
    const [result, setResult] = useState<string | null>(null);
    const [playerChoice, setPlayerChoice] = useState<string | null>(null);
    const [cpuChoice, setCpuChoice] = useState<string | null>(null);
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];

    const play = (choice: string) => {
        playUISound('click');
        setPlayerChoice(choice);
        
        // Random CPU
        const cpu = choices[Math.floor(Math.random() * choices.length)];
        setCpuChoice(cpu);

        if (choice === cpu) {
            setResult('DRAW');
            playUISound('error');
        } else if (
            (choice === 'ROCK' && cpu === 'SCISSORS') ||
            (choice === 'PAPER' && cpu === 'ROCK') ||
            (choice === 'SCISSORS' && cpu === 'PAPER')
        ) {
            setResult('WIN');
            playUISound('success');
        } else {
            setResult('LOSE');
            playUISound('error');
        }
    };

    const reset = () => {
        setResult(null);
        setPlayerChoice(null);
        setCpuChoice(null);
        playUISound('select');
    };

    const getIcon = (c: string) => {
        if (c === 'ROCK') return <Box className="w-6 h-6" />;
        if (c === 'PAPER') return <Scroll className="w-6 h-6" />;
        return <Scissors className="w-6 h-6" />;
    };

    return (
        <div className="flex flex-col items-center">
            {!result ? (
                <>
                    <p className="text-white/50 text-sm mb-6">Choose your weapon</p>
                    <div className="flex gap-4">
                        {choices.map(c => (
                            <button 
                                key={c}
                                onClick={() => play(c)}
                                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neon-green/20 hover:border-neon-green hover:scale-110 transition-all text-white"
                            >
                                {getIcon(c)}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center animate-pop w-full">
                    <div className="flex justify-between items-center mb-8 px-4">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-16 h-16 rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center text-neon-blue">
                                {playerChoice && getIcon(playerChoice)}
                             </div>
                             <span className="text-[10px] text-white/50">YOU</span>
                        </div>
                        <span className="text-2xl font-bold text-white/20">VS</span>
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500">
                                {cpuChoice && getIcon(cpuChoice)}
                             </div>
                             <span className="text-[10px] text-white/50">CPU</span>
                        </div>
                    </div>
                    
                    <h3 className={`text-3xl font-bold mb-6 ${result === 'WIN' ? 'text-neon-green' : result === 'LOSE' ? 'text-red-500' : 'text-white'}`}>
                        {result === 'WIN' ? 'VICTORY' : result === 'LOSE' ? 'DEFEAT' : 'DRAW'}
                    </h3>
                    
                    <button onClick={reset} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                        <RotateCcw className="w-4 h-4" /> PLAY AGAIN
                    </button>
                </div>
            )}
        </div>
    );
};

const MemoryMatch = () => {
    const ICONS = ['🔥', '🌊', '🍀', '⚡', '💎', '🌙'];
    // 6 pairs = 12 cards
    const [cards, setCards] = useState<{id: number, icon: string, flipped: boolean, matched: boolean}[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        const pairs = [...ICONS, ...ICONS];
        // Shuffle
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        setCards(pairs.map((icon, id) => ({ id, icon, flipped: false, matched: false })));
        setFlippedIndices([]);
        setMoves(0);
    };

    const handleCardClick = (idx: number) => {
        if (flippedIndices.length >= 2 || cards[idx].flipped || cards[idx].matched) return;

        playUISound('click');
        const newCards = [...cards];
        newCards[idx].flipped = true;
        setCards(newCards);
        
        const newFlipped = [...flippedIndices, idx];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [firstIdx, secondIdx] = newFlipped;
            if (newCards[firstIdx].icon === newCards[secondIdx].icon) {
                // Match
                playUISound('success');
                newCards[firstIdx].matched = true;
                newCards[secondIdx].matched = true;
                setCards(newCards);
                setFlippedIndices([]);
            } else {
                // No Match
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[firstIdx].flipped = false;
                    resetCards[secondIdx].flipped = false;
                    setCards(resetCards);
                    setFlippedIndices([]);
                }, 1000);
            }
        }
    };

    const isComplete = cards.length > 0 && cards.every(c => c.matched);

    return (
        <div className="flex flex-col items-center">
            {isComplete ? (
                 <div className="text-center animate-pop py-10">
                    <h3 className="text-3xl font-bold text-neon-green mb-2">CLEARED!</h3>
                    <p className="text-white/60 mb-8">{moves} Moves</p>
                    <button onClick={() => { playUISound('select'); initGame(); }} className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                        <RotateCcw className="w-4 h-4" /> PLAY AGAIN
                    </button>
                 </div>
            ) : (
                <div className="grid grid-cols-4 gap-2">
                    {cards.map((card, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleCardClick(idx)}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-xl transition-all duration-300 transform
                                ${card.flipped || card.matched ? 'bg-white/10 rotate-y-180 border-neon-purple border' : 'bg-white/5 border border-white/10 hover:bg-white/10'}
                            `}
                        >
                            {(card.flipped || card.matched) ? card.icon : <HelpCircle className="w-4 h-4 text-white/20" />}
                        </button>
                    ))}
                </div>
            )}
            {!isComplete && <p className="mt-6 text-xs text-white/30 tracking-widest uppercase">Moves: {moves}</p>}
        </div>
    );
};
