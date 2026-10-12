import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../content';
import Picture from './Picture';
import RibbonBand from './RibbonBand';
import RibbonBow from './RibbonBow';

// How long the full untie-ribbon → doors-part sequence runs before the
// invitation underneath is revealed.
const SEQUENCE_MS = 2200;
// If the guest never taps, open on their behalf after this pause.
const AUTO_OPEN_MS = 2500;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const UNTIE_HAPTIC = [20, 60, 35];

// What falls when the doors open: deep-red rose petals and flakes of gold
// foil, the saree's two colours. Fixed values so every opening looks the same.
const SHOWER = Array.from({ length: 30 }, (_, i) => {
  const petal = i % 2 === 0;
  return {
    id: i,
    petal,
    left: `${(i * 41 + 7) % 100}%`,
    size: petal ? 11 + (i % 4) * 2.5 : 5 + (i % 3) * 2,
    sway: (i % 2 ? 1 : -1) * (18 + (i % 5) * 9),
    spin: (i % 2 ? 1 : -1) * (240 + (i % 4) * 90),
    duration: 1.7 + (i % 6) * 0.15,
    delay: 0.15 + ((i * 0.07) % 0.75),
  };
});

// Gold motes drifting up over the cover while it waits. Fixed positions so the
// cover renders the same every time.
const SPARKLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 37) % 92)}%`,
  top: `${30 + ((i * 53) % 65)}%`,
  size: 2 + (i % 3) * 1.5,
  duration: 3.2 + (i % 5) * 0.6,
  delay: (i * 0.23) % 2.4,
}));

export default function LandingGate({ onOpen, onBeginOpen }) {
  const [opening, setOpening] = useState(false);
  const openingRef = useRef(false);
  const timerRef = useRef(null);
  const autoOpenRef = useRef(null);
  const reducedMotion = useMemo(prefersReducedMotion, []);

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
        navigator.vibrate?.(UNTIE_HAPTIC);
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
      transition={{ duration: 1.6, delay: 0.45, ease: [0.7, 0, 0.2, 1] }}
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
      {/* This door's half of the silk ribbon tied across the cover; it swings
          away with the door once the bow is undone. */}
      <RibbonBand side={side} animate={!reducedMotion} />
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
      {/* The artwork eases in from a slight zoom and a warm haze as the page loads. */}
      <motion.div
        className="absolute inset-0 flex"
        style={{ perspective: 1200 }}
        initial={reducedMotion ? false : { scale: 1.12, opacity: 0, filter: 'brightness(1.35) blur(3px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'brightness(1) blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {doorHalf('left')}
        {doorHalf('right')}
      </motion.div>

      {/* A soft gold glow along the seam where the doors will part. */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f6d58e]/35 to-transparent mix-blend-screen"
          initial={{ opacity: 0, scaleY: 0.2 }}
          animate={opening ? { opacity: [0.9, 0], scaleY: 1 } : { opacity: [0, 0.8, 0.5], scaleY: 1 }}
          transition={{ duration: opening ? 0.6 : 1.2, ease: 'easeOut' }}
        />
      )}

      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {SPARKLES.map((s) => (
            <motion.span
              key={s.id}
              className="absolute rounded-full bg-[#f6d58e] shadow-[0_0_6px_2px_rgba(246,213,142,0.7)]"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -90, scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}

      {opening && !reducedMotion && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {SHOWER.map((p) => (
            <motion.span
              key={p.id}
              className={`absolute -top-6 block ${
                p.petal
                  ? 'rounded-tl-full rounded-br-full bg-gradient-to-br from-[#c0262f] to-[#6e0c14] shadow-[0_1px_3px_rgba(0,0,0,0.35)]'
                  : 'rounded-[1px] bg-gradient-to-br from-[#fff1c4] via-[#e2bd68] to-[#9c7230]'
              }`}
              style={{ left: p.left, width: p.size, height: p.petal ? p.size * 0.75 : p.size }}
              initial={{ y: 0, x: 0, rotate: 0, rotateX: 0, opacity: 0 }}
              animate={{
                y: '110svh',
                x: [0, p.sway, -p.sway * 0.6, p.sway * 0.4],
                rotate: p.spin,
                rotateX: p.petal ? 0 : 720,
                opacity: [0, 1, 1, 0.85],
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: [0.3, 0, 0.6, 1] }}
            />
          ))}
        </div>
      )}

      {/* The bow sits on the seam, over the ribbon (86% down the cover, below the hands). */}
      <div className="pointer-events-none absolute left-1/2 top-[86%] h-[156px] w-52 -translate-x-1/2 -translate-y-[39%] drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
        <RibbonBow untied={opening} />
      </div>

      {!opening && (
        <p className="absolute inset-x-0 top-[calc(86%-5.75rem)] text-center font-cinzel text-[11px] tracking-[0.28em] text-cream/90 drop-shadow">
          TAP TO UNTIE
        </p>
      )}
    </motion.section>
  );
}
