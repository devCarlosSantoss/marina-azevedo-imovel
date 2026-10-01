import { useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Shield } from 'lucide-react';
import { Container, Section, SEO, Badge, WhatsAppIcon } from '@/components/ui';
import { PropertyGallery } from '@/components/PropertyGallery';
import { PropertySpecs } from '@/components/PropertySpecs';
import { useProperties } from '@/context/PropertyContext';
import { getPropertyWhatsAppLink } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const { getPropertyBySlug } = useProperties();

  const property = useMemo(() => getPropertyBySlug(slug || ''), [slug, getPropertyBySlug]);

  if (!property) {
    return (
      <>
        <SEO title="Imóvel não encontrado | Marina Azevedo" noindex />
        <Section className="pt-40 pb-24 text-center">
          <p className="font-display text-display-lg text-grafite mb-4">Imóvel não encontrado</p>
          <p className="text-body-base text-grafite/60 mb-6">
            O imóvel pesquisado pode ter sido atualizado ou removido do catálogo.
          </p>
          <Link to="/imoveis" className="btn-primary">
            Voltar para a curadoria
          </Link>
        </Section>
      </>
    );
  }

  const whatsappLink = getPropertyWhatsAppLink(property.title);

  return (
    <>
      <SEO
        title={`${property.title} | Marina Azevedo`}
        description={property.subtitle}
        image={property.images?.hero}
      />
      <Section className="pt-32 md:pt-40 pb-20" aria-labelledby="property-title">
        <Container size="xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-body-sm text-grafite/60 hover:text-grafite transition-colors mb-8 cursor-pointer"
            aria-label="Voltar para imóveis"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar para imóveis
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: easeEditorial }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge>{property.category}</Badge>
              {property.featured && (
                <Badge variant="secondary">Exclusivo</Badge>
              )}
              <span className="text-caption uppercase tracking-wider text-verde-oliva flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {property.location?.neighborhood}, {property.location?.city}
              </span>
            </div>
            <h1
              id="property-title"
              className="font-display text-display-lg md:text-display-xl text-grafite leading-[1.05] tracking-[-0.02em] text-balance max-w-3xl"
            >
              {property.title}
            </h1>
            <p className="text-body-lg text-grafite/70 font-light leading-relaxed max-w-2xl mt-4">
              {property.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2 space-y-12">
              <PropertyGallery property={property} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.6 }}
              >
                <h2 className="font-display text-display-md text-grafite mb-6">Sobre este imóvel</h2>
                <div className="space-y-6 text-body-lg text-grafite/75 leading-relaxed font-light">
                  {property.description?.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.6 }}
              >
                <h2 className="font-display text-display-md text-grafite mb-6">Ficha técnica</h2>
                <PropertySpecs property={property} />
              </motion.div>

              {property.features && property.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.4, duration: reducedMotion ? 0 : 0.6 }}
                >
                  <h2 className="font-display text-display-md text-grafite mb-6">Diferenciais</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-body-base text-grafite/80">
                        <span className="w-1.5 h-1.5 bg-terracota rounded-full flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 h-fit" aria-label="Box de contato">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.4,
                  duration: reducedMotion ? 0 : 0.6,
                  ease: easeEditorial,
                }}
                className="p-8 bg-grafite text-off-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-verde-oliva/15 rounded-full blur-2xl pointer-events-none" />

                <p className="text-caption uppercase tracking-widest text-areia/60 mb-3">
                  Valor{property.price?.type === 'Diária' ? ' da diária' : ''}
                </p>
                <p className="mb-6 font-display text-display-md leading-tight text-off-white">
                  {property.price?.formatted || `R$ ${property.price?.value?.toLocaleString('pt-BR')}`}
                </p>
                <p className="text-body-sm text-areia/70 mb-8 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-verde-oliva" />
                  {property.location?.neighborhood}, {property.location?.city}
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full inline-flex items-center justify-center gap-2 text-body-sm bg-terracota hover:bg-terracota/90 text-off-white border-transparent py-4 font-medium shadow-lg"
                  aria-label={`Conversar sobre ${property.title} pelo WhatsApp`}
                >
                  <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
                  Agendar visita pelo WhatsApp
                </a>

                <div className="mt-6 pt-4 border-t border-off-white/15 flex items-center justify-between text-caption text-areia/60">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-verde-oliva" />
                    Atendimento Privativo
                  </span>
                  <span>Resposta rápida</span>
                </div>
              </motion.div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}