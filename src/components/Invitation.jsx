import { motion } from 'framer-motion';
import { IMAGES, INVITATION } from '../content';
import { Cartouche, Jaali, Paisley, Rosette } from './Ornaments';
import { OrnamentDivider } from './Motifs';
import Picture from './Picture';
import { GOLD, PAPER } from '../ornamentTokens';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// The Ganpati sits in a little ogee niche, like the shrine arch on the cover.
function Niche() {
  return (
    <div className="relative mx-auto h-24 w-24">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M12 96 L12 46 C12 27 29 10 50 4 C71 10 88 27 88 46 L88 96"
          fill="none"
          stroke={GOLD}
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M18 96 L18 47 C18 31 32 17 50 11 C68 17 82 31 82 47 L82 96"
          fill="none"
          stroke={GOLD}
          strokeWidth="0.7"
          opacity="0.5"
        />
      </svg>
      <Picture
        image={IMAGES.ganesh}
        alt=""
        className="absolute bottom-2 left-1/2 h-12 w-12 -translate-x-1/2 object-contain"
        loading="lazy"
        sizes="48px"
      />
    </div>
  );
}

function Party({ party }) {
  return (
    <>
      <motion.p variants={fadeUp} className="font-script text-[2.6rem] leading-[1.5] text-maroon">
        {party.name}
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="mt-1 font-cormorant text-[13.5px] leading-snug text-maroon-light"
      >
        {party.parents}
      </motion.p>
      <motion.p
        variants={fadeUp}
        className="mt-0.5 font-cormorant text-[13.5px] leading-snug text-maroon-light"
      >
        {party.grandparents}
      </motion.p>
    </>
  );
}

// The printed invitation, set as one centred column inside a gold cartouche:
// shloka, blessing, the occasion, then the bride's family and the groom's.
export default function Invitation() {
  return (
    <section className="relative w-full overflow-hidden px-4 py-14 text-center" style={PAPER}>
      <Jaali id="invite" />

      <div className="relative mx-auto max-w-[380px] px-6 py-12">
        <Cartouche />

        <Paisley className="absolute left-1.5 top-8 h-9 w-9" />
        <Paisley className="absolute right-1.5 top-8 h-9 w-9" flipX />
        <Paisley className="absolute bottom-8 left-1.5 h-9 w-9" flipY />
        <Paisley className="absolute bottom-8 right-1.5 h-9 w-9" flipX flipY />
        <Rosette className="absolute -left-0.5 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Rosette className="absolute -right-0.5 top-1/2 h-4 w-4 -translate-y-1/2" />

        <motion.div
          className="relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          onViewportEnter={(entry) => entry?.target?.classList.add('in')}
        >
          <motion.div variants={fadeUp}>
            <Niche />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-3 font-cormorant text-[15px] text-gold-dark">
            {INVITATION.shloka.map((line) => (
              <p key={line} className="leading-relaxed">
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-4 flex justify-center">
            <OrnamentDivider className="h-4 w-40" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-4 font-cormorant text-2xl font-medium tracking-wide text-maroon"
          >
            {INVITATION.blessing}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-1 font-cormorant text-base text-maroon-light">
            {INVITATION.intro}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="shimmer mt-3 font-script text-[3.25rem] leading-[1.35]"
          >
            {INVITATION.occasion}
          </motion.p>
          <motion.p variants={fadeUp} className="font-cormorant text-lg italic text-rose">
            of
          </motion.p>

          <Party party={INVITATION.bride} />

          <motion.div variants={fadeUp} className="my-3 flex items-center justify-center gap-3">
            <OrnamentDivider className="h-3 w-24" />
            <span className="font-cormorant text-lg italic text-rose">with</span>
            <OrnamentDivider className="h-3 w-24" />
          </motion.div>

          <Party party={INVITATION.groom} />

          <motion.div variants={fadeUp} className="mt-7 flex justify-center">
            <OrnamentDivider className="h-4 w-40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
