import { motion } from 'framer-motion';
import { Home, KeySquare, TrendingUp, Globe2 } from 'lucide-react';
import { Container, Section, SEO } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { services, processSteps } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

const serviceIcons: Record<string, React.ElementType> = {
  buy: Home,
  sell: KeySquare,
  invest: TrendingUp,
  consult: Globe2,
};

export function Services() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Como Trabalho | Marina Azevedo"
        description="Compra, venda, investimento e atendimento consultivo para clientes de fora do país ou de outras cidades."
      />
      <Section className="pb-16 pt-32 md:pt-40" aria-labelledby="services-title">
        <Container size="xl">
          <div className="mb-16 max-w-3xl">
            <Reveal variant="fade" duration={0.7}>
              <span className="eyebrow mb-4">Como trabalho</span>
            </Reveal>
            <AnimatedHeading
              as="h1"
              id="services-title"
              amount={0.3}
              className="font-display text-display-lg leading-[1.04] tracking-[-0.02em] text-grafite md:text-display-xl"
              segments={[
                { text: 'Uma busca mais objetiva.\nUma decisão mais ' },
                { text: 'segura.', className: 'italic text-terracota' },
              ]}
            />
            <Reveal variant="up" delay={0.2}>
              <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-grafite/60">
                Do primeiro contato à entrega das chaves, cada etapa é conduzida com clareza,
                transparência e atenção aos detalhes.
              </p>
            </Reveal>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8" role="list" aria-label="Serviços">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Home;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.1, duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
                  className="group relative overflow-hidden rounded-xl border border-grafite/10 bg-off-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-verde-oliva/40 hover:shadow-xl md:p-10"
                  role="listitem"
                >
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-areia/20 blur-2xl transition-opacity duration-500 group-hover:bg-terracota/15"
                    aria-hidden="true"
                  />
                  <Icon className="mb-6 h-8 w-8 text-verde-oliva transition-colors duration-400 group-hover:text-terracota" aria-hidden="true" />
                  <h2 className="mb-4 font-display text-display-md text-grafite">{service.title}</h2>
                  <p className="text-body-base leading-relaxed text-grafite/60">{service.description}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: easeEditorial }}
            className="mb-16"
          >
            <h2 className="font-display text-display-md text-grafite mb-8 text-balance">Como conduzo cada processo</h2>
            <div className="max-w-3xl" role="list" aria-label="Etapas do trabalho">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.1, duration: reducedMotion ? 0 : 0.5 }}
                  className="relative pl-10 md:pl-14 pb-10 border-l border-grafite/10 last:border-0 last:pb-0"
                  role="listitem"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-grafite/5 border border-grafite/10">
                      <span className="font-display text-display-sm text-grafite/30">{step.number}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-display text-grafite text-display-sm mb-3">{step.title}</h3>
                      <p className="text-body-base text-grafite/60 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-12 text-body-sm text-grafite/50 border-t border-grafite/10 pt-8 max-w-2xl">
              Não prometo aprovação de crédito, venda rápida, valorização, rentabilidade ou resultados garantidos. Meu compromisso é com a clareza do processo e a qualidade da sua decisão.
            </p>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}