'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Container, Section } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { processSteps, type ProcessStep } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

interface StepCardProps {
  step: ProcessStep;
  index: number;
}

function StepCard({ step, index }: StepCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        ease: easeEditorial,
        delay: reducedMotion ? 0 : index * 0.08,
      }}
      className="group relative flex gap-6 pb-12 last:pb-0"
    >
      <div className="relative z-10 flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-full border border-grafite/15 bg-off-white font-display text-lg text-grafite/60 shadow-sm transition-all duration-500 group-hover:border-terracota group-hover:bg-grafite group-hover:text-off-white">
        {step.number}
      </div>

      <div className="flex-1 pt-1.5">
        <h3 className="mb-2.5 font-display text-display-sm leading-tight text-grafite transition-colors duration-300 group-hover:text-verde-oliva">
          {step.title}
        </h3>
        <p className="max-w-xl text-body-base leading-relaxed text-grafite/60">
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 65%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <Section id="como-trabalho" aria-labelledby="process-title" className="relative overflow-hidden">
      <Container size="xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal variant="fade" duration={0.7}>
                <span className="eyebrow mb-5">Como trabalho</span>
              </Reveal>

              <AnimatedHeading
                as="h2"
                id="process-title"
                amount={0.4}
                className="mb-6 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
                segments={[
                  { text: 'Uma busca mais objetiva.\nUma decisão mais ' },
                  { text: 'segura.', className: 'italic text-terracota' },
                ]}
              />

              <Reveal variant="up" delay={0.15}>
                <p className="max-w-md text-body-lg leading-relaxed text-grafite/60">
                  Do primeiro contato à entrega das chaves, cada etapa é conduzida com clareza,
                  transparência e atenção aos detalhes.
                </p>
              </Reveal>
            </div>
          </div>

          <div ref={stepsRef} className="relative lg:col-span-7">
            <div className="absolute bottom-0 left-[1.625rem] top-0 w-px bg-grafite/10" aria-hidden="true" />
            <motion.div
              style={{ scaleY: reducedMotion ? 1 : scaleY }}
              className="absolute bottom-0 left-[1.625rem] top-0 w-px origin-top bg-gradient-to-b from-verde-oliva via-verde-oliva to-terracota"
              aria-hidden="true"
            />

            {processSteps.map((step: ProcessStep, index: number) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        <Reveal variant="fade" delay={0.2}>
          <p className="mt-16 max-w-2xl border-t border-grafite/10 pt-8 text-body-sm text-grafite/50">
            Não prometo aprovação de crédito, venda rápida, valorização, rentabilidade ou resultados
            garantidos. Meu compromisso é com a clareza do processo e a qualidade da sua decisão.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
