'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WhatsAppIcon } from '@/components/ui';
import { getWhatsAppLink } from '@/data/contact';
import { useReducedMotion } from '@/hooks/useIntersectionObserver';

const options = [
  {
    icon: WhatsAppIcon,
    label: 'Conversar agora',
    message: 'Olá Marina, gostaria de falar sobre um imóvel.',
  },
  {
    icon: Calendar,
    label: 'Agendar visita',
    message: 'Olá Marina, gostaria de agendar uma visita a um imóvel.',
  },
  {
    icon: TrendingUp,
    label: 'Avaliar meu imóvel',
    message: 'Olá Marina, gostaria de uma avaliação do meu imóvel.',
  },
];

export function WhatsAppFloat() {
  const reducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-16 right-0 w-72 max-w-[calc(100vw-40px)] overflow-hidden rounded-xl border border-grafite/12 bg-off-white shadow-2xl"
                role="dialog"
                aria-label="Opções de contato via WhatsApp com Marina Azevedo"
              >
                <div className="border-b border-grafite/10 bg-grafite p-4 text-off-white">
                  <span className="block text-caption font-semibold uppercase tracking-wider">
                    Atendimento Direto
                  </span>
                  <span className="text-[11px] text-areia/70">
                    Marina Azevedo • Salvador & Litoral Norte
                  </span>
                </div>

                <div className="p-2">
                  {options.map((option) => (
                    <a
                      key={option.label}
                      href={getWhatsAppLink(option.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsExpanded(false)}
                      className="group flex items-center gap-3 rounded-lg px-3 py-3 text-body-sm text-grafite transition-colors hover:bg-grafite/5"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-areia/30 text-verde-oliva transition-colors group-hover:bg-terracota group-hover:text-off-white">
                        <option.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>{option.label}</span>
                    </a>
                  ))}
                </div>

                <div className="border-t border-grafite/10 p-3 text-center">
                  <span className="text-[11px] text-grafite/50">+55 71 99999-4832</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-center justify-end">
            {!isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="pointer-events-none mr-3 hidden rounded-full bg-grafite px-3 py-1.5 text-caption font-medium text-off-white shadow-md sm:inline-block"
                aria-hidden="true"
              >
                Fale com a Marina
              </motion.span>
            )}

            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex h-14 w-14 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-grafite text-off-white shadow-xl transition-colors hover:bg-terracota"
              aria-label={isExpanded ? 'Fechar menu do WhatsApp' : 'Abrir opções de WhatsApp com a corretora'}
              aria-expanded={isExpanded}
            >
              {!isExpanded && (
                <span
                  className="animate-pulse-ring absolute inset-0 rounded-full bg-terracota/40"
                  aria-hidden="true"
                />
              )}
              <span className="relative">
                {isExpanded ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-6 w-6" />}
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
