// Shared gold ornament set. The invitation card and the RSVP form both sit in
// one of these frames, so the two sections read as pages of the same card.
//
// Every piece takes an `id` prefix where it needs one: SVG ids are
// document-global, and two sections rendering the same hardcoded id would make
// the second one silently reuse the first one's pattern.

import { GOLD } from '../ornamentTokens';

// A jaali lattice, laid over the paper at a whisper so it reads as woven into
// it. Printed royal cards carry the same trick: pattern you notice only once
// you look for it.
export function Jaali({ id }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id={`${id}-jaali`} width="38" height="38" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.14">
            <path d="M19 3 C27 9 27 18 19 24 C11 18 11 9 19 3 Z" />
            <path d="M0 22 C6 28 6 33 0 38" />
            <path d="M38 22 C32 28 32 33 38 38" />
            <circle cx="19" cy="13" r="1.3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-jaali)`} />
    </svg>
  );
}

// An ogee panel, echoing the arch painted into the hero and the cover art.
// `preserveAspectRatio="none"` lets the curves take whatever height the content
// needs, and `vector-effect` keeps the rules hairline while they stretch.
const OUTER =
  'M3,30 C3,17 17,15 27,11 C37,7 44,3 50,3 C56,3 63,7 73,11 C83,15 97,17 97,30 ' +
  'L97,270 C97,283 83,285 73,289 C63,293 56,297 50,297 C44,297 37,293 27,289 ' +
  'C17,285 3,283 3,270 Z';
const INNER =
  'M7,32 C7,21 20,19 29,15 C38,11 45,7 50,7 C55,7 62,11 71,15 C80,19 93,21 93,32 ' +
  'L93,268 C93,279 80,281 71,285 C62,289 55,293 50,293 C45,293 38,289 29,285 ' +
  'C20,281 7,279 7,268 Z';

export function Cartouche({ fill = 'rgba(255,253,248,0.82)' }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 300"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={OUTER} fill={fill} stroke={GOLD} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <path
        d={INNER}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.7"
        strokeOpacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Paisley: the motif that carries the corners. Drawn once, then flipped into
// each corner so the four read as one set.
export function Paisley({ className, flipX = false, flipY = false }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.85"
        transform={`translate(${flipX ? 44 : 0} ${flipY ? 44 : 0}) scale(${flipX ? -1 : 1} ${
          flipY ? -1 : 1
        })`}
      >
        <path d="M4 40 C4 22 12 6 30 4 C40 3 42 12 36 17 C31 21 24 19 24 13" />
        <path d="M10 38 C11 26 17 15 29 12" strokeWidth="0.7" opacity="0.7" />
        <path d="M4 40 C10 40 14 36 15 31" strokeWidth="0.7" opacity="0.7" />
        <circle cx="29" cy="11" r="1.4" fill={GOLD} stroke="none" />
      </g>
    </svg>
  );
}

// Eight-petal rosette, set where the frame's straight sides begin.
export function Rosette({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g stroke={GOLD} fill="none" strokeWidth="0.9" opacity="0.9">
        {[0, 45, 90, 135].map((deg) => (
          <ellipse key={deg} cx="12" cy="12" rx="9" ry="3.4" transform={`rotate(${deg} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="1.8" fill={GOLD} stroke="none" />
      </g>
    </svg>
  );
}

// Ornate rule: a gold line running out from a centre diamond into two paisley
// hooks, the way the divider is cut on a printed card.
export function Divider({ className }) {
  return (
    <svg viewBox="0 0 160 16" className={className} aria-hidden="true">
      <g fill="none" stroke={GOLD} strokeWidth="0.9" strokeLinecap="round">
        <path d="M6 8 H62" />
        <path d="M98 8 H154" />
        <path d="M6 8 C10 8 12 5 12 3" strokeWidth="0.7" />
        <path d="M154 8 C150 8 148 5 148 3" strokeWidth="0.7" />
        <path d="M80 1.5 L88 8 L80 14.5 L72 8 Z" />
        <path d="M66 8 H72" />
        <path d="M88 8 H94" />
      </g>
      <circle cx="80" cy="8" r="1.6" fill={GOLD} />
    </svg>
  );
}
