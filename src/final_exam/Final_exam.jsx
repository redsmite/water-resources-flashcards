// ── final_exam/Final_exam.jsx ─────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { FINAL_QUIZ, TOTAL_ITEMS } from "../data.js";
import "../global.css";
import "./final_exam.css";

const PROGRESS_KEY    = "wrm_exam_progress";
const PENDING_KEY     = "wrm_pending_save";
const PENALTY_SECONDS = 60;

function saveProgress(state) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(state)); } catch {} }
function loadProgress() { try { const r = localStorage.getItem(PROGRESS_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function clearProgress() { try { localStorage.removeItem(PROGRESS_KEY); } catch {} }
function savePending(data) { try { localStorage.setItem(PENDING_KEY, JSON.stringify(data)); } catch {} }
function loadPending() { try { const r = localStorage.getItem(PENDING_KEY); return r ? JSON.parse(r) : null; } catch { return null; } }
function clearPending() { try { localStorage.removeItem(PENDING_KEY); } catch {} }
function nameAlreadySaved() { try { return !localStorage.getItem(PENDING_KEY); } catch { return false; } }

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
  if (q.type==="mc") return a === q.answer;
  if (q.type==="tf") return a === (q.answer ? 0 : 1);
  if (q.type==="fitb") { if (typeof a !== "string") return false; const na=normalizeFitb(a); const acc=Array.isArray(q.answer)?q.answer:q.answer.split("|"); return acc.some(x=>normalizeFitb(x)===na); }
  if (q.type==="multi") { if (!Array.isArray(a)) return false; return [...a].sort().join(",")===([...q.answer].sort().join(",")); }
  return false;
}

// ── FinalQuizView ─────────────────────────────────────────────────────────────
export function FinalQuizView({ prog, update, onBack, db }) {
  const saved = loadProgress();
  const [quiz] = useState(() => saved?.quiz ?? shuffle(FINAL_QUIZ.map(shuffleQuestion)));
  const [started, setStarted] = useState(() => saved?.started ?? false);
  const [answeredUpTo, setAnsweredUpTo] = useState(() => saved?.answeredUpTo ?? 0);
  const [qi, setQi]     = useState(() => saved?.answeredUpTo ?? 0);
  const [answers, setAnswers] = useState(() => saved?.answers ?? {});
  const [fitbVal, setFitbVal] = useState("");

  const pending = loadPending();
  const [done, setDone]           = useState(() => !!prog.finalDone || !!pending);
  const [finalScore, setFinalScore] = useState(() => prog.finalScore ?? pending?.score ?? 0);

  const penaltyWasApplied = useRef(!!(saved?.leftDuringExam));
  const initialElapsedRef = useRef((() => {
    const rawBase = saved?.elapsed ?? prog.finalElapsed ?? pending?.elapsed ?? 0;
    return penaltyWasApplied.current ? rawBase + PENALTY_SECONDS : rawBase;
  })());

  const [elapsed, setElapsed] = useState(() => initialElapsedRef.current);
  const startTimeRef = useRef(null);
  const timerRef     = useRef(null);

  const [name, setName]           = useState("");
  const [nameLocked, setNameLocked] = useState(() => (!!prog.finalDone || !!pending) && nameAlreadySaved());
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState("");

  const q   = quiz[qi];
  const sel = answers[qi];

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    saveProgress({ quiz, started, qi, answeredUpTo, answers, elapsed });
  }, [qi, answeredUpTo, answers, elapsed, started]);

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    saveProgress({ quiz, started, qi, answeredUpTo, answers, elapsed:initialElapsedRef.current, leftDuringExam:false });
    const base = Date.now() - initialElapsedRef.current * 1000;
    startTimeRef.current = base;
    timerRef.current = setInterval(() => setElapsed(Math.floor((Date.now()-base)/1000)), 1000);
    return () => clearInterval(timerRef.current);
  }, [started]);

  const markLeft = () => { const s=loadProgress(); if (s && !s.leftDuringExam) saveProgress({...s,leftDuringExam:true}); };

  useEffect(() => {
    if (!started || done || prog.finalDone) return;
    const onVis = () => { if (document.visibilityState==="hidden") markLeft(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", markLeft);
    return () => { document.removeEventListener("visibilitychange",onVis); window.removeEventListener("pagehide",markLeft); };
  }, [started, done]);

  const handleBack = () => { if (started && !done && !prog.finalDone) markLeft(); onBack(); };

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
    const newUpTo = qi+1;
    saveProgress({quiz,started,qi,answeredUpTo:newUpTo,answers:newAnswers,elapsed,leftDuringExam:false});
    if (qi+1 >= FINAL_QUIZ.length) {
      const total = quiz.reduce((acc,q,i) => acc+(isCorrect(q,newAnswers[i])?1:0),0);
      clearInterval(timerRef.current);
      const finalElapsed = Math.floor((Date.now()-startTimeRef.current)/1000);
      try { localStorage.setItem("wrm_final_review",JSON.stringify({quiz,answers:newAnswers})); } catch {}
      clearProgress();
      savePending({score:total,elapsed:finalElapsed});
      setFinalScore(total); setElapsed(finalElapsed);
      update({...prog,finalDone:true,finalScore:total,finalElapsed});
      setDone(true);
    } else {
      setAnswers(newAnswers); setAnsweredUpTo(newUpTo); setQi(i=>i+1); setFitbVal("");
    }
  };

  const handleSaveName = async () => {
    if (!name.trim() || nameLocked) return;
    setSaving(true); setSaveError("");
    try {
      await addDoc(collection(db,"test_score"), { name:name.trim(), score:finalScore, total:TOTAL_ITEMS, time_elapsed:elapsed, year:new Date().getFullYear(), timestamp:new Date().toISOString() });
      clearPending(); setNameLocked(true);
    } catch { setSaveError("Failed to save. Please try again."); }
    setSaving(false);
  };

  // ── Intro / resume screen ─────────────────────────────────────────────────
  if (!started) {
    const hasResume = !!saved?.started && !prog.finalDone;
    return (
      <div className="exam-page">
        <div className="inner-wrap" style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",paddingTop:0 }}>
          <div className="exam-intro-card">
            <div style={{ fontSize:52,marginBottom:16 }}>📋</div>
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
                <div className="fe-penalty-note">
                  ⏱ Note: A <strong>1-minute time penalty</strong> will be added for leaving the exam screen.
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  <button className="btn primary" style={{ flex:1,background:"#fbbf24",color:"#0f172a",fontSize:13,padding:"10px" }} onClick={() => setStarted(true)}>↩ Resume Exam</button>
                  <button className="btn ghost"   style={{ flex:1,fontSize:13,padding:"10px" }} onClick={() => { clearProgress(); window.location.reload(); }}>🗑 Start Over</button>
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
                  <div className="exam-rule">🚫 <span>Leaving the exam screen mid-exam adds a <strong className="fe-danger">1-minute time penalty</strong>.</span></div>
                </div>
                <div className="fe-confirm-box">
                  ⚠️ By clicking Start, you confirm your answers are your own and this exam cannot be retaken.
                </div>
                <button className="btn primary" style={{ background:"#f87171",color:"#fff",width:"100%",padding:"14px",fontSize:16 }} onClick={() => { clearProgress(); setStarted(true); }}>Begin Exam →</button>
              </>
            )}
            <button className="back-btn" style={{ marginTop:14,padding:0 }} onClick={handleBack}>← Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Results screen ────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((finalScore/TOTAL_ITEMS)*100);
    let reviewData = null;
    try { const r = localStorage.getItem("wrm_final_review"); reviewData = r ? JSON.parse(r) : null; } catch {}
    return <FinalResultScreen pct={pct} finalScore={finalScore} elapsed={elapsed} name={name} setName={setName} nameLocked={nameLocked} saving={saving} saveError={saveError} handleSaveName={handleSaveName} onBack={onBack} reviewData={reviewData} />;
  }

  // ── Active exam ───────────────────────────────────────────────────────────
  const typeLabel = { mc:"Multiple Choice", tf:"True or False", fitb:"Fill in the Blank", multi:"Select 3 Correct Answers" };

  return (
    <div className="page">
      <div className="inner-wrap">
        <div className="denr-stripe" />
        <button className="back-btn" onClick={handleBack}>← Back to Home</button>

        <div className="mod-header" style={{ borderColor:"#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background:"#fbbf2422",color:"#fbbf24" }}>🏆</div>
          <div style={{ flex:1 }}>
            <div className="mod-label" style={{ color:"#fbbf24" }}>Final Assessment</div>
            <div className="mod-header-title">Comprehensive Quiz</div>
            <div className="mod-header-sub">Question {qi+1} of {TOTAL_ITEMS}</div>
          </div>
          <div style={{ textAlign:"right",flexShrink:0 }}>
            <div style={{ fontSize:18,fontWeight:800,color:"#fbbf24",fontVariantNumeric:"tabular-nums" }}>
              {String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}
            </div>
            <div className="fe-elapsed-label">ELAPSED</div>
          </div>
        </div>

        <div className="fe-progress-bar-wrap">
          <div className="fe-progress-bar" style={{ width:`${(qi/TOTAL_ITEMS)*100}%` }} />
        </div>

        <div className="quiz-box">
          <div className="quiz-label" style={{ color:"#fbbf24" }}>{typeLabel[q.type]}</div>
          <div className="quiz-q">{q.q}</div>

          {q.type==="mc" && (
            <div className="options">
              {q.options.map((opt,i) => (
                <button key={i} className={`opt${sel===i?" selected":""}`} style={{ "--c":"#fbbf24" }} onClick={() => setAnswers(a=>({...a,[qi]:i}))}>
                  <span className="opt-letter">{["A","B","C","D"][i]}</span>{opt}
                </button>
              ))}
            </div>
          )}

          {q.type==="tf" && (
            <div className="options tf-row">
              {["True","False"].map((label,i) => (
                <button key={i} className={`opt tf${sel===i?" selected":""}`} style={{ "--c":"#fbbf24" }} onClick={() => setAnswers(a=>({...a,[qi]:i}))}>
                  {label}
                </button>
              ))}
            </div>
          )}

          {q.type==="fitb" && (
            <div style={{ marginBottom:18 }}>
              <input className="name-input" type="text" placeholder="Type your answer here..." value={fitbVal} onChange={e=>setFitbVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submitAndNext()} />
            </div>
          )}

          {q.type==="multi" && (
            <div className="options">
              {q.options.map((opt,i) => {
                const curSel = answers[qi]||[];
                const isSel  = curSel.includes(i);
                return (
                  <button key={i} className={`opt${isSel?" selected":""}`} style={{ "--c":"#fbbf24" }} onClick={() => toggleMulti(i)}>
                    <span className="opt-letter" style={{ background:isSel?"#fbbf2433":undefined }}>{isSel?"✓":["A","B","C","D","E"][i]}</span>{opt}
                  </button>
                );
              })}
              <div className="fe-multi-count">{(answers[qi]||[]).length}/3 selected</div>
            </div>
          )}

          <button className="btn primary fe-next-btn"
            style={{ background:canConfirm()?"#fbbf24":"rgba(255,255,255,0.05)", color:canConfirm()?"#0f172a":"#475569", width:"100%" }}
            onClick={submitAndNext}>
            {qi+1<TOTAL_ITEMS?"Next Question →":"See Results →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── FinalResultScreen ─────────────────────────────────────────────────────────
function FinalResultScreen({ pct, finalScore, elapsed, name, setName, nameLocked, saving, saveError, handleSaveName, onBack, reviewData }) {
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
        <div className="done-box" style={{ marginTop:32 }}>
          <div style={{ fontSize:52,marginBottom:12 }}>{pct>=80?"🏆":pct>=60?"🌊":"📚"}</div>
          <div className="done-title">Assessment Complete!</div>
          <div className="done-score" style={{ color:scoreColor }}>
            {finalScore}<span className="fe-score-denom">/{TOTAL_ITEMS}</span>
          </div>
          <div className="done-sub" style={{ marginBottom:8 }}>{pct}% — {pct>=80?"Excellent!":pct>=60?"Good Job!":"Keep Studying!"}</div>
          <div className="fe-time-display">
            ⏱ Time: {String(Math.floor(elapsed/60)).padStart(2,"0")}:{String(elapsed%60).padStart(2,"0")}
          </div>

          {/* Name submission box */}
          <div className="fe-name-box">
            <div className="fe-name-label">📝 Enter your full name to save your result</div>
            {!nameLocked ? (
              <>
                <div className="fe-name-warn">⚠️ Warning: Once submitted, your name cannot be changed.</div>
                <div style={{ display:"flex",gap:8 }}>
                  <input className="name-input" type="text" placeholder="Enter your full name..." value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSaveName()} />
                  <button className="btn primary"
                    style={{ background:name.trim()?"#34d399":"rgba(255,255,255,0.05)", color:name.trim()?"#0f172a":"#475569", whiteSpace:"nowrap",padding:"11px 16px" }}
                    onClick={handleSaveName} disabled={saving||!name.trim()}>
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
            <button className="btn ghost" style={{ width:"100%",marginBottom:10,color:"#818cf8",borderColor:"rgba(129,140,248,0.3)",background:"rgba(129,140,248,0.06)" }} onClick={() => setShowReview(r=>!r)}>
              {showReview?"▲ Hide Answer Review":"▼ Review My Answers"}
            </button>
          )}
          <button className="btn primary" style={{ background:"#fbbf24",color:"#0f172a",width:"100%" }} onClick={onBack}>← Back to Home</button>
        </div>

        {showReview && reviewData && (
          <div style={{ marginTop:20,display:"flex",flexDirection:"column",gap:10 }}>
            <div className="fe-review-label">Answer Review</div>
            {reviewData.quiz.map((q,i) => {
              const a = reviewData.answers[i];
              const correct = isCorrect(q,a);
              return (
                <div key={i} className={`fe-review-item ${correct?"correct":"wrong"}`}>
                  <div className="fe-review-header">
                    <span style={{ fontSize:16,flexShrink:0 }}>{correct?"✅":"❌"}</span>
                    <div style={{ flex:1 }}>
                      <div className="fe-review-type">Q{i+1} · {typeLabel[q.type]}</div>
                      <div className="fe-review-q">{q.q}</div>
                    </div>
                  </div>
                  <div className="fe-review-answers" style={{ gridTemplateColumns:correct?"1fr":"1fr 1fr" }}>
                    <div className={`fe-review-cell ${correct?"correct":"wrong"}`}>
                      <div className="fe-review-cell-label">{correct?"Your Answer":"Your Answer"}</div>
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
      const q = query(collection(db,"test_score"), orderBy("score","desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map(d=>({id:d.id,...d.data()})).map(r=>({...r,_year:r.year??(r.timestamp?new Date(r.timestamp).getFullYear():null)}))
        .sort((a,b) => b.score!==a.score ? b.score-a.score : (a.time_elapsed??99999)-(b.time_elapsed??99999));
      setAllResults(data);
    } catch { setError("Could not load results. Check your connection."); }
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const years   = [...new Set(allResults.map(r=>r._year).filter(Boolean))].sort((a,b)=>b-a);
  const results = allResults.filter(r=>r._year===selectedYear);
  const medals  = ["🥇","🥈","🥉"];

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        <div className="mod-header" style={{ borderColor:"#fbbf2433" }}>
          <div className="mod-icon lg" style={{ background:"#fbbf2422",color:"#fbbf24" }}>📊</div>
          <div style={{ flex:1 }}>
            <div className="mod-label" style={{ color:"#fbbf24" }}>Student Results</div>
            <div className="mod-header-title">Leaderboard</div>
            <div className="mod-header-sub">{loading?"Loading...":`${results.length} submission${results.length!==1?"s":""} in ${selectedYear}`}</div>
          </div>
          <button className="btn ghost" style={{ padding:"8px 14px",fontSize:13,flexShrink:0 }} onClick={fetchResults} disabled={loading}>
            {loading?"⏳":"↺ Refresh"}
          </button>
        </div>

        {/* Year pills */}
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
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {results.map((r,i) => {
              const pct = Math.round((r.score/(r.total||TOTAL_ITEMS))*100);
              return (
                <div key={r.id} className={`fe-lb-row${i<3?" top":""}`}>
                  <div className="fe-lb-rank">{i<3?medals[i]:`${i+1}`}</div>
                  <div style={{ flex:1 }}>
                    <div className="fe-lb-name">{r.name}</div>
                    <div className="fe-lb-sub">{r._year}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div className="fe-lb-score" style={{ color:pct>=80?"#34d399":pct>=60?"#fbbf24":"#f87171" }}>
                      {r.score}<span className="fe-lb-total">/{r.total||TOTAL_ITEMS}</span>
                    </div>
                    <div className="fe-lb-pct">{pct}%</div>
                    {r.time_elapsed!=null && <div className="fe-lb-time">⏱ {String(Math.floor(r.time_elapsed/60)).padStart(2,"0")}:{String(r.time_elapsed%60).padStart(2,"0")}</div>}
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