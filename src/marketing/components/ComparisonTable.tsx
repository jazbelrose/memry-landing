import { motion } from 'framer-motion';
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
              <th scope="col">Memry Advantage</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.tool}>
                <td className={styles.toolCell}>{row.tool}</td>
                <td className={styles.gapCell}>{row.gap}</td>
                <td className={styles.advantageCell}>{row.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  );
}
