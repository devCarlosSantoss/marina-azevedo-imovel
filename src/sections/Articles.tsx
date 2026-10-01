'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container, Section, OptimizedImage } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { articles, type Article } from '@/data/articles';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

interface ArticleCardProps {
  article: Article;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : 0.8,
        ease: easeEditorial,
        delay: reducedMotion ? 0 : index * 0.1,
      }}
      className="group flex flex-col"
    >
      <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg">
        <OptimizedImage
          src={article.image}
          alt={`${article.title} - Imagem ilustrativa do artigo`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1000ms] ease-out-expo group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-grafite/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 rounded-full bg-off-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-grafite backdrop-blur-md">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-2 text-caption uppercase tracking-wider text-grafite/45">
          <span>{article.readTime}</span>
        </div>

        <h3 className="mb-3 font-display text-display-sm leading-tight text-grafite transition-colors duration-300 group-hover:text-verde-oliva">
          {article.title}
        </h3>

        <p className="mb-5 line-clamp-3 text-body-sm leading-relaxed text-grafite/60">
          {article.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-medium text-grafite transition-colors group-hover:text-terracota">
          Ler artigo
          <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}

export function Articles() {
  return (
    <Section id="caderno" aria-labelledby="articles-title">
      <Container size="xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal variant="fade" duration={0.7}>
              <span className="eyebrow mb-5">Caderno</span>
            </Reveal>
            <AnimatedHeading
              as="h2"
              id="articles-title"
              amount={0.5}
              className="mb-6 font-display text-display-md leading-[1.12] tracking-[-0.02em] text-grafite md:text-display-lg"
              segments={[
                { text: 'Caderno de ' },
                { text: 'imóveis', className: 'italic text-terracota' },
              ]}
            />
            <Reveal variant="up" delay={0.15}>
              <p className="text-body-lg leading-relaxed text-grafite/60">
                Referências e conversas para escolher um lugar com mais intenção.
              </p>
            </Reveal>
          </div>

          <Reveal variant="right" delay={0.2} className="hidden lg:block">
            <button className="btn-secondary group inline-flex items-center gap-2 px-6 py-3 text-body-sm">
              Ver todos os artigos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        <div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-9"
          role="list"
          aria-label="Artigos do caderno"
        >
          {articles.map((article: Article, index: number) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="mt-14 text-center lg:hidden">
          <button className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-body-sm">
            Ver todos os artigos
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </Section>
  );
}
