'use client';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Container, Section, OptimizedImage, WhatsAppIcon } from '@/components/ui';
import { AnimatedHeading, Reveal, Magnetic } from '@/components/anim';
import { getWhatsAppLink } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export function CTA() {
  const reducedMotion = useReducedMotion();

  return (
    <Section variant="dark" id="contato" className="relative overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt="Detalhe arquitetônico contemporâneo com textura de concreto e luz natural"
          priority
          fill
          sizes="100vw"
          className="object-cover opacity-[0.08]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="animate-aurora absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-verde-oliva/20 blur-[150px]" />
        <div
          className="animate-aurora absolute right-1/4 bottom-0 h-[26rem] w-[26rem] rounded-full bg-terracota/20 blur-[150px]"
          style={{ animationDelay: '-8s' }}
        />
      </div>

      <div className="grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <Container size="lg" className="relative z-10 text-center">
        <Reveal variant="fade" duration={0.7}>
          <span className="eyebrow mb-6 justify-center text-areia">Vamos conversar</span>
        </Reveal>

        <AnimatedHeading
          as="h2"
          id="cta-title"
          amount={0.4}
          className="mx-auto mb-8 max-w-3xl font-display text-display-md leading-[1.06] tracking-[-0.02em] text-off-white md:text-display-lg"
          segments={[
            { text: 'Seu próximo espaço\ncomeça com uma ' },
            { text: 'conversa.', className: 'italic text-areia' },
          ]}
        />

        <Reveal variant="up" delay={0.2}>
          <p className="mx-auto mb-12 max-w-2xl text-body-lg leading-relaxed text-areia/70">
            Conte o que você procura. Vamos transformar critérios, desejos e possibilidades em uma
            busca mais objetiva.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic className="w-full sm:w-auto">
            <button
              onClick={() => window.open(getWhatsAppLink(), '_blank')}
              className="btn-whatsapp group inline-flex w-full items-center justify-center gap-2 rounded-full px-9 py-4 text-body-lg sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5 text-verde-oliva transition-colors group-hover:text-off-white" aria-hidden="true" />
              Conversar pelo WhatsApp
            </button>
          </Magnetic>

          <Link
            to="/imoveis"
            className="group inline-flex items-center gap-2 rounded-full border border-areia/40 px-9 py-4 text-body-lg text-areia transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-areia hover:bg-areia/10"
          >
            Explorar imóveis
            <ChevronRight className="h-5 w-5 transition-transform duration-400 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>

        <Reveal variant="fade" delay={0.3}>
          <div className="divider-accent mx-auto mt-20 max-w-md" aria-hidden="true" />
        </Reveal>
      </Container>
    </Section>
  );
}
