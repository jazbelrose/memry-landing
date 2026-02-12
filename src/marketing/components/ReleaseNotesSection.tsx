import { motion } from 'framer-motion';
import { releaseNotesSection, ui } from '../content/lockedCopy';
import styles from './ReleaseNotesSection.module.css';

export function ReleaseNotesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.date}>{ui.releaseDate}</p>
        <h1 className={styles.heading}>{ui.releaseHeadline}</h1>
        <p className={styles.subhead}>{ui.releaseSubhead}</p>
      </motion.div>

      {/* Release Notes Sections */}
      <motion.div
        className={styles.sectionsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {releaseNotesSection.map((section) => (
          <motion.div key={section.title} className={styles.section} variants={itemVariants}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.featureBox}>
              <ul className={styles.featureList}>
                {section.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
