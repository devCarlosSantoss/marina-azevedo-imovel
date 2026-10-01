import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useIntersectionObserver';

export function ScrollProgressBar() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-verde-oliva via-terracota to-verde-oliva"
    />
  );
}
