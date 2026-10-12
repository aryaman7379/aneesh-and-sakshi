import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * IntersectionObserver-backed scroll reveal. Adds `.in` once, then unobserves.
 * Call on a ref attached to an element that already has the `.reveal` class.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.2, rootMargin = '0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      el.classList.add('in');
      return undefined;
    }

    const reveal = () => {
      el.classList.add('in');
    };

    // If the element is already on screen (e.g. after intro auto-scroll),
    // mark it immediately — waiting only on the observer can miss the moment.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      reveal();
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.unobserve(el);
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/** Stagger delay cycling every 4 siblings: 0, 0.12, 0.24, 0.36, … */
export function staggerDelay(index) {
  return `${(index % 4) * 0.12}s`;
}
