import { useEffect, useState } from 'react';
import { COUPLE, WEDDING_DATE } from '../content';
import { getRemaining, pad } from '../countdown';
import { OrnamentDivider } from './Motifs';
import { useReveal, staggerDelay } from '../useReveal';

function Unit({ value, label, pulse = false, delay = '0s' }) {
  return (
    <div
      className={`reveal flex min-w-[68px] flex-col items-center rounded-2xl border border-gold/40 bg-cream-2 px-3 py-4 shadow-sm ${
        pulse ? 'seconds-pulse' : ''
      }`}
      style={{ '--d': delay }}
    >
      <span
        key={value}
        className="digit-flip font-cinzel text-3xl leading-none text-maroon tabular-nums"
      >
        {value}
      </span>
      <span className="mt-2 font-cinzel text-[9px] tracking-[0.2em] text-gold-dark">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [left, setLeft] = useState(getRemaining);
  const sectionRef = useReveal({ threshold: 0.08, rootMargin: '0px 0px 80px 0px' });

  useEffect(() => {
    const id = setInterval(() => {
      const next = getRemaining();
      setLeft(next);
      if (!next) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="countdown-band reveal relative z-[1] w-full bg-ivory px-6 py-14 text-center"
    >
      <h2 className="font-script text-5xl text-rose-light">
        {left ? 'Counting Down' : 'The Day Is Here'}
      </h2>
      <p className="mt-2 font-cinzel text-[11px] tracking-[0.25em] text-gold-dark">
        {left ? 'TO OUR WEDDING DAY' : 'TODAY WE BEGIN OUR FOREVER'}
      </p>
      <div className="mx-auto mt-3 flex justify-center">
        <OrnamentDivider className="h-4 w-36" />
      </div>

      {left ? (
        <div
          role="timer"
          aria-label={`${left.days} days until the wedding`}
          className="mt-8 flex items-stretch justify-center gap-2"
        >
          <div aria-hidden="true" className="flex items-stretch justify-center gap-2">
            <Unit value={left.days} label="DAYS" delay={staggerDelay(0)} />
            <Unit value={pad(left.hours)} label="HOURS" delay={staggerDelay(1)} />
            <Unit value={pad(left.minutes)} label="MINUTES" delay={staggerDelay(2)} />
            <Unit value={pad(left.seconds)} label="SECONDS" pulse delay={staggerDelay(3)} />
          </div>
        </div>
      ) : (
        <p className="mt-8 font-script text-4xl text-maroon">{COUPLE.initials}</p>
      )}

      <p className="mt-8 font-script text-3xl text-maroon">{WEDDING_DATE.display}</p>
      <p className="mt-1 font-cinzel text-[11px] tracking-[0.25em] text-rose">
        {WEDDING_DATE.day} &bull; {WEDDING_DATE.place}
      </p>
    </section>
  );
}
