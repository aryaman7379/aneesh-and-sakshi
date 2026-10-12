import { motion } from 'framer-motion';
import { IMAGES, COUPLE } from '../content';
import { Diya, Garland, OrnamentDivider } from './Motifs';
import Picture from './Picture';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Picture
          image={IMAGES.heroArch}
          alt="Illustrated archway"
          className="h-full w-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
          sizes="440px"
        />
      </div>

      {/* Marigold strands hanging from the arch crown. */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] z-[5] flex justify-between px-6 sm:px-8">
        <Garland className="h-28 w-10 opacity-90" delay={0} />
        <Garland className="h-24 w-9 opacity-80" delay={0.6} flip />
        <Garland className="h-32 w-10 opacity-85" delay={1.1} />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-8 pt-[27%] pb-[55%] text-center sm:pt-[29%]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-2 text-gold-dark sm:gap-3"
        >
          <Diya className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="text-lg">ॐ</span>
          <Picture
            image={IMAGES.ganesh}
            alt=""
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            loading="eager"
            sizes="48px"
          />
          <span className="text-lg">ॐ</span>
          <Diya className="h-7 w-7 sm:h-8 sm:w-8" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-3 font-cinzel text-[11px] tracking-wide text-gold-dark sm:text-xs"
        >
          {COUPLE.invocation}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-2 flex justify-center">
          <OrnamentDivider className="h-3 w-28 sm:w-32" />
        </motion.div>

        {/* Mrs Saint Delafield needs generous line-height for its loops. */}
        <motion.p
          variants={fadeUp}
          className="shimmer mt-4 w-full font-script text-7xl leading-[1.35] sm:text-8xl"
        >
          {COUPLE.initials}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 font-cinzel text-base italic text-rose">
          {COUPLE.tagline.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-cinzel text-sm tracking-[0.2em] text-maroon-light"
        >
          {COUPLE.announcement}
        </motion.p>

        <motion.h1 variants={fadeUp} className="hero-names mt-2 font-script text-maroon">
          {COUPLE.partner1}&nbsp; &amp; {COUPLE.partner2}
        </motion.h1>
      </motion.div>
    </section>
  );
}
