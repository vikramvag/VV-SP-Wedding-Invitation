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

export const GoldGanesha: React.FC<{ className?: string; strokeGradient?: string; style?: React.CSSProperties }> = ({ 
  className = "", 
  strokeGradient = "gold-gradient-ornament",
  style 
}) => (
  <svg 
    viewBox="0 0 320 320" 
    className={`pointer-events-none fill-none ${className}`}
    style={{ stroke: `url(#${strokeGradient})`, ...style }}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* --- TOP-MOST BINDU & CHANDRA-BINDU ARCHES --- */}
    {/* Topmost Bindu (dot) */}
    <circle cx="160" cy="22" r="3.2" fill={`url(#${strokeGradient})`} stroke="none" />
    
    {/* Uppermost crescent curve */}
    <path d="M 148 33 Q 160 26 172 33" strokeWidth="1.8" />
    
    {/* Second crescent arch */}
    <path d="M 142 42 Q 160 33 178 42" strokeWidth="2.2" />
    
    {/* Elegant teardrop jewel in forehead center */}
    <path 
      d="M 160 48 Q 155 58 160 66 Q 165 58 160 48 Z" 
      fill={`url(#${strokeGradient})`} 
      stroke="none" 
    />

    {/* --- THE INTEGRATED CROWN (MUKUT) AND FOREHEAD BANDS --- */}
    {/* Crown Inner swooping bar */}
    <path d="M 106 88 C 122 72, 198 72, 214 88" strokeWidth="2.2" />
    
    {/* Crown top contour bar */}
    <path d="M 116 78 Q 160 52 204 78" strokeWidth="2" opacity="0.9" />

    {/* Elegant Vaishnava forehead Tilak (U-symbol with central droplet stem) */}
    <path 
      d="M 152 74 C 152 87, 168 87, 168 74 C 164 74, 163 81, 160 81 C 157 81, 156 74, 152 74 Z" 
      fill={`url(#${strokeGradient})`} 
      stroke="none" 
    />

    {/* --- BROWS AND ALMOND EYES WITH FILLED IRIS --- */}
    {/* Left Eyebrow */}
    <path d="M 118 106 Q 134 98, 146 112" strokeWidth="2" />
    
    {/* Right Eyebrow */}
    <path d="M 202 106 Q 186 98, 174 112" strokeWidth="2" />

    {/* Left Eye Upper Lid (Thick and expressive) */}
    <path d="M 120 118 Q 134 112, 142 128" strokeWidth="2.8" />
    
    {/* Left Eye Lower Lid */}
    <path d="M 122 122 Q 134 130, 141 124" strokeWidth="1.5" />
    
    {/* Left Eye Pupil / Iris */}
    <ellipse cx="132" cy="120" rx="2.5" ry="4.5" fill={`url(#${strokeGradient})`} stroke="none" />

    {/* Right Eye Upper Lid */}
    <path d="M 200 118 Q 186 112, 178 128" strokeWidth="2.8" />
    
    {/* Right Eye Lower Lid */}
    <path d="M 198 122 Q 186 130, 179 124" strokeWidth="1.5" />
    
    {/* Right Eye Pupil / Iris */}
    <ellipse cx="188" cy="120" rx="2.5" ry="4.5" fill={`url(#${strokeGradient})`} stroke="none" />


    {/* --- LARGE ICONIC CONTOURED EARS --- */}
    {/* Left Ear Outer Arc (Magnificent sweep) */}
    <path d="M 106 88 C 76 88, 46 98, 56 126 C 64 148, 86 150, 104 136" strokeWidth="2.5" />
    
    {/* Left Ear Inner Details */}
    <path d="M 90 106 C 76 106, 70 114, 76 128 C 82 138, 96 136, 104 126" strokeWidth="1.6" />
    <path d="M 98 116 Q 88 124, 98 132" strokeWidth="1.2" opacity="0.8" />

    {/* Right Ear Outer Arc */}
    <path d="M 214 88 C 244 88, 274 98, 264 126 C 256 148, 234 150, 216 136" strokeWidth="2.5" />
    
    {/* Right Ear Inner Details */}
    <path d="M 230 106 C 244 106, 250 114, 244 128 C 238 138, 224 136, 216 126" strokeWidth="1.6" />
    <path d="M 222 116 Q 232 124, 222 132" strokeWidth="1.2" opacity="0.8" />


    {/* --- CHEEKS & POINTED CURVED TUSKS --- */}
    {/* Left Cheek Contour */}
    <path d="M 120 125 Q 128 152, 116 164" strokeWidth="1.8" />
    
    {/* Right Cheek Contour */}
    <path d="M 200 125 Q 192 152, 204 164" strokeWidth="1.8" />

    {/* Left Pointy Tusk (Elegant outline shape) */}
    <path d="M 122 165 Q 102 174, 98 170 Q 116 158, 124 155 Z" strokeWidth="1.5" />
    
    {/* Right Pointy Tusk */}
    <path d="M 198 165 Q 218 174, 222 170 Q 204 158, 196 155 Z" strokeWidth="1.5" />


    {/* --- EXPRESSIVE RIDGE DETAIL & THE GRACEFUL SPIRALING TRUNK --- */}
    {/* Bridge Centerline */}
    <path d="M 160 128 L 157 172" strokeWidth="1.8" opacity="0.9" />
    
    {/* Horizontal ridge crease hatch lines */}
    <line x1="154" y1="138" x2="164" y2="138" strokeWidth="1.8" />
    <line x1="153" y1="146" x2="163" y2="146" strokeWidth="1.8" />
    <line x1="152" y1="154" x2="162" y2="154" strokeWidth="1.8" />
    <line x1="151" y1="162" x2="161" y2="162" strokeWidth="1.8" />
    <line x1="150" y1="170" x2="160" y2="170" strokeWidth="1.8" />

    {/* Dynamic curving Trunk looping into a gorgeous high-fidelity spiral to the right */}
    <path d="M 136 156 Q 130 196, 144 218 Q 158 238, 186 238 Q 216 238, 220 216 Q 224 194, 206 182 Q 188 172, 178 188 Q 170 200, 184 212 Q 196 220, 204 210 Q 208 200, 196 194" strokeWidth="3" />


    {/* --- SEATED POSE SWEEPING BASE LINES (CALIPH-STYLE SWASHES) --- */}
    {/* Belly/Torso bottom base contour line */}
    <path d="M 152 235 T 160 255 T 168 235" strokeWidth="1.5" opacity="0.8" />
    
    {/* Cute Navel loop "u" */}
    <path d="M 156 244 Q 160 250 164 244" strokeWidth="2" />

    {/* Large sweeping seating brush outline on the left knee/thigh */}
    <path d="M 100 214 Q 54 200, 48 240 Q 42 280, 84 300 Q 126 312, 170 312" strokeWidth="2.8" />
    
    {/* Inner parallel left accent swash */}
    <path d="M 84 228 Q 58 220, 54 246 Q 50 274, 82 290 Q 114 300, 146 300" strokeWidth="1.6" opacity="0.85" />

    {/* Large sweeping seating brush outline on the right side */}
    <path d="M 170 312 Q 220 312, 256 300 Q 288 288, 292 254 Q 296 220, 260 214" strokeWidth="2.8" />
    
    {/* Highly elegant trailing s-curve swash sweeping under the seating pose */}
    <path d="M 216 294 Q 250 300, 276 290 Q 302 280, 298 250 C 294 220, 254 224, 240 248 C 226 272, 262 284, 268 262" strokeWidth="2.2" />
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
