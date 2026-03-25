import { useState, useCallback, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

const DENR_LOGO = "data:image/png;base64,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";

// ── FIREBASE ──────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyAgV8tXzZWZyNPEbK6O305hwJcRqkxqBxU",
  authDomain: "wrus-asset-tracking-system.firebaseapp.com",
  projectId: "wrus-asset-tracking-system",
  storageBucket: "wrus-asset-tracking-system.appspot.com",
  messagingSenderId: "946198823737",
  appId: "1:946198823737:web:8966ed475b86e188489ee8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── DATA ─────────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1, title: "The 2030 Agenda", subtitle: "Sustainable Development Goals", icon: "🌍", color: "#0ea5e9",
    chapters: [
      { title: "The 5 P's", content: "The 2030 Agenda for Sustainable Development is built upon five critical dimensions:\n\n• People — ending poverty and hunger\n• Planet — protecting natural resources and climate\n• Prosperity — ensuring fulfilling lives in harmony with nature\n• Peace — fostering inclusive societies\n• Partnership — implementing the agenda through global solidarity" },
      { title: "17 SDGs", content: "There are 17 Sustainable Development Goals (SDGs) and associated targets designed to provide a blueprint for peace and prosperity for people and the planet." },
      { title: "SDG 6 — Water & Sanitation", content: "SDG 6 aims to ensure availability and sustainable management of water and sanitation for all by 2030.\n\n• 6.1 Safe and affordable drinking water\n• 6.2 End open defecation and provide sanitation/hygiene access\n• 6.3 Improve water quality, wastewater treatment, and safe reuse\n• 6.4 Increase water-use efficiency and ensure freshwater supplies\n• 6.5 Implement Integrated Water Resources Management (IWRM)\n• 6.6 Protect and restore water-related ecosystems" },
    ],
    quiz: [
      { q: "Which of the 5 P's focuses on protecting natural resources and climate?", options: ["People", "Planet", "Prosperity", "Partnership"], answer: 1 },
      { q: "What does SDG Target 6.5 specifically call for?", options: ["Universal access to drinking water", "End open defecation", "Implementation of IWRM at all levels", "Protection of water ecosystems"], answer: 2 },
    ],
  },
  {
    id: 2, title: "NWRB Overview", subtitle: "Mandate, Vision & Mission", icon: "🏛️", color: "#38bdf8",
    chapters: [
      { title: "What is the NWRB?", content: "The NWRB (National Water Resources Board) is the government agency responsible for all water resources in the Philippines, coordinating activities that impact the physical environment and the economy." },
      { title: "Vision & Mission", content: "Vision: Sustainable Water for a Healthy Nation.\n\nMission: To allocate sufficient water for optimal beneficial use, ensure access to safe water and adequate sanitation, and preserve flow regimes for ecological integrity." },
      { title: "NWRB Functions", content: "Policy Formulation and Coordination\nFormulating plans like the Philippine IWRM Plan Framework and Groundwater Management Plans.\n\nResource Regulation\nIssuing water permits, resolving use conflicts, and monitoring compliance.\n\nEconomic Regulation\nGranting Certificates of Public Convenience (CPC), setting water tariffs for private providers, and safeguarding the economic viability of utilities." },
    ],
    quiz: [
      { q: "What is the official vision of the National Water Resources Board?", options: ["Clean Water for Every Filipino", "Sustainable Water for a Healthy Nation", "Water Security for Economic Growth", "Safe Water through Good Governance"], answer: 1 },
      { q: "Which NWRB function involves resolving water use conflicts?", options: ["Economic Regulation", "Policy Formulation", "Resource Regulation", "Environmental Monitoring"], answer: 2 },
    ],
  },
  {
    id: 3, title: "Legal Mandates", subtitle: "Historical Legislation", icon: "📜", color: "#818cf8",
    chapters: [
      { title: "Key Legislation Timeline", content: "1974 (PD 424) — Creating the National Water Resources Council\n\n1976 (PD 1067) — Enacting the Water Code of the Philippines\n\n1977 (PD 1206) — Assigning residual functions of the Board of Waterworks to NWRB\n\n1987 (EO 124-A) — Renaming the Council to the National Water Resources Board\n\n2002 (EO 123) — Reconstituting the Board and transferring NWRB to the DENR\n\n2010 (EO 860) — Redefining composition and powers of the Board\n\n2023 (EO 22) — Establishing the WRMO under the DENR" },
      { title: "The NWRB Board", content: "The Board is chaired by the Secretary of the DENR, with the Director-General of DEPDev (Formerly NEDA) as Vice-Chair.\n\nMembers include the Secretaries of Justice and Science and Technology, and the Executive Director of the UP-National Hydraulics Research Center.\n\nMajor function: Coordinating and regulating all water-related activities in the country." },
    ],
    quiz: [
      { q: "Which executive order renamed the National Water Resources Council to the NWRB?", options: ["EO 123", "EO 860", "EO 124-A", "EO 22"], answer: 2 },
      { q: "Who serves as Chairperson of the NWRB Board?", options: ["Secretary of Justice", "Director-General of DEPDev (Formerly NEDA)", "Secretary of the DENR", "Executive Director of UP-NHRC"], answer: 2 },
    ],
  },
  {
    id: 4, title: "WRMO & IWMP", subtitle: "Water Resources Management Office", icon: "🗂️", color: "#34d399",
    chapters: [
      { title: "Creation of WRMO (EO 22)", content: "Established in April 2023 to presage a full Department of Water Resources, draft the Integrated Water Management Plan (IWMP), and generate maintained water and sanitation data." },
      { title: "Institutional Structure", content: "The sector involves a complex framework including:\n\n• Watershed Management — FMB, NIA, LGUs\n• Data Collection — PAGASA, MGB\n• Flood Management — DPWH, MMDA\n• Policy Making — DEPDev (Formerly NEDA), NWRB" },
      { title: "IWMP Framework", content: "The IWMP was prepared by reviewing existing plans such as the National Water Security Roadmap and the Philippine Water Supply and Sanitation Master Plan (2019–2030).\n\nIt focuses on reforming governance and regulations, integrating water security planning, and establishing resource allocation plans.\n\nGood water governance requires empowered institutions and supporting regulatory instruments." },
      { title: "Climate Change Impacts", content: "Climate-Resilient Program: Aimed at incorporating long-term hydrological changes and using advanced technology for improved operations.\n\nKey impacts in Philippine ecosystems:\n• Extreme heat and drought\n• Extreme rainfall and flooding\n• Sea level rise\n• Crop damage, soil deterioration, and loss of biodiversity" },
    ],
    quiz: [
      { q: "What was the WRMO established to draft?", options: ["National Climate Adaptation Plan", "Integrated Water Management Plan (IWMP)", "Philippine Water Tariff Framework", "National Sanitation Roadmap"], answer: 1 },
      { q: "Which agency is primarily responsible for flood management?", options: ["PAGASA and MGB", "FMB and NIA", "DPWH and MMDA", "DEPDev (Formerly NEDA) and NWRB"], answer: 2 },
    ],
  },
  {
    id: 5, title: "Water Code", subtitle: "Presidential Decree 1067", icon: "⚖️", color: "#fbbf24",
    chapters: [
      { title: "Regalian Doctrine", content: "The Water Code (PD 1067) consolidates laws governing the ownership and protection of water resources.\n\nUnder the Regalian Doctrine, all waters belong to the State and cannot be subject to acquisitive prescription.\n\n'Waters' refers to water under the ground, above the ground, in the atmosphere, and the sea within Philippine jurisdiction." },
      { title: "Water Rights & Uses", content: "A water right is the privilege granted by the government to appropriate and use water.\n\nPermitted purposes include:\n• Domestic (household needs)\n• Municipal (community supply)\n• Irrigation\n• Power Generation\n• Fisheries\n• Livestock Raising\n• Industrial\n• Recreational" },
      { title: "Water Permits & CPC", content: "Appropriation of water — except for family domestic use — requires a water permit from the Council.\n\nThe Council may establish minimum stream flows and declare protected areas.\n\nThe NWRB performs economic regulation by granting Certificates of Public Convenience (CPC) to private providers, ensuring they remain economically viable while protecting consumers." },
    ],
    quiz: [
      { q: "Under the Regalian Doctrine, who do all waters belong to?", options: ["Local Government Units", "The State", "Private Landowners", "The NWRB"], answer: 1 },
      { q: "Which water use does NOT require a water permit?", options: ["Irrigation", "Industrial use", "Family domestic use", "Power generation"], answer: 2 },
    ],
  },
  {
    id: 6, title: "Water Facts", subtitle: "Global & Local Insights", icon: "💧", color: "#fb7185",
    chapters: [
      { title: "Global Water Resources", content: "97.2% of global water is salt water, while only 2.8% is fresh water — mostly trapped in glaciers and icecaps." },
      { title: "Water & The Human Body", content: "Humans can survive only 3 days without water, compared to 21 days without food.\n\nWater makes up:\n• 83% of human blood\n• 75% of the brain and muscles\n• 22% of bones" },
      { title: "H₂O Facts", content: "Water is the only substance found naturally in three forms: solid, liquid, and gas.\n\nA single faucet leaking at one drip per second can waste 3,000 gallons per year." },
      { title: "Shared Responsibility", content: "Efficient water management requires collaboration with all sectors and 'water smart' behaviors:\n\n• Fix leaks promptly\n• Take shorter showers\n• Use low-flow fixtures\n• Report water waste in public spaces" },
    ],
    quiz: [
      { q: "What percentage of global water is fresh water?", options: ["10.5%", "2.8%", "15.2%", "5.0%"], answer: 1 },
      { q: "Water makes up what percentage of human blood?", options: ["75%", "22%", "83%", "90%"], answer: 2 },
    ],
  },
];

// ── FINAL QUIZ — 20 items: mc, tf, fitb, multi ────────────────────────────────
// type: "mc" | "tf" | "fitb" | "multi"
// multi: answer is array of correct indices (select-3)
// fitb: answer is string (case-insensitive trim check)
const FINAL_QUIZ = [
  // Multiple Choice (6)
  { type: "mc", q: "What is the target year for achieving the 2030 Agenda for Sustainable Development?", options: ["2025", "2030", "2035", "2040"], answer: 1 },
  { type: "mc", q: "Presidential Decree 1067 enacted in 1976 is known as:", options: ["Clean Water Act", "Water Resources Code", "Water Code of the Philippines", "Environmental Management Act"], answer: 2 },
  { type: "mc", q: "Which executive order created the WRMO under DENR in 2023?", options: ["EO 123", "EO 860", "EO 22", "EO 124-A"], answer: 2 },
  { type: "mc", q: "SDG 6.2 specifically targets:", options: ["Water-use efficiency", "IWRM implementation", "End open defecation and sanitation access", "Protection of water ecosystems"], answer: 2 },
  { type: "mc", q: "A water right is best described as:", options: ["An inherited property right", "A privilege granted by the government to appropriate water", "A constitutional guarantee for all citizens", "A treaty obligation under international law"], answer: 1 },
  { type: "mc", q: "What percentage of global water is fresh water?", options: ["10.5%", "2.8%", "15.2%", "5.0%"], answer: 1 },
  // True or False (5)
  { type: "tf", q: "The NWRB's mission is to manage water resources within the framework of IWRM.", answer: true },
  { type: "tf", q: "Under the Water Code, family domestic use requires a water permit.", answer: false },
  { type: "tf", q: "97.2% of global water is fresh water.", answer: false },
  { type: "tf", q: "The NWRB Board is chaired by the Secretary of the DENR.", answer: true },
  { type: "tf", q: "Water is the only substance found naturally in three physical forms.", answer: true },
  // Fill in the Blank (5) — simplified
  { type: "fitb", q: "The official vision of the NWRB is: 'Sustainable _____ for a Healthy Nation.'", answer: "water" },
  { type: "fitb", q: "According to the Water Code, all waters belong to the _____.", answer: "state" },
  { type: "fitb", q: "SDG stands for Sustainable Development _____.", answer: "goals" },
  { type: "fitb", q: "The Water Code of the Philippines is Presidential Decree _____.", answer: "1067" },
  { type: "fitb", q: "Humans can survive only _____ days without water.", answer: "3" },
  // Select 3 / Multi-select (4)
  { type: "multi", q: "Which of the following are among the 5 P's of the 2030 Agenda? (Select 3)", options: ["People", "Power", "Planet", "Prosperity", "Progress"], answer: [0, 2, 3] },
  { type: "multi", q: "Which of the following are SDG 6 targets? (Select 3)", options: ["Safe drinking water", "Zero hunger (2.1)", "End open defecation", "Renewable energy (7.2)", "Protect water ecosystems"], answer: [0, 2, 4] },
  { type: "multi", q: "Which of the following are permitted water uses under the Water Code? (Select 3)", options: ["Irrigation", "Mining exports", "Power Generation", "Livestock Raising", "Space research"], answer: [0, 2, 3] },
  { type: "multi", q: "Which of the following are core functional areas of the NWRB? (Select 3)", options: ["Policy Formulation", "Military Coordination", "Resource Regulation", "Economic Regulation", "Land Surveying"], answer: [0, 2, 3] },
  { type: "mc", q: "What does CPC stand for in the context of NWRB economic regulation?", options: ["Central Planning Coordination", "Certificate of Public Convenience", "Community Protection Charter", "Comprehensive Permit Clearance"], answer: 1 },
  { type: "tf", q: "The NWRB grants a Certificate of Public Convenience (CPC) to private water service providers.", answer: true },
];

const TOTAL_ITEMS = FINAL_QUIZ.length;

const FLASHCARDS = [
  { q: "Which Sustainable Development Goal specifically targets clean water and sanitation for all?", a: "SDG Goal 6" },
  { q: "What is the target year for achieving the 2030 Agenda for Sustainable Development?", a: "2030" },
  { q: "SDG Target 6.1 focuses on ensuring universal access to safe and _____ drinking water.", a: "Affordable" },
  { q: "Which SDG target aims to end open defecation and provide access to sanitation and hygiene?", a: "SDG Target 6.2" },
  { q: "SDG Target 6.3 aims to improve water quality by reducing pollution and increasing safe _____.", a: "Reuse" },
  { q: "What is the primary focus of SDG Target 6.4 regarding freshwater supplies?", a: "Increasing water-use efficiency." },
  { q: "SDG Target 6.5 calls for the implementation of _____ at all levels.", a: "Integrated Water Resources Management (IWRM)" },
  { q: "Which SDG target focuses on the protection and restoration of water-related ecosystems?", a: "SDG Target 6.6" },
  { q: "What government agency is responsible for all water resources in the Philippines?", a: "National Water Resources Board (NWRB)" },
  { q: "The NWRB's mission is to manage water resources within the framework of _____.", a: "Integrated Water Resources Management (IWRM)" },
  { q: "What is the official vision of the National Water Resources Board?", a: "Sustainable Water for a Healthy Nation." },
  { q: "Presidential Decree 1067, enacted in 1976, is also known as the _____.", a: "Water Code of the Philippines" },
  { q: "Which executive order reconstituted the NWRB Board and transferred it to the DENR in 2002?", a: "Executive Order 123" },
  { q: "Which 2023 executive order created the Water Resources Management Office (WRMO) under the DENR?", a: "Executive Order 22" },
  { q: "Who serves as the Chairperson of the NWRB Board?", a: "The Secretary of the DENR." },
  { q: "Who serves as the Vice-Chairperson of the NWRB Board?", a: "The Director-General of DEPDev (Formerly NEDA)." },
  { q: "What are the three core functional areas of the NWRB?", a: "Policy Formulation and Coordination, Resource Regulation, and Economic Regulation." },
  { q: "The NWRB performs 'Economic Regulation' by setting water _____ for private water providers.", a: "Tariffs" },
  { q: "What is the primary objective of the National Water Security Roadmap (NWSSR)?", a: "To ensure water is available for the present and future generation of Filipinos." },
  { q: "According to the Water Code, all waters belong to the _____.", a: "State" },
  { q: "What is a 'Water Right' as defined in Philippine water management?", a: "A privilege granted by the government to appropriate and use water." },
  { q: "Waters belonging to the State cannot be the subject of _____ prescription.", a: "Acquisitive" },
  { q: "How many rivers are identified as part of the Philippines' water resources potential?", a: "421 rivers" },
  { q: "How many lakes are identified in the Philippines' water resources potential?", a: "79 lakes" },
  { q: "What is the estimated surface water potential in the Philippines?", a: "125.8 billion m³" },
  { q: "What is the estimated groundwater potential in the Philippines?", a: "20.2 billion m³" },
  { q: "What must a water permit grantee submit within one year of approval?", a: "Plans and specifications for diversion works and distribution systems." },
  { q: "What document must a grantee file if they intend to operate a water system for public use?", a: "Certificate of Public Convenience (CPC)" },
  { q: "What process aims to maximize economic and social welfare without compromising ecosystem sustainability?", a: "Integrated Water Resources Management (IWRM)" },
  { q: "Which thematic theme of the NWSSR covers agriculture and energy?", a: "Economic" },
  { q: "What percentage of water resources are currently allocated based on issued water permits?", a: "58%" },
  { q: "Climate change is expected to significantly decrease the supply of renewable _____ resources.", a: "Surface water and groundwater" },
  { q: "Which executive order renamed the National Water Resources Council (NWRC) to the NWRB?", a: "Executive Order 124-A" },
  { q: "What type of entities are eligible to apply for a water permit?", a: "Philippine citizens and government entities/instrumentalities." },
  { q: "97.2% of global water is salt water. What percentage is fresh water?", a: "2.8%" },
  { q: "Humans can survive ___ days without water.", a: "3 days" },
  { q: "Water makes up what percentage of human blood?", a: "83%" },
  { q: "A leaking faucet dripping once per second wastes how many gallons per year?", a: "3,000 gallons" },
  { q: "Water is the only substance naturally found in how many physical forms?", a: "Three — solid, liquid, and gas" },
  { q: "The WRMO is directed to submit a status report on implementation to the President every _____.", a: "Quarter" },
];

// ── STORAGE ───────────────────────────────────────────────────────────────────
const KEY = "wrm_v3";
function loadP() {
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : { completed: {}, scores: {}, finalDone: false, finalScore: null }; }
  catch { return { completed: {}, scores: {}, finalDone: false, finalScore: null }; }
}
function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  // Support ?assessor=1 URL param for direct assessor access
  const isAssessorDirect = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("assessor") === "1";
  if (isAssessorDirect) return <AssessorPage />;

  const [prog, setProg] = useState(loadP);
  const [view, setView] = useState("home");
  const [modIdx, setModIdx] = useState(null);

  const update = (p) => { setProg(p); saveP(p); };
  const completedCount = Object.keys(prog.completed).length;
  const allDone = completedCount >= MODULES.length;

  if (view === "module") return <ModuleView mod={MODULES[modIdx]} prog={prog} update={update} onBack={() => setView("home")} />;
  if (view === "final") return <FinalQuizView prog={prog} update={update} onBack={() => setView("home")} />;
  if (view === "flashcards") return <FlashcardsView onBack={() => setView("home")} />;
  if (view === "leaderboard") return <LeaderboardView onBack={() => setView("home")} />;
  if (view === "assessor") return <AssessorView onBack={() => setView("home")} />;
  if (view === "resources") return <ResourcesView onBack={() => setView("home")} />;

  return (
    <div className="page">
      <GlobalStyles />
      <div className="home-wrap">
        <div className="denr-stripe" />
        <header className="home-header">
          <div className="denr-logo-wrap">
            <img src={DENR_LOGO} alt="DENR Logo" className="denr-logo" />
          </div>
          <div className="denr-agency">Department of Environment and Natural Resources</div>
          <div className="denr-office">National Capital Region — Water Resources Unit</div>
          <h1 className="home-title">Water Resources<br />Management</h1>
          <p className="home-sub">A comprehensive learning platform on SDG 6, NWRB, and Philippine water governance.</p>
          <div className="home-stats">
            <span style={{ color: "#4ade80", fontWeight: 700 }}>{completedCount}/{MODULES.length}</span>
            <span className="stat-label"> Modules Done</span>
            <span className="divider" />
            <span style={{ color: "#86efac", fontWeight: 700 }}>{Object.keys(prog.scores).length}</span>
            <span className="stat-label"> Quizzes Passed</span>
          </div>
        </header>

        {/* Resources tab */}
        <div className="section-label">📖 References</div>
        <button className="flashcard-banner" style={{ marginBottom: 20, borderColor: "rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.05)" }} onClick={() => setView("resources")}>
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>📖</div>
            <div>
              <div className="fc-title" style={{ color: "#fbbf24" }}>Legal References</div>
              <div className="fc-sub">PD 424, PD 1067, PD 1206, EO 124-A, EO 123, EO 860, EO 22</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#fbbf24" }}>→</div>
        </button>

        <div className="section-label">📚 Learning Modules</div>
        <div className="module-grid">
          {MODULES.map((mod, i) => {
            const done = !!prog.completed[mod.id];
            const score = prog.scores[mod.id];
            return (
              <button key={mod.id} className="mod-card" style={{ "--c": mod.color, borderColor: done ? mod.color + "44" : "rgba(255,255,255,0.07)" }}
                onClick={() => { setModIdx(i); setView("module"); }}>
                <div className="card-top">
                  <div className="mod-icon" style={{ background: mod.color + "22", color: mod.color }}>{mod.icon}</div>
                  {done && <div className="done-badge" style={{ background: mod.color + "22", color: mod.color }}>✓ Done</div>}
                </div>
                <div className="mod-num">Module {mod.id}</div>
                <div className="mod-title">{mod.title}</div>
                <div className="mod-sub">{mod.subtitle}</div>
                {score !== undefined && <div className="mod-score" style={{ color: mod.color }}>Quiz: {score}/{mod.quiz.length}</div>}
                <div className="mod-arrow" style={{ color: mod.color }}>→</div>
              </button>
            );
          })}
        </div>

        <div className="section-label" style={{ marginTop: 28 }}>🃏 Flashcard Review</div>
        <button className="flashcard-banner" onClick={() => setView("flashcards")}>
          <div className="fc-left">
            <div className="fc-icon">🃏</div>
            <div>
              <div className="fc-title">Study Flashcards</div>
              <div className="fc-sub">{FLASHCARDS.length} cards covering all 6 modules</div>
            </div>
          </div>
          <div className="fc-arrow">→</div>
        </button>

        <div className="section-label" style={{ marginTop: 28 }}>🏆 Assessment</div>
        <button className="final-card" style={{ opacity: (allDone && !prog.finalDone) ? 1 : 0.4, cursor: (allDone && !prog.finalDone) ? "pointer" : "not-allowed" }}
          onClick={() => (allDone && !prog.finalDone) && setView("final")}>
          <span style={{ fontSize: 28 }}>🏆</span>
          <span className="final-title">Final Assessment</span>
          <span className="final-sub">
            {!allDone ? "Complete all 6 modules to unlock"
              : prog.finalDone ? "Assessment already submitted — cannot retake"
              : `${TOTAL_ITEMS}-item quiz — MC, True/False, Fill in the Blank, Multi-select`}
          </span>
          {prog.finalDone && <span style={{ color: "#34d399", fontSize: 13, fontWeight: 600 }}>Your score: {prog.finalScore}/{TOTAL_ITEMS}</span>}
        </button>

        {/* Leaderboard — unlocked after final assessment */}
        <div className="section-label" style={{ marginTop: 28 }}>📊 Student Results</div>
        <button className="leaderboard-card" style={{ opacity: prog.finalDone ? 1 : 0.35, cursor: prog.finalDone ? "pointer" : "not-allowed" }}
          onClick={() => prog.finalDone && setView("leaderboard")}>
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>📊</div>
            <div>
              <div className="fc-title" style={{ color: "#fbbf24" }}>View All Results</div>
              <div className="fc-sub">{prog.finalDone ? "See how all students scored" : "Complete the Final Assessment to unlock"}</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#fbbf24" }}>→</div>
        </button>
      </div>
    </div>
  );
}

// ── FINAL QUIZ ────────────────────────────────────────────────────────────────

// Shuffle MC options and remap answer index
function shuffleQuestion(q) {
  if (q.type !== "mc") return q;
  const indexed = q.options.map((opt, i) => ({ opt, i }));
  const shuffled = shuffle(indexed);
  const newOptions = shuffled.map(x => x.opt);
  const newAnswer = shuffled.findIndex(x => x.i === q.answer);
  return { ...q, options: newOptions, answer: newAnswer };
}

function FinalQuizView({ prog, update, onBack }) {
  // Shuffle all questions (and MC options) once on mount
  const [quiz] = useState(() => shuffle(FINAL_QUIZ.map(shuffleQuestion)));
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [fitbVal, setFitbVal] = useState("");
  // Timer
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  // Name submission
  const [name, setName] = useState("");
  const [nameLocked, setNameLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const q = quiz[qi];
  const sel = answers[qi];

  const isCorrect = (q, a) => {
    if (q.type === "mc") return a === q.answer;
    if (q.type === "tf") return a === (q.answer ? 0 : 1);
    if (q.type === "fitb") return typeof a === "string" && a.trim().toLowerCase() === q.answer.toLowerCase();
    if (q.type === "multi") {
      if (!Array.isArray(a)) return false;
      const sorted = [...a].sort().join(",");
      const correctSorted = [...q.answer].sort().join(",");
      return sorted === correctSorted;
    }
    return false;
  };

  const toggleMulti = (i) => {
    if (confirmed) return;
    const cur = answers[qi] || [];
    const exists = cur.includes(i);
    const updated = exists ? cur.filter(x => x !== i) : cur.length < 3 ? [...cur, i] : cur;
    setAnswers(a => ({ ...a, [qi]: updated }));
  };

  const canConfirm = () => {
    if (q.type === "fitb") return fitbVal.trim().length > 0;
    if (q.type === "multi") return (answers[qi] || []).length === 3;
    return sel !== undefined;
  };

  const confirm = () => {
    if (!canConfirm()) return;
    let ans = sel;
    if (q.type === "fitb") ans = fitbVal;
    if (q.type === "multi") ans = answers[qi];
    setAnswers(a => ({ ...a, [qi]: ans }));
    setConfirmed(true);
  };

  const next = () => {
    if (qi + 1 >= FINAL_QUIZ.length) {
      const total = quiz.reduce((acc, q, i) => acc + (isCorrect(q, answers[i]) ? 1 : 0), 0);
      setFinalScore(total);
      clearInterval(timerRef.current);
      const finalElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(finalElapsed);
      update({ ...prog, finalDone: true, finalScore: total, finalElapsed: finalElapsed });
      setDone(true);
    } else {
      setQi(i => i + 1);
      setConfirmed(false);
      setFitbVal("");
    }
  };

  const handleSaveName = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setSaveError("");
    try {
      await addDoc(collection(db, "test_score"), {
        name: name.trim(),
        score: finalScore,
        total: TOTAL_ITEMS,
        time_elapsed: elapsed,
        year: new Date().getFullYear(),
        timestamp: new Date().toISOString(),
      });
      setNameLocked(true);
      setSaved(true);
    } catch (e) {
      setSaveError("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  // Exam intro screen
  if (!started) {
    return (
      <div className="exam-page"><GlobalStyles />
        <div className="inner-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", paddingTop: 0 }}>
          <div className="exam-intro-card">
            <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#f87171", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>Official Examination</div>
            <h1 style={{ fontSize: "clamp(22px,5vw,32px)", fontWeight: 800, color: "#e2e8f0", marginBottom: 12, lineHeight: 1.2 }}>Final Assessment</h1>
            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, marginBottom: 24, maxWidth: 420 }}>
              Water Resources Management — Comprehensive Exam
            </p>
            <div className="exam-rules">
              <div className="exam-rule">📌 <span>This exam has <strong style={{color:"#e2e8f0"}}>{TOTAL_ITEMS} questions</strong> — Multiple Choice, True/False, Fill in the Blank, and Multi-select.</span></div>
              <div className="exam-rule">⏱️ <span>Answer each question carefully before proceeding. You <strong style={{color:"#e2e8f0"}}>cannot go back</strong>.</span></div>
              <div className="exam-rule">🔒 <span>You may only take this exam <strong style={{color:"#f87171"}}>once</strong>. Your score will be permanently recorded.</span></div>
              <div className="exam-rule">🙈 <span>Questions are <strong style={{color:"#e2e8f0"}}>randomized</strong>. Do not share your screen with others.</span></div>
              <div className="exam-rule">✍️ <span>Enter your <strong style={{color:"#e2e8f0"}}>full name</strong> at the end to save your result.</span></div>
            </div>
            <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#f87171", lineHeight: 1.5 }}>
              ⚠️ By clicking Start, you confirm that your answers are your own and you understand this exam cannot be retaken.
            </div>
            <button className="btn primary" style={{ background: "#f87171", color: "#fff", width: "100%", padding: "14px", fontSize: 16 }} onClick={() => {
              setStarted(true);
              const t = Date.now();
              setStartTime(t);
              timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - t) / 1000)), 1000);
            }}>
              Begin Exam →
            </button>
            <button className="back-btn" style={{ marginTop: 14, padding: 0 }} onClick={onBack}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((finalScore / TOTAL_ITEMS) * 100);
    return (
      <div className="page"><GlobalStyles />
        <div className="inner-wrap">
          <div className="done-box" style={{ marginTop: 32 }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "🌊" : "📚"}</div>
            <div className="done-title">Assessment Complete!</div>
            <div className="done-score" style={{ color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171" }}>
              {finalScore}<span style={{ fontSize: 24, color: "#475569" }}>/{TOTAL_ITEMS}</span>
            </div>
            <div className="done-sub" style={{ marginBottom: 8 }}>{pct}% — {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Job!" : "Keep Studying!"}</div>
            <div style={{ fontSize: 13, color: "#4a7c59", marginBottom: 24 }}>
              ⏱ Time: {String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}
            </div>

            {/* Name input */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "20px 18px", marginBottom: 16, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 600 }}>
                📝 Enter your Alias to save your result
              </div>
              {!nameLocked ? (
                <>
                  <div style={{ fontSize: 11, color: "#f87171", marginBottom: 10, lineHeight: 1.5 }}>
                    ⚠️ Warning: Once submitted, your name cannot be changed.
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      className="name-input"
                      type="text"
                      placeholder="Enter your full name..."
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSaveName()}
                    />
                    <button className="btn primary" style={{ background: name.trim() ? "#34d399" : "rgba(255,255,255,0.05)", color: name.trim() ? "#0f172a" : "#475569", whiteSpace: "nowrap", padding: "11px 16px" }}
                      onClick={handleSaveName} disabled={saving || !name.trim()}>
                      {saving ? "Saving..." : "Submit"}
                    </button>
                  </div>
                  {saveError && <div style={{ fontSize: 12, color: "#f87171", marginTop: 8 }}>{saveError}</div>}
                </>
              ) : (
                <div style={{ color: "#34d399", fontSize: 14, fontWeight: 600 }}>
                  ✓ Score saved for <strong>{name}</strong>!
                </div>
              )}
            </div>

            <button className="btn primary" style={{ background: "#fbbf24", color: "#0f172a", width: "100%" }} onClick={onBack}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  const typeLabel = { mc: "Multiple Choice", tf: "True or False", fitb: "Fill in the Blank", multi: "Select 3 Correct Answers" };

  return (
    <div className="page"><GlobalStyles />
      <div className="inner-wrap">
        <div className="denr-stripe" />
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="mod-header" style={{ borderColor: "#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background: "#fbbf2422", color: "#fbbf24" }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div className="mod-label" style={{ color: "#fbbf24" }}>Final Assessment</div>
            <div className="mod-header-title">Comprehensive Quiz</div>
            <div className="mod-header-sub">Question {qi + 1} of {TOTAL_ITEMS}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fbbf24", fontVariantNumeric: "tabular-nums" }}>
              {String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}
            </div>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: 1 }}>ELAPSED</div>
          </div>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 20 }}>
          <div style={{ height: "100%", width: `${(qi / TOTAL_ITEMS) * 100}%`, background: "linear-gradient(90deg,#fbbf24,#fb923c)", borderRadius: 2, transition: "width .4s" }} />
        </div>

        <div className="quiz-box">
          <div className="quiz-label" style={{ color: "#fbbf24" }}>{typeLabel[q.type]}</div>
          <div className="quiz-q">{q.q}</div>

          {/* Multiple Choice */}
          {q.type === "mc" && (
            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "opt";
                if (confirmed) { if (i === q.answer) cls += " correct"; else if (i === sel) cls += " wrong"; }
                else if (sel === i) cls += " selected";
                return (
                  <button key={i} className={cls} style={{ "--c": "#fbbf24" }} onClick={() => !confirmed && setAnswers(a => ({ ...a, [qi]: i }))}>
                    <span className="opt-letter">{["A","B","C","D"][i]}</span>{opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* True or False */}
          {q.type === "tf" && (
            <div className="options tf-row">
              {["True","False"].map((label, i) => {
                const correct = q.answer === (i === 0);
                let cls = "opt tf";
                if (confirmed) { if (correct) cls += " correct"; else if (i === sel) cls += " wrong"; }
                else if (sel === i) cls += " selected";
                return (
                  <button key={i} className={cls} style={{ "--c": "#fbbf24" }} onClick={() => !confirmed && setAnswers(a => ({ ...a, [qi]: i }))}>
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in the Blank */}
          {q.type === "fitb" && (
            <div style={{ marginBottom: 18 }}>
              <input
                className="name-input"
                type="text"
                placeholder="Type your answer here..."
                value={fitbVal}
                onChange={e => !confirmed && setFitbVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !confirmed && confirm()}
                style={{ opacity: confirmed ? 0.7 : 1 }}
              />
              {confirmed && (
                <div style={{ marginTop: 8, fontSize: 13, color: isCorrect(q, fitbVal) ? "#34d399" : "#94a3b8" }}>
                  {isCorrect(q, fitbVal) ? "" : `Correct answer: "${q.answer}"`}
                </div>
              )}
            </div>
          )}

          {/* Multi-select (Select 3) */}
          {q.type === "multi" && (
            <div className="options">
              {q.options.map((opt, i) => {
                const curSel = answers[qi] || [];
                const isSelected = curSel.includes(i);
                const isCorrectOpt = q.answer.includes(i);
                let cls = "opt";
                if (confirmed) {
                  if (isCorrectOpt) cls += " correct";
                  else if (isSelected) cls += " wrong";
                } else if (isSelected) cls += " selected";
                return (
                  <button key={i} className={cls} style={{ "--c": "#fbbf24" }} onClick={() => toggleMulti(i)}>
                    <span className="opt-letter" style={{ background: isSelected && !confirmed ? "#fbbf2433" : undefined }}>
                      {isSelected ? "✓" : ["A","B","C","D","E"][i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
              <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>
                {(answers[qi] || []).length}/3 selected
              </div>
            </div>
          )}

          {/* Feedback */}
          {confirmed && (
            <div className={`feedback ${isCorrect(q, q.type === "fitb" ? fitbVal : answers[qi]) ? "correct" : "wrong"}`}>
              {isCorrect(q, q.type === "fitb" ? fitbVal : answers[qi])
                ? "✓ Correct!"
                : q.type === "mc" ? `✗ Correct answer: ${q.options[q.answer]}`
                : q.type === "tf" ? `✗ Correct answer: ${q.answer ? "True" : "False"}`
                : q.type === "multi" ? `✗ Correct answers: ${q.answer.map(i => q.options[i]).join(", ")}`
                : ""}
            </div>
          )}

          {!confirmed
            ? <button className="btn primary" style={{ background: canConfirm() ? "#fbbf24" : "rgba(255,255,255,0.05)", color: canConfirm() ? "#0f172a" : "#475569", width: "100%" }} onClick={confirm}>
                Check Answer
              </button>
            : <button className="btn primary" style={{ background: "#fbbf24", color: "#0f172a", width: "100%" }} onClick={next}>
                {qi + 1 < TOTAL_ITEMS ? "Next Question →" : "See Results →"}
              </button>
          }
        </div>
      </div>
    </div>
  );
}

// ── LEADERBOARD ───────────────────────────────────────────────────────────────
function LeaderboardView({ onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    setLoading(true); setError("");
    try {
      const q = query(collection(db, "test_score"), orderBy("score", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return (a.time_elapsed ?? 99999) - (b.time_elapsed ?? 99999);
        });
      setResults(data);
    } catch (e) {
      setError("Could not load results. Check your connection.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="page"><GlobalStyles />
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="mod-header" style={{ borderColor: "#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background: "#fbbf2422", color: "#fbbf24" }}>📊</div>
          <div style={{ flex: 1 }}>
            <div className="mod-label" style={{ color: "#fbbf24" }}>Student Results</div>
            <div className="mod-header-title">Leaderboard</div>
            <div className="mod-header-sub">{loading ? "Loading..." : `${results.length} submissions`}</div>
          </div>
          <button className="btn ghost" style={{ padding: "8px 14px", fontSize: 13, flexShrink: 0 }} onClick={fetchResults} disabled={loading}>
            {loading ? "⏳" : "↺ Refresh"}
          </button>
        </div>

        {loading && <div style={{ textAlign: "center", color: "#475569", padding: 40 }}>Loading results...</div>}
        {error && <div style={{ textAlign: "center", color: "#f87171", padding: 20, fontSize: 14 }}>{error}</div>}
        {!loading && !error && results.length === 0 && (
          <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 14 }}>No results yet.</div>
        )}

        {!loading && results.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map((r, i) => {
              const pct = Math.round((r.score / (r.total || TOTAL_ITEMS)) * 100);
              return (
                <div key={r.id} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: i < 3 ? "rgba(251,191,36,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i < 3 ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: i < 3 ? 22 : 14, width: 28, textAlign: "center", color: "#475569", fontWeight: 700 }}>
                    {i < 3 ? medals[i] : `${i + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0" }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{r.year || new Date(r.timestamp).getFullYear()}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171" }}>
                      {r.score}<span style={{ fontSize: 12, color: "#475569" }}>/{r.total || TOTAL_ITEMS}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{pct}%</div>
                    {r.time_elapsed != null && (
                      <div style={{ fontSize: 10, color: "#475569" }}>
                        ⏱ {String(Math.floor(r.time_elapsed/60)).padStart(2,"0")}:{String(r.time_elapsed%60).padStart(2,"0")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── FLASHCARDS VIEW ───────────────────────────────────────────────────────────
function FlashcardsView({ onBack }) {
  const [deck, setDeck] = useState(() => shuffle(FLASHCARDS));
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
    if (mark === "know") setKnown(s => new Set([...s, deck[index].q]));
    if (mark === "review") setUnknown(s => new Set([...s, deck[index].q]));
    if (index + 1 >= total) { setDone(true); }
    else { setTimeout(() => setIndex(i => i + 1), 120); }
  }, [deck, index, total]);

  const restart = (onlyUnknown = false) => {
    const newDeck = onlyUnknown ? shuffle(FLASHCARDS.filter(c => unknown.has(c.q))) : shuffle(FLASHCARDS);
    setDeck(newDeck.length ? newDeck : shuffle(FLASHCARDS));
    setIndex(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setDone(false);
  };

  return (
    <div className="page">
      <GlobalStyles />
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="mod-header" style={{ borderColor: "#a78bfa33" }}>
          <div className="mod-icon lg" style={{ background: "#a78bfa22", color: "#a78bfa" }}>🃏</div>
          <div>
            <div className="mod-label" style={{ color: "#a78bfa" }}>Flashcard Review</div>
            <div className="mod-header-title">Study All Modules</div>
            <div className="mod-header-sub">{FLASHCARDS.length} cards · tap card to flip</div>
          </div>
        </div>

        {!done ? (
          <>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                <span style={{ color: "#94a3b8" }}>Card {index + 1} of {total}</span>
                <span style={{ color: "#34d399" }}>✓ {known.size} known</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#818cf8,#a78bfa)", borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>
            <div className="fc-card-wrap" onClick={() => setFlipped(f => !f)}>
              <div className={`fc-inner ${flipped ? "flipped" : ""}`}>
                <div className="fc-face fc-front">
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#818cf8", textTransform: "uppercase", marginBottom: 14, opacity: 0.8 }}>Question</div>
                  <p style={{ fontSize: "clamp(14px,3vw,17px)", color: "#e2e8f0", lineHeight: 1.65, textAlign: "center", margin: 0 }}>{card.q}</p>
                  <div style={{ marginTop: 20, fontSize: 11, color: "#818cf8", opacity: 0.4 }}>tap to reveal</div>
                </div>
                <div className="fc-face fc-back">
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#34d399", textTransform: "uppercase", marginBottom: 14, opacity: 0.8 }}>Answer</div>
                  <p style={{ fontSize: "clamp(15px,3vw,18px)", color: "#f0fdf4", lineHeight: 1.65, textAlign: "center", margin: 0, fontWeight: 600 }}>{card.a}</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {flipped ? (
                <>
                  <button className="btn ghost fc-action" style={{ flex: 1, color: "#f87171", borderColor: "rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)" }} onClick={() => goNext("review")}>✗ Still Learning</button>
                  <button className="btn ghost fc-action" style={{ flex: 1, color: "#34d399", borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)" }} onClick={() => goNext("know")}>✓ Got It</button>
                </>
              ) : (
                <button className="btn ghost fc-action" style={{ flex: 1, color: "#818cf8", borderColor: "rgba(129,140,248,0.3)" }} onClick={() => setFlipped(true)}>Flip Card</button>
              )}
            </div>
          </>
        ) : (
          <div className="done-box">
            <div style={{ fontSize: 44, marginBottom: 12 }}>{known.size / total >= 0.8 ? "🌊" : known.size / total >= 0.5 ? "💧" : "📚"}</div>
            <div className="done-title">Round Complete!</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, margin: "20px 0" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 800, color: "#34d399" }}>{known.size}</div><div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Got It</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 800, color: "#f87171" }}>{unknown.size}</div><div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Learning</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa" }}>{Math.round((known.size / total) * 100)}%</div><div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Score</div></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {unknown.size > 0 && <button className="btn ghost fc-action" style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)" }} onClick={() => restart(true)}>↺ Review Missed ({unknown.size})</button>}
              <button className="btn ghost fc-action" style={{ color: "#a78bfa", borderColor: "rgba(167,139,250,0.3)" }} onClick={() => restart(false)}>↺ Restart All Cards</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MODULE VIEW ───────────────────────────────────────────────────────────────
function ModuleView({ mod, prog, update, onBack }) {
  const [ch, setCh] = useState(0);
  const [phase, setPhase] = useState("learn");
  const [sel, setSel] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = mod.quiz[qi];

  const confirm = () => {
    if (sel === null) return;
    setConfirmed(true);
    if (sel === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (qi + 1 >= mod.quiz.length) {
      update({ ...prog, completed: { ...prog.completed, [mod.id]: true }, scores: { ...prog.scores, [mod.id]: score } });
      setDone(true);
    } else { setQi(i => i + 1); setSel(null); setConfirmed(false); }
  };

  return (
    <div className="page">
      <GlobalStyles />
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Modules</button>
        <div className="mod-header" style={{ borderColor: mod.color + "33" }}>
          <div className="mod-icon lg" style={{ background: mod.color + "22", color: mod.color }}>{mod.icon}</div>
          <div>
            <div className="mod-label" style={{ color: mod.color }}>Module {mod.id}</div>
            <div className="mod-header-title">{mod.title}</div>
            <div className="mod-header-sub">{mod.subtitle}</div>
          </div>
        </div>

        {phase === "learn" && (
          <>
            <div className="tabs">
              {mod.chapters.map((c, i) => (
                <button key={i} className={`tab ${ch === i ? "active" : ""}`} style={{ "--c": mod.color }} onClick={() => setCh(i)}>
                  {i + 1}. {c.title}
                </button>
              ))}
            </div>
            <div className="content-card">
              <h2 className="content-title">{mod.chapters[ch].title}</h2>
              <div className="content-body">
                {mod.chapters[ch].content.split("\n").map((line, i) => (
                  <p key={i} style={{ marginBottom: line ? 8 : 4, color: line.startsWith("•") || line.startsWith("–") ? "#94a3b8" : "#cbd5e1" }}>{line || <br />}</p>
                ))}
              </div>
            </div>
            <div className="nav-row">
              {ch > 0 && <button className="btn ghost" onClick={() => setCh(c => c - 1)}>← Previous</button>}
              {ch < mod.chapters.length - 1
                ? <button className="btn" style={{ "--c": mod.color, background: mod.color + "22", color: mod.color, borderColor: mod.color + "55" }} onClick={() => setCh(c => c + 1)}>Next →</button>
                : <button className="btn primary" style={{ background: mod.color, color: "#0f172a" }} onClick={() => setPhase("quiz")}>Take Mini Quiz →</button>
              }
            </div>
          </>
        )}

        {phase === "quiz" && !done && (
          <div className="quiz-box">
            <div className="quiz-label" style={{ color: mod.color }}>Mini Quiz — {qi + 1} of {mod.quiz.length}</div>
            <div className="quiz-q">{q.q}</div>
            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "opt";
                if (confirmed) { if (i === q.answer) cls += " correct"; else if (i === sel) cls += " wrong"; }
                else if (sel === i) cls += " selected";
                return (
                  <button key={i} className={cls} style={{ "--c": mod.color }} onClick={() => !confirmed && setSel(i)}>
                    <span className="opt-letter">{["A","B","C","D"][i]}</span>{opt}
                  </button>
                );
              })}
            </div>
            {confirmed && (
              <div className={`feedback ${sel === q.answer ? "correct" : "wrong"}`}>
                {sel === q.answer ? "✓ Correct!" : `✗ Correct answer: ${q.options[q.answer]}`}
              </div>
            )}
            {!confirmed
              ? <button className="btn primary" style={{ background: sel !== null ? mod.color : "rgba(255,255,255,0.05)", color: sel !== null ? "#0f172a" : "#475569" }} onClick={confirm}>Check Answer</button>
              : <button className="btn primary" style={{ background: mod.color, color: "#0f172a" }} onClick={next}>{qi + 1 < mod.quiz.length ? "Next Question →" : "Finish →"}</button>
            }
          </div>
        )}

        {done && (
          <div className="done-box">
            <div style={{ fontSize: 44, marginBottom: 12 }}>{prog.scores[mod.id] === mod.quiz.length ? "🌊" : "💧"}</div>
            <div className="done-title">Module Complete!</div>
            <div className="done-score" style={{ color: mod.color }}>{prog.scores[mod.id]}/{mod.quiz.length}</div>
            <div className="done-sub">Quiz Score</div>
            <button className="btn primary" style={{ background: mod.color, color: "#0f172a", marginTop: 24 }} onClick={onBack}>← Back to Modules</button>
          </div>
        )}
      </div>
    </div>
  );
}


// ── STANDALONE ASSESSOR PAGE (accessed via ?assessor=1) ──────────────────────
function AssessorPage() {
  return (
    <div className="page"><GlobalStyles />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 72px" }}>
        <div className="denr-stripe" />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <img src={DENR_LOGO} alt="DENR" style={{ width: 48, height: 48, borderRadius: "50%" }} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#4ade80", textTransform: "uppercase" }}>DENR-NCR Water Resources Unit</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f0fdf4" }}>Assessor Dashboard</div>
          </div>
        </div>
        <AssessorView onBack={() => window.location.href = window.location.pathname} />
      </div>
    </div>
  );
}

// ── ASSESSOR VIEW ─────────────────────────────────────────────────────────────
function AssessorView({ onBack }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("score");

  const fetchResults = async () => {
    setLoading(true); setError("");
    try {
      const q = query(collection(db, "test_score"), orderBy("score", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setResults(data);
    } catch (e) {
      setError("Could not load results.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const filtered = results
    .filter(r => r.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "score") {
        if (b.score !== a.score) return (b.score || 0) - (a.score || 0);
        return (a.time_elapsed ?? 99999) - (b.time_elapsed ?? 99999);
      }
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "date") return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      return 0;
    });

  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.score || 0), 0) / results.length * 10) / 10 : 0;
  const passing = results.filter(r => (r.score / (r.total || TOTAL_ITEMS)) >= 0.75).length;

  const exportCSV = () => {
    const header = "Name,Score,Total,Percentage,Time Elapsed,Year,Timestamp";
    const rows = results.map(r => {
      const pct = Math.round((r.score / (r.total || TOTAL_ITEMS)) * 100);
      const t = r.time_elapsed != null ? `${String(Math.floor(r.time_elapsed/60)).padStart(2,"0")}:${String(r.time_elapsed%60).padStart(2,"0")}` : "";
      return `"${r.name}",${r.score},${r.total || TOTAL_ITEMS},${pct}%,${t},${r.year || ""},${r.timestamp || ""}`;
    });
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "assessment_results.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page"><GlobalStyles />
      <div className="inner-wrap" style={{ maxWidth: 760 }}>
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        {/* Header */}
        <div className="mod-header" style={{ borderColor: "#818cf833" }}>
          <div className="mod-icon lg" style={{ background: "#818cf822", color: "#818cf8" }}>🔎</div>
          <div style={{ flex: 1 }}>
            <div className="mod-label" style={{ color: "#818cf8" }}>Assessor Dashboard</div>
            <div className="mod-header-title">All Student Results</div>
            <div className="mod-header-sub">{loading ? "Loading..." : `${results.length} total submissions`}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="btn ghost" style={{ padding: "8px 12px", fontSize: 12 }} onClick={fetchResults} disabled={loading}>{loading ? "⏳" : "↺ Refresh"}</button>
            <button className="btn ghost" style={{ padding: "8px 12px", fontSize: 12, color: "#34d399", borderColor: "rgba(52,211,153,0.3)" }} onClick={exportCSV} disabled={!results.length}>⬇ CSV</button>
          </div>
        </div>

        {/* Summary stats */}
        {!loading && results.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Total Students", value: results.length, color: "#38bdf8" },
              { label: "Average Score", value: `${avg}/${TOTAL_ITEMS}`, color: "#fbbf24" },
              { label: "Passing (≥75%)", value: `${passing} (${Math.round(passing/results.length*100)}%)`, color: "#34d399" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#475569", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Search + sort */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          <input className="name-input" style={{ flex: 1, minWidth: 180 }} placeholder="🔍 Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
          <select style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "11px 14px", color: "#e2e8f0", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}
            value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="score">Sort: Score</option>
            <option value="name">Sort: Name</option>
            <option value="date">Sort: Date</option>
          </select>
        </div>

        {loading && <div style={{ textAlign: "center", color: "#475569", padding: 40 }}>Loading results...</div>}
        {error && <div style={{ textAlign: "center", color: "#f87171", padding: 20, fontSize: 14 }}>{error}</div>}
        {!loading && filtered.length === 0 && <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 14 }}>No results found.</div>}

        {!loading && filtered.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 80px 50px 70px 80px", gap: 8, padding: "8px 14px", fontSize: 10, color: "#475569", letterSpacing: 1, textTransform: "uppercase" }}>
              <span>#</span><span>Name</span><span>Score</span><span>%</span><span>Time</span><span>Date</span>
            </div>
            {filtered.map((r, i) => {
              const pct = Math.round((r.score / (r.total || TOTAL_ITEMS)) * 100);
              const pass = pct >= 75;
              const date = r.timestamp ? new Date(r.timestamp).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "2-digit" }) : r.year || "—";
              return (
                <div key={r.id} style={{
                  display: "grid", gridTemplateColumns: "32px 1fr 80px 50px 70px 80px", gap: 8, alignItems: "center",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "12px 14px",
                }}>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 700 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171" }}>{r.score}/{r.total || TOTAL_ITEMS}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: pass ? "#34d399" : "#f87171" }}>{pct}%</span>
                  <span style={{ fontSize: 11, color: "#4a7c59", fontVariantNumeric: "tabular-nums" }}>
                    {r.time_elapsed != null ? `${String(Math.floor(r.time_elapsed/60)).padStart(2,"0")}:${String(r.time_elapsed%60).padStart(2,"0")}` : "—"}
                  </span>
                  <span style={{ fontSize: 11, color: "#475569" }}>{date}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


// ── RESOURCES VIEW ────────────────────────────────────────────────────────────
const LEGAL_REFS = [
  {
    code: "PD 424", year: "1974",
    title: "Creating the National Water Resources Council",
    desc: "Established the National Water Resources Council (NWRC), the precursor to the NWRB, to coordinate and regulate water-related activities.",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/26/25290",
    color: "#0ea5e9",
  },
  {
    code: "PD 1067", year: "1976",
    title: "Water Code of the Philippines",
    desc: "The principal law governing the ownership, appropriation, utilization, exploitation, development, conservation, and protection of water resources.",
    url: "https://lawphil.net/statutes/presdecs/pd1976/pd_1067_1976.html",
    color: "#34d399",
  },
  {
    code: "PD 1206", year: "1977",
    title: "Assigning Residual Functions to NWRB",
    desc: "Transferred residual functions and powers of the Board of Waterworks and Sewerage to the National Water Resources Board.",
    url: "https://lawphil.net/statutes/presdecs/pd1977/pd_1206_1977.html",
    color: "#818cf8",
  },
  {
    code: "EO 124-A", year: "1987",
    title: "Renaming NWRC to NWRB",
    desc: "Officially renamed the National Water Resources Council (NWRC) to the National Water Resources Board (NWRB).",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/5/7753",
    color: "#a78bfa",
  },
  {
    code: "EO 123", year: "2002",
    title: "Reconstituting the NWRB Board",
    desc: "Reconstituted the NWRB Board and transferred the agency to the Department of Environment and Natural Resources (DENR).",
    url: "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/50199",
    color: "#fbbf24",
  },
  {
    code: "EO 860", year: "2010",
    title: "Redefining NWRB Powers",
    desc: "Redefined the composition, powers, and functions of the National Water Resources Board.",
    url: "http://www.b.lawphil.net/executive/execord/eo2010/eo_860_2010.html",
    color: "#fb7185",
  },
  {
    code: "EO 22", year: "2023",
    title: "Establishing the WRMO",
    desc: "Created the Water Resources Management Office (WRMO) under DENR, tasked to draft the Integrated Water Management Plan (IWMP).",
    url: "https://lawphil.net/executive/execord/eo2023/eo_22_2023.html",
    color: "#4ade80",
  },
];

function ResourcesView({ onBack }) {
  return (
    <div className="page"><GlobalStyles />
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

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      /* ── DENR COLOR PALETTE ── */
      /* Primary green: #1a6b2f  Accent blue: #1a4f8a  Light green: #4ade80  Sky: #7dd3fc */
      body { background: #0a1a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

      .page { min-height: 100vh; background: linear-gradient(160deg,#0a1a0f 0%,#0d2318 50%,#091a0e 100%); }
      .home-wrap { max-width: 720px; margin: 0 auto; padding: 32px 16px 72px; }
      .inner-wrap { max-width: 660px; margin: 0 auto; padding: 24px 16px 72px; }
      .section-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #2d6a40; margin-bottom: 10px; }

      /* ── HOME HEADER ── */
      .home-header { text-align: center; padding: 40px 0 32px; }
      .denr-logo-wrap { display: flex; justify-content: center; margin-bottom: 14px; }
      .denr-logo { width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 0 0 3px rgba(74,222,128,0.3), 0 0 24px rgba(26,107,47,0.4); }
      .denr-agency { font-size: 11px; letter-spacing: 2px; color: #4ade80; text-transform: uppercase; margin-bottom: 2px; font-weight: 600; }
      .denr-office { font-size: 11px; color: #2d6a40; margin-bottom: 16px; letter-spacing: 1px; }
      .badge { display: inline-block; font-size: 10px; letter-spacing: 3px; color: #4ade80; text-transform: uppercase; border: 1px solid rgba(74,222,128,0.25); border-radius: 20px; padding: 4px 14px; margin-bottom: 20px; }
      .home-title { font-size: clamp(26px,7vw,44px); font-weight: 800; color: #f0fdf4; line-height: 1.15; margin-bottom: 12px; letter-spacing: -0.5px; }
      .home-sub { font-size: 14px; color: #4a7c59; max-width: 400px; margin: 0 auto 22px; line-height: 1.65; }
      .home-stats { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; }
      .stat-label { color: #2d6a40; }
      .divider { width: 1px; height: 18px; background: #1a3d22; margin: 0 4px; }

      /* ── MODULE GRID ── */
      .module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; margin-bottom: 4px; }
      .mod-card { background: rgba(26,107,47,0.08); border: 1px solid rgba(74,222,128,0.1); border-radius: 16px; padding: 18px 16px 16px; text-align: left; cursor: pointer; position: relative; transition: all 0.2s; }
      .mod-card:hover { background: rgba(26,107,47,0.15); transform: translateY(-2px); border-color: rgba(74,222,128,0.25); }
      .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
      .mod-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
      .mod-icon.lg { width: 48px; height: 48px; font-size: 24px; }
      .done-badge { font-size: 10px; font-weight: 600; letter-spacing: 1px; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
      .mod-num { font-size: 10px; color: #2d6a40; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
      .mod-title { font-size: 14px; font-weight: 700; color: #f0fdf4; margin-bottom: 2px; }
      .mod-sub { font-size: 11px; color: #4a7c59; }
      .mod-score { font-size: 11px; margin-top: 8px; font-weight: 600; }
      .mod-arrow { position: absolute; bottom: 16px; right: 16px; font-size: 15px; opacity: 0.4; }

      /* ── BANNERS ── */
      .flashcard-banner, .leaderboard-card { width: 100%; background: rgba(26,107,47,0.08); border: 1px solid rgba(74,222,128,0.15); border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.2s; }
      .leaderboard-card { background: rgba(26,79,138,0.08); border-color: rgba(125,211,252,0.15); }
      .flashcard-banner:hover { background: rgba(26,107,47,0.15); transform: translateY(-1px); }
      .leaderboard-card:hover { background: rgba(26,79,138,0.15); transform: translateY(-1px); }
      .fc-left { display: flex; align-items: center; gap: 14px; }
      .fc-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(74,222,128,0.12); color: #4ade80; font-size: 22px; display: flex; align-items: center; justify-content: center; }
      .fc-title { font-size: 15px; font-weight: 700; color: #f0fdf4; margin-bottom: 2px; }
      .fc-sub { font-size: 12px; color: #4a7c59; }
      .fc-arrow { font-size: 18px; color: #4ade80; opacity: 0.6; }

      .final-card { width: 100%; background: rgba(26,79,138,0.08); border: 1px solid rgba(125,211,252,0.2); border-radius: 14px; padding: 22px 20px; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; }
      .final-card:hover { background: rgba(26,79,138,0.15); }
      .final-title { font-size: 16px; font-weight: 700; color: #7dd3fc; }
      .final-sub { font-size: 12px; color: #4a7c59; text-align: center; }

      /* ── INNER PAGES ── */
      .back-btn { background: none; border: none; color: #2d6a40; font-size: 13px; cursor: pointer; padding: 0 0 20px; font-family: inherit; }
      .back-btn:hover { color: #4ade80; }
      .mod-header { display: flex; align-items: center; gap: 16px; padding: 18px; background: rgba(26,107,47,0.08); border: 1px solid rgba(74,222,128,0.12); border-radius: 14px; margin-bottom: 20px; }
      .mod-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
      .mod-header-title { font-size: 18px; font-weight: 700; color: #f0fdf4; }
      .mod-header-sub { font-size: 12px; color: #4a7c59; }

      /* ── TABS ── */
      .tabs { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
      .tab { background: none; border: 1px solid rgba(74,222,128,0.1); border-radius: 8px; padding: 6px 11px; font-size: 11px; cursor: pointer; color: #2d6a40; font-family: inherit; transition: all 0.2s; white-space: nowrap; }
      .tab.active, .tab:hover { border-color: var(--c, #4ade80); color: var(--c, #4ade80); }

      /* ── CONTENT ── */
      .content-card { background: rgba(26,107,47,0.06); border: 1px solid rgba(74,222,128,0.1); border-radius: 14px; padding: 22px 20px; margin-bottom: 18px; min-height: 180px; }
      .content-title { font-size: 17px; font-weight: 700; color: #f0fdf4; margin-bottom: 14px; }
      .content-body { font-size: 14px; line-height: 1.7; }
      .nav-row { display: flex; gap: 10px; justify-content: flex-end; }

      /* ── BUTTONS ── */
      .btn { border: 1px solid rgba(74,222,128,0.15); border-radius: 10px; padding: 11px 22px; font-size: 14px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
      .btn.ghost { background: rgba(26,107,47,0.08); color: #2d6a40; }
      .btn.ghost:hover { color: #4ade80; opacity: 0.9; }
      .btn.primary { border: none; font-weight: 700; }
      .btn.primary:hover { opacity: 0.88; }
      .fc-action { padding: 13px 16px !important; font-size: 14px !important; }

      /* ── FLASHCARD FLIP ── */
      .fc-card-wrap { width: 100%; perspective: 1000px; cursor: pointer; margin-bottom: 4px; -webkit-tap-highlight-color: transparent; }
      .fc-inner { position: relative; width: 100%; min-height: 220px; transform-style: preserve-3d; transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
      .fc-inner.flipped { transform: rotateY(180deg); }
      .fc-face { position: absolute; width: 100%; min-height: 220px; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 22px; }
      .fc-front { background: linear-gradient(145deg, rgba(26,79,138,0.5), rgba(15,56,100,0.6)); border: 1px solid rgba(125,211,252,0.2); }
      .fc-back { background: linear-gradient(145deg, rgba(26,107,47,0.5), rgba(15,70,30,0.6)); border: 1px solid rgba(74,222,128,0.2); transform: rotateY(180deg); }

      /* ── QUIZ ── */
      .quiz-box { background: rgba(26,107,47,0.05); border: 1px solid rgba(74,222,128,0.1); border-radius: 16px; padding: 24px 20px; }
      .quiz-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
      .quiz-q { font-size: clamp(15px,3vw,18px); font-weight: 600; color: #f0fdf4; line-height: 1.55; margin-bottom: 22px; }
      .options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
      .tf-row { flex-direction: row !important; }
      .opt { background: rgba(26,107,47,0.08); border: 1px solid rgba(74,222,128,0.12); border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #a7f3d0; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 12px; font-family: inherit; transition: all 0.15s; }
      .opt.tf { flex: 1; justify-content: center; font-size: 15px; font-weight: 700; }
      .opt:hover { opacity: 0.9; border-color: rgba(74,222,128,0.3); }
      .opt.selected { background: color-mix(in srgb, var(--c, #4ade80) 15%, transparent); border-color: var(--c, #4ade80); color: var(--c, #4ade80); }
      .opt.correct { background: rgba(52,211,153,0.14) !important; border-color: #34d399 !important; color: #34d399 !important; }
      .opt.wrong { background: rgba(248,113,113,0.14) !important; border-color: #f87171 !important; color: #f87171 !important; }
      .opt-letter { min-width: 22px; height: 22px; border-radius: 5px; background: rgba(74,222,128,0.1); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; color: #4ade80; }
      .feedback { padding: 11px 14px; border-radius: 9px; font-size: 13px; margin-bottom: 14px; line-height: 1.5; }
      .feedback.correct { background: rgba(52,211,153,0.1); border: 1px solid #34d39933; color: #34d399; }
      .feedback.wrong { background: rgba(248,113,113,0.1); border: 1px solid #f8717133; color: #f87171; }

      /* ── INPUT ── */
      .name-input { width: 100%; background: rgba(26,107,47,0.1); border: 1px solid rgba(74,222,128,0.2); border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #f0fdf4; font-family: inherit; outline: none; transition: border-color 0.2s; }
      .name-input:focus { border-color: #4ade80; }
      .name-input::placeholder { color: #2d6a40; }

      /* ── DONE BOX ── */
      .done-box { background: rgba(26,107,47,0.08); border: 1px solid rgba(74,222,128,0.12); border-radius: 20px; padding: 44px 28px; text-align: center; }
      .done-title { font-size: 22px; font-weight: 700; color: #f0fdf4; margin-bottom: 8px; }
      .done-score { font-size: 48px; font-weight: 900; margin-bottom: 4px; }
      .done-sub { font-size: 13px; color: #4a7c59; }

      /* ── EXAM PAGE ── */
      .exam-page { min-height: 100vh; background: linear-gradient(160deg,#050f07 0%,#0a1a0f 50%,#050f07 100%); }
      .exam-intro-card { background: rgba(26,107,47,0.08); border: 1px solid rgba(248,113,113,0.3); border-radius: 20px; padding: 40px 28px; width: 100%; max-width: 520px; text-align: center; }
      .exam-rules { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; text-align: left; }
      .exam-rule { display: flex; gap: 10px; font-size: 13px; line-height: 1.5; background: rgba(26,107,47,0.08); border-radius: 8px; padding: 10px 12px; align-items: flex-start; }
      .exam-rule span { color: #4a7c59; }

      /* ── RESOURCE CARDS ── */
      .ref-card { background: rgba(26,107,47,0.06); border: 1px solid rgba(74,222,128,0.1); border-radius: 14px; padding: 16px 18px; transition: all 0.2s; }
      .ref-card:hover { background: rgba(26,107,47,0.14); border-color: var(--rc, #4ade80); transform: translateY(-1px); }
      .ref-badge { min-width: 58px; border: 1px solid; border-radius: 10px; padding: 8px 10px; text-align: center; flex-shrink: 0; }

      /* ── DENR FOOTER STRIPE ── */
      .denr-stripe { height: 4px; background: linear-gradient(90deg, #1a6b2f, #1a4f8a, #1a6b2f); border-radius: 2px; margin-bottom: 24px; }

      @media (max-width: 480px) {
        .module-grid { grid-template-columns: 1fr 1fr; }
        .mod-card { padding: 14px 12px; }
        .tabs { gap: 4px; }
        .tab { font-size: 10px; padding: 5px 9px; }
        .fc-left { gap: 10px; }
        .done-box { padding: 32px 18px; }
        .denr-logo { width: 64px; height: 64px; }
      }
    `}</style>
  );
}
