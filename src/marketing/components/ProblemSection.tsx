import { motion } from 'framer-motion';
import { copy, problemCards, ui } from '../content/lockedCopy';
import { Section } from './Section';
import { GlassCard } from './GlassCard';
import { FragmentedIcon, VersionIcon, DisconnectIcon } from './Icons';
import styles from './ProblemSection.module.css';

const icons = [FragmentedIcon, VersionIcon, DisconnectIcon];

export function ProblemSection() {
  return (
    <Section id="problem">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {copy.problem.headline}
      </motion.h2>
      <motion.p
        className={styles.support}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {ui.problemSupport}
      </motion.p>
      <div className={styles.grid}>
        {problemCards.map((card, i) => {
          const Icon = icons[i];
          return (
            <GlassCard key={card.title} delay={i * 0.1}>
              <div className={styles.iconWrap}>
                <Icon size={24} />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardBody}>{card.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
