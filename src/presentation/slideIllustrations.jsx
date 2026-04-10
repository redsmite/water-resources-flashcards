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
};
