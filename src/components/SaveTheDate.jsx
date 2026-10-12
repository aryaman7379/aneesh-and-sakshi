import { useEffect, useMemo, useRef, useState } from 'react';
import {
  COUPLE,
  VENUE,
  WEDDING_DATE,
  buildInviteIcsEvents,
  downloadIcs,
} from '../content';
import { getRemaining } from '../countdown';
import { CalendarIcon, OrnamentDivider } from './Motifs';
import MandapIllustration from './MandapIllustration';

const GOLD_DUST = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 17) % 88)}%`,
  size: 2 + (i % 4),
  duration: 7 + (i % 6),
  delay: (i * 0.45) % 8,
}));

function ScallopTransition() {
  return (
    <svg
      className="std-scallop pointer-events-none absolute inset-x-0 top-0 h-10 w-full text-cream"
      viewBox="0 0 440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 0 H440 V12
           C420 12 420 34 400 34
           C380 34 380 12 360 12
           C340 12 340 34 320 34
           C300 34 300 12 280 12
           C260 12 260 34 240 34
           C220 34 220 12 200 12
           C180 12 180 34 160 34
           C140 34 140 12 120 12
           C100 12 100 34 80 34
           C60 34 60 12 40 12
           C20 12 20 34 0 34 Z"
      />
    </svg>
  );
}

function MandalaBackdrop() {
  return (
    <div
      className="std-mandala-wrap pointer-events-none absolute left-1/2 top-[28%] h-[min(92vw,420px)] w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <svg className="std-mandala h-full w-full text-gold" viewBox="0 0 200 200">
        <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.9">
          <circle cx="100" cy="100" r="78" />
          <circle cx="100" cy="100" r="58" />
          <circle cx="100" cy="100" r="38" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * Math.PI) / 6;
            const x2 = 100 + Math.cos(a) * 78;
            const y2 = 100 + Math.sin(a) * 78;
            return <line key={i} x1="100" y1="100" x2={x2} y2={y2} />;
          })}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4 + Math.PI / 8;
            const cx = 100 + Math.cos(a) * 48;
            const cy = 100 + Math.sin(a) * 48;
            return <circle key={`p-${i}`} cx={cx} cy={cy} r="10" />;
          })}
        </g>
      </svg>
    </div>
  );
}

/** initSaveTheDate — entrance + pause off-screen loops. */
function initSaveTheDate(section) {
  if (!section) return () => {};

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const activate = () => {
    // Double rAF so the dashed strokes paint once before the draw animation runs.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        section.classList.add('in', 'std-active');
      });
    });
  };

  if (reduced) {
    section.classList.add('in', 'std-active');
    return () => {};
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        activate();
        // Keep observing only to toggle std-active for loop pause/resume.
      } else {
        section.classList.remove('std-active');
      }
    },
    // Fire as soon as the section peeks into view (tall section would never
    // hit a high threshold until almost fully scrolled).
    { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
  );
  io.observe(section);

  // Already on screen (e.g. intro auto-scroll landed near the bottom).
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < vh * 0.92 && rect.bottom > vh * 0.08) {
    activate();
  }

  return () => io.disconnect();
}

function buildIcs() {
  downloadIcs(buildInviteIcsEvents(), 'aneesh-sakshi-wedding.ics');
}

export default function SaveTheDate() {
  const sectionRef = useRef(null);
  const [daysLeft, setDaysLeft] = useState(() => getRemaining()?.days ?? null);

  useEffect(() => initSaveTheDate(sectionRef.current), []);

  useEffect(() => {
    const id = setInterval(() => {
      const next = getRemaining();
      setDaysLeft(next ? next.days : null);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const dust = useMemo(() => GOLD_DUST, []);
  const tagline = COUPLE.tagline.join(' ');

  return (
    <section ref={sectionRef} className="std-section relative w-full overflow-hidden text-center">
      <ScallopTransition />

      {/* Pattern + glow layers */}
      <div className="std-jali pointer-events-none absolute inset-0" aria-hidden="true" />
      <MandalaBackdrop />
      <div className="std-glow pointer-events-none absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />

      {/* Gold dust */}
      <div className="std-dust pointer-events-none absolute inset-0" aria-hidden="true">
        {dust.map((p) => (
          <span
            key={p.id}
            className="std-dust-dot absolute bottom-[8%] rounded-full bg-gold"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-[1] mx-auto flex max-w-md flex-col items-center px-6 pb-[max(4.5rem,env(safe-area-inset-bottom))] pt-20">
        <p className="std-eyebrow font-script text-[3.35rem] leading-[1.25] tracking-wide text-cream sm:text-6xl">
          Save the Date
        </p>

        <div className="std-illust-wrap mt-6 w-full max-w-[320px] text-gold">
          <MandapIllustration className="mx-auto h-auto w-full" />
        </div>

        <p className="std-tagline mt-6 max-w-[20rem] font-cormorant text-lg italic leading-relaxed text-cream">
          {tagline}
        </p>

        <div className="std-date mt-7 flex items-baseline justify-center gap-2 font-cinzel text-[2.65rem] leading-none tracking-wide text-cream sm:text-5xl">
          <span className="std-date-part shimmer" style={{ '--d': '0s' }}>
            10
          </span>
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span className="std-date-part shimmer" style={{ '--d': '0.12s' }}>
            12
          </span>
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span className="std-date-part shimmer" style={{ '--d': '0.24s' }}>
            2026
          </span>
        </div>

        <p className="std-meta mt-3 font-cinzel text-[13px] tracking-[0.2em] text-[#f0cf94] uppercase">
          {WEDDING_DATE.day}
        </p>
        <p className="std-meta mt-2 max-w-[18rem] font-cinzel text-xs leading-relaxed tracking-[0.14em] text-cream uppercase">
          {VENUE.name}
        </p>

        <div className="mt-5 flex justify-center">
          <OrnamentDivider className="std-divider h-4 w-40 text-gold" />
        </div>

        <p className="std-mini-count mt-5 font-cinzel text-sm tracking-[0.16em] text-[#f3d6a0]">
          {daysLeft == null
            ? 'THE DAY IS HERE'
            : daysLeft === 0
              ? 'TODAY WE BEGIN OUR FOREVER'
              : `${daysLeft} DAY${daysLeft === 1 ? '' : 'S'} TO GO`}
        </p>

        <div className="std-actions mt-8 flex w-full justify-center">
          <button
            type="button"
            onClick={buildIcs}
            className="std-btn inline-flex items-center justify-center gap-2 rounded-full border border-gold/55 bg-cream/95 px-5 py-3.5 font-cinzel text-[11px] tracking-[0.14em] text-maroon shadow-[0_6px_16px_rgba(0,0,0,0.22)]"
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            ADD TO CALENDAR
          </button>
        </div>

        <p className="mt-10 font-cormorant text-lg italic leading-snug text-cream">
          We can&apos;t wait to celebrate with you
        </p>
        <p className="mt-2.5 font-cinzel text-xs tracking-[0.2em] text-[#f0cf94] uppercase">
          With love, the Gupta &amp; Marodia families
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3">
          <p className="font-script text-2xl leading-[1.35] text-gold">
            {COUPLE.partner1} &amp; {COUPLE.partner2}
          </p>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
