import { motion } from 'framer-motion';
import { featureCards, ui } from '../content/lockedCopy';
import { Section } from './Section';
import { GlassCard } from './GlassCard';
import { FeatureIcon } from './Icons';
import styles from './FeatureGrid.module.css';

export function FeatureGrid() {
  return (
    <Section id="features">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {ui.featureGridHeading}
      </motion.h2>
      <div className={styles.grid}>
        {featureCards.map((card, i) => (
          <GlassCard key={card.title} delay={i * 0.08}>
            <div className={styles.iconWrap}>
              <FeatureIcon name={card.icon} />
            </div>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.desc}>{card.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
