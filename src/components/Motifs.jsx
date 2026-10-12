// Inline SVG motifs used across the invite. Kept decorative (aria-hidden)
// unless an interactive control wraps them.

import { GOLD } from '../ornamentTokens';

/** Map pin — replaces the location emoji. */
export function MapPin({ className = 'h-3.5 w-3.5', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.2 7-12.2A7 7 0 0 0 5 9.8C5 14.8 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.18"
      />
      <circle cx="12" cy="9.5" r="2.4" fill={color} />
    </svg>
  );
}

/** Calendar glyph for Add to Calendar pills. */
export function CalendarIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Directions / arrow glyph. */
export function DirectionsIcon({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3 21 12l-9 9-9-9 9-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Speaker for the music toggle. */
export function SpeakerIcon({ muted = false, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 10.5v3a1 1 0 0 0 1 1h2.4L12 18.2V5.8L7.4 9.5H5a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {!muted && (
        <>
          <path d="M15.2 9.2a3.2 3.2 0 0 1 0 5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17.4 7a5.6 5.6 0 0 1 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
      {muted && (
        <path d="M15 10.5 19 14.5M19 10.5 15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

/**
 * Diya with a soft flickering flame. Size via className (e.g. h-8 w-8).
 * Animation lives in CSS (.diya-flame) so reduced-motion can kill it once.
 */
export function Diya({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="34" rx="16" ry="6" fill="#8f3324" opacity="0.35" />
      <path
        d="M8 30c2 6 10 9 16 9s14-3 16-9c-3 2-9 3-16 3s-13-1-16-3Z"
        fill="#93622c"
        stroke="#c99245"
        strokeWidth="1"
      />
      <path d="M12 29c1.5-2 6-3.5 12-3.5S34.5 27 36 29" fill="none" stroke="#c99245" strokeWidth="0.8" opacity="0.7" />
      <g className="diya-flame" style={{ transformOrigin: '24px 22px' }}>
        <path
          d="M24 8c4 6 6 9 6 12a6 6 0 1 1-12 0c0-3 2-6 6-12Z"
          fill="#f3c983"
          opacity="0.95"
        />
        <path
          d="M24 14c2 3.2 3.2 5 3.2 7a3.2 3.2 0 1 1-6.4 0c0-2 1.2-3.8 3.2-7Z"
          fill="#c99245"
        />
      </g>
    </svg>
  );
}

/** Soft marigold strand that hangs and sways from the top of the hero. */
export function Garland({ className = '', delay = 0, flip = false }) {
  return (
    <svg
      viewBox="0 0 40 120"
      className={`garland-sway pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}s`, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path
        d="M20 0 C18 20 28 35 16 55 C8 70 24 85 18 110"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.2"
        opacity="0.55"
      />
      {[18, 36, 54, 72, 90].map((y, i) => (
        <g key={y} transform={`translate(20 ${y})`}>
          <circle r="5" fill={i % 2 ? '#c99245' : '#c8604a'} opacity="0.85" />
          <circle r="2" fill="#fdf6e9" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Ornamental divider: two lines flanking a diamond with a centre dot.
 * Strokes draw in when an ancestor has `.in` (see .ornament-draw in CSS).
 */
export function OrnamentDivider({ className = 'h-4 w-40' }) {
  return (
    <svg viewBox="0 0 160 16" className={`ornament-draw ${className}`} aria-hidden="true">
      <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round">
        <path className="ornament-stroke" d="M8 8 H62" pathLength="1" />
        <path className="ornament-stroke" d="M98 8 H152" pathLength="1" />
        <path className="ornament-stroke" d="M80 2 L88 8 L80 14 L72 8 Z" pathLength="1" />
      </g>
      <circle cx="80" cy="8" r="1.8" fill={GOLD} className="ornament-dot" />
    </svg>
  );
}
