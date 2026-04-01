// ── App.jsx ───────────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import "./global.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { DENR_LOGO, MODULES, FLASHCARDS, TOTAL_ITEMS } from "./data.js";

import { ModuleView }      from "./chapter/Chapter.jsx";
import { FlashcardsView }  from "./flashcard/Flashcard.jsx";
import { FinalQuizView, LeaderboardView } from "./final_exam/Final_exam.jsx";
import { ResourcesView, VideoSection }    from "./resources/Resources.jsx";

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
const KEY       = "wrm_v3";
const THEME_KEY = "wrm_theme";

function loadP() {
  try {
    const r = localStorage.getItem(KEY);
    return r ? JSON.parse(r) : { completed: {}, scores: {}, finalDone: false, finalScore: null };
  } catch {
    return { completed: {}, scores: {}, finalDone: false, finalScore: null };
  }
}
function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

function loadTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === "dark" ? "dark" : "light";   // ← Light is now default
  } catch {
    return "light";   // ← Changed default to light
  }
}
function saveTheme(t) { try { localStorage.setItem(THEME_KEY, t); } catch {} }

// ── Helpers ───────────────────────────────────────────────────────────────────
function examIsOngoing() {
  try {
    const raw = localStorage.getItem("wrm_exam_progress");
    if (!raw) return false;
    const s = JSON.parse(raw);
    return !!s?.started;
  } catch { return false; }
}
function hasPendingSave() {
  try { return !!localStorage.getItem("wrm_pending_save"); } catch { return false; }
}
function hasReviewData() {
  try { return !!localStorage.getItem("wrm_final_review"); } catch { return false; }
}

// ── Theme Toggle Button ───────────────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="theme-toggle"
    >
      <span className="theme-toggle-icon">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [prog, setProg]     = useState(loadP);
  const [theme, setTheme]   = useState(loadTheme);   // Now defaults to light
  const [view, setView]     = useState(() => {
    if (hasPendingSave()) return "final";
    return "home";
  });
  const [modIdx, setModIdx] = useState(null);

  // Apply data-theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const update = (p) => { setProg(p); saveP(p); };
  const completedCount = Object.keys(prog.completed).length;
  const allDone = completedCount >= MODULES.length;
  const examOngoing = examIsOngoing();

  const toggle = <ThemeToggle theme={theme} onToggle={toggleTheme} />;

  // ── Route to sub-pages ────────────────────────────────────────────────────
  if (view === "module")      return <>{toggle}<ModuleView     mod={MODULES[modIdx]} prog={prog} update={update} onBack={() => setView("home")} /></>;
  if (view === "flashcards")  return <>{toggle}<FlashcardsView onBack={() => setView("home")} /></>;
  if (view === "final")       return <>{toggle}<FinalQuizView  prog={prog} update={update} onBack={() => setView("home")} db={db} /></>;
  if (view === "leaderboard") return <>{toggle}<LeaderboardView onBack={() => setView("home")} db={db} /></>;
  if (view === "resources")   return <>{toggle}<ResourcesView  onBack={() => setView("home")} /></>;

  // ── Home screen ───────────────────────────────────────────────────────────
  return (
    <div className="page">
      {toggle}
      <div className="home-wrap">
        <div className="denr-stripe" />

        {/* Exam lockout banner */}
        {examOngoing && (
          <div style={{
            background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.35)",
            borderRadius:12, padding:"14px 18px", marginBottom:20,
            display:"flex", alignItems:"center", gap:14,
          }}>
            <span style={{ fontSize:22 }}>🔒</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:"#f87171", fontWeight:700, marginBottom:3 }}>Exam In Progress</div>
              <div style={{ fontSize:12, color:"#94a3b8", lineHeight:1.5 }}>
                You have an unfinished exam. Modules, flashcards, and references are locked until you complete it.
              </div>
            </div>
            <button className="btn primary"
              style={{ background:"#f87171", color:"#fff", whiteSpace:"nowrap", padding:"10px 16px", fontSize:13, flexShrink:0 }}
              onClick={() => setView("final")}>
              Resume Exam →
            </button>
          </div>
        )}

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
        <div className="module-grid" style={{ position:"relative" }}>
          {examOngoing && (
            <div style={{
              position:"absolute", inset:0, zIndex:10,
              background:"rgba(15,23,42,0.7)", borderRadius:16,
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8,
              backdropFilter:"blur(2px)",
            }}>
              <span style={{ fontSize:28 }}>🔒</span>
              <span style={{ fontSize:13, color:"#f87171", fontWeight:700 }}>Locked during exam</span>
            </div>
          )}
          {MODULES.map((mod, i) => {
            const done  = !!prog.completed[mod.id];
            const score = prog.scores[mod.id];
            return (
              <button
                key={mod.id}
                className="mod-card"
                style={{ "--c": mod.color, borderColor: done ? mod.color + "44" : undefined }}
                onClick={() => !examOngoing && (setModIdx(i), setView("module"))}
                disabled={examOngoing}
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
        <button
          className="flashcard-banner"
          onClick={() => !examOngoing && setView("flashcards")}
          disabled={examOngoing}
          style={{ opacity: examOngoing ? 0.4 : 1, cursor: examOngoing ? "not-allowed" : "pointer" }}
        >
          <div className="fc-left">
            <div className="fc-icon">{examOngoing ? "🔒" : "🃏"}</div>
            <div>
              <div className="fc-title">Study Flashcards</div>
              <div className="fc-sub">{examOngoing ? "Locked during exam" : `${FLASHCARDS.length} cards covering all 6 modules`}</div>
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

        {/* Answer Review */}
        {hasReviewData() && (
          <>
            <div className="section-label" style={{ marginTop: 28 }}>📝 Answer Review</div>
            <button
              className="flashcard-banner"
              style={{ borderColor:"rgba(129,140,248,0.25)", background:"rgba(129,140,248,0.05)", marginBottom:0 }}
              onClick={() => setView("final")}
            >
              <div className="fc-left">
                <div className="fc-icon" style={{ background:"rgba(129,140,248,0.15)", color:"#818cf8" }}>📝</div>
                <div>
                  <div className="fc-title" style={{ color:"#818cf8" }}>Review Your Answers</div>
                  <div className="fc-sub">See which questions you got right or wrong</div>
                </div>
              </div>
              <div className="fc-arrow" style={{ color:"#818cf8" }}>→</div>
            </button>
          </>
        )}

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
          style={{
            marginBottom: 20,
            borderColor: examOngoing ? "rgba(248,113,113,0.2)" : "rgba(251,191,36,0.2)",
            background: examOngoing ? "rgba(248,113,113,0.04)" : "rgba(251,191,36,0.05)",
            opacity: examOngoing ? 0.4 : 1, cursor: examOngoing ? "not-allowed" : "pointer",
          }}
          onClick={() => !examOngoing && setView("resources")}
          disabled={examOngoing}
        >
          <div className="fc-left">
            <div className="fc-icon" style={{ background: examOngoing ? "rgba(248,113,113,0.12)" : "rgba(251,191,36,0.12)", color: examOngoing ? "#f87171" : "#fbbf24" }}>
              {examOngoing ? "🔒" : "📖"}
            </div>
            <div>
              <div className="fc-title" style={{ color: examOngoing ? "#f87171" : "#fbbf24" }}>Legal References</div>
              <div className="fc-sub">{examOngoing ? "Locked during exam" : "PD 424, PD 1067, PD 1206, EO 124-A, EO 123, EO 860, EO 22"}</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: examOngoing ? "#f87171" : "#fbbf24" }}>→</div>
        </button>
      </div>
    </div>
  );
}