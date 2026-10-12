// Decorative falling petals, purely CSS-driven so it never taxes the main
// thread. Varied size / blur / speed so near petals read larger and sharp,
// far ones softer and slower. Alternates deep-red rose petals and gold foil
// flakes -- the same shower the cover lets fall as its doors open.
const PETAL_COUNT = 12;

function seededPetals(count) {
  return Array.from({ length: count }, (_, i) => {
    const left = Math.round(((i * 37) % 100) + Math.random() * 8);
    const depth = Math.random(); // 0 = far, 1 = near
    const size = 6 + Math.round(depth * 12);
    const duration = 14 - depth * 5 + Math.random() * 4;
    const delay = Math.random() * 12;
    const blur = (1 - depth) * 2.2;
    const opacity = 0.35 + depth * 0.55;
    const drift = Math.random() > 0.5 ? 'animate-petal-right' : 'animate-petal-left';
    const petal = i % 3 !== 2;
    return { id: i, petal, left, size: petal ? size : size * 0.55, duration, delay, blur, opacity, drift };
  });
}

export default function Petals() {
  const petals = seededPetals(PETAL_COUNT);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.petal ? 'rounded-tl-full rounded-br-full' : 'rounded-[1px]'} ${p.drift}`}
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.petal ? p.size * 0.72 : p.size,
            background: p.petal
              ? 'linear-gradient(135deg, #c22f28, #6e1a12)'
              : 'linear-gradient(135deg, #fff1c4, #e8b05b 50%, #b86637)',
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
