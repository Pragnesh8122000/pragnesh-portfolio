import { useEffect, useState } from 'react';
import type { StageId } from '../content/portfolio';

/** Reading line sits this far below the sticky index: anchors land at +20px, so a jump selects its own target. */
const READING_OFFSET = 60;

/** How much of an element is visible inside its horizontal card row (full width when not in a row). */
function visibleWidth(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const track = el.closest<HTMLElement>('.carousel-track');
  if (!track) return rect.width;
  const bounds = track.getBoundingClientRect();
  return Math.max(0, Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left));
}

/**
 * Tracks which stage target is under the reading line just below the sticky index.
 * A 1px IntersectionObserver band picks the row; inside a horizontal card row, the most
 * visible card wins and swiping updates it. Keeps the last stage while nothing crosses
 * the line; clears on hero entry.
 */
export function useActiveStage(ids: readonly StageId[], heroId: string): StageId | null {
  const [active, setActive] = useState<StageId | null>(null);

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const hero = document.getElementById(heroId);
    const crossing = new Set<HTMLElement>();
    let heroVisible = false;
    let lastStage: StageId | null = null;
    let stageObserver: IntersectionObserver | null = null;

    const pick = () => {
      let best: HTMLElement | null = null;
      let bestWidth = 0;
      // Targets are in page order, so ties go to the earlier (leftmost) card.
      for (const el of targets) {
        if (!crossing.has(el)) continue;
        const width = visibleWidth(el);
        if (width > bestWidth) {
          best = el;
          bestWidth = width;
        }
      }
      if (best) lastStage = best.id as StageId;
      setActive(heroVisible ? null : lastStage);
    };

    const observeBand = () => {
      stageObserver?.disconnect();
      crossing.clear();
      const index = document.querySelector<HTMLElement>('[data-flow-index]');
      const line = Math.round((index?.offsetHeight ?? 0) + READING_OFFSET);
      const below = Math.max(0, window.innerHeight - line - 1);
      stageObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) crossing.add(el);
            else crossing.delete(el);
          }
          pick();
        },
        { rootMargin: `-${line}px 0px -${below}px 0px`, threshold: 0 }
      );
      targets.forEach((el) => stageObserver!.observe(el));
    };

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        // Entering the hero clears the remembered stage; leaving it shows whatever crossed the line since.
        if (heroVisible) lastStage = null;
        setActive(heroVisible ? null : lastStage);
      },
      { threshold: [0, 0.35, 1] }
    );
    if (hero) heroObserver.observe(hero);

    // Swiping a row changes which card is most visible without crossing the reading line.
    let frame = 0;
    const onRowScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(pick);
    };
    const tracks = Array.from(document.querySelectorAll<HTMLElement>('.carousel-track'));
    tracks.forEach((track) => track.addEventListener('scroll', onRowScroll, { passive: true }));

    observeBand();
    window.addEventListener('resize', observeBand);

    return () => {
      cancelAnimationFrame(frame);
      tracks.forEach((track) => track.removeEventListener('scroll', onRowScroll));
      window.removeEventListener('resize', observeBand);
      stageObserver?.disconnect();
      heroObserver.disconnect();
    };
  }, [ids, heroId]);

  return active;
}
