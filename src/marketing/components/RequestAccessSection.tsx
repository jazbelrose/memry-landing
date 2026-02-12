import { useState, FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './RequestAccessSection.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

interface FormData {
  name: string;
  email: string;
  organization: string;
  teamSize: string;
  budget: string;
  message: string;
}

export function RequestAccessSection() {
  const reducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    teamSize: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const animationProps = reducedMotion
    ? {}
    : {
        variants: fadeUp,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
      };

  return (
    <section id="request-access" className={styles.section}>
      {/* Background accents */}
      <div className={styles.bgAccentWhite} aria-hidden="true" />
      <div className={styles.bgAccentBrand} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header} {...animationProps} custom={0}>
          <h2 className={styles.title}>Request Access</h2>
          <p className={styles.subtitle}>
            We're onboarding a limited number of teams for V1. Tell us about your
            workflow and we'll reach out.
          </p>
          <p className={styles.replyTime}>Typical reply time: 24–48 hours.</p>
        </motion.div>

        {/* Designer card */}
        <motion.div
          className={styles.cardWrapper}
          {...animationProps}
          custom={0.15}
        >
          <div className={styles.cardOuter}>
            {/* Gradient border */}
            <div className={styles.cardBorder} aria-hidden="true" />
            {/* Actual card */}
            <div className={styles.cardInner}>
              <div className={styles.cardContent}>
                {submitted ? (
                  <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                      <Check size={32} />
                    </div>
                    <h3 className={styles.successTitle}>Request Received</h3>
                    <p className={styles.successText}>
                      Thanks for your interest! We'll review your request and get
                      back to you within 24–48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.formWrapper}>
                    <div className={styles.formGrid}>
                      <div className={styles.fieldGroup}>
                        <label htmlFor="name" className={styles.label}>
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={styles.input}
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="email" className={styles.label}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={styles.input}
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                        <label htmlFor="organization" className={styles.label}>
                          Organization
                        </label>
                        <input
                          type="text"
                          id="organization"
                          name="organization"
                          className={styles.input}
                          placeholder="Company or team name"
                          value={formData.organization}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="teamSize" className={styles.label}>
                          Team Size
                        </label>
                        <input
                          type="text"
                          id="teamSize"
                          name="teamSize"
                          className={styles.input}
                          placeholder="e.g., 5–20"
                          value={formData.teamSize}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="budget" className={styles.label}>
                          Typical Project Budget
                        </label>
                        <input
                          type="text"
                          id="budget"
                          name="budget"
                          className={styles.input}
                          placeholder="e.g., $50K–$500K"
                          value={formData.budget}
                          onChange={handleChange}
                        />
                      </div>

                      <div className={`${styles.fieldGroup} ${styles.colSpan2}`}>
                        <label htmlFor="message" className={styles.label}>
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className={styles.textarea}
                          placeholder="Tell us about your production workflow and what you're looking for..."
                          value={formData.message}
                          onChange={handleChange}
                        />
                        <div className={styles.fieldHint}>
                          Include your role + what tools you're replacing (sheets,
                          email, Slack, etc).
                        </div>
                      </div>

                      {/* Info panel - positioned before submit */}
                      <div className={`${styles.colSpan2} ${styles.infoPanelWrapper}`}>
                        <div className={styles.infoPanel}>
                          <div className={styles.infoPanelTitle}>
                            What happens next
                          </div>
                          <ul className={styles.infoPanelList}>
                            <li className={styles.infoPanelItem}>
                              <span>•</span>
                              <span>
                                We review fit + timeline for V1 onboarding.
                              </span>
                            </li>
                            <li className={styles.infoPanelItem}>
                              <span>•</span>
                              <span>
                                You'll get a short reply with next steps.
                              </span>
                            </li>
                            <li className={styles.infoPanelItem}>
                              <span>•</span>
                              <span>
                                If accepted, we'll schedule a 15-min setup call.
                              </span>
                            </li>
                          </ul>
                          <div className={styles.infoPanelNote}>
                            Security note: we never share your info.
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${styles.fieldGroup} ${styles.colSpan2} ${styles.submitWrapper}`}
                      >
                        <button type="submit" className={styles.submitButton}>
                          Submit Request →
                        </button>
                        <div className={styles.submitDisclaimer}>
                          By submitting, you agree we can email you about access.
                          No spam.
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
