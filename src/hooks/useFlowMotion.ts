import { useEffect, type RefObject } from 'react';

/**
 * Loads GSAP after first paint and starts the hero trace and diagram signals.
 * The animation code is a separate chunk: the page is complete and usable without it,
 * so it never competes with first render.
 */
export function useFlowMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let stop: (() => void) | undefined;

    const load = () => {
      import('./flowMotion').then(({ startFlowMotion }) => {
        if (!cancelled) stop = startFlowMotion(root);
      });
    };
    const idle = typeof requestIdleCallback === 'function';
    const handle = idle ? requestIdleCallback(load, { timeout: 1500 }) : window.setTimeout(load, 200);

    return () => {
      cancelled = true;
      if (idle) cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      stop?.();
    };
  }, [rootRef]);
}
