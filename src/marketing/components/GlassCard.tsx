import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      className={`${styles.card} ${className ?? ''}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
