/**
 * Audio synthesis for realistic premium paper flipping sounds.
 * Uses native Web Audio API to create a gentle "shhhk" texture dynamically.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playFlipSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const duration = 0.45; // seconds
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Create a white noise burst with subtle crackles for paper texture
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize;
      const noise = Math.random() * 2 - 1;
      
      // Add very subtle micro-crackles
      const crackle = Math.random() > 0.985 ? (Math.random() * 0.4) : 0;
      
      // Combine noise and decay
      data[i] = (noise * 0.45 + crackle * 0.55) * Math.pow(1 - t, 2.5);
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Bandpass filter to restrict the sound to paper-like rustle frequencies (about 300Hz to 6000Hz)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(2200, ctx.currentTime);
    // Sweeping the frequency down slightly mimics the slowing movement of the turn
    bandpass.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + duration);
    bandpass.Q.setValueAtTime(1.0, ctx.currentTime);

    // Lowpass filter for warming up the tone
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(3200, ctx.currentTime);
    lowpass.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + duration);

    // Volume level node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05); // quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // smooth decay

    // Connect nodes
    noiseNode.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Play
    noiseNode.start();
  } catch (error) {
    // Fail silently if browser blocks audio autoplay
    console.debug('Audio autoplay blocked or unsupported:', error);
  }
}
