import { motion } from 'framer-motion';
import { copy, ui } from '../content/lockedCopy';
import { Button } from './Button';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <>
      {/* ── V1 Readiness ────────────────────────────── */}
      <section className={styles.v1Section} id="v1">
        <div className={styles.v1Inner}>
          <motion.h2
            className={styles.v1Heading}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {copy.v1Readiness.headline}
          </motion.h2>
          <motion.p
            className={styles.v1Body}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {copy.v1Readiness.body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button variant="primary">{copy.hero.primaryCta}</Button>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Band ────────────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaInner}>
          <motion.h2
            className={styles.ctaHeading}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {ui.ctaHeadline}
          </motion.h2>
          <motion.div
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Button variant="primary">{copy.hero.primaryCta}</Button>
            <Button variant="secondary">{ui.contactSales}</Button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <span className={styles.footerLogo}>memry</span>
            <p className={styles.footerTagline}>{ui.footerTagline}</p>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Product</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#workspace">Workspace</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#comparison">Comparison</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 Memry. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
