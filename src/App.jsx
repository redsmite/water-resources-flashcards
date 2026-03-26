import { useState, useCallback, useEffect, useRef } from "react";
import { DENR_LOGO, MODULES, FINAL_QUIZ, TOTAL_ITEMS, FLASHCARDS, LEGAL_REFS } from "./data.js";
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
          <div className="denr-office">National Capital Region — Water Resources and Utilization Section</div>
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

        {/* Leaderboard */}
        <div className="section-label" style={{ marginTop: 28 }}>📊 Student Results</div>
        <button className="leaderboard-card" style={{ opacity: 1, cursor: "pointer" }}
          onClick={() => setView("leaderboard")}>
          <div className="fc-left">
            <div className="fc-icon" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>📊</div>
            <div>
              <div className="fc-title" style={{ color: "#fbbf24" }}>View All Results</div>
              <div className="fc-sub">See how all students scored</div>
            </div>
          </div>
          <div className="fc-arrow" style={{ color: "#fbbf24" }}>→</div>
        </button>

        <div className="section-label">📖 References</div>
        {/* Legal References - for further studies */}
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
  // If already done, show results screen immediately
  const [done, setDone] = useState(() => !!prog.finalDone);
  const [finalScore, setFinalScore] = useState(() => prog.finalScore || 0);
  const [fitbVal, setFitbVal] = useState(""),
  // Restore elapsed from saved progress if re-viewing results
  [elapsed, setElapsed] = useState(() => prog.finalElapsed || 0);
  // Timer
  const [startTime, setStartTime] = useState(null);
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
              <div className="exam-rule">🙈 <span>Questions are <strong style={{color:"#e2e8f0"}}>in randomized order</strong>. Do not share your screen with others.</span></div>
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
