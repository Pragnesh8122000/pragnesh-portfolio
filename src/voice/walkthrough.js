// The hero demo. "Play the demo" runs one voice turn: the visitor's line is spoken, the trace steps through
// speech to text, end of turn, first token and first audio, then the reply is spoken while its words appear.
// While the reply speaks, "Interrupt" acts out barge-in: speech stops mid-sentence, the unsaid words are struck
// out and the trace shows where the turn was cut. Without speech synthesis the same turn plays as text.
import { stage, resetTrace, settleTrace, cutSpeaking, speakProgress, replyTokens } from './turn-trace.js';

const demo = document.querySelector('#voice-demo');
const playbackControls = document.querySelector('#playback');
const playButton = document.querySelector('#play');
const interruptButton = document.querySelector('#interrupt');
const status = document.querySelector('#demo-status');
const turns = [...demo.querySelectorAll('.turn')];
const speech = window.speechSynthesis;
const canSpeak = Boolean(speech) && 'SpeechSynthesisUtterance' in window;
const tokens = replyTokens();
const replyText = tokens.map((token) => token.textContent).join(' ');
const promptText = turns[0].querySelector('q').textContent;

const PLAY_LABEL = 'Play the demo';
const WORD_MS = 330; // close to a synthesised voice at rate 1, so the words keep pace with the audio
const HOLD_MS = 6000; // how long a finished demo stays on screen before the preview loop may run again
const audioFallback = 'Audio is unavailable in this browser, so the demo plays as text.';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let active;
let holdTimer;

function highlightTurn(index) {
  turns.forEach((turn, position) => turn.toggleAttribute('data-current', index === position));
}

function reveal(count) {
  speakProgress(count / tokens.length);
  tokens.forEach((token, i) => {
    token.classList.toggle('is-on', i < count);
    token.classList.toggle('is-last', i === count - 1 && count < tokens.length);
  });
}

function clearWords() {
  tokens.forEach((token) => token.classList.remove('is-on', 'is-last', 'is-cut'));
}

function hold() {
  clearTimeout(holdTimer);
  demo.setAttribute('data-held', '');
  holdTimer = setTimeout(() => demo.removeAttribute('data-held'), HOLD_MS);
}

function finish(playback, { message = '', cut = false } = {}) {
  if (active !== playback) return;
  active = undefined;
  playback.over = true;
  clearInterval(playback.ticker);
  if (canSpeak) speech.cancel();
  highlightTurn();
  demo.removeAttribute('data-playing');
  demo.removeAttribute('data-revealing');
  demo.removeAttribute('data-thinking');
  demo.removeAttribute('data-streaming');
  if (!cut) {
    clearWords();
    settleTrace();
  }
  playButton.textContent = PLAY_LABEL;
  if (interruptButton.contains(document.activeElement)) playButton.focus();
  interruptButton.disabled = true;
  status.textContent = message;
  hold();
}

// Speaks one line. Resolves true once it has been spoken (or cut off after starting), false when the browser
// could not start a voice, so the caller can fall back to text.
function say(playback, text, { pitch = 1, onStart, onBoundary } = {}) {
  return new Promise((resolve) => {
    let started = false;
    let settled = false;
    const end = (ok) => {
      if (settled) return;
      settled = true;
      clearTimeout(watchdog);
      resolve(ok);
    };
    // Some browsers expose speech synthesis but never start a voice.
    const watchdog = setTimeout(() => {
      if (started) return;
      speech.cancel();
      end(false);
    }, 3500);
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = document.documentElement.lang;
      utterance.pitch = pitch;
      utterance.onstart = () => {
        started = true;
        clearTimeout(watchdog);
        if (!playback.over) onStart?.();
      };
      utterance.onboundary = (event) => {
        if (!playback.over && event.name === 'word') onBoundary?.(event.charIndex);
      };
      utterance.onend = () => end(started);
      utterance.onerror = () => end(started);
      speech.speak(utterance);
    } catch {
      end(false);
    }
  });
}

function useText(playback) {
  playback.audio = false;
  status.textContent = audioFallback;
}

async function speakPrompt(playback) {
  if (playback.audio && (await say(playback, promptText, { pitch: 1.12 }))) return;
  if (playback.over) return;
  if (playback.audio) useText(playback);
  await wait(1500);
}

function startWords(playback) {
  const startedAt = performance.now();
  playback.spoken = 0;
  playback.speaking = true;
  stage('tts', 'done');
  stage('speak', 'active');
  demo.setAttribute('data-streaming', '');
  interruptButton.disabled = false;
  reveal(0);
  playback.ticker = setInterval(() => {
    const paced = Math.floor((performance.now() - startedAt) / WORD_MS) + 1;
    playback.spoken = Math.min(tokens.length, Math.max(playback.spoken, paced));
    reveal(playback.spoken);
  }, 60);
}

// Word boundaries from the voice, where the browser reports them, keep the words exactly in step.
function wordsBefore(charIndex) {
  return replyText.slice(0, charIndex + 1).trim().split(/\s+/).length;
}

async function speakReply(playback) {
  if (playback.audio) {
    const spoken = await say(playback, replyText, {
      onStart: () => startWords(playback),
      onBoundary: (charIndex) => {
        playback.spoken = Math.max(playback.spoken, wordsBefore(charIndex));
        reveal(playback.spoken);
      },
    });
    if (spoken || playback.over) return;
    useText(playback);
  }
  startWords(playback);
  await wait(tokens.length * WORD_MS + 200);
}

async function play(playback) {
  clearTimeout(holdTimer);
  demo.removeAttribute('data-held');
  resetTrace();
  clearWords();
  demo.setAttribute('data-revealing', '');

  highlightTurn(0);
  stage('stt', 'active');
  await speakPrompt(playback);
  if (playback.over) return;
  stage('stt', 'done');
  stage('end', 'active');
  await wait(700);
  if (playback.over) return;
  stage('end', 'done');

  highlightTurn(1);
  demo.setAttribute('data-thinking', '');
  stage('llm', 'active');
  await wait(650);
  if (playback.over) return;
  demo.removeAttribute('data-thinking');
  stage('llm', 'done');
  stage('tts', 'active');

  await speakReply(playback);
  if (playback.over) return;
  reveal(tokens.length);
  stage('speak', 'done');
  finish(playback, { message: playback.audio ? '' : audioFallback, cut: true });
}

playButton.addEventListener('click', () => {
  if (active) {
    finish(active);
    return;
  }
  const playback = { audio: canSpeak, over: false, spoken: 0, speaking: false };
  active = playback;
  status.textContent = '';
  demo.setAttribute('data-playing', '');
  playButton.textContent = 'Stop demo';
  play(playback);
});

interruptButton.addEventListener('click', () => {
  const playback = active;
  if (!playback?.speaking) return;
  const said = Math.max(1, Math.min(playback.spoken, tokens.length - 1));
  playback.over = true;
  clearInterval(playback.ticker);
  if (canSpeak) speech.cancel();
  tokens.forEach((token, i) => {
    token.classList.add('is-on');
    token.classList.remove('is-last');
    token.classList.toggle('is-cut', i >= said);
  });
  cutSpeaking(said / tokens.length, 'Stopped by you');
  finish(playback, { message: 'You cut in, so the agent stopped mid-sentence and is listening again.', cut: true });
});

playbackControls.hidden = false;

// Phones: the hero keeps the claim and its buttons on the first screen, and the demo moves into its own section
// right after it. Without JavaScript it stays in the hero.
const demoSection = document.querySelector('#demo');
const demoSlot = demoSection?.querySelector('.demo-slot');
const demoHome = demo.parentElement;
const phone = matchMedia('(max-width: 620px)');
function placeDemo() {
  if (!demoSlot) return;
  if (phone.matches) demoSlot.append(demo);
  else demoHome.append(demo);
  demoSection.hidden = !phone.matches;
}
phone.addEventListener('change', placeDemo);
placeDemo();
addEventListener('pagehide', () => {
  if (active) finish(active);
});
