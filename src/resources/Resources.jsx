// ── resources/Resources.jsx ───────────────────────────────────────────────────
import { LEGAL_REFS } from "../data.js";
import "../global.css";
import "./resources.css";

export function ResourcesView({ onBack }) {
  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        <div className="mod-header" style={{ borderColor:"#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background:"#fbbf2422",color:"#fbbf24" }}>📖</div>
          <div>
            <div className="mod-label" style={{ color:"#fbbf24" }}>Legal References</div>
            <div className="mod-header-title">Philippine Water Law</div>
            <div className="mod-header-sub">7 key issuances — tap to open full text</div>
          </div>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {LEGAL_REFS.map(ref => (
            <a key={ref.code} href={ref.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div className="ref-card" style={{ "--rc":ref.color }}>
                <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                  <div className="ref-badge" style={{ background:ref.color+"22",color:ref.color,borderColor:ref.color+"44" }}>
                    <div style={{ fontSize:13,fontWeight:800 }}>{ref.code}</div>
                    <div style={{ fontSize:10,opacity:0.7 }}>{ref.year}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div className="ref-title">{ref.title}</div>
                    <div className="ref-desc">{ref.desc}</div>
                  </div>
                  <div style={{ fontSize:16,color:ref.color,opacity:0.6,flexShrink:0 }}>↗</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="res-info-box">
          ℹ️ Links open the official text from the Philippine e-Library or LawPhil. An internet connection is required.
        </div>
      </div>
    </div>
  );
}

// ── Video Reference Section ───────────────────────────────────────────────────
const VIDEOS = [
  { id:"3Tp9511m4t8", title:"The Blue Covenant (SDG 6 and Agenda 2030) Water Resources Management",   sub:"Explains the 2030 Agenda and SDG 6" },
  { id:"NdpXk2MNJOE", title:"Who Owns the Water in the Philippines? (PD 1067 and NWRB)",              sub:"Explains the PD 1067 The Water Code of the Philippines and NWRB structure, functions and processes" },
  { id:"WasEH5GuTGU", title:"The Crisis is No Longer \"Coming\"—It's Here (WRMO and IWMP)",           sub:"Explains the EO 22, WRMO and the IWMP" },
];

export function VideoSection() {
  return (
    <div className="vid-grid">
      {VIDEOS.map(v => (
        <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="vid-card">
          <div className="vid-thumb">
            <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} />
            <div className="vid-play">
              <div className="vid-play-btn">
                <div className="vid-play-triangle" />
              </div>
            </div>
          </div>
          <div className="vid-info">
            <div className="vid-title">{v.title}</div>
            <div className="vid-sub">{v.sub}</div>
          </div>
        </a>
      ))}
    </div>
  );
}