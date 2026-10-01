import type { ElementType } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export interface HeadingSegment {
  text: string;
  className?: string;
}

interface AnimatedHeadingProps {
  segments: HeadingSegment[] | string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}

interface Token {
  word: string;
  className?: string;
  breakAfter: boolean;
}

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const word: Variants = {
  hidden: { y: '120%', opacity: 0, rotate: 4 },
  visible: {
    y: '0%',
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.95, ease: easeEditorial },
  },
};

function tokenize(segments: HeadingSegment[]): Token[] {
  const tokens: Token[] = [];

  segments.forEach((segment) => {
    const lines = segment.text.split('\n');
    lines.forEach((line, lineIndex) => {
      const words = line.split(' ').filter((wordText) => wordText.length > 0);
      const isLastLine = lineIndex === lines.length - 1;
      words.forEach((wordText, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;
        tokens.push({
          word: wordText,
          className: segment.className,
          breakAfter: isLastWord && !isLastLine,
        });
      });
    });
  });

  return tokens;
}

export function AnimatedHeading({
  segments,
  as = 'h2',
  className = '',
  id,
  delay = 0,
  stagger = 0.055,
  once = true,
  amount = 0.4,
}: AnimatedHeadingProps) {
  const reducedMotion = useReducedMotion();
  const normalized: HeadingSegment[] =
    typeof segments === 'string' ? [{ text: segments }] : segments;
  const tokens = tokenize(normalized);

  if (reducedMotion) {
    const Static = as as ElementType;
    return (
      <Static className={className} id={id}>
        {normalized.map((segment, i) => (
          <span key={i} className={segment.className}>
            {segment.text}
          </span>
        ))}
      </Static>
    );
  }

  const Tag = motion[as] as ElementType;

  return (
    <Tag
      id={id}
      className={className}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {tokens.map((token, index) => (
        <span key={index}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              variants={word}
              className={`inline-block will-change-transform ${token.className ?? ''}`}
            >
              {token.word}
              {'\u00A0'}
            </motion.span>
          </span>
          {token.breakAfter ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
