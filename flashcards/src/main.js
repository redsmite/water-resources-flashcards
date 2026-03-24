import { useState, useCallback } from "react";

const RAW_CSV = `Which Sustainable Development Goal (SDG) specifically targets clean water and sanitation for all?,SDG Goal 6
What is the target year for achieving the 2030 Agenda for Sustainable Development?,2030
SDG Target 6.1 focuses on ensuring universal access to safe and _____ drinking water.,affordable
Which SDG target aims to end open defecation and provide access to sanitation and hygiene?,SDG Target 6.2
SDG Target 6.3 aims to improve water quality by reducing pollution and increasing safe _____.,reuse
What is the primary focus of SDG Target 6.4 regarding freshwater supplies?,Increasing water-use efficiency.
SDG Target 6.5 calls for the implementation of _____ at all levels.,Integrated Water Resources Management (IWRM)
Which SDG target focuses on the protection and restoration of water-related ecosystems?,SDG Target 6.6
What government agency is responsible for all water resources in the Philippines?,National Water Resources Board (NWRB)
The NWRB's mission is to manage water resources within the framework of _____.,Integrated Water Resources Management (IWRM)
What is the official vision of the National Water Resources Board?,Sustainable Water for a Healthy Nation.
"Presidential Decree 1067, enacted in 1976, is also known as the _____.",Water Code of the Philippines
Which executive order reconstituted the NWRB Board and transferred it to the DENR in 2002?,Executive Order 123
"Executive Order 860, issued in 2010, redefined the composition and powers of the _____.",National Water Resources Board (NWRB)
Which 2023 executive order created the Water Resources Management Office (WRMO) under the DENR?,Executive Order 22
"Under Executive Order 22, the WRMO is tasked with drafting the _____.",Integrated Water Resources Management Plan (IWMP)
Who serves as the Chairperson of the NWRB Board?,The Secretary of the Department of Environment and Natural Resources (DENR).
Who serves as the Vice-Chairperson of the NWRB Board?,The Director-General of the National Economic and Development Authority (NEDA).
What are the three core functional areas of the NWRB?,"Policy Formulation and Coordination, Resource Regulation, and Economic Regulation."
The NWRB performs 'Economic Regulation' by setting water _____ for private water providers.,tariffs
What is the primary objective of the National Water Security Roadmap (NWSSR)?,To ensure water is available for the present and future generation of Filipinos.
"According to the Water Code, all waters belong to the _____.",State
What is a 'Water Right' as defined in Philippine water management?,A privilege granted by the government to appropriate and use water.
Waters belonging to the State cannot be the subject of _____ prescription.,acquisitive
The State allows the use of water resources through administrative _____.,concessions
How many rivers are identified as part of the Philippines' water resources potential?,421 rivers
How many lakes are identified in the Philippines' water resources potential?,79 lakes
What is the estimated surface water potential in the Philippines?,$125.8$ billion $m^3$
What is the estimated groundwater potential in the Philippines?,$20.2$ billion $m^3$
Approximately what percentage of water resources are currently allocated based on issued water permits?,$58\\%$
"Under the Water Code, 'Water Resources' includes water under the ground, above the ground, in the atmosphere, and the _____.",waters of the sea within territorial jurisdiction
What must a water permit grantee submit within one year of approval?,Plans and specifications for diversion works and distribution systems.
What document must a grantee file if they intend to operate a water system for public use?,Certificate of Public Convenience (CPC)
Water permit holders are required to install measuring devices to monitor water _____ and extraction.,levels
Who is responsible for testing and sealing the water meters used by permit grantees?,The Monitoring & Enforcement Division of the NWRB.
The WRMO is directed to submit a status report on implementation to the President every _____.,quarter
What process aims to maximize economic and social welfare without compromising ecosystem sustainability?,Integrated Water Resources Management (IWRM)
Which thematic theme of the NWSSR covers agriculture and energy?,Economic
One strategy of the NWSSR is building resilient water _____ against disasters and climate change.,infrastructure
The NWSSR strategy for rural areas focuses on providing safe water to _____ distributed populations.,sparsely
Which agency is responsible for flood management according to the Philippine water management chart?,PAGASA and the MMDA (with others).
Climate change is expected to significantly decrease the supply of renewable _____ resources.,surface water and groundwater
What is the objective of the Climate-Resilient Water Resources Management Program for Angat Dam?,To develop and approve new reservoir operation rules every five years.
List three specific purposes for which water may be appropriated via a permit.,"Municipal, Irrigation, and Power Generation."
"Apart from Municipal and Irrigation, name two other water use categories requiring a permit.",Fisheries and Industrial use.
The NWRB Board includes a member from the National Hydraulics Research Center of which university?,University of the Philippines (UP).
Which department provides the Secretary of Justice as a member of the NWRB Board?,Department of Justice (DOJ).
Which executive order renamed the National Water Resources Council (NWRC) to the NWRB?,Executive Order 124-A
What is the primary role of deputized agencies like the NIA and DPWH for the NWRB?,To assist in the coordination and regulation of water-related activities.
The WRMO serves as the chair for which committee under the NEDA Infrastructure Committee?,Sub-Committee on Water Resources (SCWR).
What is the 'Decision Support System' (DSS) intended for in the context of the WRMO?,To provide data-driven support for water resource management decisions.
Name one existing plan reviewed during the preparation of the Integrated Water Resources Management Plan (IWMP).,Philippine Water Supply and Sanitation Master Plan (PWSSMP) 2019-2030.
The 'Convergence for Water' initiative refers to which national program?,National Water Supply and Sanitation (WSS) Program.
What is the intended outcome of 'Economic Regulation' for water utilities?,To protect consumers and safeguard the economic viability of the utilities.
Which NWRB function involves resolving water use conflicts?,Resource Regulation
The 1977 PD 1206 assigned residual functions of the Board of Waterworks to the _____.,National Water Resources Board (NWRB)
What is the purpose of monitoring compliance with the conditions of a water permit?,To ensure legal and sustainable utilization of water resources.
"Integrated Water Resources Management (IWRM) coordinates the management of water, land, and _____.",related resources
"Under the IWMP, which agencies are responsible for lead reform in governance and regulations?",DENR-WRMO and NEDA.
What type of entities are eligible to apply for a water permit?,Philippine citizens and government entities/instrumentalities.`;

function parseCSV(csv) {
  return csv.trim().split("\n").map((line) => {
    // Handle quoted fields with commas inside
    const match = line.match(/^"(.+)",(.+)$/) || line.match(/^([^,]+),(.+)$/);
    if (match) return { q: match[1].trim(), a: match[2].trim() };
    const idx = line.indexOf(",");
    return { q: line.slice(0, idx).trim(), a: line.slice(idx + 1).trim() };
  });
}

const CARDS = parseCSV(RAW_CSV);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardApp() {
  const [deck, setDeck] = useState(CARDS);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [done, setDone] = useState(false);

  const card = deck[index];
  const total = deck.length;
  const progress = ((index) / total) * 100;

  const goNext = useCallback((mark) => {
    setFlipped(false);
    if (mark === "know") setKnown((s) => new Set([...s, deck[index].q]));
    if (mark === "review") setUnknown((s) => new Set([...s, deck[index].q]));
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setTimeout(() => setIndex((i) => i + 1), 120);
    }
  }, [deck, index, total]);

  const restart = (onlyUnknown = false) => {
    const newDeck = onlyUnknown
      ? shuffle(CARDS.filter((c) => unknown.has(c.q)))
      : shuffle(CARDS);
    setDeck(newDeck.length ? newDeck : shuffle(CARDS));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a1628 0%, #0d2340 50%, #0a1628 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background ripple circles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1px solid rgba(56,189,248,0.07)",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: `${400 + i*220}px`,
            height: `${400 + i*220}px`,
          }} />
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px", zIndex: 1 }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#38bdf8", textTransform: "uppercase", marginBottom: "8px", opacity: 0.8 }}>
          Water Resources Management
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(22px, 4vw, 32px)", color: "#e0f2fe", fontWeight: "normal", letterSpacing: "1px" }}>
          Study Flashcards
        </h1>
      </div>

      {done ? (
        <DoneScreen known={known} unknown={unknown} total={CARDS.length} restart={restart} />
      ) : (
        <>
          {/* Progress */}
          <div style={{ width: "100%", maxWidth: "600px", marginBottom: "20px", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#7dd3fc", marginBottom: "8px", letterSpacing: "1px" }}>
              <span>Card {index + 1} of {total}</span>
              <span style={{ color: "#34d399" }}>✓ {known.size} known</span>
            </div>
            <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                borderRadius: "2px",
                transition: "width 0.4s ease",
              }} />
            </div>
          </div>

          {/* Card */}
          <div
            onClick={() => setFlipped((f) => !f)}
            style={{
              width: "100%",
              maxWidth: "600px",
              minHeight: "260px",
              cursor: "pointer",
              perspective: "1000px",
              zIndex: 1,
              marginBottom: "28px",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              minHeight: "260px",
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}>
              {/* Front */}
              <CardFace side="front" flipped={flipped}>
                <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#7dd3fc", textTransform: "uppercase", marginBottom: "20px", opacity: 0.7 }}>Question</div>
                <p style={{ margin: 0, fontSize: "clamp(15px, 2.5vw, 18px)", color: "#e0f2fe", lineHeight: "1.7", textAlign: "center" }}>
                  {card.q}
                </p>
                <div style={{ marginTop: "24px", fontSize: "11px", color: "#38bdf8", opacity: 0.5 }}>tap to reveal answer</div>
              </CardFace>

              {/* Back */}
              <CardFace side="back" flipped={flipped}>
                <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#34d399", textTransform: "uppercase", marginBottom: "20px", opacity: 0.8 }}>Answer</div>
                <p style={{ margin: 0, fontSize: "clamp(16px, 2.5vw, 20px)", color: "#f0fdf4", lineHeight: "1.7", textAlign: "center", fontWeight: "500" }}>
                  {card.a}
                </p>
              </CardFace>
            </div>
          </div>

          {/* Action buttons */}
          {flipped && (
            <div style={{ display: "flex", gap: "16px", zIndex: 1, animation: "fadeUp 0.25s ease" }}>
              <ActionBtn
                onClick={() => goNext("review")}
                color="#f87171"
                bg="rgba(239,68,68,0.12)"
                border="rgba(239,68,68,0.3)"
              >
                ✗ Still Learning
              </ActionBtn>
              <ActionBtn
                onClick={() => goNext("know")}
                color="#34d399"
                bg="rgba(52,211,153,0.12)"
                border="rgba(52,211,153,0.3)"
              >
                ✓ Got It
              </ActionBtn>
            </div>
          )}

          {!flipped && (
            <button
              onClick={() => setFlipped(true)}
              style={{
                zIndex: 1,
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.3)",
                color: "#7dd3fc",
                padding: "12px 32px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                letterSpacing: "1px",
              }}
            >
              Flip Card
            </button>
          )}
        </>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function CardFace({ side, children }) {
  const isBack = side === "back";
  return (
    <div style={{
      position: "absolute",
      width: "100%",
      minHeight: "260px",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: isBack ? "rotateY(180deg)" : "rotateY(0deg)",
      background: isBack
        ? "linear-gradient(145deg, rgba(6,78,59,0.4), rgba(4,47,46,0.6))"
        : "linear-gradient(145deg, rgba(12,74,110,0.5), rgba(7,89,133,0.4))",
      border: `1px solid ${isBack ? "rgba(52,211,153,0.2)" : "rgba(56,189,248,0.2)"}`,
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 36px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      backdropFilter: "blur(10px)",
    }}>
      {children}
    </div>
  );
}

function ActionBtn({ onClick, color, bg, border, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color,
        padding: "13px 28px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "inherit",
        letterSpacing: "0.5px",
        transition: "all 0.2s",
        fontWeight: "500",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      {children}
    </button>
  );
}

function DoneScreen({ known, unknown, total, restart }) {
  const pct = Math.round((known.size / total) * 100);
  return (
    <div style={{
      zIndex: 1,
      textAlign: "center",
      background: "linear-gradient(145deg, rgba(12,74,110,0.5), rgba(7,89,133,0.3))",
      border: "1px solid rgba(56,189,248,0.2)",
      borderRadius: "20px",
      padding: "48px 40px",
      maxWidth: "480px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      <div style={{ fontSize: "48px", marginBottom: "8px" }}>
        {pct >= 80 ? "🌊" : pct >= 50 ? "💧" : "📚"}
      </div>
      <h2 style={{ color: "#e0f2fe", fontWeight: "normal", fontSize: "26px", margin: "0 0 8px" }}>
        Round Complete!
      </h2>
      <p style={{ color: "#7dd3fc", fontSize: "13px", letterSpacing: "1px", margin: "0 0 32px" }}>
        {total} cards reviewed
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginBottom: "36px" }}>
        <Stat label="Got It" value={known.size} color="#34d399" />
        <Stat label="Still Learning" value={unknown.size} color="#f87171" />
        <Stat label="Score" value={`${pct}%`} color="#38bdf8" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {unknown.size > 0 && (
          <ActionBtn onClick={() => restart(true)} color="#fbbf24" bg="rgba(251,191,36,0.1)" border="rgba(251,191,36,0.3)">
            ↺ Review Missed Cards ({unknown.size})
          </ActionBtn>
        )}
        <ActionBtn onClick={() => restart(false)} color="#7dd3fc" bg="rgba(56,189,248,0.1)" border="rgba(56,189,248,0.25)">
          ↺ Restart All Cards
        </ActionBtn>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: "28px", fontWeight: "600", color, fontFamily: "monospace" }}>{value}</div>
      <div style={{ fontSize: "11px", color: "#7dd3fc", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
    </div>
  );
}
