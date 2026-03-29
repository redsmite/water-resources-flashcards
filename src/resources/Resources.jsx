// ── resources/resources.jsx ───────────────────────────────────────────────────
import { LEGAL_REFS } from "../data.js";
import "../global.css";
import "./resources.css";

// ── Legal References View ─────────────────────────────────────────────────────
export function ResourcesView({ onBack }) {
  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        <div className="mod-header" style={{ borderColor: "#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background: "#fbbf2422", color: "#fbbf24" }}>📖</div>
          <div>
            <div className="mod-label" style={{ color: "#fbbf24" }}>Legal References</div>
            <div className="mod-header-title">Philippine Water Law</div>
            <div className="mod-header-sub">7 key issuances — tap to open full text</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LEGAL_REFS.map(ref => (
            <a key={ref.code} href={ref.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div className="ref-card" style={{ "--rc": ref.color }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="ref-badge" style={{ background: ref.color + "22", color: ref.color, borderColor: ref.color + "44" }}>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{ref.code}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>{ref.year}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f0fdf4", marginBottom: 3 }}>{ref.title}</div>
                    <div style={{ fontSize: 12, color: "#4a7c59", lineHeight: 1.5 }}>{ref.desc}</div>
                  </div>
                  <div style={{ fontSize: 16, color: ref.color, opacity: 0.6, flexShrink: 0 }}>↗</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(26,107,47,0.06)", border: "1px solid rgba(74,222,128,0.1)", borderRadius: 12, fontSize: 12, color: "#2d6a40", lineHeight: 1.6 }}>
          ℹ️ Links open the official text from the Philippine e-Library or LawPhil. An internet connection is required.
        </div>
      </div>
    </div>
  );
}

// ── Video Reference Section (used inline on home page) ────────────────────────
const VIDEOS = [
  { id: "IDAj5T1ST7o", title: "Water Resources",          sub: "How water is distributed around the globe through the hydrologic cycle" },
  { id: "WjYfr2YBio0", title: "PD 1067",                  sub: "Philippine Water Code of the Philippines" },
  { id: "xkkUyvE1Tak", title: "NWRB Infographics",        sub: "Processes and functions of the NWRB" },
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