import { motion } from 'framer-motion';
import { copy, ui } from '../content/lockedCopy';
import { Button } from './Button';
import styles from './NavBar.module.css';

export function NavBar() {
  const navigationLinks = [
    { label: 'Features', href: '#/features' },
    { label: 'Use Cases', href: '#/use-cases' },
    { label: 'Security', href: '#/security' },
    { label: 'FAQ', href: '#/faq' },
    { label: 'Release Notes', href: '#/release-notes' },
  ];

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
          <a href="#/" className={styles.logo} aria-label="memry home"><img src="/memry-logo.svg" alt="" className={styles.logoIcon} /> memry</a>
          <span className={styles.chip}>{ui.navChip}</span>
        </div>
        <div className={styles.links}>
          {navigationLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button 
          variant="primary" 
          ariaLabel="Request Access"
          onClick={() => { window.location.hash = '/request-access'; }}
        >
          {copy.hero.primaryCta}
        </Button>
      </div>
    </motion.nav>
  );
}
