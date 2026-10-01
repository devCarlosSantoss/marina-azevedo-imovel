'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { Property } from '@/types';

interface PropertyGalleryProps {
  property: Property;
}

export function PropertyGallery({ property }: PropertyGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImage = property.images?.hero || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80';
  const galleryImages = property.images?.gallery || [];
  const allImages = galleryImages.length > 0 ? galleryImages : [heroImage];

  const openLightbox = (index: number = 0) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Lock body scroll and enable keyboard shortcuts when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, closeLightbox, prevImage, nextImage]);

  return (
    <>
      {/* Grid on Property Detail Page */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Main Hero Photo */}
        <div
          className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden bg-areia/20 rounded-sm"
          onClick={() => openLightbox(0)}
          onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
          role="button"
          tabIndex={0}
          aria-label={`Ampliar imagem principal de ${property.title}`}
        >
          <img
            src={heroImage}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-grafite/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-grafite/60 backdrop-blur-md text-off-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="md:col-span-2 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {allImages.slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] cursor-zoom-in group overflow-hidden bg-areia/20 rounded-sm"
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`Ver foto ${index + 1} da galeria de ${property.title}`}
            >
              <img
                src={image}
                alt={`${property.title} - Foto ${index + 1}`}
                className="object-cover w-full h-full transition-transform duration-700 ease-out-expo group-hover:scale-105"
                loading={index > 2 ? 'lazy' : undefined}
              />
              {index === 5 && allImages.length > 6 && (
                <div className="absolute inset-0 bg-grafite/75 backdrop-blur-xs flex items-center justify-center text-off-white font-display text-lg sm:text-display-sm font-medium">
                  +{allImages.length - 6} fotos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Mobile-First Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-grafite/95 backdrop-blur-md select-none"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização de imagem em tela cheia"
          >
            {/* Top Bar with Title, Counter and Close Button */}
            <div
              className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-grafite/80 border-b border-off-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0 pr-4">
                <span className="text-caption uppercase tracking-wider text-areia/70 block truncate text-[11px]">
                  {property.title}
                </span>
                <span className="text-caption text-off-white/60 text-[11px]">
                  Foto {currentImageIndex + 1} de {allImages.length}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-off-white/10 text-off-white hover:bg-off-white/20 transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                aria-label="Fechar visualização de imagem"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Stage (100% Centered & Responsive on Mobile) */}
            <div
              className="relative flex-1 flex items-center justify-center p-2 sm:p-6 min-h-0 w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-grafite/70 text-off-white hover:bg-grafite border border-off-white/20 transition-all cursor-pointer shadow-xl min-h-[44px] min-w-[44px]"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Displayed Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-full max-h-full flex items-center justify-center"
                >
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${property.title} - Imagem ${currentImageIndex + 1} de ${allImages.length}`}
                    className="max-w-[calc(100vw-16px)] sm:max-w-[85vw] max-h-[68vh] sm:max-h-[76vh] w-auto h-auto object-contain rounded-xs shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-grafite/70 text-off-white hover:bg-grafite border border-off-white/20 transition-all cursor-pointer shadow-xl min-h-[44px] min-w-[44px]"
                  aria-label="Próxima foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {allImages.length > 1 && (
              <div
                className="relative z-20 px-3 py-2.5 sm:px-6 sm:py-3 bg-grafite/80 border-t border-off-white/10 flex items-center justify-center gap-2 overflow-x-auto max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {allImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-12 h-9 sm:w-16 sm:h-11 rounded-xs overflow-hidden flex-shrink-0 transition-all cursor-pointer border-2 ${
                      idx === currentImageIndex
                        ? 'border-terracota scale-105 opacity-100 shadow-md'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                    aria-label={`Ver foto ${idx + 1}`}
                  >
                    <img
                      src={thumb}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
