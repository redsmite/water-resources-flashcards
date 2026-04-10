// ── WaterResourcesPresentation.jsx ───────────────────────────────────────────
// Enhanced interactive version:
//   • Cards      → 3D flip on click (front label / back full text)
//   • Stats      → count-up animation + hover pulse ring
//   • Bullets    → staggered slide-in per item
//   • Timeline   → sequential reveal, click to expand description
//   • Tables     → row-by-row fade-in
//   • Highlight  → typewriter effect
//   • Slide body → orchestrated stagger entrance (title → content → elements)
//   • Particles  → 2s theme-matched ambient burst on navigation
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import { TTSButton, TTSToolbar } from "../TextToSpeech.jsx";
import { SLIDES, SECTION_COLORS, SECTIONS } from "./slidesData.js";
import "./WaterResourcesPresentation.css";
import { SLIDE_ILLUSTRATIONS } from "./slideIllustrations.jsx";

// ── Utilities ─────────────────────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const SLIDE_KEY = "wrm_pres_slide";
function loadSlideIdx() {
  try {
    const v = parseInt(localStorage.getItem(SLIDE_KEY), 10);
    return Number.isFinite(v) && v >= 0 && v < SLIDES.length ? v : 0;
  } catch { return 0; }
}
function saveSlide(idx) {
  try { localStorage.setItem(SLIDE_KEY, String(idx)); } catch {}
}

// ── Theme ─────────────────────────────────────────────────────────────────────
const THEME_CYCLE = {
  light: { next: "dark",  icon: "🌙", label: "Dark"  },
  dark:  { next: "sepia", icon: "📜", label: "Sepia" },
  sepia: { next: "pink",  icon: "🌸", label: "Pink"  },
  pink:  { next: "mint",  icon: "🌿", label: "Mint"  },
  mint:  { next: "light", icon: "☀️", label: "Light" },
};
const THEME_KEY    = "wrm_theme";
const VALID_THEMES = ["light", "dark", "sepia", "pink", "mint"];

function readTheme() {
  try { const t = localStorage.getItem(THEME_KEY); return VALID_THEMES.includes(t) ? t : "light"; }
  catch { return "light"; }
}
function writeTheme(t) {
  try { localStorage.setItem(THEME_KEY, t); } catch {}
  document.documentElement.setAttribute("data-theme", t);
}

// ── Particle configs ──────────────────────────────────────────────────────────
const PARTICLE_CONFIGS = {
  default: {
    count: 30, maxOpacity: 0.22,
    spawn(W, H) {
      const a = Math.random()*Math.PI*2, sp = 60+Math.random()*80;
      const cols = ["#4ade80","#34d399","#6ee7b7","#a7f3d0","#2dd4bf"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:3+Math.random()*5, color:cols[Math.floor(Math.random()*cols.length)], angle:0, spin:0 };
    },
    draw(ctx, p) {
      ctx.beginPath(); ctx.arc(0,0,p.size,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0,-p.size); ctx.lineTo(p.size*.4,-p.size*2.2); ctx.lineTo(-p.size*.4,-p.size*2.2); ctx.closePath(); ctx.fill();
    },
  },
  light: {
    count: 38, maxOpacity: 0.20,
    spawn(W, H) {
      const a=(Math.PI*.3)+Math.random()*Math.PI*1.4, sp=40+Math.random()*70;
      const cols=["#bae6fd","#e0f2fe","#7dd3fc","#dbeafe","#93c5fd"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:4+Math.random()*9, color:cols[Math.floor(Math.random()*cols.length)], angle:Math.random()*Math.PI*2, spin:(Math.random()-.5)*1.8 };
    },
    draw(ctx, p) {
      const r=p.size; ctx.strokeStyle=p.color; ctx.lineWidth=Math.max(.8,r*.18); ctx.lineCap="round";
      for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2,bx=Math.cos(a)*r*.55,by=Math.sin(a)*r*.55,ba=a+Math.PI/2; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r); ctx.moveTo(bx,by); ctx.lineTo(bx+Math.cos(ba)*r*.3,by+Math.sin(ba)*r*.3); ctx.moveTo(bx,by); ctx.lineTo(bx-Math.cos(ba)*r*.3,by-Math.sin(ba)*r*.3); ctx.stroke();}
    },
  },
  dark: {
    count: 45, maxOpacity: 0.30, glow: 6,
    spawn(W, H) {
      const a=Math.random()*Math.PI*2, sp=50+Math.random()*100;
      const cols=["#38bdf8","#818cf8","#67e8f9","#a78bfa","#60a5fa","#34d399"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:2+Math.random()*5, color:cols[Math.floor(Math.random()*cols.length)], angle:0, spin:0 };
    },
    draw(ctx, p) {
      const g=ctx.createRadialGradient(0,0,0,0,0,p.size*2); g.addColorStop(0,p.color); g.addColorStop(1,"transparent");
      ctx.beginPath(); ctx.arc(0,0,p.size*2,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      ctx.beginPath(); ctx.arc(0,0,p.size*.5,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
    },
  },
  sepia: {
    count: 40, maxOpacity: 0.07,
    spawn(W, H) {
      const a=Math.random()*Math.PI*2, sp=20+Math.random()*35;
      const cols=["#c8a87a","#d4b896","#b8956a","#e0c89a"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:1.5+Math.random()*3, color:cols[Math.floor(Math.random()*cols.length)], angle:0, spin:0 };
    },
    draw(ctx, p) { ctx.beginPath(); ctx.arc(0,0,p.size,0,Math.PI*2); ctx.fillStyle=p.color; ctx.fill(); },
  },
  pink: {
    count: 30, maxOpacity: 0.22,
    spawn(W, H) {
      const a=(Math.PI*.25)+Math.random()*Math.PI*1.5, sp=35+Math.random()*60;
      const cols=["#f9a8d4","#fbcfe8","#f472b6","#fce7f3","#ec4899","#fda4af"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:5+Math.random()*9, color:cols[Math.floor(Math.random()*cols.length)], angle:Math.random()*Math.PI*2, spin:(Math.random()-.5)*2.2 };
    },
    draw(ctx, p) {
      const r=p.size; ctx.fillStyle=p.color;
      for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2-Math.PI/2,px=Math.cos(a)*r*.5,py=Math.sin(a)*r*.5; ctx.beginPath(); ctx.ellipse(px,py,r*.45,r*.28,a,0,Math.PI*2); ctx.fill();}
    },
  },
  mint: {
    count: 28, maxOpacity: 0.20,
    spawn(W, H) {
      const a=Math.random()*Math.PI*2, sp=40+Math.random()*70;
      const cols=["#6ee7b7","#34d399","#a7f3d0","#10b981","#d1fae5","#86efac"];
      return { x:Math.random()*W, y:Math.random()*H, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp, size:6+Math.random()*10, color:cols[Math.floor(Math.random()*cols.length)], angle:Math.random()*Math.PI*2, spin:(Math.random()-.5)*2.5 };
    },
    draw(ctx, p) {
      const r=p.size; ctx.fillStyle=p.color;
      ctx.beginPath(); ctx.moveTo(0,-r); ctx.quadraticCurveTo(r*.8,0,0,r); ctx.quadraticCurveTo(-r*.8,0,0,-r); ctx.fill();
      ctx.strokeStyle=p.color; ctx.globalAlpha*=.5; ctx.lineWidth=Math.max(.5,r*.1);
      ctx.beginPath(); ctx.moveTo(0,-r*.85); ctx.lineTo(0,r*.85); ctx.stroke();
    },
  },
};

// ── ParticleOverlay ───────────────────────────────────────────────────────────
function ParticleOverlay({ theme, active, onDone }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 800;
    const H = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 500;
    canvas.width = W; canvas.height = H;
    const cfg = PARTICLE_CONFIGS[theme] || PARTICLE_CONFIGS.default;
    const DURATION = 2000, FADE_AT = 0.60;
    const particles = Array.from({ length: cfg.count }, () => ({
      ...cfg.spawn(W, H),
      opacity: (0.4 + Math.random() * 0.6) * cfg.maxOpacity,
      delay: Math.random() * 0.6,
    }));
    let start = null;
    function draw(ts) {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      const progress = Math.min(elapsed / (DURATION / 1000), 1);
      ctx.clearRect(0, 0, W, H);
      const fadeAlpha = progress >= FADE_AT ? 1-(progress-FADE_AT)/(1-FADE_AT) : 1;
      for (const p of particles) {
        const t = Math.max(0, elapsed - p.delay); if (t <= 0) continue;
        ctx.save();
        ctx.globalAlpha = p.opacity * fadeAlpha;
        if (cfg.glow) { ctx.shadowColor = p.color; ctx.shadowBlur = cfg.glow; }
        ctx.translate(p.x + p.vx * t, p.y + p.vy * t);
        ctx.rotate(p.angle + (p.spin || 0) * t);
        cfg.draw(ctx, p);
        ctx.restore();
      }
      if (progress < 1) rafRef.current = requestAnimationFrame(draw);
      else { ctx.clearRect(0, 0, W, H); onDone?.(); }
    }
    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, theme]); // eslint-disable-line
  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:10, borderRadius:"inherit" }} />;
}

// ── useCountUp ────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1100) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const match = String(target).match(/^([0-9,./]+)(.*)/);
    if (!match) { setDisplay(target); return; }
    const raw = match[1].replace(/,/g, "");
    const suffix = match[2] || "";
    const num = parseFloat(raw);
    if (isNaN(num)) { setDisplay(target); return; }
    const isFloat = raw.includes(".");
    const decimals = isFloat ? (raw.split(".")[1] || "").length : 0;
    let startTs = null;
    const id = requestAnimationFrame(function tick(ts) {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = num * eased;
      const formatted = isFloat ? val.toFixed(decimals) : Math.round(val).toLocaleString();
      setDisplay(formatted + suffix);
      if (p < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [target]); // eslint-disable-line
  return display;
}

// ── AnimatedStat ──────────────────────────────────────────────────────────────
function AnimatedStat({ value, label, color, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 130);
    return () => clearTimeout(t);
  }, [index]);
  const displayed = useCountUp(value, 1100);
  return (
    <div className={`stat-item stat-item--animated${visible ? " stat-item--visible" : ""}`}
      style={{ borderTopColor: color, borderColor: color + "40", "--stat-color": color, animationDelay: `${index * 0.13}s` }}>
      <div className="stat-pulse-ring" style={{ "--pr-color": color }} />
      <div className="stat-value" style={{ color }}>{displayed}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ── FlipCard ──────────────────────────────────────────────────────────────────
function FlipCard({ label, text, color, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-card${flipped ? " flip-card--flipped" : ""}`}
      style={{ "--fc-color": color, animationDelay: `${index * 0.11}s` }}
      onClick={() => setFlipped(f => !f)}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && setFlipped(f => !f)}
      aria-label={`Card: ${label}. Click to ${flipped ? "hide" : "show"} details.`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front" style={{ borderTopColor: color }}>
          <div className="flip-card-icon" style={{ color }}>◈</div>
          <div className="flip-card-front-label" style={{ color }}>{label}</div>
          <div className="flip-card-hint">tap to reveal</div>
        </div>
        <div className="flip-card-back" style={{ background: color + "15", borderColor: color + "60" }}>
          <div className="flip-card-back-label" style={{ color }}>{label}</div>
          <p className="flip-card-back-text">{text}</p>
        </div>
      </div>
    </div>
  );
}

// ── TypewriterText ────────────────────────────────────────────────────────────
function TypewriterText({ text, speed = 26 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const tick = () => { i++; setDisplayed(text.slice(0, i)); if (i < text.length) setTimeout(tick, speed); else setDone(true); };
    const t = setTimeout(tick, 350);
    return () => clearTimeout(t);
  }, [text]); // eslint-disable-line
  return <span>{displayed}{!done && <span className="typewriter-cursor" aria-hidden="true">|</span>}</span>;
}

// ── AnimatedTimeline ──────────────────────────────────────────────────────────
function AnimatedTimeline({ items, color }) {
  // Use an array to keep track of all indices that have been opened
  const [openedIndices, setOpenedIndices] = useState([]);

  const handleToggle = (index) => {
    // Only add the index if it isn't already there (Permanent expansion)
    if (!openedIndices.includes(index)) {
      setOpenedIndices((prev) => [...prev, index]);
    }
  };

  return (
    <div className="slide-timeline slide-timeline--interactive">
      {items.map((t, i) => {
        const isOpen = openedIndices.includes(i);
        return (
          <div
            key={i}
            className={`timeline-item timeline-item--interactive${isOpen ? " timeline-item--open" : ""}`}
            style={{ "--tl-color": color, animationDelay: `${i * 0.09}s` }}
            onClick={() => handleToggle(i)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && handleToggle(i)}
          >
            <div className="timeline-dot" style={{ background: color }} />
            <div className="timeline-year-pill" style={{ background: color + "22", color, borderColor: color + "55" }}>
              {t.year}
            </div>
            <div className="timeline-body">
              <div className="timeline-law" style={{ color }}>{t.law}</div>
              {/* Added a wrapper for the smooth transition */}
              <div className={`timeline-desc-collapse${isOpen ? " timeline-desc-collapse--open" : ""}`}>
                {t.desc && <div className="timeline-desc">{t.desc}</div>}
              </div>
            </div>
            {t.desc && (
              <div className="timeline-chevron" style={{ color, opacity: isOpen ? 0 : 1 }}>
                <span className={`chevron-arrow${isOpen ? " chevron-arrow--up" : ""}`}>›</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── AnimatedTable ─────────────────────────────────────────────────────────────
function AnimatedTable({ headers, rows, color }) {
  return (
    <div className="slide-table-wrap">
      <table className="slide-table">
        <thead>
          <tr style={{ background: color }}>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="table-row--animated" style={{ animationDelay: `${i * 0.09}s` }}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Build TTS text ─────────────────────────────────────────────────────────────
function buildTTSText(slide) {
  const parts = [`Slide ${slide.id}. ${slide.title}.`];
  if (slide.subtitle)   parts.push(slide.subtitle + ".");
  if (slide.highlight)  parts.push(slide.highlight);
  if (slide.content)    parts.push(slide.content);
  if (slide.bullets)    slide.bullets.forEach(b => parts.push(b));
  if (slide.subBullets) slide.subBullets.forEach(b => parts.push(b));
  if (slide.cards)      slide.cards.forEach(c => parts.push(`${c.label}: ${c.text}`));
  if (slide.stats)      slide.stats.forEach(s => parts.push(`${s.label}: ${s.value}`));
  if (slide.timeline)   slide.timeline.forEach(t => parts.push(`${t.year}: ${t.law}. ${t.desc}`));
  if (slide.table)      slide.table.rows.forEach(r => parts.push(r.join(" — ")));
  if (slide.note)       parts.push("Note: " + slide.note);
  return parts.join(" ");
}

// ── PATCH: Add ENRABadge component + wire into SlideContent ──────────────────
//
// 1. Add this component ABOVE the SlideContent function definition:
// ─────────────────────────────────────────────────────────────────────────────

function ENRABadge() {
  return (
    <div className="slide-enra-badge" aria-hidden="true">
      <span className="slide-enra-badge__text">ENR Academy</span>
      {/* Gear + person icon — matches the PPT logo style */}
      <svg
        className="slide-enra-badge__icon"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Person / group silhouette */}
        <circle cx="20" cy="16" r="6" fill="#1565C0" opacity="0.7"/>
        <path d="M8 36 C8 28 14 24 20 24 C26 24 32 28 32 36" fill="#1565C0" opacity="0.65"/>
        <circle cx="30" cy="14" r="4.5" fill="#2ECC40" opacity="0.7"/>
        <path d="M22 34 C22 27.5 26.5 24 30 24 C37 24 40 27.5 40 34" fill="#2ECC40" opacity="0.6"/>

        {/* Gear ring around group */}
        <circle cx="24" cy="26" r="18" fill="none" stroke="#4A7C59" strokeWidth="2" opacity="0.4"/>
        {/* Gear teeth — 8 spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (Math.PI * deg) / 180;
          const x1 = 24 + Math.cos(r) * 17;
          const y1 = 26 + Math.sin(r) * 17;
          const x2 = 24 + Math.cos(r) * 21;
          const y2 = 26 + Math.sin(r) * 21;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#4A7C59"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Inside the SlideContent return, find the .slide-inner div and add
//    <ENRABadge /> as its LAST child (before the closing </div> of slide-inner).
//
// FIND in WaterResourcesPresentation.jsx:
// ─────────────────────────────────────────────────────────────────────────────

/*
        <div className="slide-inner">
          <SlideContent slide={slide} entranceKey={slideKey} />
          <div className="slide-tts-row">
            <TTSToolbar text={ttsText} label="🔊 Read Slide" />
          </div>
        </div>
*/

// ── SlideContent ───────────────────────────────────────────────────────────────
function SlideContent({ slide, entranceKey }) {
  const color = SECTION_COLORS[slide.section] || "#065A82";

  // Resolve illustration component for this slide
  const IllustrationComponent = SLIDE_ILLUSTRATIONS[slide.id] ?? null;

  // Hero slides: cover (id=1) and closing (id=160,161) put illustration above title
  const isHero = slide.type === "cover" || slide.type === "closing";

  // Accent slides: little-text slides — illustration floats beside content
  // (any slide that has no bullets, no cards, no stats, no table, no timeline)
  const isAccent = !isHero && IllustrationComponent && (
    !slide.bullets && !slide.cards && !slide.stats &&
    !slide.table && !slide.timeline && !slide.subBullets
  );

  return (
    <div className="slide-content" key={entranceKey}>

      {/* ── HERO illustration (above title) ── */}
      {IllustrationComponent && isHero && (
        <div className="slide-illustration slide-illustration--hero">
          <IllustrationComponent />
        </div>
      )}

      {/* Badge with shimmer sweep */}
      <div className="slide-section-badge" style={{ background: color + "22", color, borderColor: color + "44" }}>
        <span className="badge-shimmer" />
        {slide.section}
      </div>

      {/* Title */}
      <h2 className="slide-title" style={{ borderLeftColor: color, "--tc": color }}>{slide.title}</h2>

      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}

      {/* ── ACCENT illustration (floats right beside content on wide screens) ── */}
      {IllustrationComponent && isAccent && (
        <div className="slide-illustration slide-illustration--accent">
          <IllustrationComponent />
        </div>
      )}

      {/* ── STANDARD illustration (below title, above content) ── */}
      {IllustrationComponent && !isHero && !isAccent && (
        <div className="slide-illustration">
          <IllustrationComponent />
        </div>
      )}

      {/* Highlight with typewriter */}
      {slide.highlight && (
        <div className="slide-highlight" style={{ borderColor: color, background: color + "12" }}>
          <TypewriterText text={slide.highlight} />
        </div>
      )}

      {slide.content && (
        <p className="slide-body" style={{ whiteSpace: "pre-line" }}>{slide.content}</p>
      )}

      {/* Staggered bullets */}
      {slide.bullets && (
        <ul className="slide-bullets">
          {slide.bullets.map((b, i) => (
            <li key={i} className="slide-bullet-item" style={{ "--dot": color, "--i": i, animationDelay: `${0.07 + i * 0.07}s` }}>{b}</li>
          ))}
        </ul>
      )}

      {slide.subBullets && (
        <>
          <p className="slide-body additionally-label">Additionally:</p>
          <ul className="slide-bullets slide-bullets--sub">
            {slide.subBullets.map((b, i) => (
              <li key={i} className="slide-bullet-item" style={{ "--dot": color, "--i": i + (slide.bullets?.length || 0), animationDelay: `${0.07 + (i + (slide.bullets?.length || 0)) * 0.07}s` }}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {/* Stats with count-up */}
      {slide.stats && (
        <div className="slide-stats">
          {slide.stats.map((s, i) => (
            <AnimatedStat key={`${entranceKey}-${i}`} value={s.value} label={s.label} color={color} index={i} />
          ))}
        </div>
      )}

      {/* Flip cards */}
      {slide.cards && (
        <div className="slide-cards slide-cards--flip">
          {slide.cards.map((c, i) => (
            <FlipCard key={i} label={c.label} text={c.text} color={color} index={i} />
          ))}
        </div>
      )}

      {/* Interactive timeline */}
      {slide.timeline && <AnimatedTimeline items={slide.timeline} color={color} />}

      {/* Animated table */}
      {slide.table && <AnimatedTable headers={slide.table.headers} rows={slide.table.rows} color={color} />}

      {slide.articleNo && (
        <div className="article-badge" style={{ background: color }}>{slide.articleNo}</div>
      )}

      {slide.note && <p className="slide-note">📌 {slide.note}</p>}
    </div>
  );
}
// ── Main Component ─────────────────────────────────────────────────────────────
export default function WaterResourcesPresentation({ onBack }) {
  const [theme,       setTheme]       = useState(readTheme);
  const [current,     setCurrent]     = useState(loadSlideIdx);
  const [navOpen,     setNavOpen]     = useState(false);
  const [search,      setSearch]      = useState("");
  const [filter,      setFilter]      = useState("All");
  const [slideKey,    setSlideKey]    = useState(0);
  const [particles,   setParticles]   = useState(false);
  const [activeTheme, setActiveTheme] = useState(readTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme");
      if (VALID_THEMES.includes(t)) setTheme(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    const next = THEME_CYCLE[theme]?.next ?? "light";
    writeTheme(next); setTheme(next);
  };

  const themeMeta = THEME_CYCLE[theme] ?? THEME_CYCLE.light;
  const slide     = SLIDES[current];
  const ttsText   = buildTTSText(slide);

  const go = useCallback((idx) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, idx));
    setActiveTheme(document.documentElement.getAttribute("data-theme") || "light");
    setParticles(true);
    setCurrent(next);
    setSlideKey(k => k + 1);
    setNavOpen(false);
    scrollToTop();
    saveSlide(next);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   go(current - 1);
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const filteredSlides = SLIDES.filter(s => {
    const matchSection = filter === "All" || s.section === filter;
    const matchSearch  = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.content ?? "").toLowerCase().includes(search.toLowerCase());
    return matchSection && matchSearch;
  });

  const progress = ((current + 1) / SLIDES.length) * 100;

  return (
    <div className="pres-root">
      {/* Hide / remove theme-toggle icon on this particular page */}
      <style>
        {`
          .theme-toggle { 
            display: none !important; 
          }
        `}
      </style>

      <header className="pres-header">
        <div className="pres-header-left">
          <button className="pres-back-btn" onClick={onBack}>← <span>Home</span></button>
          <div className="pres-logo">💧</div>
          <div>
            <div className="pres-agency">DENR – NCR | Water Resources Utilization Section</div>
            <div className="pres-event">Specialized Learning Event · 20 April 2026</div>
          </div>
        </div>
        <div className="pres-header-right">
          <button className="pres-theme-btn" onClick={cycleTheme} title="Switch theme">
            <span className="pres-theme-btn-icon">{themeMeta.icon}</span>
            <span>{themeMeta.label}</span>
          </button>
          <TTSButton text={ttsText} size={18} />
          <div className="pres-counter"><strong>{current + 1}</strong>/{SLIDES.length}</div>
          <button className="pres-nav-toggle" onClick={() => setNavOpen(n => !n)} aria-label="Open slide navigator">☰</button>
        </div>
      </header>

      <div className="pres-progress">
        <div className="pres-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <main className="pres-main">
        <div className="pres-slide" style={{ position:"relative" }} key={slideKey}>
          <ParticleOverlay theme={activeTheme} active={particles} onDone={() => setParticles(false)} />
            <div className="slide-inner">
              <SlideContent slide={slide} entranceKey={slideKey} />
              <div className="slide-tts-row">
                <TTSToolbar text={ttsText} label="🔊 Read Slide" />
              </div>
              <ENRABadge />
            </div>
        </div>
      </main>

      <nav className="pres-arrows">
        <button className="pres-arrow pres-arrow--prev" onClick={() => go(current - 1)} disabled={current === 0}>← Prev</button>
        <div className="pres-jump">
          <input type="number" min={1} max={SLIDES.length} value={current + 1} onChange={e => go(+e.target.value - 1)} />
          <span>of {SLIDES.length}</span>
        </div>
        <button className="pres-arrow pres-arrow--next" onClick={() => go(current + 1)} disabled={current === SLIDES.length - 1}>Next →</button>
      </nav>

      {navOpen && (
        <aside className="pres-nav-panel">
          <div className="nav-panel-header">
            <span>All Slides ({SLIDES.length})</span>
            <button onClick={() => setNavOpen(false)}>✕</button>
          </div>
          <input className="nav-search" placeholder="Search slides…" value={search} onChange={e => setSearch(e.target.value)} />
          <div className="nav-filter">
            <button className={`nav-filter-btn${filter === "All" ? " active" : ""}`} onClick={() => setFilter("All")}>All</button>
            {SECTIONS.map(s => (
              <button key={s} className={`nav-filter-btn${filter === s ? " active" : ""}`}
                style={filter === s ? { background: SECTION_COLORS[s], color: "#fff", borderColor: SECTION_COLORS[s] } : {}}
                onClick={() => setFilter(s)}>{s}</button>
            ))}
          </div>
          <div className="nav-list">
            {filteredSlides.map(s => (
              <button key={s.id}
                className={`nav-item${s.id === slide.id ? " active" : ""}`}
                style={s.id === slide.id ? { borderLeftColor: SECTION_COLORS[s.section], background: SECTION_COLORS[s.section] + "18" } : {}}
                onClick={() => go(SLIDES.indexOf(s))}>
                <span className="nav-item-num" style={{ color: SECTION_COLORS[s.section] }}>{s.id}</span>
                <div>
                  <div className="nav-item-title">{s.title}</div>
                  <div className="nav-item-section">{s.section}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}