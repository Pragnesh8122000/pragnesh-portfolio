import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Wide screens without a reduced-motion preference; everything here is an extra on top of a complete page. */
const MOTION_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

/** Seconds the packet takes between two stages, and how long a branch pulse lasts. */
const HOP = 0.24;
const PULSE = 0.2;

/**
 * The request trace: stage lights dim (anticipation), a packet drops down the rail, and each
 * stage it passes gets a pulse along its branch, lights up and gives a small settling nudge.
 */
function buildTrace(root: HTMLElement): gsap.core.Timeline | null {
  const packet = root.querySelector<HTMLElement>('.flow-packet');
  const stages = Array.from(root.querySelectorAll<HTMLElement>('.flow-pos'));
  if (!packet || stages.length === 0) return null;

  const stops = stages.map((stage) => stage.offsetTop + 12);
  const trace = gsap.timeline({ paused: true });

  trace
    .to(stages, { '--lit': 0, duration: 0.25, ease: 'power1.in' }, 0)
    .set(packet, { y: stops[0] - 44, scaleY: 1, opacity: 0 }, 0)
    .to(packet, { opacity: 1, duration: 0.15, ease: 'none' }, 0.2);

  let at = 0.2;
  stages.forEach((stage, i) => {
    const signal = stage.querySelector('.flow-signal');
    const tab = stage.querySelector('.flow-react');
    // Stretch while travelling, back to square on arrival.
    trace
      .to(packet, { y: stops[i], duration: HOP, ease: 'power2.inOut' }, at)
      .to(packet, { scaleY: 1.5, duration: HOP / 2, ease: 'power1.in' }, at)
      .to(packet, { scaleY: 1, duration: HOP / 2, ease: 'power1.out' }, at + HOP / 2);
    at += HOP;
    trace
      .fromTo(signal, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: PULSE, ease: 'power2.out' }, at)
      .to(signal, { opacity: 0, duration: 0.3, ease: 'power1.out' }, at + PULSE)
      .to(stage, { '--lit': 1, duration: 0.2, ease: 'none' }, at + PULSE * 0.6)
      .to(tab, { x: -6, duration: 0.1, ease: 'power2.out' }, at + PULSE * 0.6)
      .to(tab, { x: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' }, at + PULSE * 0.6 + 0.1);
  });

  trace.to(packet, { y: stops[stops.length - 1] + 44, opacity: 0, duration: 0.3, ease: 'power2.in' }, at + 0.05);
  return trace;
}

/** Flashes a diagram's boxes once, in data-flow order, the first time it scrolls into view. */
function signalDiagrams(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('figure.fd').forEach((figure) => {
    const boxes = figure.querySelectorAll('.fd-step, .fd-target');
    ScrollTrigger.create({
      trigger: figure,
      start: 'top 78%',
      once: true,
      onEnter: () =>
        gsap.fromTo(boxes, { '--sig': 1 }, { '--sig': 0, duration: 0.7, stagger: 0.12, ease: 'power1.in' })
    });
  });
}

/** Starts all motion under `root` and returns its cleanup. */
export function startFlowMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia(root);

  mm.add(MOTION_QUERY, () => {
    const trace = buildTrace(root);
    const replay = root.querySelector<HTMLElement>('[data-flow-replay]');
    const onReplay = () => trace?.restart();

    if (trace) {
      // Let the CSS tab entrance finish before the first request goes out.
      trace.delay(0.9).play();
      replay?.addEventListener('click', onReplay);
      root.dataset.flowMotion = 'ready';
    }
    signalDiagrams(root);

    return () => {
      replay?.removeEventListener('click', onReplay);
      delete root.dataset.flowMotion;
    };
  });

  return () => mm.revert();
}
