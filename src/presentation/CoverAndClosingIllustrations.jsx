// ── CoverAndClosingIllustrations.jsx ─────────────────────────────────────────
// Beautiful animated cover (slide 1) and closing (slide 161) illustrations.
// Each theme has its own fully animated landscape:
//   light  → ocean with ripple water effects
//   dark   → galaxy with aurora borealis
//   sepia  → wood & aged paper with dust motes
//   pink   → cherry blossom tree with falling petals
//   mint   → lush forest with falling leaves
//   default→ (same as light ocean)
//
// DENR logo + ENR Academy logo are embedded as inline SVG marks.
// All animations are CSS keyframes injected via a <style> tag once.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";

// ── useTheme: reads data-theme from <html> and reacts to changes ──────────────
function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(t);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

// ── Global CSS animations (injected once) ────────────────────────────────────
const ANIMATION_CSS = `
/* ── Ocean / water ripples ── */
@keyframes ripple {
  0%   { transform: scale(0.6); opacity:0.7; }
  100% { transform: scale(2.8); opacity:0;   }
}
@keyframes wave-move {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes bob {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}
@keyframes shimmer-h {
  0%   { opacity:0.18; }
  50%  { opacity:0.55; }
  100% { opacity:0.18; }
}

/* ── Galaxy / stars ── */
@keyframes twinkle {
  0%,100% { opacity:0.2; transform:scale(1);   }
  50%      { opacity:1;   transform:scale(1.5); }
}
@keyframes aurora-drift {
  0%   { transform:translateX(-8%) scaleX(1);   opacity:0.35; }
  40%  { transform:translateX(6%)  scaleX(1.12);opacity:0.55; }
  70%  { transform:translateX(-3%) scaleX(0.95);opacity:0.42; }
  100% { transform:translateX(-8%) scaleX(1);   opacity:0.35; }
}
@keyframes aurora-drift2 {
  0%   { transform:translateX(5%)  scaleX(1);   opacity:0.28; }
  50%  { transform:translateX(-7%) scaleX(1.15);opacity:0.50; }
  100% { transform:translateX(5%)  scaleX(1);   opacity:0.28; }
}
@keyframes shooting-star {
  0%   { opacity:0; transform:translate(0,0)     scaleX(1); }
  5%   { opacity:1;                                          }
  40%  { opacity:0; transform:translate(180px,90px) scaleX(3); }
  100% { opacity:0; transform:translate(180px,90px) scaleX(3); }
}

/* ── Sepia dust motes ── */
@keyframes mote-float {
  0%   { transform:translateY(0)   translateX(0)    opacity:0;   }
  10%  { opacity:0.5; }
  90%  { opacity:0.3; }
  100% { transform:translateY(-160px) translateX(20px) opacity:0; }
}
@keyframes page-turn-glow {
  0%,100% { opacity:0.12; }
  50%      { opacity:0.28; }
}

/* ── Cherry blossom petals ── */
@keyframes petal-fall {
  0%   { transform:translateY(0)      rotate(0deg)   translateX(0);   opacity:1; }
  25%  { transform:translateY(80px)   rotate(90deg)  translateX(18px); }
  50%  { transform:translateY(160px)  rotate(200deg) translateX(-10px);}
  75%  { transform:translateY(260px)  rotate(300deg) translateX(14px); }
  100% { transform:translateY(340px)  rotate(400deg) translateX(-5px); opacity:0; }
}
@keyframes blossom-sway {
  0%,100% { transform-origin:bottom center; transform:rotate(-2deg); }
  50%      { transform-origin:bottom center; transform:rotate(3deg);  }
}
@keyframes blossom-bloom {
  0%   { transform:scale(0); opacity:0; }
  60%  { transform:scale(1.15); opacity:1; }
  100% { transform:scale(1); opacity:1; }
}

/* ── Mint / leaf falling ── */
@keyframes leaf-fall {
  0%   { transform:translateY(0)     rotate(0deg)   translateX(0);    opacity:1; }
  20%  { transform:translateY(60px)  rotate(-30deg) translateX(-12px);}
  50%  { transform:translateY(150px) rotate(20deg)  translateX(16px); }
  80%  { transform:translateY(260px) rotate(-15deg) translateX(-8px); }
  100% { transform:translateY(340px) rotate(10deg)  translateX(6px);  opacity:0; }
}
@keyframes leaf-sway {
  0%,100% { transform:rotate(-4deg) scaleX(1);   }
  50%      { transform:rotate(5deg)  scaleX(0.96);}
}
@keyframes dew-pulse {
  0%,100% { r:2;   opacity:0.60; }
  50%      { r:3.5; opacity:0.90; }
}

/* ── Universal cover entrance ── */
@keyframes cover-fadein {
  from { opacity:0; transform:translateY(18px) scale(0.98); }
  to   { opacity:1; transform:none; }
}
@keyframes logo-pop {
  0%   { transform:scale(0.5) rotate(-8deg); opacity:0; }
  70%  { transform:scale(1.08) rotate(1deg); opacity:1; }
  100% { transform:scale(1) rotate(0deg); opacity:1; }
}
@keyframes title-slide-up {
  from { opacity:0; transform:translateY(24px); }
  to   { opacity:1; transform:none; }
}
@keyframes badge-glow {
  0%,100% { box-shadow:0 0 0 0 rgba(255,255,255,0); }
  50%      { box-shadow:0 0 18px 4px rgba(255,255,255,0.25); }
}

/* ── Closing slide ── */
@keyframes closing-rise {
  from { opacity:0; transform:translateY(30px); }
  to   { opacity:1; transform:none; }
}
@keyframes pulse-ring {
  0%   { transform:scale(0.92); opacity:0.65; }
  100% { transform:scale(1.18); opacity:0; }
}
`;

function injectStyles() {
  if (document.getElementById("__cover-anim-css__")) return;
  const el = document.createElement("style");
  el.id = "__cover-anim-css__";
  el.textContent = ANIMATION_CSS;
  document.head.appendChild(el);
}

// ── DENR Logo — PNG from /public/denr_logo.png ───────────────────────────────
function DENRLogo({ size = 64, opacity = 1 }) {
  return (
    <img
      src="/denr_logo.png"
      alt="DENR Logo"
      width={size}
      height={size}
      style={{
        display: "block",
        opacity,
        borderRadius: "50%",
        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.22))",
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}

// ── ENR Academy Logo — PNG from /public/enra_logo.png ────────────────────────
function ENRAcademyLogo({ size = 64, opacity = 1 }) {
  return (
    <img
      src="/enra_logo.png"
      alt="ENR Academy Logo"
      width={size}
      height={size}
      style={{
        display: "block",
        opacity,
        borderRadius: "50%",
        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.20))",
        objectFit: "contain",
        flexShrink: 0,
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THEME LANDSCAPES
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. OCEAN (light theme) ────────────────────────────────────────────────────
function OceanLandscape() {
  return (
    <svg width="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice"
         style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      <defs>
        {/* Sky gradient */}
        <linearGradient id="oc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B3E5FC"/>
          <stop offset="55%"  stopColor="#E1F5FE"/>
          <stop offset="100%" stopColor="#ffffff"/>
        </linearGradient>
        {/* Deep ocean */}
        <linearGradient id="oc-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0277BD"/>
          <stop offset="100%" stopColor="#01579B"/>
        </linearGradient>
        {/* Shallow water foam */}
        <linearGradient id="oc-foam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4FC3F7" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#0288D1" stopOpacity="0.4"/>
        </linearGradient>
        <filter id="oc-glow">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="800" height="320" fill="url(#oc-sky)"/>

      {/* Sun */}
      <circle cx="650" cy="60" r="38" fill="#FFF59D" opacity="0.85"
              style={{animation:"shimmer-h 4s ease-in-out infinite"}}/>
      <circle cx="650" cy="60" r="52" fill="#FFEE58" opacity="0.18"/>
      {/* Sun rays */}
      {Array.from({length:12},(_,i)=>{
        const a=(i/12)*Math.PI*2;
        return <line key={i}
          x1={650+Math.cos(a)*56} y1={60+Math.sin(a)*56}
          x2={650+Math.cos(a)*70} y2={60+Math.sin(a)*70}
          stroke="#FFF176" strokeWidth="2.5" strokeLinecap="round" opacity="0.60"/>;
      })}

      {/* Clouds */}
      {[[100,40,1.0],[300,25,0.85],[520,55,0.70]].map(([cx,cy,op],i)=>(
        <g key={i} style={{animation:`bob ${3+i*0.7}s ease-in-out infinite`, animationDelay:`${i*1.1}s`}}>
          <ellipse cx={cx}    cy={cy}    rx={52} ry={20} fill="white" opacity={op*0.9}/>
          <ellipse cx={cx-22} cy={cy+6}  rx={30} ry={16} fill="white" opacity={op*0.85}/>
          <ellipse cx={cx+24} cy={cy+7}  rx={28} ry={14} fill="white" opacity={op*0.80}/>
        </g>
      ))}

      {/* Mountain silhouette */}
      <path d="M0 220 L80 140 L160 200 L240 120 L320 200 L380 160 L440 220 L800 220 L800 320 L0 320 Z"
            fill="#E1F5FE" opacity="0.55"/>
      <path d="M240 120 L290 160 L340 120 L390 165 L440 130 L500 180 L560 150 L620 200 L680 160 L740 195 L800 170 L800 220 L0 220 L0 260 Z"
            fill="#B3E5FC" opacity="0.45"/>

      {/* Ocean surface — animated wave layers */}
      {/* Wave 1 (back) */}
      <g style={{animation:"wave-move 8s linear infinite"}}>
        <path d="M-800 240 Q-700 232 -600 240 Q-500 248 -400 240 Q-300 232 -200 240 Q-100 248 0 240 Q100 232 200 240 Q300 248 400 240 Q500 232 600 240 Q700 248 800 240 Q900 232 1000 240 Q1100 248 1200 240 Q1300 232 1400 240 Q1500 248 1600 240"
              fill="none" stroke="#81D4FA" strokeWidth="3" opacity="0.50"/>
      </g>

      {/* Ocean fill */}
      <path d="M0 248 Q100 238 200 248 Q300 258 400 248 Q500 238 600 248 Q700 258 800 248 L800 320 L0 320 Z"
            fill="url(#oc-sea)" opacity="0.92"/>

      {/* Wave 2 (mid) */}
      <g style={{animation:"wave-move 6s linear infinite reverse"}}>
        <path d="M-800 256 Q-680 247 -560 256 Q-440 265 -320 256 Q-200 247 -80 256 Q40 265 160 256 Q280 247 400 256 Q520 265 640 256 Q760 247 880 256 Q1000 265 1120 256 Q1240 247 1360 256 Q1480 265 1600 256"
              fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2" strokeOpacity="0.35"/>
      </g>

      {/* Ripple circles */}
      {[[200,280,0],[400,295,1.2],[600,275,2.4],[120,300,0.6],[680,300,1.8]].map(([cx,cy,delay],i)=>(
        <circle key={i} cx={cx} cy={cy} r="18" fill="none" stroke="#81D4FA"
                strokeWidth="2" opacity="0"
                style={{animation:`ripple ${3.5}s ease-out infinite`, animationDelay:`${delay}s`}}/>
      ))}
      {[[200,280,1.5],[400,295,2.7],[600,275,0.9]].map(([cx,cy,delay],i)=>(
        <circle key={`r2-${i}`} cx={cx} cy={cy} r="32" fill="none" stroke="#4FC3F7"
                strokeWidth="1.5" opacity="0"
                style={{animation:`ripple ${3.5}s ease-out infinite`, animationDelay:`${delay}s`}}/>
      ))}

      {/* Boat silhouette */}
      <g style={{animation:"bob 4s ease-in-out infinite"}} transform="translate(0,0)">
        <path d="M340 250 L360 240 L380 240 L390 252 L380 256 L350 256 Z"
              fill="#1565C0" opacity="0.55"/>
        <line x1="365" y1="240" x2="365" y2="218" stroke="#1565C0" strokeWidth="1.5" opacity="0.55"/>
        <path d="M365 220 L385 234 L365 238 Z" fill="#E3F2FD" opacity="0.70"/>
      </g>

      {/* Seafloor shimmer at base */}
      <rect x="0" y="305" width="800" height="15" rx="0"
            fill="#4FC3F7" opacity="0.18"
            style={{animation:"shimmer-h 2s ease-in-out infinite"}}/>
    </svg>
  );
}

// ── 2. GALAXY / AURORA (dark theme) ──────────────────────────────────────────
function GalaxyLandscape() {
  const stars = Array.from({length:80},(_,i)=>({
    cx: (i*97+13)%800,
    cy: (i*61+7)%200,
    r:  0.8 + (i%4)*0.6,
    delay: (i*0.19)%4,
    dur:   1.5 + (i%5)*0.8,
  }));
  return (
    <svg width="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice"
         style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      <defs>
        <linearGradient id="gx-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#020817"/>
          <stop offset="70%" stopColor="#060d18"/>
          <stop offset="100%" stopColor="#0a1628"/>
        </linearGradient>
        <linearGradient id="gx-aurora1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#00E5FF" stopOpacity="0"/>
          <stop offset="30%"  stopColor="#00E5FF" stopOpacity="0.55"/>
          <stop offset="60%"  stopColor="#7C4DFF" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gx-aurora2" x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0%"   stopColor="#00E676" stopOpacity="0"/>
          <stop offset="40%"  stopColor="#00E676" stopOpacity="0.40"/>
          <stop offset="70%"  stopColor="#40C4FF" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#40C4FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gx-aurora3" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%"   stopColor="#E040FB" stopOpacity="0"/>
          <stop offset="50%"  stopColor="#E040FB" stopOpacity="0.30"/>
          <stop offset="100%" stopColor="#E040FB" stopOpacity="0"/>
        </linearGradient>
        <filter id="gx-blur">
          <feGaussianBlur stdDeviation="12"/>
        </filter>
        <filter id="gx-blur2">
          <feGaussianBlur stdDeviation="6"/>
        </filter>
      </defs>

      {/* Deep space background */}
      <rect width="800" height="320" fill="url(#gx-bg)"/>

      {/* Milky Way band */}
      <ellipse cx="400" cy="120" rx="400" ry="60"
               fill="#1a237e" opacity="0.25" filter="url(#gx-blur)"/>
      <ellipse cx="350" cy="100" rx="300" ry="40"
               fill="#283593" opacity="0.20" filter="url(#gx-blur)"/>

      {/* Stars */}
      {stars.map(s=>(
        <circle key={`s${s.cx}${s.cy}`} cx={s.cx} cy={s.cy} r={s.r}
                fill="white"
                style={{
                  animation:`twinkle ${s.dur}s ease-in-out infinite`,
                  animationDelay:`${s.delay}s`
                }}/>
      ))}

      {/* Aurora curtain 1 */}
      <path d="M-100 80 Q100 40 300 90 Q500 140 700 80 Q850 40 900 90 L900 0 L-100 0 Z"
            fill="url(#gx-aurora1)" filter="url(#gx-blur2)"
            style={{animation:"aurora-drift 9s ease-in-out infinite"}}/>

      {/* Aurora curtain 2 */}
      <path d="M-50 110 Q150 60 350 120 Q550 170 750 110 Q880 70 950 120 L950 0 L-50 0 Z"
            fill="url(#gx-aurora2)" filter="url(#gx-blur2)"
            style={{animation:"aurora-drift2 11s ease-in-out infinite"}}/>

      {/* Aurora curtain 3 */}
      <path d="M0 140 Q200 90 400 150 Q600 200 800 140 L800 0 L0 0 Z"
            fill="url(#gx-aurora3)" filter="url(#gx-blur2)"
            style={{animation:"aurora-drift 14s ease-in-out infinite reverse"}}/>

      {/* Shooting star */}
      <line x1="150" y1="50" x2="190" y2="74"
            stroke="white" strokeWidth="1.5" opacity="0"
            style={{animation:"shooting-star 6s ease-out infinite", animationDelay:"2s"}}/>
      <line x1="550" y1="30" x2="600" y2="58"
            stroke="white" strokeWidth="1" opacity="0"
            style={{animation:"shooting-star 6s ease-out infinite", animationDelay:"5s"}}/>

      {/* Planets */}
      <circle cx="680" cy="50" r="20" fill="#1a237e" opacity="0.70"/>
      <circle cx="680" cy="50" r="20" fill="none" stroke="#5C6BC0" strokeWidth="1.5" opacity="0.55"/>
      <ellipse cx="680" cy="50" rx="34" ry="7" fill="none" stroke="#7986CB" strokeWidth="1.5"
               opacity="0.45" transform="rotate(-18 680 50)"/>
      <circle cx="680" cy="50" r="18" fill="#283593" opacity="0.60"/>

      {/* Nebula glow spots */}
      <circle cx="200" cy="100" r="60" fill="#311B92" opacity="0.14" filter="url(#gx-blur)"/>
      <circle cx="600" cy="80"  r="50" fill="#1A237E" opacity="0.16" filter="url(#gx-blur)"/>

      {/* Ground (dark rolling hills) */}
      <path d="M0 230 Q100 210 200 228 Q300 245 400 225 Q500 205 600 220 Q700 235 800 218 L800 320 L0 320 Z"
            fill="#060d18"/>
      <path d="M0 248 Q120 235 240 248 Q360 261 480 245 Q600 230 720 248 L800 244 L800 320 L0 320 Z"
            fill="#07101e"/>
    </svg>
  );
}

// ── 3. SEPIA / WOOD & PAPER ───────────────────────────────────────────────────
function SepiаLandscape() {
  const motes = Array.from({length:18},(_,i)=>({
    cx: (i*53+20)%780 + 10,
    cy: 80 + (i*31)%180,
    delay: (i*0.55)%5,
    dur: 5 + (i%4)*2,
  }));
  return (
    <svg width="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice"
         style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      <defs>
        <linearGradient id="sp-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#EFEBE9"/>
          <stop offset="50%"  stopColor="#F5F0E8"/>
          <stop offset="100%" stopColor="#E8D5B7"/>
        </linearGradient>
        <linearGradient id="sp-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6D4C41"/>
          <stop offset="100%" stopColor="#4E342E"/>
        </linearGradient>
        {/* Wood grain filter */}
        <filter id="sp-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.4  0 0 0 0 0.25  0 0 0 0 0.1  0 0 0 0.08 0"/>
        </filter>
      </defs>

      {/* Aged paper background */}
      <rect width="800" height="320" fill="url(#sp-bg)"/>
      {/* Paper texture overlay */}
      <rect width="800" height="320" filter="url(#sp-grain)" opacity="0.35"/>

      {/* Vignette corners */}
      <radialGradient id="sp-vig" cx="0" cy="0" r="1">
        <stop offset="0%"   stopColor="#8D6E63" stopOpacity="0"/>
        <stop offset="100%" stopColor="#4E342E" stopOpacity="0.35"/>
      </radialGradient>
      <rect width="800" height="320" fill="url(#sp-vig)" opacity="0.40"/>

      {/* Wood table surface */}
      <path d="M0 240 L800 240 L800 320 L0 320 Z" fill="url(#sp-table)"/>
      {/* Wood grain lines */}
      {[0,1,2,3,4,5].map(i=>(
        <path key={i}
          d={`M0 ${248+i*12} Q200 ${244+i*12} 400 ${250+i*12} Q600 ${256+i*12} 800 ${248+i*12}`}
          fill="none" stroke="#5D4037" strokeWidth="1" opacity="0.22"/>
      ))}

      {/* Stack of old books */}
      <rect x="60"  y="180" width="70" height="18" rx="2" fill="#8D6E63"/>
      <rect x="55"  y="196" width="78" height="20" rx="2" fill="#6D4C41"/>
      <rect x="58"  y="214" width="74" height="22" rx="2" fill="#795548"/>
      {/* Book spines */}
      <rect x="57"  y="180" width="6" height="58" rx="1" fill="#A1887F"/>
      <rect x="55"  y="196" width="5" height="40" rx="1" fill="#8D6E63"/>

      {/* Open book / manuscript */}
      <path d="M160 200 Q240 196 320 200 L320 238 Q240 234 160 238 Z" fill="#FDF6EC"/>
      <path d="M320 200 Q400 204 480 200 L480 238 Q400 242 320 238 Z" fill="#F5EFE0"/>
      <line x1="320" y1="200" x2="320" y2="238" stroke="#C8A87A" strokeWidth="1.5"/>
      {/* Text lines on book */}
      {[210,218,226,234].map(y=>(
        <g key={y}>
          <line x1={176} y1={y} x2={308} y2={y} stroke="#8D6E63" strokeWidth="0.8" opacity="0.45"/>
          <line x1={336} y1={y} x2={464} y2={y} stroke="#8D6E63" strokeWidth="0.8" opacity="0.40"/>
        </g>
      ))}

      {/* Quill pen */}
      <path d="M500 155 Q540 130 570 108 Q580 100 590 96"
            fill="none" stroke="#8D6E63" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M590 96 Q600 88 596 100 Q592 112 580 116 Q568 120 560 110 Q572 106 580 98 Q586 92 590 96Z"
            fill="#EFEBE9" stroke="#8D6E63" strokeWidth="1.5"/>
      <path d="M500 155 Q498 165 494 180 L499 183 Q504 168 504 156 Z"
            fill="#5D4037" opacity="0.60"/>

      {/* Candle */}
      <rect x="680" y="196" width="18" height="44" rx="3" fill="#FFF8E1" stroke="#F5DEB3" strokeWidth="1"/>
      <ellipse cx="689" cy="197" rx="9" ry="5" fill="#FAFAFA"/>
      <line x1="689" y1="197" x2="689" y2="186" stroke="#FFA000" strokeWidth="2"/>
      <ellipse cx="689" cy="184" rx="5" ry="8" fill="#FFA000" opacity="0.55"
               style={{animation:"shimmer-h 1.2s ease-in-out infinite"}}/>
      <ellipse cx="689" cy="182" rx="3" ry="5" fill="#FFCC02" opacity="0.70"
               style={{animation:"shimmer-h 0.8s ease-in-out infinite", animationDelay:"0.2s"}}/>
      {/* Candlelight glow */}
      <circle cx="689" cy="188" r="28" fill="#FFA000" opacity="0.08"
              style={{animation:"shimmer-h 1.5s ease-in-out infinite"}}/>

      {/* Horizon mountain sketch */}
      <path d="M0 200 Q80 168 160 200 Q220 222 280 185 Q340 148 400 190 Q460 232 520 196 Q580 160 640 200 Q720 240 800 198 L800 240 L0 240 Z"
            fill="#BCAAA4" opacity="0.32"/>

      {/* Dust motes */}
      {motes.map((m,i)=>(
        <circle key={i} cx={m.cx} cy={m.cy} r="2.5"
                fill="#8D6E63" opacity="0"
                style={{
                  animation:`mote-float ${m.dur}s ease-in-out infinite`,
                  animationDelay:`${m.delay}s`
                }}/>
      ))}

      {/* Page glow lines (manuscript decoration) */}
      <path d="M150 175 Q400 168 650 175" fill="none" stroke="#C8A87A" strokeWidth="1"
            opacity="0" style={{animation:"page-turn-glow 4s ease-in-out infinite"}}/>
    </svg>
  );
}

// ── 4. CHERRY BLOSSOM (pink theme) ───────────────────────────────────────────
function PetalShape({ cx, cy, size, color, delay }) {
  const s = size;
  return (
    <ellipse cx={cx} cy={cy} rx={s} ry={s*0.6}
             fill={color} opacity="0"
             style={{
               animation:`petal-fall ${3 + delay*0.4}s ease-in cubic-bezier(0.25,0.46,0.45,0.94) infinite`,
               animationDelay:`${delay}s`,
               transformOrigin:`${cx}px ${cy}px`
             }}/>
  );
}

function CherryBlossomLandscape() {
  // Petal spawn points along the branches
  const petals = Array.from({length:40},(_,i)=>({
    cx: 60 + (i*78)%720,
    cy: 20 + (i*23)%120,
    size: 4 + (i%3)*2,
    color: i%4===0?"#F48FB1":i%4===1?"#F8BBD9":"#FCE4EC",
    delay: (i*0.28)%5,
  }));

  return (
    <svg width="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice"
         style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      <defs>
        <linearGradient id="pk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FCE4EC"/>
          <stop offset="60%"  stopColor="#fff0f6"/>
          <stop offset="100%" stopColor="#ffe8f0"/>
        </linearGradient>
        <linearGradient id="pk-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#F48FB1" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#E91E63" stopOpacity="0.08"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="320" fill="url(#pk-sky)"/>

      {/* Distant hills */}
      <path d="M0 260 Q120 235 240 260 Q360 285 480 255 Q600 225 720 258 L800 252 L800 320 L0 320 Z"
            fill="#FCE4EC" opacity="0.60"/>
      <path d="M0 275 Q150 260 300 275 Q450 290 600 270 Q700 258 800 270 L800 320 L0 320 Z"
            fill="#F8BBD9" opacity="0.45"/>

      {/* Ground with petal carpet */}
      <path d="M0 290 L800 290 L800 320 L0 320 Z" fill="#F48FB1" opacity="0.18"/>
      {/* Petal dots on ground */}
      {Array.from({length:20},(_,i)=>(
        <ellipse key={i} cx={20+i*40} cy={298+(i%3)*7} rx={5+(i%3)*3} ry={3+(i%2)*2}
                 fill="#F48FB1" opacity="0.35"/>
      ))}

      {/* Main cherry tree trunk — left */}
      <path d="M-10 320 Q10 280 30 240 Q50 200 40 160 Q48 140 60 120"
            fill="none" stroke="#5D4037" strokeWidth="14" strokeLinecap="round"/>
      {/* Branch 1 */}
      <path d="M50 175 Q90 145 140 130 Q190 115 240 120"
            fill="none" stroke="#6D4C41" strokeWidth="7" strokeLinecap="round"/>
      {/* Branch 2 */}
      <path d="M45 155 Q80 110 110 85 Q140 60 180 50"
            fill="none" stroke="#6D4C41" strokeWidth="6" strokeLinecap="round"/>
      {/* Branch 3 */}
      <path d="M56 130 Q80 95 100 70 Q120 45 150 38"
            fill="none" stroke="#795548" strokeWidth="5" strokeLinecap="round"
            style={{animation:"blossom-sway 4s ease-in-out infinite"}}/>
      {/* Sub-branches */}
      <path d="M140 130 Q160 100 170 80" fill="none" stroke="#8D6E63" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M190 118 Q210 88 218 68"  fill="none" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round"/>
      <path d="M240 120 Q260 92 270 75"  fill="none" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round"/>

      {/* Blossom clusters */}
      {[
        [158,78],[175,52],[215,65],[240,48],[270,58],[140,108],[190,92],[225,96],
        [100,65],[120,42],[88,80],[155,30],[200,35]
      ].map(([cx,cy],i)=>(
        <g key={i} style={{
          animation:`blossom-bloom ${0.5+i*0.15}s cubic-bezier(0.34,1.56,0.64,1) forwards`,
          animationDelay:`${i*0.08}s`,
          transformOrigin:`${cx}px ${cy}px`
        }}>
          {[0,72,144,216,288].map(deg=>{
            const r=Math.PI*deg/180;
            return <ellipse key={deg} cx={cx+Math.cos(r)*8} cy={cy+Math.sin(r)*8}
                            rx="6" ry="4" fill={i%3===0?"#F48FB1":i%3===1?"#FCE4EC":"#F8BBD9"}
                            opacity="0.90" transform={`rotate(${deg} ${cx+Math.cos(r)*8} ${cy+Math.sin(r)*8})`}/>;
          })}
          <circle cx={cx} cy={cy} r="3.5" fill="#FFF9C4" opacity="0.90"/>
        </g>
      ))}

      {/* Second tree — right side, smaller */}
      <path d="M820 320 Q790 270 775 225 Q762 182 770 150"
            fill="none" stroke="#6D4C41" strokeWidth="10" strokeLinecap="round"/>
      <path d="M770 160 Q730 130 700 110 Q668 90 640 92"
            fill="none" stroke="#795548" strokeWidth="6" strokeLinecap="round"/>
      <path d="M768 142 Q748 110 740 85 Q730 60 720 52"
            fill="none" stroke="#795548" strokeWidth="5" strokeLinecap="round"/>
      {[
        [700,92],[680,78],[655,88],[720,60],[740,72],[710,110]
      ].map(([cx,cy],i)=>(
        <g key={`rt${i}`} style={{
          animation:`blossom-bloom 0.5s ease forwards`,
          animationDelay:`${0.3+i*0.1}s`,
          transformOrigin:`${cx}px ${cy}px`
        }}>
          {[0,60,120,180,240,300].map(deg=>{
            const r=Math.PI*deg/180;
            return <ellipse key={deg} cx={cx+Math.cos(r)*7} cy={cy+Math.sin(r)*7}
                            rx="5" ry="3.5" fill="#F48FB1" opacity="0.85"
                            transform={`rotate(${deg} ${cx+Math.cos(r)*7} ${cy+Math.sin(r)*7})`}/>;
          })}
          <circle cx={cx} cy={cy} r="3" fill="#FFF9C4" opacity="0.88"/>
        </g>
      ))}

      {/* Falling petals */}
      {petals.map((p,i)=>(
        <PetalShape key={i} {...p}/>
      ))}

      {/* Soft mist at bottom */}
      <rect x="0" y="285" width="800" height="35" fill="white" opacity="0.20"/>
    </svg>
  );
}

// ── 5. MINT / FOREST LEAVES ───────────────────────────────────────────────────
function LeafShape({ cx, cy, size, color, delay }) {
  const s = size;
  return (
    <path d={`M${cx} ${cy} Q${cx+s} ${cy-s*0.6} ${cx+s*0.1} ${cy+s} Q${cx-s*0.8} ${cy+s*0.4} ${cx} ${cy} Z`}
          fill={color} opacity="0"
          style={{
            animation:`leaf-fall ${3.5 + delay*0.5}s ease-in cubic-bezier(0.4,0,0.6,1) infinite`,
            animationDelay:`${delay}s`,
            transformOrigin:`${cx}px ${cy}px`
          }}/>
  );
}

function MintLandscape() {
  const leaves = Array.from({length:35},(_,i)=>({
    cx: 40 + (i*73)%720,
    cy: 10 + (i*19)%100,
    size: 6 + (i%4)*3,
    color: i%4===0?"#34D399":i%4===1?"#6EE7B7":i%4===2?"#10B981":"#A7F3D0",
    delay: (i*0.31)%5.5,
  }));

  return (
    <svg width="100%" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice"
         style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
      <defs>
        <linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E0F7FA"/>
          <stop offset="55%"  stopColor="#E8F8F1"/>
          <stop offset="100%" stopColor="#c8f0e4"/>
        </linearGradient>
        <linearGradient id="mt-forest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1B5E20"/>
          <stop offset="100%" stopColor="#0a2320"/>
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="320" fill="url(#mt-sky)"/>

      {/* Sun / light diffusion */}
      <circle cx="400" cy="-10" r="120" fill="#B2DFDB" opacity="0.35"/>
      <circle cx="400" cy="-10" r="80"  fill="#80CBC4" opacity="0.25"/>

      {/* Background forest silhouettes — far */}
      <path d="M0 220 Q40 180 80 220 Q100 240 120 200 Q140 160 160 200 Q180 240 200 200 Q220 160 240 200 Q260 240 280 205 Q300 170 320 205 Q340 240 360 200 Q380 160 400 200 Q420 240 440 200 Q460 160 480 200 Q500 240 520 200 Q540 160 560 200 Q580 240 600 200 Q620 160 640 200 Q660 240 680 200 Q700 160 720 200 Q740 240 760 200 L800 200 L800 320 L0 320 Z"
            fill="#1B5E20" opacity="0.35"/>

      {/* Mid forest */}
      <path d="M-20 260 Q20 225 60 260 Q80 278 100 245 Q120 212 140 248 Q160 285 180 248 Q200 212 220 248 Q240 285 260 245 Q280 205 300 248 Q320 290 340 245 Q360 200 380 248 Q400 296 420 248 Q440 200 460 248 Q480 296 500 248 Q520 200 540 245 Q560 290 580 248 Q600 205 620 248 Q640 290 660 248 Q680 205 700 248 Q720 290 740 248 Q760 205 780 248 L800 240 L800 320 L-20 320 Z"
            fill="#2E7D32" opacity="0.50"/>

      {/* Foreground large trees */}
      {/* Tree 1 (left) */}
      <path d="M0 320 Q20 260 15 200 Q10 150 20 110" fill="none" stroke="#1B5E20" strokeWidth="18" strokeLinecap="round"/>
      {/* Canopy circles */}
      {[[30,90],[55,65],[20,75],[60,95]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={28+i*4} fill="#2E7D32" opacity="0.75"
                style={{animation:`leaf-sway ${3+i*0.6}s ease-in-out infinite`, animationDelay:`${i*0.4}s`}}/>
      ))}

      {/* Tree 2 (right) */}
      <path d="M800 320 Q778 258 782 198 Q786 148 776 108" fill="none" stroke="#1B5E20" strokeWidth="15" strokeLinecap="round"/>
      {[[768,88],[742,68],[776,100],[750,108]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={26+i*3} fill="#2E7D32" opacity="0.72"
                style={{animation:`leaf-sway ${3.5+i*0.5}s ease-in-out infinite reverse`, animationDelay:`${i*0.3}s`}}/>
      ))}

      {/* Tree 3 (center-left) */}
      <path d="M260 320 Q272 272 268 228 Q264 185 274 152" fill="none" stroke="#33691E" strokeWidth="12" strokeLinecap="round"/>
      {[[278,128],[258,115],[295,142],[265,148]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={22+i*3} fill="#388E3C" opacity="0.70"
                style={{animation:`leaf-sway ${2.8+i*0.7}s ease-in-out infinite`, animationDelay:`${i*0.5}s`}}/>
      ))}

      {/* Ground with moss */}
      <path d="M0 295 Q200 285 400 295 Q600 305 800 290 L800 320 L0 320 Z"
            fill="#1B5E20" opacity="0.55"/>
      <path d="M0 305 Q150 298 300 305 Q500 312 700 302 L800 306 L800 320 L0 320 Z"
            fill="#2E7D32" opacity="0.40"/>

      {/* Dew drops on foreground */}
      {[[100,295],[250,300],[400,292],[550,298],[700,294]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill="#B2EBF2" opacity="0.60"
                style={{animation:`dew-pulse ${1.5+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.3}s`}}/>
      ))}

      {/* Falling leaves */}
      {leaves.map((l,i)=>(
        <LeafShape key={i} {...l}/>
      ))}

      {/* Forest floor ray of light */}
      <path d="M380 0 L340 320 L460 320 L420 0 Z" fill="#E8F5E9" opacity="0.06"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COVER SLIDE ILLUSTRATION (Slide 1)
// ═══════════════════════════════════════════════════════════════════════════════
export function IllustrationCoverSlide() {
  injectStyles();
  const theme = useTheme();

  const landscapes = {
    light:   <OceanLandscape/>,
    dark:    <GalaxyLandscape/>,
    sepia:   <SepiаLandscape/>,
    pink:    <CherryBlossomLandscape/>,
    mint:    <MintLandscape/>,
  };
  const landscape = landscapes[theme] || <OceanLandscape/>;

  // Theme-specific overlay colors for the title card
  const overlayStyles = {
    light: { bg:"rgba(1,87,155,0.72)", border:"rgba(79,195,247,0.55)", glow:"0 0 40px rgba(79,195,247,0.30)" },
    dark:  { bg:"rgba(2,8,24,0.80)",  border:"rgba(0,229,255,0.50)", glow:"0 0 40px rgba(0,229,255,0.25)" },
    sepia: { bg:"rgba(41, 41, 41, 0.75)", border:"rgba(200,168,122,0.55)", glow:"0 0 30px rgba(200,168,122,0.20)" },
    pink:  { bg:"rgba(136,14,79,0.65)", border:"rgba(255,143,177,0.60)", glow:"0 0 40px rgba(244,143,177,0.25)" },
    mint:  { bg:"rgba(10,35,32,0.75)", border:"rgba(52,211,153,0.55)", glow:"0 0 40px rgba(52,211,153,0.25)" },
  };
  const ov = overlayStyles[theme] || overlayStyles.light;

  const textColors = {
    light:"#ffffff", dark:"#E0F7FA", sepia:"#FFF8E1", pink:"#Ffffff", mint:"#ffffff"
  };
  const subTextColors = {
    light:"#ffffff", dark:"#80DEEA", sepia:"#EFEBE9", pink:"#Ffffff", mint:"#ffffff"
  };

  return (
    <div style={{
      position:"relative", width:"100%", minHeight:"340px",
      borderRadius:"14px", overflow:"hidden",
      animation:"cover-fadein 0.6s cubic-bezier(0.22,1,0.36,1) both"
    }}>
      {/* Animated landscape background */}
      <div style={{position:"absolute", inset:0, borderRadius:"14px", overflow:"hidden"}}>
        {landscape}
      </div>

      {/* Dark gradient overlay for text legibility */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%)",
        borderRadius:"14px"
      }}/>



      {/* Content */}
      <div style={{
        position:"relative", zIndex:3,
        padding:"28px 36px 32px",
        display:"flex", flexDirection:"column", alignItems:"center",
        minHeight:"340px", justifyContent:"space-between"
      }}>
        {/* 1. Add the media query styles at the top of your component or CSS file */}
        <style>
          {`
            @media (max-width: 768px) {
              .logos-row-container {
                display: none !important;
              }
            }
          `}
        </style>

        {/* ── TOP: Logos row ── */}
        <div
        className="logos-row-container"
        style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          width:"100%", gap:"16px"
        }}>
          {/* DENR logo */}
          <div style={{
            animation:"logo-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.3s both",
            display:"flex", alignItems:"center", gap:"10px"
          }}>
            <DENRLogo size={54}/>
            <div>
              <div style={{
                color:"white", fontFamily:"'Playfair Display',serif",
                fontWeight:"700", fontSize:"12px", lineHeight:"1.3",
                textShadow:"0 1px 6px rgba(0,0,0,0.60)",
                letterSpacing:"0.3px"
              }}>Department of Environment</div>
              <div style={{
                color:"white", fontFamily:"'Playfair Display',serif",
                fontWeight:"700", fontSize:"12px",
                textShadow:"0 1px 6px rgba(0,0,0,0.60)"
              }}>and Natural Resources</div>
              <div style={{
                color:subTextColors[theme]||"#B3E5FC",
                fontSize:"10px", fontWeight:"600",
                textShadow:"0 1px 4px rgba(0,0,0,0.50)",
                letterSpacing:"0.8px", marginTop:"2px"
              }}>NATIONAL CAPITAL REGION</div>
            </div>
          </div>

          {/* Center decorative divider */}
          <div style={{
            flex:1, height:"1px",
            background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.40), transparent)"
          }}/>

          {/* ENR Academy logo */}
          <div style={{
            animation:"logo-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both",
            display:"flex", alignItems:"center", gap:"10px"
          }}>
            <div>
              <div style={{
                color:"white", fontFamily:"'Playfair Display',serif",
                fontWeight:"700", fontSize:"12px", textAlign:"right",
                textShadow:"0 1px 6px rgba(0,0,0,0.60)"
              }}>ENR Academy</div>
              <div style={{
                color:subTextColors[theme]||"#B3E5FC",
                fontSize:"10px", fontWeight:"600",
                textAlign:"right", textShadow:"0 1px 4px rgba(0,0,0,0.50)",
                letterSpacing:"0.8px"
              }}>BASIC COURSE 2026</div>
            </div>
            <ENRAcademyLogo size={54}/>
          </div>
        </div>


        {/* ── BOTTOM: Event badge ── */}
        <div style={{
          display:"flex", alignItems:"center", gap:"10px",
          animation:"title-slide-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both"
        }}>
          <div style={{
            background:"rgba(255,255,255,0.15)",
            border:"1px solid rgba(255,255,255,0.30)",
            borderRadius:"999px",
            padding:"6px 20px",
            color:"white",
            fontSize:"11px",
            fontFamily:"'DM Sans',sans-serif",
            fontWeight:"700",
            letterSpacing:"1.2px",
            textTransform:"uppercase",
            backdropFilter:"blur(8px)",
            animation:"badge-glow 3s ease-in-out infinite",
            textShadow:"0 1px 4px rgba(0,0,0,0.40)"
          }}>
            💧 ENRA Basic Course 2026
          </div>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// CLOSING SLIDE ILLUSTRATION (Slide 161)
// ═══════════════════════════════════════════════════════════════════════════════
export function IllustrationClosingSlide() {
  injectStyles();
  const theme = useTheme();

  const landscapes = {
    light:   <OceanLandscape/>,
    dark:    <GalaxyLandscape/>,
    sepia:   <SepiаLandscape/>,
    pink:    <CherryBlossomLandscape/>,
    mint:    <MintLandscape/>,
  };
  const landscape = landscapes[theme] || <OceanLandscape/>;

  const overlayStyles = {
    light: { bg:"rgba(1,87,155,0.68)", border:"rgba(79,195,247,0.55)" },
    dark:  { bg:"rgba(2,8,24,0.78)",  border:"rgba(0,229,255,0.50)" },
    sepia: { bg:"rgba(62,39,35,0.72)", border:"rgba(200,168,122,0.55)" },
    pink:  { bg:"rgba(136,14,79,0.62)", border:"rgba(244,143,177,0.60)" },
    mint:  { bg:"rgba(10,35,32,0.72)", border:"rgba(52,211,153,0.55)" },
  };
  const ov = overlayStyles[theme] || overlayStyles.light;
  const subTextColors = {
    light:"#B3E5FC", dark:"#80DEEA", sepia:"#EFEBE9", pink:"#F8BBD9", mint:"#B2DFDB"
  };

  return (
    <div style={{
      position:"relative", width:"100%", minHeight:"320px",
      borderRadius:"14px", overflow:"hidden",
      animation:"cover-fadein 0.6s cubic-bezier(0.22,1,0.36,1) both"
    }}>
      {/* Landscape */}
      <div style={{position:"absolute", inset:0, borderRadius:"14px", overflow:"hidden"}}>
        {landscape}
      </div>
      {/* Overlay */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.60) 100%)",
        borderRadius:"14px"
      }}/>

      {/* Content */}
      <div style={{
        position:"relative", zIndex:3,
        padding:"28px 36px 28px",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", minHeight:"320px", gap:"20px"
      }}>

        {/* Logos row at top */}
        <div style={{
          display:"flex", alignItems:"center", gap:"24px",
          animation:"logo-pop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.15s both"
        }}>
          <DENRLogo size={46} opacity={0.95}/>
          <div style={{
            color:"white", textAlign:"center",
            fontFamily:"'DM Sans',sans-serif", fontSize:"11px",
            fontWeight:"700", letterSpacing:"0.8px",
            textShadow:"0 1px 4px rgba(0,0,0,0.50)",
            opacity:0.80
          }}>·</div>
          <ENRAcademyLogo size={46} opacity={0.95}/>
        </div>

        {/* Pulsing ring behind main card */}
        <div style={{position:"relative"}}>
          <div style={{
            position:"absolute", inset:"-18px",
            borderRadius:"50%", border:`2px solid ${ov.border}`,
            animation:"pulse-ring 2s ease-out infinite",
            pointerEvents:"none"
          }}/>

          {/* Main closing card */}
          <div style={{
            background:ov.bg,
            border:`1.5px solid ${ov.border}`,
            borderRadius:"16px",
            padding:"24px 40px",
            backdropFilter:"blur(14px)",
            textAlign:"center",
            animation:"closing-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both"
          }}>
            <div style={{
              color:"white",
              fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(22px,4vw,30px)",
              fontWeight:"700",
              textShadow:"0 2px 12px rgba(0,0,0,0.55)",
              letterSpacing:"-0.3px"
            }}>
              Thank You!
            </div>

            <div style={{
              width:"40px", height:"2px", margin:"12px auto",
              background:ov.border
            }}/>

            <div style={{
              color:subTextColors[theme]||"#B3E5FC",
              fontFamily:"'Playfair Display',serif",
              fontSize:"14px", fontStyle:"italic",
              fontWeight:"600",
              textShadow:"0 1px 6px rgba(0,0,0,0.45)",
              lineHeight:"1.5"
            }}>
              Sustainable Water for a Healthy Nation
            </div>

            <div style={{
              marginTop:"12px",
              color:"rgba(255,255,255,0.70)",
              fontSize:"11px", fontFamily:"'DM Sans',sans-serif",
              lineHeight:"1.6"
            }}>
              DENR – National Capital Region<br/>
              Water Resources Utilization Section, LPDD
            </div>
          </div>
        </div>

        {/* Droplet motif row */}
        <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
          {["💧","💧","💧"].map((e,i)=>(
            <span key={i} style={{
              fontSize:"16px", opacity:0.75,
              animation:`bob ${1.4+i*0.3}s ease-in-out infinite`,
              animationDelay:`${i*0.25}s`
            }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export default { IllustrationCoverSlide, IllustrationClosingSlide };
