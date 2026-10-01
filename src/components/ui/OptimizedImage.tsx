import type { ImgHTMLAttributes } from 'react';
import { useState, forwardRef } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, priority = false, fill = false, sizes, className = '', ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const isLazy = !priority;

    return (
      <div
        className={`relative overflow-hidden ${fill ? 'absolute inset-0' : ''} ${className}`}
        style={fill ? { width: '100%', height: '100%' } : undefined}
        aria-hidden={!alt}
      >
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 bg-areia/30 animate-pulse"
            aria-hidden="true"
          />
        )}

        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={isLazy ? 'lazy' : 'eager'}
          decoding={isLazy ? 'async' : 'sync'}
          sizes={sizes}
          className={`
            transition-opacity duration-700 ease-out-expo
            ${fill ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-auto'}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${hasError ? 'hidden' : ''}
          `}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          {...props}
        />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-grafite/5 text-grafite/30 text-caption uppercase tracking-wider">
            Imagem indisponivel
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';