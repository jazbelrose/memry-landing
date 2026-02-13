import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { copy } from '../content/lockedCopy';
import { Button } from './Button';
import { HeroAnimation } from './hero/HeroAnimation';
import styles from './HeroSection.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.gradientOrb} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.h1
          className={styles.headline}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {copy.hero.headline}
        </motion.h1>

        <motion.p
          className={styles.subhead}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          {copy.hero.subhead}
        </motion.p>

        <motion.div
          className={styles.ctas}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <Button 
            variant="primary" 
            Icon={ArrowRight}
            onClick={() => { window.location.hash = '/request-access'; }}
          >
            {copy.hero.primaryCta}
          </Button>
          <Button 
            variant="secondary" 
            Icon={Play}
            onClick={() => { document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {copy.hero.secondaryCta}
          </Button>
        </motion.div>

        {/* Product UI animation — real memry scenes */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          <HeroAnimation />
        </motion.div>
      </div>
    </section>
  );
}
