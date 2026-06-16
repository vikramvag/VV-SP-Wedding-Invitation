import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const WeddingCountdown: React.FC = () => {
  // Target date: August 9, 2026 at 4:00 PM EDT (UTC-4)
  const targetDate = React.useMemo(() => new Date('2026-08-09T16:00:00-04:00'), []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isOver) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 text-center"
      >
        <span className="font-cursive text-2xl text-[#8c7e6d] block animate-pulse">
          Today is the Blessed Day!
        </span>
      </motion.div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="mt-3 flex flex-col items-center select-none"
    >
      {/* Decorative tiny separator line */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-[1px] w-4 bg-[#8c7e6d]/20" />
        <span className="text-[8px] uppercase tracking-[0.18em] text-[#8c7e6d] font-bold">
          Counting the moments until forever begins.
        </span>
        <div className="h-[1px] w-4 bg-[#8c7e6d]/20" />
      </div>

      <div className="flex gap-2.5 sm:gap-3 items-center justify-center font-cinzel">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              {/* Premium micro card containing number with soft shadows and inner gold edge border */}
              <div 
                className="w-10 h-10 xs:w-11 xs:h-11 flex items-center justify-center rounded-[3px] bg-white/45 border border-[#8c7e6d]/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_2px_4px_rgba(140,126,109,0.04)] relative overflow-hidden"
              >
                {/* Subtle soft backdrop reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                <span className="text-xs sm:text-sm font-bold text-[#4a443a] tracking-normal">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[7px] uppercase tracking-[0.18em] text-[#8c7e6d] mt-1 font-bold">
                {unit.label}
              </span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-[10px] text-[#8c7e6d]/35 pb-2.5 self-center font-mono">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};
