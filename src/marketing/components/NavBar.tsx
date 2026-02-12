import { motion } from 'framer-motion';
import { copy, ui } from '../content/lockedCopy';
import { Button } from './Button';
import styles from './NavBar.module.css';

export function NavBar() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo} aria-label="Memry home">memry</span>
          <span className={styles.chip}>{ui.navChip}</span>
        </div>
        <Button variant="primary" ariaLabel="Request Access">
          {copy.hero.primaryCta}
        </Button>
      </div>
    </motion.nav>
  );
}
