// ── resources/Resources.jsx ───────────────────────────────────────────────────
import { LEGAL_REFS } from "../data.js";
import "../global.css";
import "./resources.css";
import { scrollToTop } from "../scrollToTop.js";

// ── Glossary Data ─────────────────────────────────────────────────────────────
const GLOSSARY = [
  { term: "Appropriation of Water",         def: "The acquisition of rights over the use of waters or the taking/diverting of waters from a natural source in a manner allowed by law." },
  { term: "Annual Water Charges",           def: "Fees paid by water permit holders during the validity of their permit or conditional permit for the continued use of the resource." },
  { term: "Beneficial Use",                 def: "The utilization of water in the right amount and at the time needed for the specific purpose it was appropriated." },
  { term: "Certificate of Public Convenience (CPC)", def: "An authority issued by NWRB to private water utilities to operate, maintain, and charge rates for water supply systems." },
  { term: "Conditional Water Permit (CWP)", def: "A temporary permit valid for one year, allowing a grantee to begin works while preparing to meet full permit requirements." },
  { term: "Domestic Use",                   def: "Water drawn directly from a source by a single household for drinking, washing, cooking, or home gardening." },
  { term: "Easement",                       def: "A legal encumbrance on land (e.g., 3m in urban areas, 20m in agricultural, 40m in forest) for public use in the interest of recreation, navigation, or salvage." },
  { term: "Integrated Water Resources Management (IWRM)", def: "A framework for coordinated development of water and land to maximize social welfare equitably and sustainably." },
  { term: "Irrigation Use",                 def: "The utilization of water specifically for the production of agricultural crops (e.g., farms, orchards, nurseries)." },
  { term: "MCM",                            def: "Million Cubic Meters; a unit of measurement for water volume used in assessing Philippine water potential." },
  { term: "Municipal Use",                  def: "Water supplied for community requirements via piped or bulk distribution, covering domestic needs and public utilities." },
  { term: "NWRB",                           def: "National Water Resources Board; the primary coordinating and regulating agency for water resources in the Philippines." },
  { term: "PD 1067",                        def: "The Water Code of the Philippines (1976); the basic law governing the ownership, use, and protection of water resources." },
  { term: "Regalian Doctrine",              def: "The constitutional principle that all natural resources, including water, are owned by the State." },
  { term: "Water Permit",                   def: "The official document serving as evidence of a Water Right." },
  { term: "Water Resource Region",          def: "A division of the country (12 in total) based on hydrological boundaries, climate homogeneity, and physiographic features." },
  { term: "Water Right",                    def: "The privilege granted by the government to appropriate and use water." },
  { term: "Water-Stressed Cities",          def: "Specific urban areas (e.g., Metro Manila, Cebu, Baguio) where population growth and demand place high pressure on available water supply." },
  { term: "WRMO",                           def: "Water Resources Management Office; an office created in 2023 under the DENR to enhance water management." },
  { term: "WRUS-LPDD",                      def: "Water Resources Utilization Section of the Licenses, Patents, and Deeds Division under the DENR, which serves as a deputized agent of the NWRB." },
];

export function ResourcesView({ onBack }) {
  const handleBack = () => { scrollToTop(); onBack(); };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={handleBack}>← Back to Home</button>

        {/* ── Glossary Section ── */}
        <div className="mod-header res-header">
          <div className="mod-icon lg res-header-icon">📚</div>
          <div>
            <div className="mod-label res-header-label">Terminology</div>
            <div className="mod-header-title">Glossary</div>
            <div className="mod-header-sub">{GLOSSARY.length} key terms in Philippine water law</div>
          </div>
        </div>

        <div className="res-glossary-list">
          {GLOSSARY.map(({ term, def }) => (
            <div key={term} className="res-glossary-item">
              <div className="res-glossary-term">{term}</div>
              <div className="res-glossary-def">{def}</div>
            </div>
          ))}
        </div>

        {/* ── Legal References Section ── */}
        <div className="mod-header res-header" style={{ marginTop: "2.5rem" }}>
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
                  <div className="ref-badge" style={{ background: ref.color + "22", color: ref.color, borderColor: ref.color + "44" }}>
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
  { id: "3Tp9511m4t8", title: "The Blue Covenant (SDG 6 and Agenda 2030) Water Resources Management",  sub: "Explains the 2030 Agenda and SDG 6" },
  { id: "NdpXk2MNJOE", title: "Who Owns the Water in the Philippines? (PD 1067 and NWRB)",             sub: "Explains the PD 1067 The Water Code of the Philippines and NWRB structure, functions and processes" },
  { id: "WasEH5GuTGU", title: "The Crisis is No Longer \"Coming\"—It's Here (WRMO and IWMP)",          sub: "Explains the EO 22, WRMO and the IWMP" },
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