
// Utility to generate synthetic UI sounds using Web Audio API
// This avoids external dependencies and allows for low-latency, subtle effects.

const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
};

type SoundType = 'click' | 'select' | 'back' | 'success' | 'error';

export const playUISound = (type: SoundType) => {
  try {
    const ctx = getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'click':
        // Very short, high pitch tap (subtle)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gainNode.gain.setValueAtTime(0.05, now); // Quiet
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;

      case 'select':
        // Futuristic "Blip" - entering a mode
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        oscillator.start(now);
        oscillator.stop(now + 0.2);
        break;

      case 'back':
        // Lower pitch "Blop" - leaving a mode
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;

      case 'success':
        // A nice major triad chord
        const frequencies = [523.25, 659.25, 783.99]; // C Major
        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gn = ctx.createGain();
            osc.connect(gn);
            gn.connect(ctx.destination);
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now);
            
            // Stagger slightly
            const startTime = now + (i * 0.05);
            gn.gain.setValueAtTime(0, startTime);
            gn.gain.linearRampToValueAtTime(0.05, startTime + 0.05);
            gn.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
            
            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
        break;

      case 'error':
        // Soft buzzer
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.linearRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.linearRampToValueAtTime(0.001, now + 0.15);
        oscillator.start(now);
        oscillator.stop(now + 0.15);
        break;
    }
  } catch (e) {
    console.error("Audio play failed", e);
  }
};
