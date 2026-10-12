import { VENUE } from '../content';
import { DirectionsIcon, MapPin, OrnamentDivider } from './Motifs';
import { useReveal } from '../useReveal';
import { PAPER } from '../ornamentTokens';

export default function Location() {
  const headingRef = useReveal({ threshold: 0.08, rootMargin: '0px 0px 100px 0px' });
  const cardRef = useReveal({ threshold: 0.05, rootMargin: '0px 0px 120px 0px' });

  return (
    <section className="relative w-full px-5 py-16 text-center" style={PAPER}>
      <div ref={headingRef} className="reveal">
        <h2 className="font-script text-4xl text-rose-light">Location</h2>
        <p className="mt-2 font-cinzel text-[11px] tracking-[0.25em] text-gold-dark">
          VENUE &amp; DIRECTIONS
        </p>
        <div className="mx-auto mt-3 flex justify-center">
          <OrnamentDivider className="h-4 w-36" />
        </div>
      </div>

      <div
        ref={cardRef}
        className="reveal relative mx-auto mt-9 flex max-w-sm flex-col gap-5 rounded-3xl border border-gold/45 bg-cream-2 p-5 shadow-[0_14px_36px_rgba(110,26,18,0.1)]"
        style={{ '--d': '0.12s' }}
      >
        <div className="px-1 pt-1">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 bg-[#fdf6e9] text-maroon">
            <MapPin className="h-4 w-4" color="currentColor" />
          </div>
          <p className="mt-3 font-cinzel text-[11px] leading-relaxed tracking-[0.18em] text-maroon">
            {VENUE.name.toUpperCase()}
          </p>
        </div>

        <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-gold/35 bg-[#ebe3d8]">
          <iframe
            title="Venue map"
            src={VENUE.embedUrl}
            width="100%"
            height="240"
            className="block h-[240px] w-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <a
          href={VENUE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-maroon px-6 py-3.5 font-cinzel text-[11px] tracking-[0.18em] text-cream shadow-[0_6px_16px_rgba(110,26,18,0.22)]"
        >
          <DirectionsIcon className="h-3.5 w-3.5" />
          OPEN IN GOOGLE MAPS
        </a>
      </div>
    </section>
  );
}
