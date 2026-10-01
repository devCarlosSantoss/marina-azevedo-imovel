'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { manifestoIndicators } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export function Manifesto() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="manifesto"
      className="relative overflow-hidden py-[clamp(4.5rem,9vw,8rem)]"
      aria-labelledby="manifesto-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-areia/20 to-transparent" aria-hidden="true" />

      <Container size="lg">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <Reveal variant="fade" duration={0.7}>
            <span className="eyebrow mb-5 justify-center">Manifesto</span>
          </Reveal>

          <AnimatedHeading
            as="h2"
            amount={0.5}
            className="mb-7 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
            segments={[
              { text: 'Escolhas imobiliárias\npedem mais ' },
              { text: 'contexto.', className: 'italic text-terracota' },
            ]}
          />

          <Reveal variant="up" delay={0.2}>
            <p className="text-body-lg leading-relaxed text-grafite/60">
              Cada imóvel tem uma planta, uma localização e um valor. Mas uma boa escolha também
              envolve luz, vizinhança, mobilidade, rotina, potencial e futuro. Meu trabalho é ajudar
              você a enxergar o que realmente importa antes de decidir.
            </p>
          </Reveal>
        </div>

        <div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-grafite/10 bg-grafite/10 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Indicadores de atuação"
        >
          {manifestoIndicators.map((indicator: string, index: number) => (
            <motion.div
              key={indicator}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: reducedMotion ? 0 : 0.1 + index * 0.1,
                duration: reducedMotion ? 0 : 0.6,
                ease: easeEditorial,
              }}
              className="group relative bg-off-white p-6 transition-colors duration-500 hover:bg-cream md:p-7"
              role="listitem"
            >
              <span className="mb-4 block font-display text-sm text-verde-oliva/70 transition-colors duration-300 group-hover:text-terracota">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-body-base font-medium leading-snug text-grafite/80">
                {indicator}
              </p>
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-terracota transition-all duration-500 ease-out-expo group-hover:w-full"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
