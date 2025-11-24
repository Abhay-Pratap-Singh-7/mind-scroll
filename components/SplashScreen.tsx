
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // 1. Fade Text In
    const enterTimer = setTimeout(() => {
      setTextVisible(true);
    }, 100);

    // 2. Start Exit (Fade Out Screen)
    const exitTimer = setTimeout(() => {
      setExiting(true);
      // 3. Complete after fade out transition
      setTimeout(onComplete, 800);
    }, 2200);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out ${exiting ? 'opacity-0' : 'opacity-100'}`}>
      <h1 
        className={`font-sans font-bold text-5xl tracking-tight text-white transition-opacity duration-1000 ease-out ${textVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        MindScroll
      </h1>
    </div>
  );
};
