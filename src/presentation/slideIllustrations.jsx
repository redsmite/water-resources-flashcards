// ── slideIllustrations.jsx ────────────────────────────────────────────────────
// SVG illustration components rendered inline on slides.
// Import the map with:
//   import { SLIDE_ILLUSTRATIONS } from "./slideIllustrations.jsx";
// Then in SlideContent: SLIDE_ILLUSTRATIONS[slide.id]?.()
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared SVG defs string (arrow marker) ────────────────────────────────────
const ArrowDef = () => (
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </marker>
  </defs>
);

// ── Slide 1 — Cover: Earth water globe ───────────────────────────────────────
function IllustrationCover() {
  return (
    <svg width="100%" viewBox="0 0 680 230" role="img" aria-label="Water globe illustration">
      <title>Water globe — cover illustration</title>
      <desc>Stylised Earth globe showing ocean, continents, and water droplets</desc>
      <defs>
        <clipPath id="sl1-gc"><circle cx="340" cy="115" r="90"/></clipPath>
        <linearGradient id="sl1-og" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A6B8A" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#065A82"/>
        </linearGradient>
        <radialGradient id="sl1-glow" cx="45%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#4ACBF0" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#4ACBF0" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Outer glow ring */}
      <circle cx="340" cy="115" r="108" fill="none" stroke="#4ACBF0" strokeWidth="1" opacity="0.18"/>
      <circle cx="340" cy="115" r="120" fill="none" stroke="#4ACBF0" strokeWidth="0.6" opacity="0.1"/>

      {/* Globe base */}
      <circle cx="340" cy="115" r="90" fill="url(#sl1-og)"/>
      <circle cx="340" cy="115" r="90" fill="url(#sl1-glow)"/>

      {/* Continents */}
      <g clipPath="url(#sl1-gc)">
        <ellipse cx="308" cy="82" rx="40" ry="30" fill="#1B9A6B" opacity="0.82"/>
        <ellipse cx="276" cy="108" rx="20" ry="25" fill="#1B9A6B" opacity="0.78"/>
        <ellipse cx="378" cy="96" rx="26" ry="20" fill="#1B9A6B" opacity="0.72"/>
        <ellipse cx="360" cy="148" rx="22" ry="14" fill="#1B9A6B" opacity="0.68"/>
        <ellipse cx="315" cy="148" rx="12" ry="8" fill="#1B9A6B" opacity="0.55"/>
        {/* Wave bands at equator */}
        <rect x="250" y="152" width="180" height="5" rx="2.5" fill="#4ACBF0" opacity="0.22"/>
        <rect x="250" y="162" width="180" height="4" rx="2" fill="#4ACBF0" opacity="0.15"/>
      </g>

      {/* Globe grid lines */}
      <g clipPath="url(#sl1-gc)" opacity="0.12">
        <ellipse cx="340" cy="115" rx="90" ry="32" fill="none" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="340" cy="78" rx="76" ry="20" fill="none" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="340" cy="150" rx="76" ry="20" fill="none" stroke="#fff" strokeWidth="1"/>
        <line x1="340" y1="25" x2="340" y2="205" stroke="#fff" strokeWidth="1"/>
        <line x1="250" y1="115" x2="430" y2="115" stroke="#fff" strokeWidth="1"/>
      </g>

      {/* Globe rim */}
      <circle cx="340" cy="115" r="90" fill="none" stroke="#4ACBF0" strokeWidth="2" opacity="0.55"/>

      {/* Floating droplets — left */}
      <g fill="#4ACBF0" opacity="0.72">
        <ellipse cx="196" cy="72" rx="8" ry="11"/>
        <path d="M196 61 Q196 56 200 59 Q204 62 196 61Z" fill="#4ACBF0"/>
      </g>
      <g fill="#4ACBF0" opacity="0.55">
        <ellipse cx="155" cy="138" rx="6" ry="8"/>
        <path d="M155 130 Q155 126 158 128 Q161 130 155 130Z" fill="#4ACBF0"/>
      </g>
      <g fill="#4ACBF0" opacity="0.45">
        <ellipse cx="176" cy="170" rx="4.5" ry="6"/>
        <path d="M176 164 Q176 161 179 162.5 Q181 164 176 164Z" fill="#4ACBF0"/>
      </g>

      {/* Floating droplets — right */}
      <g fill="#4ACBF0" opacity="0.70">
        <ellipse cx="492" cy="82" rx="8" ry="11"/>
        <path d="M492 71 Q492 66 496 69 Q500 72 492 71Z" fill="#4ACBF0"/>
      </g>
      <g fill="#4ACBF0" opacity="0.52">
        <ellipse cx="524" cy="148" rx="6" ry="8"/>
        <path d="M524 140 Q524 136 527 138 Q530 140 524 140Z" fill="#4ACBF0"/>
      </g>
      <g fill="#4ACBF0" opacity="0.42">
        <ellipse cx="508" cy="180" rx="4" ry="5.5"/>
        <path d="M508 174.5 Q508 172 510.5 173 Q513 174.5 508 174.5Z" fill="#4ACBF0"/>
      </g>

      {/* Ripple arcs */}
      <circle cx="340" cy="115" r="100" fill="none" stroke="#4ACBF0" strokeWidth="1" opacity="0.1"/>
      <circle cx="340" cy="115" r="115" fill="none" stroke="#4ACBF0" strokeWidth="0.6" opacity="0.07"/>
    </svg>
  );
}

// ── Slide 4 / 5 — NWRB statement (little text) ───────────────────────────────
function IllustrationNWRB() {
  return (
    <svg width="100%" viewBox="0 0 680 180" role="img" aria-label="NWRB water authority illustration">
      <title>NWRB — National Water Resources Board</title>
      <desc>Stylised government seal with water waves representing national water authority</desc>
      <defs>
        <linearGradient id="sl4-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#028090" stopOpacity="0.05"/>
          <stop offset="50%" stopColor="#028090" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#028090" stopOpacity="0.05"/>
        </linearGradient>
      </defs>

      {/* Waves */}
      <path d="M0 120 Q85 105 170 120 Q255 135 340 120 Q425 105 510 120 Q595 135 680 120 L680 180 L0 180 Z" fill="#028090" opacity="0.12"/>
      <path d="M0 132 Q90 118 185 132 Q280 148 370 132 Q460 118 560 132 Q630 140 680 134 L680 180 L0 180 Z" fill="#028090" opacity="0.20"/>
      <path d="M0 144 Q100 132 210 144 Q320 158 430 144 Q540 132 640 144 L680 148 L680 180 L0 180 Z" fill="#028090" opacity="0.30"/>

      {/* Seal outer ring */}
      <circle cx="340" cy="82" r="58" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.45"/>
      <circle cx="340" cy="82" r="50" fill="#028090" opacity="0.07"/>
      <circle cx="340" cy="82" r="44" fill="none" stroke="#028090" strokeWidth="0.6" opacity="0.3"/>

      {/* Gear teeth on outer ring */}
      {Array.from({length:16}, (_,i) => {
        const a = (i/16)*Math.PI*2;
        const r1=55, r2=62;
        const x1=340+Math.cos(a)*r1, y1=82+Math.sin(a)*r1;
        const x2=340+Math.cos(a)*r2, y2=82+Math.sin(a)*r2;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#028090" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>;
      })}

      {/* Water drop in center */}
      <ellipse cx="340" cy="90" rx="16" ry="20" fill="#028090" opacity="0.65"/>
      <path d="M340 70 Q340 63 345 67 Q352 72 340 70Z" fill="#028090" opacity="0.65"/>
      {/* Highlight on drop */}
      <ellipse cx="335" cy="84" rx="4" ry="5" fill="#fff" opacity="0.25"/>

      {/* Laurel-like arcs */}
      <path d="M295 55 Q285 40 280 55" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.45"/>
      <path d="M288 62 Q275 50 274 66" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.38"/>
      <path d="M385 55 Q395 40 400 55" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.45"/>
      <path d="M392 62 Q405 50 406 66" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.38"/>

      {/* Three pillar icons flanking seal */}
      {/* Policy */}
      <g opacity="0.55">
        <rect x="100" y="52" width="60" height="44" rx="4" fill="none" stroke="#028090" strokeWidth="1"/>
        <line x1="112" y1="64" x2="148" y2="64" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="112" y1="72" x2="148" y2="72" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="112" y1="80" x2="136" y2="80" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="130" y="108" textAnchor="middle" fontSize="10" fill="#028090" fontFamily="sans-serif">Policy</text>
      </g>
      {/* Resource */}
      <g opacity="0.55">
        <ellipse cx="340" cy="168" rx="28" ry="7" fill="#028090" opacity="0.2"/>
        <text x="340" y="168" textAnchor="middle" fontSize="10" fill="#028090" fontFamily="sans-serif" dy="4">Resource</text>
      </g>
      {/* Economic */}
      <g opacity="0.55">
        <rect x="520" y="52" width="60" height="44" rx="4" fill="none" stroke="#028090" strokeWidth="1"/>
        <text x="532" y="66" fontSize="11" fill="#028090" fontFamily="sans-serif">₱</text>
        <line x1="532" y1="76" x2="568" y2="76" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="532" y1="84" x2="560" y2="84" stroke="#028090" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="550" y="108" textAnchor="middle" fontSize="10" fill="#028090" fontFamily="sans-serif">Economic</text>
      </g>
    </svg>
  );
}

// ── Slides 35-37 — Water Ownership / Regalian Doctrine ───────────────────────
function IllustrationWaterOwnership() {
  return (
    <svg width="100%" viewBox="0 0 680 185" role="img" aria-label="All waters belong to the State illustration">
      <title>Water ownership — all waters belong to the State</title>
      <desc>Landscape cross-section showing all water types: rivers, rain, sea, groundwater — all under the State</desc>
      <defs>
        <linearGradient id="sl36-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00695C" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#00695C" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="sl36-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.28"/>
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="680" height="185" fill="url(#sl36-sky)"/>

      {/* Ground layer */}
      <rect x="0" y="128" width="680" height="57" rx="0" fill="url(#sl36-ground)"/>
      <path d="M0 128 Q170 118 340 128 Q510 138 680 128 L680 185 L0 185 Z" fill="#4A7C59" opacity="0.15"/>

      {/* Underground water pockets */}
      <ellipse cx="160" cy="162" rx="62" ry="14" fill="#028090" opacity="0.28"/>
      <ellipse cx="340" cy="168" rx="80" ry="12" fill="#028090" opacity="0.22"/>
      <ellipse cx="530" cy="160" rx="65" ry="14" fill="#028090" opacity="0.28"/>

      {/* River / surface water (centre) */}
      <path d="M0 110 Q50 102 100 110 Q160 118 220 108 Q280 98 340 108 Q400 118 460 108 Q520 98 580 108 Q630 112 680 110" fill="none" stroke="#00695C" strokeWidth="2.5" opacity="0.55"/>
      <path d="M0 118 Q60 110 130 118 Q200 128 280 118 Q360 108 440 118 Q520 128 600 118 Q650 122 680 118" fill="none" stroke="#00695C" strokeWidth="1.8" opacity="0.38"/>

      {/* Rain cloud (left) */}
      <g opacity="0.7">
        <ellipse cx="110" cy="42" rx="26" ry="16" fill="#028090" opacity="0.35"/>
        <ellipse cx="88" cy="50" rx="18" ry="13" fill="#028090" opacity="0.35"/>
        <ellipse cx="132" cy="50" rx="16" ry="11" fill="#028090" opacity="0.3"/>
        {[96,108,120,132].map((x,i) => (
          <line key={i} x1={x} y1={60} x2={x-4} y2={76} stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        ))}
        <text x="110" y="98" textAnchor="middle" fontSize="10" fill="#00695C" fontFamily="sans-serif" opacity="0.8">Rainfall</text>
      </g>

      {/* Mountain / spring (centre-left) */}
      <g opacity="0.65">
        <polygon points="230,95 260,45 290,95" fill="#4A7C59" opacity="0.45"/>
        <polygon points="255,95 278,62 300,95" fill="#4A7C59" opacity="0.35"/>
        {/* Spring stream from mountain */}
        <path d="M260 84 Q265 92 270 98 Q280 106 300 108" fill="none" stroke="#028090" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <text x="265" y="105" textAnchor="middle" fontSize="9" fill="#00695C" fontFamily="sans-serif" opacity="0.7">Springs</text>
      </g>

      {/* Sea / ocean (right) */}
      <g opacity="0.65">
        <path d="M480 95 Q510 84 540 95 Q570 106 600 95 Q640 84 680 92" fill="none" stroke="#1565C0" strokeWidth="2.5"/>
        <path d="M490 105 Q520 94 550 105 Q580 116 610 105 Q650 94 680 100" fill="none" stroke="#1565C0" strokeWidth="1.8" opacity="0.6"/>
        <text x="580" y="122" textAnchor="middle" fontSize="10" fill="#1565C0" fontFamily="sans-serif" opacity="0.8">Sea / Ocean</text>
      </g>

      {/* State banner arc */}
      <path d="M60 22 Q340 6 620 22" fill="none" stroke="#00695C" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>

      {/* Label tags */}
      <g fontSize="10" fontFamily="sans-serif" fill="#00695C" opacity="0.72">
        <text x="340" y="158" textAnchor="middle" fontSize="9">Groundwater</text>
        <text x="340" y="122" textAnchor="middle" fontSize="9">Surface Water / Rivers / Lakes</text>
        <text x="340" y="15" textAnchor="middle" fontSize="10" opacity="0.5">Atmospheric</text>
      </g>
    </svg>
  );
}

// ── Slide 28 — Earth's Water Distribution ────────────────────────────────────
function IllustrationEarthWater() {
  return (
    <svg width="100%" viewBox="0 0 680 185" role="img" aria-label="Earth water distribution illustration">
      <title>Earth's water distribution</title>
      <desc>Visual showing the vast majority of Earth's water is salt water, with only a tiny fraction accessible as fresh drinking water</desc>
      <defs>
        <linearGradient id="sl28-ocean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0288D1" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0288D1" stopOpacity="0.08"/>
        </linearGradient>
      </defs>

      {/* Large ocean mass (97.2%) */}
      <ellipse cx="200" cy="105" rx="155" ry="82" fill="#0288D1" opacity="0.22"/>
      <ellipse cx="200" cy="105" rx="155" ry="82" fill="none" stroke="#0288D1" strokeWidth="1.5" opacity="0.55"/>
      <text x="200" y="96" textAnchor="middle" fontSize="22" fontFamily="sans-serif" fontWeight="bold" fill="#0288D1" opacity="0.75">97.2%</text>
      <text x="200" y="113" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#0288D1" opacity="0.6">Salt Water</text>
      <text x="200" y="127" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#0288D1" opacity="0.45">(Oceans, Seas)</text>

      {/* Bracket: all fresh water (2.8%) */}
      <rect x="410" y="18" width="240" height="154" rx="8" fill="#1565C0" opacity="0.06" stroke="#1565C0" strokeWidth="1" opacity="0.35"/>
      <text x="530" y="35" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="bold" fill="#1565C0" opacity="0.7">2.8% Fresh Water</text>

      {/* Glaciers (2.2%) */}
      <rect x="420" y="48" width="95" height="52" rx="6" fill="#42A5F5" opacity="0.28"/>
      <rect x="420" y="48" width="95" height="52" rx="6" fill="none" stroke="#42A5F5" strokeWidth="1" opacity="0.6"/>
      {/* Iceberg shape */}
      <polygon points="440,88 457,55 475,88" fill="#90CAF9" opacity="0.55"/>
      <polygon points="450,88 462,68 474,88" fill="#BBDEFB" opacity="0.45"/>
      <text x="468" y="110" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#1565C0" opacity="0.7">Glaciers 2.2%</text>

      {/* Groundwater (0.6%) */}
      <rect x="530" y="48" width="108" height="52" rx="6" fill="#1565C0" opacity="0.15"/>
      <rect x="530" y="48" width="108" height="52" rx="6" fill="none" stroke="#1565C0" strokeWidth="1" opacity="0.5"/>
      {/* Groundwater dots */}
      {[545,560,575,590,605,620,545,560,575,590].map((x,i) => (
        <circle key={i} cx={x} cy={60 + (i%2)*12} r="3" fill="#1565C0" opacity="0.4"/>
      ))}
      <text x="584" y="110" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#1565C0" opacity="0.7">Groundwater 0.6%</text>

      {/* Accessible freshwater — tiny highlight */}
      <rect x="468" y="124" width="160" height="36" rx="6" fill="#00695C" opacity="0.18"/>
      <rect x="468" y="124" width="160" height="36" rx="6" fill="none" stroke="#00695C" strokeWidth="1.5" opacity="0.7"/>
      <text x="548" y="138" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#00695C" opacity="0.85">Lakes &amp; Streams</text>
      <text x="548" y="151" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#00695C" opacity="0.75">only 0.01%</text>

      {/* Arrow from freshwater to drinking */}
      <line x1="380" y1="140" x2="465" y2="140" stroke="#00695C" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" markerEnd="url(#arr)"/>
      <ArrowDef/>
      <text x="370" y="136" textAnchor="end" fontSize="9" fontFamily="sans-serif" fill="#00695C" opacity="0.65">Drinking</text>
      <text x="370" y="147" textAnchor="end" fontSize="9" fontFamily="sans-serif" fill="#00695C" opacity="0.65">Water</text>
    </svg>
  );
}

// ── Slide 44 — Regalian Doctrine ─────────────────────────────────────────────
function IllustrationRegalian() {
  return (
    <svg width="100%" viewBox="0 0 680 160" role="img" aria-label="Regalian Doctrine illustration">
      <title>Regalian Doctrine — State ownership of natural resources</title>
      <desc>Philippine constitutional provision: all natural resources including water belong to the State</desc>

      {/* Philippine map silhouette (simplified) */}
      <g opacity="0.15" fill="#00695C">
        <ellipse cx="340" cy="80" rx="28" ry="55"/>
        <ellipse cx="360" cy="60" rx="16" ry="30"/>
        <ellipse cx="325" cy="100" rx="12" ry="20"/>
        <ellipse cx="355" cy="110" rx="10" ry="18"/>
      </g>

      {/* Constitution scroll */}
      <rect x="80" y="30" width="180" height="110" rx="6" fill="none" stroke="#00695C" strokeWidth="1.5" opacity="0.5"/>
      <rect x="88" y="30" width="6" height="110" rx="3" fill="#00695C" opacity="0.2"/>
      <rect x="266" y="30" width="6" height="110" rx="3" fill="#00695C" opacity="0.2"/>
      {/* Scroll text lines */}
      {[50,62,74,86,98,110,122].map((y,i) => (
        <line key={i} x1="102" y1={y} x2={i===0 ? 248 : i===3 ? 220 : 240} y2={y}
              stroke="#00695C" strokeWidth={i===0?1.5:1} strokeLinecap="round" opacity={i===0?0.6:0.3}/>
      ))}
      <text x="170" y="148" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#00695C" opacity="0.55">1987 Constitution</text>
      <text x="170" y="158" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#00695C" opacity="0.45">Art. XII, Sec. 2</text>

      {/* Crown / state symbol */}
      <g fill="#00695C" opacity="0.65" transform="translate(340,28)">
        <polygon points="-24,18 -12,0 0,10 12,0 24,18 20,22 -20,22"/>
        <rect x="-22" y="22" width="44" height="6" rx="2"/>
      </g>

      {/* Resources radiating from crown */}
      {[
        {x:430,y:45,label:"Minerals"},
        {x:488,y:80,label:"Forests"},
        {x:460,y:122,label:"Water"},
        {x:230,y:45,label:"Land"},
        {x:172,y:80,label:"Energy"},
        {x:200,y:122,label:"Marine"},
      ].map(({x,y,label},i) => (
        <g key={i} opacity="0.55">
          <circle cx={x} cy={y} r="18" fill="#00695C" opacity="0.1" stroke="#00695C" strokeWidth="1"/>
          <text x={x} y={y+4} textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#00695C" fontWeight="bold">{label}</text>
          <line x1={340 + (x<340?-1:1)*24} y1={label==="Minerals"||label==="Land"?50:label==="Forests"||label==="Energy"?50:50}
                x2={x<340?x+18:x-18} y2={y}
                stroke="#00695C" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 45 — Water Right & Water Permit ────────────────────────────────────
function IllustrationWaterPermit() {
  return (
    <svg width="100%" viewBox="0 0 680 165" role="img" aria-label="Water right and water permit illustration">
      <title>Water right vs water permit</title>
      <desc>A water right is the privilege; the water permit is the document that proves it</desc>
      <ArrowDef/>

      {/* Water source on left */}
      <g opacity="0.65">
        <path d="M50 105 Q100 88 150 105 Q200 122 250 105" fill="none" stroke="#1565C0" strokeWidth="2.5"/>
        <path d="M50 115 Q100 98 150 115 Q200 132 250 115" fill="none" stroke="#1565C0" strokeWidth="1.8" opacity="0.6"/>
        <text x="150" y="135" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#1565C0" opacity="0.65">Water Source</text>
        {/* Water drop */}
        <ellipse cx="150" cy="72" rx="14" ry="18" fill="#1565C0" opacity="0.25"/>
        <path d="M150 54 Q150 48 155 52 Q162 57 150 54Z" fill="#1565C0" opacity="0.35"/>
      </g>

      {/* Arrow: source -> right */}
      <line x1="255" y1="100" x2="295" y2="100" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" markerEnd="url(#arr)"/>

      {/* Water Right badge */}
      <rect x="298" y="70" width="84" height="60" rx="8" fill="#2E7D32" opacity="0.12" stroke="#2E7D32" strokeWidth="1.5" opacity="0.6"/>
      <text x="340" y="94" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#2E7D32" opacity="0.75">WATER</text>
      <text x="340" y="107" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="#2E7D32" opacity="0.75">RIGHT</text>
      <text x="340" y="120" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#2E7D32" opacity="0.55">Privilege</text>

      {/* Arrow: right -> permit */}
      <line x1="385" y1="100" x2="425" y2="100" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" markerEnd="url(#arr)"/>
      <text x="405" y="93" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#2E7D32" opacity="0.55">evidenced by</text>

      {/* Water Permit document */}
      <g opacity="0.72">
        <rect x="428" y="50" width="100" height="130" rx="5" fill="none" stroke="#2E7D32" strokeWidth="1.5" opacity="0.7"/>
        <rect x="436" y="50" width="8" height="130" rx="4" fill="#2E7D32" opacity="0.15"/>
        {/* Seal */}
        <circle cx="492" cy="85" r="18" fill="none" stroke="#2E7D32" strokeWidth="1" opacity="0.5"/>
        <circle cx="492" cy="85" r="12" fill="#2E7D32" opacity="0.12"/>
        <text x="492" y="89" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#2E7D32" opacity="0.7">NWRB</text>
        {/* Lines */}
        {[112,122,132,142,152,162].map((y,i) => (
          <line key={i} x1="448" y1={y} x2={i>3?510:522} y2={y} stroke="#2E7D32" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
        ))}
        <text x="478" y="174" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#2E7D32" opacity="0.6">Water Permit</text>
        <text x="478" y="184" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#2E7D32" opacity="0.45">the document</text>
      </g>

      {/* User receiving permit */}
      <g opacity="0.5" transform="translate(590, 75)">
        {/* Person silhouette */}
        <circle cx="20" cy="16" r="12" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
        <path d="M8 42 Q12 28 20 26 Q28 28 32 42" fill="none" stroke="#2E7D32" strokeWidth="1.5"/>
        <line x1="4" y1="50" x2="20" y2="56" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="50" x2="20" y2="56" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="20" y="72" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#2E7D32">Grantee</text>
      </g>
      <line x1="530" y1="100" x2="580" y2="100" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" markerEnd="url(#arr)"/>
    </svg>
  );
}

// ── Slide 94 — IWRM Definition ────────────────────────────────────────────────
function IllustrationIWRM() {
  return (
    <svg width="100%" viewBox="0 0 680 175" role="img" aria-label="IWRM integrated water resources management">
      <title>Integrated Water Resources Management</title>
      <desc>Three pillars of IWRM: water, land, and related resources managed together for economic, social and environmental welfare</desc>
      <ArrowDef/>

      {/* Central IWRM circle */}
      <circle cx="340" cy="88" r="52" fill="#4A148C" opacity="0.1" stroke="#4A148C" strokeWidth="1.5" opacity="0.5"/>
      <text x="340" y="83" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fontWeight="bold" fill="#4A148C" opacity="0.8">IWRM</text>
      <text x="340" y="97" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#4A148C" opacity="0.6">Coordinated</text>
      <text x="340" y="109" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#4A148C" opacity="0.6">Management</text>

      {/* Spoke 1: Water */}
      <line x1="288" y1="88" x2="178" y2="88" stroke="#0288D1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      <circle cx="150" cy="88" r="26" fill="#0288D1" opacity="0.15" stroke="#0288D1" strokeWidth="1" opacity="0.6"/>
      <ellipse cx="150" cy="93" rx="11" ry="14" fill="#0288D1" opacity="0.45"/>
      <path d="M150 79 Q150 74 154 77 Q159 81 150 79Z" fill="#0288D1" opacity="0.5"/>
      <text x="150" y="124" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#0288D1" opacity="0.75">Water</text>

      {/* Spoke 2: Land */}
      <line x1="392" y1="88" x2="502" y2="88" stroke="#2E7D32" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      <circle cx="530" cy="88" r="26" fill="#2E7D32" opacity="0.12" stroke="#2E7D32" strokeWidth="1" opacity="0.55"/>
      <polygon points="530,65 550,95 510,95" fill="#2E7D32" opacity="0.45"/>
      <text x="530" y="124" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2E7D32" opacity="0.75">Land</text>

      {/* Spoke 3: Related Resources (top) */}
      <line x1="340" y1="36" x2="340" y2="16" stroke="#E65100" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
      {/* Sun */}
      <circle cx="340" cy="14" r="12" fill="none" stroke="#E65100" strokeWidth="1.2" opacity="0.55"/>
      <circle cx="340" cy="14" r="6" fill="#E65100" opacity="0.3"/>
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const r=Math.PI*deg/180, x=340+Math.cos(r)*15, y=14+Math.sin(r)*15;
        const x2=340+Math.cos(r)*19, y2=14+Math.sin(r)*19;
        return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="#E65100" strokeWidth="1" opacity="0.4"/>;
      })}
      <text x="340" y="-1" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#E65100" opacity="0.65">Related</text>

      {/* Outcome boxes at bottom */}
      {[
        {x:120,label:"Economic",color:"#E65100"},
        {x:280,label:"Social",color:"#4A148C"},
        {x:440,label:"Environmental",color:"#2E7D32"},
      ].map(({x,label,color}) => (
        <g key={label}>
          <rect x={x} y="148" width={label==="Environmental"?110:80} height="22" rx="5"
                fill={color} opacity="0.12" stroke={color} strokeWidth="1" opacity="0.5"/>
          <text x={x+(label==="Environmental"?55:40)} y="163" textAnchor="middle"
                fontSize="10" fontFamily="sans-serif" fill={color} opacity="0.75">{label}</text>
        </g>
      ))}
      <text x="340" y="142" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#4A148C" opacity="0.45">outcomes</text>
    </svg>
  );
}

// ── Slides 125 / 126 — SDG Goal 6 ─────────────────────────────────────────────
function IllustrationSDG6() {
  return (
    <svg width="100%" viewBox="0 0 680 185" role="img" aria-label="SDG Goal 6 clean water and sanitation">
      <title>SDG Goal 6 — Ensure clean water and sanitation for all by 2030</title>
      <desc>Faucet flowing clean water into hands, SDG wheel segment, and ripple rings representing universal access</desc>
      <defs>
        <linearGradient id="sdg-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0288D1" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.3"/>
        </linearGradient>
      </defs>

      {/* SDG "6" badge on left */}
      <circle cx="110" cy="92" r="58" fill="#0288D1" opacity="0.15" stroke="#0288D1" strokeWidth="2" opacity="0.5"/>
      <circle cx="110" cy="92" r="44" fill="none" stroke="#0288D1" strokeWidth="6" strokeDasharray="27.6 248.4" strokeDashoffset="0" opacity="0.75"/>
      <text x="110" y="100" textAnchor="middle" fontSize="38" fontFamily="sans-serif" fontWeight="bold" fill="#0288D1" opacity="0.8">6</text>
      <text x="110" y="163" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#0288D1" opacity="0.55">Clean Water &amp; Sanitation</text>

      {/* Faucet (centre) */}
      <rect x="318" y="14" width="64" height="12" rx="5" fill="#0288D1" opacity="0.7"/>
      <rect x="332" y="26" width="36" height="34" rx="5" fill="#0288D1" opacity="0.7"/>
      {/* Handle */}
      <rect x="370" y="22" width="22" height="8" rx="3" fill="#0288D1" opacity="0.55"/>

      {/* Water flow */}
      <path d="M336 60 Q336 90 332 115 Q328 135 332 148 Q340 158 348 148 Q352 135 348 115 Q344 90 344 60 Z"
            fill="url(#sdg-flow)"/>

      {/* Hands receiving water */}
      <path d="M290 158 Q310 142 340 144 Q370 142 390 158 Q376 178 340 175 Q304 178 290 158 Z"
            fill="#E65100" opacity="0.18" stroke="#E65100" strokeWidth="1" opacity="0.4"/>
      <path d="M298 154 Q340 140 382 154" fill="none" stroke="#E65100" strokeWidth="1.8" opacity="0.5"/>

      {/* Ripple rings */}
      <g fill="none" stroke="#0288D1" strokeWidth="1" opacity="0.2">
        <ellipse cx="340" cy="162" rx="55" ry="14"/>
        <ellipse cx="340" cy="162" rx="75" ry="20"/>
        <ellipse cx="340" cy="162" rx="98" ry="27"/>
      </g>

      {/* Floating droplets right */}
      <g fill="#0288D1">
        <ellipse cx="490" cy="60" rx="10" ry="13" opacity="0.45"/>
        <path d="M490 47 Q490 43 493.5 45 Q497 47 490 47Z" fill="#0288D1" opacity="0.5"/>
        <ellipse cx="534" cy="100" rx="7.5" ry="10" opacity="0.38"/>
        <path d="M534 90 Q534 87 537 88.5 Q540 90 534 90Z" fill="#0288D1" opacity="0.42"/>
        <ellipse cx="508" cy="144" rx="6" ry="8" opacity="0.32"/>
        <path d="M508 136 Q508 133 510.5 134.5 Q513 136 508 136Z" fill="#0288D1" opacity="0.36"/>
      </g>

      {/* "by 2030" label */}
      <rect x="566" y="148" width="70" height="24" rx="6" fill="#0288D1" opacity="0.12" stroke="#0288D1" strokeWidth="1" opacity="0.4"/>
      <text x="601" y="164" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#0288D1" opacity="0.7">by 2030</text>
    </svg>
  );
}

// ── Slide 161 — Closing: Thank You ───────────────────────────────────────────
function IllustrationClosing() {
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" aria-label="Closing slide illustration">
      <title>Thank you — sustainable water for a healthy nation</title>
      <desc>Sunrise over ocean waves with DENR leaf motif and rippling water</desc>
      <defs>
        <radialGradient id="sl161-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#065A82" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#065A82" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="sl161-wave1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#065A82" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#065A82" stopOpacity="0.45"/>
        </linearGradient>
      </defs>

      {/* Sky radial glow */}
      <ellipse cx="340" cy="95" rx="200" ry="100" fill="url(#sl161-sun)"/>

      {/* Sun */}
      <circle cx="340" cy="95" r="32" fill="none" stroke="#065A82" strokeWidth="1.5" opacity="0.25"/>
      <circle cx="340" cy="95" r="22" fill="#065A82" opacity="0.18"/>
      <circle cx="340" cy="95" r="13" fill="#065A82" opacity="0.35"/>

      {/* Sun rays */}
      <g stroke="#065A82" strokeWidth="1.5" strokeLinecap="round" opacity="0.28">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
          const r=Math.PI*deg/180;
          return <line key={i} x1={340+Math.cos(r)*36} y1={95+Math.sin(r)*36}
                       x2={340+Math.cos(r)*46} y2={95+Math.sin(r)*46}/>;
        })}
      </g>

      {/* DENR leaf in sun */}
      <path d="M340 83 Q358 74 368 90 Q358 104 340 108 Q330 103 332 88 Q336 76 340 83 Z"
            fill="#1B9A6B" opacity="0.6"/>
      <line x1="340" y1="83" x2="340" y2="108" stroke="#1B9A6B" strokeWidth="1" opacity="0.4" fill="none"/>

      {/* Wave layers */}
      <path d="M0 150 Q85 136 170 150 Q255 165 340 150 Q425 136 510 150 Q595 165 680 150 L680 210 L0 210 Z"
            fill="url(#sl161-wave1)"/>
      <path d="M0 162 Q90 150 185 162 Q280 176 370 162 Q460 150 560 162 Q630 168 680 163 L680 210 L0 210 Z"
            fill="#065A82" opacity="0.28"/>
      <path d="M0 174 Q100 163 210 174 Q320 187 430 174 Q540 163 640 174 L680 178 L680 210 L0 210 Z"
            fill="#065A82" opacity="0.40"/>

      {/* Wave surface detail */}
      <path d="M0 148 Q85 137 170 148 Q255 160 340 148 Q425 137 510 148 Q595 160 680 148"
            fill="none" stroke="#4ACBF0" strokeWidth="1.2" opacity="0.35"/>

      {/* Floating droplets */}
      <g fill="#4ACBF0" opacity="0.42">
        <ellipse cx="115" cy="122" rx="7" ry="9"/>
        <path d="M115 113 Q115 110 118 111.5 Q121 113 115 113Z"/>
        <ellipse cx="205" cy="108" rx="5" ry="7"/>
        <path d="M205 101 Q205 99 207.5 100 Q210 101 205 101Z"/>
        <ellipse cx="470" cy="118" rx="7" ry="9"/>
        <path d="M470 109 Q470 106 473 107.5 Q476 109 470 109Z"/>
        <ellipse cx="568" cy="105" rx="5" ry="6.5"/>
        <path d="M568 98.5 Q568 96.5 570.5 97.5 Q573 98.5 568 98.5Z"/>
      </g>

      {/* Horizon reflection shimmer */}
      <line x1="60" y1="147" x2="180" y2="147" stroke="#4ACBF0" strokeWidth="0.8" opacity="0.3"/>
      <line x1="280" y1="147" x2="400" y2="147" stroke="#4ACBF0" strokeWidth="0.8" opacity="0.3"/>
      <line x1="500" y1="147" x2="620" y2="147" stroke="#4ACBF0" strokeWidth="0.8" opacity="0.3"/>

      {/* Tagline */}
      <text x="340" y="200" textAnchor="middle" fontSize="11" fontFamily="sans-serif" fill="#065A82" opacity="0.55"
            letterSpacing="1">Sustainable Water for a Healthy Nation</text>
    </svg>
  );
}

// ── Slide 160 — Shared Responsibility ────────────────────────────────────────
function IllustrationSharedResponsibility() {
  return (
    <svg width="100%" viewBox="0 0 680 175" role="img" aria-label="Water management shared responsibility">
      <title>Water management is a shared responsibility</title>
      <desc>People from different sectors connected around a central water droplet, representing collective stewardship</desc>
      <ArrowDef/>

      {/* Central water drop */}
      <ellipse cx="340" cy="100" rx="30" ry="38" fill="#065A82" opacity="0.22"/>
      <path d="M340 62 Q340 52 346 57 Q356 64 340 62Z" fill="#065A82" opacity="0.3"/>
      <circle cx="330" cy="90" r="8" fill="#fff" opacity="0.18"/>
      <text x="340" y="108" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#065A82" opacity="0.7">Water</text>

      {/* Connecting arc */}
      <circle cx="340" cy="95" r="80" fill="none" stroke="#065A82" strokeWidth="1" strokeDasharray="5 4" opacity="0.25"/>

      {/* Sector nodes around the arc */}
      {[
        {angle:-90, label:"Government", color:"#065A82"},
        {angle:-26, label:"Industry",   color:"#1565C0"},
        {angle:38,  label:"LGUs",       color:"#00695C"},
        {angle:102, label:"Community",  color:"#2E7D32"},
        {angle:166, label:"NWRB",       color:"#028090"},
        {angle:230, label:"DENR",       color:"#1B9A6B"},
      ].map(({angle,label,color}) => {
        const r=Math.PI*angle/180;
        const cx=340+Math.cos(r)*80, cy=95+Math.sin(r)*80;
        return (
          <g key={label}>
            <line x1={340+Math.cos(r)*36} y1={95+Math.sin(r)*38}
                  x2={cx-Math.cos(r)*20} y2={cy-Math.sin(r)*20}
                  stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4"/>
            <circle cx={cx} cy={cy} r="20" fill={color} opacity="0.12" stroke={color} strokeWidth="1" opacity="0.6"/>
            <text x={cx} y={cy+4} textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill={color} opacity="0.8">{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 134 — Did You Know (Trivia intro) ───────────────────────────────────
function IllustrationTrivia() {
  return (
    <svg width="100%" viewBox="0 0 680 155" role="img" aria-label="Water trivia — survival facts">
      <title>Survival without water vs food</title>
      <desc>Comparison showing 3 days without water vs 21 days without food</desc>

      {/* Water side */}
      <rect x="40" y="28" width="260" height="110" rx="10" fill="#0288D1" opacity="0.1" stroke="#0288D1" strokeWidth="1.5" opacity="0.5"/>
      {/* Droplet */}
      <ellipse cx="100" cy="75" rx="22" ry="28" fill="#0288D1" opacity="0.35"/>
      <path d="M100 47 Q100 39 106 43 Q115 49 100 47Z" fill="#0288D1" opacity="0.4"/>
      <ellipse cx="93" cy="68" rx="6" ry="8" fill="#fff" opacity="0.22"/>
      <text x="160" y="68" textAnchor="middle" fontSize="28" fontFamily="sans-serif" fontWeight="bold" fill="#0288D1" opacity="0.75">3</text>
      <text x="160" y="88" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#0288D1" opacity="0.65">days</text>
      <text x="160" y="108" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#0288D1" opacity="0.5">without Water</text>

      {/* vs label */}
      <text x="340" y="95" textAnchor="middle" fontSize="16" fontFamily="sans-serif" fontWeight="bold" fill="#6A1B9A" opacity="0.55">vs</text>

      {/* Food side */}
      <rect x="380" y="28" width="260" height="110" rx="10" fill="#2E7D32" opacity="0.08" stroke="#2E7D32" strokeWidth="1.5" opacity="0.4"/>
      {/* Food icon (bowl) */}
      <ellipse cx="440" cy="90" rx="20" ry="8" fill="#2E7D32" opacity="0.3"/>
      <path d="M420 88 Q430 70 440 68 Q450 70 460 88" fill="none" stroke="#2E7D32" strokeWidth="2" opacity="0.45"/>
      <line x1="440" y1="62" x2="440" y2="52" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <line x1="432" y1="62" x2="428" y2="52" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      <line x1="448" y1="62" x2="452" y2="52" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      <text x="530" y="68" textAnchor="middle" fontSize="28" fontFamily="sans-serif" fontWeight="bold" fill="#2E7D32" opacity="0.7">21</text>
      <text x="530" y="88" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fill="#2E7D32" opacity="0.6">days</text>
      <text x="530" y="108" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#2E7D32" opacity="0.45">without Food</text>

      {/* Bottom note */}
      <text x="340" y="152" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fill="#6A1B9A" opacity="0.5">Water is far more critical to human survival than food</text>
    </svg>
  );
}

// ── Slide 80 — Certificate of Public Convenience ─────────────────────────────
function IllustrationCPC() {
  return (
    <svg width="100%" viewBox="0 0 680 155" role="img" aria-label="Certificate of Public Convenience illustration">
      <title>Certificate of Public Convenience (CPC)</title>
      <desc>A formal NWRB certificate authorising private water utilities to operate and charge rates</desc>

      {/* Certificate parchment */}
      <rect x="150" y="10" width="380" height="138" rx="8" fill="none" stroke="#558B2F" strokeWidth="1.5" opacity="0.55"/>
      <rect x="158" y="10" width="10" height="138" rx="5" fill="#558B2F" opacity="0.15"/>
      <rect x="512" y="10" width="10" height="138" rx="5" fill="#558B2F" opacity="0.15"/>

      {/* Decorative corner ornaments */}
      {[[160,18],[520,18],[160,140],[520,140]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.4"/>
      ))}

      {/* Header band */}
      <rect x="158" y="18" width="364" height="28" rx="3" fill="#558B2F" opacity="0.12"/>
      <text x="340" y="37" textAnchor="middle" fontSize="13" fontFamily="sans-serif" fontWeight="bold" fill="#558B2F" opacity="0.75">CERTIFICATE OF PUBLIC CONVENIENCE</text>

      {/* Seal */}
      <circle cx="258" cy="90" r="30" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>
      <circle cx="258" cy="90" r="22" fill="#558B2F" opacity="0.08"/>
      {Array.from({length:12},(_,i)=>{
        const a=(i/12)*Math.PI*2;
        return <line key={i} x1={258+Math.cos(a)*22} y1={90+Math.sin(a)*22}
                     x2={258+Math.cos(a)*28} y2={90+Math.sin(a)*28}
                     stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>;
      })}
      <text x="258" y="87" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="#558B2F" opacity="0.7">NWRB</text>
      <text x="258" y="97" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fill="#558B2F" opacity="0.55">Official Seal</text>

      {/* Certificate lines */}
      {[60,72,84,96,108,120].map((y,i) => (
        <line key={i} x1="300" y1={y} x2={i>3?480:490} y2={y}
              stroke="#558B2F" strokeWidth={i===0?1.2:0.9} strokeLinecap="round" opacity={i===0?0.45:0.25}/>
      ))}

      {/* Validity badge */}
      <rect x="440" y="118" width="78" height="22" rx="5" fill="#558B2F" opacity="0.18" stroke="#558B2F" strokeWidth="1" opacity="0.5"/>
      <text x="479" y="133" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#558B2F" opacity="0.7">Valid: 5 years</text>

      {/* Surrounding utility icons */}
      {/* Pipe on left */}
      <g opacity="0.45">
        <rect x="55" y="70" width="85" height="16" rx="8" fill="none" stroke="#558B2F" strokeWidth="1.5"/>
        <circle cx="75" cy="78" r="5" fill="none" stroke="#558B2F" strokeWidth="1"/>
        <circle cx="120" cy="78" r="5" fill="none" stroke="#558B2F" strokeWidth="1"/>
        <text x="97" y="105" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#558B2F">Waterworks</text>
      </g>
      {/* Meter on right */}
      <g opacity="0.45">
        <rect x="540" y="62" width="70" height="32" rx="5" fill="none" stroke="#558B2F" strokeWidth="1.5"/>
        <semicircle/>
        <path d="M548 82 Q575 70 602 82" fill="none" stroke="#558B2F" strokeWidth="1.5"/>
        <line x1="575" y1="82" x2="575" y2="72" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="575" y="110" textAnchor="middle" fontSize="9" fontFamily="sans-serif" fill="#558B2F">Water Meter</text>
      </g>
    </svg>
  );
}

// ── Export map ────────────────────────────────────────────────────────────────
// Keys are slide IDs. Add more as needed.
export const SLIDE_ILLUSTRATIONS = {
  1:   IllustrationCover,
  4:   IllustrationNWRB,
  5:   IllustrationNWRB,
  11:  IllustrationNWRB,
  28:  IllustrationEarthWater,
  34:  IllustrationWaterOwnership,
  35:  IllustrationWaterOwnership,
  36:  IllustrationWaterOwnership,
  37:  IllustrationWaterOwnership,
  44:  IllustrationRegalian,
  45:  IllustrationWaterPermit,
  80:  IllustrationCPC,
  85:  IllustrationCPC,
  94:  IllustrationIWRM,
  125: IllustrationSDG6,
  126: IllustrationSDG6,
  134: IllustrationTrivia,
  135: IllustrationTrivia,
  160: IllustrationSharedResponsibility,
  161: IllustrationClosing,
};
