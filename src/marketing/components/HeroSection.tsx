import { useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { copy } from '../content/lockedCopy';
import { Button } from './Button';
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
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      frameRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current)
      frameRef.current.style.transform =
        'perspective(800px) rotateY(0deg) rotateX(0deg)';
  }, []);

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
          <Button variant="secondary" Icon={Play}>{copy.hero.secondaryCta}</Button>
        </motion.div>

        {/* Mock product UI frame */}
        <motion.div
          className={styles.mockFrame}
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          aria-hidden="true"
        >
          <div className={styles.mockSidebar}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.mockNavItem}>
                <span className={styles.mockDot} />
                <span
                  className={styles.mockBar}
                  style={{ width: `${35 + i * 10}%` }}
                />
              </div>
            ))}
          </div>

          <div className={styles.mockMain}>
            <div className={styles.mockKpiRow}>
              {['$24.8K', '68 Tasks', '12 Files', '94%'].map((label) => (
                <div key={label} className={styles.mockKpi}>
                  <span className={styles.mockKpiValue}>{label}</span>
                </div>
              ))}
            </div>
            <div className={styles.mockTable}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={styles.mockRow}>
                  <span className={styles.mockCell} style={{ width: '35%' }} />
                  <span className={styles.mockCell} style={{ width: '20%' }} />
                  <span className={styles.mockCell} style={{ width: '15%' }} />
                  <span
                    className={styles.mockStatusPill}
                    data-status={i % 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
