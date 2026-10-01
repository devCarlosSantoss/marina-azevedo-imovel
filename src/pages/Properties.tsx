import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Container, Section, SEO } from '@/components/ui';
import { AnimatedHeading } from '@/components/anim';
import { PropertyCard } from '@/components/PropertyCard';
import { useProperties } from '@/context/PropertyContext';
import { useReducedMotion } from '@/hooks/useIntersectionObserver';
import type { Property } from '@/types';

type Filter = 'Todos' | 'Casa' | 'Apartamento' | 'Temporada' | 'Terreno';

const FAVORITES_KEY = 'marina_azevedo_favorites_v1';
const categories: Filter[] = ['Todos', 'Casa', 'Apartamento', 'Temporada', 'Terreno'];
const regionOptions = ['Todas', 'Salvador', 'Litoral Norte', 'Lauro de Freitas', 'Camaçari'];

export function Properties() {
  const [searchParams] = useSearchParams();
  const reducedMotion = useReducedMotion();
  const { properties } = useProperties();

  const [category, setCategory] = useState<Filter>(() => {
    const paramFinalidade = searchParams.get('finalidade');
    const paramTipo = searchParams.get('tipo');
    if (paramFinalidade === 'temporada') return 'Temporada';
    if (paramTipo && categories.includes(paramTipo as Filter)) return paramTipo as Filter;
    return 'Todos';
  });

  const [region, setRegion] = useState<string>(() => {
    const paramRegiao = searchParams.get('regiao');
    if (paramRegiao && regionOptions.includes(paramRegiao)) return paramRegiao;
    return 'Todas';
  });

  const [search, setSearch] = useState<string>(() => searchParams.get('busca') || '');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const paramFinalidade = searchParams.get('finalidade');
    const paramTipo = searchParams.get('tipo');
    const paramRegiao = searchParams.get('regiao');
    const paramBusca = searchParams.get('busca');

    if (paramFinalidade === 'temporada') {
      setCategory('Temporada');
    } else if (paramTipo && categories.includes(paramTipo as Filter)) {
      setCategory(paramTipo as Filter);
    } else if (!paramFinalidade && !paramTipo) {
      setCategory('Todos');
    }

    if (paramRegiao && regionOptions.includes(paramRegiao)) {
      setRegion(paramRegiao);
    } else if (!paramRegiao) {
      setRegion('Todas');
    }

    if (paramBusca !== null) {
      setSearch(paramBusca);
    }
  }, [searchParams]);

  const handleToggleFavorites = () => {
    if (!onlyFavorites) {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        setFavoriteIds(stored ? JSON.parse(stored) : []);
      } catch {}
    }
    setOnlyFavorites((prev) => !prev);
  };

  const filtered = useMemo(() => {
    return properties.filter((p: Property) => {
      if (onlyFavorites && !favoriteIds.includes(p.id)) return false;
      if (category !== 'Todos' && p.category !== category) return false;
      if (region !== 'Todas' && p.location.region !== region) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const haystack = (
          p.title +
          ' ' +
          p.subtitle +
          ' ' +
          p.location.neighborhood +
          ' ' +
          p.location.city
        ).toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [properties, category, region, search, onlyFavorites, favoriteIds]);

  const clearFilters = () => {
    setCategory('Todos');
    setRegion('Todas');
    setSearch('');
    setOnlyFavorites(false);
  };

  const pillClass = (active: boolean) =>
    `whitespace-nowrap rounded-full px-3.5 py-1.5 text-body-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-grafite text-off-white shadow-sm'
        : 'bg-areia/20 text-grafite/70 hover:bg-areia/40 hover:text-grafite'
    }`;

  return (
    <>
      <SEO
        title="Curadoria de Imóveis | Marina Azevedo"
        description="Catálogo exclusivo de casas, coberturas e terrenos em Salvador, Lauro de Freitas, Camaçari e Litoral Norte."
      />
      <Section className="pb-24 pt-32 md:pt-40" aria-labelledby="catalog-title">
        <Container size="xl">
          <div className="mb-12 max-w-3xl">
            <span className="eyebrow mb-4">Curadoria de alto padrão</span>
            <AnimatedHeading
              as="h1"
              id="catalog-title"
              amount={0.3}
              className="mb-5 font-display text-display-lg leading-[1.02] text-grafite md:text-display-xl"
              segments={[
                { text: 'Catálogo de ' },
                { text: 'Imóveis', className: 'italic text-terracota' },
              ]}
            />
            <p className="text-body-lg font-light leading-relaxed text-grafite/70">
              <span className="font-medium text-grafite">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'} com rigor
              arquitetônico, documentação verificada e alto potencial de valorização.
            </p>
          </div>

          <div
            className="mb-10 rounded-xl border border-grafite/12 bg-off-white/80 p-4 shadow-sm backdrop-blur-sm md:p-5"
            aria-label="Filtros do catálogo"
          >
            <div className="mb-4 flex items-center gap-2 text-caption font-semibold uppercase tracking-wider text-grafite/50">
              <SlidersHorizontal className="h-4 w-4 text-verde-oliva" />
              Refine sua busca
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:gap-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-caption font-semibold uppercase tracking-wider text-grafite/45">
                    Tipo
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={pillClass(category === cat)}
                      aria-pressed={category === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-caption font-semibold uppercase tracking-wider text-grafite/45">
                    Região
                  </span>
                  {regionOptions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setRegion(reg)}
                      className={pillClass(region === reg)}
                      aria-pressed={region === reg}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-grafite/10 pt-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por condomínio, bairro..."
                    className="field pl-10"
                  />
                </div>

                <button
                  onClick={handleToggleFavorites}
                  className={`flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border px-5 py-2 text-body-sm font-medium transition-all ${
                    onlyFavorites
                      ? 'border-terracota bg-terracota text-off-white'
                      : 'border-grafite/20 text-grafite/70 hover:border-grafite hover:text-grafite'
                  }`}
                  title="Filtrar imóveis salvos nos favoritos"
                >
                  <Heart className={`h-4 w-4 ${onlyFavorites ? 'fill-current' : ''}`} />
                  <span>Salvos</span>
                </button>
              </div>
            </div>
          </div>

          <motion.div
            key={category + '-' + region + '-' + search + '-' + String(onlyFavorites)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.35 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {filtered.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} isEven={i % 2 === 0} />
            ))}
          </motion.div>

          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto my-8 max-w-2xl rounded-xl border border-areia/40 bg-areia/10 p-10 text-center"
              >
                <p className="mb-2 font-display text-2xl text-grafite">Nenhum imóvel encontrado</p>
                <p className="mb-6 text-body-sm text-grafite/65">
                  {onlyFavorites
                    ? 'Você ainda não marcou nenhum imóvel como favorito. Clique no coração de qualquer imóvel para salvá-lo aqui.'
                    : 'Não encontramos imóveis com os filtros atuais. Experimente limpar os filtros ou buscar por outro bairro.'}
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary inline-flex items-center gap-2 text-body-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Limpar todos os filtros</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  );
}
