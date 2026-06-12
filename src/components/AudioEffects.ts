/**
 * Audio Effects utility playing user-provided MP3 files natively.
 * Plays the background music continuously in a loop.
 * 
 * Complies with the browser autoplay permissions.
 * All other interaction/page flip sounds are disabled.
 */

let audioPlayer: HTMLAudioElement | null = null;

// Eagerly initialize and preload the audio element to maximize compatibility with mobile browsers (Android and iOS)
if (typeof window !== 'undefined') {
  try {
    audioPlayer = new Audio('/background.mp3');
    audioPlayer.loop = true;
    audioPlayer.volume = 0.65;
    audioPlayer.preload = 'auto';
    audioPlayer.load();
    console.log("Audio player eagerly initialized and preloading background.mp3");
  } catch (e) {
    console.warn("Could not eagerly initialize audio player:", e);
  }
}

export function playFlipSound() {
  // Disabled as per user request to disable all other/interaction sounds
}

/**
 * Primary trigger to launch background MP3 music
 */
export function startBackgroundMusic() {
  // If already playing, do nothing
  if (audioPlayer && !audioPlayer.paused) {
    return;
  }

  if (!audioPlayer) {
    try {
      audioPlayer = new Audio('/background.mp3');
      audioPlayer.loop = true;
      audioPlayer.volume = 0.65;
      audioPlayer.preload = 'auto';
    } catch (e) {
      console.error("Failed to create Audio instance:", e);
      return;
    }
  }

  audioPlayer.play().then(() => {
    console.log("Traditional background music started successfully!");
  }).catch((err) => {
    console.debug("Failed opening primary /background.mp3, trying alternative paths...", err);
    
    // Attempt fallback relative paths
    const alternativePaths = [
      '/music.mp3',
      '/wedding_song.mp3',
      'background.mp3',
      'music.mp3',
      'wedding_song.mp3',
      './background.mp3',
      './music.mp3',
      './wedding_song.mp3'
    ];

    let currentIndex = 0;
    const tryNextPath = () => {
      if (currentIndex >= alternativePaths.length) {
        console.warn("Please upload an MP3 file named 'background.mp3' to the root directory to play background music.");
        return;
      }
      
      const path = alternativePaths[currentIndex++];
      try {
        audioPlayer = new Audio(path);
        audioPlayer.loop = true;
        audioPlayer.volume = 0.65;
        audioPlayer.preload = 'auto';
        
        audioPlayer.play().then(() => {
          console.log(`Successfully playing background music from path: ${path}`);
        }).catch((e) => {
          console.debug(`Path ${path} failed to play:`, e);
          tryNextPath();
        });
      } catch (err) {
        console.debug(`Error creating audio for path ${path}:`, err);
        tryNextPath();
      }
    };

    tryNextPath();
  });
}

/**
 * Pause background music
 */
export function stopBackgroundMusic() {
  if (audioPlayer) {
    try {
      audioPlayer.pause();
    } catch (e) {
      console.debug("Error pausing player:", e);
    }
  }
}

/**
 * Query check for playing playback state
 */
export function isMusicPlaying(): boolean {
  return audioPlayer ? !audioPlayer.paused : false;
}
