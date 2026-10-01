import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

export function SEO({ title, description, image, noindex }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setTag = (selector: string, attr: string, value: string, isProperty = false) => {
      const existing = document.querySelector(selector);
      if (existing) {
        existing.setAttribute('content', value);
      } else {
        const meta = document.createElement('meta');
        if (isProperty) meta.setAttribute('property', attr);
        else meta.name = attr;
        meta.content = value;
        document.head.appendChild(meta);
      }
    };

    if (description) {
      setTag('meta[name="description"]', 'description', description);
      setTag('meta[property="og:description"]', 'og:description', description, true);
      setTag('meta[name="twitter:description"]', 'twitter:description', description);
    }

    setTag('meta[property="og:title"]', 'og:title', title, true);
    setTag('meta[property="twitter:title"]', 'twitter:title', title);

    if (image) {
      setTag('meta[property="og:image"]', 'og:image', image, true);
      setTag('meta[name="twitter:image"]', 'twitter:image', image);
    }

    if (noindex) {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.setAttribute('content', 'noindex, nofollow');
    }
  }, [title, description, image, noindex]);

  return null;
}
