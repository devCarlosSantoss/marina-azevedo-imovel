'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container, Section, OptimizedImage } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { regions, type Region } from '@/data/regions';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

interface RegionCardProps {
  region: Region;
  index: number;
}

function RegionCard({ region, index }: RegionCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.85,
        ease: easeEditorial,
        delay: reducedMotion ? 0 : index * 0.1,
      }}
      className="group relative"
    >
      <Link
        to={`/imoveis?regiao=${encodeURIComponent(region.name)}`}
        className="block overflow-hidden rounded-xl border border-off-white/10 bg-off-white/5"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <OptimizedImage
            src={region.image}
            alt={`${region.name} - Vista da região`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95"
            aria-hidden="true"
          />

          <span
            className="absolute right-5 top-5 font-display text-5xl leading-none text-off-white/15 transition-colors duration-500 group-hover:text-terracota/40"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="mb-2 font-display text-display-sm leading-tight text-off-white md:text-2xl">
              {region.name}
            </h3>
            <p className="text-body-sm leading-relaxed text-areia/75">{region.description}</p>

            <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out-expo group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {region.neighborhoods.slice(0, 4).map((neighborhood) => (
                    <span
                      key={neighborhood}
                      className="rounded-full border border-off-white/15 bg-off-white/5 px-2.5 py-1 text-[11px] text-areia/80 backdrop-blur-sm"
                    >
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <span className="mt-5 inline-flex items-center gap-2 text-caption font-medium uppercase tracking-[0.16em] text-off-white">
              Ver imóveis
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-off-white/25 transition-all duration-400 group-hover:border-terracota group-hover:bg-terracota">
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function Regions() {
  return (
    <Section variant="dark" id="regioes" className="relative overflow-hidden" aria-labelledby="regions-title">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-verde-oliva/15 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-terracota/12 blur-[160px]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal variant="fade" duration={0.7}>
              <span className="eyebrow mb-5">Onde atuo</span>
            </Reveal>
            <AnimatedHeading
              as="h2"
              id="regions-title"
              amount={0.5}
              className="font-display text-display-md leading-[1.12] tracking-[-0.02em] text-off-white md:text-display-lg"
              segments={[
                { text: 'Territórios que conheço\n' },
                { text: 'de perto.', className: 'italic text-areia' },
              ]}
            />
          </div>

          <Reveal variant="right" delay={0.2} className="max-w-md lg:text-right">
            <p className="text-body-base font-light leading-relaxed text-areia/65">
              Conhecimento local sobre condomínios, mobilidade, orientação solar e potencial de cada
              endereço — para decidir com segurança.
            </p>
          </Reveal>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
          role="list"
          aria-label="Regiões de atuação"
        >
          {regions.map((region: Region, index: number) => (
            <RegionCard key={region.id} region={region} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
