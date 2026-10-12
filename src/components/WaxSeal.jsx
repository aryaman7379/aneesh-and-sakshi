import { COUPLE, COVER } from '../content';

// A poured-and-stamped wax seal, drawn rather than photographed.
//
// Three passes do the work, and each maps to something real wax does:
//   * the outline is a circle pushed out of round by a fractal-noise
//     displacement map, with a few blobs tucked under its lower edge -- the
//     displacement smears them into the body, which is how the drips form;
//   * the surface is a second noise field run through diffuse lighting, so the
//     wax is matte and pitted rather than a flat gradient;
//   * the monogram is drawn last and unfiltered, because a die stamps a crisp
//     impression even when the wax around it is lumpy.
//
// Both halves of the breaking seal render this same component with a fixed
// noise seed, so they stay two pieces of one blob.
//
// `idPrefix` keeps the filter/gradient ids unique -- duplicate ids in one
// document all resolve to whichever came first, which would silently couple
// the two halves together.
export default function WaxSeal({ idPrefix }) {
  const id = (name) => `${idPrefix}-${name}`;

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        {/* Pushes the edge out of round. `scale` is in user units, so it is
            tied to the viewBox rather than the rendered size. */}
        <filter id={id('edge')} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves="3"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Matte, pitted wax. The lighting pass is clipped back to the shape it
            came from so it only ever brightens the seal itself. */}
        <filter id={id('surface')} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            seed="4"
            result="grain"
          />
          <feDiffuseLighting in="grain" lightingColor="#efe0cc" surfaceScale="2.9" result="lit">
            <feDistantLight azimuth="215" elevation="56" />
          </feDiffuseLighting>
          <feComposite in="lit" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Body colour: aged oxblood rather than bright sealing red. The
            painting behind is pale blush, so a saturated wax read as a sticker
            dropped on top of it; these stops are desaturated and close
            together, which keeps the blob quiet and lets the shape carry it. */}
        <radialGradient id={id('body')} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#6f2531" />
          <stop offset="52%" stopColor="#571a24" />
          <stop offset="100%" stopColor="#3a1017" />
        </radialGradient>

        {/* Coarse noise for the uneven colour of a poured pour -- wax cools in
            patches, so a single gradient reads as plastic. */}
        <filter id={id('mottle')} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028"
            numOctaves="2"
            seed="11"
            result="patches"
          />
          <feColorMatrix in="patches" type="saturate" values="0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>

        {/* Contact shadow on the painting underneath. */}
        <filter id={id('cast')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        {/* Barely-there bloom on the raised lip. Wax that has set is matte, so
            this is a hint of sheen, not a wet highlight. */}
        <radialGradient id={id('sheen')} cx="36%" cy="25%" r="44%">
          <stop offset="0%" stopColor="#e8d3b8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e8d3b8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sits under the blob and a few units low, so the seal looks pressed
          onto the paper rather than floating over it. */}
      <ellipse
        cx="103"
        cy="110"
        rx="71"
        ry="68"
        fill="rgba(74,44,36,0.3)"
        filter={`url(#${id('cast')})`}
      />

      {/* Everything inside this group shares one displacement, so the shading
          and the rim distort with the outline instead of sliding across it. */}
      <g filter={`url(#${id('edge')})`}>
        {/* Drips: read as part of the blob once displaced. */}
        <circle cx="78" cy="158" r="15" fill={`url(#${id('body')})`} />
        <circle cx="126" cy="154" r="11" fill={`url(#${id('body')})`} />

        <circle cx="100" cy="100" r="76" fill={`url(#${id('body')})`} />

        {/* Cooled-in-patches colour, then the fine grain over it. */}
        <g opacity="0.34" style={{ mixBlendMode: 'overlay' }} filter={`url(#${id('mottle')})`}>
          <circle cx="100" cy="100" r="76" fill="#fff" />
        </g>
        <g opacity="0.34" style={{ mixBlendMode: 'soft-light' }} filter={`url(#${id('surface')})`}>
          <circle cx="100" cy="100" r="76" fill="#fff" />
        </g>

        {/* Thick dark lip, then the catchlight on top of it. */}
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="rgba(46,16,21,0.34)"
          strokeWidth="13"
        />
        <circle cx="100" cy="100" r="76" fill={`url(#${id('sheen')})`} />

        {/* The groove the die's edge presses into the wax: a dark step with a
            warm highlight just outside it. */}
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="rgba(44,14,19,0.34)"
          strokeWidth="2.5"
        />
        <circle
          cx="100"
          cy="100"
          r="60.5"
          fill="none"
          stroke="rgba(226,204,170,0.14)"
          strokeWidth="1.2"
        />
      </g>

      {/* Stamped impression, drawn outside the displaced group so it stays
          crisp. Each line is a dark copy nudged down, then the lit copy over
          it -- the same trick as an embossed text-shadow.
          Both lines are sized to stay inside the die groove at r=58: the script
          ascenders clear its top, and the wordmark's tracking is kept tight
          enough that it does not run out over the lip. */}
      <g textAnchor="middle" fill="#d3b489">
        <text
          x="97"
          y="94"
          className="font-script"
          fontSize="45"
          fill="rgba(40,12,17,0.45)"
          transform="translate(0 1.6)"
        >
          {COUPLE.initials}
        </text>
        <text x="97" y="94" className="font-script" fontSize="45">
          {COUPLE.initials}
        </text>

        <text
          x="100"
          y="124"
          className="font-cinzel"
          fontSize="10"
          letterSpacing="2"
          fill="rgba(40,12,17,0.45)"
          transform="translate(0 1)"
        >
          {COVER.brand}
        </text>
        <text x="100" y="124" className="font-cinzel" fontSize="10" letterSpacing="2">
          {COVER.brand}
        </text>
      </g>
    </svg>
  );
}
