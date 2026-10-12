import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../content';
import Picture from './Picture';
import WaxSeal from './WaxSeal';

// How long the full break-seal → doors-part sequence runs before the
// invitation underneath is revealed.
const SEQUENCE_MS = 2000;
// If the guest never taps, open on their behalf after this pause.
const AUTO_OPEN_MS = 1000;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SEAL_HAPTIC = [20, 60, 35];

function burstPetals(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const distance = 120 + Math.random() * 160;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance + 60,
      size: 7 + Math.random() * 9,
      rotate: Math.random() * 540 - 270,
      duration: 1.1 + Math.random() * 0.7,
    };
  });
}

export default function LandingGate({ onOpen, onBeginOpen }) {
  const [opening, setOpening] = useState(false);
  const openingRef = useRef(false);
  const timerRef = useRef(null);
  const autoOpenRef = useRef(null);
  const petals = useMemo(() => burstPetals(16), []);

  // Keep latest callbacks in refs so the mount-only auto-open timer never
  // closes over a stale onOpen from the first render.
  const onOpenRef = useRef(onOpen);
  const onBeginOpenRef = useRef(onBeginOpen);
  useEffect(() => {
    onOpenRef.current = onOpen;
    onBeginOpenRef.current = onBeginOpen;
  }, [onOpen, onBeginOpen]);

  const handleOpen = () => {
    if (openingRef.current) return;
    openingRef.current = true;
    clearTimeout(autoOpenRef.current);
    setOpening(true);
    document.body.classList.remove('gate-locked');

    // Music must start in this turn (user gesture). Never let it block the open.
    try {
      onBeginOpenRef.current?.();
    } catch {
      /* music failures must not strand the gate */
    }

    const reduced = prefersReducedMotion();
    if (!reduced) {
      try {
        navigator.vibrate?.(SEAL_HAPTIC);
      } catch {
        /* ignore */
      }
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        onOpenRef.current?.();
      } catch {
        /* ignore */
      }
    }, reduced ? 200 : SEQUENCE_MS);
  };

  useEffect(() => {
    document.body.classList.add('gate-locked');
    autoOpenRef.current = setTimeout(handleOpen, AUTO_OPEN_MS);
    return () => {
      document.body.classList.remove('gate-locked');
      clearTimeout(autoOpenRef.current);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only
  }, []);

  const doorHalf = (side) => (
    <motion.div
      className="relative h-full w-1/2 overflow-hidden"
      style={{ transformOrigin: side === 'left' ? 'left center' : 'right center' }}
      initial={{ x: 0, rotateY: 0 }}
      animate={
        opening
          ? { x: side === 'left' ? '-100%' : '100%', rotateY: side === 'left' ? 35 : -35 }
          : { x: 0, rotateY: 0 }
      }
      transition={{ duration: 1.6, delay: 0.35, ease: [0.7, 0, 0.2, 1] }}
    >
      <Picture
        image={IMAGES.doorCover}
        alt=""
        className={`absolute top-0 h-full w-[200%] max-w-none object-cover ${
          side === 'left' ? 'left-0' : 'right-0'
        }`}
        loading="eager"
        fetchPriority="high"
        sizes="440px"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <div
        className={`absolute top-0 h-full w-px bg-gold/60 ${
          side === 'left' ? 'right-0' : 'left-0'
        }`}
      />
    </motion.div>
  );

  return (
    <motion.section
      role="button"
      tabIndex={0}
      aria-label="Open the invitation"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      className="fixed inset-0 z-[99] mx-auto max-w-[440px] cursor-pointer overflow-hidden focus:outline-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="absolute inset-0 flex" style={{ perspective: 1200 }}>
        {doorHalf('left')}
        {doorHalf('right')}
      </div>

      {opening && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-tl-full rounded-br-full"
              style={{
                width: p.size,
                height: p.size * 0.7,
                background: 'linear-gradient(135deg, #f4c9d6, #b05f77)',
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: 1, rotate: p.rotate }}
              transition={{ duration: p.duration, delay: 0.25, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative h-28 w-28 translate-y-[25svh]">
          {['left', 'right'].map((side) => (
            <motion.span
              key={side}
              className="absolute inset-0 block"
              style={{
                clipPath: side === 'left' ? 'inset(-40% 50% -40% -40%)' : 'inset(-40% -40% -40% 50%)',
              }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={
                opening
                  ? {
                      x: side === 'left' ? -70 : 70,
                      y: 90,
                      rotate: side === 'left' ? -55 : 55,
                      opacity: 0,
                    }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }
              }
              transition={
                opening
                  ? { duration: 0.75, delay: 0.22, ease: 'easeIn' }
                  : { duration: 0.2 }
              }
            >
              <WaxSeal idPrefix={side} />
            </motion.span>
          ))}
        </div>

        {!opening && (
          <p className="mt-6 translate-y-[25svh] font-cinzel text-[11px] tracking-[0.28em] text-cream/90 drop-shadow">
            TAP TO OPEN
          </p>
        )}
      </div>
    </motion.section>
  );
}
