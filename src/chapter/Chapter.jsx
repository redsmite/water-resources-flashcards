// ── chapter/chapter.jsx ───────────────────────────────────────────────────────
import { useState, useRef } from "react";
import "../global.css";
import "./chapter.css";

// ── SVG Illustrations keyed by [moduleId][chapterIndex] ──────────────────────
const ILLUSTRATIONS = {
  // Module 1 — The 2030 Agenda
  "1-0": () => (
    <svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <defs>
        <radialGradient id="m1c0bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0c2a4a"/>
          <stop offset="100%" stopColor="#061828"/>
        </radialGradient>
      </defs>
      <rect width="420" height="180" fill="url(#m1c0bg)" rx="12"/>
      {/* Globe */}
      <circle cx="210" cy="90" r="62" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.3"/>
      <circle cx="210" cy="90" r="62" fill="#0c3a5e" opacity="0.6"/>
      {/* Continents simplified */}
      <ellipse cx="195" cy="75" rx="22" ry="16" fill="#22c55e" opacity="0.7"/>
      <ellipse cx="230" cy="85" rx="18" ry="20" fill="#22c55e" opacity="0.7"/>
      <ellipse cx="175" cy="100" rx="14" ry="10" fill="#22c55e" opacity="0.6"/>
      <ellipse cx="245" cy="105" rx="10" ry="8" fill="#22c55e" opacity="0.5"/>
      {/* Latitude lines */}
      {[-30,-15,0,15,30].map((y,i) => (
        <ellipse key={i} cx="210" cy={90+y} rx={Math.sqrt(62*62-(y*y))*0.98} ry="6" fill="none" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.2"/>
      ))}
      {/* Longitude lines */}
      {[0,45,90,135].map((a,i) => (
        <line key={i} x1={210+62*Math.cos(a*Math.PI/180)} y1={90+62*Math.sin(a*Math.PI/180)}
          x2={210-62*Math.cos(a*Math.PI/180)} y2={90-62*Math.sin(a*Math.PI/180)}
          stroke="#0ea5e9" strokeWidth="0.5" opacity="0.2"/>
      ))}
      {/* 5 P labels around globe */}
      {[
        {label:"People", x:80, y:55, color:"#f472b6"},
        {label:"Planet", x:330, y:55, color:"#22c55e"},
        {label:"Prosperity", x:60, y:125, color:"#fbbf24"},
        {label:"Peace", x:335, y:125, color:"#818cf8"},
        {label:"Partnership", x:192, y:170, color:"#fb923c"},
      ].map((p,i) => (
        <g key={i}>
          <line x1={p.x + (p.x < 210 ? 30 : -30)} y1={p.y} x2={p.x < 210 ? 148 : 272} y2={p.y < 100 ? 75 : 105}
            stroke={p.color} strokeWidth="0.8" opacity="0.5" strokeDasharray="3,2"/>
          <circle cx={p.x + (p.x < 210 ? 0 : 0)} cy={p.y} r="18" fill={p.color} opacity="0.12"/>
          <text x={p.x} y={p.y+1} textAnchor="middle" dominantBaseline="middle"
            fill={p.color} fontSize="8.5" fontWeight="700" fontFamily="monospace">{p.label}</text>
        </g>
      ))}
      {/* Center glow */}
      <circle cx="210" cy="90" r="10" fill="#0ea5e9" opacity="0.15"/>
      <circle cx="210" cy="90" r="5" fill="#0ea5e9" opacity="0.4"/>
      {/* Stars */}
      {[[30,20],[380,15],[50,160],[390,155],[100,165],[320,20],[70,90],[360,90]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="white" opacity="0.4"/>
      ))}
    </svg>
  ),
  "1-1": () => (
    <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="160" fill="#061828" rx="12"/>
      {/* 17 SDG colored blocks */}
      {[
        "#e5243b","#dda63a","#4c9f38","#c5192d","#ff3a21",
        "#26bde2","#fcc30b","#a21942","#fd6925","#dd1367",
        "#fd9d24","#bf8b2e","#3f7e44","#0a97d9","#56c02b",
        "#00689d","#19486a"
      ].map((color, i) => (
        <g key={i}>
          <rect x={12 + (i%9)*45} y={i < 9 ? 20 : 80} width="40" height="40" rx="6" fill={color} opacity="0.85"/>
          <text x={12 + (i%9)*45 + 20} y={i < 9 ? 45 : 105} textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="13" fontWeight="800" fontFamily="monospace">{i+1}</text>
        </g>
      ))}
      <text x="210" y="148" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">17 SUSTAINABLE DEVELOPMENT GOALS · 2030 AGENDA</text>
    </svg>
  ),
  "1-2": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <defs>
        <linearGradient id="waterg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* Water drop large */}
      <path d="M210 30 Q240 75 240 105 A30 30 0 0 1 180 105 Q180 75 210 30Z" fill="url(#waterg)"/>
      <ellipse cx="200" cy="100" rx="8" ry="5" fill="white" opacity="0.2"/>
      {/* 6 targets as circles */}
      {[
        {label:"6.1", desc:"Safe Water", x:70, y:55, color:"#38bdf8"},
        {label:"6.2", desc:"Sanitation", x:350, y:55, color:"#34d399"},
        {label:"6.3", desc:"Quality", x:45, y:110, color:"#818cf8"},
        {label:"6.4", desc:"Efficiency", x:375, y:110, color:"#fbbf24"},
        {label:"6.5", desc:"IWRM", x:80, y:155, color:"#fb923c"},
        {label:"6.6", desc:"Ecosystems", x:340, y:155, color:"#f472b6"},
      ].map((t,i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="28" fill={t.color} opacity="0.12"/>
          <circle cx={t.x} cy={t.y} r="28" fill="none" stroke={t.color} strokeWidth="1" opacity="0.4"/>
          <text x={t.x} y={t.y-6} textAnchor="middle" fill={t.color} fontSize="10" fontWeight="800" fontFamily="monospace">{t.label}</text>
          <text x={t.x} y={t.y+7} textAnchor="middle" fill={t.color} fontSize="7.5" fontFamily="monospace">{t.desc}</text>
          {/* line to drop */}
          <line x1={t.x < 210 ? t.x+28 : t.x-28} y1={t.y}
            x2={t.x < 210 ? 185 : 235} y2={95}
            stroke={t.color} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4"/>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="700">SDG 6 · CLEAN WATER AND SANITATION</text>
    </svg>
  ),

  // Module 2 — NWRB Overview
  "2-0": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* Timeline */}
      <line x1="40" y1="90" x2="380" y2="90" stroke="#38bdf8" strokeWidth="2" opacity="0.3"/>
      {[
        {year:"1974", label:"PD 424\nNWRC Created", x:60},
        {year:"1976", label:"PD 1067\nWater Code", x:130},
        {year:"1987", label:"EO 124-A\nRenamed NWRB", x:210},
        {year:"2002", label:"EO 123\nTo DENR", x:285},
        {year:"2023", label:"EO 22\nWRMO", x:370},
      ].map((e,i) => (
        <g key={i}>
          <circle cx={e.x} cy="90" r="7" fill="#38bdf8" opacity="0.8"/>
          <circle cx={e.x} cy="90" r="12" fill="#38bdf8" opacity="0.1"/>
          <text x={e.x} y="72" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="800" fontFamily="monospace">{e.year}</text>
          {e.label.split("\n").map((l,j) => (
            <text key={j} x={e.x} y={112+j*12} textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">{l}</text>
          ))}
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="700">NWRB · HISTORY AND EVOLUTION</text>
    </svg>
  ),
  "2-1": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* 3 function pillars */}
      {[
        {label:"Policy", sub:"Formulation", icon:"📋", x:90, color:"#818cf8"},
        {label:"Resource", sub:"Regulation", icon:"💧", x:210, color:"#38bdf8"},
        {label:"Economic", sub:"Regulation", icon:"📊", x:330, color:"#34d399"},
      ].map((p,i) => (
        <g key={i}>
          <rect x={p.x-55} y="30" width="110" height="110" rx="10" fill={p.color} opacity="0.08"/>
          <rect x={p.x-55} y="30" width="110" height="110" rx="10" fill="none" stroke={p.color} strokeWidth="1" opacity="0.3"/>
          <text x={p.x} y="68" textAnchor="middle" fontSize="28">{p.icon}</text>
          <text x={p.x} y="95" textAnchor="middle" fill={p.color} fontSize="10" fontWeight="800" fontFamily="monospace">{p.label}</text>
          <text x={p.x} y="110" textAnchor="middle" fill={p.color} fontSize="9" fontFamily="monospace" opacity="0.7">{p.sub}</text>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="monospace">NWRB · THREE CORE FUNCTIONS</text>
    </svg>
  ),
  "2-2": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* Org chart */}
      {/* Top: DENR Secretary */}
      <rect x="145" y="15" width="130" height="32" rx="6" fill="#38bdf8" opacity="0.15"/>
      <rect x="145" y="15" width="130" height="32" rx="6" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5"/>
      <text x="210" y="28" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="800" fontFamily="monospace">Chairperson</text>
      <text x="210" y="40" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">DENR Secretary</text>
      {/* Vice chair */}
      <line x1="210" y1="47" x2="210" y2="62" stroke="#38bdf8" strokeWidth="1" opacity="0.3"/>
      <rect x="145" y="62" width="130" height="32" rx="6" fill="#818cf8" opacity="0.15"/>
      <rect x="145" y="62" width="130" height="32" rx="6" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.5"/>
      <text x="210" y="75" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="800" fontFamily="monospace">Vice-Chairperson</text>
      <text x="210" y="87" textAnchor="middle" fill="#818cf8" fontSize="7" fontFamily="monospace">DEPDev Secretary</text>
      {/* Members */}
      <line x1="210" y1="94" x2="210" y2="108" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
      <line x1="75" y1="108" x2="345" y2="108" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
      {[
        {label:"DOJ", sub:"Secretary", x:75, color:"#fbbf24"},
        {label:"DOST", sub:"Secretary", x:185, color:"#34d399"},
        {label:"UP-NHRC", sub:"Exec. Director", x:295, color:"#fb923c"},
      ].map((m,i) => (
        <g key={i}>
          <line x1={m.x} y1="108" x2={m.x} y2="120" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
          <rect x={m.x-45} y="120" width="90" height="35" rx="6" fill={m.color} opacity="0.1"/>
          <rect x={m.x-45} y="120" width="90" height="35" rx="6" fill="none" stroke={m.color} strokeWidth="1" opacity="0.4"/>
          <text x={m.x} y="134" textAnchor="middle" fill={m.color} fontSize="9" fontWeight="800" fontFamily="monospace">{m.label}</text>
          <text x={m.x} y="147" textAnchor="middle" fill={m.color} fontSize="7" fontFamily="monospace">{m.sub}</text>
        </g>
      ))}
      <text x="210" y="167" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">NWRB BOARD COMPOSITION · EO 860 (2010)</text>
    </svg>
  ),

  // Module 3 — Legal Mandates
  "3-0": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#0d0a1f" rx="12"/>
      {/* Vertical timeline */}
      <line x1="110" y1="20" x2="110" y2="155" stroke="#818cf8" strokeWidth="1.5" opacity="0.3"/>
      {[
        {year:"1974", label:"PD 424 — NWRC Created", y:28},
        {year:"1976", label:"PD 1067 — Water Code", y:52},
        {year:"1977", label:"PD 1206 — Expanded Scope", y:76},
        {year:"1987", label:"EO 124-A — Renamed NWRB", y:100},
        {year:"2002", label:"EO 123 — Transfer to DENR", y:124},
        {year:"2010", label:"EO 860 — Board Redefined", y:136},
        {year:"2023", label:"EO 22 — WRMO Created", y:152},
      ].map((e,i) => (
        <g key={i}>
          <circle cx="110" cy={e.y} r="5" fill="#818cf8" opacity="0.8"/>
          <rect x="125" y={e.y-10} width="270" height="20" rx="4" fill="#818cf8" opacity={0.05 + i*0.015}/>
          <text x="118" y={e.y-2} fill="#818cf8" fontSize="8.5" fontWeight="800" fontFamily="monospace">{e.year}</text>
          <text x="165" y={e.y+1} dominantBaseline="middle" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">{e.label}</text>
        </g>
      ))}
    </svg>
  ),
  "3-1": () => (
    <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="160" fill="#0d0a1f" rx="12"/>
      {/* EO 22 document visual */}
      <rect x="30" y="20" width="160" height="125" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" opacity="0.8"/>
      <rect x="40" y="32" width="140" height="16" rx="3" fill="#818cf8" opacity="0.2"/>
      <text x="110" y="44" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="800" fontFamily="monospace">EXECUTIVE ORDER NO. 22</text>
      <text x="110" y="62" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">Signed: April 27, 2023</text>
      <text x="110" y="75" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">President F.R. Marcos Jr.</text>
      {["Establish WRMO","Draft IWMP","Coordinate agencies","Submit quarterly reports","Champion DWR bill"].map((l,i) => (
        <g key={i}>
          <circle cx="48" cy={93+i*13} r="3" fill="#818cf8" opacity="0.6"/>
          <text x="57" y={97+i*13} fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* Attached agencies */}
      <text x="260" y="35" textAnchor="middle" fill="#818cf8" fontSize="8.5" fontWeight="800" fontFamily="monospace">ATTACHED TO DENR</text>
      {[
        {label:"NWRB", color:"#38bdf8", y:55},
        {label:"MWSS", color:"#34d399", y:88},
        {label:"LWUA", color:"#fbbf24", y:121},
        {label:"LLDA", color:"#f472b6", y:140},
      ].map((a,i) => (
        <g key={i}>
          <rect x="205" y={a.y-13} width="110" height="24" rx="6" fill={a.color} opacity="0.1"/>
          <rect x="205" y={a.y-13} width="110" height="24" rx="6" fill="none" stroke={a.color} strokeWidth="1" opacity="0.5"/>
          <text x="260" y={a.y+1} textAnchor="middle" fill={a.color} fontSize="9.5" fontWeight="800" fontFamily="monospace">{a.label}</text>
        </g>
      ))}
      <line x1="195" y1="80" x2="205" y2="80" stroke="#818cf8" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
    </svg>
  ),

  // Module 4 — WRMO & IWMP
  "4-0": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061a10" rx="12"/>
      {/* Hub and spokes */}
      <circle cx="210" cy="85" r="35" fill="#34d399" opacity="0.1"/>
      <circle cx="210" cy="85" r="35" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.5"/>
      <text x="210" y="82" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="800" fontFamily="monospace">WRMO</text>
      <text x="210" y="95" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace">Coordinator</text>
      {[
        {label:"PAGASA", x:90, y:30, color:"#38bdf8"},
        {label:"NIA", x:330, y:30, color:"#38bdf8"},
        {label:"DPWH", x:50, y:95, color:"#fbbf24"},
        {label:"NWRB", x:370, y:95, color:"#fbbf24"},
        {label:"LGUs", x:90, y:155, color:"#fb923c"},
        {label:"DEPDev", x:330, y:155, color:"#fb923c"},
        {label:"DOH", x:210, y:20, color:"#f472b6"},
        {label:"MGB", x:210, y:158, color:"#818cf8"},
      ].map((a,i) => {
        const dx = a.x - 210, dy = a.y - 85;
        const len = Math.sqrt(dx*dx+dy*dy);
        const ex = 210 + dx/len*35, ey = 85 + dy/len*35;
        const sx = a.x - dx/len*18, sy = a.y - dy/len*18;
        return (
          <g key={i}>
            <line x1={ex} y1={ey} x2={sx} y2={sy} stroke={a.color} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4"/>
            <circle cx={a.x} cy={a.y} r="18" fill={a.color} opacity="0.1"/>
            <circle cx={a.x} cy={a.y} r="18" fill="none" stroke={a.color} strokeWidth="1" opacity="0.4"/>
            <text x={a.x} y={a.y+1} textAnchor="middle" dominantBaseline="middle" fill={a.color} fontSize="8" fontWeight="700" fontFamily="monospace">{a.label}</text>
          </g>
        );
      })}
    </svg>
  ),
  "4-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#061a10" rx="12"/>
      {/* IWMP pyramid / 4 objectives */}
      {[
        {label:"Harness Supply", sub:"Maximize benefit to society", color:"#34d399", y:25, w:380},
        {label:"Harmonize Plans", sub:"Align all agency policies", color:"#22c55e", y:65, w:290},
        {label:"Climate Resilience", sub:"Withstand extreme events", color:"#16a34a", y:105, w:200},
        {label:"Engage Stakeholders", sub:"LGUs, private sector, civil society", color:"#15803d", y:135, w:130},
      ].map((o,i) => (
        <g key={i}>
          <rect x={(420-o.w)/2} y={o.y} width={o.w} height="32" rx="6" fill={o.color} opacity="0.15"/>
          <rect x={(420-o.w)/2} y={o.y} width={o.w} height="32" rx="6" fill="none" stroke={o.color} strokeWidth="1" opacity="0.5"/>
          <text x="210" y={o.y+13} textAnchor="middle" fill={o.color} fontSize="9" fontWeight="800" fontFamily="monospace">{o.label}</text>
          <text x="210" y={o.y+25} textAnchor="middle" fill={o.color} fontSize="7.5" fontFamily="monospace" opacity="0.7">{o.sub}</text>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">IWMP · 4 STRATEGIC OBJECTIVES · EO 22</text>
    </svg>
  ),
  "4-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <defs>
        <linearGradient id="tempgrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#ef4444"/>
        </linearGradient>
      </defs>
      <rect width="420" height="165" fill="#061a10" rx="12"/>
      {/* Climate threats */}
      {[
        {icon:"🌡️", label:"Prolonged Drought", sub:"Reduced river flows", x:70, y:55, color:"#ef4444"},
        {icon:"🌊", label:"Intense Rainfall", sub:"Flooding & contamination", x:210, y:55, color:"#38bdf8"},
        {icon:"🌊", label:"Sea Level Rise", sub:"Saltwater intrusion", x:350, y:55, color:"#818cf8"},
        {icon:"💧", label:"Reduced Supply", sub:"8 of 19 river basins", x:130, y:125, color:"#fbbf24"},
        {icon:"🏙️", label:"Manila Aquifer", sub:"Saltwater since 1960s", x:290, y:125, color:"#fb923c"},
      ].map((t,i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="32" fill={t.color} opacity="0.07"/>
          <circle cx={t.x} cy={t.y} r="32" fill="none" stroke={t.color} strokeWidth="1" opacity="0.3"/>
          <text x={t.x} y={t.y-10} textAnchor="middle" fontSize="18">{t.icon}</text>
          <text x={t.x} y={t.y+8} textAnchor="middle" fill={t.color} fontSize="7.5" fontWeight="800" fontFamily="monospace">{t.label}</text>
          <text x={t.x} y={t.y+20} textAnchor="middle" fill={t.color} fontSize="6.5" fontFamily="monospace" opacity="0.7">{t.sub}</text>
        </g>
      ))}
      <rect x="20" y="155" width="380" height="4" rx="2" fill="url(#tempgrad)" opacity="0.5"/>
      <text x="20" y="152" fill="#38bdf8" fontSize="7" fontFamily="monospace">Cool</text>
      <text x="390" y="152" textAnchor="end" fill="#ef4444" fontSize="7" fontFamily="monospace">Heat</text>
    </svg>
  ),

  // Module 5 — Water Code
  "5-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      {/* Balance scales */}
      <line x1="210" y1="20" x2="210" y2="80" stroke="#fbbf24" strokeWidth="2" opacity="0.6"/>
      <circle cx="210" cy="18" r="5" fill="#fbbf24" opacity="0.8"/>
      <line x1="120" y1="80" x2="300" y2="80" stroke="#fbbf24" strokeWidth="2" opacity="0.6"/>
      {/* Left pan — State ownership */}
      <line x1="130" y1="80" x2="130" y2="108" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
      <rect x="90" y="108" width="80" height="35" rx="6" fill="#fbbf24" opacity="0.1"/>
      <rect x="90" y="108" width="80" height="35" rx="6" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
      <text x="130" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="800" fontFamily="monospace">State Owns</text>
      <text x="130" y="135" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">All Waters</text>
      {/* Right pan — Water Permit */}
      <line x1="290" y1="80" x2="290" y2="108" stroke="#fbbf24" strokeWidth="1" opacity="0.4"/>
      <rect x="250" y="108" width="80" height="35" rx="6" fill="#34d399" opacity="0.1"/>
      <rect x="250" y="108" width="80" height="35" rx="6" fill="none" stroke="#34d399" strokeWidth="1" opacity="0.4"/>
      <text x="290" y="122" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="800" fontFamily="monospace">Citizens Use</text>
      <text x="290" y="135" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace">Water Permit</text>
      {/* 5 principles */}
      {["All waters → State","No acquisitive prescription","State grants concessions","NWRB controls all use","Priority based on needs"].map((p,i) => (
        <g key={i}>
          <circle cx="38" cy={22+i*26} r="4" fill="#fbbf24" opacity="0.6"/>
          <text x="50" y={26+i*26} fill="#94a3b8" fontSize="7.5" fontFamily="monospace">{p}</text>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace" fontWeight="700">PD 1067 · REGALIAN DOCTRINE · WATER CODE 1976</text>
    </svg>
  ),
  "5-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      {/* Priority order */}
      <text x="210" y="22" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="800" fontFamily="monospace">WATER USE PRIORITY ORDER</text>
      {[
        {n:"1", label:"Domestic", color:"#ef4444", w:340},
        {n:"2", label:"Municipal", color:"#fb923c", w:300},
        {n:"3", label:"Irrigation", color:"#fbbf24", w:260},
        {n:"4", label:"Power Generation", color:"#34d399", w:220},
        {n:"5", label:"Fisheries", color:"#38bdf8", w:180},
        {n:"6", label:"Livestock / Industrial", color:"#818cf8", w:140},
        {n:"7", label:"Recreational", color:"#f472b6", w:100},
      ].map((u,i) => (
        <g key={i}>
          <rect x={(420-u.w)/2} y={30+i*17} width={u.w} height="14" rx="3" fill={u.color} opacity="0.15"/>
          <rect x={(420-u.w)/2} y={30+i*17} width={u.w} height="14" rx="3" fill="none" stroke={u.color} strokeWidth="0.8" opacity="0.4"/>
          <text x={(420-u.w)/2+8} y={41+i*17} fill={u.color} fontSize="7.5" fontFamily="monospace" fontWeight="700">{u.n}. {u.label}</text>
        </g>
      ))}
      <text x="210" y="157" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">In emergencies: Domestic {'&'} Municipal take ABSOLUTE PRIORITY · Art. 22, PD 1067</text>
    </svg>
  ),
  "5-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      {/* Water permit flowchart */}
      {[
        {label:"Apply to NWRB", y:20, color:"#fbbf24"},
        {label:"Public Notice & Protests", y:55, color:"#fb923c"},
        {label:"NWRB Review & Approval", y:90, color:"#38bdf8"},
        {label:"Water Permit Issued", y:125, color:"#34d399"},
      ].map((s,i) => (
        <g key={i}>
          <rect x="110" y={s.y} width="200" height="28" rx="6" fill={s.color} opacity="0.12"/>
          <rect x="110" y={s.y} width="200" height="28" rx="6" fill="none" stroke={s.color} strokeWidth="1" opacity="0.5"/>
          <text x="210" y={s.y+15} textAnchor="middle" dominantBaseline="middle" fill={s.color} fontSize="9" fontWeight="700" fontFamily="monospace">{s.label}</text>
          {i < 3 && <line x1="210" y1={s.y+28} x2="210" y2={s.y+55} stroke={s.color} strokeWidth="1" strokeDasharray="3,2" opacity="0.4" markerEnd="url(#arr)"/>}
        </g>
      ))}
      {/* CPC box */}
      <rect x="330" y="55" width="75" height="45" rx="6" fill="#818cf8" opacity="0.1"/>
      <rect x="330" y="55" width="75" height="45" rx="6" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.4"/>
      <text x="367" y="72" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="800" fontFamily="monospace">+ CPC</text>
      <text x="367" y="85" textAnchor="middle" fill="#818cf8" fontSize="7" fontFamily="monospace">Public</text>
      <text x="367" y="96" textAnchor="middle" fill="#818cf8" fontSize="7" fontFamily="monospace">Utility</text>
      <line x1="310" y1="79" x2="330" y2="79" stroke="#818cf8" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
      <text x="210" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">WATER PERMIT PROCESS · NWRB · PD 1067</text>
    </svg>
  ),

  // Module 6 — Water Facts
  "6-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      {/* Philippines map outline simplified */}
      <text x="210" y="18" textAnchor="middle" fill="#fb7185" fontSize="8.5" fontWeight="800" fontFamily="monospace">PHILIPPINE WATER RESOURCES</text>
      {/* Stats boxes */}
      {[
        {n:"421", label:"Principal River Basins", color:"#fb7185", x:70, y:45},
        {n:"79", label:"Natural Lakes", color:"#f472b6", x:210, y:45},
        {n:"18", label:"Major River Basins", color:"#fb923c", x:350, y:45},
        {n:"47,895", label:"MCM Groundwater", color:"#38bdf8", x:105, y:110},
        {n:"532", label:"Water Districts", color:"#34d399", x:315, y:110},
      ].map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="38" fill={s.color} opacity="0.07"/>
          <circle cx={s.x} cy={s.y} r="38" fill="none" stroke={s.color} strokeWidth="1" opacity="0.3"/>
          <text x={s.x} y={s.y-4} textAnchor="middle" fill={s.color} fontSize="14" fontWeight="800" fontFamily="monospace">{s.n}</text>
          <text x={s.x} y={s.y+12} textAnchor="middle" fill={s.color} fontSize="6.5" fontFamily="monospace">{s.label}</text>
        </g>
      ))}
      {/* Water availability trend */}
      <text x="210" y="148" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">Per-capita: 1,907 m³ (2000) → 1,400 m³ (2016) ↓</text>
      <line x1="80" y1="155" x2="340" y2="155" stroke="#fb7185" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),
  "6-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <defs>
        <radialGradient id="earthg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a5f"/>
          <stop offset="100%" stopColor="#0a1628"/>
        </radialGradient>
      </defs>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      {/* Pie-like water distribution */}
      {/* Large ocean circle */}
      <circle cx="130" cy="85" r="65" fill="#1e40af" opacity="0.7"/>
      <text x="130" y="78" textAnchor="middle" fill="white" fontSize="18" fontWeight="800" fontFamily="monospace">97.2%</text>
      <text x="130" y="94" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">Salt Water</text>
      <text x="130" y="106" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="monospace">Oceans</text>
      {/* Freshwater */}
      <circle cx="290" cy="72" r="35" fill="#1d4ed8" opacity="0.6"/>
      <text x="290" y="68" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="monospace">2.8%</text>
      <text x="290" y="83" textAnchor="middle" fill="#bfdbfe" fontSize="7.5" fontFamily="monospace">Fresh Water</text>
      {/* Accessible */}
      <circle cx="370" cy="130" r="18" fill="#0ea5e9" opacity="0.8"/>
      <text x="370" y="127" textAnchor="middle" fill="white" fontSize="8" fontWeight="800" fontFamily="monospace">{"<1%"}</text>
      <text x="370" y="140" textAnchor="middle" fill="#7dd3fc" fontSize="6.5" fontFamily="monospace">Accessible</text>
      <line x1="290" y1="107" x2="360" y2="122" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/>
      <text x="210" y="157" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">GLOBAL WATER DISTRIBUTION · Earth's Water Supply</text>
    </svg>
  ),
  "6-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      {/* Conservation tips visual */}
      {[
        {icon:"🚿", label:"Short Showers", sub:"40–50L vs 150L bath", x:70, y:55, color:"#fb7185"},
        {icon:"🔧", label:"Fix Leaks", sub:"3,000 gal/yr saved", x:210, y:55, color:"#34d399"},
        {icon:"💧", label:"Low-Flow Fixtures", sub:"30–50% less use", x:350, y:55, color:"#38bdf8"},
        {icon:"🌧️", label:"Rainwater Harvest", sub:"Supplement supply", x:140, y:125, color:"#818cf8"},
        {icon:"📢", label:"Report Waste", sub:"To LGU or district", x:280, y:125, color:"#fbbf24"},
      ].map((t,i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="32" fill={t.color} opacity="0.07"/>
          <circle cx={t.x} cy={t.y} r="32" fill="none" stroke={t.color} strokeWidth="1" opacity="0.3"/>
          <text x={t.x} y={t.y-10} textAnchor="middle" fontSize="18">{t.icon}</text>
          <text x={t.x} y={t.y+8} textAnchor="middle" fill={t.color} fontSize="7.5" fontWeight="700" fontFamily="monospace">{t.label}</text>
          <text x={t.x} y={t.y+20} textAnchor="middle" fill={t.color} fontSize="6.5" fontFamily="monospace" opacity="0.7">{t.sub}</text>
        </g>
      ))}
      <text x="210" y="157" textAnchor="middle" fill="#fb7185" fontSize="7.5" fontFamily="monospace" fontWeight="700">WATER CONSERVATION · EVERY DROP COUNTS</text>
    </svg>
  ),
};

function getIllustration(modId, chIdx) {
  const key = `${modId}-${chIdx}`;
  const Comp = ILLUSTRATIONS[key];
  return Comp ? <Comp /> : null;
}

// ── ModuleView ────────────────────────────────────────────────────────────────
export function ModuleView({ mod, prog, update, onBack }) {
  const [ch, setCh]           = useState(0);
  const [phase, setPhase]     = useState("learn");
  const [sel, setSel]         = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [qi, setQi]           = useState(0);
  const [score, setScore]     = useState(0);
  const [done, setDone]       = useState(false);

  // Ref to scroll target at top of content
  const topRef = useRef(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToChapter = (i) => {
    setCh(i);
    scrollToTop();
  };

  const q = mod.quiz[qi];

  const confirm = () => {
    if (sel === null) return;
    setConfirmed(true);
    if (sel === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qi + 1 >= mod.quiz.length) {
      update({
        ...prog,
        completed: { ...prog.completed, [mod.id]: true },
        scores:    { ...prog.scores,    [mod.id]: score },
      });
      setDone(true);
    } else {
      setQi(i => i + 1);
      setSel(null);
      setConfirmed(false);
    }
  };

  const renderLine = (line, i) => {
    let color = "#cbd5e1";
    if (line.startsWith("•") || line.startsWith("–")) color = "#94a3b8";
    if (line.startsWith("❓")) color = "#38bdf8";
    if (line.startsWith("📌")) color = "#fbbf24";
    if (line.startsWith("⚖️")) color = "#a78bfa";
    if (line.startsWith("💡")) color = "#34d399";
    return (
      <p key={i} style={{ marginBottom: line ? 8 : 4, color }}>
        {line || <br />}
      </p>
    );
  };

  return (
    <div className="page">
      {/* Scroll anchor — sits just above the module header */}
      <div ref={topRef} style={{ position:"relative", top:-8 }} />

      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Modules</button>

        {/* Module header */}
        <div className="mod-header" style={{ borderColor: mod.color + "33" }}>
          <div className="mod-icon lg" style={{ background: mod.color + "22", color: mod.color }}>
            {mod.icon}
          </div>
          <div>
            <div className="mod-label" style={{ color: mod.color }}>Module {mod.id}</div>
            <div className="mod-header-title">{mod.title}</div>
            <div className="mod-header-sub">{mod.subtitle}</div>
          </div>
        </div>

        {/* ── LEARN PHASE ── */}
        {phase === "learn" && (
          <>
            <div className="tabs">
              {mod.chapters.map((c, i) => (
                <button
                  key={i}
                  className={`tab ${ch === i ? "active" : ""}`}
                  style={{ "--c": mod.color }}
                  onClick={() => goToChapter(i)}
                >
                  {i + 1}. {c.title}
                </button>
              ))}
            </div>

            <div className="content-card">
              <h2 className="content-title">{mod.chapters[ch].title}</h2>

              {/* ── Illustration ── */}
              {getIllustration(mod.id, ch)}

              <div className="content-body">
                {mod.chapters[ch].content.split("\n").map(renderLine)}
              </div>
            </div>

            <div className="nav-row">
              {ch > 0 && (
                <button className="btn ghost" onClick={() => goToChapter(ch - 1)}>← Previous</button>
              )}
              {ch < mod.chapters.length - 1 ? (
                <button
                  className="btn"
                  style={{ "--c": mod.color, background: mod.color + "22", color: mod.color, borderColor: mod.color + "55" }}
                  onClick={() => goToChapter(ch + 1)}
                >
                  Next →
                </button>
              ) : (
                <button
                  className="btn primary"
                  style={{ background: mod.color, color: "#0f172a" }}
                  onClick={() => { setPhase("quiz"); scrollToTop(); }}
                >
                  Take Mini Quiz →
                </button>
              )}
            </div>
          </>
        )}

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && !done && (
          <div className="quiz-box">
            <div className="quiz-label" style={{ color: mod.color }}>
              Mini Quiz — {qi + 1} of {mod.quiz.length}
            </div>
            <div className="quiz-q">{q.q}</div>

            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "opt";
                if (confirmed) {
                  if (i === q.answer) cls += " correct";
                  else if (i === sel) cls += " wrong";
                } else if (sel === i) cls += " selected";
                return (
                  <button
                    key={i}
                    className={cls}
                    style={{ "--c": mod.color }}
                    onClick={() => !confirmed && setSel(i)}
                  >
                    <span className="opt-letter">{["A","B","C","D"][i]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {confirmed && (
              <div className={`feedback ${sel === q.answer ? "correct" : "wrong"}`}>
                {sel === q.answer
                  ? "✓ Correct!"
                  : `✗ Correct answer: ${q.options[q.answer]}`}
              </div>
            )}

            {!confirmed ? (
              <button
                className="btn primary"
                style={{ background: sel !== null ? mod.color : "rgba(255,255,255,0.05)", color: sel !== null ? "#0f172a" : "#475569" }}
                onClick={confirm}
              >
                Check Answer
              </button>
            ) : (
              <button
                className="btn primary"
                style={{ background: mod.color, color: "#0f172a" }}
                onClick={next}
              >
                {qi + 1 < mod.quiz.length ? "Next Question →" : "Finish →"}
              </button>
            )}
          </div>
        )}

        {/* ── DONE ── */}
        {done && (
          <div className="done-box">
            <div style={{ fontSize: 44, marginBottom: 12 }}>
              {prog.scores[mod.id] === mod.quiz.length ? "🌊" : "💧"}
            </div>
            <div className="done-title">Module Complete!</div>
            <div className="done-score" style={{ color: mod.color }}>
              {prog.scores[mod.id]}/{mod.quiz.length}
            </div>
            <div className="done-sub">Quiz Score</div>
            <button
              className="btn primary"
              style={{ background: mod.color, color: "#0f172a", marginTop: 24 }}
              onClick={onBack}
            >
              ← Back to Modules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
