import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'md';
}

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors';

  const variants = {
    default: 'bg-grafite text-off-white border border-grafite',
    secondary: 'bg-terracota text-off-white border border-terracota',
    outline: 'bg-transparent text-grafite border border-grafite/20',
  };

  const sizes = {
    sm: 'px-2 py-1 text-caption',
    md: 'px-3 py-1.5 text-body-sm',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
