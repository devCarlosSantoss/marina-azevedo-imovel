'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Compass, FileCheck2, UserCheck } from 'lucide-react';
import { Container, Section, OptimizedImage, Badge } from '@/components/ui';
import { AnimatedHeading, Reveal, AnimatedCounter } from '@/components/anim';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

const pillars = [
  {
    icon: Compass,
    title: 'Curadoria Criteriosa',
    desc: 'Seleção orientada pelo seu estilo de vida e necessidades reais, evitando visitas improdutivas.',
  },
  {
    icon: FileCheck2,
    title: 'Segurança Jurídica',
    desc: 'Análise documental e certidões completas antes de qualquer proposta ou compromisso.',
  },
  {
    icon: UserCheck,
    title: 'Visitas Privativas & Sigilo',
    desc: 'Atendimento discreto e agendamentos privativos para clientes que prezam por privacidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Suporte até a Escritura',
    desc: 'Acompanhamento do início à entrega das chaves e registro no cartório de imóveis.',
  },
];

const credentials = [
  { value: 120, suffix: '+', label: 'Imóveis intermediados' },
  { value: 12, suffix: '', label: 'Anos de mercado' },
  { value: 100, suffix: '%', label: 'Sigilo nos processos' },
];

export function About() {
  const reducedMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <Section id="sobre" aria-labelledby="about-title" className="overflow-hidden">
      <Container size="xl">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: easeEditorial }}
            className="relative lg:col-span-5"
          >
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-grafite/10 bg-areia/30 shadow-2xl"
            >
              <motion.div style={{ y: reducedMotion ? 0 : parallaxY }} className="absolute -inset-y-[6%] inset-x-0">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=80"
                  alt="Marina Azevedo, corretora de imóveis de alto padrão em Salvador e Litoral Norte da Bahia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 -mt-10 ml-4 mr-4 bg-off-white p-6 shadow-[0_30px_60px_-30px_rgba(20,22,19,0.4)] sm:mr-0 sm:ml-0 sm:-mt-12 md:absolute md:-bottom-10 md:-left-8 md:mt-0 md:max-w-sm md:p-8">
              <p className="mb-3 font-display text-lg italic leading-snug text-grafite md:text-xl">
                "Menos ruído. Mais contexto e segurança para a sua decisão."
              </p>
              <div className="border-t border-grafite/10 pt-3">
                <span className="block font-display text-body-base font-semibold text-grafite">
                  Marina Azevedo
                </span>
                <span className="text-caption text-grafite/60">CRECI BA 24.891 • Corretora de Imóveis</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 lg:pl-6">
            <Reveal variant="fade" duration={0.7}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="default" size="sm">
                  Atendimento Consultivo
                </Badge>
                <span className="text-caption font-medium uppercase tracking-wider text-verde-oliva">
                  Salvador & Litoral Norte
                </span>
              </div>
            </Reveal>

            <AnimatedHeading
              as="h2"
              id="about-title"
              amount={0.35}
              className="mb-6 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
              segments={[
                { text: 'Uma abordagem criteriosa e humana para o seu ' },
                { text: 'patrimônio.', className: 'italic text-terracota' },
              ]}
            />

            <Reveal variant="up" delay={0.15}>
              <div className="mb-9 space-y-4 text-body-base leading-relaxed text-grafite/75 md:text-body-lg">
                <p>
                  Atuo com foco exclusivo em imóveis residenciais de alto padrão em{' '}
                  <strong>Salvador, Vilas do Atlântico, Busca Vida, Alphaville e Litoral Norte da Bahia</strong>.
                </p>
                <p>
                  Minha consultoria parte de uma escuta atenta para compreender a rotina da sua
                  família, o momento financeiro e os critérios arquitetônicos, transformando a busca
                  imobiliária em uma experiência agradável, clara e segura.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.2}>
              <div className="mb-10 grid grid-cols-3 gap-4 border-y border-grafite/10 py-6">
                {credentials.map((item) => (
                  <div key={item.label}>
                    <div className="font-body text-3xl font-semibold tabular-nums tracking-tight text-grafite md:text-4xl">
                      <AnimatedCounter value={item.value} suffix={item.suffix} />
                    </div>
                    <div className="mt-1 text-caption leading-snug text-grafite/55">{item.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    delay: reducedMotion ? 0 : i * 0.08,
                    duration: reducedMotion ? 0 : 0.6,
                    ease: easeEditorial,
                  }}
                  className="group flex items-start gap-3.5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-areia/50 bg-areia/25 text-verde-oliva transition-all duration-400 group-hover:border-terracota/40 group-hover:bg-terracota/10 group-hover:text-terracota">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-body-base font-semibold leading-tight text-grafite">
                      {p.title}
                    </h3>
                    <p className="text-caption leading-relaxed text-grafite/65">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
