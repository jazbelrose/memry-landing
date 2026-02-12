import { motion } from 'framer-motion';
import { productFeatures, productBenefits, ui } from '../content/lockedCopy';
import styles from './ProductSection.module.css';

export function ProductSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.heading}>{ui.productHeadline}</h1>
        <p className={styles.subhead}>{ui.productSubhead}</p>
      </motion.div>

      {/* Product Features List */}
      <motion.div
        className={styles.featuresList}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {productFeatures.map((feature) => (
          <motion.div key={feature.title} className={styles.featureCard} variants={itemVariants}>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature-Benefit Section */}
      <motion.div
        className={styles.benefitSection}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className={styles.benefitTitle}>Feature → Benefit</h2>
        <div className={styles.benefitTable}>
          <div className={styles.benefitHeader}>
            <div className={styles.featureColumn}>FEATURE</div>
            <div className={styles.benefitColumn}>BENEFIT</div>
          </div>
          {productBenefits.map((item, index) => (
            <div key={index} className={styles.benefitRow}>
              <div className={styles.featureCell}>{item.feature}</div>
              <div className={styles.benefitCell}>{item.benefit}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
