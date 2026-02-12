import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { workflowSteps, ui } from '../content/lockedCopy';
import { Section } from './Section';
import styles from './WorkflowStepper.module.css';

export function WorkflowStepper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setActiveStep(workflowSteps.length - 1);
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        if (cancelled) return;

        const gsap = gsapMod.gsap ?? gsapMod.default;
        const ScrollTrigger =
          stMod.ScrollTrigger ?? (stMod as any).default;
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !progressRef.current) return;

        ctx = gsap.context(() => {
          /* progress bar fill */
          gsap.to(progressRef.current, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 0.4,
            },
          });

          /* per-step highlighting */
          workflowSteps.forEach((_, i) => {
            const el = containerRef.current?.querySelector(
              `[data-step="${i}"]`,
            );
            if (!el) return;

            ScrollTrigger.create({
              trigger: el,
              start: 'top 70%',
              onEnter: () => setActiveStep((prev) => Math.max(prev, i)),
              onEnterBack: () => setActiveStep(i),
            });
          });
        }, containerRef);
      } catch {
        setActiveStep(workflowSteps.length - 1);
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <Section id="workflow">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className={styles.label}>{ui.workflowLabel}</span>
        <h2 className={styles.heading}>{ui.workflowTitle}</h2>
        <p className={styles.subheading}>
          From first file upload to final reconciliation — here's how a real project flows through memry.
        </p>
      </motion.div>

      <div className={styles.stepper} ref={containerRef}>
        {/* Vertical track + animated progress fill */}
        <div className={styles.track} aria-hidden="true">
          <div className={styles.progress} ref={progressRef} />
        </div>

        <div className={styles.steps}>
          {workflowSteps.map((step, i) => (
            <div
              key={step.number}
              data-step={i}
              className={`${styles.step} ${i <= activeStep ? styles.stepActive : ''}`}
            >
              <div className={styles.node}>
                <span className={styles.nodeNumber}>
                  {String(step.number).padStart(2, '0')}
                </span>
              </div>
              <div className={styles.stepCard}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
