// ── flashcard/flashcard.jsx ───────────────────────────────────────────────────
import { useState, useCallback } from "react";
import { FLASHCARDS } from "../data.js";
import "../global.css";
import "./flashcard.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardsView({ onBack }) {
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
    if (mark === "know")   setKnown(s => new Set([...s, deck[index].q]));
    if (mark === "review") setUnknown(s => new Set([...s, deck[index].q]));
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setTimeout(() => setIndex(i => i + 1), 120);
    }
  }, [deck, index, total]);

  const restart = (onlyUnknown = false) => {
    const newDeck = onlyUnknown
      ? shuffle(FLASHCARDS.filter(c => unknown.has(c.q)))
      : shuffle(FLASHCARDS);
    setDeck(newDeck.length ? newDeck : shuffle(FLASHCARDS));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
  };

  return (
    <div className="page">
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
            {/* Progress bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                <span style={{ color: "#94a3b8" }}>Card {index + 1} of {total}</span>
                <span style={{ color: "#34d399" }}>✓ {known.size} known</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#818cf8,#a78bfa)", borderRadius: 2, transition: "width 0.4s ease" }} />
              </div>
            </div>

            {/* Flip card */}
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

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {flipped ? (
                <>
                  <button className="btn ghost fc-action"
                    style={{ flex: 1, color: "#f87171", borderColor: "rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)" }}
                    onClick={() => goNext("review")}>
                    ✗ Still Learning
                  </button>
                  <button className="btn ghost fc-action"
                    style={{ flex: 1, color: "#34d399", borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)" }}
                    onClick={() => goNext("know")}>
                    ✓ Got It
                  </button>
                </>
              ) : (
                <button className="btn ghost fc-action"
                  style={{ flex: 1, color: "#818cf8", borderColor: "rgba(129,140,248,0.3)" }}
                  onClick={() => setFlipped(true)}>
                  Flip Card
                </button>
              )}
            </div>
          </>
        ) : (
          /* Done screen */
          <div className="done-box">
            <div style={{ fontSize: 44, marginBottom: 12 }}>
              {known.size / total >= 0.8 ? "🌊" : known.size / total >= 0.5 ? "💧" : "📚"}
            </div>
            <div className="done-title">Round Complete!</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, margin: "20px 0" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#34d399" }}>{known.size}</div>
                <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Got It</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#f87171" }}>{unknown.size}</div>
                <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Learning</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa" }}>{Math.round((known.size / total) * 100)}%</div>
                <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Score</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {unknown.size > 0 && (
                <button className="btn ghost fc-action"
                  style={{ color: "#fbbf24", borderColor: "rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)" }}
                  onClick={() => restart(true)}>
                  ↺ Review Missed ({unknown.size})
                </button>
              )}
              <button className="btn ghost fc-action"
                style={{ color: "#a78bfa", borderColor: "rgba(167,139,250,0.3)" }}
                onClick={() => restart(false)}>
                ↺ Restart All Cards
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
