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
    return r ? JSON.parse(r) : { completed:{}, scores:{}, finalDone:false, finalScore:null };
  } catch {
    return { completed:{}, scores:{}, finalDone:false, finalScore:null };
  }
}
function saveP(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

const VALID_THEMES = ["light", "dark", "sepia"];

function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    // Sepia is now the default theme
    return VALID_THEMES.includes(t) ? t : "sepia";
  } catch { 
    return "sepia"; 
  }
}
function saveTheme(t) { try { localStorage.setItem(THEME_KEY, t); } catch {} }

// ── Helpers ───────────────────────────────────────────────────────────────────
function examIsOngoing() {
  try { const s = JSON.parse(localStorage.getItem("wrm_exam_progress")||"null"); return !!s?.started; }
  catch { return false; }
}
function hasPendingSave() {
  try { return !!localStorage.getItem("wrm_pending_save"); } catch { return false; }
}
function hasReviewData() {
  try { return !!localStorage.getItem("wrm_final_review"); } catch { return false; }
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
// Cycles: light → dark → sepia → light
// Button shows what the NEXT theme will be
const THEME_CYCLE = {
  light:  { next: "dark",  icon: "🌙", label: "Dark"  },
  dark:   { next: "sepia", icon: "📜", label: "Sepia" },
  sepia:  { next: "light", icon: "☀️", label: "Light" },
};

function ThemeToggle({ theme, onToggle }) {
  const meta = THEME_CYCLE[theme] ?? THEME_CYCLE.light;
  return (
    <button onClick={onToggle} aria-label="Switch theme" className="theme-toggle">
      <span className="theme-toggle-icon">{meta.icon}</span>
      {meta.label}
    </button>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [prog, setProg]     = useState(loadP);
  const [theme, setTheme]   = useState(loadTheme);   // Now defaults to sepia
  const [view, setView]     = useState(() => hasPendingSave() ? "final" : "home");
  const [modIdx, setModIdx] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme  = () => setTheme(t => THEME_CYCLE[t]?.next ?? "light");
  const update       = (p) => { setProg(p); saveP(p); };
  const completedCount = Object.keys(prog.completed).length;
  const allDone        = completedCount >= MODULES.length;
  const examOngoing    = examIsOngoing();
  const finalUnlocked  = allDone && !prog.finalDone;

  const toggle = <ThemeToggle theme={theme} onToggle={toggleTheme} />;

  // ── Sub-page routing ──────────────────────────────────────────────────────
  if (view === "module")      return <>{toggle}<ModuleView      mod={MODULES[modIdx]} prog={prog} update={update} onBack={() => setView("home")} /></>;
  if (view === "flashcards")  return <>{toggle}<FlashcardsView  onBack={() => setView("home")} /></>;
  if (view === "final")       return <>{toggle}<FinalQuizView   prog={prog} update={update} onBack={() => setView("home")} db={db} /></>;
  if (view === "leaderboard") return <>{toggle}<LeaderboardView onBack={() => setView("home")} db={db} /></>;
  if (view === "resources")   return <>{toggle}<ResourcesView   onBack={() => setView("home")} /></>;

  // ── Home screen ───────────────────────────────────────────────────────────
  return (
    <div className="page">
      {toggle}
      <div className="home-wrap">
        <div className="denr-stripe" />

        {/* Exam lockout banner */}
        {examOngoing && (
          <div className="exam-lockout-banner">
            <span className="exam-lockout-icon">🔒</span>
            <div className="exam-lockout-body">
              <div className="exam-lockout-title">Exam In Progress</div>
              <div className="exam-lockout-text">
                You have an unfinished exam. Modules, flashcards, and references are locked until you complete it.
              </div>
            </div>
            <button className="btn exam-lockout-btn" onClick={() => setView("final")}>
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
            <span className="stat-done">{completedCount}/{MODULES.length}</span>
            <span className="stat-label"> Modules Done</span>
            <span className="divider" />
            <span className="stat-passed">{Object.keys(prog.scores).length}</span>
            <span className="stat-label"> Quizzes Passed</span>
          </div>
        </header>

        {/* Learning Modules */}
        <div className="section-label">📚 Learning Modules</div>
        <div className={`module-grid${examOngoing ? " module-grid--locked" : ""}`}>
          {examOngoing && (
            <div className="module-lockout-overlay">
              <span className="module-lockout-icon">🔒</span>
              <span className="module-lockout-label">Locked during exam</span>
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
                {score !== undefined && (
                  <div className="mod-score" style={{ color: mod.color }}>Quiz: {score}/{mod.quiz.length}</div>
                )}
                <div className="mod-arrow" style={{ color: mod.color }}>→</div>
              </button>
            );
          })}
        </div>

        {/* Flashcards */}
        <div className="section-label section-label--mt">🃏 Flashcard Review</div>
        <button
          className={`flashcard-banner${examOngoing ? " flashcard-banner--locked" : ""}`}
          onClick={() => !examOngoing && setView("flashcards")}
          disabled={examOngoing}
        >
          <div className="fc-left">
            <div className="fc-icon">{examOngoing ? "🔒" : "🃏"}</div>
            <div>
              <div className="fc-title">Study Flashcards</div>
              <div className="fc-sub">
                {examOngoing ? "Locked during exam" : `${FLASHCARDS.length} cards covering all 6 modules`}
              </div>
            </div>
          </div>
          <div className="fc-arrow">→</div>
        </button>

        {/* Final Assessment */}
        <div className="section-label section-label--mt">🏆 Assessment</div>
        <button
          className={`final-card${finalUnlocked ? "" : " final-card--locked"}`}
          onClick={() => finalUnlocked && setView("final")}
          disabled={!finalUnlocked}
        >
          <span className="final-card-icon">🏆</span>
          <span className="final-title">Final Assessment</span>
          <span className="final-sub">
            {!allDone
              ? "Complete all 6 modules to unlock"
              : prog.finalDone
                ? "Assessment already submitted — cannot retake"
                : `${TOTAL_ITEMS}-item quiz — MC, True/False, Fill in the Blank, Multi-select`}
          </span>
          {prog.finalDone && (
            <span className="final-score-line">Your score: {prog.finalScore}/{TOTAL_ITEMS}</span>
          )}
        </button>

        {/* Answer Review */}
        {hasReviewData() && (
          <>
            <div className="section-label section-label--mt">📝 Answer Review</div>
            <button className="flashcard-banner answer-review-banner" onClick={() => setView("final")}>
              <div className="fc-left">
                <div className="fc-icon answer-review-icon">📝</div>
                <div>
                  <div className="fc-title answer-review-title">Review Your Answers</div>
                  <div className="fc-sub">See which questions you got right or wrong</div>
                </div>
              </div>
              <div className="fc-arrow answer-review-arrow">→</div>
            </button>
          </>
        )}

        {/* Leaderboard */}
        <div className="section-label section-label--mt">📊 Student Results</div>
        <button className="leaderboard-card" onClick={() => setView("leaderboard")}>
          <div className="fc-left">
            <div className="fc-icon leaderboard-icon">📊</div>
            <div>
              <div className="fc-title leaderboard-title">View All Results</div>
              <div className="fc-sub">See how all students scored</div>
            </div>
          </div>
          <div className="fc-arrow leaderboard-arrow">→</div>
        </button>

        {/* Video References */}
        <div className="section-label section-label--mt">🎬 Video References</div>
        <VideoSection />

        {/* Legal References */}
        <div className="section-label">📖 References</div>
        <button
          className={`flashcard-banner refs-banner${examOngoing ? " refs-banner--locked" : ""}`}
          onClick={() => !examOngoing && setView("resources")}
          disabled={examOngoing}
        >
          <div className="fc-left">
            <div className={`fc-icon refs-icon${examOngoing ? " refs-icon--locked" : ""}`}>
              {examOngoing ? "🔒" : "📖"}
            </div>
            <div>
              <div className={`fc-title refs-title${examOngoing ? " refs-title--locked" : ""}`}>
                Legal References
              </div>
              <div className="fc-sub">
                {examOngoing ? "Locked during exam" : "PD 424, PD 1067, PD 1206, EO 124-A, EO 123, EO 860, EO 22"}
              </div>
            </div>
          </div>
          <div className={`fc-arrow refs-arrow${examOngoing ? " refs-arrow--locked" : ""}`}>→</div>
        </button>

      </div>
    </div>
  );
}