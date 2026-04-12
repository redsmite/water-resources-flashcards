// ── slideIllustrations_142_158.jsx ───────────────────────────────────────────
// Individual SVG illustrations for Tipid Tubig slides 142–158.
//
// Wire up in SLIDE_ILLUSTRATIONS:
//   import { Illus142, Illus143, ..., Illus158 } from "./slideIllustrations_142_158.jsx";
//   142: Illus142,  143: Illus143,  ... 158: Illus158,
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared helpers ────────────────────────────────────────────────────────────
const LB = ({ x, y, w = 70, h = 16, rx = 3 }) => (
  <rect x={x - w / 2} y={y - 12} width={w} height={h} rx={rx}
        fill="rgba(255,255,255,0.90)" />
);

// Reusable water drop badge (savings callout bottom-right)
function SavingsBadge({ x, y, amount, color }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 18} rx={52} ry={62} fill={color} opacity="0.12" />
      <ellipse cx={x} cy={y + 18} rx={36} ry={44} fill={color} opacity="0.20" />
      {/* drop tip */}
      <path d={`M${x} ${y - 22} Q${x} ${y - 30} ${x + 5} ${y - 26} Q${x + 10} ${y - 20} ${x} ${y - 22}Z`}
            fill={color} opacity="0.55" />
      <LB x={x} y={y + 8} w={94} h={20} rx={4} />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="18"
            fontFamily="'Playfair Display',Georgia,serif" fontWeight="700"
            fill={color}>{amount}</text>
      <LB x={x} y={y + 28} w={94} h={14} rx={3} />
      <text x={x} y={y + 27} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill="#333">💧 natipid</text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 142 — Tipid Tubig Tips intro
// Scene: kitchen faucet + title banner with water droplets
// ─────────────────────────────────────────────────────────────────────────────
export function Illus142() {
  return (
    <svg width="100%" viewBox="0 0 680 230" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tubig Tips — water conservation tips introduction</title>

      {/* Background wash */}
      <rect width="680" height="230" fill="#E3F2FD" opacity="0.35" rx="12"/>

      {/* Big central drop */}
      <ellipse cx="340" cy="118" rx="72" ry="88" fill="#0288D1" opacity="0.14"/>
      <ellipse cx="340" cy="118" rx="50" ry="62" fill="#0288D1" opacity="0.20"/>
      <path d="M340 30 Q340 18 350 25 Q364 36 340 30Z" fill="#0288D1" opacity="0.40"/>

      {/* "TIPID TUBIG" inside drop */}
      <LB x={340} y={105} w={110} h={22} rx={5}/>
      <text x="340" y="104" textAnchor="middle" fontSize="20"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill="#0277BD">TIPID</text>
      <LB x={340} y={130} w={110} h={22} rx={5}/>
      <text x="340" y="129" textAnchor="middle" fontSize="20"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill="#0277BD">TUBIG</text>

      {/* Orbiting tip icons */}
      {[
        {angle:-100, icon:"🚿", label:"Shower"},
        {angle:-40,  icon:"🪥", label:"Brush"},
        {angle:20,   icon:"🌿", label:"Garden"},
        {angle:80,   icon:"👕", label:"Laundry"},
        {angle:140,  icon:"🍽", label:"Dishes"},
        {angle:200,  icon:"🔧", label:"Fix Leaks"},
      ].map(({angle, icon, label}) => {
        const r = Math.PI * angle / 180;
        const cx = 340 + Math.cos(r) * 148;
        const cy = 118 + Math.sin(r) * 96;
        return (
          <g key={angle}>
            <line x1={340 + Math.cos(r)*76} y1={118 + Math.sin(r)*66}
                  x2={cx - Math.cos(r)*28} y2={cy - Math.sin(r)*20}
                  stroke="#0288D1" strokeWidth="1" strokeDasharray="3 3" opacity="0.35"/>
            <circle cx={cx} cy={cy} r="24" fill="white" stroke="#0288D1" strokeWidth="1.2"
                    opacity="0.85"/>
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16"
                  fontFamily="sans-serif">{icon}</text>
          </g>
        );
      })}

      {/* Tagline */}
      <LB x={340} y={218} w={340} h={16} rx={3}/>
      <text x="340" y="217" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="#0277BD">
        Nagawa mo na ba ang mga ito? Kung hindi pa, try mo!
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 143 — Tip #1: Turn off shower while shampooing → saves 18L/day
// ─────────────────────────────────────────────────────────────────────────────
export function Illus143() {
  const C = "#0288D1";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 1 — turn off shower while shampooing, saves 18 liters per day</title>
      <rect width="680" height="210" fill="#E3F2FD" opacity="0.30" rx="12"/>

      {/* Shower head */}
      <rect x="200" y="20" width="80" height="14" rx="7" fill={C} opacity="0.70"/>
      <rect x="224" y="34" width="32" height="52" rx="6" fill={C} opacity="0.70"/>
      <rect x="260" y="28" width="26" height="10" rx="4" fill={C} opacity="0.55"/>

      {/* Water drops falling — with X (off) */}
      <line x1="150" y1="60" x2="290" y2="120" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.70"/>
      <line x1="290" y1="60" x2="150" y2="120" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.70"/>
      {/* Crossed out drops */}
      {[195,225,255].map((x,i)=>(
        <ellipse key={i} cx={x} cy={100+i*8} rx="5" ry="7"
                 fill={C} opacity="0.20" stroke={C} strokeWidth="1"/>
      ))}

      {/* Person shampooing */}
      <circle cx="430" cy="70" r="28" fill="#FFCDD2" stroke="#E91E63" strokeWidth="1.5"
              opacity="0.75"/>
      {/* Hands on head */}
      <path d="M410 58 Q418 44 430 42 Q442 44 450 58"
            fill="none" stroke="#795548" strokeWidth="3" strokeLinecap="round" opacity="0.65"/>
      <line x1="410" y1="95" x2="400" y2="115" stroke="#795548" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.55"/>
      <line x1="450" y1="95" x2="460" y2="115" stroke="#795548" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.55"/>
      {/* Shampoo bubbles */}
      {[[430,42],[418,38],[442,36],[425,32]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={4+i*1.5} fill="white"
                stroke="#E91E63" strokeWidth="1" opacity="0.65"/>
      ))}

      <SavingsBadge x={580} y={108} amount="18L" color={C}/>

      <LB x={295} y={188} w={340} h={15} rx={3}/>
      <text x="295" y="187" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="#0277BD">
        Patayin ang shower habang nag-sha-shampoo
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 144 — Tip #2: Turn off tap while brushing → saves 15L/min
// ─────────────────────────────────────────────────────────────────────────────
export function Illus144() {
  const C = "#1565C0";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 2 — turn off tap while brushing teeth, saves 15 liters per minute</title>
      <rect width="680" height="210" fill="#E8EAF6" opacity="0.35" rx="12"/>

      {/* Sink / basin */}
      <path d="M120 130 Q160 120 220 128 Q260 134 300 128 L300 168 Q260 176 220 170 Q160 168 120 168 Z"
            fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1.5"/>
      <ellipse cx="210" cy="148" rx="50" ry="20" fill="#B3E5FC" opacity="0.60"/>

      {/* Faucet */}
      <rect x="190" y="88" width="40" height="12" rx="5" fill="#455A64" opacity="0.75"/>
      <rect x="202" y="100" width="16" height="30" rx="4" fill="#455A64" opacity="0.75"/>
      {/* Faucet handle — closed (horizontal bar = off) */}
      <rect x="174" y="84" width="52" height="9" rx="4" fill="#78909C" opacity="0.80"/>

      {/* X over dripping water */}
      <line x1="192" y1="128" x2="208" y2="148" stroke="#b71c1c" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.70"/>
      <line x1="208" y1="128" x2="192" y2="148" stroke="#b71c1c" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.70"/>

      {/* Toothbrush */}
      <rect x="330" y="50" width="16" height="100" rx="8" fill="#1565C0" opacity="0.70"/>
      <rect x="322" y="138" width="32" height="14" rx="4" fill="#E3F2FD"
            stroke="#1565C0" strokeWidth="1"/>
      {/* Bristles */}
      {[326,332,338,344].map((x,i)=>(
        <line key={i} x1={x} y1={148} x2={x} y2={158} stroke="#1565C0"
              strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
      ))}

      {/* Foam / mint circles */}
      {[[380,90],[398,78],[390,105],[405,95]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={6+i*1.5} fill="white"
                stroke="#42A5F5" strokeWidth="1" opacity="0.60"/>
      ))}

      <SavingsBadge x={570} y={108} amount="15L/min" color={C}/>

      <LB x={265} y={192} w={340} h={15} rx={3}/>
      <text x="265" y="191" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Patayin ang gripo habang nagsisipilyo
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 145 — Tip #3: No trash in toilet when flushing → saves 18–26L
// ─────────────────────────────────────────────────────────────────────────────
export function Illus145() {
  const C = "#00695C";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 3 — no trash in toilet bowl when flushing, saves 18 to 26 liters</title>
      <rect width="680" height="210" fill="#E0F2F1" opacity="0.35" rx="12"/>

      {/* Toilet bowl */}
      <ellipse cx="220" cy="158" rx="72" ry="30" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1.5"/>
      <path d="M148 138 Q148 90 220 88 Q292 90 292 138 L292 158 Q292 176 220 178 Q148 176 148 158 Z"
            fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1.5"/>
      {/* Water inside bowl */}
      <ellipse cx="220" cy="152" rx="55" ry="18" fill="#B3E5FC" opacity="0.65"/>
      {/* Toilet tank */}
      <rect x="162" y="60" width="116" height="56" rx="6" fill="#ECEFF1"
            stroke="#90A4AE" strokeWidth="1.5"/>
      <rect x="198" y="56" width="44" height="8" rx="4" fill="#B0BEC5"/>

      {/* Trash tissue with red X */}
      <rect x="188" y="106" width="30" height="22" rx="3" fill="#FFF9C4"
            stroke="#F9A825" strokeWidth="1.2"/>
      <line x1="182" y1="100" x2="225" y2="143" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.75"/>
      <line x1="225" y1="100" x2="182" y2="143" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.75"/>

      {/* Wastebasket (correct place) */}
      <path d="M400 90 L420 90 L415 170 L385 170 L380 90 Z"
            fill="#E8F5E9" stroke={C} strokeWidth="1.5"/>
      <rect x="376" y="82" width="48" height="12" rx="4" fill={C} opacity="0.45"/>
      {/* Paper inside */}
      <rect x="386" y="110" width="24" height="18" rx="2" fill="#FFF9C4"
            stroke="#F9A825" strokeWidth="1"/>
      {/* Checkmark */}
      <path d="M398 84 L403 78 L414 90 L398 106 L386 95" fill="none"
            stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            opacity="0.85"/>

      {/* Arrow from tissue to bin */}
      <path d="M320 120 Q360 100 375 120" fill="none" stroke={C} strokeWidth="2"
            strokeDasharray="5 3" opacity="0.55"/>
      <polygon points="375,115 385,120 375,125" fill={C} opacity="0.55"/>

      <SavingsBadge x={570} y={108} amount="18–26L" color={C}/>

      <LB x={270} y={195} w={360} h={15} rx={3}/>
      <text x="270" y="194" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Huwag itapon ang basura sa toilet bowl
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 146 — Tip #4: Fix or replace broken pipes/faucets → saves 19L/day
// ─────────────────────────────────────────────────────────────────────────────
export function Illus146() {
  const C = "#E65100";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 4 — fix or replace broken pipes and faucets, saves 19 liters per day</title>
      <rect width="680" height="210" fill="#FBE9E7" opacity="0.35" rx="12"/>

      {/* Dripping leaky faucet (before) */}
      <rect x="100" y="40" width="56" height="12" rx="5" fill="#B0BEC5" opacity="0.80"/>
      <rect x="114" y="52" width="28" height="46" rx="5" fill="#B0BEC5" opacity="0.80"/>
      {/* Leak / crack lines */}
      <path d="M118 62 L128 72 L116 82" fill="none" stroke="#b71c1c"
            strokeWidth="2" strokeLinecap="round" opacity="0.75"/>
      {/* Drips */}
      {[[122,100],[128,116],[120,132]].map(([cx,cy],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={4} ry={6} fill="#42A5F5" opacity="0.55"/>
      ))}
      <LB x={128} y={165} w={100} h={14} rx={3}/>
      <text x="128" y="164" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#b71c1c">Sirang gripo</text>

      {/* Wrench */}
      <g transform="translate(285,80) rotate(-30)">
        <rect x="-6" y="-50" width="12" height="80" rx="4" fill="#607D8B" opacity="0.80"/>
        <path d="M-12 -50 Q0 -66 12 -50 L8 -38 L-8 -38 Z" fill="#607D8B" opacity="0.75"/>
        <rect x="-10" y="26" width="20" height="12" rx="3" fill="#607D8B" opacity="0.70"/>
      </g>

      {/* Arrow */}
      <line x1="240" y1="110" x2="330" y2="110" stroke={C} strokeWidth="2.5"
            strokeDasharray="6 3" opacity="0.55"/>
      <polygon points="330,105 342,110 330,115" fill={C} opacity="0.55"/>

      {/* Fixed faucet (after) */}
      <rect x="360" y="40" width="56" height="12" rx="5" fill="#455A64" opacity="0.80"/>
      <rect x="374" y="52" width="28" height="46" rx="5" fill="#455A64" opacity="0.80"/>
      {/* Checkmark on fixed faucet */}
      <circle cx="388" cy="72" r="14" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"
              opacity="0.85"/>
      <path d="M382 72 L387 78 L396 64" fill="none" stroke="#2E7D32"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* No drips */}
      <LB x={388} y={165} w={100} h={14} rx={3}/>
      <text x="388" y="164" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#2E7D32">Naayos na!</text>

      <SavingsBadge x={570} y={108} amount="19L/day" color={C}/>

      <LB x={265} y={195} w={340} h={15} rx={3}/>
      <text x="265" y="194" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Ayusin o palitan ang sirang tubo o gripo
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 147 — Tip #5: Shower ≤ 5 minutes → saves 126L/day
// ─────────────────────────────────────────────────────────────────────────────
export function Illus147() {
  const C = "#0288D1";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 5 — shower for 5 minutes or less, saves 126 liters per day</title>
      <rect width="680" height="210" fill="#E1F5FE" opacity="0.35" rx="12"/>

      {/* Stopwatch */}
      <circle cx="220" cy="110" r="68" fill="white" stroke={C} strokeWidth="2.5"
              opacity="0.85"/>
      <circle cx="220" cy="110" r="58" fill="none" stroke={C} strokeWidth="1"
              opacity="0.20"/>
      {/* Crown / button */}
      <rect x="210" y="38" width="20" height="8" rx="3" fill={C} opacity="0.70"/>
      <rect x="218" y="42" width="4" height="10" rx="2" fill={C} opacity="0.60"/>
      {/* Clock hand — pointing to 5-min mark */}
      <line x1="220" y1="110" x2="220" y2="60" stroke={C} strokeWidth="3.5"
            strokeLinecap="round" opacity="0.75"/>
      {/* Tick marks */}
      {Array.from({length:12},(_,i)=>{
        const a = (i/12)*Math.PI*2 - Math.PI/2;
        const r1 = 50, r2 = i%3===0?42:46;
        return <line key={i}
          x1={220+Math.cos(a)*r1} y1={110+Math.sin(a)*r1}
          x2={220+Math.cos(a)*r2} y2={110+Math.sin(a)*r2}
          stroke={C} strokeWidth={i%3===0?2:1} strokeLinecap="round" opacity="0.45"/>;
      })}
      {/* "5 min" label */}
      <LB x={220} y={124} w={68} h={20} rx={4}/>
      <text x="220" y="123" textAnchor="middle" fontSize="18"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill={C}>5 min</text>
      <LB x={220} y={145} w={60} h={14} rx={3}/>
      <text x="220" y="144" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill="#555">o mas maikli</text>

      {/* Shower stream going down */}
      {[370,385,400,415].map((x,i)=>(
        <path key={i} d={`M${x} 44 Q${x+4} 60 ${x-2} 80 Q${x+3} 100 ${x} 120`}
              fill="none" stroke={C} strokeWidth="2" strokeLinecap="round"
              opacity="0.40"/>
      ))}
      {/* Shower rose */}
      <ellipse cx="393" cy="38" rx="32" ry="10" fill={C} opacity="0.55"/>
      <rect x="386" y="20" width="14" height="20" rx="4" fill={C} opacity="0.55"/>

      <SavingsBadge x={570} y={108} amount="126L" color={C}/>

      <LB x={265} y={195} w={340} h={15} rx={3}/>
      <text x="265" y="194" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Magshower nang hanggang 5 minuto lamang
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 148 — Tip #6: Turn off hose while washing car → saves 378L
// ─────────────────────────────────────────────────────────────────────────────
export function Illus148() {
  const C = "#2E7D32";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 6 — turn off hose while not using it when washing the car, saves 378 liters</title>
      <rect width="680" height="210" fill="#E8F5E9" opacity="0.35" rx="12"/>

      {/* Car silhouette */}
      <path d="M80 140 Q80 110 110 106 Q140 100 200 98 Q240 92 280 98 Q320 104 340 110 Q360 116 360 140 Z"
            fill="#90A4AE" opacity="0.60"/>
      <path d="M100 106 Q130 80 180 76 Q230 72 270 76 Q310 80 330 106 Z"
            fill="#B0BEC5" opacity="0.70"/>
      {/* Windows */}
      <path d="M148 107 Q164 86 186 83 Q208 80 220 84 Q230 88 236 107 Z"
            fill="#B3E5FC" opacity="0.75"/>
      <path d="M242 107 Q254 88 270 84 Q286 82 298 88 Q308 96 312 107 Z"
            fill="#B3E5FC" opacity="0.75"/>
      {/* Wheels */}
      <circle cx="148" cy="142" r="22" fill="#455A64" opacity="0.80"/>
      <circle cx="148" cy="142" r="12" fill="#78909C"/>
      <circle cx="302" cy="142" r="22" fill="#455A64" opacity="0.80"/>
      <circle cx="302" cy="142" r="12" fill="#78909C"/>

      {/* Hose with shut-off nozzle */}
      <path d="M420 110 Q450 120 470 108 Q490 96 510 106 Q530 116 540 104"
            fill="none" stroke="#795548" strokeWidth="8" strokeLinecap="round" opacity="0.70"/>
      {/* Nozzle head */}
      <rect x="530" y="96" width="32" height="16" rx="6" fill="#5D4037" opacity="0.80"/>
      {/* Shut-off lever */}
      <rect x="538" y="88" width="16" height="8" rx="3" fill="#2E7D32" opacity="0.80"/>
      {/* Bubbles on car = soap */}
      {[[180,90],[210,84],[240,88]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={8+i*2} fill="white"
                stroke="#42A5F5" strokeWidth="1" opacity="0.55"/>
      ))}
      {/* Water OFF X */}
      <line x1="535" y1="115" x2="558" y2="138" stroke="#b71c1c" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.70"/>
      <line x1="558" y1="115" x2="535" y2="138" stroke="#b71c1c" strokeWidth="2.5"
            strokeLinecap="round" opacity="0.70"/>

      <SavingsBadge x={600} y={108} amount="378L" color={C}/>

      <LB x={270} y={195} w={390} h={15} rx={3}/>
      <text x="270" y="194" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Patayin ang hose habang hindi ginagamit
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 149 — Tip #7: Plant low-water plants (cactus/succulents) → saves 378L
// ─────────────────────────────────────────────────────────────────────────────
export function Illus149() {
  const C = "#558B2F";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Tipid Tip 7 — plant cactus and succulents that need little water, saves 378 liters</title>
      <rect width="680" height="210" fill="#F1F8E9" opacity="0.35" rx="12"/>

      {/* Ground line */}
      <rect x="60" y="165" width="540" height="8" rx="4" fill="#A5D6A7" opacity="0.55"/>

      {/* Cactus 1 — tall */}
      <rect x="138" y="70" width="28" height="96" rx="14" fill="#4CAF50" opacity="0.70"/>
      <rect x="108" y="96" width="36" height="18" rx="9" fill="#4CAF50" opacity="0.65"/>
      <rect x="178" y="108" width="32" height="16" rx="8" fill="#4CAF50" opacity="0.60"/>
      {/* Cactus spines */}
      {[[122,88],[138,80],[160,84],[148,100]].map(([cx,cy])=>(
        <line key={`${cx}${cy}`} x1={cx-4} y1={cy} x2={cx+4} y2={cy}
              stroke="#2E7D32" strokeWidth="1.5" opacity="0.55"/>
      ))}

      {/* Succulent rosette */}
      {[0,51,102,153,204,255,306].map((deg,i)=>{
        const r = Math.PI * deg / 180;
        return (
          <ellipse key={i} cx={290 + Math.cos(r)*26} cy={138 + Math.sin(r)*16}
                   rx="16" ry="10" fill={i%2===0?"#66BB6A":"#A5D6A7"}
                   opacity="0.80" transform={`rotate(${deg} ${290+Math.cos(r)*26} ${138+Math.sin(r)*16})`}/>
        );
      })}
      <circle cx="290" cy="138" r="12" fill="#81C784" opacity="0.90"/>

      {/* Small succulent */}
      {[0,60,120,180,240,300].map((deg,i)=>{
        const r = Math.PI * deg / 180;
        return (
          <ellipse key={i} cx={390 + Math.cos(r)*18} cy={145 + Math.sin(r)*11}
                   rx="11" ry="7" fill={i%2===0?"#AED581":"#C5E1A5"}
                   opacity="0.85" transform={`rotate(${deg} ${390+Math.cos(r)*18} ${145+Math.sin(r)*11})`}/>
        );
      })}
      <circle cx="390" cy="145" r="8" fill="#CDDC39" opacity="0.90"/>

      {/* Plant pots */}
      <path d="M118 165 L128 142 L178 142 L188 165 Z" fill="#8D6E63" opacity="0.65"/>
      <rect x="116" y="162" width="74" height="8" rx="3" fill="#6D4C41" opacity="0.65"/>
      <path d="M270 165 L278 148 L310 148 L318 165 Z" fill="#8D6E63" opacity="0.60"/>
      <rect x="268" y="162" width="52" height="8" rx="3" fill="#6D4C41" opacity="0.60"/>
      <path d="M370 165 L378 152 L406 152 L414 165 Z" fill="#8D6E63" opacity="0.60"/>
      <rect x="368" y="162" width="48" height="8" rx="3" fill="#6D4C41" opacity="0.60"/>

      {/* Water drop with check (low water needed) */}
      <ellipse cx="490" cy="118" rx="18" ry="22" fill="#B3E5FC" opacity="0.55"
               stroke={C} strokeWidth="1.5"/>
      <path d="M490 96 Q490 90 494 93 Q499 97 490 96Z" fill={C} opacity="0.45"/>
      <path d="M484 116 L489 123 L498 108" fill="none" stroke="#2E7D32"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      <SavingsBadge x={590} y={108} amount="378L" color={C}/>

      <LB x={260} y={196} w={380} h={15} rx={3}/>
      <text x="260" y="195" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Magtanim ng cactus at succulents — kaunti lang ang kailangan nilang tubig
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 150 — Bulletin 003: Water Conservation at Home
// ─────────────────────────────────────────────────────────────────────────────
export function Illus150() {
  const C = "#1565C0";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin 003 — Water Conservation at Home practices</title>
      <rect width="680" height="210" fill="#E3F2FD" opacity="0.30" rx="12"/>

      {/* House outline */}
      <polygon points="340,20 540,90 540,200 140,200 140,90" fill="#E3F2FD"
               stroke="#1565C0" strokeWidth="2" opacity="0.60"/>
      <polygon points="340,20 560,86 120,86" fill="#1565C0" opacity="0.20"/>

      {/* Rooms with water icons */}
      {/* Kitchen */}
      <rect x="155" y="102" width="120" height="90" rx="4" fill="white"
            stroke={C} strokeWidth="1" opacity="0.50"/>
      <text x="215" y="142" textAnchor="middle" fontSize="22">🍳</text>
      <LB x={215} y={186} w={90} h={13} rx={3}/>
      <text x="215" y="185" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={C}>Kitchen</text>

      {/* Bathroom */}
      <rect x="285" y="102" width="120" height="90" rx="4" fill="white"
            stroke={C} strokeWidth="1" opacity="0.50"/>
      <text x="345" y="142" textAnchor="middle" fontSize="22">🚿</text>
      <LB x={345} y={186} w={90} h={13} rx={3}/>
      <text x="345" y="185" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={C}>Banyo</text>

      {/* Laundry */}
      <rect x="415" y="102" width="120" height="90" rx="4" fill="white"
            stroke={C} strokeWidth="1" opacity="0.50"/>
      <text x="475" y="142" textAnchor="middle" fontSize="22">👕</text>
      <LB x={475} y={186} w={90} h={13} rx={3}/>
      <text x="475" y="185" textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fontWeight="700" fill={C}>Labada</text>

      {/* Title banner */}
      <rect x="100" y="56" width="480" height="30" rx="6" fill={C} opacity="0.75"/>
      <LB x={340} y={77} w={440} h={18} rx={4}/>
      <text x="340" y="76" textAnchor="middle" fontSize="14"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill={C}>
        Bulletin 003 — Water Conservation at Home
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 151 — Tip 1: Check water meter at night for leaks
// ─────────────────────────────────────────────────────────────────────────────
export function Illus151() {
  const C = "#0277BD";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 1 — check water meter at night to detect leaks</title>
      <rect width="680" height="210" fill="#E1F5FE" opacity="0.30" rx="12"/>

      {/* Moon / night */}
      <circle cx="80" cy="56" r="34" fill="#FFF9C4" opacity="0.60"/>
      <circle cx="102" cy="44" r="28" fill="#E3F2FD" opacity="0.80"/>
      {/* Stars */}
      {[[150,30],[190,50],[170,14],[210,24]].map(([cx,cy])=>(
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3" fill="#FFF59D" opacity="0.70"/>
      ))}

      {/* Water meter */}
      <rect x="220" y="80" width="180" height="100" rx="10" fill="#ECEFF1"
            stroke={C} strokeWidth="2"/>
      {/* Meter face */}
      <circle cx="310" cy="130" r="42" fill="white" stroke={C} strokeWidth="1.5"
              opacity="0.80"/>
      {/* Dial needle */}
      <line x1="310" y1="130" x2="330" y2="104" stroke="#b71c1c" strokeWidth="2.5"
            strokeLinecap="round"/>
      {/* Tick marks on dial */}
      {Array.from({length:8},(_,i)=>{
        const a = (i/8)*Math.PI*2 - Math.PI/2;
        return <line key={i}
          x1={310+Math.cos(a)*36} y1={130+Math.sin(a)*36}
          x2={310+Math.cos(a)*42} y2={130+Math.sin(a)*42}
          stroke={C} strokeWidth="1.5" strokeLinecap="round" opacity="0.50"/>;
      })}
      <LB x={310} y={152} w={72} h={14} rx={3}/>
      <text x="310" y="151" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={C}>WATER METER</text>

      {/* Arrow pointing to meter */}
      <path d="M440 130 Q490 110 520 130" fill="none" stroke={C} strokeWidth="2"
            strokeDasharray="5 3" opacity="0.55"/>
      <polygon points="520,125 532,130 520,135" fill={C} opacity="0.55"/>

      {/* Alert icon */}
      <circle cx="570" cy="110" r="32" fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.5"/>
      <text x="570" y="118" textAnchor="middle" fontSize="22" fontFamily="sans-serif">🔍</text>

      {/* Savings note */}
      <rect x="88" y="164" width="504" height="32" rx="8" fill="#E3F2FD"
            stroke={C} strokeWidth="1"/>
      <LB x={340} y={183} w={480} h={16} rx={3}/>
      <text x="340" y="182" textAnchor="middle" fontSize="11.5"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Gawin ito kung walang gumagamit ng tubig — ito ay nakakatuklas ng mga tumatagos na gripo
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 152 — Tip 2: Wash dishes right away → saves 500–1000L/month
// ─────────────────────────────────────────────────────────────────────────────
export function Illus152() {
  const C = "#00838F";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 2 — wash dishes right away to save 500 to 1000 liters per month</title>
      <rect width="680" height="210" fill="#E0F7FA" opacity="0.30" rx="12"/>

      {/* Clean plate */}
      <circle cx="420" cy="110" r="60" fill="white" stroke={C} strokeWidth="2"
              opacity="0.80"/>
      <circle cx="420" cy="110" r="44" fill="none" stroke={C} strokeWidth="1"
              opacity="0.30"/>
      {/* Checkmark */}
      <path d="M400 110 L415 126 L448 90" fill="none" stroke="#2E7D32"
            strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Dirty plate (before) */}
      <circle cx="215" cy="110" r="52" fill="#FFF9C4" stroke="#F57F17" strokeWidth="1.5"
              opacity="0.75"/>
      {/* Food bits */}
      {[[200,100],[218,118],[230,102],[204,120]].map(([cx,cy],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={5+i} ry={4}
                 fill="#FF8A65" opacity="0.65"/>
      ))}

      {/* Soap bubbles */}
      {[[460,72],[480,60],[500,76],[490,92],[468,88]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={7+i*1.5} fill="white"
                stroke="#42A5F5" strokeWidth="1" opacity="0.55"/>
      ))}

      {/* Arrow */}
      <line x1="278" y1="110" x2="348" y2="110" stroke={C} strokeWidth="2.5"
            strokeDasharray="6 3" opacity="0.55"/>
      <polygon points="348,105 360,110 348,115" fill={C} opacity="0.55"/>

      <SavingsBadge x={590} y={108} amount="500–1000L" color={C}/>

      <LB x={265} y={195} w={360} h={15} rx={3}/>
      <text x="265" y="194" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Hugasan ang pinggan agad — mas madali bago matuyo ang pagkain
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 153 — Tip 3: Thaw food in advance (no running water)
// ─────────────────────────────────────────────────────────────────────────────
export function Illus153() {
  const C = "#5C6BC0";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 3 — take out frozen food in advance to avoid using running water to thaw</title>
      <rect width="680" height="210" fill="#E8EAF6" opacity="0.30" rx="12"/>

      {/* Freezer / ice block (bad) */}
      <rect x="80" y="60" width="120" height="120" rx="8" fill="#B3E5FC"
            stroke="#0288D1" strokeWidth="1.5" opacity="0.75"/>
      {/* Ice crystals */}
      {[[120,90],[148,110],[130,130],[160,86]].map(([cx,cy])=>(
        <g key={`${cx}${cy}`}>
          <line x1={cx-8} y1={cy} x2={cx+8} y2={cy} stroke="#0288D1"
                strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
          <line x1={cx} y1={cy-8} x2={cx} y2={cy+8} stroke="#0288D1"
                strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
          <line x1={cx-6} y1={cy-6} x2={cx+6} y2={cy+6} stroke="#0288D1"
                strokeWidth="1" strokeLinecap="round" opacity="0.40"/>
        </g>
      ))}
      <LB x={140} y={192} w={100} h={14} rx={3}/>
      <text x="140" y="191" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#0288D1">Frozen food</text>

      {/* Running water (bad method) — crossed out */}
      {[205,215,225].map((x,i)=>(
        <path key={i} d={`M${x} 70 Q${x+3} 84 ${x-2} 96`}
              fill="none" stroke="#42A5F5" strokeWidth="2" opacity="0.40"/>
      ))}
      <line x1="192" y1="60" x2="240" y2="108" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.70"/>
      <line x1="240" y1="60" x2="192" y2="108" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.70"/>

      {/* Clock (plan ahead) */}
      <circle cx="370" cy="110" r="56" fill="white" stroke={C} strokeWidth="2.5"
              opacity="0.85"/>
      {/* Clock hands — hours at 6, minutes at 12 */}
      <line x1="370" y1="110" x2="370" y2="64" stroke={C} strokeWidth="3"
            strokeLinecap="round" opacity="0.75"/>
      <line x1="370" y1="110" x2="370" y2="138" stroke={C} strokeWidth="2"
            strokeLinecap="round" opacity="0.65"/>
      {/* "Plan ahead" */}
      <LB x={370} y={152} w={90} h={14} rx={3}/>
      <text x="370" y="151" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={C}>Plan ahead!</text>

      {/* Arrow to plate / thawed food */}
      <line x1="432" y1="110" x2="490" y2="110" stroke={C} strokeWidth="2"
            strokeDasharray="5 3" opacity="0.50"/>
      <polygon points="490,105 502,110 490,115" fill={C} opacity="0.50"/>
      <circle cx="540" cy="110" r="36" fill="#FFF9C4" stroke="#FF8A65" strokeWidth="1.5"
              opacity="0.75"/>
      <text x="540" y="118" textAnchor="middle" fontSize="24">🍗</text>

      <LB x={340} y={196} w={400} h={15} rx={3}/>
      <text x="340" y="195" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Ilabas ang frozen food nang maaga — huwag gumamit ng tubig para i-thaw
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 154 — Tip 4: Water plants early morning or late afternoon
// ─────────────────────────────────────────────────────────────────────────────
export function Illus154() {
  const C = "#2E7D32";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 4 — water plants early morning or late afternoon to reduce evaporation</title>
      <rect width="680" height="210" fill="#F1F8E9" opacity="0.35" rx="12"/>

      {/* Sun (noon = BAD) */}
      <circle cx="150" cy="72" r="32" fill="#FDD835" opacity="0.60"/>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>{
        const r = Math.PI*deg/180;
        return <line key={i} x1={150+Math.cos(r)*36} y1={72+Math.sin(r)*36}
                     x2={150+Math.cos(r)*46} y2={72+Math.sin(r)*46}
                     stroke="#FDD835" strokeWidth="2.5" strokeLinecap="round" opacity="0.65"/>;
      })}
      {/* Evaporation arrows */}
      {[130,150,170].map((x,i)=>(
        <path key={i} d={`M${x} 108 Q${x+4} 90 ${x-2} 74`}
              fill="none" stroke="#F57F17" strokeWidth="2" strokeDasharray="4 3"
              opacity="0.60"/>
      ))}
      <line x1="118" y1="62" x2="182" y2="130" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.60"/>
      <line x1="182" y1="62" x2="118" y2="130" stroke="#b71c1c" strokeWidth="3"
            strokeLinecap="round" opacity="0.60"/>

      {/* Sun rising / setting (GOOD) */}
      <path d="M310 148 Q340 90 370 148" fill="#FFF9C4" opacity="0.55"
            stroke="#FDD835" strokeWidth="1.5"/>
      {[300,340,380].map((x,i)=>(
        <line key={i} x1={x} y1={148} x2={x} y2={138} stroke="#FDD835"
              strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
      ))}
      <path d="M270 150 L410 150" stroke="#A5D6A7" strokeWidth="2" opacity="0.45"/>

      {/* Watering can */}
      <path d="M430 90 Q450 80 480 88 Q500 94 504 114 Q508 134 490 144 Q470 154 448 144 Q426 134 424 114 Q422 94 430 90 Z"
            fill="#90CAF9" stroke="#1565C0" strokeWidth="1.5" opacity="0.75"/>
      {/* Spout */}
      <path d="M504 110 Q530 100 548 116" fill="none" stroke="#1565C0"
            strokeWidth="3" strokeLinecap="round" opacity="0.65"/>
      {/* Water drops from spout */}
      {[555,562,569].map((x,i)=>(
        <ellipse key={i} cx={x} cy={120+i*10} rx={3} ry={5}
                 fill="#42A5F5" opacity="0.65"/>
      ))}
      {/* Handle */}
      <path d="M446 92 Q440 70 454 62 Q468 54 474 70" fill="none"
            stroke="#1565C0" strokeWidth="3" strokeLinecap="round" opacity="0.65"/>

      {/* Plant */}
      <rect x="526" y="152" width="40" height="10" rx="3" fill="#8D6E63" opacity="0.60"/>
      <path d="M546 152 Q546 120 530 100" fill="none" stroke="#2E7D32"
            strokeWidth="3" strokeLinecap="round" opacity="0.70"/>
      <ellipse cx="530" cy="99" rx="18" ry="11" fill="#4CAF50" opacity="0.70"/>
      <ellipse cx="556" cy="115" rx="14" ry="9" fill="#66BB6A" opacity="0.65"/>

      <LB x={340} y={197} w={450} h={15} rx={3}/>
      <text x="340" y="196" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Diligan ang halaman tuwing umaga o hapon — mas mababa ang evaporation
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 155 — Tip 5: Full loads only + right detergent → saves 5–10L/load
// ─────────────────────────────────────────────────────────────────────────────
export function Illus155() {
  const C = "#1565C0";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 5 — wash full loads only and use right detergent amount, saves 5 to 10 liters per load</title>
      <rect width="680" height="210" fill="#E3F2FD" opacity="0.30" rx="12"/>

      {/* Washing machine */}
      <rect x="150" y="40" width="180" height="160" rx="12" fill="#ECEFF1"
            stroke={C} strokeWidth="2"/>
      {/* Door porthole */}
      <circle cx="240" cy="130" r="62" fill="white" stroke={C} strokeWidth="2"
              opacity="0.80"/>
      <circle cx="240" cy="130" r="50" fill="#E3F2FD" stroke={C} strokeWidth="1"
              opacity="0.55"/>
      {/* Clothes inside (full load) */}
      {[
        [224,118,"#EF9A9A"],[248,124,"#90CAF9"],[232,138,"#A5D6A7"],
        [256,112,"#FFE082"],[216,132,"#CE93D8"]
      ].map(([cx,cy,fill])=>(
        <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx={12} ry={8}
                 fill={fill} opacity="0.75"/>
      ))}
      {/* Control panel */}
      <rect x="160" y="52" width="160" height="28" rx="5" fill="#CFD8DC" opacity="0.60"/>
      <circle cx="188" cy="66" r="8" fill={C} opacity="0.55"/>
      <circle cx="210" cy="66" r="6" fill="#90A4AE" opacity="0.45"/>
      <rect x="222" y="60" width="90" height="12" rx="3" fill="#B0BEC5" opacity="0.50"/>

      {/* FULL label */}
      <rect x="168" y="86" width="144" height="24" rx="5" fill="#E8F5E9"
            stroke="#2E7D32" strokeWidth="1"/>
      <LB x={240} y={101} w={120} h={16} rx={3}/>
      <text x="240" y="100" textAnchor="middle" fontSize="13"
            fontFamily="sans-serif" fontWeight="800" fill="#2E7D32">✓ FULL LOAD</text>

      {/* Detergent box */}
      <rect x="400" y="80" width="100" height="120" rx="6" fill="#E8EAF6"
            stroke={C} strokeWidth="1.5"/>
      <rect x="400" y="80" width="100" height="30" rx="6" fill={C} opacity="0.55"/>
      <LB x={450} y={99} w={88} h={16} rx={3}/>
      <text x="450" y="98" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="white">Detergent</text>
      {/* Measuring lines */}
      <line x1="416" y1="130" x2="484" y2="130" stroke={C} strokeWidth="1"
            strokeDasharray="4 2" opacity="0.45"/>
      <line x1="416" y1="146" x2="484" y2="146" stroke={C} strokeWidth="1"
            strokeDasharray="4 2" opacity="0.35"/>
      {/* Arrow to right amount */}
      <path d="M490 130 Q520 112 546 118" fill="none" stroke={C} strokeWidth="2"
            strokeDasharray="4 3" opacity="0.50"/>
      <text x="554" y="128" fontSize="16" fontFamily="sans-serif">✓</text>

      <SavingsBadge x={596} y={108} amount="5–10L" color={C}/>

      <LB x={300} y={197} w={400} h={15} rx={3}/>
      <text x="300" y="196" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Mag-wash ng buong load — gamitin ang tamang halaga ng detergent
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 156 — Tip 6: Shorter shower → saves up to 568L/month
// ─────────────────────────────────────────────────────────────────────────────
export function Illus156() {
  const C = "#0288D1";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 6 — take shorter showers to save up to 568 liters per month</title>
      <rect width="680" height="210" fill="#E1F5FE" opacity="0.30" rx="12"/>

      {/* Before: long shower hourglass */}
      <rect x="80" y="50" width="56" height="130" rx="8" fill="#B3E5FC" opacity="0.55"
            stroke={C} strokeWidth="1.5"/>
      {/* Water fill — high */}
      <rect x="80" y="90" width="56" height="90" rx="6" fill="#0288D1" opacity="0.35"/>
      <LB x={108} y={65} w={60} h={14} rx={3}/>
      <text x="108" y="64" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={C}>Long 🕐</text>
      <LB x={108} y={196} w={80} h={14} rx={3}/>
      <text x="108" y="195" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill="#b71c1c">Maraming tubig!</text>

      {/* Arrow */}
      <line x1="150" y1="120" x2="230" y2="120" stroke={C} strokeWidth="2.5"
            strokeDasharray="5 3" opacity="0.55"/>
      <polygon points="230,115 242,120 230,125" fill={C} opacity="0.55"/>
      <text x="190" y="108" textAnchor="middle" fontSize="20">→</text>

      {/* After: short shower */}
      <rect x="250" y="80" width="56" height="100" rx="8" fill="#B3E5FC" opacity="0.55"
            stroke={C} strokeWidth="1.5"/>
      <rect x="250" y="130" width="56" height="50" rx="6" fill="#0288D1" opacity="0.30"/>
      <LB x={278} y={95} w={60} h={14} rx={3}/>
      <text x="278" y="94" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill={C}>5 min ✓</text>
      <LB x={278} y={196} w={80} h={14} rx={3}/>
      <text x="278" y="195" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill="#2E7D32">Tipid!</text>

      {/* Savings jar */}
      <path d="M400 80 Q410 70 460 70 Q510 70 520 80 L530 170 Q530 185 460 188 Q390 185 390 170 Z"
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      {/* Water level in jar */}
      <path d="M393 140 Q420 134 460 138 Q500 142 527 136 L530 170 Q530 185 460 188 Q390 185 390 170 Z"
            fill="#0288D1" opacity="0.30"/>
      <LB x={460} y={125} w={100} h={20} rx={4}/>
      <text x="460" y="124" textAnchor="middle" fontSize="18"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill={C}>568L</text>
      <LB x={460} y={148} w={100} h={14} rx={3}/>
      <text x="460" y="147" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill="#2E7D32">natipid / buwan</text>

      <SavingsBadge x={600} y={108} amount="568L/mo" color={C}/>

      <LB x={265} y={198} w={350} h={15} rx={3}/>
      <text x="265" y="197" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Mag-shower nang mas maikli — 1–2 minuto = 568L/buwan
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 157 — Tip 7: Tissue in trash, not toilet → saves 6L per flush
// ─────────────────────────────────────────────────────────────────────────────
export function Illus157() {
  const C = "#00695C";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 7 — dispose tissue in trash not toilet, flushing uses 6 liters</title>
      <rect width="680" height="210" fill="#E0F2F1" opacity="0.30" rx="12"/>

      {/* Toilet with X */}
      <ellipse cx="170" cy="162" rx="64" ry="26" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1.5"/>
      <path d="M106 142 Q106 100 170 98 Q234 100 234 142 L234 162 Q234 180 170 182 Q106 180 106 162 Z"
            fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1.5"/>
      <ellipse cx="170" cy="156" rx="48" ry="16" fill="#B3E5FC" opacity="0.60"/>
      <rect x="130" y="68" width="80" height="48" rx="6" fill="#ECEFF1"
            stroke="#90A4AE" strokeWidth="1.5"/>
      {/* Tissue */}
      <rect x="148" y="100" width="26" height="20" rx="3" fill="#FFF9C4"
            stroke="#F9A825" strokeWidth="1.2"/>
      {/* Big X */}
      <line x1="110" y1="68" x2="230" y2="188" stroke="#b71c1c" strokeWidth="3.5"
            strokeLinecap="round" opacity="0.65"/>
      <line x1="230" y1="68" x2="110" y2="188" stroke="#b71c1c" strokeWidth="3.5"
            strokeLinecap="round" opacity="0.65"/>

      {/* Arrow */}
      <line x1="256" y1="120" x2="318" y2="120" stroke={C} strokeWidth="2.5"
            strokeDasharray="5 3" opacity="0.55"/>
      <polygon points="318,115 330,120 318,125" fill={C} opacity="0.55"/>

      {/* Wastebasket (correct) */}
      <path d="M348 80 L368 80 L364 180 L334 180 L330 80 Z"
            fill="#E8F5E9" stroke={C} strokeWidth="1.5"/>
      <rect x="326" y="72" width="46" height="12" rx="4" fill={C} opacity="0.45"/>
      {/* Tissue inside bin */}
      <rect x="336" y="110" width="22" height="16" rx="2" fill="#FFF9C4"
            stroke="#F9A825" strokeWidth="1"/>
      {/* Green check on bin */}
      <circle cx="349" cy="80" r="10" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5"/>
      <path d="M344 80 L348 85 L357 72" fill="none" stroke="#2E7D32"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Water savings callout */}
      <rect x="406" y="72" width="186" height="96" rx="10" fill="#E8F5E9"
            stroke={C} strokeWidth="1.5"/>
      <LB x={499} y={100} w={170} h={22} rx={4}/>
      <text x="499" y="99" textAnchor="middle" fontSize="20"
            fontFamily="'Playfair Display',serif" fontWeight="700" fill={C}>6 Litro</text>
      <LB x={499} y={124} w={170} h={16} rx={3}/>
      <text x="499" y="123" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="#333">natipid bawat flush</text>
      <LB x={499} y={158} w={170} h={14} rx={3}/>
      <text x="499" y="157" textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fill="#555">Huwag mag-flush ng tissue!</text>

      <LB x={310} y={198} w={380} h={15} rx={3}/>
      <text x="310" y="197" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Itapon ang tissue sa basurahan — bawat flush = 6L ng tubig
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 158 — Tip 8: Share your water conservation tips with others
// ─────────────────────────────────────────────────────────────────────────────
export function Illus158() {
  const C = "#1565C0";
  return (
    <svg width="100%" viewBox="0 0 680 210" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>Bulletin Tip 8 — share your water conservation tips with others</title>
      <rect width="680" height="210" fill="#E8EAF6" opacity="0.30" rx="12"/>

      {/* Central person (sharer) */}
      <circle cx="340" cy="80" r="30" fill="#1565C0" opacity="0.45"/>
      <path d="M310 140 Q318 112 340 108 Q362 112 370 140"
            fill="none" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" opacity="0.50"/>

      {/* Speech bubbles radiating out */}
      {[
        {x:150,  y:70,  tip:"💧 Patayin\nang gripo!"},
        {x:170,  y:160, tip:"🚿 5 min\nshower!"},
        {x:520,  y:70,  tip:"🌿 Magtanim\nng succulents!"},
        {x:510,  y:162, tip:"👕 Full\nloads lang!"},
      ].map(({x, y, tip}) => {
        const angle = Math.atan2(y - 80, x - 340);
        const ex = 340 + Math.cos(angle) * 54;
        const ey = 80 + Math.sin(angle) * 38;
        return (
          <g key={`${x}${y}`}>
            <line x1={ex} y1={ey} x2={x + (x<340?30:-30)} y2={y + 16}
                  stroke={C} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.40"/>
            <rect x={x - 52} y={y} width={104} height={52} rx={10}
                  fill="white" stroke={C} strokeWidth="1.5" opacity="0.85"/>
            {/* Bubble tail */}
            <polygon points={`${x},${y+52} ${x-8},${y+62} ${x+12},${y+52}`}
                     fill="white" stroke={C} strokeWidth="1" opacity="0.85"/>
            {tip.split("\n").map((line, j) => (
              <g key={j}>
                <LB x={x} y={y + 18 + j * 18} w={96} h={15} rx={3}/>
                <text x={x} y={y + 17 + j * 18} textAnchor="middle" fontSize="12"
                      fontFamily="sans-serif" fontWeight="700" fill={C}>{line}</text>
              </g>
            ))}
          </g>
        );
      })}

      {/* Megaphone icon */}
      <path d="M320 76 L310 84 L310 100 L320 108 L320 76 Z"
            fill="#1565C0" opacity="0.60"/>
      <path d="M320 78 Q340 68 360 60 L360 124 Q340 116 320 106 Z"
            fill="#1565C0" opacity="0.45"/>
      <line x1="310" y1="100" x2="302" y2="120" stroke="#1565C0" strokeWidth="2"
            strokeLinecap="round" opacity="0.55"/>

      {/* Water drop cascading */}
      {[440,458,476].map((cx,i)=>(
        <ellipse key={i} cx={cx} cy={118 + i*10} rx={6} ry={8}
                 fill="#42A5F5" opacity="0.50"/>
      ))}

      <LB x={340} y={198} w={420} h={15} rx={3}/>
      <text x="340" y="197" textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill={C}>
        Ibahagi ang iyong mga water conservation tips sa iba!
      </text>
    </svg>
  );
}