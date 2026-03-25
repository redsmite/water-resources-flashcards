import { useState, useCallback, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

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
      { title: "The NWRB Board", content: "The Board is chaired by the Secretary of the DENR, with the Director-General of NEDA as Vice-Chair.\n\nMembers include the Secretaries of Justice and Science and Technology, and the Executive Director of the UP-National Hydraulics Research Center.\n\nMajor function: Coordinating and regulating all water-related activities in the country." },
    ],
    quiz: [
      { q: "Which executive order renamed the National Water Resources Council to the NWRB?", options: ["EO 123", "EO 860", "EO 124-A", "EO 22"], answer: 2 },
      { q: "Who serves as Chairperson of the NWRB Board?", options: ["Secretary of Justice", "Director-General of NEDA", "Secretary of the DENR", "Executive Director of UP-NHRC"], answer: 2 },
    ],
  },
  {
    id: 4, title: "WRMO & IWMP", subtitle: "Water Resources Management Office", icon: "🗂️", color: "#34d399",
    chapters: [
      { title: "Creation of WRMO (EO 22)", content: "Established in April 2023 to presage a full Department of Water Resources, draft the Integrated Water Management Plan (IWMP), and generate maintained water and sanitation data." },
      { title: "Institutional Structure", content: "The sector involves a complex framework including:\n\n• Watershed Management — FMB, NIA, LGUs\n• Data Collection — PAGASA, MGB\n• Flood Management — DPWH, MMDA\n• Policy Making — NEDA, NWRB" },
      { title: "IWMP Framework", content: "The IWMP was prepared by reviewing existing plans such as the National Water Security Roadmap and the Philippine Water Supply and Sanitation Master Plan (2019–2030).\n\nIt focuses on reforming governance and regulations, integrating water security planning, and establishing resource allocation plans.\n\nGood water governance requires empowered institutions and supporting regulatory instruments." },
      { title: "Climate Change Impacts", content: "Climate-Resilient Program: Aimed at incorporating long-term hydrological changes and using advanced technology for improved operations.\n\nKey impacts in Philippine ecosystems:\n• Extreme heat and drought\n• Extreme rainfall and flooding\n• Sea level rise\n• Crop damage, soil deterioration, and loss of biodiversity" },
    ],
    quiz: [
      { q: "What was the WRMO established to draft?", options: ["National Climate Adaptation Plan", "Integrated Water Management Plan (IWMP)", "Philippine Water Tariff Framework", "National Sanitation Roadmap"], answer: 1 },
      { q: "Which agency is primarily responsible for flood management?", options: ["PAGASA and MGB", "FMB and NIA", "DPWH and MMDA", "NEDA and NWRB"], answer: 2 },
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
  { type: "multi", q: "Which of the following are SDG 6 targets? (Select 3)", options: ["Safe drinking water (6.1)", "Zero hunger (2.1)", "End open defecation (6.2)", "Renewable energy (7.2)", "Protect water ecosystems (6.6)"], answer: [0, 2, 4] },
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
  { q: "Who serves as the Vice-Chairperson of the NWRB Board?", a: "The Director-General of NEDA." },
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

  return (
    <div className="page">
      <GlobalStyles />
      <div className="home-wrap">
        <header className="home-header">
          <div className="badge">DENR-NCR Training Module</div>
          <h1 className="home-title">Water Resources<br />Management</h1>
          <p className="home-sub">A comprehensive learning platform on SDG 6, NWRB, and Philippine water governance.</p>
          <div className="home-stats">
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>{completedCount}/{MODULES.length}</span>
            <span className="stat-label"> Modules Done</span>
            <span className="divider" />
            <span style={{ color: "#34d399", fontWeight: 700 }}>{Object.keys(prog.scores).length}</span>
            <span className="stat-label"> Quizzes Passed</span>
          </div>
        </header>

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

        {/* Assessor page */}
        <div className="section-label" style={{ marginTop: 28 }}>🔎 Assessor</div>
        <button className="leaderboard-card" style={{ opacity: 1, cursor: "pointer", borderColor: "rgba(129,140,248,0.2)", background: "rgba(129,140,248,0.04)" }}
          onClick={() => setView("assessor")}>
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(129,140,248,0.15)", color: "#818cf8" }}>🔎</div>
            <div>
              <div className="fc-title" style={{ color: "#818cf8" }}>Assessor Dashboard</div>
              <div className="fc-sub">View and manage all student results</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#818cf8" }}>→</div>
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
      update({ ...prog, finalDone: true, finalScore: total });
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
            <button className="btn primary" style={{ background: "#f87171", color: "#fff", width: "100%", padding: "14px", fontSize: 16 }} onClick={() => setStarted(true)}>
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
            <div className="done-sub" style={{ marginBottom: 28 }}>{pct}% — {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good Job!" : "Keep Studying!"}</div>

            {/* Name input */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "20px 18px", marginBottom: 16, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 600 }}>
                📝 Enter your full name to save your result
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
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <div className="mod-header" style={{ borderColor: "#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background: "#fbbf2422", color: "#fbbf24" }}>🏆</div>
          <div>
            <div className="mod-label" style={{ color: "#fbbf24" }}>Final Assessment</div>
            <div className="mod-header-title">Comprehensive Quiz</div>
            <div className="mod-header-sub">Question {qi + 1} of {TOTAL_ITEMS}</div>
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
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
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
      if (sortBy === "score") return (b.score || 0) - (a.score || 0);
      if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
      if (sortBy === "date") return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
      return 0;
    });

  const avg = results.length ? Math.round(results.reduce((a, r) => a + (r.score || 0), 0) / results.length * 10) / 10 : 0;
  const passing = results.filter(r => (r.score / (r.total || TOTAL_ITEMS)) >= 0.75).length;

  const exportCSV = () => {
    const header = "Name,Score,Total,Percentage,Year,Timestamp";
    const rows = results.map(r => {
      const pct = Math.round((r.score / (r.total || TOTAL_ITEMS)) * 100);
      return `"${r.name}",${r.score},${r.total || TOTAL_ITEMS},${pct}%,${r.year || ""},${r.timestamp || ""}`;
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
            <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 80px 60px 90px", gap: 8, padding: "8px 14px", fontSize: 10, color: "#475569", letterSpacing: 1, textTransform: "uppercase" }}>
              <span>#</span><span>Name</span><span>Score</span><span>%</span><span>Date</span>
            </div>
            {filtered.map((r, i) => {
              const pct = Math.round((r.score / (r.total || TOTAL_ITEMS)) * 100);
              const pass = pct >= 75;
              const date = r.timestamp ? new Date(r.timestamp).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "2-digit" }) : r.year || "—";
              return (
                <div key={r.id} style={{
                  display: "grid", gridTemplateColumns: "32px 1fr 80px 60px 90px", gap: 8, alignItems: "center",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10, padding: "12px 14px",
                }}>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 700 }}>{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171" }}>{r.score}/{r.total || TOTAL_ITEMS}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: pass ? "#34d399" : "#f87171" }}>{pct}%</span>
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

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #060d1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .page { min-height: 100vh; background: linear-gradient(160deg,#060d1a 0%,#0a1628 60%,#060d1a 100%); }
      .home-wrap { max-width: 720px; margin: 0 auto; padding: 32px 16px 72px; }
      .inner-wrap { max-width: 660px; margin: 0 auto; padding: 24px 16px 72px; }
      .section-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #475569; margin-bottom: 10px; }

      .home-header { text-align: center; padding: 48px 0 36px; }
      .badge { display: inline-block; font-size: 10px; letter-spacing: 3px; color: #38bdf8; text-transform: uppercase; border: 1px solid #38bdf822; border-radius: 20px; padding: 4px 14px; margin-bottom: 20px; }
      .home-title { font-size: clamp(28px,7vw,46px); font-weight: 800; color: #e2e8f0; line-height: 1.15; margin-bottom: 14px; letter-spacing: -0.5px; }
      .home-sub { font-size: 14px; color: #64748b; max-width: 400px; margin: 0 auto 24px; line-height: 1.65; }
      .home-stats { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 14px; }
      .stat-label { color: #475569; }
      .divider { width: 1px; height: 18px; background: #1e293b; margin: 0 4px; }

      .module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; margin-bottom: 4px; }
      .mod-card { background: rgba(255,255,255,0.03); border: 1px solid; border-radius: 16px; padding: 18px 16px 16px; text-align: left; cursor: pointer; position: relative; transition: all 0.2s; }
      .mod-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-2px); }
      .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
      .mod-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
      .mod-icon.lg { width: 48px; height: 48px; font-size: 24px; }
      .done-badge { font-size: 10px; font-weight: 600; letter-spacing: 1px; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
      .mod-num { font-size: 10px; color: #475569; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
      .mod-title { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 2px; }
      .mod-sub { font-size: 11px; color: #64748b; }
      .mod-score { font-size: 11px; margin-top: 8px; font-weight: 600; }
      .mod-arrow { position: absolute; bottom: 16px; right: 16px; font-size: 15px; opacity: 0.4; }

      .flashcard-banner, .leaderboard-card { width: 100%; background: rgba(167,139,250,0.06); border: 1px solid rgba(167,139,250,0.2); border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.2s; }
      .leaderboard-card { background: rgba(251,191,36,0.04); border-color: rgba(251,191,36,0.18); }
      .flashcard-banner:hover { background: rgba(167,139,250,0.1); transform: translateY(-1px); }
      .leaderboard-card:hover { background: rgba(251,191,36,0.08); transform: translateY(-1px); }
      .fc-left { display: flex; align-items: center; gap: 14px; }
      .fc-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(167,139,250,0.15); color: #a78bfa; font-size: 22px; display: flex; align-items: center; justify-content: center; }
      .fc-title { font-size: 15px; font-weight: 700; color: #e2e8f0; margin-bottom: 2px; }
      .fc-sub { font-size: 12px; color: #64748b; }
      .fc-arrow { font-size: 18px; color: #a78bfa; opacity: 0.6; }

      .final-card { width: 100%; background: rgba(251,191,36,0.04); border: 1px solid rgba(251,191,36,0.18); border-radius: 14px; padding: 22px 20px; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: all 0.2s; }
      .final-card:hover { background: rgba(251,191,36,0.08); }
      .final-title { font-size: 16px; font-weight: 700; color: #fbbf24; }
      .final-sub { font-size: 12px; color: #94a3b8; text-align: center; }

      .back-btn { background: none; border: none; color: #475569; font-size: 13px; cursor: pointer; padding: 0 0 20px; font-family: inherit; }
      .back-btn:hover { color: #94a3b8; }
      .mod-header { display: flex; align-items: center; gap: 16px; padding: 18px; background: rgba(255,255,255,0.03); border: 1px solid; border-radius: 14px; margin-bottom: 20px; }
      .mod-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
      .mod-header-title { font-size: 18px; font-weight: 700; color: #e2e8f0; }
      .mod-header-sub { font-size: 12px; color: #94a3b8; }

      .tabs { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
      .tab { background: none; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 6px 11px; font-size: 11px; cursor: pointer; color: #64748b; font-family: inherit; transition: all 0.2s; white-space: nowrap; }
      .tab.active, .tab:hover { border-color: var(--c); color: var(--c); }

      .content-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 22px 20px; margin-bottom: 18px; min-height: 180px; }
      .content-title { font-size: 17px; font-weight: 700; color: #e2e8f0; margin-bottom: 14px; }
      .content-body { font-size: 14px; line-height: 1.7; }
      .nav-row { display: flex; gap: 10px; justify-content: flex-end; }

      .btn { border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 11px 22px; font-size: 14px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
      .btn.ghost { background: rgba(255,255,255,0.04); color: #64748b; }
      .btn.ghost:hover { color: #94a3b8; opacity: 0.9; }
      .btn.primary { border: none; font-weight: 700; }
      .btn.primary:hover { opacity: 0.88; }
      .fc-action { padding: 13px 16px !important; font-size: 14px !important; }

      .fc-card-wrap { width: 100%; perspective: 1000px; cursor: pointer; margin-bottom: 4px; -webkit-tap-highlight-color: transparent; }
      .fc-inner { position: relative; width: 100%; min-height: 220px; transform-style: preserve-3d; transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
      .fc-inner.flipped { transform: rotateY(180deg); }
      .fc-face { position: absolute; width: 100%; min-height: 220px; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 22px; }
      .fc-front { background: linear-gradient(145deg, rgba(12,74,110,0.5), rgba(7,89,133,0.4)); border: 1px solid rgba(129,140,248,0.2); }
      .fc-back { background: linear-gradient(145deg, rgba(6,78,59,0.45), rgba(4,47,46,0.6)); border: 1px solid rgba(52,211,153,0.2); transform: rotateY(180deg); }

      .quiz-box { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 24px 20px; }
      .quiz-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
      .quiz-q { font-size: clamp(15px,3vw,18px); font-weight: 600; color: #e2e8f0; line-height: 1.55; margin-bottom: 22px; }
      .options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
      .tf-row { flex-direction: row !important; }
      .opt { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #cbd5e1; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 12px; font-family: inherit; transition: all 0.15s; }
      .opt.tf { flex: 1; justify-content: center; font-size: 15px; font-weight: 700; }
      .opt:hover { opacity: 0.9; }
      .opt.selected { background: color-mix(in srgb, var(--c) 15%, transparent); border-color: var(--c); color: var(--c); }
      .opt.correct { background: rgba(52,211,153,0.14) !important; border-color: #34d399 !important; color: #34d399 !important; }
      .opt.wrong { background: rgba(248,113,113,0.14) !important; border-color: #f87171 !important; color: #f87171 !important; }
      .opt-letter { min-width: 22px; height: 22px; border-radius: 5px; background: rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; }
      .feedback { padding: 11px 14px; border-radius: 9px; font-size: 13px; margin-bottom: 14px; line-height: 1.5; }
      .feedback.correct { background: rgba(52,211,153,0.1); border: 1px solid #34d39933; color: #34d399; }
      .feedback.wrong { background: rgba(248,113,113,0.1); border: 1px solid #f8717133; color: #f87171; }

      .name-input { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 12px 14px; font-size: 14px; color: #e2e8f0; font-family: inherit; outline: none; transition: border-color 0.2s; }
      .name-input:focus { border-color: #34d399; }
      .name-input::placeholder { color: #475569; }

      .done-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 44px 28px; text-align: center; }
      .done-title { font-size: 22px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
      .done-score { font-size: 48px; font-weight: 900; margin-bottom: 4px; }
      .done-sub { font-size: 13px; color: #64748b; }

      .exam-page { min-height: 100vh; background: linear-gradient(160deg,#0a0014 0%,#160a20 50%,#0a0014 100%); }
      .exam-intro-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(248,113,113,0.25); border-radius: 20px; padding: 40px 28px; width: 100%; max-width: 520px; text-align: center; }
      .exam-rules { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; text-align: left; }
      .exam-rule { display: flex; gap: 10px; font-size: 13px; color: "#94a3b8"; line-height: 1.5; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px; align-items: flex-start; }
      .exam-rule span { color: #94a3b8; }

      @media (max-width: 480px) {
        .module-grid { grid-template-columns: 1fr 1fr; }
        .mod-card { padding: 14px 12px; }
        .tabs { gap: 4px; }
        .tab { font-size: 10px; padding: 5px 9px; }
        .fc-left { gap: 10px; }
        .done-box { padding: 32px 18px; }
      }
    `}</style>
  );
}
