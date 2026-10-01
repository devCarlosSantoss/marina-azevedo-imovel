import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

const hidden: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 0, y: 42 },
  down: { opacity: 0, y: -42 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
  blur: { opacity: 0, y: 26, filter: 'blur(12px)' },
};

const visible: Record<RevealVariant, Record<string, number | string>> = {
  up: { opacity: 1, y: 0 },
  down: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  fade: { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
  blur: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.85,
  className = '',
  amount = 0.25,
  once = true,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={hidden[variant]}
      whileInView={visible[variant]}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeEditorial }}
    >
      {children}
    </motion.div>
  );
}
