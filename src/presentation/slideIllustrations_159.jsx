// ── slideIllustrations_159.jsx ───────────────────────────────────────────────
// Illustration for Slide 159 — "Play your part, be water smart!"
// Wise Water Use — practical conservation tips across 3 life zones:
//   🌿 Outdoor / Garden   🚿 Bathroom / Personal   🍳 Kitchen / Laundry
//
// Layout:
//   • Header tagline banner — "Save it, or do without it!"
//   • 3 icon-card columns, each with 4–5 tips
//   • Footer: central droplet with IWRM conservation note
//
// Wire up:
//   import { IllustrationWaterSmart159 } from "./slideIllustrations_159.jsx";
//   SLIDE_ILLUSTRATIONS[159] = IllustrationWaterSmart159;
// ─────────────────────────────────────────────────────────────────────────────

// White label backing for contrast on any theme
const LB = ({ x, y, w = 70, h = 16, rx = 3 }) => (
  <rect x={x - w / 2} y={y - 12} width={w} height={h} rx={rx}
        fill="rgba(255,255,255,0.90)" />
);

// ── Reusable tip row ──────────────────────────────────────────────────────────
// icon: simple SVG path symbol; text: tip label; color: section accent
function TipRow({ x, y, icon, text, color }) {
  return (
    <g>
      {/* Icon circle */}
      <circle cx={x + 12} cy={y} r={11} fill={color} opacity="0.14"
              stroke={color} strokeWidth="1"/>
      <text x={x + 12} y={y + 5} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif">{icon}</text>
      {/* Tip text */}
      <LB x={x + 12 + 8 + (text.length * 3.0)} y={y + 4}
          w={text.length * 6.0} h={15} rx={3}/>
      <text x={x + 28} y={y + 4} textAnchor="start" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill="#1a1a1a">
        {text}
      </text>
    </g>
  );
}

export function IllustrationWaterSmart159() {
  // ── Section definitions ──
  const sections = [
    {
      x: 18, color: "#2E7D32", label: "🌿 Outdoor & Garden",
      tips: [
        { icon: "🌅", text: "Water early/late — less evaporation" },
        { icon: "🌵", text: "Choose low-water plants" },
        { icon: "🍂", text: "Apply mulch to retain soil moisture" },
        { icon: "🧹", text: "Broom > hose for driveways" },
        { icon: "🔧", text: "Use shut-off nozzle on hose" },
      ],
    },
    {
      x: 242, color: "#0288D1", label: "🚿 Bathroom & Personal",
      tips: [
        { icon: "⏱", text: "Limit showers to 5 minutes" },
        { icon: "💧", text: "Install low-flow showerheads" },
        { icon: "🚽", text: "Use toilets < 1.6 gal per flush" },
        { icon: "🖐", text: "Turn off tap while soaping" },
        { icon: "🪥", text: "Turn off tap while brushing" },
      ],
    },
    {
      x: 466, color: "#E65100", label: "🍳 Kitchen & Laundry",
      tips: [
        { icon: "🍽", text: "Turn off tap while scrubbing" },
        { icon: "⭐", text: "Use Energy Star washing machines" },
        { icon: "👕", text: "Wash only full loads" },
      ],
    },
  ];

  const colW = 210;  // width of each column card

  return (
    <svg width="100%" viewBox="0 0 680 285" role="img"
         xmlns="http://www.w3.org/2000/svg">
      <title>Play your part, be water smart — wise water use tips</title>
      <desc>
        Three columns of practical conservation tips: outdoor and garden, bathroom
        and personal hygiene, and kitchen and laundry efficiency.
      </desc>

      {/* ── TAGLINE BANNER ─────────────────────────────────────────────── */}
      <defs>
        <linearGradient id="ws-banner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1565C0" stopOpacity="0.85"/>
          <stop offset="50%"  stopColor="#0d7a6a" stopOpacity="0.90"/>
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.85"/>
        </linearGradient>
      </defs>

      <rect x="14" y="4" width="652" height="30" rx="8"
            fill="url(#ws-banner)"/>
      {/* Droplet icons flanking the text */}
      <text x="32"  y="24" fontSize="13" fontFamily="sans-serif">💧</text>
      <text x="636" y="24" fontSize="13" fontFamily="sans-serif">💧</text>
      <text x="340" y="24" textAnchor="middle" fontSize="13"
            fontFamily="'Playfair Display',Georgia,serif" fontWeight="700"
            fill="white" letterSpacing="0.5">
        "Save it, or do without it!" — Wise Water Use
      </text>

      {/* ── THREE SECTION COLUMNS ──────────────────────────────────────── */}
      {sections.map(({ x, color, label, tips }, si) => {
        const cardH = 42 + tips.length * 30 + 10;
        return (
          <g key={si}>
            {/* Card background */}
            <rect x={x} y={42} width={colW} height={cardH} rx={10}
                  fill="white" stroke={color} strokeWidth="1.5" opacity="0.92"/>
            {/* Accent left bar */}
            <rect x={x} y={42} width={5} height={cardH} rx={10}
                  fill={color} opacity="0.60"/>
            {/* Section header */}
            <rect x={x + 5} y={42} width={colW - 5} height={34} rx={8}
                  fill={color} opacity="0.10"/>
            <text x={x + colW / 2 + 2} y={64} textAnchor="middle"
                  fontSize="12" fontFamily="sans-serif" fontWeight="800"
                  fill={color}>
              {label}
            </text>

            {/* Tip rows */}
            {tips.map(({ icon, text }, ti) => (
              <TipRow key={ti}
                x={x + 8}
                y={88 + ti * 30}
                icon={icon}
                text={text}
                color={color}
              />
            ))}
          </g>
        );
      })}

      {/* ── COLUMN SEPARATORS ──────────────────────────────────────────── */}
      <line x1="236" y1="44" x2="236" y2="240"
            stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 3" opacity="0.60"/>
      <line x1="460" y1="44" x2="460" y2="240"
            stroke="#e0e0e0" strokeWidth="1" strokeDasharray="4 3" opacity="0.60"/>

      {/* ── FOOTER: IWRM Conservation note ────────────────────────────── */}
      <rect x="14" y="248" width="652" height="32" rx="8"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>

      {/* Central droplet */}
      <ellipse cx="340" cy="261" rx="7" ry="9"
               fill="#0288D1" opacity="0.40"/>
      <path d="M340 252 Q340 247 344 250 Q348 254 340 252Z"
            fill="#0288D1" opacity="0.45"/>

      {/* Left stat */}
      <LB x={156} y={263} w={260} h={14} rx={3}/>
      <text x={156} y={262} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill="#1565C0">
        Low-flow fixtures save up to 60% household water
      </text>

      {/* Right stat */}
      <LB x={520} y={263} w={248} h={14} rx={3}/>
      <text x={520} y={262} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill="#2E7D32">
        Full laundry loads save 5–10 L per wash cycle
      </text>

      {/* IWRM tag */}
      <LB x={340} y={278} w={200} h={13} rx={3}/>
      <text x={340} y={277} textAnchor="middle" fontSize="9"
            fontFamily="sans-serif" fill="#4a4a4a">
        Aligned with IWRM — Conservation &amp; Demand Management
      </text>
    </svg>
  );
}