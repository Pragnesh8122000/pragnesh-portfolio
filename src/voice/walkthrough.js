const demo = document.querySelector('#voice-demo');
const playbackControls = document.querySelector('#playback');
const playButton = document.querySelector('#play');
const status = document.querySelector('#demo-status');
const turns = [...demo.querySelectorAll('.turn')];
const speech = window.speechSynthesis;
const textTurnDurations = [1400, 3600];
const audioFallback = 'Audio is unavailable in this browser. You can read the sample conversation above.';
let activePlayback;

function highlightTurn(index) {
  turns.forEach((turn, position) => turn.toggleAttribute('data-current', index === position));
}

function cancelSpeech(playback) {
  if (!playback.utterances) return;
  playback.utterances = undefined;
  speech.cancel();
}

function finishPlayback(playback, message = '') {
  if (activePlayback !== playback) return;
  activePlayback = undefined;
  clearTimeout(playback.timer);
  cancelSpeech(playback);
  highlightTurn();
  demo.removeAttribute('data-playing');
  playButton.textContent = 'Replay sample conversation';
  status.textContent = message;
}

function playTextTurn(playback, index) {
  highlightTurn(index);
  playback.timer = setTimeout(() => {
    if (index + 1 < turns.length) {
      playTextTurn(playback, index + 1);
    } else {
      finishPlayback(playback, audioFallback);
    }
  }, textTurnDurations[index]);
}

function fallBackToText(playback) {
  if (activePlayback !== playback) return;
  clearTimeout(playback.timer);
  cancelSpeech(playback);
  status.textContent = audioFallback;
  playTextTurn(playback, playback.turn);
}

function playWithAudio(playback) {
  try {
    const utterances = turns.map((turn, index) => {
      const utterance = new SpeechSynthesisUtterance(turn.querySelector('q').textContent);
      utterance.lang = document.documentElement.lang;
      utterance.onstart = () => {
        if (activePlayback !== playback || !playback.utterances) return;
        playback.turn = index;
        highlightTurn(index);
        clearTimeout(playback.timer);
        playback.timer = setTimeout(() => fallBackToText(playback), 15000);
      };
      utterance.onerror = () => {
        if (activePlayback === playback && playback.utterances) fallBackToText(playback);
      };
      return utterance;
    });
    utterances.at(-1).onend = () => {
      if (playback.utterances) finishPlayback(playback);
    };
    playback.utterances = utterances;
    // Some browsers expose speech synthesis even when they cannot start a voice.
    playback.timer = setTimeout(() => fallBackToText(playback), 3500);
    for (const utterance of utterances) {
      if (!playback.utterances) break;
      speech.speak(utterance);
    }
  } catch {
    fallBackToText(playback);
  }
}

playButton.addEventListener('click', () => {
  if (activePlayback) {
    finishPlayback(activePlayback, status.textContent);
    return;
  }

  const playback = { turn: 0 };
  activePlayback = playback;
  status.textContent = '';
  demo.setAttribute('data-playing', '');
  playButton.textContent = 'Stop sample conversation';
  highlightTurn(0);

  if (speech && 'SpeechSynthesisUtterance' in window) {
    playWithAudio(playback);
  } else {
    fallBackToText(playback);
  }
});

playbackControls.hidden = false;
addEventListener('pagehide', () => {
  if (activePlayback) finishPlayback(activePlayback);
});

const progress = document.querySelector('.scroll-progress');
const header = document.querySelector('.sitehead');
let lastScrollY = scrollY;
let scrollFrame;

function updateScroll() {
  scrollFrame = undefined;
  const position = Math.max(0, scrollY);
  const distance = document.documentElement.scrollHeight - innerHeight;
  const fraction = distance > 0 ? Math.min(1, position / distance) : 0;
  progress.style.transform = `scaleX(${fraction})`;

  if (position < 80) {
    header.classList.remove('away');
    lastScrollY = position;
  } else if (Math.abs(position - lastScrollY) >= 12) {
    header.classList.toggle('away', position > lastScrollY);
    lastScrollY = position;
  }
}

function scheduleScrollUpdate() {
  if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(updateScroll);
}

addEventListener('scroll', scheduleScrollUpdate, { passive: true });
addEventListener('resize', scheduleScrollUpdate);
header.addEventListener('focusin', () => header.classList.remove('away'));
updateScroll();
