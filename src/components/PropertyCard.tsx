'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Maximize,
  Bed,
  Bath,
  Car,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { OptimizedImage, Badge } from '@/components/ui';
import { TiltCard } from '@/components/effects/TiltCard';
import type { Property } from '@/types';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

interface PropertyCardProps {
  property: Property;
  index?: number;
  isEven?: boolean;
}

const FAVORITES_KEY = 'marina_azevedo_favorites_v1';

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const reducedMotion = useReducedMotion();
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const favs: string[] = JSON.parse(stored);
        return favs.includes(property.id);
      }
    } catch {}
    return false;
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      const favs: string[] = stored ? JSON.parse(stored) : [];
      let updated: string[];
      if (favs.includes(property.id)) {
        updated = favs.filter((id) => id !== property.id);
        setIsFavorite(false);
      } else {
        updated = [...favs, property.id];
        setIsFavorite(true);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const categoryMap: Record<string, string> = {
    Casa: 'Casa',
    Apartamento: 'Apartamento',
    Temporada: 'Temporada',
    Terreno: 'Terreno',
  };

  const categoryLabel = categoryMap[property.category] || property.category;
  const isRent = property.price?.type === 'Diária';

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: easeEditorial,
        delay: reducedMotion ? 0 : (index % 3) * 0.1,
      }}
      className="h-full w-full"
      role="listitem"
    >
      <TiltCard maxTilt={reducedMotion ? 0 : 4} className="h-full w-full">
        <div className="property-card group relative flex h-full flex-col overflow-hidden rounded-xl border border-grafite/15 bg-off-white transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-verde-oliva/50 hover:shadow-[0_30px_60px_-30px_rgba(20,22,19,0.4)]">
          <Link to={`/imoveis/${property.slug}`} className="flex flex-col h-full">
            {/* Standardized Aspect Ratio Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-areia/20">
              <OptimizedImage
                src={property.images?.hero || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                priority={index < 2}
              />

              {/* Badges on Top Left */}
              <div className="absolute top-3.5 left-3.5 flex gap-2 flex-wrap z-10">
                <Badge variant="default" size="sm" className="backdrop-blur-md shadow-sm">
                  {categoryLabel}
                </Badge>
                {isRent && (
                  <Badge variant="secondary" size="sm" className="backdrop-blur-md">
                    Temporada
                  </Badge>
                )}
                {property.featured && (
                  <span className="bg-terracota text-off-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 backdrop-blur-md shadow-sm">
                    Exclusivo
                  </span>
                )}
              </div>

              {/* Bookmark / Favorite Button */}
              <motion.button
                type="button"
                onClick={toggleFavorite}
                whileTap={{ scale: 0.85 }}
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Salvar imóvel nos favoritos'}
                className="absolute top-3.5 right-3.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-off-white/90 text-grafite shadow-md backdrop-blur-md transition-transform hover:scale-110 hover:bg-off-white"
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorite ? 'fill-terracota text-terracota' : 'text-grafite/60 hover:text-grafite'
                  }`}
                />
              </motion.button>

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-grafite/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out-expo" />
            </div>

            {/* Card Content & Details */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              {/* Location */}
              <div className="flex items-center gap-1.5 text-caption text-grafite/60 mb-2">
                <MapPin className="w-3.5 h-3.5 text-verde-oliva flex-shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {property.location?.neighborhood}, {property.location?.city}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-display-sm text-grafite leading-tight mb-2 group-hover:text-verde-oliva transition-colors duration-300">
                {property.title}
              </h3>

              {/* Subtitle */}
              <p className="text-body-sm text-grafite/65 leading-relaxed mb-4 line-clamp-2 font-light">
                {property.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mb-4 pt-2">
                <span className="text-caption uppercase tracking-wider text-grafite/50 block text-[11px]">
                  Valor {isRent ? 'da diária' : 'de venda'}
                </span>
                <span className="font-display text-2xl font-semibold text-grafite">
                  {property.price?.formatted || `R$ ${property.price?.value?.toLocaleString('pt-BR')}`}
                </span>
              </div>

              {/* Scan-Friendly Specs Grid */}
              <div className="grid grid-cols-4 gap-1 py-3 border-y border-grafite/10 text-center mb-4 mt-auto">
                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-caption font-medium text-grafite">
                    <Maximize className="w-3.5 h-3.5 text-verde-oliva" />
                    {property.specs?.areaM2}m²
                  </span>
                  <span className="text-[10px] text-grafite/50 uppercase">Área</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-caption font-medium text-grafite">
                    <Bed className="w-3.5 h-3.5 text-verde-oliva" />
                    {property.specs?.bedrooms}
                  </span>
                  <span className="text-[10px] text-grafite/50 uppercase">Qtos</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-caption font-medium text-grafite">
                    <Bath className="w-3.5 h-3.5 text-verde-oliva" />
                    {property.specs?.bathrooms}
                  </span>
                  <span className="text-[10px] text-grafite/50 uppercase">Banh</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="flex items-center gap-1 text-caption font-medium text-grafite">
                    <Car className="w-3.5 h-3.5 text-verde-oliva" />
                    {property.specs?.garageSpots}
                  </span>
                  <span className="text-[10px] text-grafite/50 uppercase">Vagas</span>
                </div>
              </div>

              {/* Dedicated "Ver Imóvel" CTA Button */}
              <div className="mt-auto flex min-h-[46px] w-full items-center justify-between rounded-full bg-grafite/5 px-5 py-2.5 text-body-sm font-medium text-grafite transition-all duration-400 ease-out-expo group-hover:bg-grafite group-hover:text-off-white">
                <span>Ver detalhes completos</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </TiltCard>
    </motion.article>
  );
}
