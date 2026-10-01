import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Section, SEO, OptimizedImage } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Sobre Marina Azevedo | Corretora de Imóveis"
        description="Manifesto, metodologia de curadoria e atendimento consultivo em Salvador e Litoral Norte da Bahia."
      />
      <Section className="pb-16 pt-32 md:pt-40" aria-labelledby="about-title">
        <Container size="xl">
          <div className="mb-16 max-w-3xl">
            <Reveal variant="fade" duration={0.7}>
              <span className="eyebrow mb-4">Sobre</span>
            </Reveal>
            <AnimatedHeading
              as="h1"
              id="about-title"
              amount={0.3}
              className="font-display text-display-lg leading-[1.04] tracking-[-0.02em] text-grafite md:text-display-xl"
              segments={[
                { text: 'Uma forma mais humana de escolher um ' },
                { text: 'imóvel.', className: 'italic text-terracota' },
              ]}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: reducedMotion ? 0 : 0.8, ease: easeEditorial }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                  alt="Arquitetura contemporânea com linhas limpas e luz natural"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 mt-4 rounded-xl bg-off-white p-8 shadow-[0_30px_60px_-30px_rgba(20,22,19,0.35)] md:absolute md:-bottom-12 md:-left-12 md:mt-0 md:max-w-md md:p-12">
                <p className="mb-4 font-display text-display-sm leading-tight text-grafite">
                  "Menos ruído. Mais contexto para a sua escolha."
                </p>
                <p className="border-t border-grafite/10 pt-4 text-body-sm text-grafite/50">
                  — Marina Azevedo
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.8, ease: easeEditorial }}
              className="space-y-6 text-body-lg text-grafite/70 leading-relaxed"
            >
              <p>
                Marina Azevedo atua com curadoria imobiliária residencial em Salvador e no Litoral Norte da Bahia. Seu trabalho parte de uma escuta atenta para entender o momento de cada cliente e transformar desejos, critérios e possibilidades em uma busca mais clara.
              </p>
              <p>
                Com olhar para localização, arquitetura, rotina e potencial, Marina acompanha processos de compra, venda e investimento de forma próxima, organizada e transparente.
              </p>
              <p>
                A metodologia de trabalho é baseada em quatro princípios: escuta profunda, curadoria criteriosa, visitas orientadas e negociação transparente. Cada etapa é documentada e cada decisão é compartilhada com contexto.
              </p>

              <div className="mt-10 pt-10 border-t border-grafite/10 space-y-4">
                <h2 className="font-display text-display-md text-grafite">Metodologia de curadoria</h2>
                <p>
                  Cada imóvel passa por uma avaliação criteriosa: localização e entorno, orientação solar, qualidade da planta, acústica, infraestrutura do condomínio, documentação e potencial de valorização.
                </p>
                <p>
                  O resultado é uma seleção enxuta — sem excesso de opções que confundem, mas com profundidade suficiente para escolhas seguras.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/servicos" className="btn-primary inline-flex items-center justify-center px-6 py-3 text-body-sm">
                  Conhecer como trabalho
                </Link>
                <Link to="/contato" className="btn-secondary inline-flex items-center justify-center px-6 py-3 text-body-sm border border-grafite/30 hover:bg-grafite/5">
                  Entrar em contato
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}