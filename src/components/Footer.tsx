'use client';

import { Link } from 'react-router-dom';
import { Mail, Share2, Link2, Shield, ArrowUpRight } from 'lucide-react';
import { Container, WhatsAppIcon } from '@/components/ui';
import { contactInfo } from '@/data/contact';
import { motion } from 'framer-motion';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';

const footerLinks = [
  { label: 'Comprar', to: '/imoveis' },
  { label: 'Alugar / Temporada', to: '/imoveis?finalidade=temporada' },
  { label: 'Vender Imóvel', to: '/contato?interesse=vender' },
  { label: 'Sobre Marina', to: '/sobre' },
  { label: 'Como Trabalho', to: '/servicos' },
  { label: 'Contato', to: '/contato' },
];

const regionLinks = [
  { label: 'Salvador', to: '/imoveis?regiao=Salvador' },
  { label: 'Lauro de Freitas', to: '/imoveis?regiao=Lauro%20de%20Freitas' },
  { label: 'Camaçari', to: '/imoveis?regiao=Cama%C3%A7ari' },
  { label: 'Litoral Norte', to: '/imoveis?regiao=Litoral%20Norte' },
];

export function Footer() {
  const reducedMotion = useReducedMotion();

  return (
    <footer
      className="relative overflow-hidden border-t border-off-white/10 bg-grafite py-16 text-off-white md:py-20"
      role="contentinfo"
    >
      <div
        className="animate-gradient pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracota/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-verde-oliva/10 blur-[140px]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
            className="md:col-span-5"
          >
            <div className="mb-2 font-display tracking-tight">
              <div className="text-display-sm font-medium leading-[0.95]">MARINA</div>
              <div className="text-display-sm font-medium leading-[0.95]">AZEVEDO</div>
            </div>
            <p className="mb-7 text-caption uppercase tracking-[0.22em] text-areia/60">
              Corretora de Imóveis • CRECI BA 24.891
            </p>

            <div className="max-w-sm space-y-3.5 text-body-sm text-areia/70">
              <p className="font-medium text-off-white">
                Salvador, Lauro de Freitas, Camaçari e Litoral Norte da Bahia
              </p>
              <p className="font-light">
                Curadoria consultiva para compra, venda e locação de alto padrão.
              </p>
              <div className="flex items-center gap-2.5 pt-2">
                <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-verde-oliva" aria-hidden="true" />
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-off-white"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-verde-oliva" aria-hidden="true" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-off-white"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
            className="md:col-span-4"
            aria-label="Navegação do rodapé"
          >
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-5 font-display text-lg font-semibold text-off-white">Navegação</h4>
                <ul className="space-y-3 text-body-sm" role="list">
                  {footerLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-areia/70 transition-colors hover:text-off-white"
                      >
                        <span className="h-px w-0 bg-terracota transition-all duration-400 group-hover:w-3" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-1.5 pt-1 font-medium text-verde-oliva transition-colors hover:text-areia"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      <span>Área da Corretora</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-5 font-display text-lg font-semibold text-off-white">Regiões</h4>
                <ul className="space-y-3 text-body-sm" role="list">
                  {regionLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-areia/70 transition-colors hover:text-off-white"
                      >
                        <span className="h-px w-0 bg-terracota transition-all duration-400 group-hover:w-3" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
            className="space-y-5 md:col-span-3"
          >
            <h4 className="font-display text-lg font-semibold text-off-white">Redes & Contato</h4>
            <div className="flex gap-3" role="list" aria-label="Redes sociais">
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 bg-off-white/10 transition-all duration-400 hover:-translate-y-0.5 hover:bg-terracota"
                aria-label="WhatsApp"
                role="listitem"
              >
                <WhatsAppIcon className="h-5 w-5 text-off-white" aria-hidden="true" />
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 bg-off-white/10 transition-all duration-400 hover:-translate-y-0.5 hover:bg-terracota"
                aria-label="Instagram"
                role="listitem"
              >
                <Share2 className="h-5 w-5 text-off-white" aria-hidden="true" />
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-off-white/15 bg-off-white/10 transition-all duration-400 hover:-translate-y-0.5 hover:bg-terracota"
                aria-label="LinkedIn"
                role="listitem"
              >
                <Link2 className="h-5 w-5 text-off-white" aria-hidden="true" />
              </a>
            </div>

            <Link
              to="/contato"
              className="group inline-flex items-center gap-2 text-body-sm font-medium text-off-white"
            >
              Solicitar atendimento
              <ArrowUpRight className="h-4 w-4 text-terracota transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <p className="border-t border-off-white/10 pt-4 text-caption font-light leading-relaxed text-areia/50">
              Atendimento com confidencialidade e rigor ético. Os dados informados são utilizados
              exclusivamente para suporte ao seu atendimento imobiliário.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-off-white/10 pt-8 text-caption text-areia/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Marina Azevedo • CRECI BA 24.891. Todos os direitos
            reservados.
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-areia/40">
            Curadoria Imobiliária de Alto Padrão
          </p>
        </div>
      </Container>
    </footer>
  );
}
