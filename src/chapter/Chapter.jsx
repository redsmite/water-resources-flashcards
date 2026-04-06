// ── chapter/Chapter.jsx ───────────────────────────────────────────────────────
import { useState } from "react";
import "../global.css";
import "./chapter.css";
import { scrollToTop } from "../scrollToTop.js";

// ── SVG Illustrations ─────────────────────────────────────────────────────────
// Key: "moduleId-chapterIndex"
const ILLUSTRATIONS = {

  // ── Module 1: NWRB Overview ─────────────────────────────────────────────────

  // Ch 0 — Mandate and Identity
  "1-0": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* Central NWRB badge */}
      <circle cx="210" cy="82" r="48" fill="#0ea5e9" opacity="0.08"/>
      <circle cx="210" cy="82" r="48" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.4"/>
      <text x="210" y="76" textAnchor="middle" fill="#0ea5e9" fontSize="11" fontWeight="800" fontFamily="monospace">NWRB</text>
      <text x="210" y="91" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Coordinates &amp; Regulates</text>
      {/* Satellite labels */}
      {[
        { label:"NOT Maynilad", sub:"≠ water provider", x:68, y:42, color:"#ef4444" },
        { label:"NOT Manila Water", sub:"≠ water provider", x:355, y:42, color:"#ef4444" },
        { label:"Vision:", sub:"Sustainable Water", sub2:"Healthy Nation", x:68, y:130, color:"#34d399" },
        { label:"Attached to", sub:"DENR (EO 123)", x:355, y:130, color:"#fbbf24" },
      ].map((p, i) => {
        const ex = 210 + (p.x < 210 ? -48 : 48) * Math.cos(Math.atan2(p.y - 82, p.x - 210));
        const ey = 82 + (p.y < 82 ? -48 : 48) * Math.sin(Math.atan2(p.y - 82, p.x - 210));
        return (
          <g key={i}>
            <line x1={ex} y1={ey} x2={p.x} y2={p.y} stroke={p.color} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.5"/>
            <circle cx={p.x} cy={p.y} r="24" fill={p.color} opacity="0.08"/>
            <circle cx={p.x} cy={p.y} r="24" fill="none" stroke={p.color} strokeWidth="1" opacity="0.35"/>
            <text x={p.x} y={p.y - 6} textAnchor="middle" fill={p.color} fontSize="7" fontWeight="800" fontFamily="monospace">{p.label}</text>
            <text x={p.x} y={p.y + 5} textAnchor="middle" fill={p.color} fontSize="6.5" fontFamily="monospace">{p.sub}</text>
            {p.sub2 && <text x={p.x} y={p.y + 15} textAnchor="middle" fill={p.color} fontSize="6.5" fontFamily="monospace">{p.sub2}</text>}
          </g>
        );
      })}
      <text x="210" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">NWRB · NATIONAL COORDINATING &amp; REGULATING BODY</text>
    </svg>
  ),

  // Ch 1 — Board Composition
  "1-1": () => (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="170" fill="#061828" rx="12"/>
      {/* Chair */}
      <rect x="145" y="12" width="130" height="30" rx="6" fill="#0ea5e9" opacity="0.15"/>
      <rect x="145" y="12" width="130" height="30" rx="6" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.5"/>
      <text x="210" y="24" textAnchor="middle" fill="#0ea5e9" fontSize="8" fontWeight="800" fontFamily="monospace">Chairperson</text>
      <text x="210" y="36" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">DENR Secretary</text>
      <line x1="210" y1="42" x2="210" y2="55" stroke="#38bdf8" strokeWidth="1" opacity="0.3"/>
      {/* Vice-Chair */}
      <rect x="145" y="55" width="130" height="30" rx="6" fill="#818cf8" opacity="0.15"/>
      <rect x="145" y="55" width="130" height="30" rx="6" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.5"/>
      <text x="210" y="67" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="800" fontFamily="monospace">Vice-Chairperson</text>
      <text x="210" y="79" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">NEDA Director-General</text>
      <line x1="210" y1="85" x2="210" y2="98" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
      <line x1="75" y1="98" x2="345" y2="98" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
      {/* Members */}
      {[
        { label:"DOST", sub:"Secretary", x:75, color:"#34d399" },
        { label:"DPWH", sub:"Deputized Agent", x:210, color:"#fb923c" },
        { label:"NIA", sub:"Deputized Agent", x:345, color:"#fb923c" },
      ].map((m, i) => (
        <g key={i}>
          <line x1={m.x} y1="98" x2={m.x} y2="110" stroke="#94a3b8" strokeWidth="1" opacity="0.3"/>
          <rect x={m.x - 45} y="110" width="90" height="32" rx="6" fill={m.color} opacity="0.1"/>
          <rect x={m.x - 45} y="110" width="90" height="32" rx="6" fill="none" stroke={m.color} strokeWidth="1" opacity="0.4"/>
          <text x={m.x} y="124" textAnchor="middle" fill={m.color} fontSize="9" fontWeight="800" fontFamily="monospace">{m.label}</text>
          <text x={m.x} y="136" textAnchor="middle" fill={m.color} fontSize="7" fontFamily="monospace">{m.sub}</text>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">NWRB BOARD COMPOSITION</text>
    </svg>
  ),

  // Ch 2 — Three Major Functions
  "1-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#061828" rx="12"/>
      {[
        { label:"Policy", sub:"Formulation", icon:"📋", detail:"IWRM · National Plans", x:90, color:"#818cf8" },
        { label:"Resource", sub:"Regulation", icon:"💧", detail:"Water Permits · Enforcement", x:210, color:"#38bdf8" },
        { label:"Economic", sub:"Regulation", icon:"📊", detail:"CPC · Just Tariffs", x:330, color:"#34d399" },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 55} y="22" width="110" height="118" rx="10" fill={p.color} opacity="0.07"/>
          <rect x={p.x - 55} y="22" width="110" height="118" rx="10" fill="none" stroke={p.color} strokeWidth="1" opacity="0.3"/>
          <text x={p.x} y="58" textAnchor="middle" fontSize="28">{p.icon}</text>
          <text x={p.x} y="82" textAnchor="middle" fill={p.color} fontSize="10" fontWeight="800" fontFamily="monospace">{p.label}</text>
          <text x={p.x} y="96" textAnchor="middle" fill={p.color} fontSize="9" fontFamily="monospace" opacity="0.8">{p.sub}</text>
          <text x={p.x} y="115" textAnchor="middle" fill={p.color} fontSize="7" fontFamily="monospace" opacity="0.6">{p.detail}</text>
        </g>
      ))}
      <text x="210" y="155" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">NWRB · THREE CORE FUNCTIONS</text>
    </svg>
  ),

  // ── Module 2: Water Code ─────────────────────────────────────────────────────

  // Ch 0 — Regalian Doctrine
  "2-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      {/* State box */}
      <rect x="155" y="15" width="110" height="36" rx="8" fill="#fbbf24" opacity="0.15"/>
      <rect x="155" y="15" width="110" height="36" rx="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6"/>
      <text x="210" y="30" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="800" fontFamily="monospace">THE STATE</text>
      <text x="210" y="44" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">Owns ALL Waters (Art. 3)</text>
      {/* Arrows down */}
      <line x1="210" y1="51" x2="210" y2="65" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
      <polygon points="204,65 216,65 210,73" fill="#fbbf24" opacity="0.5"/>
      {/* Principles row */}
      {[
        { label:"No Acquisitive", sub:"Prescription", x:75, color:"#ef4444" },
        { label:"Grants via", sub:"Water Permit", x:210, color:"#34d399" },
        { label:"NWRB", sub:"Controls All Use", x:345, color:"#38bdf8" },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 52} y="75" width="104" height="40" rx="6" fill={p.color} opacity="0.1"/>
          <rect x={p.x - 52} y="75" width="104" height="40" rx="6" fill="none" stroke={p.color} strokeWidth="1" opacity="0.4"/>
          <text x={p.x} y="91" textAnchor="middle" fill={p.color} fontSize="9" fontWeight="800" fontFamily="monospace">{p.label}</text>
          <text x={p.x} y="106" textAnchor="middle" fill={p.color} fontSize="8" fontFamily="monospace">{p.sub}</text>
        </g>
      ))}
      {/* Regalian tag */}
      <rect x="90" y="126" width="240" height="22" rx="5" fill="#fbbf24" opacity="0.08"/>
      <text x="210" y="141" textAnchor="middle" fill="#fbbf24" fontSize="8.5" fontWeight="800" fontFamily="monospace">REGALIAN DOCTRINE · PD 1067 · ART. 3</text>
    </svg>
  ),

  // Ch 1 — Water Rights, Uses, and Permit Process
  "2-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      <text x="210" y="18" textAnchor="middle" fill="#fbbf24" fontSize="8.5" fontWeight="800" fontFamily="monospace">WATER USE PRIORITY ORDER · ART. 22 PD 1067</text>
      {[
        { n:"1", label:"Domestic", color:"#ef4444", w:340 },
        { n:"2", label:"Municipal", color:"#fb923c", w:300 },
        { n:"3", label:"Irrigation", color:"#fbbf24", w:260 },
        { n:"4", label:"Power Generation", color:"#34d399", w:220 },
        { n:"5", label:"Fisheries", color:"#38bdf8", w:180 },
        { n:"6", label:"Livestock Raising", color:"#818cf8", w:140 },
        { n:"7", label:"Industrial / Recreational", color:"#f472b6", w:100 },
      ].map((u, i) => (
        <g key={i}>
          <rect x={(420 - u.w) / 2} y={26 + i * 17} width={u.w} height="14" rx="3" fill={u.color} opacity="0.15"/>
          <rect x={(420 - u.w) / 2} y={26 + i * 17} width={u.w} height="14" rx="3" fill="none" stroke={u.color} strokeWidth="0.8" opacity="0.4"/>
          <text x={(420 - u.w) / 2 + 8} y={37 + i * 17} fill={u.color} fontSize="7.5" fontFamily="monospace" fontWeight="700">{u.n}. {u.label}</text>
        </g>
      ))}
      <text x="210" y="157" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">Domestic &amp; Municipal take ABSOLUTE PRIORITY in emergencies</text>
    </svg>
  ),

  // Ch 2 — Legal Easements, Fees, and Compliance
  "2-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#111007" rx="12"/>
      {/* River cross-section */}
      <path d="M30,80 Q120,110 210,112 Q300,110 390,80" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4"/>
      <path d="M30,80 Q120,110 210,112 Q300,110 390,80 L390,50 L30,50 Z" fill="#38bdf8" opacity="0.05"/>
      {/* Easement bands */}
      {[
        { label:"Forest", dist:"40 m", color:"#34d399", x:70 },
        { label:"Agricultural", dist:"20 m", color:"#fbbf24", x:210 },
        { label:"Urban", dist:"3 m", color:"#fb923c", x:350 },
      ].map((e, i) => (
        <g key={i}>
          <rect x={e.x - 38} y="18" width="76" height="38" rx="6" fill={e.color} opacity="0.1"/>
          <rect x={e.x - 38} y="18" width="76" height="38" rx="6" fill="none" stroke={e.color} strokeWidth="1" opacity="0.5"/>
          <text x={e.x} y="33" textAnchor="middle" fill={e.color} fontSize="8.5" fontWeight="800" fontFamily="monospace">{e.label}</text>
          <text x={e.x} y="48" textAnchor="middle" fill={e.color} fontSize="10" fontWeight="800" fontFamily="monospace">{e.dist}</text>
        </g>
      ))}
      {/* Fee boxes */}
      {[
        { label:"Level I–II Municipal", fee:"P 550.00", color:"#818cf8", x:110 },
        { label:"Industrial / Power", fee:"P 7,200.00", color:"#f472b6", x:310 },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x - 65} y="122" width="130" height="34" rx="6" fill={f.color} opacity="0.1"/>
          <rect x={f.x - 65} y="122" width="130" height="34" rx="6" fill="none" stroke={f.color} strokeWidth="1" opacity="0.4"/>
          <text x={f.x} y="136" textAnchor="middle" fill={f.color} fontSize="7.5" fontFamily="monospace">{f.label}</text>
          <text x={f.x} y="150" textAnchor="middle" fill={f.color} fontSize="10" fontWeight="800" fontFamily="monospace">{f.fee}</text>
        </g>
      ))}
      <text x="210" y="117" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">Legal Easements along River Banks · WPA Filing Fees</text>
    </svg>
  ),

  // ── Module 3: Water Permits & CPC ───────────────────────────────────────────

  // Ch 0 — Certificate of Public Convenience
  "3-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#061a10" rx="12"/>
      {/* CPC card */}
      <rect x="110" y="18" width="200" height="110" rx="10" fill="#34d399" opacity="0.08"/>
      <rect x="110" y="18" width="200" height="110" rx="10" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.5"/>
      <text x="210" y="38" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="800" fontFamily="monospace">CERTIFICATE OF</text>
      <text x="210" y="52" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="800" fontFamily="monospace">PUBLIC CONVENIENCE</text>
      <rect x="125" y="60" width="170" height="1.5" fill="#34d399" opacity="0.3"/>
      {[
        "✓  Valid for 5 years",
        "✓  Just &amp; Reasonable Tariffs",
        "✓  Annual Report by May 30",
        "✓  Certificate of Potability",
      ].map((l, i) => (
        <text key={i} x="130" y={80 + i * 14} fill="#86efac" fontSize="8" fontFamily="monospace">{l}</text>
      ))}
      {/* Side labels */}
      <text x="55" y="65" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="700" fontFamily="monospace">Economic</text>
      <text x="55" y="78" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Regulation</text>
      <line x1="110" y1="74" x2="82" y2="74" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
      <text x="365" y="65" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700" fontFamily="monospace">Private</text>
      <text x="365" y="78" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace">Utilities</text>
      <line x1="310" y1="74" x2="338" y2="74" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
      <text x="210" y="155" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">CPC · NWRB ECONOMIC REGULATION TOOL</text>
    </svg>
  ),

  // Ch 1 — Water Permit Types and Transfer
  "3-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#061a10" rx="12"/>
      {/* Timeline: Conditional → Permanent */}
      <line x1="50" y1="62" x2="370" y2="62" stroke="#34d399" strokeWidth="2" opacity="0.3"/>
      {[
        { label:"Apply", x:50, color:"#94a3b8" },
        { label:"15-day Posting\n& Protest Period", x:150, color:"#fbbf24" },
        { label:"Conditional\nWP (1 yr)", x:260, color:"#fb923c" },
        { label:"Permanent\nWater Permit", x:370, color:"#34d399" },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy="62" r="8" fill={s.color} opacity="0.7"/>
          {s.label.split("\n").map((l, j) => (
            <text key={j} x={s.x} y={84 + j * 13} textAnchor="middle" fill={s.color} fontSize="7.5" fontFamily="monospace">{l}</text>
          ))}
        </g>
      ))}
      {/* Non-use box */}
      <rect x="80" y="118" width="260" height="32" rx="6" fill="#ef4444" opacity="0.08"/>
      <rect x="80" y="118" width="260" height="32" rx="6" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.4"/>
      <text x="210" y="131" textAnchor="middle" fill="#ef4444" fontSize="8.5" fontWeight="800" fontFamily="monospace">⚠ Non-use for 3 consecutive years</text>
      <text x="210" y="144" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="monospace">→ Permit rendered NULL and VOID</text>
      {/* Transfer note */}
      <text x="210" y="22" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">Quarterly: Submit Record of Water Withdrawal to NWRB</text>
      <text x="210" y="36" textAnchor="middle" fill="#818cf8" fontSize="8" fontFamily="monospace">Permit change? File verified petition for Transfer</text>
    </svg>
  ),

  // Ch 2 — Streamflow Measurement Methods
  "3-2": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#061a10" rx="12"/>
      {/* River channel cross-section */}
      <path d="M30,90 Q105,120 210,122 Q315,120 390,90" fill="#38bdf8" opacity="0.07"/>
      <path d="M30,90 Q105,120 210,122 Q315,120 390,90" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.3"/>
      {/* Method cards */}
      {[
        { label:"Current Meter", sub:"PRIMARY method", detail:"Q = AV · Most accurate", color:"#34d399", x:85 },
        { label:"Float Method", sub:"Orange peel / debris", detail:"Q = AV × 0.85", color:"#fbbf24", x:210 },
        { label:"V-Notch Weir", sub:"Small streams", detail:"Notched structure", color:"#818cf8", x:335 },
      ].map((m, i) => (
        <g key={i}>
          <rect x={m.x - 55} y="18" width="110" height="60" rx="8" fill={m.color} opacity="0.08"/>
          <rect x={m.x - 55} y="18" width="110" height="60" rx="8" fill="none" stroke={m.color} strokeWidth="1" opacity="0.4"/>
          <text x={m.x} y="35" textAnchor="middle" fill={m.color} fontSize="9" fontWeight="800" fontFamily="monospace">{m.label}</text>
          <text x={m.x} y="50" textAnchor="middle" fill={m.color} fontSize="7.5" fontFamily="monospace">{m.sub}</text>
          <text x={m.x} y="70" textAnchor="middle" fill={m.color} fontSize="8" fontWeight="700" fontFamily="monospace">{m.detail}</text>
        </g>
      ))}
      {/* Formula */}
      <rect x="125" y="128" width="170" height="28" rx="6" fill="#38bdf8" opacity="0.08"/>
      <text x="210" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="800" fontFamily="monospace">Q = A × V × Coef (0.85)</text>
      <text x="210" y="152" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">Q = Discharge · A = Area · V = Velocity</text>
    </svg>
  ),

  // ── Module 4: Philippine Water Resources ────────────────────────────────────

  // Ch 0 — Rainfall, River Basins, and Planning Regions
  "4-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      <text x="210" y="18" textAnchor="middle" fill="#fb7185" fontSize="8.5" fontWeight="800" fontFamily="monospace">PHILIPPINE WATER RESOURCES</text>
      {[
        { n:"2,400 mm", label:"Annual Rainfall", color:"#38bdf8", x:70, y:55 },
        { n:"146 B m³", label:"Total Potential", color:"#34d399", x:210, y:55 },
        { n:"12", label:"Water Resources\nRegions", color:"#fbbf24", x:350, y:55 },
        { n:"421", label:"Principal River\nBasins", color:"#fb7185", x:105, y:125 },
        { n:"Cagayan", label:"Largest Basin", color:"#818cf8", x:210, y:125 },
        { n:"Agusan", label:"3rd Largest\n10,921 sq.km", color:"#fb923c", x:315, y:125 },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="36" fill={s.color} opacity="0.07"/>
          <circle cx={s.x} cy={s.y} r="36" fill="none" stroke={s.color} strokeWidth="1" opacity="0.3"/>
          <text x={s.x} y={s.y - 4} textAnchor="middle" fill={s.color} fontSize={s.n.length > 7 ? "9" : "13"} fontWeight="800" fontFamily="monospace">{s.n}</text>
          {s.label.split("\n").map((l, j) => (
            <text key={j} x={s.x} y={s.y + 11 + j * 11} textAnchor="middle" fill={s.color} fontSize="6.5" fontFamily="monospace">{l}</text>
          ))}
        </g>
      ))}
    </svg>
  ),

  // Ch 1 — Water Use and Threats
  "4-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      <text x="210" y="16" textAnchor="middle" fill="#fb7185" fontSize="8.5" fontWeight="800" fontFamily="monospace">WATER USE BY SECTOR (2016) &amp; THREATS</text>
      {/* Bar chart */}
      {[
        { label:"Agriculture", pct:78, color:"#34d399", y:28 },
        { label:"Domestic/Municipal", pct:14, color:"#38bdf8", y:48 },
        { label:"Industrial", pct:8, color:"#818cf8", y:68 },
      ].map((b, i) => (
        <g key={i}>
          <rect x="110" y={b.y} width={(b.pct / 100) * 230} height="14" rx="3" fill={b.color} opacity="0.7"/>
          <text x="108" y={b.y + 11} textAnchor="end" fill={b.color} fontSize="8" fontFamily="monospace">{b.label}</text>
          <text x={115 + (b.pct / 100) * 230} y={b.y + 11} fill={b.color} fontSize="8" fontWeight="800" fontFamily="monospace">{b.pct}%</text>
        </g>
      ))}
      {/* Threats */}
      {[
        { icon:"👥", label:"Population Growth", sub:"Pressure on supply & delivery", color:"#fbbf24", x:90, y:108 },
        { icon:"☠️", label:"Water Quality", sub:"Pollution & contamination", color:"#ef4444", x:210, y:108 },
        { icon:"⬇️", label:"Groundwater", sub:"Over-extraction & depletion", color:"#818cf8", x:330, y:108 },
      ].map((t, i) => (
        <g key={i}>
          <circle cx={t.x} cy={t.y} r="30" fill={t.color} opacity="0.07"/>
          <circle cx={t.x} cy={t.y} r="30" fill="none" stroke={t.color} strokeWidth="1" opacity="0.3"/>
          <text x={t.x} y={t.y - 8} textAnchor="middle" fontSize="16">{t.icon}</text>
          <text x={t.x} y={t.y + 6} textAnchor="middle" fill={t.color} fontSize="7" fontWeight="800" fontFamily="monospace">{t.label}</text>
          <text x={t.x} y={t.y + 17} textAnchor="middle" fill={t.color} fontSize="6" fontFamily="monospace">{t.sub}</text>
        </g>
      ))}
      <text x="210" y="157" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">Water-stressed cities: Metro Manila · Cebu · Davao</text>
    </svg>
  ),

  // ── Module 5: Water Facts ───────────────────────────────────────────────────

  // Ch 0 — Global Water Distribution
  "5-0": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      {/* Ocean bubble */}
      <circle cx="125" cy="82" r="62" fill="#1e40af" opacity="0.7"/>
      <text x="125" y="74" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="monospace">97.2%</text>
      <text x="125" y="91" textAnchor="middle" fill="#93c5fd" fontSize="8.5" fontFamily="monospace">Salt Water</text>
      <text x="125" y="104" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="monospace">Oceans</text>
      {/* Freshwater bubble */}
      <circle cx="290" cy="68" r="36" fill="#1d4ed8" opacity="0.6"/>
      <text x="290" y="62" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="monospace">2.8%</text>
      <text x="290" y="77" textAnchor="middle" fill="#bfdbfe" fontSize="8" fontFamily="monospace">Fresh Water</text>
      {/* Accessible bubble */}
      <circle cx="375" cy="125" r="20" fill="#0ea5e9" opacity="0.8"/>
      <text x="375" y="121" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="monospace">{"<1%"}</text>
      <text x="375" y="133" textAnchor="middle" fill="#7dd3fc" fontSize="6.5" fontFamily="monospace">Accessible</text>
      <line x1="290" y1="104" x2="362" y2="118" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,2" opacity="0.5"/>
      {/* PH note */}
      <rect x="220" y="130" width="130" height="26" rx="5" fill="#38bdf8" opacity="0.08"/>
      <text x="285" y="141" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">Philippines:</text>
      <text x="285" y="152" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">146 billion m³/yr potential</text>
      <text x="210" y="16" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">GLOBAL WATER DISTRIBUTION · Earth's Total Water Supply</text>
    </svg>
  ),

  // Ch 1 — Conservation and Priority
  "5-1": () => (
    <svg viewBox="0 0 420 165" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", borderRadius:12, marginBottom:20 }}>
      <rect width="420" height="165" fill="#0d0608" rx="12"/>
      <text x="210" y="18" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="800" fontFamily="monospace">EMERGENCY WATER PRIORITY · ART. 22 PD 1067</text>
      {/* Priority pyramid */}
      {[
        { label:"🥇 Domestic Use", sub:"ABSOLUTE PRIORITY #1", color:"#ef4444", w:320, y:28 },
        { label:"🥈 Municipal Use", sub:"ABSOLUTE PRIORITY #2", color:"#fb923c", w:250, y:56 },
        { label:"All other uses", sub:"Subordinate in emergencies", color:"#94a3b8", w:180, y:84 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={(420 - p.w) / 2} y={p.y} width={p.w} height="22" rx="5" fill={p.color} opacity="0.15"/>
          <rect x={(420 - p.w) / 2} y={p.y} width={p.w} height="22" rx="5" fill="none" stroke={p.color} strokeWidth="1" opacity="0.5"/>
          <text x="210" y={p.y + 11} textAnchor="middle" fill={p.color} fontSize="8.5" fontWeight="800" fontFamily="monospace">{p.label}</text>
          <text x="210" y={p.y + 22} textAnchor="middle" fill={p.color} fontSize="7" fontFamily="monospace" opacity="0.7">{p.sub}</text>
        </g>
      ))}
      {/* Conservation tips */}
      {[
        { icon:"🔧", tip:"Fix leaks promptly", color:"#34d399", x:85, y:124 },
        { icon:"📢", tip:"Report water waste", color:"#fbbf24", x:210, y:124 },
        { icon:"🚱", tip:"Avoid drain chemicals", color:"#818cf8", x:335, y:124 },
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="26" fill={c.color} opacity="0.07"/>
          <circle cx={c.x} cy={c.y} r="26" fill="none" stroke={c.color} strokeWidth="1" opacity="0.3"/>
          <text x={c.x} y={c.y - 4} textAnchor="middle" fontSize="16">{c.icon}</text>
          <text x={c.x} y={c.y + 13} textAnchor="middle" fill={c.color} fontSize="7" fontFamily="monospace">{c.tip}</text>
        </g>
      ))}
      <text x="210" y="158" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">IWRM: Maximize welfare without compromising ecosystem sustainability</text>
    </svg>
  ),
};

function getIllustration(modId, chIdx) {
  const Comp = ILLUSTRATIONS[`${modId}-${chIdx}`];
  return Comp ? <Comp /> : null;
}

// ── ModuleView ────────────────────────────────────────────────────────────────
export function ModuleView({ mod, prog, update, onBack }) {
  const [ch, setCh]               = useState(0);
  const [phase, setPhase]         = useState("learn");
  const [sel, setSel]             = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [qi, setQi]               = useState(0);
  const [score, setScore]         = useState(0);
  const [done, setDone]           = useState(false);

  const goToChapter = (i) => { scrollToTop(); setCh(i); };
  const startQuiz   = ()  => { scrollToTop(); setPhase("quiz"); };

  const q = mod.quiz[qi];

  const confirm = () => {
    if (sel === null) return;
    setConfirmed(true);
    if (sel === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    scrollToTop();
    if (qi + 1 >= mod.quiz.length) {
      update({ ...prog, completed:{ ...prog.completed,[mod.id]:true }, scores:{ ...prog.scores,[mod.id]:score } });
      setDone(true);
    } else {
      setQi(i => i + 1); setSel(null); setConfirmed(false);
    }
  };

  const handleBack = () => { scrollToTop(); onBack(); };

  const renderLine = (line, i) => {
    let cls = "";
    if (line.startsWith("❓")) cls = "callout-know";
    else if (line.startsWith("📌")) cls = "callout-fact";
    else if (line.startsWith("⚖️")) cls = "callout-legal";
    else if (line.startsWith("💡")) cls = "callout-tip";
    else if (line.startsWith("•") || line.startsWith("–")) cls = "callout-bullet";
    else cls = "callout-body";
    return (
      <p key={i} className={cls} style={{ marginBottom: line ? 8 : 4 }}>
        {line || <br />}
      </p>
    );
  };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={handleBack}>← Back to Modules</button>

        <div className="mod-header ch-header">
          <div className="mod-icon lg ch-header-icon" style={{ background: mod.color + "22", color: mod.color }}>{mod.icon}</div>
          <div>
            <div className="mod-label ch-label">Module {mod.id}</div>
            <div className="mod-header-title">{mod.title}</div>
            <div className="mod-header-sub">{mod.subtitle}</div>
          </div>
        </div>

        {phase === "learn" && (
          <>
            <div className="tabs">
              {mod.chapters.map((c, i) => (
                <button key={i} className={`tab ${ch===i?"active":""}`} onClick={() => goToChapter(i)}>
                  {i+1}. {c.title}
                </button>
              ))}
            </div>

            <div className="content-card">
              <h2 className="content-title">{mod.chapters[ch].title}</h2>
              {getIllustration(mod.id, ch)}
              <div className="content-body">
                {mod.chapters[ch].content.split("\n").map(renderLine)}
              </div>
            </div>

            <div className="nav-row">
              {ch > 0 && (
                <button className="btn ghost" onClick={() => goToChapter(ch-1)}>← Previous</button>
              )}
              {ch < mod.chapters.length - 1 ? (
                <button className="btn ch-btn-next" onClick={() => goToChapter(ch+1)}>Next →</button>
              ) : (
                <button className="btn ch-btn-quiz" onClick={startQuiz}>Take Mini Quiz →</button>
              )}
            </div>
          </>
        )}

        {phase === "quiz" && !done && (
          <div className="quiz-box">
            <div className="quiz-label ch-quiz-label">Mini Quiz — {qi+1} of {mod.quiz.length}</div>
            <div className="quiz-q">{q.q}</div>

            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "opt ch-opt";
                if (confirmed) { if (i===q.answer) cls+=" correct"; else if (i===sel) cls+=" wrong"; }
                else if (sel===i) cls+=" selected";
                return (
                  <button key={i} className={cls} onClick={() => !confirmed && setSel(i)}>
                    <span className="opt-letter">{["A","B","C","D"][i]}</span>{opt}
                  </button>
                );
              })}
            </div>

            {confirmed && (
              <div className={`feedback ${sel===q.answer?"correct":"wrong"}`}>
                {sel===q.answer ? "✓ Correct!" : `✗ Correct answer: ${q.options[q.answer]}`}
              </div>
            )}

            {!confirmed ? (
              <button className={`btn ch-btn-check${sel!==null?" active":""}`} onClick={confirm}>
                Check Answer
              </button>
            ) : (
              <button className="btn ch-btn-quiz" onClick={next}>
                {qi+1<mod.quiz.length?"Next Question →":"Finish →"}
              </button>
            )}
          </div>
        )}

        {done && (
          <div className="done-box">
            <div className="ch-done-emoji">{prog.scores[mod.id]===mod.quiz.length?"🌊":"💧"}</div>
            <div className="done-title">Module Complete!</div>
            <div className="done-score ch-done-score">{prog.scores[mod.id]}/{mod.quiz.length}</div>
            <div className="done-sub">Quiz Score</div>
            <button className="btn ch-btn-quiz ch-btn-back-home" onClick={handleBack}>← Back to Modules</button>
          </div>
        )}
      </div>
    </div>
  );
}
