// ── final_exam/final_exam.jsx ─────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { FINAL_QUIZ, TOTAL_ITEMS } from "../data.js";
import "../global.css";
import "./final_exam.css";

// Firebase db is passed in as prop to keep firebase config in App.jsx
// ─────────────────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestion(q) {
  if (q.type !== "mc") return q;
  const indexed = q.options.map((opt, i) => ({ opt, i }));
  const shuffled = shuffle(indexed);
  const newOptions = shuffled.map(x => x.opt);
  const newAnswer = shuffled.findIndex(x => x.i === q.answer);
  return { ...q, options: newOptions, answer: newAnswer };
}

// ── Fuzzy FITB matching ───────────────────────────────────────────────────────
const NUM_WORDS = { zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10 };
function normalizeFitb(s) {
  if (typeof s !== "string") return "";
  let v = s.trim().toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (v.length > 3 && v.endsWith("s")) v = v.slice(0, -1);
  if (NUM_WORDS[v] !== undefined) v = String(NUM_WORDS[v]);
  return v;
}

function isCorrect(q, a) {
  if (q.type === "mc") return a === q.answer;
  if (q.type === "tf") return a === (q.answer ? 0 : 1);
  if (q.type === "fitb") {
    if (typeof a !== "string") return false;
    const na = normalizeFitb(a);
    const accepted = Array.isArray(q.answer) ? q.answer : q.answer.split("|");
    return accepted.some(ans => normalizeFitb(ans) === na);
  }
  if (q.type === "multi") {
    if (!Array.isArray(a)) return false;
    return [...a].sort().join(",") === [...q.answer].sort().join(",");
  }
  return false;
}

// ── FinalQuizView ─────────────────────────────────────────────────────────────
export function FinalQuizView({ prog, update, onBack, db }) {
  const [quiz] = useState(() => shuffle(FINAL_QUIZ.map(shuffleQuestion)));
  const [started, setStarted] = useState(false);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(() => !!prog.finalDone);
  const [finalScore, setFinalScore] = useState(() => prog.finalScore || 0);
  const [fitbVal, setFitbVal] = useState(""),
        [elapsed, setElapsed] = useState(() => prog.finalElapsed || 0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);
  const [name, setName] = useState("");
  const [nameLocked, setNameLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const q = quiz[qi];
  const sel = answers[qi];

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
      try { localStorage.setItem("wrm_final_review", JSON.stringify({ quiz, answers })); } catch {}
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
        name: name.trim(), score: finalScore, total: TOTAL_ITEMS,
        time_elapsed: elapsed, year: new Date().getFullYear(),
        timestamp: new Date().toISOString(),
      });
      setNameLocked(true);
    } catch { setSaveError("Failed to save. Please try again."); }
    setSaving(false);
  };

  // ── Intro screen ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="exam-page">
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
              <div className="exam-rule">⏱️ <span>Answer each question carefully. You <strong style={{color:"#e2e8f0"}}>cannot go back</strong>.</span></div>
              <div className="exam-rule">🔒 <span>You may only take this exam <strong style={{color:"#f87171"}}>once</strong>.</span></div>
              <div className="exam-rule">🙈 <span>Questions are <strong style={{color:"#e2e8f0"}}>randomized</strong>. Do not share your screen.</span></div>
              <div className="exam-rule">✍️ <span>Enter your <strong style={{color:"#e2e8f0"}}>full name</strong> at the end to save your result.</span></div>
            </div>
            <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 10, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "#f87171", lineHeight: 1.5 }}>
              ⚠️ By clicking Start, you confirm your answers are your own and this exam cannot be retaken.
            </div>
            <button className="btn primary" style={{ background: "#f87171", color: "#fff", width: "100%", padding: "14px", fontSize: 16 }}
              onClick={() => {
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

  // ── Results screen ────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((finalScore / TOTAL_ITEMS) * 100);
    let reviewData = null;
    try { const r = localStorage.getItem("wrm_final_review"); reviewData = r ? JSON.parse(r) : null; } catch {}
    return (
      <FinalResultScreen
        pct={pct} finalScore={finalScore} elapsed={elapsed}
        name={name} setName={setName} nameLocked={nameLocked}
        saving={saving} saveError={saveError} handleSaveName={handleSaveName}
        onBack={onBack} reviewData={reviewData}
      />
    );
  }

  // ── Active exam ───────────────────────────────────────────────────────────
  const typeLabel = { mc: "Multiple Choice", tf: "True or False", fitb: "Fill in the Blank", multi: "Select 3 Correct Answers" };

  return (
    <div className="page">
      <div className="inner-wrap">
        <div className="denr-stripe" />
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        {/* Header with timer */}
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

        {/* Progress bar */}
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

          {/* True / False */}
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
              <input className="name-input" type="text" placeholder="Type your answer here..."
                value={fitbVal}
                onChange={e => !confirmed && setFitbVal(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !confirmed && confirm()}
                style={{ opacity: confirmed ? 0.7 : 1 }}
              />
              {confirmed && (
                <div style={{ marginTop: 8, fontSize: 13, color: isCorrect(q, fitbVal) ? "#34d399" : "#94a3b8" }}>
                  {isCorrect(q, fitbVal) ? "" : `Correct answer: "${Array.isArray(q.answer) ? q.answer[0] : q.answer}"`}
                </div>
              )}
            </div>
          )}

          {/* Multi-select */}
          {q.type === "multi" && (
            <div className="options">
              {q.options.map((opt, i) => {
                const curSel = answers[qi] || [];
                const isSelected = curSel.includes(i);
                const isCorrectOpt = q.answer.includes(i);
                let cls = "opt";
                if (confirmed) { if (isCorrectOpt) cls += " correct"; else if (isSelected) cls += " wrong"; }
                else if (isSelected) cls += " selected";
                return (
                  <button key={i} className={cls} style={{ "--c": "#fbbf24" }} onClick={() => toggleMulti(i)}>
                    <span className="opt-letter" style={{ background: isSelected && !confirmed ? "#fbbf2433" : undefined }}>
                      {isSelected ? "✓" : ["A","B","C","D","E"][i]}
                    </span>
                    {opt}
                  </button>
                );
              })}
              <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{(answers[qi] || []).length}/3 selected</div>
            </div>
          )}

          {/* Feedback */}
          {confirmed && (
            <div className={`feedback ${isCorrect(q, q.type === "fitb" ? fitbVal : answers[qi]) ? "correct" : "wrong"}`}>
              {isCorrect(q, q.type === "fitb" ? fitbVal : answers[qi])
                ? "✓ Correct!"
                : q.type === "mc"    ? `✗ Correct answer: ${q.options[q.answer]}`
                : q.type === "tf"    ? `✗ Correct answer: ${q.answer ? "True" : "False"}`
                : q.type === "multi" ? `✗ Correct answers: ${q.answer.map(i => q.options[i]).join(", ")}`
                : ""}
            </div>
          )}

          {!confirmed
            ? <button className="btn primary" style={{ background: canConfirm() ? "#fbbf24" : "rgba(255,255,255,0.05)", color: canConfirm() ? "#0f172a" : "#475569", width: "100%" }} onClick={confirm}>Check Answer</button>
            : <button className="btn primary" style={{ background: "#fbbf24", color: "#0f172a", width: "100%" }} onClick={next}>
                {qi + 1 < TOTAL_ITEMS ? "Next Question →" : "See Results →"}
              </button>
          }
        </div>
      </div>
    </div>
  );
}

// ── FinalResultScreen ─────────────────────────────────────────────────────────
function FinalResultScreen({ pct, finalScore, elapsed, name, setName, nameLocked, saving, saveError, handleSaveName, onBack, reviewData }) {
  const [showReview, setShowReview] = useState(false);

  const typeLabel = { mc: "MC", tf: "T/F", fitb: "Fill in Blank", multi: "Multi-select" };

  const getAnswerText = (q, a) => {
    if (q.type === "mc")    return a !== undefined ? q.options[a] : "—";
    if (q.type === "tf")    return a === 0 ? "True" : a === 1 ? "False" : "—";
    if (q.type === "fitb")  return typeof a === "string" ? a : "—";
    if (q.type === "multi") return Array.isArray(a) ? a.map(i => q.options[i]).join(", ") : "—";
    return "—";
  };

  const getCorrectText = (q) => {
    if (q.type === "mc")    return q.options[q.answer];
    if (q.type === "tf")    return q.answer ? "True" : "False";
    if (q.type === "fitb")  return Array.isArray(q.answer) ? q.answer[0] : q.answer;
    if (q.type === "multi") return q.answer.map(i => q.options[i]).join(", ");
    return "—";
  };

  return (
    <div className="page">
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
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10, fontWeight: 600 }}>📝 Enter your full name to save your result</div>
            {!nameLocked ? (
              <>
                <div style={{ fontSize: 11, color: "#f87171", marginBottom: 10, lineHeight: 1.5 }}>⚠️ Warning: Once submitted, your name cannot be changed.</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="name-input" type="text" placeholder="Enter your full name..."
                    value={name} onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSaveName()} />
                  <button className="btn primary"
                    style={{ background: name.trim() ? "#34d399" : "rgba(255,255,255,0.05)", color: name.trim() ? "#0f172a" : "#475569", whiteSpace: "nowrap", padding: "11px 16px" }}
                    onClick={handleSaveName} disabled={saving || !name.trim()}>
                    {saving ? "Saving..." : "Submit"}
                  </button>
                </div>
                {saveError && <div style={{ fontSize: 12, color: "#f87171", marginTop: 8 }}>{saveError}</div>}
              </>
            ) : (
              <div style={{ color: "#34d399", fontSize: 14, fontWeight: 600 }}>✓ Score saved for <strong>{name}</strong>!</div>
            )}
          </div>

          {reviewData && (
            <button className="btn ghost"
              style={{ width: "100%", marginBottom: 10, color: "#818cf8", borderColor: "rgba(129,140,248,0.3)", background: "rgba(129,140,248,0.06)" }}
              onClick={() => setShowReview(r => !r)}>
              {showReview ? "▲ Hide Answer Review" : "▼ Review My Answers"}
            </button>
          )}

          <button className="btn primary" style={{ background: "#fbbf24", color: "#0f172a", width: "100%" }} onClick={onBack}>← Back to Home</button>
        </div>

        {/* Answer review */}
        {showReview && reviewData && (
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#475569", marginBottom: 4 }}>Answer Review</div>
            {reviewData.quiz.map((q, i) => {
              const a = reviewData.answers[i];
              const correct = isCorrect(q, a);
              return (
                <div key={i} style={{ background: correct ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)", border: `1px solid ${correct ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{correct ? "✅" : "❌"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>Q{i + 1} · {typeLabel[q.type]}</div>
                      <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 600, lineHeight: 1.4 }}>{q.q}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: correct ? "1fr" : "1fr 1fr", gap: 8, paddingLeft: 26 }}>
                    <div style={{ background: correct ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: correct ? "#34d399" : "#f87171", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Your Answer</div>
                      <div style={{ fontSize: 13, color: correct ? "#34d399" : "#f87171", fontWeight: 600 }}>{getAnswerText(q, a)}</div>
                    </div>
                    {!correct && (
                      <div style={{ background: "rgba(52,211,153,0.1)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: 10, color: "#34d399", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Correct Answer</div>
                        <div style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>{getCorrectText(q)}</div>
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

// ── LeaderboardView ───────────────────────────────────────────────────────────
export function LeaderboardView({ onBack, db }) {
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
    } catch { setError("Could not load results. Check your connection."); }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="page">
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
        {error   && <div style={{ textAlign: "center", color: "#f87171", padding: 20, fontSize: 14 }}>{error}</div>}
        {!loading && !error && results.length === 0 && <div style={{ textAlign: "center", color: "#475569", padding: 40, fontSize: 14 }}>No results yet.</div>}

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
