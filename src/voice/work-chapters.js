import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOTION = '(prefers-reduced-motion: no-preference)';
const media = gsap.matchMedia();

const deck = document.querySelector('.case-deck');
if (deck) {
  const cards = [...deck.children];
  const controls = document.querySelector('.deck-controls');
  const previous = controls.querySelector('[data-prev]');
  const next = controls.querySelector('[data-next]');
  const position = controls.querySelector('output');
  const cardLeft = (card) => card.offsetLeft - cards[0].offsetLeft;
  const distance = (card) => Math.abs(cardLeft(card) - deck.scrollLeft);
  const current = () => cards.indexOf(cards.reduce((a, b) => distance(a) <= distance(b) ? a : b));

  let pin;
  function sync() {
    const index = current();
    previous.disabled = index === 0;
    next.disabled = index === cards.length - 1;
    const label = (index + 1) + ' / ' + cards.length + ' · ' + cards[index].querySelector('h3').textContent;
    if (position.value !== label) position.value = label;
  }

  function move(step) {
    const card = cards[current() + step];
    if (!card) return;
    if (pin) {
      const fraction = Math.min(1, cardLeft(card) / (deck.scrollWidth - deck.clientWidth));
      window.scrollTo({ top: pin.start + fraction * (pin.end - pin.start), behavior: 'smooth' });
    } else {
      deck.scrollTo({ left: cardLeft(card), behavior: 'instant' });
    }
  }

  media.add(MOTION, () => {
    const stage = deck.closest('.work-stage');
    stage.dataset.scrollDeck = '';
    const travel = () => deck.scrollWidth - deck.clientWidth;
    pin = ScrollTrigger.create({
      trigger: stage,
      pin: true,
      start: () => 'top ' + Math.min(document.querySelector('.sitehead').offsetHeight, innerHeight - stage.offsetHeight) + 'px',
      end: () => '+=' + travel(),
      onUpdate: (trigger) => { deck.scrollLeft = travel() * trigger.progress; },
    });

    // Carry a horizontal swipe into the page's scroll position when it settles.
    const alignPage = () => {
      if (!pin?.isActive || Math.abs(deck.scrollLeft - travel() * pin.progress) < 2) return;
      window.scrollTo({ top: pin.start + deck.scrollLeft / travel() * (pin.end - pin.start), behavior: 'instant' });
    };
    deck.addEventListener('scrollend', alignPage);
    return () => {
      deck.removeEventListener('scrollend', alignPage);
      delete stage.dataset.scrollDeck;
      pin = undefined;
    };
  });

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  deck.addEventListener('scroll', sync, { passive: true });
  new ResizeObserver(sync).observe(deck);
  sync();
}

function closingHighlight() {
  const heading = document.querySelector('#contact-title');
  if (!heading) return;
  const text = heading.textContent;

  media.add(MOTION, () => {
    // Each word stays real text, so the heading reads exactly the same to a screen reader.
    const words = text.split(' ').map((word) => {
      const span = Object.assign(document.createElement('span'), { className: 'hl-word', textContent: word });
      if (word === 'role') span.dataset.key = '';
      return span;
    });
    heading.replaceChildren(...words.flatMap((span, i) => (i ? [' ', span] : [span])));

    gsap.set(words, { opacity: 0.62 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 0.5,
        // Once read, it stays read: scrolling back up no longer dims it.
        onLeave: (self) => {
          self.kill(false, true);
          gsap.set(words, { opacity: 1 });
          gsap.set(heading.querySelector('[data-key]'), { '--key': 1 });
        },
      },
    });
    timeline
      .to(words, { opacity: 1, stagger: 0.4, duration: 1, ease: 'none' })
      .to(heading.querySelector('[data-key]'), { '--key': 1, duration: 0.8, ease: 'none' }, '>-0.6');

    return () => { heading.textContent = text; };
  });
}

closingHighlight();
