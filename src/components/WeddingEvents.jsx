import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useInviteEvents } from '../useInviteEvents';
import { VENUE } from '../content';
import {
  DirectionsIcon,
  Diya,
  MapPin,
  OrnamentDivider,
} from './Motifs';
import Picture from './Picture';
import { useReveal, staggerDelay } from '../useReveal';

const SETTLE = { duration: 1.05, ease: [0.16, 1, 0.3, 1] };

const caption = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.28 } },
};

const captionLine = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function EventCard({ event, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Image is oversized so drift never exposes an edge; caption drifts the other way.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.04, 1.16]);
  const captionY = useTransform(scrollYProgress, [0, 1], ['7%', '-7%']);
  const imageDrift = reduced ? {} : { y: imageY, scale: imageScale };

  // Every event is inside the one hotel, so directions always lead there.
  const directionsUrl = VENUE.mapsUrl;

  return (
    <div className="reveal" style={{ '--d': staggerDelay(index) }}>
      <div style={{ perspective: 1100 }}>
        <motion.article
          ref={ref}
          className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-gold/50 shadow-[0_14px_38px_rgba(110,26,18,0.16)] ${
            !reduced ? 'gold-sweep' : ''
          }`}
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 64, rotateX: 9, scale: 0.955, transformOrigin: '50% 100%' }
          }
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={SETTLE}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <Picture
              as={motion.img}
              image={event.image}
              alt={event.title}
              loading="lazy"
              decoding="async"
              style={imageDrift}
              sizes="(max-width: 440px) 100vw, 400px"
              className="event-card-parallax absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c0704] via-[#2c0b06]/75 to-[#401209]/20" />
            {/* Extra solid band behind the caption so pale photos never wash out type. */}
            <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#1c0704]/95 via-[#1c0704]/70 to-transparent" />
          </div>

          {/* Diya sits in the open upper area of the Hawan card. */}
          {event.key === 'hawan' && (
            <div className="absolute left-1/2 top-[14%] z-10 -translate-x-1/2">
              <Diya className="h-14 w-14 drop-shadow-md" />
            </div>
          )}

          <motion.div
            style={reduced ? undefined : { y: captionY }}
            className="event-card-caption relative z-10 flex h-full flex-col items-center justify-end gap-2.5 px-5 pb-8 text-center text-[#fdf6e9]"
            variants={caption}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            <motion.h3
              variants={captionLine}
              className="font-script-title text-[2.65rem] leading-[1.25] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
            >
              {event.title}
            </motion.h3>
            <motion.p
              variants={captionLine}
              className="font-cinzel text-[15px] font-medium tracking-[0.16em] text-[#fdf6e9]"
            >
              {event.subtitle}
            </motion.p>
            {event.note && (
              <motion.p
                variants={captionLine}
                className="mt-0.5 font-cinzel text-[14px] tracking-[0.16em] text-[#f3c983]"
              >
                {event.note}
              </motion.p>
            )}
            <motion.p
              variants={captionLine}
              className="mt-3 font-cinzel text-[15px] font-medium tracking-wide text-[#fdf6e9]"
            >
              {event.date}
            </motion.p>
            <motion.p
              variants={captionLine}
              className="font-cinzel text-sm tracking-[0.18em] text-[#fefaf2]"
            >
              {event.time}
            </motion.p>
            {event.venue && (
              <motion.p
                variants={captionLine}
                className="mt-2 flex items-center justify-center gap-1.5 font-cormorant text-base font-medium text-[#fdf6e9]"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0" color="currentColor" />
                {event.venue}
              </motion.p>
            )}

            {event.venue && !event.hideDirections && (
              <motion.div variants={captionLine} className="mt-4 flex w-full justify-center">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#c99245]/70 bg-[#6e1a12]/95 px-3.5 py-2.5 font-cinzel text-[11px] tracking-widest text-[#fdf6e9] shadow-[0_4px_14px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                >
                  <DirectionsIcon className="h-3.5 w-3.5" />
                  GET DIRECTIONS
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}

export default function WeddingEvents() {
  const { events } = useInviteEvents();
  const headingRef = useReveal();
  const listRef = useReveal();

  useEffect(() => {
    const root = listRef.current;
    if (!root) return undefined;
    const mark = () => {
      if (!root.classList.contains('in')) return;
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    };
    mark();
    const mo = new MutationObserver(mark);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, [listRef]);

  return (
    <section className="w-full bg-cream px-5 py-14 text-center">
      <div ref={headingRef} className="reveal">
        <h2 className="font-cinzel text-xl tracking-widest text-maroon">Wedding Events</h2>
        <p className="mt-2 font-cormorant text-sm italic text-rose">
          Join us in celebrating our special moments
        </p>
        <div className="mx-auto mt-4 flex justify-center">
          <OrnamentDivider className="h-4 w-40" />
        </div>
      </div>

      <div ref={listRef} className="reveal mt-8 flex flex-col gap-7">
        {events.map((event, i) => (
          <EventCard key={event.key} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
