import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  Search,
  Building2,
  MapPin,
  Tag,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { OptimizedImage, WhatsAppIcon } from '@/components/ui';
import { AnimatedHeading, AnimatedCounter, Magnetic } from '@/components/anim';
import { useReducedMotion, useScrollProgress, easeEditorial } from '@/hooks/useIntersectionObserver';
import { getWhatsAppLink } from '@/data/contact';

type SearchIntent = 'comprar' | 'alugar' | 'vender';

const stats = [
  { value: 120, suffix: '+', label: 'Imóveis curados' },
  { value: 12, suffix: ' anos', label: 'De experiência' },
  { value: 4, suffix: '', label: 'Regiões atendidas' },
];

export function Hero() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();

  const [intent, setIntent] = useState<SearchIntent>('comprar');
  const [selectedRegion, setSelectedRegion] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedPrice, setSelectedPrice] = useState('Todos');

  const [propertyNeighborhood, setPropertyNeighborhood] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('Casa');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 110, mass: 0.9 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const glowTranslateX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const glowTranslateY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (intent === 'vender') {
      const msg = `Olá, Marina! Gostaria de uma avaliação para vender/disponibilizar meu imóvel (${propertyCategory}) localizado em ${propertyNeighborhood || 'Salvador/Litoral Norte'}.`;
      window.open(getWhatsAppLink(msg), '_blank');
      return;
    }

    const params = new URLSearchParams();
    if (intent === 'alugar') params.set('finalidade', 'temporada');
    if (selectedRegion !== 'Todas') params.set('regiao', selectedRegion);
    if (selectedType !== 'Todos') params.set('tipo', selectedType);
    if (selectedPrice !== 'Todos') params.set('preco', selectedPrice);

    navigate(`/imoveis?${params.toString()}`);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('manifesto');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const indicatorOpacity = scrollProgress > 0.08 ? 0 : 1;

  const entrance = (delay: number, duration = 0.8) =>
    reducedMotion ? { delay: 0, duration: 0 } : { delay, duration, ease: easeEditorial };

  const tabs: { id: SearchIntent; label: string }[] = [
    { id: 'comprar', label: 'Quero Comprar' },
    { id: 'alugar', label: 'Temporada / Aluguel' },
    { id: 'vender', label: 'Quero Vender / Avaliar' },
  ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20"
      role="banner"
    >
      <motion.div
        style={{
          x: reducedMotion ? 0 : bgTranslateX,
          y: reducedMotion ? 0 : bgTranslateY,
          scale: 1.08,
        }}
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        aria-hidden="true"
      >
        <OptimizedImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Residência contemporânea brasileira com arquitetura integrada à natureza em Salvador e Litoral Norte"
          priority
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/97 via-grafite/82 to-grafite/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-grafite/70" />
      </motion.div>

      <motion.div
        style={{
          x: reducedMotion ? 0 : glowTranslateX,
          y: reducedMotion ? 0 : glowTranslateY,
        }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="animate-aurora absolute -left-24 top-8 h-[26rem] w-[26rem] rounded-full bg-verde-oliva/25 blur-[120px]" />
        <div
          className="animate-aurora absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-terracota/25 blur-[140px]"
          style={{ animationDelay: '-7s' }}
        />
        <div className="animate-float-slow absolute left-1/2 top-1/3 h-[18rem] w-[18rem] rounded-full bg-areia/10 blur-[110px]" />
      </motion.div>

      <div className="grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={entrance(0, 0.6)}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-off-white/15 bg-off-white/8 px-4 py-2 text-areia backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-terracota" />
              <span className="text-[11px] uppercase tracking-[0.2em]">
                Marina Azevedo • CRECI BA 24.891
              </span>
            </motion.div>

            <AnimatedHeading
              as="h1"
              delay={0.15}
              stagger={0.045}
              className="mb-6 font-display text-[clamp(2.35rem,4.6vw,4rem)] leading-[1.07] tracking-[-0.02em] text-off-white"
              segments={[
                { text: 'Curadoria imobiliária exclusiva\npara quem valoriza ' },
                { text: 'arquitetura, privacidade', className: 'italic font-light text-gradient-light' },
                { text: ' e bem-viver.' },
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={entrance(0.5)}
              className="mb-8 max-w-2xl text-body-base font-light leading-relaxed text-areia/85 md:text-body-lg"
            >
              Assessoria personalizada para{' '}
              <strong className="font-medium text-off-white">
                comprar, vender ou alugar imóveis de alto padrão
              </strong>{' '}
              em Salvador, Vilas do Atlântico, Busca Vida, Alphaville e Praia do Forte.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={entrance(0.65)}
              className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            >
              <Magnetic className="w-full sm:w-auto">
                <Link
                  to="/imoveis"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-off-white bg-off-white px-8 py-4 text-body-base font-medium text-grafite shadow-xl transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:bg-areia hover:shadow-2xl sm:w-auto"
                >
                  <span>Encontrar meu imóvel</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-400 group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <a
                href={getWhatsAppLink('Olá Marina, gostaria de uma consultoria imobiliária personalizada.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-areia/40 px-8 py-4 text-body-base text-off-white backdrop-blur-sm transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-off-white/60 hover:bg-off-white/10"
              >
                <WhatsAppIcon className="h-4 w-4 text-verde-oliva" />
                <span>Falar com a corretora</span>
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={entrance(0.55, 0.9)}
            className="hidden lg:block"
            aria-label="Indicadores da curadoria"
          >
            <div className="glass-dark animate-float-slow rounded-2xl border border-off-white/12 p-7 shadow-2xl">
              <div className="mb-6 flex items-center gap-2 text-caption uppercase tracking-[0.2em] text-areia/70">
                <ShieldCheck className="h-4 w-4 text-verde-oliva" />
                Atendimento consultivo
              </div>

              <div className="space-y-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-off-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="font-body text-3xl font-semibold tabular-nums tracking-tight text-off-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-right text-body-sm text-areia/60">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-1.5 pt-5 border-t border-off-white/10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-terracota text-terracota" aria-hidden="true" />
                ))}
                <span className="ml-2 text-caption text-areia/60">Confiança de clientes</span>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entrance(0.8, 0.9)}
          className="relative mt-9 w-full max-w-5xl overflow-hidden rounded-xl border border-grafite/12 bg-off-white/95 shadow-2xl backdrop-blur-xl md:mt-11"
        >
          <div className="animate-gradient h-1 w-full bg-gradient-to-r from-verde-oliva via-terracota to-verde-oliva" aria-hidden="true" />

          <div className="p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-grafite/10 pb-4" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={intent === tab.id}
                  onClick={() => setIntent(tab.id)}
                  className={`relative rounded-full px-4 py-2 text-body-sm font-medium transition-all duration-300 ${
                    intent === tab.id
                      ? 'bg-grafite text-off-white shadow-sm'
                      : 'bg-transparent text-grafite/65 hover:bg-grafite/5 hover:text-grafite'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <span className="ml-auto hidden items-center gap-1.5 text-caption font-medium text-verde-oliva lg:inline-flex">
                <ShieldCheck className="h-3.5 w-3.5" />
                Discrição e exclusividade
              </span>
            </div>

            <form onSubmit={handleSearchSubmit}>
              {intent === 'vender' ? (
                <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-caption font-semibold uppercase tracking-wider text-grafite/60">
                      Tipo do Imóvel
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                      <select
                        value={propertyCategory}
                        onChange={(e) => setPropertyCategory(e.target.value)}
                        className="field pl-10"
                      >
                        <option value="Casa">Casa / Mansão</option>
                        <option value="Apartamento">Apartamento / Cobertura</option>
                        <option value="Terreno">Terreno em Condomínio</option>
                        <option value="Temporada">Imóvel de Praia / Temporada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-caption font-semibold uppercase tracking-wider text-grafite/60">
                      Bairro ou Condomínio
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                      <input
                        type="text"
                        placeholder="Ex: Busca Vida, Alphaville, Vitória"
                        value={propertyNeighborhood}
                        onChange={(e) => setPropertyNeighborhood(e.target.value)}
                        className="field pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-grafite px-6 py-3 text-body-sm font-medium text-off-white shadow-md transition-colors hover:bg-terracota"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-verde-oliva" />
                      <span>Solicitar avaliação</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1.5 block text-caption font-semibold uppercase tracking-wider text-grafite/60">
                      Região
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="field pl-10"
                      >
                        <option value="Todas">Todas as Regiões</option>
                        <option value="Salvador">Salvador</option>
                        <option value="Litoral Norte">Litoral Norte</option>
                        <option value="Lauro de Freitas">Lauro de Freitas</option>
                        <option value="Camaçari">Camaçari</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-caption font-semibold uppercase tracking-wider text-grafite/60">
                      Tipo de Imóvel
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="field pl-10"
                      >
                        <option value="Todos">Todos os Tipos</option>
                        <option value="Casa">Casas & Vilas</option>
                        <option value="Apartamento">Apartamentos & Coberturas</option>
                        <option value="Temporada">Temporada</option>
                        <option value="Terreno">Terrenos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-caption font-semibold uppercase tracking-wider text-grafite/60">
                      Faixa de Valor
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite/40" />
                      <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="field pl-10"
                      >
                        <option value="Todos">Qualquer Valor</option>
                        <option value="ate-2m">Até R$ 2.000.000</option>
                        <option value="2m-4m">R$ 2.000.000 a R$ 4.000.000</option>
                        <option value="acima-4m">Acima de R$ 4.000.000</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-grafite px-6 py-3 text-body-sm font-medium text-off-white shadow-md transition-colors hover:bg-verde-oliva"
                    >
                      <Search className="h-4 w-4" />
                      <span>Buscar Imóveis</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: indicatorOpacity }}
        transition={entrance(1.2)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-areia/60 transition-colors duration-300 hover:text-areia md:flex"
        aria-label="Role para descobrir mais"
      >
        <span className="text-[11px] uppercase tracking-[0.22em]">Role para descobrir</span>
        <motion.span
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
