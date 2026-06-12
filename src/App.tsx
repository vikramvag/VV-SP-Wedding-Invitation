import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoverPage } from './components/CoverPage';
import { PhotoGallery } from './components/PhotoGallery';
import { RoyalLanding } from './components/RoyalLanding';
import { playFlipSound, startBackgroundMusic, stopBackgroundMusic, isMusicPlaying } from './components/AudioEffects';
import { ITINERARY, INITIAL_REGISTRY } from './data';
import { DayPlan, RSVPResponse, AttendanceStatus, MealOption } from './types';
import { GoldCorner, GoldDivider, GoldGradientDef } from './components/GoldOrnaments';
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Heart, 
  UserCheck, 
  Share2,
  CheckCircle2,
  Users2,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';

const pageVariants = {
  initial: (direction: 'forward' | 'backward') => {
    const isForward = direction === 'forward';
    return {
      rotateY: isForward ? 0 : -135,
      opacity: 0,
      scale: isForward ? 0.96 : 1,
      zIndex: isForward ? 10 : 30,
    };
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    zIndex: 20,
    transition: {
      duration: 0.75,
      ease: [0.2, 0.85, 0.4, 1],
    }
  },
  exit: (direction: 'forward' | 'backward') => {
    const isForward = direction === 'forward';
    return {
      rotateY: isForward ? -135 : 0,
      opacity: 0,
      scale: isForward ? 1 : 0.96,
      zIndex: isForward ? 30 : 10,
      transition: {
        duration: 0.75,
        ease: [0.2, 0.85, 0.4, 1],
      }
    };
  }
};

export default function App() {
  const [landingOpened, setLandingOpened] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [registry, setRegistry] = useState<RSVPResponse[]>(() => {
    try {
      const saved = localStorage.getItem('vikram_sewta_rsvp');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRY;
    } catch {
      return INITIAL_REGISTRY;
    }
  });

  // Current page transition direction
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // RSVP Form States
  const [guestName, setGuestName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('Attending');
  const [mealPreference, setMealPreference] = useState<MealOption>('Vegetarian');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [blessing, setBlessing] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const totalPages = 5;
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Google Form Option 2 Integration State
  const [googleFormSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('vikram_sewta_google_form_settings');
      return saved ? JSON.parse(saved) : {
        syncEnabled: true,
        googleFormUrl: '',
        entryMappings: {
          guestName: 'entry.582490159',
          phoneOrEmail: 'entry.420658514',
          guestCount: 'entry.492582103',
          attendance: 'entry.159250493',
          mealPreference: 'entry.105928351',
          blessing: 'entry.920581938'
        }
      };
    } catch {
      return {
        syncEnabled: true,
        googleFormUrl: '',
        entryMappings: {
          guestName: 'entry.582490159',
          phoneOrEmail: 'entry.420658514',
          guestCount: 'entry.492582103',
          attendance: 'entry.159250493',
          mealPreference: 'entry.105928351',
          blessing: 'entry.920581938'
        }
      };
    }
  });

  // Helper to submit to Google Forms
  const submitToGoogleFormLocal = async (rsvp: RSVPResponse, settings: any) => {
    if (!settings?.googleFormUrl) return { success: false, message: 'Google Form URL is empty' };
    
    let responseUrl = settings.googleFormUrl.trim();
    try {
      const urlObj = new URL(responseUrl);
      if (urlObj.pathname.endsWith('/viewform')) {
        urlObj.pathname = urlObj.pathname.replace('/viewform', '/formResponse');
      } else if (!urlObj.pathname.endsWith('/formResponse')) {
        urlObj.pathname = urlObj.pathname.replace(/\/?$/, '/formResponse');
      }
      urlObj.search = '';
      responseUrl = urlObj.toString();
    } catch (e) {
      if (responseUrl.includes('/viewform')) {
        responseUrl = responseUrl.replace('/viewform', '/formResponse');
      }
    }

    const formData = new URLSearchParams();
    const mappings = settings.entryMappings;
    
    if (mappings.guestName) formData.append(mappings.guestName, rsvp.guestName);
    if (mappings.phoneOrEmail) formData.append(mappings.phoneOrEmail, rsvp.phoneOrEmail);
    if (mappings.guestCount) formData.append(mappings.guestCount, String(rsvp.guestCount));
    if (mappings.attendance) formData.append(mappings.attendance, rsvp.attendance);
    if (mappings.mealPreference) formData.append(mappings.mealPreference, rsvp.mealPreference);
    if (mappings.blessing) formData.append(mappings.blessing, rsvp.blessing);

    try {
      await fetch(responseUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
      return { success: true, message: 'Success' };
    } catch (err: any) {
      console.error('Error in background sync:', err);
      return { success: false, message: err.message || 'Network error' };
    }
  };

  // Poll actual HTML5 audio state periodically to keep React UI controls perfectly in sync
  useEffect(() => {
    if (!landingOpened) return;
    const interval = setInterval(() => {
      setMusicPlaying(isMusicPlaying());
    }, 600);
    return () => clearInterval(interval);
  }, [landingOpened]);

  const handleMusicToggle = () => {
    if (isMusicPlaying()) {
      stopBackgroundMusic();
      setMusicPlaying(false);
    } else {
      startBackgroundMusic();
      setMusicPlaying(true);
    }
  };

  // Save registry changes to localStorage
  useEffect(() => {
    localStorage.setItem('vikram_sewta_rsvp', JSON.stringify(registry));
  }, [registry]);

  // First interaction auto-player to bypass browser autoplay blocks safely and play background music continuously
  useEffect(() => {
    const handleFirstTouch = () => {
      if (!isMusicPlaying()) {
        startBackgroundMusic();
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };

    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);
    window.addEventListener('keydown', handleFirstTouch);

    return cleanup;
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      playFlipSound();
      setDirection('forward');
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      playFlipSound();
      setDirection('backward');
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageIndex: number) => {
    if (pageIndex !== currentPage) {
      playFlipSound();
      setDirection(pageIndex > currentPage ? 'forward' : 'backward');
      setCurrentPage(pageIndex);
    }
  };

  // Native touch/pointer gestures for page flipping (highly reliable, doesn't interfere with child/button clicks)
  const pointerStartRef = React.useRef<number | null>(null);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = React.useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only handle mouse events via pointers to prevent conflict with touch events
    if (e.pointerType === 'touch') return;
    const target = e.target as HTMLElement;
    // Don't intercept gestures on interactive elements
    if (
      target.closest('button') || 
      target.closest('input') || 
      target.closest('select') || 
      target.closest('textarea')
    ) {
      return;
    }
    pointerStartRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (pointerStartRef.current === null) return;
    const diff = pointerStartRef.current - e.clientX;
    const swipeThreshold = 55;

    if (diff > swipeThreshold) {
      handleNext();
    } else if (diff < -swipeThreshold) {
      handlePrev();
    }
    pointerStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    // Don't intercept gestures on interactive elements
    if (
      target.closest('button') || 
      target.closest('input') || 
      target.closest('select') || 
      target.closest('textarea')
    ) {
      return;
    }
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const diffX = touchStartRef.current.x - touchEndRef.current.x;
    const diffY = touchStartRef.current.y - touchEndRef.current.y;
    const swipeThreshold = 45; // Highly responsive swipe on small devices

    // Horizontal swipe threshold must be met and horizontal movement must outweigh vertical deviation
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  // RSVP Form Submission
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!guestName.trim()) {
      newErrors.guestName = 'Please enter your name(s)';
    }
    if (!phoneOrEmail.trim()) {
      newErrors.phoneOrEmail = 'Please provide an email or phone number';
    }
    if (!blessing.trim()) {
      newErrors.blessing = 'Kindly leave a short blessing for Sweta & Vikram';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const newRsvp: RSVPResponse = {
      id: `custom-${Date.now()}`,
      guestName: guestName.trim(),
      phoneOrEmail: phoneOrEmail.trim(),
      attendance,
      mealPreference,
      guestCount,
      blessing: blessing.trim(),
      submittedAt: new Date().toISOString()
    };

    setRegistry((prev) => [newRsvp, ...prev]);
    setFormSubmitted(true);

    // Live Sync to Google Sheets (Option 2) if configured
    if (googleFormSettings.googleFormUrl) {
      submitToGoogleFormLocal(newRsvp, googleFormSettings);
    }

    // Reset form fields
    setGuestName('');
    setPhoneOrEmail('');
    setAttendance('Attending');
    setMealPreference('Vegetarian');
    setGuestCount(1);
    setBlessing('');
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#dcd7cc] flex flex-col items-center justify-between overflow-x-hidden font-sans-lux relative py-4 px-2 sm:py-8 sm:px-4">
      {/* 3D Paper-Cut Royal Landing Page Overlay */}
      <AnimatePresence>
        {!landingOpened && (
          <RoyalLanding 
            onOpen={() => {
              setLandingOpened(true);
              startBackgroundMusic();
            }} 
          />
        )}
      </AnimatePresence>

      {/* Floating Music Controller */}
      {landingOpened && (
        <button
          onClick={handleMusicToggle}
          className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 text-[#e2c175] bg-[#4a443a]/95 backdrop-blur-sm rounded-full border border-[#8c7e6d]/30 shadow-lg hover:bg-[#4a443a] transition-all flex items-center justify-center cursor-pointer group"
          title={musicPlaying ? "Mute Background Music" : "Play Background Music"}
        >
          {musicPlaying ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest hidden group-hover:inline-block">PLAYING</span>
              <Volume2 className="w-4 h-4 animate-bounce" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest hidden group-hover:inline-block">PAUSED</span>
              <VolumeX className="w-4 h-4" />
            </div>
          )}
        </button>
      )}

      {/* Absolute background patterns */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <GoldGradientDef />

      {/* Decorative Top subtle title */}
      <header className="text-center z-10 w-full mb-2 sm:mb-4 select-none">
      </header>

      {/* Main realistic book assembly */}
      <main className="w-full max-w-[430px] sm:max-w-[450px] aspect-[1/1.55] relative flex-1 flex items-center justify-center select-none z-10 my-1 xs:my-3">
        
        {/* Book shadow base & depth stacking layer underneath */}
        <div className="absolute -inset-1.5 sm:-inset-3 bg-[#bebaaf] rounded-r-xl rounded-l-md blur-xl opacity-75 pointer-events-none" />
        <div className="absolute -right-2 top-2 bottom-2 w-4 bg-[#b5b1a6] rounded-r shadow-md opacity-70 pointer-events-none" />
        <div className="absolute -right-4 top-4 bottom-4 w-4 bg-[#aaa69b] rounded-r shadow-md opacity-30 pointer-events-none" />

        {/* Outer hardbound binding spine on Left Edge */}
        <div className="absolute top-0 bottom-0 -left-3 sm:-left-4 w-4 sm:w-5 bg-gradient-to-r from-[#4a443a] via-[#5c5549] to-[#36312a] rounded-l shadow-2xl z-40 flex flex-col justify-between py-12 pointer-events-none border-r border-[#8c7e6d]/20">
          <div className="w-full h-1 bg-[#8c7e6d]/30" />
          <div className="w-full h-1 bg-[#8c7e6d]/30" />
          <div className="w-full h-1 bg-[#8c7e6d]/30" />
        </div>

        {/* Inner book stack board frame */}
        <div className="relative w-full h-full bg-[#fdfbf7] rounded-r-lg border border-[#c9c4b9] shadow-[0_15px_35px_rgba(0,0,0,0.18)] flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Animated Page Flip Containment */}
          <div className="relative w-full h-full flex-1" style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}>
            <AnimatePresence initial={true} custom={direction}>
              {currentPage === 0 && (
                <motion.div
                  key="page-0"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ 
                    transformOrigin: 'left center', 
                    backfaceVisibility: 'hidden', 
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="absolute inset-0 w-full h-full touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <CoverPage onNext={handleNext} />
                  {/* Real-time page shadow during flip */}
                  <motion.div 
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-30"
                  />
                </motion.div>
              )}

              {currentPage === 1 && (
                <motion.div
                  key="page-1"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ 
                    transformOrigin: 'left center', 
                    backfaceVisibility: 'hidden', 
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="absolute inset-0 w-full h-full bg-[#faf9f6] text-[#4a443a] p-4 xs:p-6 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Real-time page shadow during flip */}
                  <motion.div 
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-30"
                  />
                  {/* Page Spine highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corners */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute bottom-4 left-4 -rotate-90 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute bottom-4 right-4 rotate-180 scale-[0.65] opacity-50" />

                  {/* Content Container */}
                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col justify-between pt-4 pb-4 px-2">
                    
                    {/* Header */}
                    <div className="text-center mt-3 scale-95">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">THE CELEBRATION OF</span>
                      <h2 className="font-cinzel text-xl text-[#4a443a] tracking-wide mt-1">Our Sacred Union</h2>
                      <div className="h-px w-8 bg-[#8c7e6d]/30 mx-auto mt-2" />
                    </div>

                    {/* Middle Quote */}
                    <div className="my-auto text-center px-2">
                      {/* Round monogram line with interlocking gold rings */}
                      <div className="w-16 h-16 border border-[#8c7e6d]/30 rounded-full mx-auto flex items-center justify-center mb-5 relative">
                        <svg className="w-8 h-8 text-[#8c7e6d]" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="38" cy="30" r="18" stroke="#8c7e6d" strokeWidth="4" />
                          <circle cx="62" cy="30" r="18" stroke="#8c7e6d" strokeWidth="4" />
                          <path d="M 50 12 A 18 18 0 0 1 56 30" stroke="#faf9f6" strokeWidth="5.5" strokeLinecap="round" />
                          <path d="M 50 12 A 18 18 0 0 1 56 30" stroke="#8c7e6d" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <span className="absolute -bottom-1 text-[8px] font-mono tracking-widest bg-[#faf9f6] px-2 text-[#8c7e6d]/80">S &amp; V</span>
                      </div>

                      <p className="font-cursive text-3xl sm:text-4xl text-[#8c7e6d] leading-none mb-4">
                        With love and laughter...
                      </p>

                      <p className="font-serif-lux text-sm sm:text-base leading-relaxed text-[#4a443a]/90 space-y-3 font-medium">
                        Together we take this step towards a shared tomorrow filled with joy, love, respect and absolute devotion
                      </p>

                      <p className="font-serif-lux text-xs sm:text-sm leading-relaxed text-[#4a443a]/80 italic mt-4 border-t border-[#eeebe3] pt-4 max-w-[280px] mx-auto">
                        we request the honor of your presence as we bind our souls for eternity
                      </p>
                    </div>

                    {/* Bottom layout */}
                    <div className="text-center scale-95 flex flex-col items-center gap-1.5 text-[#8c7e6d]">
                      <GoldDivider className="scale-65 opacity-60" />
                      <div className="flex justify-center items-center gap-2 mt-1">
                        <span className="text-[9px] uppercase tracking-[0.18em] text-[#8c7e6d] font-bold">Sweta &amp; Vikram</span>
                      </div>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest mt-1.5">— I —</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {currentPage === 2 && (
                <motion.div
                  key="page-2"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ 
                    transformOrigin: 'left center', 
                    backfaceVisibility: 'hidden', 
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="absolute inset-0 w-full h-full bg-[#fdfbf7] text-[#4a443a] p-4 xs:p-6 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Real-time page shadow during flip */}
                  <motion.div 
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-30"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-[#eeebe3]" />

                  <div className="flex-1 flex flex-col pt-3 pb-2 min-h-0">
                    {/* Header */}
                    <div className="text-center mb-3">
                      <h2 className="font-cinzel text-base sm:text-lg text-[#4a443a]/90 tracking-widest mt-0.5">Wedding Itinerary</h2>
                      <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-1.5" />
                    </div>

                    {/* Unified scroll list */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col gap-4">
                      
                      {/* Day 1 Section */}
                      <div className="space-y-2.5">
                        <div className="border-b border-[#eeebe3] pb-1 bg-[#4a443a]/5 p-2 rounded text-center shrink-0">
                          <p className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#8c7e6d] font-bold">DAY 01 &bull; AUG 08, 2026</p>
                          <h3 className="font-serif-lux italic text-xs sm:text-sm text-[#4a443a] font-semibold">{ITINERARY[0].subtitle}</h3>
                        </div>

                        {/* Events listed */}
                        <div className="space-y-2">
                          {ITINERARY[0].events.map((event) => (
                            <div key={event.id} className="p-2.5 bg-white/70 rounded border border-[#eeebe3] hover:border-[#8c7e6d]/30 transition-all shadow-sm">
                              <div className="flex justify-between items-center gap-1">
                                <span className="inline-block px-1.5 py-0.5 bg-[#4a443a] text-[#faf9f6] text-[8px] font-mono tracking-wider font-semibold rounded-[2px] shrink-0">
                                  {event.time}
                                </span>
                                <span className="text-[9px] text-[#8c7e6d] font-semibold flex items-center gap-1 max-w-[65%] truncate font-sans-lux">
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate">{event.location}</span>
                                </span>
                              </div>
                              
                              <h4 className="font-serif-lux font-bold text-xs sm:text-sm text-[#4a443a] mt-1.5">{event.title}</h4>
                              <p className="text-[10px] leading-relaxed text-[#4a443a]/80 mt-1">{event.description}</p>
                              
                              {event.dressCode && (
                                <div className="mt-2 pt-1.5 border-t border-[#faf9f6]/95 flex items-center gap-1.5">
                                  <Sparkles className="w-2.5 h-2.5 text-[#8c7e6d] opacity-80 shrink-0" />
                                  <span className="text-[9px] uppercase tracking-[0.05em] text-[#8c7e6d] font-bold truncate">
                                    Wear: <span className="font-normal text-[#4a443a]/90 font-serif-lux italic text-[10px] sm:text-[11px]">{event.dressCode}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Spacer / Decorative Gilded Divider */}
                      <div className="flex items-center justify-center gap-2 py-1 select-none shrink-0">
                        <div className="h-px w-6 bg-[#8c7e6d]/30" />
                        <Sparkles className="w-2.5 h-2.5 text-[#e2c175]" />
                        <div className="h-px w-6 bg-[#8c7e6d]/30" />
                      </div>

                      {/* Day 2 Section */}
                      <div className="space-y-2.5">
                        <div className="border-b border-[#eeebe3] pb-1 bg-[#4a443a]/5 p-2 rounded text-center shrink-0">
                          <p className="font-cinzel text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#8c7e6d] font-bold">DAY 02 &bull; AUG 09, 2026</p>
                          <h3 className="font-serif-lux italic text-xs sm:text-sm text-[#4a443a] font-semibold">{ITINERARY[1].subtitle}</h3>
                        </div>

                        {/* Events listed */}
                        <div className="space-y-2">
                          {ITINERARY[1].events.map((event) => (
                            <div key={event.id} className="p-2.5 bg-white/70 rounded border border-[#eeebe3] hover:border-[#8c7e6d]/30 transition-all shadow-sm">
                              <div className="flex justify-between items-center gap-1">
                                <span className="inline-block px-1.5 py-0.5 bg-[#4a443a] text-[#faf9f6] text-[8px] font-mono tracking-wider font-semibold rounded-[2px] shrink-0">
                                  {event.time}
                                </span>
                                <span className="text-[9px] text-[#8c7e6d] font-semibold flex items-center gap-1 max-w-[65%] truncate">
                                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                                  <span className="truncate">{event.location}</span>
                                </span>
                              </div>
                              
                              <h4 className="font-serif-lux font-bold text-xs sm:text-sm text-[#4a443a] mt-1.5">{event.title}</h4>
                              <p className="text-[10px] leading-relaxed text-[#4a443a]/80 mt-1">{event.description}</p>
                              
                              {event.dressCode && (
                                <div className="mt-2 pt-1.5 border-t border-[#faf9f6] flex items-center gap-1.5">
                                  <Sparkles className="w-2.5 h-2.5 text-[#8c7e6d] opacity-80 shrink-0" />
                                  <span className="text-[9px] uppercase tracking-[0.05em] text-[#8c7e6d] font-bold truncate">
                                    Wear: <span className="font-normal text-[#4a443a]/90 font-serif-lux italic text-[10px] sm:text-[11px]">{event.dressCode}</span>
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="text-center mt-2 flex flex-col items-center gap-1 shrink-0">
                      <span className="text-[9px] text-[#8c7e6d] font-mono">Next Page &bull; Kindly Respond</span>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— II —</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {currentPage === 3 && (
                <motion.div
                  key="page-3"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ 
                    transformOrigin: 'left center', 
                    backfaceVisibility: 'hidden', 
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="absolute inset-0 w-full h-full bg-[#fdfbf7] text-[#4a443a] p-4 xs:p-6 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Real-time page shadow during flip */}
                  <motion.div 
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-30"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />

                  <div className="flex-1 flex flex-col pt-3 pb-1 min-h-0">
                    {/* Header */}
                    <div className="text-center mb-3 text-amber-900/100">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">Honored Invitation</span>
                      <h2 className="font-cinzel text-lg text-[#4a443a]/90 tracking-widest mt-0.5">KINDLY RESPOND</h2>
                      <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-1" />
                    </div>

                    {/* RSVP Form body */}
                    <div className="flex-1 min-h-0 overflow-y-auto pr-1 flex flex-col justify-start py-0.5">
                      {formSubmitted ? (
                        <motion.div 
                           initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-center py-6 px-4 bg-white/75 rounded border border-[#eeebe3] flex flex-col items-center gap-3 shadow-md"
                        >
                          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="font-cinzel text-base font-bold text-[#4a443a]">Response Received!</h3>
                            <p className="font-serif-lux text-xs italic text-[#8c7e6d] mt-1">Thank you. Your blessings and preferences have been noted.</p>
                          </div>
                          <button
                            onClick={() => setFormSubmitted(false)}
                            className="text-[9px] font-mono uppercase tracking-widest text-[#8c7e6d] hover:text-[#4a443a] underline underline-offset-2 mt-4 cursor-pointer font-bold"
                          >
                            Submit Another Response
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleRSVPSubmit} className="space-y-3.5">
                          
                          {/* Name Field */}
                          <div>
                            <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Guest Name(s)</label>
                            <input 
                              type="text" 
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="Enter name(s)" 
                              className="w-full bg-white/60 px-2.5 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none placeholder:italic placeholder:opacity-40 rounded-[2px]" 
                            />
                            {errors.guestName && (
                              <p className="text-[9px] text-[#8c7e6d] mt-0.5 font-bold italic">{errors.guestName}</p>
                            )}
                          </div>

                          {/* Contact Details */}
                          <div>
                            <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Phone or Email</label>
                            <input 
                              type="text" 
                              value={phoneOrEmail}
                              onChange={(e) => setPhoneOrEmail(e.target.value)}
                              placeholder="example@email.com or +91..." 
                              className="w-full bg-white/60 px-2.5 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none placeholder:italic placeholder:opacity-40 rounded-[2px]" 
                            />
                            {errors.phoneOrEmail && (
                              <p className="text-[9px] text-[#8c7e6d] mt-0.5 font-bold italic">{errors.phoneOrEmail}</p>
                            )}
                          </div>

                          {/* Number of Guests Dropdown */}
                          <div>
                            <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Number of Guests (Including You)</label>
                            <select 
                              value={guestCount}
                              onChange={(e) => setGuestCount(Number(e.target.value))}
                              className="w-full bg-white/60 px-2 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none rounded-[2px] font-sans-lux font-semibold"
                            >
                              <option value={1}>1 Guest</option>
                              <option value={2}>2 Guests</option>
                              <option value={3}>3 Guests</option>
                              <option value={4}>4 Guests</option>
                            </select>
                          </div>

                          {/* Attendance selector split */}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Attendance</label>
                              <select 
                                value={attendance}
                                onChange={(e) => setAttendance(e.target.value as AttendanceStatus)}
                                className="w-full bg-white/60 px-2 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none rounded-[2px] font-sans-lux font-semibold"
                              >
                                <option value="Attending">Attending</option>
                                <option value="Declined">Cannot Attend</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Meal Preference</label>
                              <select 
                                value={mealPreference}
                                onChange={(e) => setMealPreference(e.target.value as MealOption)}
                                className="w-full bg-white/60 px-2 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none rounded-[2px] font-sans-lux font-semibold"
                              >
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Veg</option>
                              </select>
                            </div>
                          </div>

                          {/* Blessing Area */}
                          <div>
                            <label className="text-[10px] uppercase tracking-wider block mb-0.5 text-[#8c7e6d] font-bold">Wedding Blessings</label>
                            <textarea 
                              rows={2.5}
                              value={blessing}
                              onChange={(e) => setBlessing(e.target.value)}
                              placeholder="Write a warm message or greeting for the couple..." 
                              className="w-full bg-white/60 px-2.5 py-1.5 border border-[#d1cec4] focus:border-[#8c7e6d] text-xs focus:outline-none placeholder:italic placeholder:opacity-40 rounded-[2px]" 
                            />
                            {errors.blessing && (
                              <p className="text-[9px] text-[#8c7e6d] mt-0.5 font-bold italic">{errors.blessing}</p>
                            )}
                          </div>

                          {/* Submit button */}
                          <button 
                            type="submit" 
                            className="w-full mt-2 py-2.5 bg-[#4a443a] text-[#faf9f6]/95 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#8c7e6d] transition-colors focus:ring-1 focus:ring-[#8c7e6d] focus:outline-none cursor-pointer rounded-none"
                          >
                            Confirm Attendance
                          </button>
                        </form>
                      )}
                    </div>

                    <div className="text-center mt-2 flex flex-col items-center gap-1">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#8c7e6d] font-bold animate-pulse">Respond by 20th June</p>
                      <span className="text-[9px] text-[#8c7e6d] font-mono">Next Page &bull; Photo Gallery</span>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— III —</span>
                    </div>

                  </div>


                </motion.div>
              )}

              {currentPage === 4 && (
                <motion.div
                  key="page-4"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ 
                    transformOrigin: 'left center', 
                    backfaceVisibility: 'hidden', 
                    transformStyle: 'preserve-3d',
                    position: 'absolute',
                    inset: 0,
                  }}
                  className="absolute inset-0 w-full h-full bg-[#faf9f6] text-[#4a443a] p-4 xs:p-6 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg touch-pan-y"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Real-time page shadow during flip */}
                  <motion.div 
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/5 to-transparent pointer-events-none z-30"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />

                  <PhotoGallery />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book Bottom Rib/Overlay */}
          <div className="absolute bottom-0 right-0 left-0 h-1 bg-[#8c7e6d]/15 pointer-events-none" />
        </div>
      </main>

      {/* Ornate custom footer with navigation controls and dots */}
      <footer className="w-full max-w-[430px] flex flex-col items-center select-none z-10 scale-95 mt-3">
        
        {/* Navigation keys and bullets layout on a single line */}
        <div className="w-full flex items-center justify-between border-t border-[#eeebe3]/80 pt-3 px-1.5 text-xs text-[#4a443a]">
          
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold hover:text-[#8c7e6d] transition-all disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Bullets indicator in the center */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  currentPage === index 
                    ? 'w-7 bg-[#4a443a] ring-1 ring-[#8c7e6d]' 
                    : 'w-2.5 bg-[#8c7e6d]/40 hover:bg-[#8c7e6d]/70'
                }`}
                title={`Flip to Page ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold hover:text-[#8c7e6d] transition-all disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </footer>
    </div>
  );
}
