// One door's half of the silk ribbon tied across the cover, drawn as cloth
// rather than a ruled strip: it sags a little under tension, ripples, turns
// slightly away from the light where it twists (narrower and darker there), and
// gathers into creases as it runs into the knot. Colours are sampled from the
// saree in the cover art.
//
// Geometry is laid out for the left door (outer edge at x=0, knot at x=W); the
// right door mirrors it, with a different ripple phase so the two halves don't
// read as copies.
const W = 220;
const H = 64;
const KNOT_Y = 32;

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function cloth(phase) {
  const twist = (t) => Math.max(0, Math.sin(2 * Math.PI * (t * 1.6 + phase))) ** 2;
  const center = (t) =>
    KNOT_Y + 2.4 * Math.sin(Math.PI * t) + 0.9 * Math.sin(2 * Math.PI * (t * 2.3 + phase));
  // Full width out at the edge, drawn in by the twist, pinched at the knot.
  const width = (t) => 27 * (1 - 0.5 * smoothstep(0.7, 1, t)) * (1 - 0.16 * twist(t));

  const top = [];
  const bottom = [];
  const sheen = [];
  for (let x = 0; x <= W; x += 4) {
    const t = x / W;
    const c = center(t);
    const w = width(t);
    top.push([x, c - w / 2]);
    bottom.push([x, c + w / 2]);
    sheen.push([x, c - w * 0.17]);
  }
  const line = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y.toFixed(2)}`).join(' ');
  const inset = (pts, d) => pts.map(([x, y]) => [x, y + d]);

  // Light and shadow along the length: darker where the ribbon twists away,
  // and in the shadow of the knot.
  const shade = [];
  for (let i = 0; i <= 20; i += 1) {
    const t = i / 20;
    shade.push({
      offset: t,
      opacity: Math.min(0.75, 0.42 * twist(t) + 0.5 * smoothstep(0.78, 1, t)),
    });
  }

  // Creases fanning in to the knot.
  const creases = [-0.32, -0.05, 0.22, 0.4].map((k, i) => {
    const x0 = 140 + i * 14;
    const t0 = x0 / W;
    const y0 = center(t0) + k * width(t0);
    const y1 = KNOT_Y + k * 14;
    return `M${x0} ${y0.toFixed(2)} Q${(x0 + W) / 2} ${((y0 + y1) / 2 + 1.5).toFixed(2)} ${W} ${y1.toFixed(2)}`;
  });

  return {
    outline: `${line(top)} ${line([...bottom].reverse()).replace('M', 'L')} Z`,
    top: line(top),
    bottom: line(bottom),
    stitchTop: line(inset(top, 3.4)),
    stitchBottom: line(inset(bottom, -3.4)),
    sheen: line(sheen),
    shade,
    creases,
  };
}

const SIDES = { left: cloth(0.08), right: cloth(0.41) };

export default function RibbonBand({ side, animate = true }) {
  const g = SIDES[side];
  const id = (name) => `band-${side}-${name}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 top-[86%] h-16 w-full -translate-y-1/2 overflow-visible drop-shadow-[0_6px_6px_rgba(30,6,4,0.55)]"
      style={side === 'right' ? { scale: '-1 1' } : undefined}
      aria-hidden="true"
    >
      <defs>
        {/* Satin cross-section: dark at both edges, lit just above the middle. */}
        <linearGradient id={id('satin')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46140b" />
          <stop offset="0.14" stopColor="#851d1a" />
          <stop offset="0.34" stopColor="#c22f28" />
          <stop offset="0.5" stopColor="#ab2a22" />
          <stop offset="0.74" stopColor="#851d1a" />
          <stop offset="1" stopColor="#41100b" />
        </linearGradient>
        <linearGradient id={id('shade')} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
          {g.shade.map((s) => (
            <stop key={s.offset} offset={s.offset} stopColor="#2a0805" stopOpacity={s.opacity} />
          ))}
        </linearGradient>
        <linearGradient id={id('zari')} x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b86637" />
          <stop offset="0.2" stopColor="#f8c471" />
          <stop offset="0.45" stopColor="#cd7d4a" />
          <stop offset="0.7" stopColor="#e8b05b" />
          <stop offset="1" stopColor="#8a4a22" />
        </linearGradient>
        {/* A travelling glint along the cloth. */}
        <linearGradient id={id('glint')} x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd9a8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffd9a8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffd9a8" stopOpacity="0" />
          {animate && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values={`-80 0; ${W + 20} 0; ${W + 20} 0`}
              keyTimes="0; 0.45; 1"
              dur="3.4s"
              begin={side === 'left' ? '0.8s' : '1.4s'}
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
        <pattern id={id('weave')} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <line x1="0" y1="0" x2="0" y2="2.6" stroke="#000" strokeWidth="0.55" opacity="0.13" />
          <line x1="1.3" y1="0" x2="1.3" y2="2.6" stroke="#ffd9a8" strokeWidth="0.35" opacity="0.06" />
        </pattern>
        <clipPath id={id('clip')}>
          <path d={g.outline} />
        </clipPath>
        <filter id={id('soft')} x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <path d={g.outline} fill={`url(#${id('satin')})`} />
      <g clipPath={`url(#${id('clip')})`}>
        {/* Satin sheen riding the curve of the cloth. */}
        <path d={g.sheen} fill="none" stroke="#d8553f" strokeWidth="5" opacity="0.55" filter={`url(#${id('soft')})`} />
        <path d={g.sheen} fill="none" stroke="#f2a27f" strokeWidth="1.6" opacity="0.35" filter={`url(#${id('soft')})`} />
        <rect width={W} height={H} fill={`url(#${id('weave')})`} />
        <rect width={W} height={H} fill={`url(#${id('shade')})`} />
        {g.creases.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#2a0805" strokeWidth="1.3" opacity="0.5" />
            <path d={d} fill="none" stroke="#e9806a" strokeWidth="0.7" opacity="0.28" transform="translate(0 1.3)" />
          </g>
        ))}
        {animate && <rect width={W} height={H} fill={`url(#${id('glint')})`} style={{ mixBlendMode: 'screen' }} />}
      </g>

      {/* Zari borders and the stitch line just inside each. */}
      <path d={g.top} fill="none" stroke={`url(#${id('zari')})`} strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
      <path d={g.bottom} fill="none" stroke={`url(#${id('zari')})`} strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
      <path d={g.stitchTop} fill="none" stroke="#e8b05b" strokeWidth="0.8" strokeDasharray="2.5 2" opacity="0.65" vectorEffect="non-scaling-stroke" clipPath={`url(#${id('clip')})`} />
      <path d={g.stitchBottom} fill="none" stroke="#e8b05b" strokeWidth="0.8" strokeDasharray="2.5 2" opacity="0.65" vectorEffect="non-scaling-stroke" clipPath={`url(#${id('clip')})`} />
    </svg>
  );
}
