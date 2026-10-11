import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Scroll-driven 3D only on wide screens without a reduced-motion preference. */
const MOTION_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

/** Hero exit fraction after which the tabs start stepping forward. */
const SEQUENCE_START = 0.65;
const STEP = 0.046;
const PULSE = 0.06;

/**
 * Hero entrance, hero-exit tab sequence and index pip fade.
 * Animates transforms and opacity only; content is visible without any of it.
 */
export function useFlowMotion(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(MOTION_QUERY, () => {
      const hero = root.querySelector<HTMLElement>('[data-hero]');
      const enters = root.querySelectorAll<HTMLElement>('.flow-enter');
      const scrolls = root.querySelectorAll<HTMLElement>('.flow-scroll');
      const pips = root.querySelectorAll<HTMLElement>('.flow-index-pip');

      gsap.from(enters, { y: 16, z: -24, duration: 0.45, stagger: 0.07, ease: 'power2.out' });

      if (hero) {
        const exit = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } as const;

        const sequence = gsap.timeline({ scrollTrigger: exit });
        sequence.to({}, { duration: 1 }, 0);
        scrolls.forEach((tab, i) => {
          const at = SEQUENCE_START + i * STEP;
          sequence
            .to(tab, { z: 18, y: -4, scale: 1.02, duration: PULSE, ease: 'power1.out' }, at)
            .to(tab, { z: 0, y: 0, scale: 1, duration: PULSE, ease: 'power1.in' }, at + PULSE);
        });

        gsap.fromTo(pips, { opacity: 0.25 }, { opacity: 1, ease: 'none', scrollTrigger: { ...exit } });
      }
    });

    return () => mm.revert();
  }, [rootRef]);
}
