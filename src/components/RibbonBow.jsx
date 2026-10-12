import { motion } from 'framer-motion';
import { COUPLE } from '../content';

// The silk bow that ties the cover's doors shut: a red satin ribbon with gold
// zari edges, matching the saree in the artwork, and a gold medallion carrying
// the monogram pinned over the knot. `untied` plays the opening: the loops
// slacken and fall away, the tails drop, and the medallion flares and fades.
//
// Drawn for the left side only; the right side is the same art mirrored about
// the knot (x = 120).
const MIRROR = 'translate(240 0) scale(-1 1)';
const ZARI = 'url(#zari-edge)';
const EASE_IN = [0.55, 0, 0.75, 0.2];

// Fine woven texture laid over every satin surface.
const WEAVE = 'url(#weave)';

function Loop({ side, untied }) {
  const flip = side === 'left' ? 1 : -1;
  return (
    <motion.g
      style={{ transformOrigin: '120px 70px' }}
      initial={false}
      animate={
        untied
          ? { rotate: -38 * flip, x: -50 * flip, y: 38, opacity: 0, scale: 0.7 }
          : { rotate: 0, x: 0, y: 0, opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.7, ease: EASE_IN }}
    >
      <g transform={side === 'left' ? undefined : MIRROR}>
        {/* Outer face of the folded loop. */}
        <path
          d="M112 63 C92 38 50 20 28 33 C12 43 15 75 35 87 C57 101 96 89 112 78 Z"
          fill="url(#satin-loop)"
        />
        <path
          d="M112 63 C92 38 50 20 28 33 C12 43 15 75 35 87 C57 101 96 89 112 78 Z"
          fill={WEAVE}
        />
        {/* The inside of the loop, seen through its open end. */}
        <path
          d="M38 47 C27 55 29 72 40 79 C52 86 69 81 78 73 C67 66 53 53 38 47 Z"
          fill="url(#satin-inner)"
        />
        {/* Creases where the ribbon gathers into the knot. */}
        <path d="M112 66 C97 58 81 55 64 59" fill="none" stroke="#2a0805" strokeWidth="1.6" opacity="0.55" />
        <path d="M112 71 C99 69 86 69 74 72" fill="none" stroke="#2a0805" strokeWidth="1.1" opacity="0.4" />
        <path d="M112 75 C98 78 84 80 70 78" fill="none" stroke="#e9806a" strokeWidth="1" opacity="0.35" />
        {/* Satin sheen along the top of the loop. */}
        <path
          d="M102 52 C86 38 58 28 38 35"
          fill="none"
          stroke="#e9806a"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.4"
          filter="url(#soften)"
        />
        {/* Zari edge: gold thread outline with a dark inner line for depth. */}
        <path
          d="M112 63 C92 38 50 20 28 33 C12 43 15 75 35 87 C57 101 96 89 112 78"
          fill="none"
          stroke={ZARI}
          strokeWidth="3"
        />
        <path
          d="M110 65 C91 42 52 25 31 36 C17 45 20 73 38 84 C58 96 94 86 110 76"
          fill="none"
          stroke="#41100b"
          strokeWidth="0.7"
          opacity="0.6"
        />
      </g>
    </motion.g>
  );
}

function Tail({ side, untied }) {
  const flip = side === 'left' ? 1 : -1;
  return (
    <motion.g
      style={{ transformOrigin: '120px 78px' }}
      initial={false}
      animate={
        untied ? { y: 130, rotate: 30 * flip, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }
      }
      transition={{ duration: 0.85, delay: 0.1, ease: EASE_IN }}
    >
      <g transform={side === 'left' ? undefined : MIRROR}>
        {/* Upper run of the tail, face side out. */}
        <path
          d="M110 80 C104 100 94 116 82 132 L99 141 C109 122 116 102 121 84 Z"
          fill="url(#satin-tail)"
        />
        <path d="M110 80 C104 100 94 116 82 132 L99 141 C109 122 116 102 121 84 Z" fill={WEAVE} />
        {/* Below the twist the darker back of the ribbon shows, ending in a
            swallowtail cut. */}
        <path
          d="M82 132 C76 142 69 153 60 168 L72 162 L76 177 C85 162 92 151 99 141 Z"
          fill="url(#satin-back)"
        />
        <path d="M84 133 L97 140" stroke="#2a0407" strokeWidth="1.4" opacity="0.6" />
        <path d="M113 86 C108 104 100 118 91 132" fill="none" stroke="#e9806a" strokeWidth="2" opacity="0.35" filter="url(#soften)" />
        <path
          d="M110 80 C104 100 94 116 82 132 C76 142 69 153 60 168 L72 162 L76 177 C85 162 92 151 99 141 C109 122 116 102 121 84"
          fill="none"
          stroke={ZARI}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </g>
    </motion.g>
  );
}

// Beads around the medallion's rim.
const BEADS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return { id: i, x: 120 + Math.cos(a) * 19.2, y: 70 + Math.sin(a) * 19.2 };
});

export default function RibbonBow({ untied }) {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="satin-loop" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#6a1d13" />
          <stop offset="0.22" stopColor="#ab2a22" />
          <stop offset="0.36" stopColor="#c8402f" />
          <stop offset="0.52" stopColor="#9b2120" />
          <stop offset="0.8" stopColor="#851d1a" />
          <stop offset="1" stopColor="#46140b" />
        </linearGradient>
        <linearGradient id="satin-inner" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a0805" />
          <stop offset="0.6" stopColor="#5a160e" />
          <stop offset="1" stopColor="#851d1a" />
        </linearGradient>
        <linearGradient id="satin-tail" x1="1" y1="0" x2="0" y2="0.3">
          <stop offset="0" stopColor="#5a160e" />
          <stop offset="0.35" stopColor="#c22f28" />
          <stop offset="0.6" stopColor="#9b2120" />
          <stop offset="1" stopColor="#5a160e" />
        </linearGradient>
        <linearGradient id="satin-back" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0805" />
          <stop offset="0.5" stopColor="#6a1d13" />
          <stop offset="1" stopColor="#41100b" />
        </linearGradient>
        <linearGradient id="satin-knot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6a1d13" />
          <stop offset="0.3" stopColor="#c22f28" />
          <stop offset="0.55" stopColor="#9b2120" />
          <stop offset="1" stopColor="#41100b" />
        </linearGradient>
        <linearGradient id="zari-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8c471" />
          <stop offset="0.3" stopColor="#cd7d4a" />
          <stop offset="0.55" stopColor="#e8b05b" />
          <stop offset="0.8" stopColor="#b86637" />
          <stop offset="1" stopColor="#e8b05b" />
        </linearGradient>
        <radialGradient id="medallion-rim" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff4cf" />
          <stop offset="0.4" stopColor="#e6c36f" />
          <stop offset="0.8" stopColor="#a87b33" />
          <stop offset="1" stopColor="#7a5524" />
        </radialGradient>
        <radialGradient id="medallion-face" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#f8e2a6" />
          <stop offset="0.6" stopColor="#d4ab58" />
          <stop offset="1" stopColor="#a87b33" />
        </radialGradient>
        <pattern id="weave" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="3" height="3" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="3" stroke="#000" strokeWidth="0.6" opacity="0.12" />
          <line x1="1.5" y1="0" x2="1.5" y2="3" stroke="#fff" strokeWidth="0.4" opacity="0.07" />
        </pattern>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id="lift" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#1a0306" floodOpacity="0.55" />
        </filter>
      </defs>

      <g filter="url(#lift)">
        <Tail side="left" untied={untied} />
        <Tail side="right" untied={untied} />
      </g>
      <g filter="url(#lift)">
        <Loop side="left" untied={untied} />
        <Loop side="right" untied={untied} />
      </g>

      {/* The wrapped knot, with the monogram medallion pinned over it. */}
      <motion.g
        style={{ transformOrigin: '120px 70px' }}
        initial={false}
        animate={untied ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', times: [0, 0.35, 1] }}
        filter="url(#lift)"
      >
        <path
          d="M105 54 C112 50 128 50 135 54 C139 63 139 78 135 87 C128 91 112 91 105 87 C101 78 101 63 105 54 Z"
          fill="url(#satin-knot)"
          stroke={ZARI}
          strokeWidth="2"
        />
        <path d="M105 54 C112 50 128 50 135 54 C139 63 139 78 135 87 C128 91 112 91 105 87 C101 78 101 63 105 54 Z" fill={WEAVE} />

        <circle cx="120" cy="70" r="22.5" fill="url(#medallion-rim)" stroke="#6b4a1e" strokeWidth="0.8" />
        {BEADS.map((b) => (
          <circle key={b.id} cx={b.x} cy={b.y} r="1.25" fill="#fff1c4" stroke="#8a6224" strokeWidth="0.4" />
        ))}
        <circle cx="120" cy="70" r="16.5" fill="url(#medallion-face)" stroke="#7a5524" strokeWidth="0.9" />
        <circle cx="120" cy="70" r="14.8" fill="none" stroke="#fff1c4" strokeWidth="0.5" opacity="0.6" />
        {/* Engraved monogram: a dark copy nudged down under the lit one. */}
        <text x="119" y="78" textAnchor="middle" className="font-script" fontSize="21" fill="#4a2a0c" opacity="0.55" transform="translate(0 1)">
          {COUPLE.initials}
        </text>
        <text x="119" y="78" textAnchor="middle" className="font-script" fontSize="21" fill="#611522">
          {COUPLE.initials}
        </text>
        {/* Light catching the top of the rim. */}
        <path d="M104 62 A17 17 0 0 1 128 53" fill="none" stroke="#fffaf0" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" filter="url(#soften)" />
      </motion.g>
    </svg>
  );
}
