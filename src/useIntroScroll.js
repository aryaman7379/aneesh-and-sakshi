import { useEffect } from 'react';

// The doors open onto the top of the hero arch, with the whole invitation
// below the fold. Rather than leaving the guest to scroll it themselves, the
// page walks down through the invitation on its own, from the arch to the
// venue at the bottom, at a pace that can be read as it goes.
//
// This is a hand-rolled tween, not `scrollTo({ behavior: 'smooth' })`: the
// native version picks its own duration (a few hundred ms), which reads as a
// jump rather than a slow pan.

// Let the hero's staggered fade-in play out before anything moves.
const START_DELAY_MS = 1500;

// The pan holds one steady reading speed for its whole length. A fixed
// duration with an ease across it would race the middle of the page and crawl
// at the ends, since the page is several screens tall.
const PX_PER_SEC = 78;
// Eased ramps at both ends, so the page creeps into motion and settles at the
// bottom rather than starting and stopping dead.
const RAMP_IN_MS = 1600;
const RAMP_OUT_PX = 420;
// The ramps scale the speed down, never to nothing -- without a floor the pan
// would asymptote and never actually reach the last pixel.
const MIN_SPEED_FACTOR = 0.18;

// Below this there is nothing worth panning to.
const MIN_DISTANCE_PX = 48;
// A backgrounded tab hands back one enormous frame gap; without this the pan
// would teleport most of the page on the first frame after returning.
const MAX_FRAME_MS = 50;
// Rounding, plus browsers that clamp scrollY a fraction short of the bottom.
const BOTTOM_EPSILON_PX = 1.5;

// Any of these means the guest has taken over; the pan gets out of the way.
// Deliberately not 'scroll': the pan's own scrolling would cancel it.
const CANCEL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

// easeInOutCubic, used only across the short ramps at either end.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Recomputed every frame rather than measured once: fonts landing and sections
// animating in both change the page height while the pan is running.
const maxScroll = () =>
  Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

/**
 * Pans the page from the top to the bottom of the invitation once `active`
 * turns true. Any scroll input from the guest ends it for good.
 *
 * @param {boolean} active true once the doors have opened.
 */
export function useIntroScroll(active) {
  useEffect(() => {
    if (!active) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let cancelled = false;

    const stop = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };

    const startDelay = setTimeout(() => {
      if (cancelled || maxScroll() - window.scrollY < MIN_DISTANCE_PX) return;

      // Carried in a float: at this speed a frame advances well under a pixel,
      // and reading the position back off `window.scrollY` each frame would
      // round that away and stall the pan.
      let position = window.scrollY;
      let startedAt = null;
      let previous = null;

      const step = (now) => {
        if (cancelled) return;
        startedAt ??= now;
        const dt = previous === null ? 0 : Math.min(now - previous, MAX_FRAME_MS);
        previous = now;

        const bottom = maxScroll();
        const remaining = bottom - position;
        if (remaining <= BOTTOM_EPSILON_PX) return;

        const rampIn = ease(clamp((now - startedAt) / RAMP_IN_MS, 0, 1));
        const rampOut = ease(clamp(remaining / RAMP_OUT_PX, 0, 1));
        const factor = Math.max(Math.min(rampIn, rampOut), MIN_SPEED_FACTOR);

        position = Math.min(position + (PX_PER_SEC * factor * dt) / 1000, bottom);
        window.scrollTo(0, position);
        frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);
    }, START_DELAY_MS);

    CANCEL_EVENTS.forEach((type) =>
      window.addEventListener(type, stop, { passive: true })
    );

    return () => {
      clearTimeout(startDelay);
      stop();
      CANCEL_EVENTS.forEach((type) => window.removeEventListener(type, stop));
    };
  }, [active]);
}
