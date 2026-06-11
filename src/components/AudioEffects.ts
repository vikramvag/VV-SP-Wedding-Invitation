/**
 * Audio Effects utility playing user-provided MP3 files natively.
 * Plays the background music continuously in a loop.
 * 
 * Complies with the browser autoplay permissions.
 * All other interaction/page flip sounds are disabled.
 */

let audioPlayer: HTMLAudioElement | null = null;
let isPlaying = false;

export function playFlipSound() {
  // Disabled as per user request to disable all other/interaction sounds
}

/**
 * Primary trigger to launch background MP3 music
 */
export function startBackgroundMusic() {
  if (isPlaying) return;
  isPlaying = true;

  if (!audioPlayer) {
    // Primary path is /background.mp3
    audioPlayer = new Audio('/background.mp3');
    audioPlayer.loop = true;
    audioPlayer.volume = 0.65;
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
      if (!isPlaying) return;
      if (currentIndex >= alternativePaths.length) {
        console.warn("Please upload an MP3 file named 'background.mp3' to the root directory to play background music.");
        return;
      }
      
      const path = alternativePaths[currentIndex++];
      audioPlayer = new Audio(path);
      audioPlayer.loop = true;
      audioPlayer.volume = 0.65;
      
      audioPlayer.play().then(() => {
        console.log(`Successfully playing background music from path: ${path}`);
      }).catch((e) => {
        console.debug(`Path ${path} failed to play:`, e);
        tryNextPath();
      });
    };

    tryNextPath();
  });
}

/**
 * Pause background music
 */
export function stopBackgroundMusic() {
  isPlaying = false;
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
  return isPlaying && audioPlayer ? !audioPlayer.paused : false;
}
