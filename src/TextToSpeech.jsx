// ── TextToSpeech.jsx ──────────────────────────────────────────────────────────
// Browser-native TTS via the Web Speech API (SpeechSynthesis).
// No external libraries required.
//
// Usage:
//   <TTSButton text="Hello, world!" />
//   <TTSToolbar text={longContent} label="Read Module" />
//   useTTS() — headless hook for custom UIs
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const TTS_SETTINGS_KEY = "wrm_tts_settings";

const DEFAULT_SETTINGS = {
  rate:   1.0,   // 0.1 – 10
  pitch:  1.0,   // 0   – 2
  volume: 1.0,   // 0   – 1
  voiceURI: "",  // empty = browser default
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadTTSSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(TTS_SETTINGS_KEY) || "null");
    return s ? { ...DEFAULT_SETTINGS, ...s } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveTTSSettings(s) {
  try { localStorage.setItem(TTS_SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

function isSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// ── Core hook ─────────────────────────────────────────────────────────────────
/**
 * useTTS(text)
 * Returns { speaking, paused, supported, speak, pause, resume, stop, settings, updateSettings, voices }
 */
export function useTTS(text = "") {
  const [speaking,  setSpeaking]  = useState(false);
  const [paused,    setPaused]    = useState(false);
  const [settings,  setSettings]  = useState(loadTTSSettings);
  const [voices,    setVoices]    = useState([]);
  const uttRef = useRef(null);

  // Load available voices (async in some browsers)
  useEffect(() => {
    if (!isSupported()) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  // Persist settings
  const updateSettings = useCallback((patch) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      saveTTSSettings(next);
      return next;
    });
  }, []);

  const stop = useCallback(() => {
    if (!isSupported()) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
    uttRef.current = null;
  }, []);

  const speak = useCallback(() => {
    if (!isSupported() || !text) return;
    stop();

    const utt = new SpeechSynthesisUtterance(text);
    utt.rate   = settings.rate;
    utt.pitch  = settings.pitch;
    utt.volume = settings.volume;

    if (settings.voiceURI) {
      const v = window.speechSynthesis.getVoices().find(v => v.voiceURI === settings.voiceURI);
      if (v) utt.voice = v;
    }

    utt.onstart  = () => { setSpeaking(true);  setPaused(false); };
    utt.onpause  = () => { setPaused(true);  };
    utt.onresume = () => { setPaused(false); };
    utt.onend    = () => { setSpeaking(false); setPaused(false); uttRef.current = null; };
    utt.onerror  = () => { setSpeaking(false); setPaused(false); uttRef.current = null; };

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [text, settings, stop]);

  const pause = useCallback(() => {
    if (!isSupported() || !speaking) return;
    window.speechSynthesis.pause();
    setPaused(true);
  }, [speaking]);

  const resume = useCallback(() => {
    if (!isSupported() || !paused) return;
    window.speechSynthesis.resume();
    setPaused(false);
  }, [paused]);

  // Cancel speech if component unmounts mid-speech
  useEffect(() => () => { if (uttRef.current) window.speechSynthesis.cancel(); }, []);

  return {
    supported: isSupported(),
    speaking,
    paused,
    speak,
    pause,
    resume,
    stop,
    settings,
    updateSettings,
    voices,
  };
}

// ── TTSButton ─────────────────────────────────────────────────────────────────
/**
 * Minimal play/stop icon button — drop anywhere inline.
 *
 * Props:
 *   text      {string}  — content to read aloud
 *   label     {string}  — accessible label (default "Read aloud")
 *   size      {number}  — icon px size (default 18)
 *   className {string}  — extra class names
 */
export function TTSButton({ text = "", label = "Read aloud", size = 18, className = "" }) {
  const { supported, speaking, paused, speak, pause, resume, stop } = useTTS(text);
  if (!supported) return null;

  const handleClick = () => {
    if (!speaking) { speak(); return; }
    if (paused)    { resume(); return; }
    pause();
  };

  const icon = !speaking ? "🔊" : paused ? "▶️" : "⏸";
  const tip  = !speaking ? "Read aloud" : paused ? "Resume" : "Pause";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <button
        aria-label={tip}
        title={tip}
        onClick={handleClick}
        className={`tts-btn ${className}`}
        style={btnStyle(size)}
      >
        <span style={{ fontSize: size * 0.8 }}>{icon}</span>
      </button>
      {speaking && (
        <button
          aria-label="Stop reading"
          title="Stop"
          onClick={stop}
          className="tts-btn tts-btn--stop"
          style={btnStyle(size)}
        >
          <span style={{ fontSize: size * 0.8 }}>⏹</span>
        </button>
      )}
    </span>
  );
}

function btnStyle(size) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width:  size + 10,
    height: size + 10,
    borderRadius: "50%",
    border: "1px solid var(--border, #ccc)",
    background: "var(--surface, #fff)",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
    transition: "opacity .15s",
    opacity: 0.85,
  };
}

// ── TTSToolbar ────────────────────────────────────────────────────────────────
/**
 * Full-featured toolbar with play/pause/stop + settings panel.
 *
 * Props:
 *   text    {string}  — content to read aloud
 *   label   {string}  — displayed button label
 */
export function TTSToolbar({ text = "", label = "Read Aloud" }) {
  const { supported, speaking, paused, speak, pause, resume, stop, settings, updateSettings, voices } = useTTS(text);
  const [showSettings, setShowSettings] = useState(false);

  if (!supported) return null;

  const handleMain = () => {
    if (!speaking) { speak(); return; }
    if (paused)    { resume(); return; }
    pause();
  };

  const mainIcon  = !speaking ? "🔊" : paused ? "▶️" : "⏸";
  const mainLabel = !speaking ? label : paused ? "Resume" : "Pause";

  // Filter to a useful subset of voices: prefer English, max 30
  const filteredVoices = voices
    .filter(v => !voices.some(u => u.lang.startsWith("en")) || v.lang.startsWith("en"))
    .slice(0, 30);

  return (
    <div className="tts-toolbar" style={toolbarWrap}>
      {/* Main controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button className="tts-toolbar-btn" onClick={handleMain} style={toolbarBtn("#4a90d9")}>
          <span>{mainIcon}</span> {mainLabel}
        </button>

        {speaking && (
          <button className="tts-toolbar-btn tts-toolbar-btn--stop" onClick={stop} style={toolbarBtn("#e05c5c")}>
            ⏹ Stop
          </button>
        )}

        <button
          className={`tts-toolbar-btn tts-toolbar-btn--settings${showSettings ? " active" : ""}`}
          onClick={() => setShowSettings(s => !s)}
          style={toolbarBtn(showSettings ? "#555" : "#888")}
          title="TTS Settings"
        >
          ⚙️
        </button>
      </div>

      {/* Speaking indicator */}
      {speaking && !paused && (
        <div style={indicatorStyle}>
          <span style={dot(0)} /><span style={dot(0.15)} /><span style={dot(0.3)} />
          <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>Reading…</span>
        </div>
      )}

      {/* Settings panel */}
      {showSettings && (
        <div className="tts-settings-panel" style={panel}>
          <div style={panelRow}>
            <label style={lbl}>Speed</label>
            <input type="range" min="0.5" max="2" step="0.1"
              value={settings.rate}
              onChange={e => updateSettings({ rate: +e.target.value })}
              style={{ flex: 1 }}
            />
            <span style={val}>{settings.rate.toFixed(1)}×</span>
          </div>

          <div style={panelRow}>
            <label style={lbl}>Pitch</label>
            <input type="range" min="0.5" max="2" step="0.1"
              value={settings.pitch}
              onChange={e => updateSettings({ pitch: +e.target.value })}
              style={{ flex: 1 }}
            />
            <span style={val}>{settings.pitch.toFixed(1)}</span>
          </div>

          <div style={panelRow}>
            <label style={lbl}>Volume</label>
            <input type="range" min="0" max="1" step="0.05"
              value={settings.volume}
              onChange={e => updateSettings({ volume: +e.target.value })}
              style={{ flex: 1 }}
            />
            <span style={val}>{Math.round(settings.volume * 100)}%</span>
          </div>

          {filteredVoices.length > 0 && (
            <div style={panelRow}>
              <label style={lbl}>Voice</label>
              <select
                value={settings.voiceURI}
                onChange={e => updateSettings({ voiceURI: e.target.value })}
                style={{ flex: 1, fontSize: 12, padding: "2px 4px", background: "var(--surface, #fff)", color: "var(--text, #333)", border: "1px solid var(--border, #ccc)", borderRadius: 4 }}
              >
                <option value="">Browser default</option>
                {filteredVoices.map(v => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── TTSToolbar styles (inline, theme-aware) ────────────────────────────────────
const toolbarWrap = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "8px 0",
};

const toolbarBtn = (bg) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 12px",
  borderRadius: 20,
  border: "none",
  background: bg,
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: "opacity .15s",
  opacity: 0.9,
  zIndex: 999,
  marginBottom: "15px",
});

const indicatorStyle = {
  display: "flex",
  alignItems: "center",
  gap: 3,
  marginLeft: 4,
};

const dot = (delay) => ({
  display: "inline-block",
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: "var(--accent, #4a90d9)",
  animation: `ttsBounce .8s ${delay}s infinite ease-in-out alternate`,
});

const panel = {
  background: "var(--surface-alt, #f5f5f5)",
  border: "1px solid var(--border, #ddd)",
  borderRadius: 8,
  padding: "10px 14px",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const panelRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const lbl = {
  fontSize: 12,
  fontWeight: 600,
  width: 50,
  color: "var(--text-muted, #666)",
  flexShrink: 0,
};

const val = {
  fontSize: 12,
  width: 36,
  textAlign: "right",
  color: "var(--text-muted, #666)",
  flexShrink: 0,
};

// ── Inject bounce keyframes once ──────────────────────────────────────────────
if (typeof document !== "undefined" && !document.getElementById("tts-keyframes")) {
  const style = document.createElement("style");
  style.id = "tts-keyframes";
  style.textContent = `
    @keyframes ttsBounce {
      from { transform: translateY(0);   opacity: .5; }
      to   { transform: translateY(-4px); opacity: 1; }
    }
    .tts-toolbar-btn:hover  { opacity: 1 !important; }
    .tts-btn:hover          { opacity: 1 !important; }
  `;
  document.head.appendChild(style);
}

// ── Default export: convenience barrel ───────────────────────────────────────
export default { useTTS, TTSButton, TTSToolbar };
