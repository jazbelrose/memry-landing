import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { copy, ui } from '../content/lockedCopy';
import { Button } from './Button';
import styles from './NavBar.module.css';

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const navigationLinks = [
    { label: 'Features', href: '#/features' },
    { label: 'Use Cases', href: '#/use-cases' },
    { label: 'Security', href: '#/security' },
    { label: 'FAQ', href: '#/faq' },
    { label: 'Release Notes', href: '#/release-notes' },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 769px)');

    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    if (media.matches) {
      setMenuOpen(false);
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleResize);
      return () => media.removeEventListener('change', handleResize);
    }

    media.addListener(handleResize);
    return () => media.removeListener(handleResize);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const menuItems = [
      brandingRef.current,
      ...linkRefs.current,
      ctaRef.current,
    ].filter(Boolean) as HTMLElement[];

    let cancelled = false;

    const animate = async () => {
      if (prefersReducedMotion) {
        overlay.style.opacity = menuOpen ? '1' : '0';
        overlay.style.visibility = menuOpen ? 'visible' : 'hidden';
        overlay.style.pointerEvents = menuOpen ? 'auto' : 'none';
        menuItems.forEach((item) => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0px)';
        });
        return;
      }

      const { gsap } = await import('gsap');
      if (cancelled) {
        return;
      }

      timelineRef.current?.kill();

      if (menuOpen) {
        gsap.set(overlay, { visibility: 'visible', pointerEvents: 'auto' });
        gsap.set(menuItems, { opacity: 0, y: 28 });
        timelineRef.current = gsap
          .timeline()
          .to(overlay, { opacity: 1, duration: 0.24, ease: 'power2.out' })
          .to(menuItems, {
            opacity: 1,
            y: 0,
            duration: 0.36,
            ease: 'power3.out',
            stagger: 0.06,
          }, 0.08);
        return;
      }

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: 'hidden', pointerEvents: 'none' });
        },
      }).to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' });
    };

    animate();

    return () => {
      cancelled = true;
      timelineRef.current?.kill();
    };
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen((current) => !current);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleMenuClose();
    }
  };

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
        <div className={styles.desktopCta}>
          <Button
            variant="primary"
            ariaLabel="Request Access"
            onClick={() => { window.location.hash = '/request-access'; }}
          >
            {copy.hero.primaryCta}
          </Button>
        </div>
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-overlay"
          onClick={handleMenuToggle}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>
      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden={!menuOpen}
        onClick={handleOverlayClick}
      >
        <button
          type="button"
          className={styles.overlayClose}
          aria-label="Close menu"
          onClick={handleMenuClose}
        >
          <span className={styles.overlayCloseLine} />
          <span className={styles.overlayCloseLine} />
        </button>
        <div ref={brandingRef} className={styles.overlayBranding}>
          <a href="#/" className={styles.overlayLogo} aria-label="memry home" onClick={handleMenuClose}>
            <img src="/memry-logo.svg" alt="" className={styles.overlayLogoIcon} />
            memry
          </a>
          <span className={styles.overlayChip}>{ui.navChip}</span>
        </div>
        <div className={styles.overlayLinks}>
          {navigationLinks.map((link, index) => (
            <a
              key={link.label}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              href={link.href}
              className={styles.overlayLink}
              onClick={handleMenuClose}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div ref={ctaRef} className={styles.overlayCta}>
          <Button
            variant="primary"
            ariaLabel="Request Access"
            onClick={() => {
              window.location.hash = '/request-access';
              handleMenuClose();
            }}
          >
            {copy.hero.primaryCta}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
