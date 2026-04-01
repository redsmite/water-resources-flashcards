// ── flashcard/Flashcard.jsx ───────────────────────────────────────────────────
import { useState, useCallback } from "react";
import { FLASHCARDS } from "../data.js";
import "../global.css";
import "./flashcard.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

export function FlashcardsView({ onBack }) {
  const [deck, setDeck]       = useState(() => shuffle(FLASHCARDS));
  const [index, setIndex]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown]     = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [done, setDone]       = useState(false);

  const card    = deck[index];
  const total   = deck.length;
  const progress = (index / total) * 100;

  const goNext = useCallback((mark) => {
    setFlipped(false);
    if (mark==="know")   setKnown(s => new Set([...s, deck[index].q]));
    if (mark==="review") setUnknown(s => new Set([...s, deck[index].q]));
    if (index+1 >= total) { setDone(true); }
    else { setTimeout(() => setIndex(i => i+1), 120); }
  }, [deck, index, total]);

  const restart = (onlyUnknown = false) => {
    const newDeck = onlyUnknown ? shuffle(FLASHCARDS.filter(c => unknown.has(c.q))) : shuffle(FLASHCARDS);
    setDeck(newDeck.length ? newDeck : shuffle(FLASHCARDS));
    setIndex(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setDone(false);
  };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>

        <div className="mod-header" style={{ borderColor:"#a78bfa33" }}>
          <div className="mod-icon lg" style={{ background:"#a78bfa22",color:"#a78bfa" }}>🃏</div>
          <div>
            <div className="mod-label" style={{ color:"#a78bfa" }}>Flashcard Review</div>
            <div className="mod-header-title">Study All Modules</div>
            <div className="mod-header-sub">{FLASHCARDS.length} cards · tap card to flip</div>
          </div>
        </div>

        {!done ? (
          <>
            {/* Progress bar */}
            <div className="fc-progress-wrap">
              <div className="fc-progress-meta">
                <span className="fc-progress-card">Card {index+1} of {total}</span>
                <span className="fc-progress-known">✓ {known.size} known</span>
              </div>
              <div className="fc-progress-track">
                <div className="fc-progress-fill" style={{ width:`${progress}%` }} />
              </div>
            </div>

            {/* Flip card */}
            <div className="fc-card-wrap" onClick={() => setFlipped(f => !f)}>
              <div className={`fc-inner ${flipped?"flipped":""}`}>
                <div className="fc-face fc-front">
                  <div className="fc-label-q">Question</div>
                  <p className="fc-question-text">{card.q}</p>
                  <div className="fc-hint">tap to reveal</div>
                </div>
                <div className="fc-face fc-back">
                  <div className="fc-label-a">Answer</div>
                  <p className="fc-answer-text">{card.a}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex",gap:10,marginTop:16 }}>
              {flipped ? (
                <>
                  <button className="btn ghost fc-action"
                    style={{ flex:1,color:"#f87171",borderColor:"rgba(248,113,113,0.3)",background:"rgba(248,113,113,0.08)" }}
                    onClick={() => goNext("review")}>✗ Still Learning</button>
                  <button className="btn ghost fc-action"
                    style={{ flex:1,color:"#34d399",borderColor:"rgba(52,211,153,0.3)",background:"rgba(52,211,153,0.08)" }}
                    onClick={() => goNext("know")}>✓ Got It</button>
                </>
              ) : (
                <button className="btn ghost fc-action"
                  style={{ flex:1,color:"#818cf8",borderColor:"rgba(129,140,248,0.3)" }}
                  onClick={() => setFlipped(true)}>Flip Card</button>
              )}
            </div>
          </>
        ) : (
          <div className="done-box">
            <div style={{ fontSize:44,marginBottom:12 }}>{known.size/total>=0.8?"🌊":known.size/total>=0.5?"💧":"📚"}</div>
            <div className="done-title">Round Complete!</div>
            <div className="fc-done-stats">
              <div className="fc-done-stat">
                <div style={{ fontSize:28,fontWeight:800,color:"#34d399" }}>{known.size}</div>
                <div className="fc-done-stat-label">Got It</div>
              </div>
              <div className="fc-done-stat">
                <div style={{ fontSize:28,fontWeight:800,color:"#f87171" }}>{unknown.size}</div>
                <div className="fc-done-stat-label">Learning</div>
              </div>
              <div className="fc-done-stat">
                <div style={{ fontSize:28,fontWeight:800,color:"#a78bfa" }}>{Math.round((known.size/total)*100)}%</div>
                <div className="fc-done-stat-label">Score</div>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {unknown.size>0 && (
                <button className="btn ghost fc-action"
                  style={{ color:"#fbbf24",borderColor:"rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.08)" }}
                  onClick={() => restart(true)}>↺ Review Missed ({unknown.size})</button>
              )}
              <button className="btn ghost fc-action"
                style={{ color:"#a78bfa",borderColor:"rgba(167,139,250,0.3)" }}
                onClick={() => restart(false)}>↺ Restart All Cards</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}