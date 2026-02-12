import { motion } from 'framer-motion';
import { copy, ui } from '../content/lockedCopy';
import { Button } from './Button';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <>
      {/* ── V1 Credibility Strip ───────────────────── */}
      <section className={styles.v1Strip} id="v1">
        <motion.div
          className={styles.v1StripInner}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.v1LogoBlock}>
            <img src="/memry-logo.svg" alt="" className={styles.v1Logo} />
            <span className={styles.v1Wordmark}>memry</span>
            <span className={styles.v1Pill}>V1</span>
          </div>
          <p className={styles.v1StripBody}>
            Built for production, not promises.
          </p>
        </motion.div>
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
            <Button 
              variant="primary"
              onClick={() => { window.location.hash = '/request-access'; }}
            >
              {copy.hero.primaryCta}
            </Button>
            <Button variant="secondary">{ui.contactSales}</Button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerCol}>
            <span className={styles.footerLogo}><img src="/memry-logo.svg" alt="" className={styles.footerLogoIcon} /> memry</span>
            <p className={styles.footerTagline}>{ui.footerTagline}</p>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Product</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#features">Features</a></li>
              <li><a href="#/security">Security</a></li>
              <li><a href="#release-notes">Release Notes</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#/use-cases">Use Cases</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4 className={styles.footerColTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#/request-access">Request Access</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} memry by Jensen and Juhl</span>
          <span>All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
