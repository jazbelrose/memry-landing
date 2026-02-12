import { motion } from 'framer-motion';
import { copy, roleCardsData } from '../content/lockedCopy';
import { Section } from './Section';
import { GlassCard } from './GlassCard';
import styles from './RoleCards.module.css';

export function RoleCards() {
  return (
    <Section id="roles">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {copy.whoItsFor.headline}
      </motion.h2>
      <motion.p
        className={styles.subhead}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        {copy.whoItsFor.subhead}
      </motion.p>
      <div className={styles.grid}>
        {roleCardsData.map((role, i) => (
          <GlassCard key={role.role} delay={i * 0.1}>
            <h3 className={styles.roleTitle}>{role.role}</h3>
            <ul className={styles.bullets}>
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
