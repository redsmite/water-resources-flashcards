// ── resources/Resources.jsx ───────────────────────────────────────────────────
import { LEGAL_REFS } from "../data.js";
import "../global.css";
import "./resources.css";
import { scrollToTop } from "../scrollToTop.js";

export function ResourcesView({ onBack }) {
  const handleBack = () => { scrollToTop(); onBack(); };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={handleBack}>← Back to Home</button>

        <div className="mod-header res-header">
          <div className="mod-icon lg res-header-icon">📖</div>
          <div>
            <div className="mod-label res-header-label">Legal References</div>
            <div className="mod-header-title">Philippine Water Law</div>
            <div className="mod-header-sub">7 key issuances — tap to open full text</div>
          </div>
        </div>

        <div className="res-ref-list">
          {LEGAL_REFS.map(ref => (
            <a key={ref.code} href={ref.url} target="_blank" rel="noopener noreferrer" className="res-ref-link">
              <div className="ref-card" style={{ "--rc": ref.color }}>
                <div className="ref-card-inner">
                  <div className="ref-badge" style={{ background:ref.color+"22", color:ref.color, borderColor:ref.color+"44" }}>
                    <div className="ref-badge-code">{ref.code}</div>
                    <div className="ref-badge-year">{ref.year}</div>
                  </div>
                  <div className="ref-body">
                    <div className="ref-title">{ref.title}</div>
                    <div className="ref-desc">{ref.desc}</div>
                  </div>
                  <div className="ref-arrow" style={{ color: ref.color }}>↗</div>
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