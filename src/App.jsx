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
  const progress = (index / total) * 100;

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
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
          background: linear-gradient(135deg, #0a1628 0%, #0d2340 50%, #0a1628 100%);
          min-height: 100vh;
        }
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          position: relative;
          overflow: hidden;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(56,189,248,0.07);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .header {
          text-align: center;
          margin-bottom: 24px;
          z-index: 1;
          width: 100%;
        }
        .header-sub {
          font-size: 10px;
          letter-spacing: 3px;
          color: #38bdf8;
          text-transform: uppercase;
          margin-bottom: 6px;
          opacity: 0.8;
        }
        .header h1 {
          font-size: clamp(18px, 5vw, 28px);
          color: #e0f2fe;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .progress-wrap {
          width: 100%;
          max-width: 560px;
          margin-bottom: 16px;
          z-index: 1;
        }
        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #7dd3fc;
          margin-bottom: 6px;
        }
        .progress-bar-bg {
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .card-container {
          width: 100%;
          max-width: 560px;
          perspective: 1000px;
          z-index: 1;
          margin-bottom: 20px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .card-inner {
          position: relative;
          width: 100%;
          min-height: 240px;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          min-height: 240px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          text-align: center;
        }
        .card-face.front {
          background: linear-gradient(145deg, rgba(12,74,110,0.55), rgba(7,89,133,0.45));
          border: 1px solid rgba(56,189,248,0.2);
        }
        .card-face.back {
          background: linear-gradient(145deg, rgba(6,78,59,0.45), rgba(4,47,46,0.65));
          border: 1px solid rgba(52,211,153,0.2);
          transform: rotateY(180deg);
        }
        .card-label {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          opacity: 0.75;
        }
        .card-label.q { color: #7dd3fc; }
        .card-label.a { color: #34d399; }
        .card-text {
          font-size: clamp(14px, 3.5vw, 17px);
          line-height: 1.65;
          color: #e0f2fe;
        }
        .card-text.answer {
          color: #f0fdf4;
          font-weight: 500;
        }
        .card-hint {
          margin-top: 20px;
          font-size: 11px;
          color: #38bdf8;
          opacity: 0.45;
        }
        .btn-row {
          display: flex;
          gap: 12px;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          animation: fadeUp 0.25s ease;
        }
        .btn {
          flex: 1;
          padding: 14px 12px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: opacity 0.2s;
          border: 1px solid;
          -webkit-tap-highlight-color: transparent;
        }
        .btn:active { opacity: 0.7; }
        .btn-flip {
          z-index: 1;
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(56,189,248,0.3);
          color: #7dd3fc;
          padding: 14px 32px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
          letter-spacing: 0.5px;
          -webkit-tap-highlight-color: transparent;
        }
        .done-card {
          z-index: 1;
          text-align: center;
          background: linear-gradient(145deg, rgba(12,74,110,0.5), rgba(7,89,133,0.3));
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 20px;
          padding: 40px 28px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .done-emoji { font-size: 44px; margin-bottom: 8px; }
        .done-title { color: #e0f2fe; font-weight: 600; font-size: 24px; margin-bottom: 6px; }
        .done-sub { color: #7dd3fc; font-size: 13px; margin-bottom: 28px; }
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 28px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .stat-value { font-size: 26px; font-weight: 700; font-variant-numeric: tabular-nums; }
        .stat-label { font-size: 10px; color: #7dd3fc; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
        .done-btns { display: flex; flex-direction: column; gap: 10px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="app">
        <div className="ripple" style={{ width: 400, height: 400 }} />
        <div className="ripple" style={{ width: 620, height: 620 }} />
        <div className="ripple" style={{ width: 840, height: 840 }} />

        <div className="header">
          <div className="header-sub">Water Resources Management</div>
          <h1>Study Flashcards</h1>
        </div>

        {done ? (
          <DoneScreen known={known} unknown={unknown} total={CARDS.length} restart={restart} />
        ) : (
          <>
            <div className="progress-wrap">
              <div className="progress-labels">
                <span>Card {index + 1} of {total}</span>
                <span style={{ color: "#34d399" }}>✓ {known.size} known</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="card-container" onClick={() => setFlipped(f => !f)}>
              <div className={`card-inner ${flipped ? "flipped" : ""}`}>
                <div className="card-face front">
                  <div className="card-label q">Question</div>
                  <p className="card-text">{card.q}</p>
                  <div className="card-hint">tap to reveal answer</div>
                </div>
                <div className="card-face back">
                  <div className="card-label a">Answer</div>
                  <p className="card-text answer">{card.a}</p>
                </div>
              </div>
            </div>

            {flipped ? (
              <div className="btn-row">
                <button
                  className="btn"
                  onClick={() => goNext("review")}
                  style={{ color: "#f87171", background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.3)" }}
                >
                  ✗ Still Learning
                </button>
                <button
                  className="btn"
                  onClick={() => goNext("know")}
                  style={{ color: "#34d399", background: "rgba(52,211,153,0.12)", borderColor: "rgba(52,211,153,0.3)" }}
                >
                  ✓ Got It
                </button>
              </div>
            ) : (
              <button className="btn-flip" onClick={() => setFlipped(true)}>
                Flip Card
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}

function DoneScreen({ known, unknown, total, restart }) {
  const pct = Math.round((known.size / total) * 100);
  return (
    <div className="done-card">
      <div className="done-emoji">{pct >= 80 ? "🌊" : pct >= 50 ? "💧" : "📚"}</div>
      <div className="done-title">Round Complete!</div>
      <div className="done-sub">{total} cards reviewed</div>
      <div className="stats-row">
        <div><div className="stat-value" style={{ color: "#34d399" }}>{known.size}</div><div className="stat-label">Got It</div></div>
        <div><div className="stat-value" style={{ color: "#f87171" }}>{unknown.size}</div><div className="stat-label">Still Learning</div></div>
        <div><div className="stat-value" style={{ color: "#38bdf8" }}>{pct}%</div><div className="stat-label">Score</div></div>
      </div>
      <div className="done-btns">
        {unknown.size > 0 && (
          <button className="btn" onClick={() => restart(true)}
            style={{ color: "#fbbf24", background: "rgba(251,191,36,0.1)", borderColor: "rgba(251,191,36,0.3)" }}>
            ↺ Review Missed Cards ({unknown.size})
          </button>
        )}
        <button className="btn" onClick={() => restart(false)}
          style={{ color: "#7dd3fc", background: "rgba(56,189,248,0.1)", borderColor: "rgba(56,189,248,0.25)" }}>
          ↺ Restart All Cards
        </button>
      </div>
    </div>
  );
}
