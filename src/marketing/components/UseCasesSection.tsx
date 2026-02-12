import { motion } from 'framer-motion';
import { ui, useCases } from '../content/lockedCopy';
import { Section } from './Section';
import styles from './UseCasesSection.module.css';
import { Briefcase, Palette, Target, Hammer, Eye } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={24} />,
  palette: <Palette size={24} />,
  target: <Target size={24} />,
  hammer: <Hammer size={24} />,
  eye: <Eye size={24} />,
};

export function UseCasesSection() {
  return (
    <Section id="use-cases">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.heading}>{ui.useCasesHeadline}</h2>
        <p className={styles.subhead}>{ui.useCasesSubhead}</p>
      </motion.div>

      <div className={styles.grid}>
        {useCases.map((useCase, i) => (
          <motion.div
            key={useCase.title}
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>
                {iconMap[useCase.icon]}
              </div>
              <div>
                <h3 className={styles.cardTitle}>{useCase.title}</h3>
                <p className={styles.cardDescription}>{useCase.description}</p>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.section}>
                <h4 className={styles.sectionLabel}>PAIN POINTS SOLVED</h4>
                <ul className={styles.list}>
                  {useCase.painPoints.map((point) => (
                    <li key={point} className={styles.listItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <h4 className={styles.sectionLabel}>KEY WORKFLOWS</h4>
                <ul className={styles.list}>
                  {useCase.keyWorkflows.map((workflow) => (
                    <li key={workflow} className={styles.listItem}>
                      {workflow}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
