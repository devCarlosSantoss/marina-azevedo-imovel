'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties } from '@/context/PropertyContext';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export function PropertyHighlight() {
  const reducedMotion = useReducedMotion();
  const { properties } = useProperties();

  const featuredList = properties.filter((p) => p.featured);
  const displayList = featuredList.length > 0 ? featuredList.slice(0, 4) : properties.slice(0, 4);

  return (
    <Section id="imoveis" aria-labelledby="property-highlight-title">
      <Container size="xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal variant="fade" duration={0.7}>
              <span className="eyebrow mb-5">Seleção exclusiva</span>
            </Reveal>
            <AnimatedHeading
              as="h2"
              id="property-highlight-title"
              amount={0.5}
              className="mb-6 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
              segments="Imóveis em destaque"
            />
            <Reveal variant="up" delay={0.15}>
              <p className="text-body-lg leading-relaxed text-grafite/60">
                Uma seleção criteriosa de propriedades exclusivas para diferentes formas de viver e
                investir.
              </p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={0.2} className="hidden lg:block">
            <Link
              to="/imoveis"
              className="group inline-flex items-center gap-2 text-body-sm font-medium text-grafite/70 transition-colors hover:text-grafite"
            >
              Ver catálogo completo
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-grafite/20 transition-all duration-400 group-hover:border-grafite group-hover:bg-grafite group-hover:text-off-white">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10" role="list" aria-label="Imóveis em destaque">
          {displayList.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
          className="mt-16 text-center md:mt-20"
        >
          <Link
            to="/imoveis"
            className="btn-secondary group inline-flex items-center justify-center gap-2 px-10 py-5 text-body-lg"
          >
            Ver todos os imóveis ({properties.length})
            <ChevronRight className="h-5 w-5 transition-transform duration-400 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
