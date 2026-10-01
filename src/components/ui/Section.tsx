import type { HTMLAttributes, Ref } from 'react';
import { forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'sm' | 'dark' | 'hero';
  id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ variant = 'default', id, className = '', children, ...props }, ref: Ref<HTMLElement>) => {
    const variants = {
      default: 'py-[clamp(4.5rem,9vw,8rem)]',
      sm: 'py-[clamp(3rem,6vw,5.5rem)]',
      dark: 'py-[clamp(4.5rem,9vw,8rem)] bg-grafite text-off-white',
      hero: 'min-h-screen flex items-center justify-center',
    };

    return (
      <section
        ref={ref}
        id={id}
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
export { Section };
