
import React, { useState, useEffect } from 'react';
import { AppMode, FeedItemType } from './types';
import { BentoGrid } from './components/BentoGrid';
import { FeatureFeed } from './components/FeatureFeed';
import { MysteryBox } from './components/MysteryBox';
import { SplashScreen } from './components/SplashScreen';
import { playUISound } from './utils/audio';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  // Initialize state based on localStorage or default to HOME
  const [currentMode, setCurrentMode] = useState<AppMode>(() => {
    const savedFocusEnd = localStorage.getItem('mindscroll_focus_end');
    if (savedFocusEnd) {
      const endTime = parseInt(savedFocusEnd, 10);
      if (Date.now() < endTime) {
        return FeedItemType.FOCUS_MODE;
      } else {
        localStorage.removeItem('mindscroll_focus_end');
      }
    }
    return 'HOME';
  });

  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [tradeActive, setTradeActive] = useState(false);

  // Sync History with Initial State on Mount
  useEffect(() => {
    // If no state exists, or if we loaded into a specific mode via logic, ensure history matches
    if (!window.history.state) {
      window.history.replaceState({ mode: currentMode }, '', '');
    }
  }, []);

  // Handle Hardware Back Button (popstate)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const incomingMode = event.state?.mode || 'HOME';
      
      // LOGIC: Focus Mode Lock
      // If we are currently locked in focus mode, and the user tried to go back (to HOME or out of app)
      const savedFocusEnd = localStorage.getItem('mindscroll_focus_end');
      const isLocked = savedFocusEnd && parseInt(savedFocusEnd, 10) > Date.now();

      if (isLocked && !tradeActive && currentMode === FeedItemType.FOCUS_MODE && incomingMode !== FeedItemType.FOCUS_MODE) {
        // Trap the user: Push Focus Mode back onto the stack immediately
        window.history.pushState({ mode: FeedItemType.FOCUS_MODE }, '', '');
        setCurrentMode(FeedItemType.FOCUS_MODE);
        playUISound('error'); // Notify user they are locked
        return;
      }

      // LOGIC: Returning from Trade (Power Scroll)
      if (currentMode === 'POWER_SCROLL' && tradeActive) {
        setTradeActive(false);
      }

      // Play sound based on direction (Back usually means going home or back a step)
      if (incomingMode === 'HOME') {
        playUISound('back');
      } else {
        playUISound('click');
      }

      setCurrentMode(incomingMode);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentMode, tradeActive]);

  const handleSelect = (mode: AppMode) => {
    playUISound('select');
    window.history.pushState({ mode }, '', '');
    setCurrentMode(mode);
  };

  const handleBack = () => {
    // UI Back Button Logic
    playUISound('back');
    
    // Check Focus Lock
    const savedFocusEnd = localStorage.getItem('mindscroll_focus_end');
    if (savedFocusEnd && parseInt(savedFocusEnd, 10) > Date.now() && currentMode === FeedItemType.FOCUS_MODE && !tradeActive) {
       playUISound('error');
       return; // Block exit
    }

    // Use history.back() to simulate hardware button
    // This will trigger popstate, which handles the actual state update
    window.history.back();
  };

  const handleRequestTrade = () => {
    playUISound('select');
    setTradeActive(true);
    // Push Power Scroll state
    window.history.pushState({ mode: 'POWER_SCROLL' }, '', '');
    setCurrentMode('POWER_SCROLL');
    setTimeout(() => {
        console.log("Trade Complete - Apps Unlocked");
        playUISound('success');
    }, 5000);
  };

  const handleCloseMysteryBox = () => {
      playUISound('click');
      setShowMysteryBox(false);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="h-screen w-full bg-[linear-gradient(-45deg,#000000,#1a0b2e,#000000,#0f2027,#000000)] bg-[length:400%_400%] animate-glow text-white font-sans overflow-hidden flex flex-col pt-12">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {currentMode === 'HOME' ? (
        <BentoGrid onSelect={handleSelect} />
      ) : (
        <FeatureFeed mode={currentMode} onBack={handleBack} onRequestTrade={handleRequestTrade} />
      )}
      
      {showMysteryBox && <MysteryBox onClose={handleCloseMysteryBox} />}
    </div>
  );
}
