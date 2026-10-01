import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function useSEO({ title, description, image, noindex }: SEOProps): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const setMetaTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    const setPropertyTag = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    if (description) {
      setMetaTag('description', description);
      setPropertyTag('og:description', description);
    }

    if (image) {
      setPropertyTag('og:image', image);
    }

    setPropertyTag('og:title', title);

    if (noindex) {
      const existingRobots = document.querySelector('meta[name="robots"]');
      if (existingRobots) {
        existingRobots.setAttribute('content', 'noindex, nofollow');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
      }
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image, noindex]);
}