// ── WaterResourcesPresentation.jsx ───────────────────────────────────────────
// Slides data is now imported from ./slidesData.js
//
// Theme-matched particle transitions (2 second duration):
//   light   → ❄  snowflakes drifting across — pale blue/white
//   dark    → •  neon glowing particles — cyan/violet/sky blue
//   sepia   → ·  barely-visible dust motes — warm tan, ultra-faint
//   pink    → ✿  cherry blossoms — soft pinks and rose
//   mint    → ✦  green leaves — emerald and sage tones
//   default → ●  water droplets — teal/green
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import { TTSButton, TTSToolbar } from "../TextToSpeech.jsx";
import { SLIDES, SECTION_COLORS, SECTIONS } from "./slidesData.js";
import "./WaterResourcesPresentation.css";

// ── scrollToTop ───────────────────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// ── Slide progress persistence ────────────────────────────────────────────────
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

// ── Theme cycle ───────────────────────────────────────────────────────────────
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
  try {
    const t = localStorage.getItem(THEME_KEY);
    return VALID_THEMES.includes(t) ? t : "light";
  } catch { return "light"; }
}

function writeTheme(t) {
  try { localStorage.setItem(THEME_KEY, t); } catch {}
  document.documentElement.setAttribute("data-theme", t);
}

// ── Particle configs per theme ─────────────────────────────────────────────────
// Particles spawn at random positions across the entire canvas and travel in a
// random direction (not just downward). Each theme has its own color palette and
// shape renderer. Sepia is ultra-subtle (barely visible).
//
// Each config exports:
//   count        — number of particles
//   maxOpacity   — ceiling for individual particle alpha
//   glow         — optional glow blur radius (dark theme)
//   spawn(W,H)   — returns an { x, y, vx, vy, size, color, angle, spin, shape }
//                  describing one particle. vx/vy are in px/s.
//   draw(ctx, p) — renders one particle at (0,0) after translate+rotate

const PARTICLE_CONFIGS = {

  // ── default (dark-green) — soft teal water droplets ──────────────────────
  default: {
    count: 30,
    maxOpacity: 0.22,
    spawn(W, H) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 80;
      const colors = ["#4ade80","#34d399","#6ee7b7","#a7f3d0","#2dd4bf"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: 0, spin: 0,
      };
    },
    draw(ctx, p) {
      // teardrop: circle with a small tail
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size * 0.4, -p.size * 2.2);
      ctx.lineTo(-p.size * 0.4, -p.size * 2.2);
      ctx.closePath();
      ctx.fill();
    },
  },

  // ── light — pale ice-blue snowflakes ─────────────────────────────────────
  light: {
    count: 38,
    maxOpacity: 0.20,
    spawn(W, H) {
      // bias slightly downward but spread across whole screen
      const angle = (Math.PI * 0.3) + Math.random() * Math.PI * 1.4;
      const speed = 40 + Math.random() * 70;
      const colors = ["#bae6fd","#e0f2fe","#7dd3fc","#dbeafe","#93c5fd"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.8,
      };
    },
    draw(ctx, p) {
      // 6-arm snowflake drawn with lines
      const r = p.size;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(0.8, r * 0.18);
      ctx.lineCap = "round";
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        // small branches
        const bx = Math.cos(a) * r * 0.55;
        const by = Math.sin(a) * r * 0.55;
        const ba = a + Math.PI / 2;
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(ba) * r * 0.3, by + Math.sin(ba) * r * 0.3);
        ctx.moveTo(bx, by);
        ctx.lineTo(bx - Math.cos(ba) * r * 0.3, by - Math.sin(ba) * r * 0.3);
        ctx.stroke();
      }
    },
  },

  // ── dark — neon glowing dots, sky-blue / violet / cyan palette ───────────
  dark: {
    count: 45,
    maxOpacity: 0.30,
    glow: 6,
    spawn(W, H) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      const colors = ["#38bdf8","#818cf8","#67e8f9","#a78bfa","#60a5fa","#34d399"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: 0, spin: 0,
      };
    },
    draw(ctx, p) {
      // glowing disc with bright core
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
      grad.addColorStop(0, p.color);
      grad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    },
  },

  // ── sepia — barely-visible warm tan dust, ultra-faint ────────────────────
  sepia: {
    count: 40,
    maxOpacity: 0.20,   // ← very low ceiling — nearly invisible
    spawn(W, H) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 35; // very slow drift
      const colors = ["#c8a87a","#d4b896","#b8956a","#e0c89a"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: 0, spin: 0,
      };
    },
    draw(ctx, p) {
      // tiny soft circle — dust mote
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    },
  },

  // ── pink — soft cherry blossom petals drifting ───────────────────────────
  pink: {
    count: 30,
    maxOpacity: 0.22,
    spawn(W, H) {
      const angle = (Math.PI * 0.25) + Math.random() * Math.PI * 1.5;
      const speed = 35 + Math.random() * 60;
      const colors = ["#f9a8d4","#fbcfe8","#f472b6","#fce7f3","#ec4899","#fda4af"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 9,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2.2,
      };
    },
    draw(ctx, p) {
      // 5-petal flower petal shape
      const r = p.size;
      ctx.fillStyle = p.color;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * r * 0.5;
        const py = Math.sin(a) * r * 0.5;
        ctx.beginPath();
        ctx.ellipse(px, py, r * 0.45, r * 0.28, a, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  },

  // ── mint — soft emerald/sage leaf shapes ─────────────────────────────────
  mint: {
    count: 28,
    maxOpacity: 0.20,
    spawn(W, H) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 70;
      const colors = ["#6ee7b7","#34d399","#a7f3d0","#10b981","#d1fae5","#86efac"];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2.5,
      };
    },
    draw(ctx, p) {
      // simple leaf: two quadratic curves forming a pointed oval
      const r = p.size;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(r * 0.8,  0, 0,  r);
      ctx.quadraticCurveTo(-r * 0.8, 0, 0, -r);
      ctx.fill();
      // midrib
      ctx.strokeStyle = p.color;
      ctx.globalAlpha *= 0.5;
      ctx.lineWidth = Math.max(0.5, r * 0.1);
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.85);
      ctx.lineTo(0,  r * 0.85);
      ctx.stroke();
    },
  },
};

// ── ParticleOverlay — canvas-based ambient particle burst ─────────────────────
// Particles spawn across the entire canvas and drift in random directions.
// Duration: 2 seconds. Fade-out begins at 60% through and ends at 100%.
function ParticleOverlay({ theme, active, onDone }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || 800;
    const H = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 500;
    canvas.width  = W;
    canvas.height = H;

    const cfg      = PARTICLE_CONFIGS[theme] || PARTICLE_CONFIGS.default;
    const DURATION = 2000; // ms — total animation length
    const FADE_AT  = 0.60; // start fading at 60% progress

    // Build particles with staggered entry delays (0–600 ms)
    const particles = Array.from({ length: cfg.count }, () => ({
      ...cfg.spawn(W, H),
      opacity: (0.4 + Math.random() * 0.6) * cfg.maxOpacity,
      delay:   Math.random() * 0.6,
    }));

    let start = null;

    function draw(ts) {
      if (!start) start = ts;
      const elapsed  = (ts - start) / 1000;           // seconds elapsed
      const progress = Math.min(elapsed / (DURATION / 1000), 1);

      ctx.clearRect(0, 0, W, H);

      // Global fade-out in the tail portion of the animation
      const fadeAlpha = progress >= FADE_AT
        ? 1 - (progress - FADE_AT) / (1 - FADE_AT)
        : 1;

      for (const p of particles) {
        const t = Math.max(0, elapsed - p.delay);
        if (t <= 0) continue;

        const px    = p.x + p.vx * t;
        const py    = p.y + p.vy * t;
        const angle = p.angle + (p.spin || 0) * t;

        ctx.save();
        ctx.globalAlpha = p.opacity * fadeAlpha;

        if (cfg.glow) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur  = cfg.glow;
        }

        ctx.translate(px, py);
        ctx.rotate(angle);

        cfg.draw(ctx, p);

        ctx.restore();
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
        onDone?.();
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, theme]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
        borderRadius: "inherit",
      }}
    />
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

// ── SlideContent ───────────────────────────────────────────────────────────────
function SlideContent({ slide }) {
  const color = SECTION_COLORS[slide.section] || "#065A82";

  return (
    <div className="slide-content">
      <div className="slide-section-badge" style={{ background: color + "22", color, borderColor: color + "44" }}>
        {slide.section}
      </div>

      <h2 className="slide-title" style={{ borderLeftColor: color }}>{slide.title}</h2>

      {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}

      {slide.highlight && (
        <div className="slide-highlight" style={{ borderColor: color, background: color + "12" }}>
          {slide.highlight}
        </div>
      )}

      {slide.content && (
        <p className="slide-body" style={{ whiteSpace: "pre-line" }}>{slide.content}</p>
      )}

      {slide.bullets && (
        <ul className="slide-bullets">
          {slide.bullets.map((b, i) => (
            <li key={i} style={{ "--dot": color }}>{b}</li>
          ))}
        </ul>
      )}

      {slide.subBullets && (
        <>
          <p className="slide-body" style={{ marginTop: 14, fontWeight: 600 }}>Additionally:</p>
          <ul className="slide-bullets slide-bullets--sub">
            {slide.subBullets.map((b, i) => (
              <li key={i} style={{ "--dot": color }}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {slide.stats && (
        <div className="slide-stats">
          {slide.stats.map((s, i) => (
            <div key={i} className="stat-item" style={{ borderTopColor: color, borderColor: color + "40" }}>
              <div className="stat-value" style={{ color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {slide.cards && (
        <div className="slide-cards">
          {slide.cards.map((c, i) => (
            <div key={i} className="slide-card" style={{ borderTopColor: color }}>
              <div className="card-label" style={{ color }}>{c.label}</div>
              <p style={{ whiteSpace: "pre-line", margin: 0 }}>{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {slide.timeline && (
        <div className="slide-timeline">
          {slide.timeline.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year" style={{ background: color }}>{t.year}</div>
              <div className="timeline-body">
                <div className="timeline-law" style={{ color }}>{t.law}</div>
                {t.desc && <div className="timeline-desc">{t.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.table && (
        <div className="slide-table-wrap">
          <table className="slide-table">
            <thead>
              <tr style={{ background: color }}>
                {slide.table.headers.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {slide.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
  // particle transition state
  const [particles,   setParticles]   = useState(false);
  const [activeTheme, setActiveTheme] = useState(readTheme);

  // Keep local theme state in sync with the global html attribute
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
    writeTheme(next);
    setTheme(next);
  };

  const themeMeta = THEME_CYCLE[theme] ?? THEME_CYCLE.light;

  const slide   = SLIDES[current];
  const ttsText = buildTTSText(slide);

  // ── go() — navigate with particle burst ───────────────────────────────────
  const go = useCallback((idx) => {
    const next = Math.max(0, Math.min(SLIDES.length - 1, idx));
    // Capture the current theme at navigation time for the particle effect
    setActiveTheme(document.documentElement.getAttribute("data-theme") || "light");
    // Fire particles
    setParticles(true);
    // Switch slide content immediately (particles overlay on top)
    setCurrent(next);
    setSlideKey(k => k + 1);
    setNavOpen(false);
    scrollToTop();
    saveSlide(next);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   go(current - 1);
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  // Filter slides for nav panel
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

      {/* ── Header ── */}
      <header className="pres-header">
        <div className="pres-header-left">
          <button className="pres-back-btn" onClick={onBack}>
            ← <span>Home</span>
          </button>
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
          <div className="pres-counter">
            <strong>{current + 1}</strong>/{SLIDES.length}
          </div>
          <button className="pres-nav-toggle" onClick={() => setNavOpen(n => !n)} aria-label="Open slide navigator">
            ☰
          </button>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="pres-progress">
        <div className="pres-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Main slide ── */}
      <main className="pres-main">
        <div className="pres-slide" style={{ position: "relative" }} key={slideKey}>
          {/* ── Particle overlay (absolutely positioned inside the slide card) ── */}
          <ParticleOverlay
            theme={activeTheme}
            active={particles}
            onDone={() => setParticles(false)}
          />

          <div className="slide-inner">
            <SlideContent slide={slide} />
            <div className="slide-tts-row">
              <TTSToolbar text={ttsText} label="🔊 Read Slide" />
            </div>
          </div>
        </div>
      </main>

      {/* ── Bottom nav ── */}
      <nav className="pres-arrows">
        <button
          className="pres-arrow pres-arrow--prev"
          onClick={() => go(current - 1)}
          disabled={current === 0}
        >← Prev</button>

        <div className="pres-jump">
          <input
            type="number" min={1} max={SLIDES.length}
            value={current + 1}
            onChange={e => go(+e.target.value - 1)}
          />
          <span>of {SLIDES.length}</span>
        </div>

        <button
          className="pres-arrow pres-arrow--next"
          onClick={() => go(current + 1)}
          disabled={current === SLIDES.length - 1}
        >Next →</button>
      </nav>

      {/* ── Nav panel ── */}
      {navOpen && (
        <aside className="pres-nav-panel">
          <div className="nav-panel-header">
            <span>All Slides ({SLIDES.length})</span>
            <button onClick={() => setNavOpen(false)}>✕</button>
          </div>

          <input
            className="nav-search"
            placeholder="Search slides…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="nav-filter">
            <button
              className={`nav-filter-btn${filter === "All" ? " active" : ""}`}
              onClick={() => setFilter("All")}
            >All</button>
            {SECTIONS.map(s => (
              <button
                key={s}
                className={`nav-filter-btn${filter === s ? " active" : ""}`}
                style={filter === s ? { background: SECTION_COLORS[s], color: "#fff", borderColor: SECTION_COLORS[s] } : {}}
                onClick={() => setFilter(s)}
              >{s}</button>
            ))}
          </div>

          <div className="nav-list">
            {filteredSlides.map(s => (
              <button
                key={s.id}
                className={`nav-item${s.id === slide.id ? " active" : ""}`}
                style={s.id === slide.id
                  ? { borderLeftColor: SECTION_COLORS[s.section], background: SECTION_COLORS[s.section] + "18" }
                  : {}
                }
                onClick={() => go(SLIDES.indexOf(s))}
              >
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