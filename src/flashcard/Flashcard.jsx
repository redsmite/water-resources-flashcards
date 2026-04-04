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
  const [noAnim, setNoAnim] = useState(false);

  const card     = deck[index];
  const total    = deck.length;
  const progress = (index / total) * 100;

  const goNext = useCallback((mark) => {
    // mark current card
    if (mark === "know") {
      setKnown(s => new Set([...s, deck[index].q]));
    }
    if (mark === "review") {
      setUnknown(s => new Set([...s, deck[index].q]));
    }

    // flip card back first
    setFlipped(false);

    // wait for flip animation to finish before switching card
    setTimeout(() => {
      if (index + 1 >= total) {
        setDone(true);
      } else {
        setIndex(i => i + 1);
      }
    }, 420); // same as CSS transition
  }, [deck, index, total]);

  const restart = (onlyUnknown = false) => {
    const newDeck = onlyUnknown ? shuffle(FLASHCARDS.filter(c => unknown.has(c.q))) : shuffle(FLASHCARDS);
    setDeck(newDeck.length ? newDeck : shuffle(FLASHCARDS));
    setIndex(0); setFlipped(false); setKnown(new Set()); setUnknown(new Set()); setDone(false);
  };

  const handleBack = () => { onBack(); };

  return (
    <div className="page">
      <div className="inner-wrap">
        <button className="back-btn" onClick={handleBack}>← Back to Home</button>

        <div className="mod-header fc-header">
          <div className="mod-icon lg fc-header-icon">🃏</div>
          <div>
            <div className="mod-label fc-header-label">Flashcard Review</div>
            <div className="mod-header-title">Study All Modules</div>
            <div className="mod-header-sub">{FLASHCARDS.length} cards · tap card to flip</div>
          </div>
        </div>

        {!done ? (
          <>
            <div className="fc-progress-wrap">
              <div className="fc-progress-meta">
                <span className="fc-progress-card">Card {index+1} of {total}</span>
                <span className="fc-progress-known">✓ {known.size} known</span>
              </div>
              <div className="fc-progress-track">
                <div className="fc-progress-fill" style={{ width:`${progress}%` }} />
              </div>
            </div>

            <div className="fc-card-wrap" onClick={() => setFlipped(f => !f)}>
              <div className={`fc-inner ${flipped ? "flipped" : ""} ${noAnim ? "no-anim" : ""}`}>
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

            <div className="fc-actions">
              {flipped ? (
                <>
                  <button className="btn ghost fc-action fc-btn-learning" onClick={() => goNext("review")}>✗ Still Learning</button>
                  <button className="btn ghost fc-action fc-btn-got"      onClick={() => goNext("know")}>✓ Got It</button>
                </>
              ) : (
                <button className="btn ghost fc-action fc-btn-flip" onClick={() => setFlipped(true)}>Flip Card</button>
              )}
            </div>
          </>
        ) : (
          <div className="done-box">
            <div className="fc-done-emoji">{known.size/total>=0.8?"🌊":known.size/total>=0.5?"💧":"📚"}</div>
            <div className="done-title">Round Complete!</div>
            <div className="fc-done-stats">
              <div className="fc-done-stat">
                <div className="fc-stat-num fc-stat-known">{known.size}</div>
                <div className="fc-done-stat-label">Got It</div>
              </div>
              <div className="fc-done-stat">
                <div className="fc-stat-num fc-stat-learning">{unknown.size}</div>
                <div className="fc-done-stat-label">Learning</div>
              </div>
              <div className="fc-done-stat">
                <div className="fc-stat-num fc-stat-score">{Math.round((known.size/total)*100)}%</div>
                <div className="fc-done-stat-label">Score</div>
              </div>
            </div>
            <div className="fc-done-actions">
              {unknown.size>0 && (
                <button className="btn ghost fc-action fc-btn-missed" onClick={() => restart(true)}>
                  ↺ Review Missed ({unknown.size})
                </button>
              )}
              <button className="btn ghost fc-action fc-btn-restart" onClick={() => restart(false)}>
                ↺ Restart All Cards
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}