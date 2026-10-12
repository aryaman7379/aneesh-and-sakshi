// Values shared by the ornament set and the sections that frame themselves with
// it. Kept out of Ornaments.jsx so that file only exports components -- mixing
// the two breaks Fast Refresh.

export const GOLD = 'var(--color-gold)';

// The paper both framed sections stand on: warm blush pooling in the corners,
// the way the painted sections either side of them are lit.
export const PAPER = {
  backgroundImage: [
    'radial-gradient(120% 60% at 50% 0%, rgba(244,201,214,0.34) 0%, rgba(244,201,214,0) 60%)',
    'radial-gradient(120% 60% at 50% 100%, rgba(244,201,214,0.3) 0%, rgba(244,201,214,0) 60%)',
    'radial-gradient(80% 50% at 0% 40%, rgba(196,157,104,0.18) 0%, rgba(196,157,104,0) 70%)',
    'radial-gradient(80% 50% at 100% 60%, rgba(196,157,104,0.18) 0%, rgba(196,157,104,0) 70%)',
    'linear-gradient(180deg, #fffcf7 0%, #fdf3e7 55%, #fffbf2 100%)',
  ].join(', '),
};
