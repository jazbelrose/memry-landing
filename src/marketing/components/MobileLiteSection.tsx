import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MobileLiteSection.module.css';

// Image imports (Vite handles these)
import slideDeckImg from '../../images/slide-deck-mobile-mock.png';
import budgetImg from '../../images/budget-mobile-mock.png';
import calendarImg from '../../images/tasks-mobile-mock.png.png';

gsap.registerPlugin(ScrollTrigger);

/* ── Phone data ───────────────────────────────────────── */
interface PhoneCard {
  id: string;
  label: string;
  sublabel: string;
  src: string;
  alt: string;
}

const phones: PhoneCard[] = [
  {
    id: 'client',
    label: 'Client Lite',
    sublabel: 'Review + approve',
    src: slideDeckImg,
    alt: 'memry mobile — client deck review showing Awards Week Gala presentation slides',
  },
  {
    id: 'builder',
    label: 'Builder Lite',
    sublabel: 'Tasks + proof',
    src: calendarImg,
    alt: 'memry mobile — builder calendar view showing scheduled tasks and milestones',
  },
  {
    id: 'producer',
    label: 'Producer',
    sublabel: 'Budget + margin',
    src: budgetImg,
    alt: 'memry mobile — producer budget KPI view showing cost, margin, and client total',
  },
];

/* ── Reduced-motion helper ────────────────────────────── */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ── Phone Frame (pure CSS) ───────────────────────────── */
function PhoneFrame({ phone }: { phone: PhoneCard }) {
  return (
    <div className={styles.phoneFrame}>
      <div className={styles.phoneScreen}>
        <img
          src={phone.src}
          alt={phone.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────── */
export function MobileLiteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  /* GSAP stagger animation */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const els = phonesRef.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    gsap.set(els, { autoAlpha: 0, y: 36, scale: 0.98 });

    const tween = gsap.to(els, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  /* Mobile carousel scroll tracking */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = track.children;
    const center = track.scrollLeft + track.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(center - childCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    }
    setActiveSlide(closest);
  }, []);

  const scrollToSlide = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[i] as HTMLElement;
    if (!child) return;
    child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  /* Close lightbox on Escape */
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className={styles.section}
        id="mobile"
        aria-label="Mobile access for builders and clients"
      >
        <div className={styles.inner}>
          {/* Header */}
          <h2 className={styles.heading}>
            Mobile access for builders and clients.
          </h2>
          <p className={styles.subhead}>
            A lighter, role-based experience — builders update tasks and proof on
            site. Clients review, approve, and pay from their phone.
          </p>

          {/* Desktop: 3-phone stack */}
          <div className={styles.phoneStack}>
            {phones.map((phone, i) => (
              <div
                key={phone.id}
                className={styles.phoneSlot}
                ref={(el) => {
                  phonesRef.current[i] = el;
                }}
              >
                <PhoneFrame phone={phone} />
                <span className={styles.chip}>
                  <span className={styles.chipDot} />
                  {phone.label} — {phone.sublabel}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: swipe carousel */}
          <div className={styles.carousel}>
            <div
              ref={trackRef}
              className={styles.carouselTrack}
              onScroll={handleScroll}
            >
              {phones.map((phone) => (
                <div key={phone.id} className={styles.carouselSlide}>
                  <PhoneFrame phone={phone} />
                  <span className={styles.chip}>
                    <span className={styles.chipDot} />
                    {phone.label} — {phone.sublabel}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.carouselDots}>
              {phones.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`}
                  onClick={() => scrollToSlide(i)}
                  aria-label={`Go to phone ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* See more screens (opens lightbox with all 3 + context) */}
          <div className={styles.seeMore}>
            <button
              className={styles.seeMoreBtn}
              onClick={() => setLightboxOpen(true)}
            >
              See more screens →
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile screenshots gallery"
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            ✕
          </button>
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            {phones.map((phone) => (
              <div key={phone.id} className={styles.phoneSlot}>
                <PhoneFrame phone={phone} />
                <span className={styles.chip}>
                  <span className={styles.chipDot} />
                  {phone.label} — {phone.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
