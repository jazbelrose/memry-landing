import { motion } from 'framer-motion';
import { ui, securityFeatures, securityChecklist } from '../content/lockedCopy';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Section } from '../components/Section';
import styles from '../components/SecuritySection.module.css';
import { Globe, Lock, Clock, Users, Shield } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe size={24} />,
  lock: <Lock size={24} />,
  clock: <Clock size={24} />,
  users: <Users size={24} />,
  shield: <Shield size={24} />,
};

export function SecurityPage() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <Section id="security">
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.heading}>{ui.securityHeadline}</h1>
            <p className={styles.subhead}>{ui.securitySubhead}</p>
          </motion.div>

          <div className={styles.grid}>
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                className={styles.card}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.iconWrap}>
                  {iconMap[feature.icon]}
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.checklistSection}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className={styles.checklistTitle}>{ui.securityChecklistTitle}</h2>
            <div className={styles.checklistGrid}>
              <ul className={styles.checklistColumn}>
                {securityChecklist.left.map((item) => (
                  <li key={item} className={styles.checklistItem}>
                    {item}
                  </li>
                ))}
              </ul>
              <ul className={styles.checklistColumn}>
                {securityChecklist.right.map((item) => (
                  <li key={item} className={styles.checklistItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
