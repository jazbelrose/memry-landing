import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { comparisonRows, ui } from '../content/lockedCopy';
import { Section } from './Section';
import styles from './ComparisonTable.module.css';

export function ComparisonTable() {
  return (
    <Section id="comparison">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {ui.comparisonHeading}
      </motion.h2>
      <motion.div
        className={styles.tableWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <table className={styles.table} role="table">
          <thead>
            <tr>
              <th scope="col">Current Tool</th>
              <th scope="col">The Gap</th>
              <th scope="col" className={styles.featuredHeader}>Memry Advantage</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.tool}>
                <td className={styles.toolCell}>{row.tool}</td>
                <td className={styles.gapCell}>
                  <span className={styles.iconWrap}>
                    <X size={14} className={styles.xIcon} />
                  </span>
                  {row.gap}
                </td>
                <td className={`${styles.advantageCell} ${styles.featured}`}>
                  <span className={styles.iconWrap}>
                    <Check size={14} className={styles.checkIcon} />
                  </span>
                  {row.advantage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  );
}
