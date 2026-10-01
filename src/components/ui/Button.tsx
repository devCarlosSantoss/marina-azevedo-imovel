import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'minimal';
  tone?: 'default' | 'on-dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'chevron' | 'whatsapp';
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      tone = 'default',
      size = 'md',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-400 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-oliva focus-visible:ring-offset-2 focus-visible:ring-offset-off-white disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      default: {
        primary: 'bg-grafite text-off-white border border-grafite hover:bg-transparent hover:text-grafite',
        secondary: 'bg-transparent text-grafite border border-grafite/30 hover:border-grafite hover:bg-grafite/5',
        whatsapp: 'bg-grafite text-off-white border border-grafite hover:bg-terracota hover:border-terracota hover:text-off-white',
        minimal: 'bg-transparent text-grafite border-none hover:text-verde-oliva p-0',
      },
      'on-dark': {
        primary: 'bg-off-white text-grafite border border-off-white hover:bg-transparent hover:text-off-white',
        secondary: 'bg-transparent text-off-white border border-off-white/40 hover:border-off-white hover:bg-off-white/10',
        whatsapp: 'bg-off-white text-grafite border border-off-white hover:bg-areia hover:border-areia hover:text-grafite',
        minimal: 'bg-transparent text-off-white border-none hover:text-areia p-0',
      },
    } as const;

    const sizes = {
      sm: 'px-4 py-2 text-body-sm',
      md: 'px-8 py-4 text-body-base',
      lg: 'px-10 py-5 text-body-lg',
    };

    const width = fullWidth ? 'w-full' : '';

    const IconComponent = icon === 'chevron' ? ChevronRight : icon === 'whatsapp' ? WhatsAppIcon : null;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[tone][variant]} ${sizes[size]} ${width} ${className}`}
        disabled={disabled}
        {...props}
      >
        {iconPosition === 'left' && IconComponent && <IconComponent className="w-5 h-5" aria-hidden="true" />}
        {children}
        {iconPosition === 'right' && IconComponent && <IconComponent className="w-5 h-5" aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = 'Button';