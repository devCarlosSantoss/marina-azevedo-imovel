import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { Container, Section, Badge } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { TiltCard } from '@/components/effects/TiltCard';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  transaction: 'Compra' | 'Venda' | 'Temporada';
  quote: string;
  stars: number;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Roberto & Heloísa Silveira',
    role: 'Família residente',
    location: 'Alphaville Litoral Norte',
    transaction: 'Compra',
    stars: 5,
    highlight: 'Curadoria precisa e economia de tempo',
    quote:
      'A curadoria da Marina nos economizou semanas de visitas improdutivas. Ela entendeu exatamente o momento dos nossos filhos, a necessidade de jardim integrado e nos apresentou apenas opções que realmente faziam sentido. Todo o processo de documentação foi transparente.',
  },
  {
    id: 'dep-2',
    name: 'Dra. Beatriz Valente',
    role: 'Investidora imobiliária',
    location: 'Corredor da Vitória, Salvador',
    transaction: 'Compra',
    stars: 5,
    highlight: 'Segurança jurídica e discrição absoluta',
    quote:
      'Em negociações de alto padrão, a discrição é essencial. Marina conduziu a aquisição da nossa cobertura com extremo sigilo, análise jurídica impecável de cada certidão e postura consultiva exemplar do início à lavratura da escritura.',
  },
  {
    id: 'dep-3',
    name: 'Marcelo & Camila Fontes',
    role: 'Proprietários de imóvel de veraneio',
    location: 'Praia do Forte',
    transaction: 'Venda',
    stars: 5,
    highlight: 'Avaliação criteriosa e venda no valor justo',
    quote:
      'Colocamos nossa vila em Praia do Forte para venda exclusiva com a Marina. As fotografias de divulgação, a qualificação dos interessados antes das visitas e a condução da proposta superaram todas as expectativas. Recomendo de olhos fechados.',
  },
];

export function Testimonials() {
  const reducedMotion = useReducedMotion();

  return (
    <Section
      id="depoimentos"
      className="relative overflow-hidden border-y border-grafite/10 bg-areia/15"
      aria-labelledby="testimonials-title"
    >
      <div
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-verde-oliva/8 blur-[140px]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="mb-14 max-w-3xl md:mb-18">
          <Reveal variant="fade" duration={0.7}>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="default" size="sm">
                Confiança & Resultados
              </Badge>
              <span className="flex items-center gap-1 text-caption font-medium uppercase tracking-wider text-verde-oliva">
                <ShieldCheck className="h-3.5 w-3.5" />
                Atendimento Consultivo
              </span>
            </div>
          </Reveal>

          <AnimatedHeading
            as="h2"
            id="testimonials-title"
            amount={0.4}
            className="mb-6 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
            segments={[
              { text: 'O que dizem os ' },
              { text: 'clientes', className: 'italic text-terracota' },
            ]}
          />

          <Reveal variant="up" delay={0.15}>
            <p className="text-body-lg font-light leading-relaxed text-grafite/70">
              Histórias reais de compradores, proprietários e investidores que confiaram na curadoria
              de Marina Azevedo para suas decisões patrimoniais em Salvador e no Litoral Norte.
            </p>
          </Reveal>
        </div>

        <div
          className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Depoimentos de clientes"
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: reducedMotion ? 0 : index * 0.14,
                duration: reducedMotion ? 0 : 0.75,
                ease: easeEditorial,
              }}
              className="flex h-full"
              role="listitem"
            >
              <TiltCard maxTilt={4} className="flex w-full">
                <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-grafite/15 bg-off-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-verde-oliva/40 hover:shadow-xl md:p-8">
                  <Quote className="pointer-events-none absolute -right-2 -top-2 h-20 w-20 text-areia/40" aria-hidden="true" />

                  <div className="relative">
                    <div className="mb-4 flex items-center gap-1 text-amber-500" aria-label={`${t.stars} de 5 estrelas`}>
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>

                    <h3 className="mb-3 font-display text-lg font-medium text-grafite">
                      "{t.highlight}"
                    </h3>

                    <p className="mb-6 text-body-sm font-light leading-relaxed text-grafite/70">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-grafite/10 pt-5">
                    <div>
                      <div className="font-display text-body-base font-semibold text-grafite">
                        {t.name}
                      </div>
                      <div className="text-caption text-grafite/55">{t.location}</div>
                    </div>
                    <span className="rounded-full bg-areia/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-grafite/80">
                      {t.transaction}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <Reveal variant="fade" delay={0.2}>
          <p className="mt-12 text-center text-caption italic text-grafite/45">
            * Seção de avaliações de clientes atendidos • Registros de curadoria imobiliária em
            Salvador e Litoral Norte da Bahia.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
