// ── final_exam/Final_exam.jsx ─────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { FINAL_QUIZ, TOTAL_ITEMS } from "../data.js";
import "../global.css";
import "./final_exam.css";
import { scrollToTop } from "../scrollToTop.js";

const PROGRESS_KEY    = "wrm_exam_progress";
const PENDING_KEY     = "wrm_pending_save";
const PENALTY_SECONDS = 5 * 60;

function saveProgress(state) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(state)); } catch {} }
function loadProgress() { try { const r = localStorage.getItem(PROGRESS_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function clearProgress() { try { localStorage.removeItem(PROGRESS_KEY); } catch {} }
function savePending(data) { try { localStorage.setItem(PENDING_KEY, JSON.stringify(data)); } catch {} }
function loadPending() { try { const r = localStorage.getItem(PENDING_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function clearPending() { try { localStorage.removeItem(PENDING_KEY); } catch {} }
function nameAlreadySaved() { try { return !localStorage.getItem(PENDING_KEY); } catch { return false; } }
function hasReviewKey() { try { return !!localStorage.getItem("wrm_final_review"); } catch { return false; } }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function shuffleQuestion(q) {
  if (q.type !== "mc") return q;
  const indexed = q.options.map((opt,i) => ({opt,i}));
  const shuffled = shuffle(indexed);
  return { ...q, options:shuffled.map(x=>x.opt), answer:shuffled.findIndex(x=>x.i===q.answer) };
}

const NUM_WORDS = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};
function normalizeFitb(s) {
  if (typeof s !== "string") return "";
  let v = s.trim().toLowerCase().replace(/['']/g,"").replace(/[^a-z0-9\s]/g,"").replace(/\s+/g," ").trim();
  if (v.length > 3 && v.endsWith("s")) v = v.slice(0,-1);
  if (NUM_WORDS[v] !== undefined) v = String(NUM_WORDS[v]);
  return v;
}
function isCorrect(q, a) {
  if (q.type==="mc")    return a === q.answer;
  if (q.type==="tf")    return a === (q.answer ? 0 : 1);
  if (q.type==="fitb")  { if (typeof a !== "string") return false; const na=normalizeFitb(a); const acc=Array.isArray(q.answer)?q.answer:q.answer.split("|"); return acc.some(x=>normalizeFitb(x)===na); }
  if (q.type==="multi") { if (!Array.isArray(a)) return false; return [...a].sort().join(",")===([...q.answer].sort().join(",")); }
  return false;
}

// ── FinalQuizView ─────────────────────────────────────────────────────────────
export function FinalQuizView({ prog, update, onBack, db }) {
  const saved   = loadProgress();
  const pending = loadPending();

  const [quiz] = useState(() => saved?.quiz ?? shuffle(FINAL_QUIZ.map(shuffleQuestion)));
  const [started, setStarted]           = useState(() => saved?.started ?? false);
  const [answeredUpTo, setAnsweredUpTo] = useState(() => saved?.answeredUpTo ?? 0);
  const [qi, setQi]                     = useState(() => saved?.answeredUpTo ?? 0);
  const [answers, setAnswers]           = useState(() => saved?.answers ?? {});
  const [fitbVal, setFitbVal]           = useState("");

  const [done, setDone]               = useState(() => !!prog.finalDone || !!pending || hasReviewKey());
  const [finalScore, setFinalScore]   = useState(() => prog.finalScore ?? pending?.score ?? 0);

  const penaltyCountRef = useRef(saved?.penaltyCount ?? pending?.penaltyCount ?? 0);
  const [penaltyCount, setPenaltyCount] = useState(() => penaltyCountRef.current);

  const initialElapsedRef = useRef((() => {
    const rawBase          = saved?.elapsed ?? prog.finalElapsed ?? pending?.elapsed ?? 0;
    const pendingPenalties = saved?.pendingPenalties ?? 0;
    return rawBase + pendingPenalties * PENALTY_SECONDS;
  })());

  const [elapsed, setElapsed]           = useState(() => initialElapsedRef.current);
  const [penaltyFlash, setPenaltyFlash] = useState(false);

  const startTimeRef       = useRef(null);
  const timerRef           = useRef(null);
  const baseRef            = useRef(null);
  const penaltyCooldownRef = useRef(false);

  const [name, setName]               = useState("");
  const [nameLocked, setNameLocked]   = useState(() => (!!prog.finalDone || !!pending || hasReviewKey()) && nameAlreadySaved());
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState("");

  const q   = quiz[qi];
  const sel = answers[qi];

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    saveProgress({ quiz, started, qi, answeredUpTo, answers, elapsed, pendingPenalties: 0, penaltyCount: penaltyCountRef.current });
  }, [qi, answeredUpTo, answers, elapsed, started]);

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    saveProgress({ quiz, started, qi, answeredUpTo, answers, elapsed: initialElapsedRef.current, pendingPenalties: 0, penaltyCount: penaltyCountRef.current, leftDuringExam: false });
    const base = Date.now() - initialElapsedRef.current * 1000;
    baseRef.current = base; startTimeRef.current = base;
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now() - baseRef.current) / 1000)), 1000);
    return () => clearInterval(timerRef.current);
  }, [started]);

  const applyPenalty = () => {
    if (!started || done || prog.finalDone) return;
    baseRef.current = (baseRef.current ?? Date.now()) - PENALTY_SECONDS * 1000;
    penaltyCountRef.current += 1;
    setPenaltyCount(penaltyCountRef.current);
    setPenaltyFlash(true);
    setTimeout(() => setPenaltyFlash(false), 3500);
    const newElapsed = Math.floor((Date.now() - baseRef.current) / 1000);
    setElapsed(newElapsed);
    saveProgress({ quiz, started, qi, answeredUpTo, answers, elapsed: newElapsed, pendingPenalties: 0, penaltyCount: penaltyCountRef.current, leftDuringExam: false });
  };

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    const triggerPenalty = () => {
      if (penaltyCooldownRef.current) return;
      penaltyCooldownRef.current = true;
      applyPenalty();
      setTimeout(() => { penaltyCooldownRef.current = false; }, 3000);
    };
    const onVisibility   = () => { if (document.visibilityState === "hidden") triggerPenalty(); };
    const onBeforeUnload = () => {
      const s = loadProgress();
      if (s) saveProgress({ ...s, pendingPenalties: (s.pendingPenalties ?? 0) + 1, penaltyCount: penaltyCountRef.current + 1, leftDuringExam: true });
    };
    const onPageHide     = () => { const s = loadProgress(); if (s && !s.leftDuringExam) saveProgress({ ...s, leftDuringExam: true }); };
    const onBlur         = () => triggerPenalty();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("blur", onBlur);
    };
  }, [started, done, qi, answeredUpTo, answers]);

  const handleBack = () => {
    if (started && !done && !prog.finalDone) applyPenalty();
    scrollToTop();
    onBack();
  };

  const toggleMulti = (i) => {
    const cur = answers[qi] || [];
    const updated = cur.includes(i) ? cur.filter(x=>x!==i) : cur.length<3 ? [...cur,i] : cur;
    setAnswers(a => ({...a,[qi]:updated}));
  };

  const canConfirm = () => {
    if (q.type==="fitb")  return fitbVal.trim().length > 0;
    if (q.type==="multi") return (answers[qi]||[]).length === 3;
    return sel !== undefined;
  };

  const submitAndNext = () => {
    if (!canConfirm()) return;
    let ans = sel;
    if (q.type==="fitb")  ans = fitbVal;
    if (q.type==="multi") ans = answers[qi];
    const newAnswers = {...answers,[qi]:ans};
    const newUpTo    = qi + 1;
    saveProgress({ quiz, started, qi, answeredUpTo:newUpTo, answers:newAnswers, elapsed, pendingPenalties:0, penaltyCount:penaltyCountRef.current, leftDuringExam:false });
    if (qi+1 >= FINAL_QUIZ.length) {
      const total = quiz.reduce((acc,q,i) => acc+(isCorrect(q,newAnswers[i])?1:0), 0);
      clearInterval(timerRef.current);
      const finalElapsed = Math.floor((Date.now() - baseRef.current) / 1000);
      try { localStorage.setItem("wrm_final_review", JSON.stringify({quiz, answers:newAnswers})); } catch {}
      clearProgress();
      savePending({ score:total, elapsed:finalElapsed, penaltyCount:penaltyCountRef.current });
      setFinalScore(total); setElapsed(finalElapsed);
      update({...prog, finalDone:true, finalScore:total, finalElapsed});
      scrollToTop(); // ← snap to top before result screen
      setDone(true);
    } else {
      setAnswers(newAnswers); setAnsweredUpTo(newUpTo); setQi(i=>i+1); setFitbVal("");
    }
  };

  const handleSaveName = async () => {
    if (!name.trim() || nameLocked) return;
    setSaving(true); setSaveError("");
    try {
      const savedPenaltyCount = pending?.penaltyCount ?? penaltyCountRef.current ?? 0;
      await addDoc(collection(db, "test_score"), {
        name:          name.trim(),
        score:         finalScore,
        total:         TOTAL_ITEMS,
        time_elapsed:  elapsed,
        penalty_count: savedPenaltyCount,
        year:          new Date().getFullYear(),
        timestamp:     new Date().toISOString(),
      });
      clearPending();
      setNameLocked(true);
    } catch { setSaveError("Failed to save. Please try again."); }
    setSaving(false);
  };

  // ── Result screen (done covers all finished states including review key) ──
  if (done) {
    const pct = Math.round((finalScore/TOTAL_ITEMS)*100);
    let reviewData = null;
    try { const r = localStorage.getItem("wrm_final_review"); reviewData = r ? JSON.parse(r) : null; } catch {}
    const displayPenaltyCount = pending?.penaltyCount ?? penaltyCountRef.current ?? 0;
    return (
      <FinalResultScreen
        pct={pct} finalScore={finalScore} elapsed={elapsed}
        penaltyCount={displayPenaltyCount}
        name={name} setName={setName} nameLocked={nameLocked}
        saving={saving} saveError={saveError} handleSaveName={handleSaveName}
        onBack={handleBack} reviewData={reviewData}
      />
    );
  }

  // ── Intro / resume screen ─────────────────────────────────────────────────
  if (!started) {
    const hasResume      = !!saved?.started && !prog.finalDone;
    const savedPenalties = saved?.pendingPenalties ?? 0;
    return (
      <div className="exam-page">
        <div className="inner-wrap fe-intro-wrap">
          <div className="exam-intro-card">
            <div className="fe-intro-emoji">📋</div>
            <div className="fe-official-label">Official Examination</div>
            <h1 className="fe-intro-title">Final Assessment</h1>

            {hasResume && (
              <div className="fe-resume-banner">
                <div className="fe-resume-title">⚠️ Unfinished Exam Detected</div>
                <div className="fe-resume-body">
                  You left during the exam. Your progress was saved automatically.<br />
                  <strong className="fe-resume-strong">Question {(saved.answeredUpTo??0)+1}</strong> of {TOTAL_ITEMS} &nbsp;·&nbsp;
                  <strong className="fe-resume-strong">Time elapsed: {String(Math.floor((saved.elapsed??0)/60)).padStart(2,"0")}:{String((saved.elapsed??0)%60).padStart(2,"0")}</strong>
                </div>
                {savedPenalties > 0 && (
                  <div className="fe-penalty-note">
                    ⏱ <strong>{savedPenalties} × 5-minute {savedPenalties === 1 ? "penalty" : "penalties"}</strong> ({savedPenalties * 5} min total) will be added to your time.
                  </div>
                )}
                <div className="fe-resume-actions">
                  <button className="btn fe-resume-btn" onClick={() => { scrollToTop(); setStarted(true); }}>↩ Resume Exam</button>
                  <button className="btn ghost fe-startover-btn" onClick={() => { clearProgress(); window.location.reload(); }}>🗑 Start Over</button>
                </div>
              </div>
            )}

            {!hasResume && (
              <>
                <p className="fe-intro-sub">Water Resources Management — Comprehensive Exam</p>
                <div className="exam-rules">
                  <div className="exam-rule">📌 <span>This exam has <strong className="fe-strong">{TOTAL_ITEMS} questions</strong> — MC, True/False, Fill in the Blank, Multi-select.</span></div>
                  <div className="exam-rule">⏱️ <span>Answer carefully. You <strong className="fe-strong">cannot go back</strong> to a previous question.</span></div>
                  <div className="exam-rule">🔒 <span>You may only take this exam <strong className="fe-danger">once</strong>.</span></div>
                  <div className="exam-rule">🙈 <span>Questions are in a <strong className="fe-strong">randomized order</strong>. Do not share your screen.</span></div>
                  <div className="exam-rule">✍️ <span>Enter your <strong className="fe-strong">full name</strong> at the end to save your result.</span></div>
                  <div className="exam-rule">💾 <span>Progress is <strong className="fe-strong">auto-saved</strong>. Refreshing or going back won't lose your answers.</span></div>
                  <div className="exam-rule">🚫 <span>Each time you leave, minimize, look-away, or reload, a <strong className="fe-danger">5-minute penalty</strong> is added and <strong className="fe-danger">counted</strong>.</span></div>
                </div>
                <div className="fe-confirm-box">
                  ⚠️ By clicking Start, you confirm your answers are your own and this exam cannot be retaken.
                </div>
                <button className="btn fe-begin-btn" onClick={() => { scrollToTop(); clearProgress(); setStarted(true); }}>Begin Exam →</button>
              </>
            )}
            <button className="back-btn fe-back-spacing" onClick={handleBack}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active exam ───────────────────────────────────────────────────────────
  const typeLabel = { mc:"Multiple Choice", tf:"True or False", fitb:"Fill in the Blank", multi:"Select 3 Correct Answers" };

  return (
    <div className="page">
      <div className="inner-wrap">
        <div className="denr-stripe" />
        {penaltyFlash && (
          <div className="fe-penalty-toast">
            ⚠️ +5 min penalty — look-away #{penaltyCount} recorded
          </div>
        )}

        <div className="mod-header fe-exam-header">
          <div className="mod-icon lg fe-exam-icon">🏆</div>
          <div className="fe-exam-header-body">
            <div className="mod-label fe-exam-label">Final Assessment</div>
            <div className="mod-header-title">Comprehensive Quiz</div>
            <div className="mod-header-sub">Question {qi+1} of {TOTAL_ITEMS}</div>
          </div>
          <div className="fe-timer-wrap">
            <div className="fe-timer">{String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}</div>
            <div className="fe-elapsed-label">ELAPSED</div>
            {penaltyCount > 0 && (
              <div className="fe-penalty-counter">👁 {penaltyCount}×</div>
            )}
          </div>
        </div>

        <div className="fe-progress-bar-wrap">
          <div className="fe-progress-bar" style={{ width:`${(qi/TOTAL_ITEMS)*100}%` }} />
        </div>

        <div className="quiz-box">
          <div className="quiz-label fe-quiz-type-label">{typeLabel[q.type]}</div>
          <div className="quiz-q">{q.q}</div>

          {q.type==="mc" && (
            <div className="options">
              {q.options.map((opt,i) => (
                <button key={i} className={`opt fe-opt${sel===i?" selected":""}`} onClick={() => setAnswers(a=>({...a,[qi]:i}))}>
                  <span className="opt-letter">{["A","B","C","D"][i]}</span>{opt}
                </button>
              ))}
            </div>
          )}

          {q.type==="tf" && (
            <div className="options tf-row">
              {["True","False"].map((label,i) => (
                <button key={i} className={`opt tf fe-opt${sel===i?" selected":""}`} onClick={() => setAnswers(a=>({...a,[qi]:i}))}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {q.type==="fitb" && (
            <div className="fe-fitb-wrap">
              <input className="name-input" type="text" placeholder="Type your answer here..." value={fitbVal} onChange={e=>setFitbVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitAndNext()} />
            </div>
          )}

          {q.type==="multi" && (
            <div className="options">
              {q.options.map((opt,i) => {
                const curSel = answers[qi]||[];
                const isSel  = curSel.includes(i);
                return (
                  <button key={i} className={`opt fe-opt${isSel?" selected":""}`} onClick={() => toggleMulti(i)}>
                    <span className={`opt-letter${isSel?" opt-letter--checked":""}`}>{isSel?"✓":["A","B","C","D","E"][i]}</span>{opt}
                  </button>
                );
              })}
              <div className="fe-multi-count">{(answers[qi]||[]).length}/3 selected</div>
            </div>
          )}

          <button
            className={`btn fe-next-btn${canConfirm()?"":" fe-next-btn--disabled"}`}
            onClick={submitAndNext}
            disabled={!canConfirm()}
          >
            {qi+1<TOTAL_ITEMS?"Next Question →":"See Results →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FinalResultScreen ─────────────────────────────────────────────────────────
function FinalResultScreen({ pct, finalScore, elapsed, penaltyCount, name, setName, nameLocked, saving, saveError, handleSaveName, onBack, reviewData }) {
  const [showReview, setShowReview] = useState(false);
  const typeLabel = { mc:"MC", tf:"T/F", fitb:"Fill in Blank", multi:"Multi-select" };

  const getAnswerText = (q,a) => {
    if (q.type==="mc")    return a!==undefined ? q.options[a] : "—";
    if (q.type==="tf")    return a===0?"True":a===1?"False":"—";
    if (q.type==="fitb")  return typeof a==="string" ? a : "—";
    if (q.type==="multi") return Array.isArray(a) ? a.map(i=>q.options[i]).join(", ") : "—";
    return "—";
  };
  const getCorrectText = (q) => {
    if (q.type==="mc")    return q.options[q.answer];
    if (q.type==="tf")    return q.answer?"True":"False";
    if (q.type==="fitb")  return Array.isArray(q.answer)?q.answer[0]:q.answer;
    if (q.type==="multi") return q.answer.map(i=>q.options[i]).join(", ");
    return "—";
  };

  const scoreColor = pct>=80?"#34d399":pct>=60?"#fbbf24":"#f87171";

  return (
    <div className="page">
      <div className="inner-wrap">
        <div className="done-box fe-result-box">
          <div className="fe-result-emoji">{pct>=80?"🏆":pct>=60?"🌊":"📚"}</div>
          <div className="done-title">Assessment Complete!</div>
          <div className="done-score" style={{ color:scoreColor }}>
            {finalScore}<span className="fe-score-denom">/{TOTAL_ITEMS}</span>
          </div>
          <div className="done-sub fe-result-sub">{pct}% — {pct>=80?"Excellent!":pct>=60?"Good Job!":"Keep Studying!"}</div>
          <div className="fe-time-display">
            ⏱ Time: {String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}
          </div>
          {penaltyCount > 0 && (
            <div className="fe-result-penalty">
              👁 Look-away penalties: <strong>{penaltyCount}</strong>
            </div>
          )}

          <div className="fe-name-box">
            <div className="fe-name-label">📝 Enter your full name to save your result</div>
            {!nameLocked ? (
              <>
                <div className="fe-name-warn">⚠️ Warning: Once submitted, your name cannot be changed.</div>
                <div className="fe-name-row">
                  <input className="name-input" type="text" placeholder="Enter your full name..." value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSaveName()} />
                  <button
                    className={`btn fe-submit-btn${name.trim()?" fe-submit-btn--active":""}`}
                    onClick={handleSaveName}
                    disabled={saving||!name.trim()}
                  >
                    {saving?"Saving...":"Submit"}
                  </button>
                </div>
                {saveError && <div className="fe-save-error">{saveError}</div>}
              </>
            ) : (
              <div className="fe-saved-msg">
                ✓ Score already saved to the database.{name && <span> Saved as <strong>{name}</strong>.</span>}
              </div>
            )}
          </div>

          {reviewData && (
            <button className="btn ghost fe-review-toggle" onClick={() => setShowReview(r=>!r)}>
              {showReview?"▲ Hide Answer Review":"▼ Review My Answers"}
            </button>
          )}
          <button className="btn fe-home-btn" onClick={onBack}>← Back to Home</button>
        </div>

        {showReview && reviewData && (
          <div className="fe-review-list">
            <div className="fe-review-label">Answer Review</div>
            {reviewData.quiz.map((q,i) => {
              const a       = reviewData.answers[i];
              const correct = isCorrect(q,a);
              return (
                <div key={i} className={`fe-review-item ${correct?"correct":"wrong"}`}>
                  <div className="fe-review-header">
                    <span className="fe-review-emoji">{correct?"✅":"❌"}</span>
                    <div className="fe-review-qwrap">
                      <div className="fe-review-type">Q{i+1} · {typeLabel[q.type]}</div>
                      <div className="fe-review-q">{q.q}</div>
                    </div>
                  </div>
                  <div className="fe-review-answers" style={{ gridTemplateColumns:correct?"1fr":"1fr 1fr" }}>
                    <div className={`fe-review-cell ${correct?"correct":"wrong"}`}>
                      <div className="fe-review-cell-label">Your Answer</div>
                      <div className="fe-review-cell-value">{getAnswerText(q,a)}</div>
                    </div>
                    {!correct && (
                      <div className="fe-review-cell correct">
                        <div className="fe-review-cell-label">Correct Answer</div>
                        <div className="fe-review-cell-value">{getCorrectText(q)}</div>
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
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchResults = async () => {
    setLoading(true); setError("");
    try {
      const q    = query(collection(db, "test_score"), orderBy("score", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs
        .map(d => ({id:d.id, ...d.data()}))
        .map(r => ({...r, _year: r.year ?? (r.timestamp ? new Date(r.timestamp).getFullYear() : null)}))
        .sort((a,b) => b.score!==a.score ? b.score-a.score : (a.time_elapsed??99999)-(b.time_elapsed??99999));
      setAllResults(data);
    } catch { setError("Could not load results. Check your connection."); }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const years   = [...new Set(allResults.map(r=>r._year).filter(Boolean))].sort((a,b)=>b-a);
  const results = allResults.filter(r=>r._year===selectedYear);
  const medals  = ["🥇","🥈","🥉"];

  const handleBack = () => { scrollToTop(); onBack(); };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={handleBack}>← Back to Home</button>

        <div className="mod-header fe-lb-header">
          <div className="mod-icon lg fe-lb-icon">📊</div>
          <div className="fe-lb-header-body">
            <div className="mod-label fe-lb-label">Student Results</div>
            <div className="mod-header-title">Leaderboard</div>
            <div className="mod-header-sub">
              {loading ? "Loading..." : `${results.length} submission${results.length!==1?"s":""} in ${selectedYear}`}
            </div>
          </div>
          <button className="btn ghost fe-refresh-btn" onClick={fetchResults} disabled={loading}>
            {loading ? "⏳" : "↺ Refresh"}
          </button>
        </div>

        {!loading && years.length > 0 && (
          <div className="fe-year-pills">
            <span className="fe-year-label">Year:</span>
            {years.map(y => (
              <button key={y} className={`fe-year-pill${selectedYear===y?" active":""}`} onClick={() => setSelectedYear(y)}>
                {y}{y===currentYear?" ★":""}
              </button>
            ))}
          </div>
        )}

        {loading  && <div className="fe-status-msg">Loading results...</div>}
        {error    && <div className="fe-error-msg">{error}</div>}
        {!loading && !error && results.length===0 && <div className="fe-status-msg">No submissions for {selectedYear}.</div>}

        {!loading && results.length>0 && (
          <div className="fe-lb-list">
            {results.map((r,i) => {
              const pct = Math.round((r.score/(r.total||TOTAL_ITEMS))*100);
              const pc  = r.penalty_count ?? 0;
              return (
                <div key={r.id} className={`fe-lb-row${i<3?" top":""}`}>
                  <div className="fe-lb-rank">{i<3?medals[i]:`${i+1}`}</div>
                  <div className="fe-lb-info">
                    <div className="fe-lb-name">{r.name}</div>
                    <div className="fe-lb-sub">{r._year}</div>
                  </div>
                  <div className="fe-lb-scores">
                    <div className="fe-lb-score" style={{ color:pct>=80?"#34d399":pct>=60?"#fbbf24":"#f87171" }}>
                      {r.score}<span className="fe-lb-total">/{r.total||TOTAL_ITEMS}</span>
                    </div>
                    <div className="fe-lb-pct">{pct}%</div>
                    {r.time_elapsed!=null && (
                      <div className="fe-lb-time">⏱ {String(Math.floor(r.time_elapsed/60)).padStart(2,"0")}:{String(r.time_elapsed%60).padStart(2,"0")}</div>
                    )}
                    <div className={`fe-lb-penalty${pc>0?" flagged":""}`}>
                      👁 {pc} {pc===1?"penalty":"penalties"}
                    </div>
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