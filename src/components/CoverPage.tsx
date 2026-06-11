import React from 'react';
import { motion } from 'motion/react';
import { GoldCorner, GoldGanesha, GoldDivider } from './GoldOrnaments';

interface CoverPageProps {
  onNext: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onNext }) => {
  // Ultra-refined letterpress charcoal/taupe text style for helper texts
  const standardTextStyle: React.CSSProperties = {
    color: '#4a443a',
    filter: 'drop-shadow(0px 0.5px 0.5px rgba(255, 255, 255, 0.8))',
    letterSpacing: '0.22em',
  };

  // Light gold gradient text style for labels and dividers
  const goldLabelStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(135deg, #b38728 0%, #d4af37 50%, #aa771c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.22em',
    fontWeight: 'bold',
  };

  // Simple gold text without gradient and simple drop shadow
  const goldSolidStyle: React.CSSProperties = {
    color: '#d4af37',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.24)',
    fontFamily: "'Alex Brush', 'Great Vibes', 'Pinyon Script', cursive",
  };

  return (
    <div 
      className="absolute inset-0 select-none overflow-hidden h-full flex flex-col justify-between p-6 xs:p-8 sm:p-10 rounded-r-lg bg-[#faf9f6] paper-texture paper-fiber"
      style={{
        boxShadow: 'inset 0 0 45px rgba(140, 126, 109, 0.08), inset 12px 0 15px rgba(255, 255, 255, 0.95), inset -12px 0 15px rgba(0, 0, 0, 0.04), 4px 0 15px rgba(0, 0, 0, 0.12)',
      }}
    >
      {/* Page Spine overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-4 left-spine-gradient pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 right-spine-gradient pointer-events-none" />

      {/* Elegant, thin border matching luxury stationery */}
      <div 
        className="absolute inset-[15px] sm:inset-[22px] pointer-events-none rounded-[3px]" 
        style={{
          border: '1px solid rgba(140, 126, 109, 0.25)',
          boxShadow: 'inset 0 0 10px rgba(140, 126, 109, 0.04)',
        }}
      />
      <div 
        className="absolute inset-[18px] sm:inset-[26px] pointer-events-none rounded-[2px]" 
        style={{
          border: '0.5px dashed rgba(140, 126, 109, 0.15)',
        }}
      />

      {/* Decorative Stamp Corner Ornaments (Gold) */}
      <GoldCorner className="absolute top-5 left-5 rotate-0 scale-[0.65] xs:scale-[0.8] opacity-75" strokeGradient="gold-gradient-ornament" />
      <GoldCorner className="absolute top-5 right-5 rotate-90 scale-[0.65] xs:scale-[0.8] opacity-75" strokeGradient="gold-gradient-ornament" />
      <GoldCorner className="absolute bottom-5 left-5 -rotate-90 scale-[0.65] xs:scale-[0.8] opacity-75" strokeGradient="gold-gradient-ornament" />
      <GoldCorner className="absolute bottom-5 right-5 rotate-180 scale-[0.65] xs:scale-[0.8] opacity-75" strokeGradient="gold-gradient-ornament" />

      {/* Top Header - Ornate invitation call */}
      <div className="text-center mt-6 xs:mt-8 z-10 scale-95 sm:scale-100">
        <span 
          className="font-cinzel text-[10px] xs:text-xs font-bold tracking-[0.28em]"
          style={standardTextStyle}
        >
          IN THE SACRED BOND OF HOLY MATRIMONY
        </span>
        <div className="h-px w-10 bg-[#8c7e6d]/30 mx-auto mt-2" />
      </div>

      {/* Central Names & Mandala */}
      <div className="flex-1 flex flex-col justify-center items-center my-2 z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-20 h-20 xs:w-26 xs:h-26 mb-3 sm:mb-4 relative"
        >
          {/* Gold Ganesha foil stamp */}
          <GoldGanesha 
            className="w-full h-full opacity-90 scale-95" 
            strokeGradient="gold-gradient-ornament" 
            style={{ filter: 'drop-shadow(0px 1px 2.5px rgba(140, 126, 109, 0.25))' }}
          />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="font-serif-lux italic tracking-wide text-xs xs:text-sm sm:text-base mb-1 font-semibold text-[#8c7e6d]"
        >
          We invite you to celebrate the wedding of
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.4 }}
          className="text-center my-1 sm:my-2 min-h-[4.5rem] flex flex-col justify-center items-center"
        >
          {/* Deep gold-embossed couple names */}
          <h1 
            className="font-cursive text-6xl xs:text-7xl sm:text-8xl px-4 leading-[1.3] text-center select-none pointer-events-none tracking-wide"
            style={goldSolidStyle}
          >
            Sweta &amp; Vikram
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          className="mt-1"
        >
          {/* Gold divider line */}
          <GoldDivider 
            className="scale-65 xs:scale-75 opacity-80" 
            strokeGradient="gold-gradient-ornament" 
          />
        </motion.div>
      </div>

      {/* Bottom Save the date & action trigger */}
      <div className="text-center mb-6 xs:mb-8 flex flex-col items-center gap-4.5 z-10 w-full">
        <div className="scale-95 sm:scale-100">
          <p 
            className="font-cinzel text-[10px] xs:text-[11px] font-bold mb-1"
            style={goldLabelStyle}
          >
            SAVE THE DATE
          </p>
          <h2 
            className="font-cinzel text-lg xs:text-xl sm:text-2xl tracking-[0.05em] font-bold text-[#4a443a]"
          >
            August 9, 2026
          </h2>
          <p 
            className="font-serif-lux text-[10px] xs:text-xs italic mt-0.5 font-bold text-[#8c7e6d]"
          >
            1096, McBride Ave, Mississauga, ON. L5C1M5
          </p>
        </div>

        {/* Action Button styled as an elegant gold-edged letterpress seal key */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          whileHover={{ 
            scale: 1.04, 
            boxShadow: '0 4px 12px rgba(140, 126, 109, 0.25)',
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
          }}
          whileTap={{ scale: 0.98 }}
          className="mt-1 py-2 px-7 text-[#faf9f6] text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-300 cursor-pointer rounded-[2px] border focus:outline-none"
          style={{
            backgroundImage: 'linear-gradient(135deg, #d4af37 0%, #c19a28 100%)',
            borderColor: '#b38728',
            boxShadow: '0 2px 6px rgba(140, 126, 109, 0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          Open Invitation
        </motion.button>
      </div>
    </div>
  );
};
