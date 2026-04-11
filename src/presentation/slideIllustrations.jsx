// ── slideIllustrations.jsx  (v2 — text contrast fixed) ──────────────────────
// KEY FIX: Every <text> label now has:
//   1. A white semi-transparent <rect> "backing" behind it (LabelBg helper)
//   2. A fully-opaque dark fill — never opacity < 1 on text
// This ensures labels are readable on ANY slide theme (dark, sepia, pink, mint)
// ─────────────────────────────────────────────────────────────────────────────

// White pill backing behind text — guarantees contrast on any bg
const LabelBg = ({ x, y, w = 70, h = 18, rx = 4 }) => (
  <rect x={x - w / 2} y={y - 13} width={w} height={h} rx={rx}
        fill="rgba(255,255,255,0.82)" />
);

// Opaque dark text colors per hue — readable on white backing
const T_DARK   = "#0a1628";
const T_BLUE   = "#0d47a1";
const T_GREEN  = "#1b5e20";
const T_TEAL   = "#004d40";
const T_PURPLE = "#311b92";
const T_ORANGE = "#bf360c";
const T_RED    = "#b71c1c";

// ── Slide 1 — Cover ───────────────────────────────────────────────────────────
export function IllustrationCover() {
  return (
    <svg width="100%" viewBox="0 0 680 230" role="img">
      <title>Water globe — cover illustration</title>
      <desc>Stylised Earth globe with continents, droplets and ripple rings</desc>
      <defs>
        <clipPath id="sl1-gc"><circle cx="340" cy="115" r="90"/></clipPath>
      </defs>
      <circle cx="340" cy="115" r="108" fill="none" stroke="#1565C0" strokeWidth="1" opacity="0.18"/>
      <circle cx="340" cy="115" r="90" fill="#1565C0" opacity="0.20"/>
      <g clipPath="url(#sl1-gc)">
        <ellipse cx="308" cy="82"  rx="40" ry="30" fill="#2E7D32" opacity="0.70"/>
        <ellipse cx="276" cy="108" rx="20" ry="25" fill="#2E7D32" opacity="0.65"/>
        <ellipse cx="378" cy="96"  rx="26" ry="20" fill="#2E7D32" opacity="0.60"/>
        <ellipse cx="360" cy="148" rx="22" ry="14" fill="#2E7D32" opacity="0.55"/>
        <ellipse cx="315" cy="148" rx="12" ry="8"  fill="#2E7D32" opacity="0.45"/>
        <rect x="250" y="152" width="180" height="5" rx="2" fill="#4FC3F7" opacity="0.30"/>
      </g>
      <g clipPath="url(#sl1-gc)" opacity="0.14">
        <ellipse cx="340" cy="115" rx="90" ry="32" fill="none" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="340" cy="78"  rx="76" ry="20" fill="none" stroke="#fff" strokeWidth="1"/>
        <ellipse cx="340" cy="150" rx="76" ry="20" fill="none" stroke="#fff" strokeWidth="1"/>
        <line x1="340" y1="25" x2="340" y2="205" stroke="#fff" strokeWidth="1"/>
        <line x1="250" y1="115" x2="430" y2="115" stroke="#fff" strokeWidth="1"/>
      </g>
      <circle cx="340" cy="115" r="90" fill="none" stroke="#1565C0" strokeWidth="2" opacity="0.60"/>
      <ellipse cx="196" cy="73"  rx="8" ry="11" fill="#1565C0" opacity="0.65"/>
      <path d="M196 62 Q196 56 200 59 Q205 62 196 62Z" fill="#1565C0" opacity="0.70"/>
      <ellipse cx="492" cy="82"  rx="8" ry="11" fill="#1565C0" opacity="0.65"/>
      <path d="M492 71 Q492 65 496 68 Q501 71 492 71Z" fill="#1565C0" opacity="0.70"/>
      <ellipse cx="155" cy="138" rx="6" ry="8"  fill="#1565C0" opacity="0.55"/>
      <ellipse cx="524" cy="148" rx="6" ry="8"  fill="#1565C0" opacity="0.55"/>
      <LabelBg x={340} y={216} w={244} h={20} rx={4}/>
      <text x="340" y="215" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>
        DENR – NCR · Water Resources Utilization Section
      </text>
    </svg>
  );
}

// ── Slides 4 / 5 / 11 — NWRB seal ────────────────────────────────────────────
export function IllustrationNWRB() {
  return (
    <svg width="100%" viewBox="0 0 680 195" role="img">
      <title>NWRB — National Water Resources Board</title>
      <desc>Government seal with water drop, gear teeth and three-pillar icons</desc>
      <path d="M0 128 Q85 113 170 128 Q255 143 340 128 Q425 113 510 128 Q595 143 680 128 L680 195 L0 195 Z"
            fill="#028090" opacity="0.12"/>
      <path d="M0 148 Q100 136 210 148 Q320 162 430 148 Q540 136 640 148 L680 152 L680 195 L0 195 Z"
            fill="#028090" opacity="0.24"/>
      <circle cx="340" cy="82" r="62" fill="none" stroke="#028090" strokeWidth="1.5" opacity="0.45"/>
      <circle cx="340" cy="82" r="52" fill="#028090" opacity="0.08"/>
      {Array.from({length:16},(_,i)=>{
        const a=(i/16)*Math.PI*2;
        return <line key={i} x1={340+Math.cos(a)*55} y1={82+Math.sin(a)*55}
                     x2={340+Math.cos(a)*63} y2={82+Math.sin(a)*63}
                     stroke="#028090" strokeWidth="3" strokeLinecap="round" opacity="0.40"/>;
      })}
      <ellipse cx="340" cy="91" rx="16" ry="20" fill="#028090" opacity="0.70"/>
      <path d="M340 71 Q340 63 346 67 Q353 72 340 71Z" fill="#028090" opacity="0.70"/>
      <ellipse cx="335" cy="85" rx="4" ry="5" fill="#fff" opacity="0.30"/>
      {/* Policy box */}
      <rect x="92" y="48" width="68" height="48" rx="4" fill="#028090" opacity="0.08"
            stroke="#028090" strokeWidth="1" />
      <line x1="104" y1="62" x2="148" y2="62" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.50"/>
      <line x1="104" y1="70" x2="148" y2="70" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.40"/>
      <line x1="104" y1="78" x2="138" y2="78" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      <LabelBg x={126} y={113} w={58} h={17} rx={3}/>
      <text x="126" y="112" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Policy</text>
      {/* Economic box */}
      <rect x="520" y="48" width="68" height="48" rx="4" fill="#028090" opacity="0.08"
            stroke="#028090" strokeWidth="1" />
      <text x="534" y="67" fontSize="14" fill="#028090" opacity="0.65" fontFamily="sans-serif">₱</text>
      <line x1="534" y1="76" x2="576" y2="76" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.50"/>
      <line x1="534" y1="84" x2="566" y2="84" stroke="#028090" strokeWidth="1.5" strokeLinecap="round" opacity="0.40"/>
      <LabelBg x={554} y={113} w={72} h={17} rx={3}/>
      <text x="554" y="112" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Economic</text>
      {/* Resource label */}
      <LabelBg x={340} y={163} w={72} h={17} rx={3}/>
      <text x="340" y="162" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Resource</text>
    </svg>
  );
}

// ── Slides 34–37 — Water ownership ───────────────────────────────────────────
export function IllustrationWaterOwnership() {
  return (
    <svg width="100%" viewBox="0 0 680 196" role="img">
      <title>All waters belong to the State</title>
      <desc>Cross-section: rivers, rain, sea, groundwater — all owned by the State</desc>
      <rect x="0" y="130" width="680" height="66" fill="#4A7C59" opacity="0.14"/>
      <path d="M0 130 Q170 120 340 130 Q510 140 680 130 L680 196 L0 196 Z" fill="#4A7C59" opacity="0.16"/>
      <ellipse cx="160" cy="165" rx="62" ry="14" fill="#028090" opacity="0.30"/>
      <ellipse cx="340" cy="172" rx="80" ry="12" fill="#028090" opacity="0.24"/>
      <ellipse cx="530" cy="163" rx="65" ry="14" fill="#028090" opacity="0.30"/>
      <path d="M0 112 Q85 100 170 112 Q255 124 340 112 Q425 100 510 112 Q595 124 680 112"
            fill="none" stroke="#1565C0" strokeWidth="2.5" opacity="0.55"/>
      <path d="M0 120 Q90 109 185 120 Q280 132 370 120 Q460 109 560 120 Q630 125 680 120"
            fill="none" stroke="#1565C0" strokeWidth="1.5" opacity="0.38"/>
      {/* Rain cloud */}
      <ellipse cx="108" cy="42" rx="26" ry="16" fill="#1565C0" opacity="0.35"/>
      <ellipse cx="86"  cy="50" rx="18" ry="13" fill="#1565C0" opacity="0.35"/>
      <ellipse cx="130" cy="50" rx="16" ry="11" fill="#1565C0" opacity="0.30"/>
      {[94,106,118,130].map((x,i)=>(
        <line key={i} x1={x} y1={60} x2={x-4} y2={76}
              stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      ))}
      <LabelBg x={108} y={101} w={56} h={17} rx={3}/>
      <text x="108" y="100" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Rainfall</text>
      {/* Mountain */}
      <polygon points="230,97 260,46 290,97" fill="#4A7C59" opacity="0.45"/>
      <polygon points="255,97 278,63 300,97" fill="#4A7C59" opacity="0.35"/>
      <path d="M260 85 Q265 93 270 99 Q280 107 300 109"
            fill="none" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
      <LabelBg x={268} y={81} w={56} h={17} rx={3}/>
      <text x="268" y="80" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Springs</text>
      {/* Sea */}
      <path d="M480 96 Q510 84 540 96 Q570 108 600 96 Q640 84 680 92"
            fill="none" stroke="#1565C0" strokeWidth="2.5" opacity="0.65"/>
      <path d="M490 106 Q520 94 550 106 Q580 118 610 106 Q650 95 680 101"
            fill="none" stroke="#1565C0" strokeWidth="1.8" opacity="0.50"/>
      <LabelBg x={575} y={125} w={78} h={17} rx={3}/>
      <text x="575" y="124" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Sea / Ocean</text>
      {/* Surface water */}
      <LabelBg x={340} y={137} w={228} h={16} rx={3}/>
      <text x="340" y="136" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_BLUE}>Surface water · rivers · lakes</text>
      {/* Groundwater */}
      <LabelBg x={340} y={174} w={108} h={16} rx={3}/>
      <text x="340" y="173" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Groundwater</text>
      {/* Atmospheric */}
      <LabelBg x={340} y={17} w={100} h={16} rx={3}/>
      <text x="340" y="16" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="500" fill={T_DARK}>Atmospheric</text>
    </svg>
  );
}

// ── Slide 28 — Earth's Water Distribution ────────────────────────────────────
export function IllustrationEarthWater() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Earth's water distribution</title>
      <desc>97.2% salt water; only 0.01% accessible freshwater</desc>
      <ellipse cx="192" cy="106" rx="155" ry="82" fill="#0288D1" opacity="0.20"/>
      <ellipse cx="192" cy="106" rx="155" ry="82" fill="none" stroke="#0288D1" strokeWidth="1.5" opacity="0.55"/>
      <LabelBg x={192} y={94} w={78} h={22} rx={4}/>
      <text x="192" y="93" textAnchor="middle" fontSize="22"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>97.2%</text>
      <LabelBg x={192} y={115} w={90} h={17} rx={3}/>
      <text x="192" y="114" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Salt Water</text>
      <LabelBg x={192} y={133} w={114} h={15} rx={3}/>
      <text x="192" y="132" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>(Oceans &amp; Seas)</text>
      {/* Fresh water bracket */}
      <rect x="408" y="14" width="246" height="162" rx="8"
            fill="#1565C0" opacity="0.06" stroke="#1565C0" strokeWidth="1"/>
      <LabelBg x={531} y={32} w={136} h={19} rx={4}/>
      <text x="531" y="31" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>2.8% Fresh Water</text>
      {/* Glaciers */}
      <rect x="418" y="46" width="98" height="54" rx="6" fill="#42A5F5" opacity="0.22" stroke="#42A5F5" strokeWidth="1"/>
      <polygon points="438,90 456,56 474,90" fill="#90CAF9" opacity="0.60"/>
      <polygon points="448,90 462,70 476,90" fill="#BBDEFB" opacity="0.50"/>
      <LabelBg x={468} y={113} w={100} h={16} rx={3}/>
      <text x="468" y="112" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Glaciers 2.2%</text>
      {/* Groundwater */}
      <rect x="528" y="46" width="110" height="54" rx="6" fill="#1565C0" opacity="0.14" stroke="#1565C0" strokeWidth="1"/>
      {[544,558,572,586,600,614,544,558,572,586].map((x,i)=>(
        <circle key={i} cx={x} cy={60+(i%2)*12} r="3" fill="#1565C0" opacity="0.45"/>
      ))}
      <LabelBg x={583} y={113} w={112} h={16} rx={3}/>
      <text x="583" y="112" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Groundwater 0.6%</text>
      {/* Tiny highlight */}
      <rect x="420" y="128" width="224" height="38" rx="6" fill="#E8F5E9" stroke="#1B5E20" strokeWidth="1.5"/>
      <LabelBg x={532} y={145} w={168} h={17} rx={3}/>
      <text x="532" y="144" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Lakes &amp; Streams</text>
      <LabelBg x={532} y={162} w={80} h={16} rx={3}/>
      <text x="532" y="161" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>only 0.01%</text>
    </svg>
  );
}

// ── Slide 44 — Regalian Doctrine ─────────────────────────────────────────────
export function IllustrationRegalian() {
  const resources=[
    {x:432,y:44,label:"Minerals"},{x:490,y:80,label:"Forests"},
    {x:462,y:124,label:"Water"},  {x:228,y:44,label:"Land"},
    {x:170,y:80,label:"Energy"},  {x:198,y:124,label:"Marine"},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 175" role="img">
      <title>Regalian Doctrine</title>
      <desc>State ownership of all natural resources — Art. XII Sec. 2, 1987 Constitution</desc>
      {/* Scroll */}
      <rect x="80" y="28" width="180" height="112" rx="6" fill="#F1F8E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <rect x="88" y="28" width="7" height="112" rx="3" fill="#2E7D32" opacity="0.22"/>
      <rect x="265" y="28" width="7" height="112" rx="3" fill="#2E7D32" opacity="0.22"/>
      {[50,62,74,86,98,110,122].map((y,i)=>(
        <line key={i} x1="102" y1={y} x2={i===0?248:i===3?218:238} y2={y}
              stroke="#2E7D32" strokeWidth={i===0?1.5:1} strokeLinecap="round" opacity={i===0?0.65:0.35}/>
      ))}
      <LabelBg x={170} y={153} w={130} h={16} rx={3}/>
      <text x="170" y="152" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>1987 Constitution</text>
      <LabelBg x={170} y={171} w={124} h={15} rx={3}/>
      <text x="170" y="170" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_GREEN}>Art. XII, Sec. 2</text>
      {/* Crown */}
      <g fill="#1B5E20" opacity="0.75" transform="translate(340,26)">
        <polygon points="-24,18 -12,0 0,10 12,0 24,18 20,22 -20,22"/>
        <rect x="-22" y="22" width="44" height="6" rx="2"/>
      </g>
      <LabelBg x={340} y={72} w={48} h={17} rx={3}/>
      <text x="340" y="71" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>State</text>
      {/* Resource nodes */}
      {resources.map(({x,y,label})=>(
        <g key={label}>
          <line x1={340+(x<340?-30:30)} y1={55}
                x2={x<340?x+20:x-20} y2={y}
                stroke="#2E7D32" strokeWidth="1" strokeDasharray="3 3" opacity="0.45"/>
          <circle cx={x} cy={y} r="22" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>
          <text x={x} y={y+5} textAnchor="middle" fontSize="12"
                fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 45 — Water Right & Water Permit ────────────────────────────────────
export function IllustrationWaterPermit() {
  return (
    <svg width="100%" viewBox="0 0 680 175" role="img">
      <title>Water right vs water permit</title>
      <desc>Water right is the privilege; water permit is the document evidencing it</desc>
      <defs>
        <marker id="arr-wp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Water source */}
      <path d="M44 108 Q94 90 144 108 Q194 126 244 108" fill="none" stroke="#1565C0" strokeWidth="2.5" opacity="0.65"/>
      <path d="M44 118 Q94 100 144 118 Q194 136 244 118" fill="none" stroke="#1565C0" strokeWidth="1.8" opacity="0.45"/>
      <ellipse cx="144" cy="70" rx="14" ry="18" fill="#1565C0" opacity="0.28"/>
      <path d="M144 52 Q144 46 149 50 Q156 55 144 52Z" fill="#1565C0" opacity="0.40"/>
      <LabelBg x={144} y={145} w={90} h={17} rx={3}/>
      <text x="144" y="144" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Water Source</text>
      <line x1="250" y1="100" x2="290" y2="100" stroke="#2E7D32" strokeWidth="1.5"
            strokeDasharray="4 3" markerEnd="url(#arr-wp)"/>
      {/* Water Right badge */}
      <rect x="294" y="68" width="92" height="64" rx="8" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <text x="340" y="92" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>WATER</text>
      <text x="340" y="107" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>RIGHT</text>
      <LabelBg x={340} y={121} w={62} h={15} rx={3}/>
      <text x="340" y="120" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_GREEN}>Privilege</text>
      <line x1="388" y1="100" x2="428" y2="100" stroke="#2E7D32" strokeWidth="1.5"
            strokeDasharray="4 3" markerEnd="url(#arr-wp)"/>
      <LabelBg x={408} y={92} w={86} h={14} rx={3}/>
      <text x="408" y="91" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>evidenced by</text>
      {/* Permit document */}
      <rect x="430" y="42" width="104" height="136" rx="5" fill="#F1F8E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <rect x="438" y="42" width="9" height="136" rx="4" fill="#2E7D32" opacity="0.18"/>
      <circle cx="492" cy="82" r="18" fill="none" stroke="#2E7D32" strokeWidth="1" opacity="0.60"/>
      <circle cx="492" cy="82" r="12" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="0.5"/>
      <text x="492" y="87" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>NWRB</text>
      {[110,120,130,140,150,160].map((y,i)=>(
        <line key={i} x1="450" y1={y} x2={i>3?514:526} y2={y}
              stroke="#2E7D32" strokeWidth="1" strokeLinecap="round" opacity="0.35"/>
      ))}
      <LabelBg x={482} y={179} w={92} h={16} rx={3}/>
      <text x="482" y="178" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Water Permit</text>
      {/* Grantee */}
      <circle cx="618" cy="72" r="12" fill="none" stroke="#2E7D32" strokeWidth="1.5" opacity="0.70"/>
      <path d="M606 100 Q610 86 618 84 Q626 86 630 100"
            fill="none" stroke="#2E7D32" strokeWidth="1.5" opacity="0.65"/>
      <line x1="606" y1="108" x2="618" y2="115" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.60"/>
      <line x1="630" y1="108" x2="618" y2="115" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.60"/>
      <LabelBg x={618} y={132} w={62} h={16} rx={3}/>
      <text x="618" y="131" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Grantee</text>
      <line x1="536" y1="100" x2="596" y2="100" stroke="#2E7D32" strokeWidth="1.5"
            strokeDasharray="4 3" opacity="0.60" markerEnd="url(#arr-wp)"/>
    </svg>
  );
}

// ── Slides 80 / 85 — CPC ─────────────────────────────────────────────────────
export function IllustrationCPC() {
  return (
    <svg width="100%" viewBox="0 0 680 172" role="img">
      <title>Certificate of Public Convenience (CPC)</title>
      <desc>NWRB-issued CPC authorising water utilities to operate. Valid 5 years.</desc>
      <rect x="148" y="8" width="384" height="144" rx="8" fill="#F9FBE7" stroke="#558B2F" strokeWidth="1.5"/>
      <rect x="156" y="8"  width="11" height="144" rx="5" fill="#558B2F" opacity="0.18"/>
      <rect x="513" y="8"  width="11" height="144" rx="5" fill="#558B2F" opacity="0.18"/>
      {[[162,16],[522,16],[162,144],[522,144]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="5" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.45"/>
      ))}
      <rect x="156" y="16" width="368" height="30" rx="3" fill="#558B2F" opacity="0.14"/>
      <text x="340" y="36" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>
        Certificate of Public Convenience
      </text>
      {/* Seal */}
      <circle cx="256" cy="88" r="30" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.60"/>
      <circle cx="256" cy="88" r="22" fill="#E8F5E9" stroke="#558B2F" strokeWidth="0.5"/>
      {Array.from({length:12},(_,i)=>{
        const a=(i/12)*Math.PI*2;
        return <line key={i} x1={256+Math.cos(a)*22} y1={88+Math.sin(a)*22}
                     x2={256+Math.cos(a)*28} y2={88+Math.sin(a)*28}
                     stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" opacity="0.50"/>;
      })}
      <text x="256" y="85" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>NWRB</text>
      <text x="256" y="99" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_GREEN}>Official Seal</text>
      {/* Body lines */}
      {[62,74,86,98,110,122].map((y,i)=>(
        <line key={i} x1="298" y1={y} x2={i>3?480:492} y2={y}
              stroke="#558B2F" strokeWidth={i===0?1.2:0.9} strokeLinecap="round" opacity={i===0?0.50:0.28}/>
      ))}
      {/* Validity */}
      <rect x="440" y="120" width="84" height="24" rx="5" fill="#E8F5E9" stroke="#558B2F" strokeWidth="1"/>
      <text x="482" y="137" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Valid: 5 years</text>
      {/* Icons */}
      <rect x="50" y="66" width="88" height="18" rx="9" fill="none" stroke="#558B2F" strokeWidth="1.5" opacity="0.50"/>
      <circle cx="72"  cy="75" r="5" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.55"/>
      <circle cx="118" cy="75" r="5" fill="none" stroke="#558B2F" strokeWidth="1" opacity="0.55"/>
      <LabelBg x={94} y={107} w={90} h={16} rx={3}/>
      <text x="94" y="106" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Waterworks</text>
      <rect x="542" y="60" width="74" height="34" rx="5" fill="none" stroke="#558B2F" strokeWidth="1.5" opacity="0.50"/>
      <path d="M550 82 Q579 68 606 82" fill="none" stroke="#558B2F" strokeWidth="1.5" opacity="0.60"/>
      <line x1="579" y1="82" x2="579" y2="70" stroke="#558B2F" strokeWidth="1.5" strokeLinecap="round" opacity="0.60"/>
      <LabelBg x={579} y={113} w={84} h={16} rx={3}/>
      <text x="579" y="112" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Water Meter</text>
    </svg>
  );
}

// ── Slide 94 — IWRM ───────────────────────────────────────────────────────────
export function IllustrationIWRM() {
  const spokes=[
    {angle:180,label:"Water",    color:"#0288D1",tc:T_BLUE  },
    {angle:0,  label:"Land",     color:"#2E7D32",tc:T_GREEN },
    {angle:270,label:"Resources",color:"#E65100",tc:T_ORANGE},
  ];
  const outcomes=[
    {x:108,label:"Economic",    color:"#E65100",tc:T_ORANGE,w:90 },
    {x:280,label:"Social",      color:"#4A148C",tc:T_PURPLE,w:72 },
    {x:476,label:"Environmental",color:"#2E7D32",tc:T_GREEN,w:114},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 188" role="img">
      <title>Integrated Water Resources Management (IWRM)</title>
      <desc>Water, Land and Resources coordinated for economic, social and environmental outcomes</desc>
      <defs>
        <marker id="arr-iw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Hub */}
      <circle cx="340" cy="90" r="52" fill="#EDE7F6" stroke="#4A148C" strokeWidth="1.5"/>
      <text x="340" y="85" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_PURPLE}>IWRM</text>
      <text x="340" y="102" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_PURPLE}>Coordinated</text>
      {/* Spokes */}
      {spokes.map(({angle,label,color,tc})=>{
        const r=(Math.PI*angle)/180;
        const cx=340+Math.cos(r)*90, cy=90+Math.sin(r)*90;
        return (
          <g key={label}>
            <line x1={340+Math.cos(r)*54} y1={90+Math.sin(r)*54}
                  x2={340+Math.cos(r)*68} y2={90+Math.sin(r)*68}
                  stroke={color} strokeWidth="1.5" strokeDasharray="4 3"
                  markerEnd="url(#arr-iw)"/>
            <circle cx={cx} cy={cy} r="28" fill="white" stroke={color} strokeWidth="1.5"/>
            <text x={cx} y={cy+5} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={tc}>{label}</text>
          </g>
        );
      })}
      {/* Outcome boxes */}
      {outcomes.map(({x,label,color,tc,w})=>(
        <g key={label}>
          <rect x={x-w/2} y="156" width={w} height="24" rx="5" fill="white" stroke={color} strokeWidth="1.5"/>
          <text x={x} y="173" textAnchor="middle" fontSize="12"
                fontFamily="sans-serif" fontWeight="700" fill={tc}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 125 / 126 — SDG Goal 6 ────────────────────────────────────────────
export function IllustrationSDG6() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>SDG Goal 6 — Clean water and sanitation for all by 2030</title>
      <desc>Faucet flowing into hands with ripple rings — universal access to clean water</desc>
      <circle cx="108" cy="92" r="58" fill="#E3F2FD" stroke="#0288D1" strokeWidth="2"/>
      <circle cx="108" cy="92" r="44" fill="none" stroke="#0288D1" strokeWidth="6"
              strokeDasharray="27.6 248.4"/>
      <text x="108" y="106" textAnchor="middle" fontSize="40"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>6</text>
      <LabelBg x={108} y={166} w={148} h={16} rx={3}/>
      <text x="108" y="165" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_BLUE}>Clean Water &amp; Sanitation</text>
      {/* Faucet */}
      <rect x="316" y="12" width="68" height="12" rx="5" fill="#0288D1" opacity="0.72"/>
      <rect x="330" y="24" width="40" height="36" rx="5" fill="#0288D1" opacity="0.72"/>
      <rect x="368" y="20" width="24" height="8"  rx="3" fill="#0288D1" opacity="0.55"/>
      <path d="M334 60 Q334 92 330 116 Q326 136 330 150 Q340 162 350 150 Q354 136 350 116 Q346 92 346 60 Z"
            fill="#4FC3F7" opacity="0.55"/>
      {/* Hands */}
      <path d="M288 160 Q310 142 340 144 Q370 142 392 160 Q374 180 340 177 Q306 180 288 160 Z"
            fill="#E65100" opacity="0.20" stroke="#E65100" strokeWidth="1"/>
      <path d="M296 156 Q340 140 384 156" fill="none" stroke="#E65100" strokeWidth="1.8" opacity="0.55"/>
      {/* Ripples */}
      <ellipse cx="340" cy="164" rx="55"  ry="14" fill="none" stroke="#0288D1" strokeWidth="1" opacity="0.22"/>
      <ellipse cx="340" cy="164" rx="78"  ry="20" fill="none" stroke="#0288D1" strokeWidth="1" opacity="0.15"/>
      <ellipse cx="340" cy="164" rx="102" ry="27" fill="none" stroke="#0288D1" strokeWidth="0.7" opacity="0.10"/>
      {/* Droplets */}
      <ellipse cx="490" cy="60" rx="10" ry="13" fill="#0288D1" opacity="0.45"/>
      <ellipse cx="534" cy="102" rx="7.5" ry="10" fill="#0288D1" opacity="0.38"/>
      {/* by 2030 */}
      <rect x="566" y="150" width="76" height="28" rx="6" fill="#E3F2FD" stroke="#0288D1" strokeWidth="1.5"/>
      <text x="604" y="169" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>by 2030</text>
    </svg>
  );
}

// ── Slides 134 / 135 — Trivia ─────────────────────────────────────────────────
export function IllustrationTrivia() {
  return (
    <svg width="100%" viewBox="0 0 680 162" role="img">
      <title>Survival: 3 days without water vs 21 days without food</title>
      <desc>Water is far more critical to human survival than food</desc>
      <rect x="38" y="22" width="264" height="120" rx="10" fill="#E3F2FD" stroke="#0288D1" strokeWidth="1.5"/>
      <ellipse cx="100" cy="76" rx="22" ry="28" fill="#0288D1" opacity="0.35"/>
      <path d="M100 48 Q100 40 106 44 Q115 50 100 48Z" fill="#0288D1" opacity="0.45"/>
      <ellipse cx="93" cy="69" rx="6" ry="8" fill="#fff" opacity="0.35"/>
      <text x="177" y="75" textAnchor="middle" fontSize="32"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>3</text>
      <text x="177" y="95" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="600" fill={T_BLUE}>days</text>
      <text x="177" y="120" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="600" fill={T_BLUE}>without Water</text>
      {/* vs */}
      <rect x="318" y="78" width="44" height="26" rx="5" fill="white" stroke="#7B1FA2" strokeWidth="1"/>
      <text x="340" y="96" textAnchor="middle" fontSize="16"
            fontFamily="sans-serif" fontWeight="700" fill={T_PURPLE}>vs</text>
      {/* Food panel */}
      <rect x="378" y="22" width="264" height="120" rx="10" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <ellipse cx="438" cy="92" rx="20" ry="8" fill="#2E7D32" opacity="0.30"/>
      <path d="M418 90 Q428 70 438 68 Q448 70 458 90"
            fill="none" stroke="#2E7D32" strokeWidth="2" opacity="0.50"/>
      <line x1="438" y1="62" x2="438" y2="52" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" opacity="0.45"/>
      <line x1="430" y1="62" x2="426" y2="52" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.38"/>
      <line x1="446" y1="62" x2="450" y2="52" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" opacity="0.38"/>
      <text x="535" y="75" textAnchor="middle" fontSize="32"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>21</text>
      <text x="535" y="95" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>days</text>
      <text x="535" y="120" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>without Food</text>
      {/* Note */}
      <LabelBg x={340} y={158} w={400} h={16} rx={3}/>
      <text x="340" y="157" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>Water is far more critical to human survival than food</text>
    </svg>
  );
}

// ── Slide 160 — Shared Responsibility ────────────────────────────────────────
export function IllustrationSharedResponsibility() {
  const sectors=[
    {angle:-90, label:"Government",color:"#0d47a1",tc:T_BLUE },
    {angle:-30, label:"Industry",  color:"#1565C0",tc:T_BLUE },
    {angle:30,  label:"LGUs",      color:"#00695C",tc:T_TEAL },
    {angle:90,  label:"Community", color:"#1b5e20",tc:T_GREEN},
    {angle:150, label:"NWRB",      color:"#004d40",tc:T_TEAL },
    {angle:210, label:"DENR",      color:"#1B9A6B",tc:T_GREEN},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 185" role="img">
      <title>Water management is a shared responsibility</title>
      <desc>Six sectors connected around a central water droplet</desc>
      <circle cx="340" cy="92" r="80" fill="none" stroke="#065A82" strokeWidth="1"
              strokeDasharray="5 4" opacity="0.28"/>
      {/* Center drop */}
      <ellipse cx="340" cy="100" rx="28" ry="36" fill="#065A82" opacity="0.18"/>
      <path d="M340 64 Q340 55 346 59 Q355 65 340 64Z" fill="#065A82" opacity="0.28"/>
      <rect x="316" y="98" width="48" height="18" rx="4" fill="white"/>
      <text x="340" y="112" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Water</text>
      {/* Sector nodes */}
      {sectors.map(({angle,label,color,tc})=>{
        const r=(Math.PI*angle)/180;
        const cx=340+Math.cos(r)*80, cy=92+Math.sin(r)*80;
        const w=label.length*7+20;
        return (
          <g key={label}>
            <line x1={340+Math.cos(r)*38} y1={92+Math.sin(r)*38}
                  x2={340+Math.cos(r)*58} y2={92+Math.sin(r)*58}
                  stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.45"/>
            <circle cx={cx} cy={cy} r="22" fill="white" stroke={color} strokeWidth="1.5"/>
            <text x={cx} y={cy+5} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={tc}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 161 — Closing ───────────────────────────────────────────────────────
export function IllustrationClosing() {
  const rays=[0,30,60,90,120,150,180,210,240,270,300,330];
  return (
    <svg width="100%" viewBox="0 0 680 216" role="img">
      <title>Thank you — Sustainable water for a healthy nation</title>
      <desc>Sunrise over ocean waves with DENR leaf motif</desc>
      <circle cx="340" cy="95" r="60" fill="none" stroke="#065A82" strokeWidth="1" opacity="0.12"/>
      <circle cx="340" cy="95" r="44" fill="#065A82" opacity="0.10"/>
      <circle cx="340" cy="95" r="28" fill="#065A82" opacity="0.20"/>
      <circle cx="340" cy="95" r="14" fill="#065A82" opacity="0.38"/>
      <g stroke="#065A82" strokeWidth="1.5" strokeLinecap="round" opacity="0.28">
        {rays.map((deg,i)=>{
          const r=(Math.PI*deg)/180;
          return <line key={i}
                       x1={340+Math.cos(r)*64} y1={95+Math.sin(r)*64}
                       x2={340+Math.cos(r)*75} y2={95+Math.sin(r)*75}/>;
        })}
      </g>
      <path d="M340 83 Q360 72 370 90 Q360 104 340 108 Q330 103 332 88 Q336 74 340 83 Z"
            fill="#1B9A6B" opacity="0.70"/>
      <line x1="340" y1="83" x2="340" y2="108" stroke="#1B9A6B" strokeWidth="1"
            strokeLinecap="round" opacity="0.55"/>
      {/* Waves */}
      <path d="M0 148 Q85 134 170 148 Q255 163 340 148 Q425 134 510 148 Q595 163 680 148 L680 216 L0 216 Z"
            fill="#065A82" opacity="0.18"/>
      <path d="M0 160 Q90 148 185 160 Q280 174 370 160 Q460 148 560 160 Q630 166 680 161 L680 216 L0 216 Z"
            fill="#065A82" opacity="0.28"/>
      <path d="M0 172 Q100 161 210 172 Q320 185 430 172 Q540 161 640 172 L680 176 L680 216 L0 216 Z"
            fill="#065A82" opacity="0.42"/>
      <path d="M0 146 Q85 135 170 146 Q255 158 340 146 Q425 135 510 146 Q595 158 680 146"
            fill="none" stroke="#4ACBF0" strokeWidth="1.2" opacity="0.38"/>
      {/* Droplets */}
      <ellipse cx="114" cy="122" rx="7" ry="9"  fill="#4ACBF0" opacity="0.50"/>
      <ellipse cx="204" cy="108" rx="5" ry="7"  fill="#4ACBF0" opacity="0.42"/>
      <ellipse cx="470" cy="116" rx="7" ry="9"  fill="#4ACBF0" opacity="0.50"/>
      <ellipse cx="566" cy="104" rx="5" ry="6.5" fill="#4ACBF0" opacity="0.42"/>
      {/* Tagline */}
      <rect x="150" y="200" width="380" height="20" rx="4" fill="rgba(255,255,255,0.85)"/>
      <text x="340" y="215" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL} letterSpacing="0.5">
        Sustainable Water for a Healthy Nation
      </text>
    </svg>
  );
}

// ── Slide 2 — Outline ────────────────────────────────────────────────────────
export function IllustrationOutline() {
  const items = ["NWRB","Laws","Services","Water Resources","Water Code","Trivia","Tips"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Presentation outline</title>
      <desc>Seven topic tiles showing the presentation roadmap</desc>
      <rect x="0" y="170" width="680" height="22" rx="0" fill="#065A82" opacity="0.08"/>
      {items.map((label, i) => {
        const x = 34 + i * 90;
        const hue = `hsl(${200 + i * 18}, 65%, 38%)`;
        return (
          <g key={i}>
            <rect x={x} y={40} width={76} height={96} rx={8}
                  fill="none" stroke={hue} strokeWidth="1.5" opacity="0.55"/>
            <rect x={x} y={40} width={76} height={20} rx={8} fill={hue} opacity="0.18"/>
            <LabelBg x={x + 38} y={57} w={60} h={16} rx={3}/>
            <text x={x + 38} y={56} textAnchor="middle" fontSize="10"
                  fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>{i + 1}</text>
            <LabelBg x={x + 38} y={96} w={68} h={16} rx={3}/>
            <text x={x + 38} y={95} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{label}</text>
          </g>
        );
      })}
      <line x1="34" y1="168" x2="646" y2="168" stroke="#065A82" strokeWidth="1" opacity="0.20"/>
    </svg>
  );
}

// ── Slide 3 — What is NWRB (clarification) ───────────────────────────────────
export function IllustrationNotNWRB() {
  const names = ["Maynilad","Manila Water","MWSS","LWUA","NAWASA"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>What NWRB is NOT</title>
      <desc>Crossed-out logos of water utilities that are commonly confused with NWRB</desc>
      {names.map((n, i) => {
        const x = 68 + i * 114;
        return (
          <g key={i}>
            <rect x={x - 42} y={55} width={84} height={52} rx={6}
                  fill="#ffebee" stroke="#b71c1c" strokeWidth="1.2" opacity="0.70"/>
            <line x1={x - 34} y1={63} x2={x + 34} y2={99}
                  stroke="#b71c1c" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"/>
            <line x1={x + 34} y1={63} x2={x - 34} y2={99}
                  stroke="#b71c1c" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"/>
            <LabelBg x={x} y={126} w={82} h={16} rx={3}/>
            <text x={x} y={125} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_RED}>{n}</text>
          </g>
        );
      })}
      <rect x="260" y="155" width="160" height="24" rx="6" fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <text x="340" y="172" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>NWRB ≠ Water Utility</text>
    </svg>
  );
}

// ── Slide 6 — NWRB three functions (bullets) ─────────────────────────────────
export function IllustrationNWRBFunctions() {
  const funcs = [
    { label: "Policy\nFormulation", icon: "📋", color: "#028090" },
    { label: "Resource\nRegulation", icon: "💧", color: "#1565C0" },
    { label: "Economic\nRegulation", icon: "₱",  color: "#2E7D32" },
  ];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Three major functions of NWRB</title>
      <desc>Policy formulation, resource regulation and economic regulation</desc>
      {funcs.map(({ label, color }, i) => {
        const x = 130 + i * 200;
        return (
          <g key={i}>
            <circle cx={x} cy={80} r={46} fill={color} opacity="0.12" stroke={color} strokeWidth="1.5"/>
            <circle cx={x} cy={80} r={30} fill={color} opacity="0.20"/>
            <text x={x} y={86} textAnchor="middle" fontSize="18"
                  fontFamily="sans-serif" fontWeight="700" fill={color} opacity="0.85">{i + 1}</text>
            {label.split("\n").map((l, j) => (
              <g key={j}>
                <LabelBg x={x} y={140 + j * 18} w={110} h={16} rx={3}/>
                <text x={x} y={139 + j * 18} textAnchor="middle" fontSize="13"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
      <line x1="176" y1="80" x2="284" y2="80" stroke="#028090" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.40"/>
      <line x1="376" y1="80" x2="484" y2="80" stroke="#028090" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.40"/>
    </svg>
  );
}

// ── Slide 7 — Legal Mandates Timeline ────────────────────────────────────────
export function IllustrationLegalTimeline() {
  const years = ["1974","1976","1977","1987","2002","2010","2023"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Legal mandates timeline 1974–2023</title>
      <desc>Key presidential decrees and executive orders governing Philippine water resources</desc>
      <line x1="40" y1="96" x2="640" y2="96" stroke="#02C39A" strokeWidth="2.5" opacity="0.35"/>
      {years.map((y, i) => {
        const x = 40 + i * 100;
        const up = i % 2 === 0;
        return (
          <g key={i}>
            <circle cx={x} cy={96} r={7} fill="#02C39A" opacity="0.70"/>
            <line x1={x} y1={96} x2={x} y2={up ? 48 : 144}
                  stroke="#02C39A" strokeWidth="1" strokeDasharray="3 2" opacity="0.45"/>
            <LabelBg x={x} y={up ? 46 : 158} w={40} h={16} rx={3}/>
            <text x={x} y={up ? 45 : 157} textAnchor="middle" fontSize="10"
                  fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>{y}</text>
          </g>
        );
      })}
      <LabelBg x={340} y={182} w={200} h={15} rx={3}/>
      <text x="340" y="181" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>PD 424 → EO 22 · Water Governance History</text>
    </svg>
  );
}

// ── Slide 8 — NWRB Board ─────────────────────────────────────────────────────
export function IllustrationNWRBBoard() {
  const roles = ["Chair\n(DENR Sec)", "Vice Chair\n(DEPDev)", "DOJ\nMember", "DOST\nMember", "UP-NHRC\nMember"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>NWRB Board composition</title>
      <desc>Five-member board: DENR Secretary as chair with four other members</desc>
      {/* Chair at top center */}
      <circle cx="340" cy="54" r="28" fill="#028090" opacity="0.20" stroke="#028090" strokeWidth="1.5"/>
      <LabelBg x={340} y={51} w={84} h={16} rx={3}/>
      <text x="340" y={50} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Chair (DENR)</text>
      {/* Members in a row */}
      {[1,2,3,4].map(i => {
        const x = 80 + i * 130;
        const label = roles[i];
        return (
          <g key={i}>
            <line x1={340} y1={82} x2={x} y2={130} stroke="#028090" strokeWidth="1"
                  strokeDasharray="4 3" opacity="0.40"/>
            <circle cx={x} cy={148} r={20} fill="#028090" opacity="0.12" stroke="#028090" strokeWidth="1"/>
            {label.split("\n").map((l, j) => (
              <g key={j}>
                <LabelBg x={x} y={144 + j * 14} w={82} h={14} rx={3}/>
                <text x={x} y={143 + j * 14} textAnchor="middle" fontSize="10"
                      fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 9 — Deputation resolution ─────────────────────────────────────────
export function IllustrationDeputation() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>NWRB deputation of DENR Regional Offices</title>
      <desc>NWRB delegates water use regulation functions to DENR regional offices</desc>
      <defs>
        <marker id="arr-dep" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#0A7C6E" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* NWRB box */}
      <rect x="50" y="60" width="160" height="72" rx="8"
            fill="#E0F7FA" stroke="#028090" strokeWidth="1.5"/>
      <LabelBg x={130} y={91} w={56} h={18} rx={4}/>
      <text x="130" y="90" textAnchor="middle" fontSize="15"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>NWRB</text>
      <LabelBg x={130} y={112} w={120} h={16} rx={3}/>
      <text x="130" y="111" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_TEAL}>Art. 80 · PD 1067</text>
      {/* Arrow */}
      <line x1="210" y1="96" x2="320" y2="96" stroke="#0A7C6E" strokeWidth="2"
            markerEnd="url(#arr-dep)"/>
      <LabelBg x={265} y={88} w={86} h={15} rx={3}/>
      <text x="265" y="87" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>Deputizes</text>
      {/* DENR box */}
      <rect x="330" y="60" width="160" height="72" rx="8"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={410} y={87} w={100} h={18} rx={4}/>
      <text x="410" y="86" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>DENR-RO</text>
      <LabelBg x={410} y={106} w={124} h={14} rx={3}/>
      <text x="410" y="105" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_GREEN}>WRUS, LPDD</text>
      {/* Tasks */}
      {["Accept WPAs","Inventory water users","IEC campaigns","Monitoring"].map((t,i) => (
        <g key={i}>
          <circle cx={524} cy={52 + i * 24} r={3} fill="#0A7C6E" opacity="0.55"/>
          <LabelBg x={582} y={52 + i * 24 + 4} w={118} h={14} rx={3}/>
          <text x="582" y={51 + i * 24 + 4} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fill={T_TEAL}>{t}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 10 — NWRB shall / reporting ────────────────────────────────────────
export function IllustrationReporting() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Monthly reporting cycle between NWRB and DENR deputies</title>
      <desc>DENR regional offices submit monthly accomplishment reports to NWRB by the 2nd of each month</desc>
      {/* Calendar */}
      <rect x="40" y="36" width="160" height="128" rx="8"
            fill="#E0F7FA" stroke="#028090" strokeWidth="1.5"/>
      <rect x="40" y="36" width="160" height="30" rx="8" fill="#028090" opacity="0.60"/>
      <LabelBg x={120} y={58} w={90} h={18} rx={4}/>
      <text x="120" y="57" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill="#fff">Monthly</text>
      {/* Grid dates */}
      {[1,2,3,4,5,6,7].map(d => (
        <g key={d}>
          <rect x={48 + ((d-1)%7)*21} y={76 + Math.floor((d-1)/7)*22}
                width={18} height={18} rx={3}
                fill={d===2?"#028090":"transparent"}
                stroke={d===2?"#028090":"rgba(2,128,144,0.2)"} strokeWidth={d===2?2:1}/>
          <text x={57 + ((d-1)%7)*21} y={90 + Math.floor((d-1)/7)*22}
                textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fontWeight={d===2?"700":"400"}
                fill={d===2?"#fff":T_TEAL}>{d}</text>
        </g>
      ))}
      <LabelBg x={120} y={162} w={110} h={15} rx={3}/>
      <text x="120" y="161" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_TEAL}>2nd of ensuing month</text>
      {/* Arrow */}
      <line x1="210" y1="100" x2="290" y2="100" stroke="#0A7C6E" strokeWidth="2"
            strokeDasharray="5 3" opacity="0.65"/>
      <polygon points="290,95 302,100 290,105" fill="#0A7C6E" opacity="0.65"/>
      {/* Report doc */}
      <rect x="305" y="42" width="130" height="116" rx="6"
            fill="#F1F8E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <rect x="313" y="42" width="10" height="116" rx="4" fill="#2E7D32" opacity="0.18"/>
      {["Investigation Rpt","Inspection Rpt","WPA Report","Inventory","Water Sources","Development Rpt"].map((l,i) => (
        <g key={i}>
          <circle cx={336} cy={65 + i*16} r={3} fill="#2E7D32" opacity="0.50"/>
          <LabelBg x={398} y={65 + i*16 + 4} w={110} h={13} rx={2}/>
          <text x="398" y={64 + i*16 + 4} textAnchor="middle" fontSize="9.5"
                fontFamily="sans-serif" fill={T_GREEN}>{l}</text>
        </g>
      ))}
      {/* NWRB receipt */}
      <rect x="466" y="68" width="108" height="56" rx="6"
            fill="#E0F7FA" stroke="#028090" strokeWidth="1.5"/>
      <LabelBg x={520} y={92} w={56} h={18} rx={4}/>
      <text x="520" y="91" textAnchor="middle" fontSize="15"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>NWRB</text>
      <LabelBg x={520} y={115} w={90} h={14} rx={3}/>
      <text x="520" y="114" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_TEAL}>Receives Reports</text>
      <line x1="440" y1="100" x2="462" y2="100" stroke="#0A7C6E" strokeWidth="1.5"
            strokeDasharray="3 2" opacity="0.55"/>
      <polygon points="462,95 472,100 462,105" fill="#0A7C6E" opacity="0.55"/>
    </svg>
  );
}

// ── Slides 12–13 — Major Functions ────────────────────────────────────────────
export function IllustrationMajorFunctions() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Major functions and activities of the NWRB Board</title>
      <desc>Four key board activities: policy deliberation, water permits, Angat Dam, conflict resolution</desc>
      {[
        { x:90,  label:"Policy\nDeliberation", icon:"📜", color:"#028090" },
        { x:240, label:"Water Permit\nApprovals",  icon:"✅", color:"#1565C0" },
        { x:390, label:"Angat Dam\nAllocation",    icon:"💧", color:"#0A7C6E" },
        { x:540, label:"Conflict\nResolution",     icon:"⚖",  color:"#2E7D32" },
      ].map(({ x, label, color }) => (
        <g key={x}>
          <circle cx={x} cy={84} r={42} fill={color} opacity="0.10" stroke={color} strokeWidth="1.5"/>
          <circle cx={x} cy={84} r={26} fill={color} opacity="0.18"/>
          {label.split("\n").map((l, j) => (
            <g key={j}>
              <LabelBg x={x} y={142 + j*17} w={110} h={15} rx={3}/>
              <text x={x} y={141 + j*17} textAnchor="middle" fontSize="11.5"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slide 14 — Policy Formulation ────────────────────────────────────────────
export function IllustrationPolicyFormulation() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Policy formulation and coordination under IWRM</title>
      <desc>NWRB formulates water policy within an Integrated Water Resources Management framework</desc>
      {/* IWRM shield */}
      <path d="M340 20 L420 52 L420 120 Q420 162 340 182 Q260 162 260 120 L260 52 Z"
            fill="#4A148C" opacity="0.10" stroke="#4A148C" strokeWidth="1.5"/>
      <LabelBg x={340} y={82} w={56} h={18} rx={4}/>
      <text x="340" y="81" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_PURPLE}>IWRM</text>
      <LabelBg x={340} y={106} w={100} h={16} rx={3}/>
      <text x="340" y="105" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_PURPLE}>Framework</text>
      {/* Radiating lines */}
      {["-140","-100","-60","60","100","140"].map((angle, i) => {
        const r = (Math.PI * parseInt(angle)) / 180;
        return (
          <line key={i}
                x1={340 + Math.cos(r)*68} y1={100 + Math.sin(r)*68}
                x2={340 + Math.cos(r)*86} y2={100 + Math.sin(r)*86}
                stroke="#4A148C" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
        );
      })}
      {/* Nodes */}
      {[
        {x:130,y:96,label:"Policy Plans"},
        {x:188,y:50,label:"Coordination"},
        {x:496,y:50,label:"Amendments"},
        {x:554,y:96,label:"FGDs"},
      ].map(({x,y,label}) => (
        <g key={label}>
          <rect x={x-44} y={y-16} width={88} height={26} rx={6}
                fill="#EDE7F6" stroke="#4A148C" strokeWidth="1"/>
          <LabelBg x={x} y={y+4} w={80} h={16} rx={3}/>
          <text x={x} y={y+3} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fontWeight="700" fill={T_PURPLE}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 15 — Functions & Programs ──────────────────────────────────────────
export function IllustrationFunctionPrograms() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>NWRB policy formulation functions and programs</title>
      <desc>IWRM framework and ongoing Water Code amendment process</desc>
      <rect x="36" y="28" width="280" height="136" rx="10"
            fill="#EDE7F6" stroke="#4A148C" strokeWidth="1.5"/>
      <LabelBg x={176} y={54} w={130} h={18} rx={4}/>
      <text x="176" y="53" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_PURPLE}>IWRM Policy Plans</text>
      {["National framework","River basin mgmt","Water security roadmap"].map((l,i) => (
        <g key={i}>
          <circle cx={64} cy={82+i*26} r={5} fill="#4A148C" opacity="0.45"/>
          <LabelBg x={200} y={82+i*26+4} w={230} h={14} rx={3}/>
          <text x="200" y={81+i*26+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
      <rect x="364" y="28" width="280" height="136" rx="10"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={504} y={54} w={180} h={18} rx={4}/>
      <text x="504" y="53" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Water Code Amendment</text>
      {["Focus Group Discussions","Legal writeshops","Stakeholder consultation"].map((l,i) => (
        <g key={i}>
          <circle cx={392} cy={82+i*26} r={5} fill="#2E7D32" opacity="0.45"/>
          <LabelBg x={524} y={82+i*26+4} w={230} h={14} rx={3}/>
          <text x="524" y={81+i*26+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 16–17 — Angat Reservoir ───────────────────────────────────────────
export function IllustrationAngatDam() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Angat Dam — multipurpose reservoir</title>
      <desc>Angat Dam supplies water for Metro Manila, irrigation, and power generation in Luzon</desc>
      {/* Mountains */}
      <polygon points="60,130 130,50 200,130" fill="#2E7D32" opacity="0.40"/>
      <polygon points="160,130 220,70 280,130" fill="#2E7D32" opacity="0.32"/>
      {/* Dam wall */}
      <rect x="280" y="90" width="30" height="70" rx="2" fill="#455A64" opacity="0.80"/>
      <rect x="276" y="88" width="38" height="8" rx="2" fill="#546E7A" opacity="0.80"/>
      {/* Reservoir */}
      <path d="M60 130 Q100 118 180 122 Q230 126 280 130 L280 160 Q200 152 120 156 Q80 158 60 160 Z"
            fill="#1565C0" opacity="0.30"/>
      <path d="M60 140 Q120 132 200 136 Q250 138 280 142"
            fill="none" stroke="#1565C0" strokeWidth="1.5" opacity="0.50"/>
      {/* Water flow */}
      <path d="M310 130 Q340 125 380 136 Q420 147 480 144"
            fill="none" stroke="#1565C0" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
      {/* Use icons */}
      {[
        {x:390, y:90, label:"Water Supply\n15M people", color:"#1565C0"},
        {x:490, y:90, label:"Irrigation\n27,000 ha",   color:"#2E7D32"},
        {x:590, y:90, label:"Power Gen\nLuzon Grid",   color:"#E65100"},
      ].map(({x,y,label,color}) => (
        <g key={x}>
          <circle cx={x} cy={y} r={28} fill={color} opacity="0.12" stroke={color} strokeWidth="1.2"/>
          {label.split("\n").map((l, j) => (
            <g key={j}>
              <LabelBg x={x} y={y+j*15+5} w={96} h={14} rx={3}/>
              <text x={x} y={y+j*15+4} textAnchor="middle" fontSize="10"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
      <LabelBg x={165} y={178} w={200} h={15} rx={3}/>
      <text x="165" y="177" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>Angat Dam · Bulacan · 543 km² catchment</text>
    </svg>
  );
}

// ── Slide 18 — Resource & Economic Regulation ────────────────────────────────
export function IllustrationRegulations() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Resource regulation and economic regulation by NWRB</title>
      <desc>Resource regulation issues water permits; economic regulation protects consumers through CPC</desc>
      <rect x="36" y="24" width="284" height="144" rx="10"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={178} y={50} w={180} h={18} rx={4}/>
      <text x="178" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Resource Regulation</text>
      {["Issues Water Permit","Resolves Water Use Conflicts","Monitors compliance"].map((l,i)=>(
        <g key={i}>
          <circle cx={60} cy={76+i*28} r={5} fill="#1565C0" opacity="0.55"/>
          <LabelBg x={210} y={76+i*28+4} w={230} h={14} rx={3}/>
          <text x="210" y={75+i*28+4} textAnchor="middle" fontSize="11.5"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
      <rect x="360" y="24" width="284" height="144" rx="10"
            fill="#E8F5E9" stroke="#558B2F" strokeWidth="1.5"/>
      <LabelBg x={502} y={50} w={180} h={18} rx={4}/>
      <text x="502" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Economic Regulation</text>
      {["Grants CPC","Sets water tariffs","Inspects water meters","Protects consumers"].map((l,i)=>(
        <g key={i}>
          <circle cx={384} cy={76+i*26} r={5} fill="#558B2F" opacity="0.55"/>
          <LabelBg x={538} y={76+i*26+4} w={230} h={14} rx={3}/>
          <text x="538" y={75+i*26+4} textAnchor="middle" fontSize="11.5"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 19–21 — Philippine Water Resources stats ───────────────────────────
export function IllustrationPhilWater() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Philippine water resources statistics</title>
      <desc>146 billion cubic meters total water resources: rivers, lakes, surface and groundwater</desc>
      {/* Philippines island silhouette (simplified) */}
      <path d="M200 40 Q218 32 226 52 Q234 70 226 90 Q218 108 226 126 Q232 144 222 160 Q208 175 196 160 Q180 142 176 120 Q170 96 178 76 Q186 55 200 40 Z"
            fill="#1565C0" opacity="0.18" stroke="#1565C0" strokeWidth="1"/>
      {/* Stats blocks */}
      {[
        {x:330, y:36,  val:"421", unit:"Rivers",     color:"#0288D1"},
        {x:440, y:36,  val:"79",  unit:"Lakes",       color:"#1565C0"},
        {x:550, y:36,  val:"2,400mm", unit:"Rainfall/yr", color:"#028090"},
        {x:330, y:118, val:"125.8B m³", unit:"Surface Water", color:"#2E7D32"},
        {x:450, y:118, val:"20.2B m³", unit:"Groundwater",   color:"#0A7C6E"},
        {x:570, y:118, val:"146B m³",  unit:"Total",         color:"#1B5E20"},
      ].map(({x,y,val,unit,color})=>(
        <g key={x+y}>
          <rect x={x-48} y={y} width={96} height={60} rx={8}
                fill="white" stroke={color} strokeWidth="1.5" opacity="0.80"/>
          <LabelBg x={x} y={y+24} w={86} h={19} rx={3}/>
          <text x={x} y={y+23} textAnchor="middle" fontSize="16"
                fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>{val}</text>
          <LabelBg x={x} y={y+46} w={86} h={14} rx={3}/>
          <text x={x} y={y+45} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fontWeight="600" fill={T_DARK}>{unit}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 22 — 12 Water Resources Regions ───────────────────────────────────
export function IllustrationWaterRegions() {
  const regions = ["I Ilocos","II Cagayan","III C. Luzon","IV S. Tagalog",
                   "V Bicol","VI W. Visayas","VII C. Visayas","VIII E. Visayas",
                   "IX SW Mindanao","X N. Mindanao","XI SE Mindanao","XII S. Mindanao"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>12 water resources regions of the Philippines</title>
      <desc>The Philippines is divided into 12 hydrological water resources regions</desc>
      {regions.map((r, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x = 46 + col * 100;
        const y = 28 + row * 84;
        const hue = `hsl(${200 + i * 14}, 60%, ${36 + (i%3)*6}%)`;
        return (
          <g key={i}>
            <rect x={x} y={y} width={88} height={66} rx={6}
                  fill="white" stroke={hue} strokeWidth="1.5"/>
            <rect x={x} y={y} width={88} height={20} rx={6} fill={hue} opacity="0.25"/>
            <LabelBg x={x+44} y={y+14} w={82} h={14} rx={2}/>
            <text x={x+44} y={y+13} textAnchor="middle" fontSize="9"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{r}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 23 — Administrative vs Water Regions ───────────────────────────────
export function IllustrationAdminVsWater() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Administrative vs water resources regions comparison</title>
      <desc>Administrative regions follow political boundaries while water resources regions follow hydrological boundaries</desc>
      <rect x="36" y="24" width="278" height="144" rx="10"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={175} y={51} w={180} h={18} rx={4}/>
      <text x="175" y="50" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Administrative Regions</text>
      {/* Straight grid lines = political */}
      {[70,84,98,112,126,140].map(y=>(
        <line key={y} x1={52} y1={y} x2={298} y2={y}
              stroke="#1565C0" strokeWidth="1" opacity="0.25"/>
      ))}
      {[90,130,170,210,250].map(x=>(
        <line key={x} x1={x} y1={62} x2={x} y2={152}
              stroke="#1565C0" strokeWidth="1" opacity="0.25"/>
      ))}
      <LabelBg x={175} y={168} w={200} h={15} rx={3}/>
      <text x="175" y="167" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_BLUE}>Political boundaries</text>
      <rect x="366" y="24" width="278" height="144" rx="10"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={505} y={51} w={200} h={18} rx={4}/>
      <text x="505" y="50" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Water Resources Regions</text>
      {/* Wavy lines = hydrological */}
      {[75,95,115,135,155].map((y,i)=>(
        <path key={y} d={`M382 ${y} Q420 ${y-8+i*3} 456 ${y} Q492 ${y+8-i*2} 528 ${y} Q564 ${y-6} 600 ${y+4} L628 ${y+2}`}
              fill="none" stroke="#2E7D32" strokeWidth="1.2" opacity="0.30"/>
      ))}
      <LabelBg x={505} y={168} w={220} h={15} rx={3}/>
      <text x="505" y="167" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_GREEN}>Hydrological boundaries (12 regions)</text>
    </svg>
  );
}

// ── Slides 24–27 — River Basins ───────────────────────────────────────────────
export function IllustrationRiverBasins() {
  const basins = [
    {name:"Cagayan",  area:"25,649",color:"#0288D1"},
    {name:"Mindanao", area:"23,169",color:"#1565C0"},
    {name:"Agusan",   area:"10,921",color:"#028090"},
    {name:"Pampanga", area:"9,759", color:"#0A7C6E"},
    {name:"Agno",     area:"5,972", color:"#2E7D32"},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Major river basins in the Philippines</title>
      <desc>18 major river basins: the top five by drainage area shown as proportional circles</desc>
      {basins.map(({name, area, color}, i) => {
        const x = 68 + i * 118;
        const r = 28 - i * 3;
        return (
          <g key={i}>
            <circle cx={x} cy={76} r={r + 10} fill={color} opacity="0.12" stroke={color} strokeWidth="1"/>
            <circle cx={x} cy={76} r={r} fill={color} opacity="0.25"/>
            <LabelBg x={x} y={130} w={90} h={16} rx={3}/>
            <text x={x} y={129} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{name}</text>
            <LabelBg x={x} y={148} w={82} h={14} rx={3}/>
            <text x={x} y={147} textAnchor="middle" fontSize="10"
                  fontFamily="sans-serif" fill={T_TEAL}>{area} km²</text>
          </g>
        );
      })}
      <LabelBg x={340} y={182} w={280} h={14} rx={3}/>
      <text x="340" y="181" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>18 major basins: 7 Luzon · 3 Visayas · 8 Mindanao</text>
    </svg>
  );
}

// ── Slide 25 — Water-Stressed Areas ──────────────────────────────────────────
export function IllustrationWaterStressed() {
  const cities = ["Metro Manila","Metro Cebu","Baguio","Bacolod","Davao","Zamboanga","Iloilo","Cagayan de Oro","Angeles"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Water-stressed cities in the Philippines</title>
      <desc>Nine highly urbanized areas identified as groundwater-constrained per JICA 1998</desc>
      {/* Warning background */}
      <rect x="0" y="0" width="680" height="192" rx="0"
            fill="#FFEBEE" opacity="0.25"/>
      {/* Warning triangle */}
      <polygon points="340,18 400,96 280,96" fill="#b71c1c" opacity="0.15"
               stroke="#b71c1c" strokeWidth="1.5"/>
      <LabelBg x={340} y={72} w={18} h={18} rx={3}/>
      <text x="340" y="71" textAnchor="middle" fontSize="16"
            fontFamily="sans-serif" fontWeight="900" fill={T_RED}>!</text>
      {cities.map((c, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 58 + col * 192;
        const y = 116 + row * 26;
        return (
          <g key={i}>
            <circle cx={x - 6} cy={y - 4} r={4} fill="#b71c1c" opacity="0.55"/>
            <LabelBg x={x + 50} y={y} w={100} h={15} rx={3}/>
            <text x={x + 50} y={y - 1} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="600" fill={T_RED}>{c}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 29 — Volume of Earth's Water ───────────────────────────────────────
export function IllustrationEarthVolume() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Total volume of Earth's water</title>
      <desc>332.5 million cubic miles of water shared by 7.5 billion people</desc>
      <circle cx="200" cy="96" r="72" fill="#0288D1" opacity="0.15" stroke="#0288D1" strokeWidth="2"/>
      <circle cx="200" cy="96" r="52" fill="#0288D1" opacity="0.18"/>
      <LabelBg x={200} y={87} w={130} h={22} rx={4}/>
      <text x="200" y="86" textAnchor="middle" fontSize="18"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>332.5M mi³</text>
      <LabelBg x={200} y={110} w={124} h={16} rx={3}/>
      <text x="200" y="109" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fill={T_BLUE}>Total Earth's Water</text>
      <LabelBg x={200} y={152} w={180} h={15} rx={3}/>
      <text x="200" y="151" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>1,386M km³ total volume</text>
      {/* People icon row */}
      {Array.from({length:8}).map((_,i)=>(
        <g key={i}>
          <circle cx={380 + i*38} cy={70} r={9} fill="#1565C0" opacity="0.40"/>
          <path d={`M${371+i*38} 90 Q${380+i*38} 80 ${389+i*38} 90`}
                fill="none" stroke="#1565C0" strokeWidth="2" opacity="0.38"/>
          <line x1={380+i*38} y1={90} x2={380+i*38} y2={108}
                stroke="#1565C0" strokeWidth="1.5" strokeLinecap="round" opacity="0.36"/>
        </g>
      ))}
      <LabelBg x={512} y={132} w={220} h={16} rx={3}/>
      <text x="512" y="131" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Shared by 7.5 billion people</text>
    </svg>
  );
}

// ── Slides 30–32 — Water Code intro ──────────────────────────────────────────
export function IllustrationWaterCode() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Presidential Decree 1067 — Water Code of the Philippines</title>
      <desc>Signed December 31, 1976 — foundational law governing all Philippine water resources</desc>
      {/* Book */}
      <rect x="200" y="18" width="280" height="156" rx="6" fill="#F1F8E9" stroke="#00695C" strokeWidth="2"/>
      <rect x="200" y="18" width="26" height="156" rx="6" fill="#00695C" opacity="0.55"/>
      <rect x="480" y="18" width="6" height="156" rx="3" fill="#00695C" opacity="0.22"/>
      {/* Title on cover */}
      <LabelBg x={355} y={68} w={228} h={22} rx={4}/>
      <text x="355" y="67" textAnchor="middle" fontSize="16"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>PD 1067</text>
      <LabelBg x={355} y={92} w={220} h={18} rx={4}/>
      <text x="355" y="91" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Water Code of the</text>
      <LabelBg x={355} y={110} w={200} h={18} rx={4}/>
      <text x="355" y="109" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Philippines</text>
      <LabelBg x={355} y={136} w={200} h={16} rx={3}/>
      <text x="355" y="135" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fill={T_DARK}>December 31, 1976</text>
      {/* Droplet on cover */}
      <ellipse cx={355} cy={168} rx={8} ry={10} fill="#00695C" opacity="0.40"/>
      <path d="M355 158 Q355 153 359 156 Q364 160 355 158Z" fill="#00695C" opacity="0.45"/>
    </svg>
  );
}

// ── Slides 33 / 40 — Appropriation definition ────────────────────────────────
export function IllustrationAppropriation() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Appropriation of waters — definition</title>
      <desc>Acquisition of rights to take or divert water from a natural source for any lawful purpose</desc>
      {/* Water source */}
      <path d="M36 128 Q100 112 164 128 Q228 144 292 128"
            fill="none" stroke="#00695C" strokeWidth="2.5" opacity="0.60"/>
      <path d="M36 140 Q100 124 164 140 Q228 156 292 140"
            fill="none" stroke="#00695C" strokeWidth="1.8" opacity="0.42"/>
      <LabelBg x={164} y={164} w={90} h={15} rx={3}/>
      <text x="164" y="163" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>Natural Source</text>
      {/* Arrow */}
      <path d="M296 134 C330 120 360 108 396 100"
            fill="none" stroke="#00695C" strokeWidth="2" strokeDasharray="6 3"/>
      <polygon points="396,95 410,100 396,105" fill="#00695C" opacity="0.70"/>
      <LabelBg x={345} y={110} w={80} h={14} rx={3}/>
      <text x="345" y="109" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>Taking / Diversion</text>
      {/* Uses box */}
      <rect x="418" y="40" width="228" height="120" rx="8"
            fill="#E8F5E9" stroke="#00695C" strokeWidth="1.5"/>
      <LabelBg x={532} y={62} w={100} h={17} rx={4}/>
      <text x="532" y="61" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Beneficial Uses</text>
      {["Domestic","Municipal","Irrigation","Industrial","Power Generation"].map((u,i)=>(
        <g key={i}>
          <circle cx={438} cy={80+i*18} r={4} fill="#00695C" opacity="0.50"/>
          <LabelBg x={552} y={80+i*18+4} w={160} h={13} rx={2}/>
          <text x="552" y={79+i*18+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{u}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 38 — Article 6 Domestic Use ────────────────────────────────────────
export function IllustrationDomesticUse() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Article 6 — domestic water use without a permit</title>
      <desc>Landowners may use water on their land for domestic purposes without a water permit</desc>
      {/* House */}
      <polygon points="340,22 440,78 440,158 240,158 240,78" fill="#E8F5E9" stroke="#00695C" strokeWidth="1.5"/>
      <polygon points="330,22 450,75 230,75" fill="#2E7D32" opacity="0.55"/>
      {/* Door */}
      <rect x="316" y="116" width="48" height="42" rx="4" fill="#00695C" opacity="0.30"/>
      <circle cx="356" cy="137" r="4" fill="#00695C" opacity="0.55"/>
      {/* Faucet */}
      <rect x="390" y="95" width="36" height="8" rx="3" fill="#1565C0" opacity="0.55"/>
      <rect x="400" y="103" width="16" height="22" rx="3" fill="#1565C0" opacity="0.55"/>
      <path d="M400 124 Q408 136 406 148" fill="none" stroke="#42A5F5" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.65"/>
      {/* Checkmark badge */}
      <rect x="470" y="72" width="166" height="48" rx="8"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={553} y={93} w={130} h={17} rx={4}/>
      <text x="553" y="92" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>No Permit Needed</text>
      <LabelBg x={553} y={113} w={150} h={14} rx={3}/>
      <text x="553" y="112" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>for domestic use on own land</text>
      <LabelBg x={553} y={152} w={180} h={14} rx={3}/>
      <text x="553" y="151" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>Art. 6 · Registration required</text>
    </svg>
  );
}

// ── Slide 39 — Article 7 Cisterns ────────────────────────────────────────────
export function IllustrationCisterns() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Article 7 — cisterns, tanks and pools</title>
      <desc>Persons who capture water by cisterns, tanks or pools have exclusive control over that water</desc>
      {[
        {x:120, label:"Cistern", w:80, h:100, ry:10},
        {x:270, label:"Tank",    w:96, h:80,  ry:6 },
        {x:428, label:"Pool",    w:130,h:56,  ry:28},
      ].map(({x, label, w, h, ry})=>(
        <g key={x}>
          <rect x={x - w/2} y={140 - h} width={w} height={h} rx={ry}
                fill="#E3F2FD" stroke="#00695C" strokeWidth="1.5"/>
          <ellipse cx={x} cy={140 - h + 14} rx={w/2 - 4} ry={8}
                   fill="#1565C0" opacity="0.25"/>
          {/* Rain drops */}
          <ellipse cx={x - 14} cy={140 - h - 18} rx={4} ry={5} fill="#42A5F5" opacity="0.55"/>
          <ellipse cx={x}      cy={140 - h - 26} rx={4} ry={5} fill="#42A5F5" opacity="0.55"/>
          <ellipse cx={x + 14} cy={140 - h - 18} rx={4} ry={5} fill="#42A5F5" opacity="0.55"/>
          <LabelBg x={x} y={160} w={w} h={16} rx={3}/>
          <text x={x} y={159} textAnchor="middle" fontSize="12"
                fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>{label}</text>
        </g>
      ))}
      <rect x="480" y="44" width="172" height="36" rx="8"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={566} y={67} w={160} h={16} rx={3}/>
      <text x="566" y="66" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Exclusive Control</text>
    </svg>
  );
}

// ── Slides 41–43 / 55–60 — Uses of Water ─────────────────────────────────────
export function IllustrationUsesOfWater() {
  const uses = [
    {label:"Domestic",  color:"#1565C0"}, {label:"Municipal", color:"#028090"},
    {label:"Irrigation",color:"#2E7D32"}, {label:"Power Gen", color:"#E65100"},
    {label:"Fisheries", color:"#0288D1"}, {label:"Livestock",  color:"#795548"},
    {label:"Industrial",color:"#455A64"}, {label:"Recreation", color:"#6A1B9A"},
    {label:"Other",     color:"#00695C"},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Uses of water under the Water Code</title>
      <desc>Nine categories of beneficial water use: domestic, municipal, irrigation, power, fisheries, livestock, industrial, recreational, and other</desc>
      {uses.map(({label, color}, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 96 + col * 200;
        const y = 34 + row * 56;
        return (
          <g key={i}>
            <rect x={x - 76} y={y} width={152} height={44} rx={7}
                  fill="white" stroke={color} strokeWidth="1.5"/>
            <rect x={x - 76} y={y} width={24} height={44} rx={7} fill={color} opacity="0.22"/>
            <LabelBg x={x + 24} y={y + 25} w={108} h={16} rx={3}/>
            <text x={x + 24} y={y + 24} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 46 — General Rule & Exception ──────────────────────────────────────
export function IllustrationGeneralRuleException() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Water permit general rule and exception</title>
      <desc>All persons need a water permit except for hand-carried receptacles and bathing/watering animals</desc>
      <rect x="36" y="24" width="278" height="144" rx="10"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="2"/>
      <LabelBg x={175} y={50} w={130} h={18} rx={4}/>
      <text x="175" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>General Rule</text>
      <LabelBg x={175} y={95} w={250} h={15} rx={3}/>
      <text x="175" y="94" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>All persons MUST have a</text>
      <LabelBg x={175} y={113} w={200} h={18} rx={3}/>
      <text x="175" y="112" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Water Permit</text>
      <LabelBg x={175} y={134} w={230} h={14} rx={3}/>
      <text x="175" y="133" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>including gov't instrumentalities</text>
      <rect x="366" y="24" width="278" height="144" rx="10"
            fill="#FFF8E1" stroke="#F57F17" strokeWidth="2"/>
      <LabelBg x={505} y={50} w={130} h={18} rx={4}/>
      <text x="505" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Exception</text>
      {["Hand-carried receptacles","Bathing / washing","Watering farm animals","Navigation (floatation)"].map((e,i)=>(
        <g key={i}>
          <circle cx={386} cy={76+i*22} r={4} fill="#F57F17" opacity="0.55"/>
          <LabelBg x={530} y={76+i*22+4} w={230} h={13} rx={2}/>
          <text x="530" y={75+i*22+4} textAnchor="middle" fontSize="10.5"
                fontFamily="sans-serif" fill={T_DARK}>{e}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 47–48 — Utilization of Waters ─────────────────────────────────────
export function IllustrationUtilization() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Utilization of waters — principles</title>
      <desc>Multiple use, security of state, beneficial effects, and adverse effects must be considered</desc>
      {[
        {x:90,  y:60,  label:"Security\nof State",  color:"#1565C0"},
        {x:230, y:60,  label:"Multiple\nUse",       color:"#028090"},
        {x:370, y:60,  label:"Beneficial\nEffects", color:"#2E7D32"},
        {x:510, y:60,  label:"Adverse\nEffects",    color:"#b71c1c"},
        {x:620, y:60,  label:"Cost of\nDevelopment",color:"#E65100"},
      ].map(({x,y,label,color})=>(
        <g key={x}>
          <path d={`M${x} ${y+28} L${x-28} ${y+78} L${x+28} ${y+78} Z`}
                fill={color} opacity="0.18" stroke={color} strokeWidth="1.2"/>
          <circle cx={x} cy={y} r={24} fill={color} opacity="0.14" stroke={color} strokeWidth="1.5"/>
          {label.split("\n").map((l,j)=>(
            <g key={j}>
              <LabelBg x={x} y={y+j*15+5} w={96} h={14} rx={3}/>
              <text x={x} y={y+j*15+4} textAnchor="middle" fontSize="10"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
          <LabelBg x={x} y={y+96} w={90} h={14} rx={3}/>
        </g>
      ))}
      <LabelBg x={340} y={175} w={400} h={15} rx={3}/>
      <text x="340" y="174" textAnchor="middle" fontSize="10.5"
            fontFamily="sans-serif" fill={T_TEAL}>Development of water resources shall consider all factors above</text>
    </svg>
  );
}

// ── Slide 49 — Control of Waters ─────────────────────────────────────────────
export function IllustrationControlWaters() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Control of waters — flood management and river regulations</title>
      <desc>Government may build flood control structures and regulate riverbed cultivation</desc>
      {/* River */}
      <path d="M0 115 Q100 102 200 115 Q300 128 400 115 Q500 102 600 115 Q640 118 680 115"
            fill="none" stroke="#1565C0" strokeWidth="3" opacity="0.45"/>
      <path d="M0 128 Q100 115 200 128 Q300 141 400 128 Q500 115 600 128 L680 128"
            fill="none" stroke="#1565C0" strokeWidth="2" opacity="0.32"/>
      {/* Flood control structure */}
      <rect x="296" y="88" width="88" height="60" rx="3" fill="#455A64" opacity="0.30"
            stroke="#455A64" strokeWidth="1.5"/>
      <line x1="320" y1="88" x2="320" y2="148" stroke="#455A64" strokeWidth="1" opacity="0.45"/>
      <line x1="344" y1="88" x2="344" y2="148" stroke="#455A64" strokeWidth="1" opacity="0.45"/>
      <line x1="368" y1="88" x2="368" y2="148" stroke="#455A64" strokeWidth="1" opacity="0.45"/>
      <LabelBg x={340} y={162} w={130} h={15} rx={3}/>
      <text x="340" y="161" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="600" fill={T_DARK}>Flood Control Structure</text>
      {/* Easement zones */}
      <rect x="44" y="148" width="96" height="26" rx="5" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>
      <LabelBg x={92} y={166} w={90} h={14} rx={3}/>
      <text x="92" y="165" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>Urban: 3m</text>
      <rect x="160" y="148" width="106" height="26" rx="5" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>
      <LabelBg x={213} y={166} w={100} h={14} rx={3}/>
      <text x="213" y="165" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>Agricultural: 20m</text>
      <rect x="490" y="148" width="106" height="26" rx="5" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>
      <LabelBg x={543} y={166} w={100} h={14} rx={3}/>
      <text x="543" y="165" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="600" fill={T_GREEN}>Forest: 40m</text>
    </svg>
  );
}

// ── Slide 50 — Other Provisions ──────────────────────────────────────────────
export function IllustrationOtherProvisions() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Other provisions of the Water Code — Articles 11, 12 and 15</title>
      <desc>State can exempt waters from appropriation; change of use requires approval; only Filipino citizens may apply</desc>
      {[
        {art:"Art. 11", text:"State may exempt\nwaters from\nappropriation", color:"#00695C"},
        {art:"Art. 12", text:"Change of use\nneeds Council\napproval",       color:"#1565C0"},
        {art:"Art. 15", text:"Only Filipino\ncitizens may apply\nfor water permits", color:"#2E7D32"},
      ].map(({art, text, color}, i)=>(
        <g key={i}>
          <rect x={46 + i*210} y={28} width={188} height={136} rx={10}
                fill="white" stroke={color} strokeWidth="1.5"/>
          <rect x={46 + i*210} y={28} width={188} height={32} rx={10} fill={color} opacity="0.18"/>
          <LabelBg x={140 + i*210} y={50} w={80} h={17} rx={4}/>
          <text x={140 + i*210} y={49} textAnchor="middle" fontSize="13"
                fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{art}</text>
          {text.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={140 + i*210} y={84+j*22} w={176} h={18} rx={3}/>
              <text x={140 + i*210} y={83+j*22} textAnchor="middle" fontSize="12"
                    fontFamily="sans-serif" fontWeight={j===0?"700":"400"} fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slide 51 — Beneficial Use ─────────────────────────────────────────────────
export function IllustrationBeneficialUse() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Article 20 — beneficial use as measure and limit of water appropriation</title>
      <desc>The right amount of water at the right time for the right purpose defines beneficial use</desc>
      {/* Scale */}
      <line x1="340" y1="40" x2="340" y2="80" stroke="#00695C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="200" y1="80" x2="480" y2="80" stroke="#00695C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="200" y1="80" x2="200" y2="116" stroke="#00695C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="480" y1="80" x2="480" y2="116" stroke="#00695C" strokeWidth="2" strokeLinecap="round"/>
      <rect x="164" y="116" width="72" height="36" rx="6" fill="#E8F5E9" stroke="#00695C" strokeWidth="1.5"/>
      <LabelBg x={200} y={131} w={60} h={14} rx={3}/>
      <text x="200" y="130" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Right</text>
      <LabelBg x={200} y={146} w={62} h={14} rx={3}/>
      <text x="200" y="145" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_TEAL}>Amount</text>
      <rect x="444" y="116" width="72" height="36" rx="6" fill="#E8F5E9" stroke="#00695C" strokeWidth="1.5"/>
      <LabelBg x={480} y={131} w={60} h={14} rx={3}/>
      <text x="480" y="130" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Right</text>
      <LabelBg x={480} y={146} w={62} h={14} rx={3}/>
      <text x="480" y="145" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_TEAL}>Period</text>
      <LabelBg x={340} y={34} w={56} h={18} rx={4}/>
      <text x="340" y="33" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Art. 20</text>
      <LabelBg x={340} y={175} w={300} h={16} rx={3}/>
      <text x="340" y="174" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Beneficial Use = Measure &amp; Limit</text>
    </svg>
  );
}

// ── Slides 52–53 — Articles 25 & 39 ──────────────────────────────────────────
export function IllustrationArticles() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Articles 25 and 39 — easements and construction approvals</title>
      <desc>Water permit holders may establish easements; construction plans need government approval</desc>
      <rect x="36" y="24" width="278" height="144" rx="10"
            fill="#E8F5E9" stroke="#00695C" strokeWidth="1.5"/>
      <LabelBg x={175} y={50} w={100} h={18} rx={4}/>
      <text x="175" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Art. 25</text>
      <LabelBg x={175} y={70} w={210} h={16} rx={3}/>
      <text x="175" y="69" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Easements for Permit Holders</text>
      {["Must own the land","Most convenient route","Least onerous to\nservient estate"].map((l,i)=>(
        <g key={i}>
          <circle cx={60} cy={94+i*26} r={5} fill="#00695C" opacity="0.50"/>
          {l.split("\n").map((part, j)=>(
            <g key={j}>
              <LabelBg x={200} y={94+i*26+j*14+4} w={220} h={13} rx={2}/>
              <text x="200" y={93+i*26+j*14+4} textAnchor="middle" fontSize="11"
                    fontFamily="sans-serif" fill={T_DARK}>{part}</text>
            </g>
          ))}
        </g>
      ))}
      <rect x="366" y="24" width="278" height="144" rx="10"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={505} y={50} w={100} h={18} rx={4}/>
      <text x="505" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Art. 39</text>
      <LabelBg x={505} y={70} w={200} h={16} rx={3}/>
      <text x="505" y="69" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Construction Approval</text>
      {["Diversion dams","Water power structures","Groundwater installations","Other water structures"].map((l,i)=>(
        <g key={i}>
          <circle cx={390} cy={94+i*24} r={5} fill="#1565C0" opacity="0.50"/>
          <LabelBg x={540} y={94+i*24+4} w={230} h={13} rx={2}/>
          <text x="540" y={93+i*24+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 54 — Articles 76 & 79 ──────────────────────────────────────────────
export function IllustrationArticles76_79() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Articles 76 and 79 of the Water Code</title>
      <desc>Article 76 covers cemetery and waste disposal near water sources; Article 79 vests enforcement in NWRB</desc>
      <rect x="36" y="24" width="280" height="144" rx="10"
            fill="#FFF8E1" stroke="#F57F17" strokeWidth="1.5"/>
      <LabelBg x={176} y={50} w={100} h={18} rx={4}/>
      <text x="176" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Art. 76</text>
      <LabelBg x={176} y={72} w={240} h={16} rx={3}/>
      <text x="176" y="71" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Cemeteries &amp; Waste Disposal</text>
      <LabelBg x={176} y={100} w={250} h={14} rx={3}/>
      <text x="176" y="99" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>Must not affect water supply sources</text>
      <LabelBg x={176} y={118} w={250} h={14} rx={3}/>
      <text x="176" y="117" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>Subject to DOH rules &amp; regulations</text>
      <rect x="364" y="24" width="280" height="144" rx="10"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={504} y={50} w={100} h={18} rx={4}/>
      <text x="504" y="49" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Art. 79</text>
      <LabelBg x={504} y={72} w={240} h={16} rx={3}/>
      <text x="504" y="71" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Enforcement Authority</text>
      <LabelBg x={504} y={100} w={250} h={14} rx={3}/>
      <text x="504" y="99" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>Vested in the NWRB Council</text>
      <LabelBg x={504} y={118} w={250} h={14} rx={3}/>
      <text x="504" y="117" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}>Grants permits · imposes penalties</text>
    </svg>
  );
}

// ── Slides 61–65 — Water Permit Requirements ─────────────────────────────────
export function IllustrationWPARequirements() {
  const docs = ["Proof of Ownership","Certificate of Registration","Vicinity Map","Well Drilling Data","ECC / Non-Coverage","Other Requirements"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Documentary requirements for water permit application</title>
      <desc>Six key document types required for a water permit application submitted to NWRB</desc>
      {docs.map((d, i)=>{
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 96 + col * 200;
        const y = 26 + row * 88;
        return (
          <g key={i}>
            <rect x={x - 82} y={y} width={164} height={68} rx={8}
                  fill="white" stroke="#2E7D32" strokeWidth="1.5"/>
            <rect x={x - 82} y={y} width={164} height={20} rx={8} fill="#2E7D32" opacity="0.15"/>
            {/* Document icon */}
            <rect x={x - 64} y={y + 26} width={28} height={34} rx={3}
                  fill="#2E7D32" opacity="0.20" stroke="#2E7D32" strokeWidth="1"/>
            <line x1={x-58} y1={y+34} x2={x-44} y2={y+34} stroke="#2E7D32" strokeWidth="1" opacity="0.45"/>
            <line x1={x-58} y1={y+41} x2={x-40} y2={y+41} stroke="#2E7D32" strokeWidth="1" opacity="0.35"/>
            <LabelBg x={x + 16} y={y + 42} w={128} h={28} rx={3}/>
            <text x={x + 16} y={y + 38} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>{d.length > 20 ? d.slice(0,20)+"…" : d}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 66–67 — Water Resources Allocation ──────────────────────────────────
export function IllustrationWaterAllocation() {
  const bars = [
    {label:"Irrigation",   pct:78.4, color:"#2E7D32"},
    {label:"Industrial",   pct:11.3, color:"#1565C0"},
    {label:"Dom / Munic",  pct:8.5,  color:"#028090"},
    {label:"Others",       pct:1.9,  color:"#E65100"},
  ];
  const maxW = 360;
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Water resources allocated by purpose</title>
      <desc>Irrigation dominates at 78% of total water allocation; industrial 11%; domestic/municipal 8%; others 2%</desc>
      {bars.map(({label, pct, color}, i)=>{
        const y = 36 + i * 38;
        const w = (pct / 100) * maxW;
        return (
          <g key={i}>
            <LabelBg x={106} y={y + 14} w={118} h={15} rx={3}/>
            <text x="106" y={y + 13} textAnchor="end" fontSize="12"
                  fontFamily="sans-serif" fontWeight="600" fill={T_DARK}>{label}</text>
            <rect x={114} y={y} width={maxW} height={26} rx={5}
                  fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1"/>
            <rect x={114} y={y} width={w} height={26} rx={5} fill={color} opacity="0.70"/>
            <LabelBg x={114 + w + 34} y={y + 17} w={54} h={15} rx={3}/>
            <text x={114 + w + 10} y={y + 16} textAnchor="start" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{pct}%</text>
          </g>
        );
      })}
      <LabelBg x={340} y={178} w={300} h={14} rx={3}/>
      <text x="340" y="177" textAnchor="middle" fontSize="10.5"
            fontFamily="sans-serif" fill={T_DARK}>As of December 2016 · 21,961 water right grantees</text>
    </svg>
  );
}

// ── Slide 68 — When Water Permit Must Be Secured ─────────────────────────────
export function IllustrationWhenPermit() {
  const items = ["Appropriation\nfor any purpose","Change in\npurpose","Amend\nexisting permit","Transfer / Lease","Temporary\npermit","Recreational\ndevelopment"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Instances when a water permit must be secured from NWRB</title>
      <desc>Seven scenarios requiring a water permit application to the NWRB board</desc>
      {items.map((label, i)=>{
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 96 + col * 200;
        const y = 26 + row * 90;
        return (
          <g key={i}>
            <circle cx={x} cy={y + 32} r={32} fill="#2E7D32" opacity="0.10"
                    stroke="#2E7D32" strokeWidth="1.5"/>
            <circle cx={x} cy={y + 32} r={18} fill="#2E7D32" opacity="0.18"/>
            <LabelBg x={x} y={y + 30} w={28} h={18} rx={3}/>
            <text x={x} y={y + 29} textAnchor="middle" fontSize="14"
                  fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>{i+1}</text>
            {label.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={x} y={y + 76 + j*16} w={140} h={15} rx={3}/>
                <text x={x} y={y + 75 + j*16} textAnchor="middle" fontSize="10.5"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 69–72 — Qualifications & Submission ───────────────────────────────
export function IllustrationQualifications() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Qualifications of water permit applicants</title>
      <desc>Filipino citizens, registered corporations with 60% Filipino ownership, and government entities may apply</desc>
      {[
        {x:130, label:"Filipino\nCitizens",       color:"#1565C0", icon:"🇵🇭"},
        {x:340, label:"60% Filipino\nCorporations",color:"#2E7D32", icon:"🏢"},
        {x:550, label:"Gov't\nInstrumentalities", color:"#028090", icon:"🏛"},
      ].map(({x, label, color, icon})=>(
        <g key={x}>
          <rect x={x - 90} y={28} width={180} height={120} rx={10}
                fill="white" stroke={color} strokeWidth="1.5"/>
          <rect x={x - 90} y={28} width={180} height={28} rx={10} fill={color} opacity="0.18"/>
          <text x={x} y={60} textAnchor="middle" fontSize="28"
                fontFamily="sans-serif">{icon}</text>
          {label.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={x} y={102 + j*20} w={160} h={18} rx={3}/>
              <text x={x} y={101 + j*20} textAnchor="middle" fontSize="13"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slides 73–76 — CWP Process ────────────────────────────────────────────────
export function IllustrationCWPProcess() {
  const steps = ["Submit WPA","Evaluate","Post 15 days","Investigate","Issue CWP"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Conditional water permit process flow</title>
      <desc>Five-step process from WPA submission to issuance of a conditional water permit</desc>
      {steps.map((s, i)=>{
        const x = 64 + i * 140;
        const color = `hsl(${170 + i*20}, 55%, ${38+i*3}%)`;
        return (
          <g key={i}>
            {i > 0 && (
              <line x1={x - 76} y1={88} x2={x - 18} y2={88}
                    stroke="#028090" strokeWidth="2" strokeDasharray="4 3"
                    opacity="0.50"/>
            )}
            <circle cx={x} cy={88} r={32} fill={color} opacity="0.15"
                    stroke={color} strokeWidth="1.5"/>
            <circle cx={x} cy={88} r={20} fill={color} opacity="0.22"/>
            <LabelBg x={x} y={84} w={22} h={18} rx={3}/>
            <text x={x} y={83} textAnchor="middle" fontSize="14"
                  fontFamily="sans-serif" fontWeight="700" fill="#1b5e20">{i+1}</text>
            <LabelBg x={x} y={138} w={100} h={16} rx={3}/>
            <text x={x} y={137} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 77–79 — CWP Conditions ────────────────────────────────────────────
export function IllustrationCWPConditions() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Conditional water permit conditions</title>
      <desc>Grantee must accept CWP in writing, submit plans within 1 year, pay annual charges, and submit quarterly records</desc>
      {[
        {label:"Accept in Writing",      detail:"Upon receipt of CWP", color:"#2E7D32"},
        {label:"Submit Plans",           detail:"Within 1 year",       color:"#1565C0"},
        {label:"Install Water Meters",   detail:"NWRB-sealed devices", color:"#028090"},
        {label:"Annual Water Charges",   detail:"Pay during CWP validity",color:"#0A7C6E"},
        {label:"Quarterly Records",      detail:"Water withdrawal log",color:"#558B2F"},
      ].map(({label, detail, color}, i)=>{
        const y = 22 + i * 34;
        return (
          <g key={i}>
            <rect x={40} y={y} width={600} height={28} rx={6}
                  fill="white" stroke={color} strokeWidth="1.2" opacity="0.80"/>
            <rect x={40} y={y} width={8} height={28} rx={4} fill={color} opacity="0.60"/>
            <LabelBg x={240} y={y + 16} w={320} h={16} rx={3}/>
            <text x="240" y={y + 15} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{label}</text>
            <LabelBg x={490} y={y + 16} w={180} h={15} rx={3}/>
            <text x="490" y={y + 15} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fill={T_TEAL}>{detail}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 81–83 — CPC Qualifications & Requirements ─────────────────────────
export function IllustrationCPCRequirements() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>CPC qualifications and documentary requirements</title>
      <desc>Applicants must be Filipino citizens or 60% Filipino corporations with valid water permits</desc>
      <rect x="36" y="18" width="280" height="156" rx="10"
            fill="#F9FBE7" stroke="#558B2F" strokeWidth="1.5"/>
      <LabelBg x={176} y={44} w={180} h={18} rx={4}/>
      <text x="176" y="43" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Qualifications</text>
      {["Filipino citizen\n(or 60% Filipino corp)","Technically capable","Promotes public interest","Holds a water permit"].map((l,i)=>(
        <g key={i}>
          {l.split("\n").map((part, j)=>(
            <g key={j}>
              {j===0 && <circle cx={58} cy={68+i*28} r={5} fill="#558B2F" opacity="0.55"/>}
              <LabelBg x={192} y={68+i*28+j*14+4} w={230} h={13} rx={2}/>
              <text x="192" y={67+i*28+j*14+4} textAnchor="middle" fontSize="11"
                    fontFamily="sans-serif" fill={T_DARK}>{part}</text>
            </g>
          ))}
        </g>
      ))}
      <rect x="364" y="18" width="280" height="156" rx="10"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={504} y={44} w={180} h={18} rx={4}/>
      <text x="504" y="43" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Key Documents</text>
      {["Articles of Incorporation","Approved Water Permit","Certificate of Potability","Distribution System Plan","Asset inventory"].map((l,i)=>(
        <g key={i}>
          <circle cx={384} cy={68+i*24} r={5} fill="#2E7D32" opacity="0.55"/>
          <LabelBg x={534} y={68+i*24+4} w={240} h={13} rx={2}/>
          <text x="534" y={67+i*24+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slide 86 — Other CPC Petitions ───────────────────────────────────────────
export function IllustrationCPCPetitions() {
  const items = ["Validity Extension","Tariff Adjustment","Sale / Transfer","Donation","Extension of Service","Asset Re-appraisal"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Other CPC-related applications and petitions filed before NWRB</title>
      <desc>Six additional CPC-related filings: extensions, tariff adjustments, transfers, donations, and service expansions</desc>
      {items.map((label, i)=>{
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 96 + col * 200;
        const y = 26 + row * 88;
        return (
          <g key={i}>
            <rect x={x - 82} y={y} width={164} height={66} rx={8}
                  fill="white" stroke="#558B2F" strokeWidth="1.5"/>
            <rect x={x - 82} y={y} width={164} height={18} rx={8} fill="#558B2F" opacity="0.18"/>
            <LabelBg x={x} y={y + 50} w={150} h={16} rx={3}/>
            <text x={x} y={y + 49} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>{label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 87 — NWRB Standard Rules ───────────────────────────────────────────
export function IllustrationNWRBRules() {
  const rules = ["Adequate &\ncontinuous service","Approved\nwater rates","Chlorination","Monthly Bact.\nTest","Annual Report\nby May 30","CPC valid\n5 years"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>NWRB standard rules and regulations for waterworks operation</title>
      <desc>Ten operational standards that CPC holders must comply with</desc>
      {rules.map((label, i)=>{
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 96 + col * 200;
        const y = 18 + row * 88;
        return (
          <g key={i}>
            <circle cx={x} cy={y + 30} r={28} fill="#558B2F" opacity="0.12"
                    stroke="#558B2F" strokeWidth="1.5"/>
            {label.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={x} y={y + 60 + j * 18} w={140} h={16} rx={3}/>
                <text x={x} y={y + 59 + j * 18} textAnchor="middle" fontSize="11"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 88 — Regular Reporting ─────────────────────────────────────────────
export function IllustrationRegularReporting() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Regular reporting requirements for CPC holders</title>
      <desc>Annual report, monthly bacteriological test, annual physical-chemical test, and five-year performance audit</desc>
      {[
        {label:"Annual Report",      freq:"Every year\nby May 30",    color:"#558B2F"},
        {label:"Bacteriological Test",freq:"Monthly",                  color:"#2E7D32"},
        {label:"Phys. & Chem. Test", freq:"Annually",                  color:"#028090"},
        {label:"Performance Audit",  freq:"Every 5 years",             color:"#1565C0"},
      ].map(({label, freq, color}, i)=>{
        const x = 80 + i * 158;
        return (
          <g key={i}>
            <rect x={x - 58} y={32} width={116} height={126} rx={8}
                  fill="white" stroke={color} strokeWidth="1.5"/>
            <rect x={x - 58} y={32} width={116} height={28} rx={8} fill={color} opacity="0.18"/>
            <circle cx={x} cy={100} r={24} fill={color} opacity="0.12"
                    stroke={color} strokeWidth="1"/>
            <LabelBg x={x} y={96} w={44} h={18} rx={4}/>
            <text x={x} y={95} textAnchor="middle" fontSize="13"
                  fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>{i+1}</text>
            <LabelBg x={x} y={50} w={108} h={14} rx={3}/>
            <text x={x} y={49} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{label}</text>
            {freq.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={x} y={132 + j*17} w={108} h={15} rx={3}/>
                <text x={x} y={131 + j*17} textAnchor="middle" fontSize="11"
                      fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slide 89 — Advantages of CPC ─────────────────────────────────────────────
export function IllustrationCPCAdvantages() {
  const advs = [
    {label:"Legal\nOperation",    color:"#558B2F"},
    {label:"Investment\nRecovery",color:"#2E7D32"},
    {label:"Depreciation\nReserve Fund",color:"#028090"},
    {label:"Consumer\nProtection",color:"#1565C0"},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Advantages of holding a Certificate of Public Convenience</title>
      <desc>Four key benefits: legal status, investment recovery, reserve fund, and consumer protection</desc>
      <circle cx="340" cy="90" r="40" fill="#558B2F" opacity="0.14" stroke="#558B2F" strokeWidth="1.5"/>
      <LabelBg x={340} y={86} w={42} h={17} rx={4}/>
      <text x="340" y="85" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>CPC</text>
      <LabelBg x={340} y={104} w={68} h={16} rx={3}/>
      <text x="340" y="103" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_GREEN}>Benefits</text>
      {advs.map(({label, color}, i)=>{
        const angles = [-135, -45, 45, 135];
        const r = (Math.PI * angles[i]) / 180;
        const cx = 340 + Math.cos(r)*110;
        const cy = 90 + Math.sin(r)*80;
        return (
          <g key={i}>
            <line x1={340+Math.cos(r)*42} y1={90+Math.sin(r)*42}
                  x2={cx - Math.cos(r)*36} y2={cy - Math.sin(r)*26}
                  stroke={color} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.50"/>
            <rect x={cx-60} y={cy-28} width={120} height={52} rx={8}
                  fill="white" stroke={color} strokeWidth="1.5"/>
            {label.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={cx} y={cy - 8 + j*18} w={110} h={16} rx={3}/>
                <text x={cx} y={cy - 9 + j*18} textAnchor="middle" fontSize="12"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 90–93 — Water Issues ───────────────────────────────────────────────
export function IllustrationWaterIssues() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Key water resource issues in the Philippines</title>
      <desc>Deteriorating water quality, climate change threats, sectoral approach, and lack of updated science-based data</desc>
      {[
        {x:90,  label:"Water\nQuality",      color:"#b71c1c", icon:"⚠"},
        {x:240, label:"Climate\nChange",     color:"#E65100", icon:"🌡"},
        {x:390, label:"Sectoral\nApproach",  color:"#4A148C", icon:"⚡"},
        {x:540, label:"Data\nGaps",          color:"#1565C0", icon:"📊"},
      ].map(({x, label, color, icon})=>(
        <g key={x}>
          <rect x={x - 62} y={28} width={124} height={132} rx={10}
                fill="white" stroke={color} strokeWidth="1.5"/>
          <rect x={x - 62} y={28} width={124} height={28} rx={10} fill={color} opacity="0.15"/>
          <text x={x} y={82} textAnchor="middle" fontSize="30"
                fontFamily="sans-serif">{icon}</text>
          {label.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={x} y={116 + j*18} w={112} h={16} rx={3}/>
              <text x={x} y={115 + j*18} textAnchor="middle" fontSize="13"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slides 119–122 — Pollution and Climate ────────────────────────────────────
export function IllustrationPollution() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Groundwater contamination, surface water pollution and deforestation</title>
      <desc>Multiple threats: industrial leaching, dumping, erosion, and sedimentation affect water quality</desc>
      {/* River/ground cross section */}
      <rect x="0" y="128" width="680" height="64" fill="#4A7C59" opacity="0.14"/>
      <path d="M0 128 Q100 118 200 128 Q300 138 400 128 Q500 118 600 128 L680 130 L680 192 L0 192 Z"
            fill="#4A7C59" opacity="0.10"/>
      {/* Contamination plumes */}
      <ellipse cx="130" cy="158" rx="55" ry="18" fill="#b71c1c" opacity="0.18"/>
      <LabelBg x={130} y={155} w={100} h={14} rx={3}/>
      <text x="130" y="154" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={T_RED}>Groundwater Contam.</text>
      {/* Factory */}
      <rect x="240" y="80" width="60" height="44" fill="#455A64" opacity="0.35"/>
      <rect x="248" y="70" width="12" height="20" fill="#455A64" opacity="0.50"/>
      <rect x="268" y="64" width="12" height="26" fill="#455A64" opacity="0.50"/>
      <path d="M248 70 Q254 50 256 42 Q258 50 264 70"
            fill="#b0bec5" opacity="0.40"/>
      <path d="M268 64 Q274 44 276 36 Q278 44 284 64"
            fill="#b0bec5" opacity="0.40"/>
      {/* Waste arrow to river */}
      <line x1="300" y1="124" x2="340" y2="132"
            stroke="#b71c1c" strokeWidth="2" strokeDasharray="4 2" opacity="0.55"/>
      {/* Deforestation */}
      <line x1="480" y1="40" x2="480" y2="128"
            stroke="#795548" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
      <line x1="460" y1="45" x2="500" y2="45" stroke="#b71c1c" strokeWidth="2"
            opacity="0.55"/>
      <line x1="457" y1="52" x2="503" y2="52" stroke="#b71c1c" strokeWidth="1.5"
            opacity="0.45"/>
      <LabelBg x={480} y={26} w={100} h={14} rx={3}/>
      <text x="480" y="25" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={T_RED}>Deforestation</text>
      {/* Sediment */}
      <path d="M430 128 Q470 118 510 128 Q550 138 570 128"
            fill="none" stroke="#795548" strokeWidth="2.5" opacity="0.50"/>
      <LabelBg x={505} y={154} w={100} h={14} rx={3}/>
      <text x="505" y="153" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Sedimentation</text>
    </svg>
  );
}

export function IllustrationClimateChange() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Climate change impacts on Philippine water resources</title>
      <desc>Increased storms, drought, sea level rise, and saltwater intrusion threaten water availability and quality</desc>
      {/* Storm cloud */}
      <ellipse cx="150" cy="60" rx="50" ry="28" fill="#37474F" opacity="0.40"/>
      <ellipse cx="110" cy="72" rx="30" ry="22" fill="#455A64" opacity="0.38"/>
      <ellipse cx="186" cy="68" rx="28" ry="18" fill="#455A64" opacity="0.35"/>
      {[118,134,150,166].map((x,i)=>(
        <line key={i} x1={x} y1={88} x2={x-6} y2={110}
              stroke="#1565C0" strokeWidth="2" strokeLinecap="round" opacity="0.60"/>
      ))}
      <LabelBg x={150} y={130} w={90} h={15} rx={3}/>
      <text x="150" y="129" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>La Niña Storms</text>
      {/* Sun / drought */}
      <circle cx="340" cy="68" r="28" fill="#F57F17" opacity="0.30" stroke="#F57F17" strokeWidth="1.5"/>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const r = Math.PI * deg / 180;
        return <line key={i} x1={340+Math.cos(r)*32} y1={68+Math.sin(r)*32}
                     x2={340+Math.cos(r)*42} y2={68+Math.sin(r)*42}
                     stroke="#F57F17" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>;
      })}
      <LabelBg x={340} y={118} w={100} h={15} rx={3}/>
      <text x="340" y="117" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>El Niño Drought</text>
      {/* Sea level rise */}
      <path d="M470 128 Q530 114 590 128 Q640 135 680 128 L680 192 L470 192 Z"
            fill="#1565C0" opacity="0.22"/>
      <path d="M460 120 Q520 108 580 120 Q640 130 680 122"
            fill="none" stroke="#1565C0" strokeWidth="2" opacity="0.55"/>
      <LabelBg x={565} y={170} w={120} h={15} rx={3}/>
      <text x="565" y="169" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Sea Level Rise</text>
    </svg>
  );
}

// ── Slides 95–96 — Water Stressed Cities / What is monitored ─────────────────
export function IllustrationWaterManagement() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Why manage water resources — water-stressed cities</title>
      <desc>Nine Philippine cities identified as water-stressed requiring integrated management</desc>
      {/* Simplified PH map background */}
      <path d="M220 26 Q240 18 250 36 Q258 52 250 70 Q242 86 250 102 Q258 118 248 134 Q236 150 224 136 Q208 118 204 98 Q198 76 206 56 Q214 38 220 26 Z"
            fill="#1565C0" opacity="0.12" stroke="#1565C0" strokeWidth="1"/>
      {/* Warning pins */}
      {[
        {x:296, y:68,  city:"Baguio"},
        {x:316, y:96,  city:"Angeles"},
        {x:328, y:112, city:"Metro Manila"},
        {x:296, y:124, city:"Iloilo"},
        {x:320, y:140, city:"Cebu"},
        {x:336, y:158, city:"Davao"},
      ].map(({x, y, city})=>(
        <g key={city}>
          <circle cx={x} cy={y} r={5} fill="#b71c1c" opacity="0.65"/>
          <LabelBg x={x + 44} y={y + 4} w={80} h={14} rx={3}/>
          <text x={x + 44} y={y + 3} textAnchor="start" fontSize="10"
                fontFamily="sans-serif" fontWeight="600" fill={T_RED}>{city}</text>
        </g>
      ))}
      <rect x="440" y="30" width="202" height="132" rx="8"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={541} y={54} w={170} h={18} rx={4}/>
      <text x="541" y="53" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>IWRM Solution</text>
      {["Coordinated planning","Integrated data","Multi-sector approach","Sustainable allocation"].map((l,i)=>(
        <g key={i}>
          <circle cx={458} cy={76+i*24} r={4} fill="#1565C0" opacity="0.50"/>
          <LabelBg x={556} y={76+i*24+4} w={180} h={13} rx={2}/>
          <text x="556" y={75+i*24+4} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 97–100 — Surface Water Sources ────────────────────────────────────
export function IllustrationSurfaceWater() {
  const sources = ["Diversion Dam","River","Dam Reservoir","SWIP","Creek","Fish Ponds","Irrigation Canal"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Surface water sources being monitored</title>
      <desc>Seven types of surface water sources: diversion dams, rivers, reservoirs, SWIPs, creeks, fish ponds, and irrigation canals</desc>
      {/* River backbone */}
      <path d="M0 128 Q80 114 160 128 Q240 142 320 128 Q400 114 480 128 Q560 142 680 128"
            fill="none" stroke="#0288D1" strokeWidth="3" opacity="0.40"/>
      {sources.map((s, i)=>{
        const x = 44 + i * 88;
        return (
          <g key={i}>
            <rect x={x - 34} y={28} width={68} height={80} rx={6}
                  fill="white" stroke="#0288D1" strokeWidth="1.2"/>
            <rect x={x - 34} y={28} width={68} height={18} rx={6} fill="#0288D1" opacity="0.20"/>
            <line x1={x} y1={108} x2={x} y2={124}
                  stroke="#0288D1" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.45"/>
            <LabelBg x={x} y={80} w={62} h={27} rx={3}/>
            <text x={x} y={75} textAnchor="middle" fontSize="9.5"
                  fontFamily="sans-serif" fontWeight="700" fill={T_DARK}
                  style={{whiteSpace:"pre"}}>{s.replace(" ","\n")}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 99–100 — Groundwater / Spring ─────────────────────────────────────
export function IllustrationGroundwater() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Groundwater sources being monitored</title>
      <desc>Three groundwater source types: deepwell, spring, and shallow tubewell</desc>
      {/* Cross section */}
      <rect x="0" y="120" width="680" height="72" fill="#4A7C59" opacity="0.14"/>
      <path d="M0 120 Q160 112 340 120 Q520 128 680 120"
            fill="none" stroke="#4A7C59" strokeWidth="1.5" opacity="0.35"/>
      {/* Deepwell */}
      <rect x="90" y="40" width="16" height="108" rx="4" fill="#455A64" opacity="0.45"/>
      <line x1="82" y1="40" x2="114" y2="40" stroke="#455A64" strokeWidth="3" strokeLinecap="round" opacity="0.50"/>
      <ellipse cx="98" cy="152" rx="20" ry="8" fill="#0288D1" opacity="0.35"/>
      <LabelBg x={98} y={30} w={70} h={15} rx={3}/>
      <text x="98" y="29" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Deepwell</text>
      {/* Spring */}
      <path d="M290 90 Q310 70 318 52 Q324 38 330 30"
            fill="none" stroke="#0288D1" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"/>
      <ellipse cx="290" cy="92" rx="18" ry="8" fill="#0288D1" opacity="0.30"/>
      <LabelBg x={330} y={26} w={56} h={15} rx={3}/>
      <text x="330" y="25" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Spring</text>
      {/* Shallow tubewell */}
      <rect x="532" y="72" width="12" height="72" rx="3" fill="#455A64" opacity="0.40"/>
      <line x1="524" y1="72" x2="556" y2="72" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"/>
      <ellipse cx="538" cy="148" rx="14" ry="6" fill="#0288D1" opacity="0.30"/>
      <LabelBg x={538} y={58} w={110} h={15} rx={3}/>
      <text x="538" y="57" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>Shallow Tubewell</text>
      {/* Underground water table */}
      <path d="M44 148 Q180 138 340 148 Q500 158 636 148"
            fill="none" stroke="#0288D1" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.45"/>
      <LabelBg x={340} y={180} w={120} h={14} rx={3}/>
      <text x="340" y="179" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_BLUE}>Water Table</text>
    </svg>
  );
}

// ── Slides 101–108 — Stream Flow & Monitoring Methods ─────────────────────────
export function IllustrationStreamFlow() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Stream flow measurement using current meter and float methods</title>
      <desc>Current meter and floatation methods used to measure river discharge for water permit compliance</desc>
      {/* River cross section */}
      <path d="M40 120 L40 160 Q120 170 200 162 Q280 155 360 162 Q440 170 520 162 L640 160 L640 120"
            fill="#1565C0" opacity="0.15" stroke="#1565C0" strokeWidth="1.5"/>
      <path d="M40 120 Q120 108 200 116 Q280 124 360 116 Q440 108 520 116 L640 120"
            fill="none" stroke="#1565C0" strokeWidth="2" opacity="0.45"/>
      {/* Measurement rod */}
      <line x1="220" y1="50" x2="220" y2="160" stroke="#455A64" strokeWidth="2.5" strokeLinecap="round"/>
      {[80,96,112,128,144,160].map(y=>(
        <line key={y} x1={212} y1={y} x2={228} y2={y}
              stroke="#455A64" strokeWidth="1.2" opacity="0.60"/>
      ))}
      <circle cx="220" cy="140" r="8" fill="#1565C0" opacity="0.55"/>
      <LabelBg x={220} y={40} w={90} h={16} rx={3}/>
      <text x="220" y="39" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Current Meter</text>
      {/* Float */}
      <ellipse cx="440" cy="114" rx="14" ry="8" fill="#E65100" opacity="0.55"/>
      <line x1="440" y1="106" x2="440" y2="50" stroke="#E65100" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.50"/>
      <LabelBg x={440} y={38} w={80} h={16} rx={3}/>
      <text x="440" y="37" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Float Method</text>
      {/* Formula */}
      <rect x="480" y="44" width="162" height="48" rx="6"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>
      <LabelBg x={561} y={65} w={150} h={17} rx={3}/>
      <text x="561" y="64" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Q = A × V</text>
      <LabelBg x={561} y={84} w={155} h={14} rx={3}/>
      <text x="561" y="83" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill={T_DARK}>Coeff. 0.85 (Float Method)</text>
    </svg>
  );
}

// ── Slides 109–115 — Groundwater Monitoring ───────────────────────────────────
export function IllustrationGroundwaterMonitoring() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Groundwater monitoring methods and equipment</title>
      <desc>Flow meter, volumetric method, water level instrument, and GPS coordinate determination</desc>
      {[
        {x:90,  label:"Flow Meter",       detail:"Production meter\nreading",      color:"#37474F"},
        {x:230, label:"Volumetric\nMethod",detail:"Q = V ÷ t",                     color:"#1565C0"},
        {x:380, label:"Water Level\nInstrument",detail:"Depth measurement",        color:"#028090"},
        {x:528, label:"GPS\nCoordinates", detail:"Location\ndetermination",        color:"#2E7D32"},
      ].map(({x, label, detail, color})=>(
        <g key={x}>
          <rect x={x - 64} y={28} width={128} height={128} rx={8}
                fill="white" stroke={color} strokeWidth="1.5"/>
          <rect x={x - 64} y={28} width={128} height={26} rx={8} fill={color} opacity="0.18"/>
          <circle cx={x} cy={96} r={24} fill={color} opacity="0.12"
                  stroke={color} strokeWidth="1"/>
          {label.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={x} y={44+j*15} w={118} h={14} rx={3}/>
              <text x={x} y={43+j*15} textAnchor="middle" fontSize="11"
                    fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
            </g>
          ))}
          {detail.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={x} y={130+j*18} w={118} h={16} rx={3}/>
              <text x={x} y={129+j*18} textAnchor="middle" fontSize="11"
                    fontFamily="sans-serif" fontWeight="600" fill={T_TEAL}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slide 116 — NWRB Forms ────────────────────────────────────────────────────
export function IllustrationNWRBForms() {
  const forms = ["Notice of\nInspection","Technical\nInspection Rpt","Water Permit\nStatus Rpt","CPC Operation\nReport","Quarterly\nWithdrawal Rpt","Site Verification\nReport","Summary of\nEstablishments"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>NWRB forms required for monitoring</title>
      <desc>Seven NWRB forms used during water source inspection and compliance monitoring</desc>
      {forms.map((f, i)=>{
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 78 + col * 156;
        const y = 18 + row * 94;
        const color = `hsl(${200+i*18}, 55%, ${36+i*3}%)`;
        return (
          <g key={i}>
            <rect x={x - 62} y={y} width={124} height={76} rx={6}
                  fill="white" stroke={color} strokeWidth="1.2"/>
            <rect x={x - 58} y={y} width={10} height={76} rx={4} fill={color} opacity="0.20"/>
            {f.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={x + 8} y={y + 28 + j*17} w={108} h={15} rx={3}/>
                <text x={x + 8} y={y + 27 + j*17} textAnchor="middle" fontSize="11"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 117–118 — Inspection Reports ──────────────────────────────────────
export function IllustrationInspection() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Notice of ocular inspection and technical inspection report</title>
      <desc>NWRB field personnel serve a notice before conducting site inspections of water sources</desc>
      {/* Notice doc */}
      <rect x="48" y="18" width="166" height="156" rx="6" fill="#FFF8E1" stroke="#F57F17" strokeWidth="1.5"/>
      <rect x="56" y="18" width="11" height="156" rx="4" fill="#F57F17" opacity="0.22"/>
      <LabelBg x={148} y={44} w={120} h={17} rx={4}/>
      <text x="148" y="43" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Notice of</text>
      <LabelBg x={148} y={62} w={130} h={17} rx={3}/>
      <text x="148" y="61" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Ocular Inspection</text>
      {[82,98,114,130,146,162].map(y=>(
        <line key={y} x1={74} y1={y} x2={198} y2={y}
              stroke="#F57F17" strokeWidth="1" strokeLinecap="round" opacity="0.28"/>
      ))}
      {/* Arrow */}
      <line x1="220" y1="96" x2="298" y2="96" stroke="#37474F" strokeWidth="2" opacity="0.50"/>
      <polygon points="298,91 310,96 298,101" fill="#37474F" opacity="0.50"/>
      {/* Technical report */}
      <rect x="314" y="18" width="166" height="156" rx="6" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <rect x="322" y="18" width="11" height="156" rx="4" fill="#2E7D32" opacity="0.22"/>
      <LabelBg x={414} y={44} w={120} h={17} rx={4}/>
      <text x="414" y="43" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Technical</text>
      <LabelBg x={414} y={62} w={140} h={17} rx={3}/>
      <text x="414" y="61" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Inspection Report</text>
      {["Discharge measurements","Water level readings","Compliance status","GPS coordinates","Water quality data"].map((l, i)=>(
        <g key={i}>
          <circle cx={340} cy={86+i*18} r={4} fill="#2E7D32" opacity="0.50"/>
          <LabelBg x={430} y={86+i*18+4} w={140} h={13} rx={2}/>
          <text x="430" y={85+i*18+4} textAnchor="middle" fontSize="10.5"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
      {/* DENR WRUS */}
      <rect x="512" y="58" width="130" height="76" rx="8"
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={577} y={88} w={110} h={18} rx={4}/>
      <text x="577" y="87" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>DENR</text>
      <LabelBg x={577} y={107} w={118} h={14} rx={3}/>
      <text x="577" y="106" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_BLUE}>Field Personnel</text>
    </svg>
  );
}

// ── Slides 123–124 — SDG 2030 Agenda ─────────────────────────────────────────
export function IllustrationSDGAgenda() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>2030 Sustainable Development Agenda — 17 SDGs and 169 targets</title>
      <desc>United Nations 2030 Agenda adopted in September 2015 with 17 goals and 169 integrated targets</desc>
      <circle cx="200" cy="90" r="72" fill="#E65100" opacity="0.12" stroke="#E65100" strokeWidth="1.5"/>
      <LabelBg x={200} y={80} w={90} h={22} rx={4}/>
      <text x="200" y="79" textAnchor="middle" fontSize="22"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>17</text>
      <LabelBg x={200} y={100} w={80} h={16} rx={3}/>
      <text x="200" y="99" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>SDGs</text>
      <circle cx="200" cy="90" r="54" fill="none" stroke="#E65100" strokeWidth="1" opacity="0.30"
              strokeDasharray="15 5"/>
      <line x1="280" y1="90" x2="340" y2="90" stroke="#E65100" strokeWidth="1.5"
            strokeDasharray="4 3" opacity="0.55"/>
      <circle cx="450" cy="90" r="68" fill="#1565C0" opacity="0.10" stroke="#1565C0" strokeWidth="1.5"/>
      <LabelBg x={450} y={78} w={90} h={22} rx={4}/>
      <text x="450" y="77" textAnchor="middle" fontSize="22"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>169</text>
      <LabelBg x={450} y={100} w={80} h={16} rx={3}/>
      <text x="450" y="99" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>Targets</text>
      <circle cx="450" cy="90" r="50" fill="none" stroke="#1565C0" strokeWidth="1" opacity="0.28"
              strokeDasharray="12 5"/>
      <LabelBg x={340} y={162} w={200} h={16} rx={3}/>
      <text x="340" y="161" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>UN 2030 Sustainable Development Agenda</text>
    </svg>
  );
}

// ── Slides 127–128 — DENR Big Picture ────────────────────────────────────────
export function IllustrationDENR() {
  const sectors = ["Lands","ENR Research","Protected Areas","Air & Water","Minerals","Forests"];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>DENR's vast and complex concerns</title>
      <desc>Six major environmental sectors managed by DENR: lands, research, protected areas, air and water, minerals, and forests</desc>
      {/* DENR hub */}
      <circle cx="340" cy="90" r="42" fill="#1B5E20" opacity="0.14" stroke="#1B5E20" strokeWidth="1.5"/>
      <LabelBg x={340} y={87} w={48} h={18} rx={4}/>
      <text x="340" y="86" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>DENR</text>
      <LabelBg x={340} y={106} w={80} h={14} rx={3}/>
      <text x="340" y="105" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_GREEN}>Wide Mandate</text>
      {sectors.map((s, i)=>{
        const angles = [-90, -30, 30, 90, 150, 210];
        const r = (Math.PI * angles[i]) / 180;
        const cx = 340 + Math.cos(r)*116;
        const cy = 90 + Math.sin(r)*84;
        return (
          <g key={i}>
            <line x1={340+Math.cos(r)*44} y1={90+Math.sin(r)*44}
                  x2={cx-Math.cos(r)*32} y2={cy-Math.sin(r)*22}
                  stroke="#1B5E20" strokeWidth="1" strokeDasharray="3 3" opacity="0.40"/>
            <rect x={cx - 44} y={cy - 18} width={88} height={32} rx={6}
                  fill="#E8F5E9" stroke="#1B5E20" strokeWidth="1"/>
            <LabelBg x={cx} y={cy + 6} w={82} h={14} rx={3}/>
            <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11"
                  fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>{s}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 129–131 — EO 22 / WRMO ────────────────────────────────────────────
export function IllustrationWRMO() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Executive Order 22 — creation of the Water Resources Management Office under DENR</title>
      <desc>EO 22 signed April 27, 2023 created the WRMO to coordinate water sector governance and draft the IWMP</desc>
      {/* EO scroll */}
      <rect x="36" y="18" width="140" height="156" rx="6" fill="#E8F5E9" stroke="#004d40" strokeWidth="1.5"/>
      <rect x="44" y="18" width="10" height="156" rx="4" fill="#004d40" opacity="0.22"/>
      <LabelBg x={116} y={52} w={78} h={18} rx={4}/>
      <text x="116" y="51" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>EO 22</text>
      <LabelBg x={116} y={70} w={84} h={14} rx={3}/>
      <text x="116" y="69" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_TEAL}>April 27, 2023</text>
      {/* Arrow */}
      <line x1="182" y1="96" x2="234" y2="96" stroke="#004d40" strokeWidth="2" opacity="0.55"/>
      <polygon points="234,91 246,96 234,101" fill="#004d40" opacity="0.55"/>
      {/* WRMO box */}
      <rect x="248" y="34" width="170" height="124" rx="8" fill="#E0F7FA" stroke="#004d40" strokeWidth="2"/>
      <LabelBg x={333} y={60} w={120} h={19} rx={4}/>
      <text x="333" y="59" textAnchor="middle" fontSize="15"
            fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>WRMO</text>
      <LabelBg x={333} y={78} w={150} h={14} rx={3}/>
      <text x="333" y="77" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_TEAL}>under DENR</text>
      {["Draft IWMP","Generate WSS Data","Presage Dept of Water","Coordinate sectors"].map((l,i)=>(
        <g key={i}>
          <circle cx={264} cy={98+i*20} r={4} fill="#004d40" opacity="0.50"/>
          <LabelBg x={368} y={98+i*20+4} w={144} h={13} rx={2}/>
          <text x="368" y={97+i*20+4} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fill={T_DARK}>{l}</text>
        </g>
      ))}
      {/* Coordination partners */}
      {["MWSS","LWUA","NWRB","NIA","LGUs"].map((p, i)=>{
        const x = 452 + (i%2)*108;
        const y = 28 + Math.floor(i/2)*50 + (i===4?25:0);
        return (
          <g key={p}>
            <rect x={x - 38} y={y} width={76} height={32} rx={5}
                  fill="white" stroke="#004d40" strokeWidth="1"/>
            <LabelBg x={x} y={y + 18} w={66} h={14} rx={3}/>
            <text x={x} y={y + 17} textAnchor="middle" fontSize="12"
                  fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}>{p}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Slides 132–133 — IWMP ─────────────────────────────────────────────────────
export function IllustrationIWMP() {
  const inputs = ["NWSR", "PDP 2023", "PWSSMP", "Sewerage Prog", "Irrigation Master Plan", "Forest Plan"];
  
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>How the Integrated Water Resources Management Plan was prepared</title>
      <desc>IWMP synthesizes multiple existing national plans through review and stakeholder consultations</desc>
      
      {/* Input Plans Grid */}
      {inputs.map((label, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 58 + col * 130;
        const y = 18 + row * 54;
        return (
          <g key={i}>
            <rect 
              x={x - 50} y={y} width={100} height={40} rx={5}
              fill="white" stroke="#006064" strokeWidth="1"
            />
            <LabelBg x={x} y={y + 22} w={96} h={14} rx={3} />
            <text 
              x={x} y={y + 21} textAnchor="middle" fontSize="10.5"
              fontFamily="sans-serif" fontWeight="700" fill={T_DARK}
            >
              {label}
            </text>
            <line 
              x1={x + 52} y1={y + 20} x2={292} y2={96}
              stroke="#006064" strokeWidth="1" strokeDasharray="3 2" opacity="0.38"
            />
          </g>
        );
      })}

      {/* IWMP Central Hub */}
      <circle cx="340" cy="96" r="46" fill="#006064" opacity="0.14" stroke="#006064" strokeWidth="2" />
      <LabelBg x={340} y={92} w={48} h={18} rx={4} />
      <text 
        x="340" y="91" textAnchor="middle" fontSize="14"
        fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}
      >
        IWMP
      </text>
      <LabelBg x={340} y={112} w={120} h={14} rx={3} />
      <text 
        x="340" y="111" textAnchor="middle" fontSize="11"
        fontFamily="sans-serif" fill={T_TEAL}
      >
        Integrated Plan
      </text>

      {/* Consultation Arrow */}
      <line 
        x1="390" y1="96" x2="468" y2="96" stroke="#006064" strokeWidth="1.5"
        strokeDasharray="4 3" opacity="0.50"
      />
      <polygon points="468,91 480,96 468,101" fill="#006064" opacity="0.50" />

      {/* Agencies Consulted Box */}
      <rect 
        x="482" y="28" width="160" height="136" rx="8"
        fill="#E0F7FA" stroke="#006064" strokeWidth="1.5"
      />
      <LabelBg x={562} y={50} w={140} h={17} rx={4} />
      <text 
        x="562" y="49" textAnchor="middle" fontSize="12"
        fontFamily="sans-serif" fontWeight="700" fill={T_TEAL}
      >
        Agencies Consulted
      </text>
      
      {["DENR/NWRB", "DEPDev", "DPWH", "LWUA", "MWSS", "LLDA"].map((a, i) => (
        <g key={a}>
          <circle cx={502} cy={72 + i * 18} r={4} fill="#006064" opacity="0.50" />
          <LabelBg x={580} y={72 + i * 18 + 4} w={124} h={13} rx={2} />
          <text 
            x="580" y={71 + i * 18 + 4} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill={T_DARK}
          >
            {a}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 136–141 — Body Water / Trivia ──────────────────────────────────────
export function IllustrationBodyWater() {
  const parts = [
    {label:"Brain",   pct:"75–83%", cx:340,cy:54,  r:22, color:"#1565C0"},
    {label:"Blood",   pct:"94%",    cx:280,cy:100, r:16, color:"#b71c1c"},
    {label:"Muscles", pct:"75%",    cx:400,cy:100, r:18, color:"#2E7D32"},
    {label:"Bones",   pct:"22%",    cx:310,cy:148, r:12, color:"#795548"},
    {label:"Lungs",   pct:"85%",    cx:370,cy:148, r:14, color:"#028090"},
  ];
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Water composition in the human body</title>
      <desc>Water makes up 75-83% of the brain, 94% of blood, 85% of lungs, 75% of muscles, and 22% of bones</desc>
      {parts.map(({label, pct, cx, cy, r, color})=>(
        <g key={label}>
          <circle cx={cx} cy={cy} r={r + 8} fill={color} opacity="0.10"
                  stroke={color} strokeWidth="1"/>
          <circle cx={cx} cy={cy} r={r} fill={color} opacity="0.22"/>
          <LabelBg x={cx} y={cy + r + 20} w={80} h={15} rx={3}/>
          <text x={cx} y={cy + r + 19} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{label}</text>
          <LabelBg x={cx} y={cy + r + 36} w={50} h={14} rx={3}/>
          <text x={cx} y={cy + r + 35} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fill={T_BLUE}>{pct}</text>
        </g>
      ))}
      <LabelBg x={120} y={96} w={180} h={18} rx={4}/>
      <text x="120" y="95" textAnchor="middle" fontSize="16"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>60–70%</text>
      <LabelBg x={120} y={116} w={170} h={16} rx={3}/>
      <text x="120" y="115" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>of the human body</text>
      <LabelBg x={120} y={134} w={120} h={14} rx={3}/>
      <text x="120" y="133" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fill={T_TEAL}>is water</text>
      <LabelBg x={580} y={96} w={160} h={16} rx={3}/>
      <text x="580" y="95" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>Water regulates:</text>
      {["temperature","nutrients","oxygen transport"].map((l,i)=>(
        <g key={l}>
          <LabelBg x={580} y={114+i*18} w={150} h={15} rx={3}/>
          <text x="580" y={113+i*18} textAnchor="middle" fontSize="11"
                fontFamily="sans-serif" fill={T_TEAL}>• {l}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Slides 137 — Alam mo ba? ──────────────────────────────────────────────────
export function IllustrationAlamMoBa() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Alam mo ba — Metro Manila water savings fact</title>
      <desc>If 15 million Metro Manila residents save 4 liters daily, that equals 24 Olympic swimming pools saved</desc>
      {/* People icons */}
      {Array.from({length:15}).map((_,i)=>{
        const x = 22 + (i%5)*38;
        const y = 18 + Math.floor(i/5)*38;
        return (
          <g key={i}>
            <circle cx={x+8} cy={y+8} r={8} fill="#1565C0" opacity="0.35"/>
            <path d={`M${x} ${y+28} Q${x+8} ${y+20} ${x+16} ${y+28}`}
                  fill="none" stroke="#1565C0" strokeWidth="1.5" opacity="0.35"/>
          </g>
        );
      })}
      <LabelBg x={106} y={138} w={134} h={16} rx={3}/>
      <text x="106" y="137" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>15 Million People</text>
      {/* × 4L arrow */}
      <line x1="218" y1="96" x2="286" y2="96" stroke="#1565C0" strokeWidth="2" opacity="0.50"/>
      <polygon points="286,91 298,96 286,101" fill="#1565C0" opacity="0.50"/>
      <LabelBg x={252} y={84} w={60} h={16} rx={3}/>
      <text x="252" y="83" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>× 4L/day</text>
      {/* Pool */}
      <rect x="302" y="56" width="176" height="80" rx="6"
            fill="#E3F2FD" stroke="#0288D1" strokeWidth="1.5"/>
      <path d="M302 100 Q350 90 390 100 Q430 110 478 100"
            fill="none" stroke="#0288D1" strokeWidth="2" opacity="0.55"/>
      <LabelBg x={390} y={88} w={130} h={20} rx={4}/>
      <text x="390" y="87" textAnchor="middle" fontSize="18"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>60M L</text>
      <LabelBg x={390} y={110} w={140} h={16} rx={3}/>
      <text x="390" y="109" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>per day saved!</text>
      <rect x="506" y="64" width="152" height="56" rx="6"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={582} y={90} w={136} h={18} rx={4}/>
      <text x="582" y="89" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>24 Olympic</text>
      <LabelBg x={582} y={110} w={140} h={16} rx={3}/>
      <text x="582" y="109" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Swimming Pools</text>
    </svg>
  );
}

// ── Slides 138 — Diarrhea / Child Mortality ───────────────────────────────────
export function IllustrationWaterFacts() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Critical water access statistics for children worldwide</title>
      <desc>Diarrhea is 2nd leading cause of child deaths; 4,100 children under 5 die daily from unsafe water</desc>
      {[
        {x:130, stat:"2nd", label:"Leading cause\nof child death\nis diarrhea",    color:"#b71c1c"},
        {x:330, stat:"4,100", label:"Children under 5\ndie daily from\nunsafe water", color:"#E65100"},
        {x:530, stat:"1B",  label:"People without\naccess to clean\ndrinking water", color:"#1565C0"},
      ].map(({x, stat, label, color})=>(
        <g key={x}>
          {/* Fixed the extra brace below */}
          <rect x={x - 78} y={18} width={156} height={156} rx={10}
                fill="white" stroke={color} strokeWidth="2"/>
          
          <rect x={x - 78} y={18} width={156} height={30} rx={10} fill={color} opacity="0.14"/>
          <LabelBg x={x} y={78} w={120} h={28} rx={4}/>
          <text x={x} y={77} textAnchor="middle" fontSize="24"
                fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{stat}</text>
          {label.split("\n").map((l, j)=>(
            <g key={j}>
              <LabelBg x={x} y={104 + j*20} w={148} h={17} rx={3}/>
              <text x={x} y={103 + j*20} textAnchor="middle" fontSize="12"
                    fontFamily="sans-serif" fill={T_DARK}>{l}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Slides 142–159 — Tipid Tubig Tips ────────────────────────────────────────
export function IllustrationTipidTubig() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Tipid Tubig — water conservation tips at home</title>
      <desc>Water-saving habits: turn off tap while brushing, short showers, fix leaks, water plants early morning</desc>
      {/* Large water drop center */}
      <ellipse cx="340" cy="108" rx="44" ry="56" fill="#1565C0" opacity="0.14"/>
      <path d="M340 52 Q340 42 348 47 Q360 56 340 52Z" fill="#1565C0" opacity="0.22"/>
      <LabelBg x={340} y={110} w={60} h={18} rx={4}/>
      <text x="340" y="109" textAnchor="middle" fontSize="15"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>TIPID</text>
      <LabelBg x={340} y={130} w={56} h={16} rx={3}/>
      <text x="340" y="129" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>TUBIG</text>
      {/* Tips around it */}
      {[
        {angle:-90, label:"Turn off\ntap",   color:"#1565C0"},
        {angle:-30, label:"Short\nshower",   color:"#028090"},
        {angle:30,  label:"Fix\nleaks",      color:"#2E7D32"},
        {angle:90,  label:"Full\nloads",     color:"#0A7C6E"},
        {angle:150, label:"Reuse\nwater",    color:"#1B5E20"},
        {angle:210, label:"Early\nwatering", color:"#006064"},
      ].map(({angle, label, color})=>{
        const r = Math.PI * angle / 180;
        const cx = 340 + Math.cos(r)*120;
        const cy = 100 + Math.sin(r)*76;
        return (
          <g key={angle}>
            <line x1={340+Math.cos(r)*48} y1={100+Math.sin(r)*58}
                  x2={cx-Math.cos(r)*34} y2={cy-Math.sin(r)*22}
                  stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.40"/>
            <rect x={cx-38} y={cy-22} width={76} height={40} rx={6}
                  fill="white" stroke={color} strokeWidth="1.2"/>
            {label.split("\n").map((l, j)=>(
              <g key={j}>
                <LabelBg x={cx} y={cy-7+j*16} w={70} h={14} rx={3}/>
                <text x={cx} y={cy-8+j*16} textAnchor="middle" fontSize="11"
                      fontFamily="sans-serif" fontWeight="700" fill={T_DARK}>{l}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function IllustrationWaterSmart() {
  return (
    <svg width="100%" viewBox="0 0 680 192" role="img">
      <title>Play your part — be water smart</title>
      <desc>Water conservation awareness message: wise water use benefits the nation</desc>
      {/* Rays */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>{
        const r = Math.PI * deg / 180;
        return <line key={i}
                     x1={340+Math.cos(r)*56} y1={96+Math.sin(r)*56}
                     x2={340+Math.cos(r)*74} y2={96+Math.sin(r)*74}
                     stroke="#1565C0" strokeWidth="1.8" strokeLinecap="round" opacity="0.22"/>;
      })}
      <circle cx="340" cy="96" r="56" fill="#E3F2FD" stroke="#1565C0" strokeWidth="2"/>
      <ellipse cx="340" cy="112" rx="32" ry="40" fill="#1565C0" opacity="0.22"/>
      <path d="M340 72 Q340 64 346 68 Q354 74 340 72Z" fill="#1565C0" opacity="0.35"/>
      <LabelBg x={340} y={94} w={56} h={18} rx={4}/>
      <text x="340" y="93" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>💧</text>
      <LabelBg x={340} y={115} w={90} h={18} rx={4}/>
      <text x="340" y="114" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>WATER</text>
      <LabelBg x={340} y={134} w={80} h={16} rx={3}/>
      <text x="340" y="133" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={T_BLUE}>SMART</text>
      <rect x="80" y="60" width="180" height="72" rx="10"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <LabelBg x={170} y={88} w={158} h={18} rx={4}/>
      <text x="170" y="87" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_GREEN}>Play your part</text>
      <LabelBg x={170} y={116} w={160} h={16} rx={3}/>
      <text x="170" y="115" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fill={T_TEAL}>be water smart</text>
      <rect x="420" y="60" width="180" height="72" rx="10"
            fill="#FFF8E1" stroke="#F57F17" strokeWidth="1.5"/>
      <LabelBg x={510} y={88} w={158} h={18} rx={4}/>
      <text x="510" y="87" textAnchor="middle" fontSize="14"
            fontFamily="sans-serif" fontWeight="700" fill={T_ORANGE}>Wise Water Use</text>
      <LabelBg x={510} y={116} w={156} h={16} rx={3}/>
      <text x="510" y="115" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fill={T_DARK}>Save · Conserve · Reuse</text>
    </svg>
  );
}


// ── Export map ────────────────────────────────────────────────────────────────
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
// Introduction
2:   IllustrationOutline,
// NWRB
3:   IllustrationNotNWRB,
6:   IllustrationNWRBFunctions,
8:   IllustrationNWRBBoard,
12:  IllustrationMajorFunctions,
13:  IllustrationMajorFunctions,
// Deputation
9:   IllustrationDeputation,
10:  IllustrationReporting,
// Legal
7:   IllustrationLegalTimeline,
14:  IllustrationPolicyFormulation,
15:  IllustrationFunctionPrograms,
// Angat
16:  IllustrationAngatDam,
17:  IllustrationAngatDam,
18:  IllustrationRegulations,
// PH Water Resources
19:  IllustrationPhilWater,
20:  IllustrationPhilWater,
21:  IllustrationPhilWater,
22:  IllustrationWaterRegions,
23:  IllustrationAdminVsWater,
24:  IllustrationRiverBasins,
25:  IllustrationWaterStressed,
26:  IllustrationRiverBasins,
27:  IllustrationRiverBasins,
// Earth's Water
29:  IllustrationEarthVolume,
// Water Code
30:  IllustrationWaterCode,
31:  IllustrationWaterCode,
32:  IllustrationWaterCode,
33:  IllustrationAppropriation,
38:  IllustrationDomesticUse,
39:  IllustrationCisterns,
40:  IllustrationAppropriation,
41:  IllustrationUsesOfWater,
42:  IllustrationUsesOfWater,
43:  IllustrationUsesOfWater,
44:  IllustrationRegalian, // already exists — reuse
46:  IllustrationGeneralRuleException,
47:  IllustrationUtilization,
48:  IllustrationUtilization,
49:  IllustrationControlWaters,
50:  IllustrationOtherProvisions,
51:  IllustrationBeneficialUse,
52:  IllustrationArticles,
53:  IllustrationArticles,
54:  IllustrationArticles76_79,
55:  IllustrationUsesOfWater,
56:  IllustrationUsesOfWater,
57:  IllustrationUsesOfWater,
58:  IllustrationUsesOfWater,
59:  IllustrationUsesOfWater,
60:  IllustrationUsesOfWater,
// Water Permit
61:  IllustrationWPARequirements,
62:  IllustrationWPARequirements,
63:  IllustrationWPARequirements,
64:  IllustrationWPARequirements,
65:  IllustrationWPARequirements,
66:  IllustrationWaterAllocation,
67:  IllustrationWaterAllocation,
68:  IllustrationWhenPermit,
69:  IllustrationQualifications,
70:  IllustrationWPARequirements,
71:  IllustrationCWPProcess,
72:  IllustrationCWPProcess,
73:  IllustrationCWPProcess,
74:  IllustrationCWPProcess,
75:  IllustrationCWPProcess,
76:  IllustrationCWPProcess,
77:  IllustrationCWPConditions,
78:  IllustrationCWPConditions,
79:  IllustrationCWPConditions,
// CPC
81:  IllustrationCPCRequirements,
82:  IllustrationCPCRequirements,
83:  IllustrationCPCRequirements,
84:  IllustrationCWPProcess,
86:  IllustrationCPCPetitions,
87:  IllustrationNWRBRules,
88:  IllustrationRegularReporting,
89:  IllustrationCPCAdvantages,
// Water Issues
90:  IllustrationWaterIssues,
91:  IllustrationWaterIssues,
92:  IllustrationClimateChange,
93:  IllustrationClimateChange,
// IWRM
95:  IllustrationWaterManagement,
96:  IllustrationWaterManagement,
// Monitoring
97:  IllustrationSurfaceWater,
98:  IllustrationSurfaceWater,
99:  IllustrationGroundwater,
100: IllustrationGroundwater,
101: IllustrationStreamFlow,
102: IllustrationStreamFlow,
103: IllustrationStreamFlow,
104: IllustrationStreamFlow,
105: IllustrationStreamFlow,
106: IllustrationStreamFlow,
107: IllustrationStreamFlow,
108: IllustrationStreamFlow,
109: IllustrationGroundwaterMonitoring,
110: IllustrationGroundwaterMonitoring,
111: IllustrationGroundwaterMonitoring,
112: IllustrationGroundwaterMonitoring,
113: IllustrationGroundwaterMonitoring,
114: IllustrationGroundwaterMonitoring,
115: IllustrationGroundwaterMonitoring,
116: IllustrationNWRBForms,
117: IllustrationInspection,
118: IllustrationInspection,
// Water Issues (pollution & climate)
119: IllustrationPollution,
120: IllustrationPollution,
121: IllustrationPollution,
122: IllustrationClimateChange,
// SDG
123: IllustrationSDGAgenda,
124: IllustrationSDGAgenda,
// DENR / WRMO / IWMP
127: IllustrationDENR,
128: IllustrationDENR,
129: IllustrationWRMO,
130: IllustrationWRMO,
131: IllustrationWRMO,
132: IllustrationIWMP,
133: IllustrationIWMP,
// Trivia
136: IllustrationBodyWater,
137: IllustrationAlamMoBa,
138: IllustrationWaterFacts,
139: IllustrationBodyWater,
140: IllustrationWaterFacts,
141: IllustrationBodyWater,
// Tipid Tubig
142: IllustrationTipidTubig,
143: IllustrationTipidTubig,
144: IllustrationTipidTubig,
145: IllustrationTipidTubig,
146: IllustrationTipidTubig,
147: IllustrationTipidTubig,
148: IllustrationTipidTubig,
149: IllustrationTipidTubig,
150: IllustrationTipidTubig,
151: IllustrationWaterSmart,
152: IllustrationWaterSmart,
153: IllustrationWaterSmart,
154: IllustrationWaterSmart,
155: IllustrationWaterSmart,
156: IllustrationWaterSmart,
157: IllustrationWaterSmart,
158: IllustrationWaterSmart,
159: IllustrationWaterSmart,
};

