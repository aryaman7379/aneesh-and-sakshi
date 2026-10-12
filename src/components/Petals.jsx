// Decorative falling petals, purely CSS-driven so it never taxes the main
// thread. Varied size / blur / speed so near petals read larger and sharp,
// far ones softer and slower.
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
    return { id: i, left, size, duration, delay, blur, opacity, drift };
  });
}

export default function Petals() {
  const petals = seededPetals(PETAL_COUNT);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-tl-full rounded-br-full ${p.drift}`}
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: p.size,
            height: p.size * 0.7,
            background: 'linear-gradient(135deg, #f4c9d6, #b05f77)',
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
