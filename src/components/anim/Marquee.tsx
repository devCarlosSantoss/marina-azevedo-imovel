import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useIntersectionObserver';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 38,
  reverse = false,
  className = '',
  pauseOnHover = true,
}: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex w-max">{children}</div>
      </div>
    );
  }

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        }`}
        style={{ ['--marquee-duration' as string]: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
