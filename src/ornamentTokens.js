// Values shared by the ornament set and the sections that frame themselves with
// it. Kept out of Ornaments.jsx so that file only exports components -- mixing
// the two breaks Fast Refresh.

export const GOLD = 'var(--color-gold)';

// The paper both framed sections stand on: warm zari-gold pooling in the corners,
// the way the painted sections either side of them are lit.
export const PAPER = {
  backgroundImage: [
    'radial-gradient(120% 60% at 50% 0%, rgba(232,176,91,0.34) 0%, rgba(232,176,91,0) 60%)',
    'radial-gradient(120% 60% at 50% 100%, rgba(232,176,91,0.3) 0%, rgba(232,176,91,0) 60%)',
    'radial-gradient(80% 50% at 0% 40%, rgba(201,146,69,0.18) 0%, rgba(201,146,69,0) 70%)',
    'radial-gradient(80% 50% at 100% 60%, rgba(201,146,69,0.18) 0%, rgba(201,146,69,0) 70%)',
    'linear-gradient(180deg, #fefaf2 0%, #f8ead3 55%, #fdf6e9 100%)',
  ].join(', '),
};
