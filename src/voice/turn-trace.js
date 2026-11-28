// The hero console's turn trace: one row per stage of a voice turn (speech to text, end of turn, first token,
// first audio, speaking). hero-motion.js drives it during the looping preview and walkthrough.js during the demo.
// Rows with no data-state draw as a finished turn, which is also what visitors see without JavaScript or motion.
const demo = document.querySelector('#voice-demo');
const rows = new Map([...(demo?.querySelectorAll('[data-stage]') ?? [])].map((row) => [row.dataset.stage, row]));

function meta(row, text) {
  const label = row.querySelector('.trace-meta');
  label.textContent = text ?? label.dataset.default;
}

// state: idle | active | done | failed | stopped. Leaving text out restores the row's default label.
export function stage(id, state, text) {
  const row = rows.get(id);
  if (!row) return;
  row.dataset.state = state;
  meta(row, text);
}

// A hedged first token: the primary model's wait shows as a dashed lead-in before the fallback's bar.
export function markHedged(on) {
  rows.get('llm')?.toggleAttribute('data-hedged', on);
}

export function resetTrace() {
  rows.forEach((row) => {
    row.dataset.state = 'idle';
    row.removeAttribute('data-hedged');
    row.style.removeProperty('--cut');
    meta(row);
  });
}

export function settleTrace() {
  rows.forEach((row) => {
    row.removeAttribute('data-state');
    row.removeAttribute('data-hedged');
    row.style.removeProperty('--cut');
    meta(row);
  });
}

// How much of the reply has been spoken so far (0 to 1); the speaking bar grows with it.
export function speakProgress(fraction) {
  rows.get('speak')?.style.setProperty('--cut', String(Math.max(0.04, Math.min(1, fraction))));
}

// Stops the speaking row where the reply was cut off (0 to 1 of its length).
export function cutSpeaking(fraction, text) {
  const row = rows.get('speak');
  if (!row) return;
  row.style.setProperty('--cut', String(Math.max(0.04, Math.min(1, fraction))));
  stage('speak', 'stopped', text);
}

// The reply's words as spans, so the preview and the demo can reveal them one at a time without reflow.
// Built once; the text reads exactly as before.
let tokens;
export function replyTokens() {
  if (tokens) return tokens;
  const quote = demo.querySelector('[data-turn="output"] q');
  tokens = quote.textContent.trim().split(/\s+/).map((word) => Object.assign(document.createElement('span'), { className: 'stream-tok', textContent: word }));
  quote.replaceChildren(...tokens.flatMap((token, i) => (i ? [' ', token] : [token])));
  return tokens;
}
