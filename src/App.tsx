import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoverPage } from './components/CoverPage';
import { PhotoGallery } from './components/PhotoGallery';
import { playFlipSound } from './components/AudioEffects';
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
  Plus
} from 'lucide-react';

export default function App() {
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
  const [blessing, setBlessing] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const totalPages = 6;

  // Save registry changes to localStorage
  useEffect(() => {
    localStorage.setItem('vikram_sewta_rsvp', JSON.stringify(registry));
  }, [registry]);

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

  // Drag handlers for beautiful touch turn gestures
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 55;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
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
      newErrors.blessing = 'Kindly leave a short blessing for Vikram & Sweta';
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
      blessing: blessing.trim(),
      submittedAt: new Date().toISOString()
    };

    setRegistry((prev) => [newRsvp, ...prev]);
    setFormSubmitted(true);

    // Reset form fields
    setGuestName('');
    setPhoneOrEmail('');
    setAttendance('Attending');
    setMealPreference('Vegetarian');
    setBlessing('');
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#dcd7cc] flex flex-col items-center justify-between overflow-x-hidden font-sans-lux relative py-4 px-2 sm:py-8 sm:px-4">
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
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8c7e6d] font-bold">
          Vikram &amp; Sweta &bull; Royal Invitation
        </p>
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
        <div className="relative w-full h-full bg-[#fdfbf7] rounded-r-lg border border-[#c9c4b9] shadow-[0_15px_35px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col">
          
          {/* Animated Page Flip Containment */}
          <div className="relative w-full h-full flex-1">
            <AnimatePresence initial={false} mode="wait">
              {currentPage === 0 && (
                <motion.div
                  key="page-0"
                  initial={{ rotateY: direction === 'forward' ? 0 : -90, opacity: direction === 'forward' ? 1 : 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 0, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 w-full h-full z-20"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  <CoverPage onNext={handleNext} />
                </motion.div>
              )}

              {currentPage === 1 && (
                <motion.div
                  key="page-1"
                  initial={{ rotateY: direction === 'forward' ? 90 : -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 w-full h-full z-20 bg-[#faf9f6] text-[#4a443a] p-5 xs:p-7 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  {/* Page Spine highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corners */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute bottom-4 left-4 -rotate-90 scale-[0.65] opacity-50" />
                  <GoldCorner className="absolute bottom-4 right-4 rotate-180 scale-[0.65] opacity-50" />

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col justify-between pt-4 pb-4 px-2">
                    
                    {/* Header */}
                    <div className="text-center mt-3 scale-95">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">THE CELEBRATION</span>
                      <h2 className="font-cinzel text-xl text-[#4a443a] tracking-wide mt-1">Our Sacred Union</h2>
                      <div className="h-px w-8 bg-[#8c7e6d]/30 mx-auto mt-2" />
                    </div>

                    {/* Middle Quote */}
                    <div className="my-auto text-center px-2">
                      {/* Round monogram line */}
                      <div className="w-16 h-16 border border-[#8c7e6d]/30 rounded-full mx-auto flex items-center justify-center mb-5 relative">
                        <Heart className="w-6 h-6 text-[#8c7e6d]/80 fill-[#8c7e6d]/10 animate-pulse" />
                        <span className="absolute -bottom-1 text-[8px] font-mono tracking-widest bg-[#faf9f6] px-2 text-[#8c7e6d]/80">V &amp; S</span>
                      </div>

                      <p className="font-cursive text-3xl sm:text-4xl text-[#8c7e6d] leading-none mb-4">
                        With love and laughter...
                      </p>

                      <p className="font-serif-lux text-sm sm:text-base leading-relaxed text-[#4a443a]/90 space-y-3 font-medium">
                        "Two souls, sharing a single beautiful vision. Together we take this step toward a shared tomorrow filled with faith, endless discovery, and absolute devotion."
                      </p>

                      <p className="font-serif-lux text-xs sm:text-sm leading-relaxed text-[#4a443a]/80 italic mt-4 border-t border-[#eeebe3] pt-4 max-w-[280px] mx-auto">
                        Because you have shared in our lives, our growth, and our laughter, we request the honor of your presence as we bind our souls for eternity.
                      </p>
                    </div>

                    {/* Bottom layout */}
                    <div className="text-center scale-95 flex flex-col items-center gap-1.5">
                      <GoldDivider className="scale-65 opacity-60" />
                      <div className="flex justify-center items-center gap-2 mt-1">
                        <Users2 className="w-3.5 h-3.5 text-[#8c7e6d]" />
                        <span className="text-[9px] uppercase tracking-[0.18em] text-[#8c7e6d] font-bold">Vikram &amp; Sweta</span>
                      </div>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest mt-1.5">— I —</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {currentPage === 2 && (
                <motion.div
                  key="page-2"
                  initial={{ rotateY: direction === 'forward' ? 90 : -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 w-full h-full z-20 bg-[#fdfbf7] text-[#4a443a] p-5 xs:p-7 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-[#eeebe3]" />

                  <div className="flex-1 flex flex-col pt-3 pb-2">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">Page 01 of Ceremonies</span>
                      <h2 className="font-cinzel text-lg text-[#4a443a]/90 tracking-widest mt-0.5">THE ITINERARY</h2>
                      <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-2" />
                    </div>

                    {/* Day 1 Plan info */}
                    <div className="flex-1 flex flex-col justify-center gap-4">
                      
                      {/* Plan Day Header */}
                      <div className="border-b border-[#eeebe3] pb-2 text-center">
                        <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#8c7e6d] font-bold">DAY 01 &bull; AUG 08, 2026</p>
                        <h3 className="font-serif-lux italic text-base -mt-0.5 text-[#4a443a] font-semibold">{ITINERARY[0].subtitle}</h3>
                      </div>

                      {/* Events listed */}
                      <div className="space-y-4">
                        {ITINERARY[0].events.map((event) => (
                          <div key={event.id} className="p-3 bg-white/70 rounded border border-[#eeebe3] hover:border-[#8c7e6d]/30 transition-all shadow-sm">
                            <div className="flex justify-between items-start gap-1">
                              <span className="inline-block px-1.5 py-0.5 bg-[#4a443a] text-[#faf9f6] text-[8px] font-mono tracking-wider font-semibold rounded-[2px]">
                                {event.time}
                              </span>
                              <span className="text-[9px] text-[#8c7e6d] font-semibold flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" />
                                {event.location}
                              </span>
                            </div>
                            
                            <h4 className="font-serif-lux font-bold text-sm text-[#4a443a] mt-1.5">{event.title}</h4>
                            <p className="text-[11px] leading-relaxed text-[#4a443a]/80 mt-1">{event.description}</p>
                            
                            <div className="mt-2 pt-1.5 border-t border-[#faf9f6] flex items-center gap-1.5">
                              <Sparkles className="w-2.5 h-2.5 text-[#8c7e6d] opacity-80" />
                              <span className="text-[9px] uppercase tracking-[0.05em] text-[#8c7e6d] font-bold">
                                Wear: <span className="font-normal text-[#4a443a]/90 font-serif-lux italic">{event.dressCode}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="text-center mt-2.5 flex flex-col items-center gap-1.5">
                      <span className="text-[9px] text-[#8c7e6d] font-mono">Swipe left to proceed &bull; Day 02</span>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— II —</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {currentPage === 3 && (
                <motion.div
                  key="page-3"
                  initial={{ rotateY: direction === 'forward' ? 90 : -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 w-full h-full z-20 bg-[#faf9f6] text-[#4a443a] p-5 xs:p-7 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-[#eeebe3]" />

                  <div className="flex-1 flex flex-col pt-3 pb-2">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">Page 02 of Ceremonies</span>
                      <h2 className="font-cinzel text-lg text-[#4a443a]/90 tracking-widest mt-0.5">THE ITINERARY</h2>
                      <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-2" />
                    </div>

                    {/* Day 2 Plan info */}
                    <div className="flex-1 flex flex-col justify-center gap-3 overflow-y-auto max-h-[75%] pr-1">
                      
                      {/* Plan Day Header */}
                      <div className="border-b border-[#eeebe3] pb-1.5 text-center">
                        <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#8c7e6d] font-bold">DAY 02 &bull; AUG 09, 2026</p>
                        <h3 className="font-serif-lux italic text-base -mt-0.5 text-[#4a443a] font-semibold">{ITINERARY[1].subtitle}</h3>
                      </div>

                      {/* Events listed */}
                      <div className="space-y-3">
                        {ITINERARY[1].events.map((event) => (
                          <div key={event.id} className="p-2.5 bg-white/70 rounded border border-[#eeebe3] hover:border-[#8c7e6d]/30 transition-all shadow-sm">
                            <div className="flex justify-between items-start gap-1">
                              <span className="inline-block px-1.5 py-0.5 bg-[#4a443a] text-[#faf9f6] text-[8px] font-mono tracking-wider font-semibold rounded-[2px]">
                                {event.time}
                              </span>
                              <span className="text-[9px] text-[#8c7e6d] font-semibold flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5" />
                                {event.location}
                              </span>
                            </div>
                            
                            <h4 className="font-serif-lux font-bold text-xs sm:text-sm text-[#4a443a] mt-1">{event.title}</h4>
                            <p className="text-[11px] leading-relaxed text-[#4a443a]/80 mt-0.5">{event.description}</p>
                            
                            <div className="mt-1.5 pt-1 border-t border-[#faf9f6] flex items-center gap-1.5">
                              <Sparkles className="w-2.5 h-2.5 text-[#8c7e6d] opacity-80" />
                              <span className="text-[9px] uppercase tracking-[0.05em] text-[#8c7e6d] font-bold">
                                Wear: <span className="font-normal text-[#4a443a]/90 font-serif-lux italic text-[10px]">{event.dressCode}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                    <div className="text-center mt-2.5 flex flex-col items-center gap-1.5">
                      <span className="text-[9px] text-[#8c7e6d] font-mono">Next Page &bull; Special Moments Gallery</span>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— III —</span>
                    </div>

                  </div>
                </motion.div>
              )}

              {currentPage === 4 && (
                <motion.div
                  key="page-4"
                  initial={{ rotateY: direction === 'forward' ? 90 : -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 w-full h-full z-20 bg-[#faf9f6] text-[#4a443a] p-5 xs:p-7 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />

                  <PhotoGallery />
                </motion.div>
              )}

              {currentPage === 5 && (
                <motion.div
                  key="page-5"
                  initial={{ rotateY: direction === 'forward' ? 90 : -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: direction === 'forward' ? -90 : 90, opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="absolute inset-0 w-full h-full z-20 bg-[#fdfbf7] text-[#4a443a] p-5 xs:p-7 sm:p-8 flex flex-col justify-between paper-texture paper-fiber rounded-r-lg"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

                  {/* Corner details */}
                  <GoldCorner className="absolute top-4 left-4 rotate-0 scale-[0.6] opacity-35" />
                  <GoldCorner className="absolute top-4 right-4 rotate-90 scale-[0.6] opacity-35" />

                  <div className="flex-1 flex flex-col pt-3 pb-1">
                    {/* Header */}
                    <div className="text-center mb-3">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c7e6d] font-bold">Honored Invitation</span>
                      <h2 className="font-cinzel text-lg text-[#4a443a]/90 tracking-widest mt-0.5">KINDLY RESPOND</h2>
                      <div className="h-[1.5px] w-12 bg-[#8c7e6d] mx-auto mt-1" />
                    </div>

                    {/* RSVP Form body */}
                    <div className="flex-1 flex flex-col justify-center">
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
                                <option value="Unsure">Maybe</option>
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
                                <option value="Vegan">Vegan</option>
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
                            className="w-full mt-2 py-2.5 bg-[#4a443a] text-[#faf9f6] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#8c7e6d] transition-colors focus:ring-1 focus:ring-[#8c7e6d] focus:outline-none cursor-pointer rounded-none"
                          >
                            Confirm Attendance
                          </button>
                        </form>
                      )}
                    </div>

                    <div className="text-center mt-2 flex flex-col items-center gap-1.5">
                      <span className="text-[9px] text-[#8c7e6d] font-mono">We look forward to celebrating with you!</span>
                      <span className="text-[10px] text-[#8c7e6d]/65 font-mono tracking-widest">— V —</span>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book Bottom Rib/Overlay */}
          <div className="absolute bottom-0 right-0 left-0 h-1 bg-[#8c7e6d]/15 pointer-events-none" />
        </div>
      </main>

      {/* Ornate custom footer with navigation controls and dots */}
      <footer className="w-full max-w-[430px] flex flex-col items-center gap-3 mt-4 select-none z-10 scale-95">
        
        {/* Bullets indicator */}
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

        {/* Previous and Next Navigation keys layout */}
        <div className="w-full flex items-center justify-between border-t border-[#eeebe3]/80 pt-3 px-1.5 text-xs text-[#4a443a]">
          
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold hover:text-[#8c7e6d] transition-all disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="font-mono text-[10px] font-bold tracking-[0.1em] text-[#8c7e6d]">
            PAGE {currentPage + 1} OF {totalPages}
          </span>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center gap-1.5 uppercase tracking-widest text-[10px] font-bold hover:text-[#8c7e6d] transition-all disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* Tips indicator */}
        <p className="text-[10px] text-[#8c7e6d] font-sans-lux text-center opacity-70 italic">
          Tip: You can also use swipe gestures left/right to flip pages like a real book.
        </p>
      </footer>
    </div>
  );
}
