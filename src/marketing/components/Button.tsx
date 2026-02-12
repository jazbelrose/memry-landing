import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  ariaLabel,
  className,
}: ButtonProps) {
  return (
    <motion.button
      className={`${styles.btn} ${styles[variant]} ${className ?? ''}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}
