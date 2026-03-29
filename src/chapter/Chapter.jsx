// ── chapter/chapter.jsx ───────────────────────────────────────────────────────
import { useState } from "react";
import "../global.css";
import "./chapter.css";

export function ModuleView({ mod, prog, update, onBack }) {
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
      update({
        ...prog,
        completed: { ...prog.completed, [mod.id]: true },
        scores: { ...prog.scores, [mod.id]: score },
      });
      setDone(true);
    } else {
      setQi(i => i + 1);
      setSel(null);
      setConfirmed(false);
    }
  };

  // Render a content line with callout styling
  const renderLine = (line, i) => {
    let color = "#cbd5e1";
    if (line.startsWith("•") || line.startsWith("–")) color = "#94a3b8";
    if (line.startsWith("❓")) color = "#38bdf8";
    if (line.startsWith("📌")) color = "#fbbf24";
    if (line.startsWith("⚖️")) color = "#a78bfa";
    if (line.startsWith("💡")) color = "#34d399";
    return (
      <p key={i} style={{ marginBottom: line ? 8 : 4, color }}>
        {line || <br />}
      </p>
    );
  };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Modules</button>

        {/* Module header */}
        <div className="mod-header" style={{ borderColor: mod.color + "33" }}>
          <div className="mod-icon lg" style={{ background: mod.color + "22", color: mod.color }}>
            {mod.icon}
          </div>
          <div>
            <div className="mod-label" style={{ color: mod.color }}>Module {mod.id}</div>
            <div className="mod-header-title">{mod.title}</div>
            <div className="mod-header-sub">{mod.subtitle}</div>
          </div>
        </div>

        {/* ── LEARN PHASE ── */}
        {phase === "learn" && (
          <>
            <div className="tabs">
              {mod.chapters.map((c, i) => (
                <button
                  key={i}
                  className={`tab ${ch === i ? "active" : ""}`}
                  style={{ "--c": mod.color }}
                  onClick={() => { setCh(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  {i + 1}. {c.title}
                </button>
              ))}
            </div>

            <div className="content-card">
              <h2 className="content-title">{mod.chapters[ch].title}</h2>
              <div className="content-body">
                {mod.chapters[ch].content.split("\n").map(renderLine)}
              </div>
            </div>

            <div className="nav-row">
              {ch > 0 && (
                <button className="btn ghost" onClick={() => setCh(c => c - 1)}>← Previous</button>
              )}
              {ch < mod.chapters.length - 1 ? (
                <button
                  className="btn"
                  style={{ "--c": mod.color, background: mod.color + "22", color: mod.color, borderColor: mod.color + "55" }}
                  onClick={() => setCh(c => c + 1)}
                >
                  Next →
                </button>
              ) : (
                <button
                  className="btn primary"
                  style={{ background: mod.color, color: "#0f172a" }}
                  onClick={() => setPhase("quiz")}
                >
                  Take Mini Quiz →
                </button>
              )}
            </div>
          </>
        )}

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && !done && (
          <div className="quiz-box">
            <div className="quiz-label" style={{ color: mod.color }}>
              Mini Quiz — {qi + 1} of {mod.quiz.length}
            </div>
            <div className="quiz-q">{q.q}</div>

            <div className="options">
              {q.options.map((opt, i) => {
                let cls = "opt";
                if (confirmed) {
                  if (i === q.answer) cls += " correct";
                  else if (i === sel) cls += " wrong";
                } else if (sel === i) cls += " selected";
                return (
                  <button
                    key={i}
                    className={cls}
                    style={{ "--c": mod.color }}
                    onClick={() => !confirmed && setSel(i)}
                  >
                    <span className="opt-letter">{["A","B","C","D"][i]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {confirmed && (
              <div className={`feedback ${sel === q.answer ? "correct" : "wrong"}`}>
                {sel === q.answer
                  ? "✓ Correct!"
                  : `✗ Correct answer: ${q.options[q.answer]}`}
              </div>
            )}

            {!confirmed ? (
              <button
                className="btn primary"
                style={{ background: sel !== null ? mod.color : "rgba(255,255,255,0.05)", color: sel !== null ? "#0f172a" : "#475569" }}
                onClick={confirm}
              >
                Check Answer
              </button>
            ) : (
              <button
                className="btn primary"
                style={{ background: mod.color, color: "#0f172a" }}
                onClick={next}
              >
                {qi + 1 < mod.quiz.length ? "Next Question →" : "Finish →"}
              </button>
            )}
          </div>
        )}

        {/* ── DONE ── */}
        {done && (
          <div className="done-box">
            <div style={{ fontSize: 44, marginBottom: 12 }}>
              {prog.scores[mod.id] === mod.quiz.length ? "🌊" : "💧"}
            </div>
            <div className="done-title">Module Complete!</div>
            <div className="done-score" style={{ color: mod.color }}>
              {prog.scores[mod.id]}/{mod.quiz.length}
            </div>
            <div className="done-sub">Quiz Score</div>
            <button
              className="btn primary"
              style={{ background: mod.color, color: "#0f172a", marginTop: 24 }}
              onClick={onBack}
            >
              ← Back to Modules
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
