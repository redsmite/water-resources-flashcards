// ── src/scrollToTop.js ────────────────────────────────────────────────────────
// Resets the page scroll to the very top.
// Covers window, html, and body — all three, because browsers differ on
// which one is actually the scroll container for a given app.
// ─────────────────────────────────────────────────────────────────────────────
export function scrollToTop() {
  // window.scrollTo is the most reliable cross-browser call
  window.scrollTo(0, 0);
  // Belt-and-suspenders: also zero out the two root elements directly
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}