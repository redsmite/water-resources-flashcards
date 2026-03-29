// ── App.jsx ───────────────────────────────────────────────────────────────────
import { useState } from "react";
import "./global.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { DENR_LOGO, MODULES, FLASHCARDS, TOTAL_ITEMS } from "./data.js";

import { ModuleView }      from "./chapter/chapter.jsx";
import { FlashcardsView }  from "./flashcard/flashcard.jsx";
import { FinalQuizView, LeaderboardView } from "./final_exam/final_exam.jsx";
import { ResourcesView, VideoSection }    from "./resources/resources.jsx";

// ── Firebase ──────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyAgV8tXzZWZyNPEbK6O305hwJcRqkxqBxU",
  authDomain:        "wrus-asset-tracking-system.firebaseapp.com",
  projectId:         "wrus-asset-tracking-system",
  storageBucket:     "wrus-asset-tracking-system.appspot.com",
  messagingSenderId: "946198823737",
  appId:             "1:946198823737:web:8966ed475b86e188489ee8",
};
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── Local storage ─────────────────────────────────────────────────────────────
const KEY = "wrm_v3";
function loadP() {
  try {
    const r = localStorage.getItem(KEY);
    return r ? JSON.parse(r) : { completed: {}, scores: {}, finalDone: false, finalScore: null };
  } catch {
    return { completed: {}, scores: {}, finalDone: false, finalScore: null };
  }
}
function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [prog, setProg]   = useState(loadP);
  const [view, setView]   = useState("home");
  const [modIdx, setModIdx] = useState(null);

  const update = (p) => { setProg(p); saveP(p); };
  const completedCount = Object.keys(prog.completed).length;
  const allDone = completedCount >= MODULES.length;

  // ── Route to sub-pages ────────────────────────────────────────────────────
  if (view === "module")      return <ModuleView     mod={MODULES[modIdx]} prog={prog} update={update} onBack={() => setView("home")} />;
  if (view === "flashcards")  return <FlashcardsView onBack={() => setView("home")} />;
  if (view === "final")       return <FinalQuizView  prog={prog} update={update} onBack={() => setView("home")} db={db} />;
  if (view === "leaderboard") return <LeaderboardView onBack={() => setView("home")} db={db} />;
  if (view === "resources")   return <ResourcesView  onBack={() => setView("home")} />;

  // ── Home screen ───────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div className="home-wrap">
        <div className="denr-stripe" />

        {/* Header */}
        <header className="home-header">
          <div className="denr-logo-wrap">
            <img src={DENR_LOGO} alt="DENR Logo" className="denr-logo" />
          </div>
          <div className="denr-agency">Department of Environment and Natural Resources</div>
          <div className="denr-office">National Capital Region — Water Resources Utilization Section</div>
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

        {/* Learning Modules */}
        <div className="section-label">📚 Learning Modules</div>
        <div className="module-grid">
          {MODULES.map((mod, i) => {
            const done  = !!prog.completed[mod.id];
            const score = prog.scores[mod.id];
            return (
              <button
                key={mod.id}
                className="mod-card"
                style={{ "--c": mod.color, borderColor: done ? mod.color + "44" : "rgba(255,255,255,0.07)" }}
                onClick={() => { setModIdx(i); setView("module"); }}
              >
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

        {/* Flashcards */}
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

        {/* Final Assessment */}
        <div className="section-label" style={{ marginTop: 28 }}>🏆 Assessment</div>
        <button
          className="final-card"
          style={{ opacity: (allDone && !prog.finalDone) ? 1 : 0.4, cursor: (allDone && !prog.finalDone) ? "pointer" : "not-allowed" }}
          onClick={() => (allDone && !prog.finalDone) && setView("final")}
        >
          <span style={{ fontSize: 28 }}>🏆</span>
          <span className="final-title">Final Assessment</span>
          <span className="final-sub">
            {!allDone
              ? "Complete all 6 modules to unlock"
              : prog.finalDone
                ? "Assessment already submitted — cannot retake"
                : `${TOTAL_ITEMS}-item quiz — MC, True/False, Fill in the Blank, Multi-select`}
          </span>
          {prog.finalDone && (
            <span style={{ color: "#34d399", fontSize: 13, fontWeight: 600 }}>
              Your score: {prog.finalScore}/{TOTAL_ITEMS}
            </span>
          )}
        </button>

        {/* Leaderboard */}
        <div className="section-label" style={{ marginTop: 28 }}>📊 Student Results</div>
        <button className="leaderboard-card" style={{ opacity: 1, cursor: "pointer" }} onClick={() => setView("leaderboard")}>
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>📊</div>
            <div>
              <div className="fc-title" style={{ color: "#fbbf24" }}>View All Results</div>
              <div className="fc-sub">See how all students scored</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#fbbf24" }}>→</div>
        </button>

        {/* Video References */}
        <div className="section-label" style={{ marginTop: 28 }}>🎬 Video References</div>
        <VideoSection />

        {/* Legal References */}
        <div className="section-label">📖 References</div>
        <button
          className="flashcard-banner"
          style={{ marginBottom: 20, borderColor: "rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.05)" }}
          onClick={() => setView("resources")}
        >
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>📖</div>
            <div>
              <div className="fc-title" style={{ color: "#fbbf24" }}>Legal References</div>
              <div className="fc-sub">PD 424, PD 1067, PD 1206, EO 124-A, EO 123, EO 860, EO 22</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#fbbf24" }}>→</div>
        </button>
      </div>
    </div>
  );
}