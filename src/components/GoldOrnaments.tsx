import React from 'react';

/**
 * High-fidelity, sharp Golden SVGs for Indian/Modern luxury wedding borders and decorations.
 */

export const GoldCorner: React.FC<{ className?: string; strokeGradient?: string }> = ({ className = "", strokeGradient = "gold-gradient-ornament" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`w-14 h-14 pointer-events-none fill-none stroke-[1.5] ${className}`}
    style={{ stroke: `url(#${strokeGradient})` }}
  >
    <path d="M 10 10 L 90 10 L 90 20 L 20 20 L 20 90 L 10 90 Z" />
    <path d="M 28 28 L 75 28 L 75 33 L 33 33 L 33 75 L 28 75 Z" />
    <circle cx="20" cy="20" r="3" fill={`url(#${strokeGradient})`} />
    <circle cx="15" cy="50" r="1.5" fill={`url(#${strokeGradient})`} />
    <circle cx="50" cy="15" r="1.5" fill={`url(#${strokeGradient})`} />
    {/* Delicate scroll path inside corner */}
    <path d="M 12 12 Q 50 20 50 50 Q 20 50 12 12" />
    <path d="M 22 22 Q 40 28 40 40 Q 28 40 22 22" />
  </svg>
);

export const GoldMandala: React.FC<{ className?: string; strokeGradient?: string }> = ({ className = "", strokeGradient = "gold-gradient-ornament" }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={`pointer-events-none fill-none ${className}`}
    style={{ stroke: `url(#${strokeGradient})` }}
    strokeWidth="1"
  >
    {/* Outer circle */}
    <circle cx="100" cy="100" r="95" strokeWidth="1" strokeDasharray="3,3" />
    <circle cx="100" cy="100" r="90" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="78" strokeWidth="1" />
    <circle cx="100" cy="100" r="45" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="25" strokeWidth="1" />

    {/* Center dot */}
    <circle cx="100" cy="100" r="4" fill={`url(#${strokeGradient})`} />

    {/* Elegant spokes */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      const angleRad = (angle * Math.PI) / 180;
      const x1 = 100 + 45 * Math.cos(angleRad);
      const y1 = 100 + 45 * Math.sin(angleRad);
      const x2 = 100 + 78 * Math.cos(angleRad);
      const y2 = 100 + 78 * Math.sin(angleRad);

      const petalAngle = angle + 11.25;
      const petalAngleRad = (petalAngle * Math.PI) / 180;
      const px = 100 + 60 * Math.cos(petalAngleRad);
      const py = 100 + 60 * Math.sin(petalAngleRad);

      return (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />
          <path 
            d={`M 100 100 Q ${px} ${py} ${x2} ${y2}`} 
            opacity="0.7" 
            strokeWidth="0.8"
          />
        </g>
      );
    })}

    {/* Small outer teeth */}
    {Array.from({ length: 32 }).map((_, i) => {
      const angle = (i * 360) / 32;
      const angleRad = (angle * Math.PI) / 180;
      const x1 = 100 + 90 * Math.cos(angleRad);
      const y1 = 100 + 90 * Math.sin(angleRad);
      const x2 = 100 + 94 * Math.cos(angleRad);
      const y2 = 100 + 94 * Math.sin(angleRad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.2" />;
    })}
  </svg>
);

export const GoldDivider: React.FC<{ className?: string; strokeGradient?: string }> = ({ className = "", strokeGradient = "gold-gradient-ornament" }) => (
  <svg 
    viewBox="0 0 300 30" 
    className={`w-64 h-8 mx-auto pointer-events-none fill-none ${className}`}
    style={{ stroke: `url(#${strokeGradient})` }}
    strokeWidth="1.2"
  >
    {/* Center symbol */}
    <circle cx="150" cy="15" r="5" fill={`url(#${strokeGradient})`} />
    <circle cx="150" cy="15" r="9" />
    
    {/* Delicate curls crawling outward */}
    <path d="M 141 15 Q 120 2 100 15 T 60 15 T 20 15" />
    <path d="M 159 15 Q 180 2 200 15 T 240 15 T 280 15" />
    
    {/* Little droplets */}
    <circle cx="110" cy="11" r="1.5" fill={`url(#${strokeGradient})`} />
    <circle cx="190" cy="11" r="1.5" fill={`url(#${strokeGradient})`} />
    <circle cx="75" cy="19" r="1.2" fill={`url(#${strokeGradient})`} />
    <circle cx="225" cy="19" r="1.2" fill={`url(#${strokeGradient})`} />

    <line x1="0" y1="15" x2="15" y2="15" opacity="0.5" />
    <line x1="285" y1="15" x2="300" y2="15" opacity="0.5" />
  </svg>
);

export const GoldGradientDef: React.FC = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="gold-gradient-ornament" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="25%" stopColor="#FFF9E6" />
        <stop offset="50%" stopColor="#AA7C11" />
        <stop offset="75%" stopColor="#E6CA65" />
        <stop offset="100%" stopColor="#996515" />
      </linearGradient>
      <linearGradient id="silver-gradient-ornament" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D8DBE0" />
        <stop offset="20%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#B0B5BC" />
        <stop offset="60%" stopColor="#F1F3F5" />
        <stop offset="80%" stopColor="#8C9199" />
        <stop offset="100%" stopColor="#E2E5E9" />
      </linearGradient>
    </defs>
  </svg>
);
