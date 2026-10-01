'use client';

import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Shield, ChevronRight, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui';
import { getWhatsAppLink, contactInfo } from '@/data/contact';
import { useReducedMotion, easeEditorial } from '@/hooks/useIntersectionObserver';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Início', path: '/' },
  { label: 'Comprar', path: '/imoveis' },
  { label: 'Alugar', path: '/imoveis?finalidade=temporada' },
  { label: 'Vender', path: '/contato?interesse=vender' },
  { label: 'Sobre', path: '/sobre' },
  { label: 'Contato', path: '/contato' },
];

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { isAuthenticated } = useAuth();

  const overDark = location.pathname === '/' && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isItemCurrent = (path: string) =>
    path === '/'
      ? location.pathname === '/' && !location.search
      : path.includes('?')
        ? location.pathname + location.search === path
        : location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: easeEditorial }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          isScrolled
            ? 'glass border-b border-grafite/10 shadow-[0_10px_40px_-24px_rgba(20,22,19,0.4)]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-18 md:h-20' : 'h-20 md:h-24'
            }`}
          >
            <Link to="/" className="group flex items-center gap-3" aria-label="Marina Azevedo — Início">
              <div
                className={`font-display tracking-tight transition-colors duration-500 ${
                  overDark ? 'text-off-white' : 'text-grafite'
                }`}
              >
                <div className="text-[1.35rem] md:text-[1.6rem] leading-[0.95] font-medium">
                  MARINA
                </div>
                <div className="text-[1.35rem] md:text-[1.6rem] leading-[0.95] font-medium">
                  AZEVEDO
                </div>
              </div>
              <div
                className={`hidden lg:block ml-3 pl-4 border-l transition-colors duration-500 ${
                  overDark ? 'border-off-white/20' : 'border-grafite/20'
                }`}
              >
                <p
                  className={`text-[10px] uppercase tracking-[0.22em] font-medium transition-colors duration-500 ${
                    overDark ? 'text-off-white/70' : 'text-grafite/60'
                  }`}
                >
                  Curadoria Imobiliária
                </p>
                <p
                  className={`text-[10px] uppercase tracking-[0.22em] font-medium transition-colors duration-500 ${
                    overDark ? 'text-off-white/50' : 'text-grafite/45'
                  }`}
                >
                  Salvador & Litoral Norte
                </p>
              </div>
            </Link>

            <nav
              className="hidden md:flex items-center gap-6 lg:gap-8"
              role="navigation"
              aria-label="Navegação principal"
            >
              {navItems.map((item) => {
                const isCurrent = isItemCurrent(item.path);
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`group relative py-2 text-body-sm font-medium transition-colors duration-300 ${
                      overDark
                        ? isCurrent
                          ? 'text-off-white'
                          : 'text-off-white/70 hover:text-off-white'
                        : isCurrent
                          ? 'text-grafite'
                          : 'text-grafite/65 hover:text-grafite'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-right scale-x-0 rounded-full transition-transform duration-400 ease-out-expo group-hover:origin-left group-hover:scale-x-100 ${
                        isCurrent ? 'origin-left scale-x-100' : ''
                      } ${overDark ? 'bg-off-white' : 'bg-grafite'}`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className={`hidden sm:inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all ${
                    overDark
                      ? 'border border-verde-oliva/40 text-off-white bg-verde-oliva/25 hover:bg-verde-oliva/40'
                      : 'border border-verde-oliva/30 text-grafite bg-verde-oliva/10 hover:bg-verde-oliva/20'
                  }`}
                  title="Painel de Gestão da Corretora"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-verde-oliva opacity-75 animate-pulse-ring" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-verde-oliva" />
                  </span>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Painel</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all ${
                    overDark
                      ? 'border-off-white/20 text-off-white/70 hover:border-off-white/40 hover:text-off-white'
                      : 'border-grafite/20 text-grafite/70 hover:border-grafite/40 hover:text-grafite'
                  }`}
                  title="Acesso Corretor Marina Azevedo"
                >
                  <Shield className="w-3 h-3 text-verde-oliva" />
                  <span>Corretor</span>
                </Link>
              )}

              <a
                href={getWhatsAppLink('Olá Marina, gostaria de falar com você.')}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 text-body-sm font-medium transition-all duration-400 ease-out-expo hover:-translate-y-0.5 ${
                  overDark
                    ? 'bg-off-white text-grafite shadow-lg hover:bg-areia'
                    : 'bg-grafite text-off-white shadow-md hover:bg-terracota hover:shadow-glow'
                }`}
                aria-label="Falar com Marina pelo WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-verde-oliva group-hover:text-off-white transition-colors" />
                <span className="hidden sm:inline">Falar com Marina</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>

              <button
                className={`md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2.5 transition-colors ${
                  overDark ? 'text-off-white' : 'text-grafite'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-grafite/40 backdrop-blur-sm"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: easeEditorial }}
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-off-white pt-24 pb-10 shadow-2xl"
              aria-label="Navegação móvel"
            >
              <div className="container-custom">
                <motion.ul
                  className="divide-y divide-grafite/10 border-y border-grafite/10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
                  }}
                  role="list"
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.label}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEditorial } },
                      }}
                    >
                      <Link
                        to={item.path}
                        className="group flex items-center justify-between py-4 font-display text-2xl text-grafite transition-colors hover:text-verde-oliva"
                        onClick={closeMobileMenu}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-5 h-5 text-grafite/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-verde-oliva" />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-8 space-y-3"
                >
                  <a
                    href={getWhatsAppLink('Olá Marina, gostaria de falar pelo WhatsApp.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-grafite px-4 py-4 text-body-sm font-medium text-off-white shadow-lg"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-verde-oliva" />
                    <span>Falar no WhatsApp</span>
                  </a>

                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-verde-oliva/30 bg-verde-oliva/10 px-4 py-3.5 text-body-sm font-medium text-grafite"
                    >
                      <LayoutDashboard className="w-4 h-4 text-verde-oliva" />
                      <span>Painel de Gestão</span>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-grafite/20 px-4 py-3 text-caption uppercase tracking-wider text-grafite/70"
                    >
                      <Shield className="w-3.5 h-3.5 text-verde-oliva" />
                      <span>Acesso Exclusivo Corretor</span>
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2 pt-4 text-caption text-grafite/50">
                    <MapPin className="w-3.5 h-3.5 text-verde-oliva" />
                    <span>{contactInfo.location}</span>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
