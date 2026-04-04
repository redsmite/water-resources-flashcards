// ── flashcard/Flashcard.jsx ───────────────────────────────────────────────────
import { useState, useCallback, useEffect } from "react";
import { FLASHCARDS } from "../data.js";
import "../global.css";
import "./flashcard.css";
import { scrollToTop } from "../scrollToTop.js";

const FC_KEY = "wrm_flashcard_progress";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i > 0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ── Persist helpers ───────────────────────────────────────────────────────────
function saveProgress(deck, index, known, unknown, done) {
  try {
    localStorage.setItem(FC_KEY, JSON.stringify({
      deck,
      index,
      known:   [...known],
      unknown: [...unknown],
      done,
    }));
  } catch {}
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(FC_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!Array.isArray(p.deck) || p.deck.length === 0) return null;
    // Guard against stale data if FLASHCARDS content changes
    const validQs = new Set(FLASHCARDS.map(c => c.q));
    if (!p.deck.every(c => validQs.has(c.q))) return null;
    return p;
  } catch {
    return null;
  }
}

function clearProgress() {
  try { localStorage.removeItem(FC_KEY); } catch {}
}

// ── Component ─────────────────────────────────────────────────────────────────
export function FlashcardsView({ onBack }) {
  // Initialise all state from localStorage if available
  const [deck, setDeck]       = useState(() => { const p = loadProgress(); return p ? p.deck    : shuffle(FLASHCARDS); });
  const [index, setIndex]     = useState(() => { const p = loadProgress(); return p ? p.index   : 0; });
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown]     = useState(() => { const p = loadProgress(); return p ? new Set(p.known)   : new Set(); });
  const [unknown, setUnknown] = useState(() => { const p = loadProgress(); return p ? new Set(p.unknown) : new Set(); });
  const [done, setDone]       = useState(() => { const p = loadProgress(); return p ? p.done    : false; });

  // Show "Resumed" nudge only when we actually restored mid-session progress
  const [resumed, setResumed] = useState(() => {
    const p = loadProgress();
    return !!(p && !p.done && p.index > 0);
  });

  const card     = deck[index] ?? deck[0];
  const total    = deck.length;
  const progress = (index / total) * 100;

  // ── Save on every change ──────────────────────────────────────────────────
  useEffect(() => {
    saveProgress(deck, index, known, unknown, done);
  }, [deck, index, known, unknown, done]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback((mark) => {
    scrollToTop();
    setFlipped(false);
    setResumed(false);

    const newKnown   = mark === "know"   ? new Set([...known,   deck[index].q]) : known;
    const newUnknown = mark === "review" ? new Set([...unknown, deck[index].q]) : unknown;

    if (mark === "know")   setKnown(newKnown);
    if (mark === "review") setUnknown(newUnknown);

    if (index + 1 >= total) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
    }
  }, [deck, index, total, known, unknown]);

  const restart = (onlyUnknown = false) => {
    scrollToTop();
    clearProgress();
    const base    = onlyUnknown ? FLASHCARDS.filter(c => unknown.has(c.q)) : FLASHCARDS;
    const newDeck = shuffle(base.length ? base : FLASHCARDS);
    setDeck(newDeck);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    setResumed(false);
  };

  const handleBack = () => {
    // Progress already saved via useEffect — just go back
    scrollToTop();
    onBack();
  };

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

        {/* ── Resumed badge ── */}
        {resumed && !done && (
          <div className="fc-resume-badge">
            ↩ Resumed from card {index + 1} of {total}
            <button className="fc-resume-clear" onClick={() => restart(false)}>Start over</button>
          </div>
        )}

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
              {unknown.size > 0 && (
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