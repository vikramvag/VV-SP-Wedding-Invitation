import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

import scrollImage from '../assets/images/wedding_scroll_invitation.jpg';
import fallbackImage from '../assets/images/royal_gold_blue_pastel_mockup_1781209599267.jpg';

interface RoyalLandingProps {
  onOpen: () => void;
}

interface Petal {
  id: number;
  startX: number; // percentage (0 - 100)
  delay: number; // seconds
  duration: number; // seconds
  size: number; // pixels
  swayExtra: number; // degree
}

export const RoyalLanding: React.FC<RoyalLandingProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [imgSrc, setImgSrc] = useState(scrollImage);
  const [petals, setPetals] = useState<Petal[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate gentle floating sakura/rose petals
  useEffect(() => {
    const list: Petal[] = [];
    for (let i = 0; i < 35; i++) {
      list.push({
        id: i,
        startX: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 7 + Math.random() * 10, // 7s to 17s fall
        size: 7 + Math.random() * 14, // 7px to 21px
        swayExtra: 10 + Math.random() * 25
      });
    }
    setPetals(list);
  }, []);

  const triggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpen();
  };

  // Support mouse wheels and trackpads to scroll the roll-up open
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 10 || e.deltaY < -10) {
      triggerOpen();
    }
  };

  // Prevent scroll propagation on touch devices to ensure swipe signals register
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = touchStartY.current - currentY;
    
    // Swipe distance threshold
    if (Math.abs(diffY) > 8) {
      triggerOpen();
      touchStartY.current = null;
    }
  };

  return (
    <motion.div
      ref={containerRef}
      id="royal-scroll-landing"
      onClick={triggerOpen}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      initial={{ y: 0, scaleY: 1 }}
      exit={{
        y: '-50vh',
        scaleY: 0,
        originY: 0,
        opacity: [1, 1, 0],
        transition: {
          duration: 1.35,
          ease: [0.76, 0, 0.175, 1],
          delay: 0.05
        }
      }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#070e1c] select-none overflow-hidden cursor-pointer touch-none"
      title="Tap, scroll or swipe up to unveil the wedding scroll"
    >
      {/* Absolute background patterns */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gilded-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d4af37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gilded-grid-bg)" />
        </svg>
      </div>

      {/* Realistic floating pink petal particles layered elegantly inside the viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{
              x: `${petal.startX}vw`,
              y: '-10vh',
              rotate: 0,
              opacity: 0
            }}
            animate={{
              y: '110vh',
              x: [
                `${petal.startX}vw`,
                `${petal.startX + (petal.id % 2 === 0 ? 8 : -8)}vw`,
                `${petal.startX}vw`
              ],
              rotate: [0, 180, 360],
              opacity: [0, 0.75, 0.75, 0]
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              width: petal.size,
              height: petal.size * 1.2,
              borderRadius: '50% 0 50% 50%',
              backgroundColor: '#fbcfe8', // soft light pink rose petal look
              boxShadow: '0 2px 6px rgba(251, 207, 232, 0.35)',
              opacity: 0,
              position: 'absolute'
            }}
          />
        ))}
      </div>

      {/* Central Royal Scroll Container */}
      <div className="relative w-full max-w-[430px] sm:max-w-[450px] px-4 sm:px-0">
        
        {/* Glow behind the scroll */}
        <div className="absolute inset-x-8 inset-y-12 bg-[#1e293b]/20 blur-3xl pointer-events-none rounded-full" />

        {/* Scroll Image Shell */}
        <motion.div
          id="scroll-image-frame"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative w-full aspect-[1/1.55] border border-amber-500/10 rounded-xl overflow-hidden shadow-[0_30px_70px_rgba(3,7,18,0.7)] flex justify-center items-center bg-[#070d18]"
        >
          {/* Main user uploaded masterpiece image */}
          <img
            src={imgSrc}
            onError={() => {
              if (imgSrc !== fallbackImage) {
                setImgSrc(fallbackImage);
              }
            }}
            alt="Sweta weds Vikram Royal Invitation Scroll"
            className="w-full h-full object-cover object-center z-10"
            referrerPolicy="no-referrer"
          />

          {/* Delicate border highlight around the poster card */}
          <div className="absolute inset-1.5 border border-dashed border-amber-500/20 pointer-events-none rounded-lg z-20" />
        </motion.div>

        {/* Elegant instructions below the scroll */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-6 flex flex-col items-center gap-1.5 text-center px-2 select-none pointer-events-none z-30"
        >
          <div className="flex items-center gap-2 text-[#e2c175] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.38em]">
            <Heart className="w-3 h-3 fill-current animate-pulse text-[#e2c175]" />
            <span>Tap or Scroll to Enter</span>
            <Heart className="w-3 h-3 fill-current animate-pulse text-[#e2c175]" />
          </div>
          {/* Micro-animating entry cursor indicator line */}
          <div className="h-5 w-[1.5px] bg-gradient-to-b from-[#e2c175] to-transparent mt-1 animate-bounce" />
        </motion.div>

      </div>

      {/* External luxury corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/25 pointer-events-none rounded-tl-md" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/25 pointer-events-none rounded-tr-md" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500/25 pointer-events-none rounded-bl-md" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/25 pointer-events-none rounded-br-md" />
    </motion.div>
  );
};
