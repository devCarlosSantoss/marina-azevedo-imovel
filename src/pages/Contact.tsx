import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Container, Section, SEO, Badge, WhatsAppIcon } from '@/components/ui';
import { AnimatedHeading, Reveal } from '@/components/anim';
import { ContactForm } from '@/components/ContactForm';
import { contactInfo } from '@/data/contact';
import { useReducedMotion } from '@/hooks/useIntersectionObserver';

export function Contact() {
  const [searchParams] = useSearchParams();
  const reducedMotion = useReducedMotion();

  const interesse = searchParams.get('interesse');
  const initialMessage =
    interesse === 'vender'
      ? 'Olá, Marina. Gostaria de solicitar uma avaliação e conversar sobre a venda exclusiva do meu imóvel.'
      : interesse === 'alugar'
      ? 'Olá, Marina. Gostaria de opções para locação por temporada no Litoral Norte.'
      : '';

  return (
    <>
      <SEO
        title="Contato & Consultoria | Marina Azevedo"
        description="Fale diretamente com Marina Azevedo: WhatsApp, e-mail ou agendamento. Atendimento presencial e consultivo em Salvador e Litoral Norte da Bahia."
      />
      <Section className="pb-24 pt-32 md:pt-40" aria-labelledby="contact-title">
        <Container size="lg">
          <div className="mb-14 max-w-3xl">
            <Reveal variant="fade" duration={0.7}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant="default" size="sm">
                  Atendimento Privativo
                </Badge>
                <span className="flex items-center gap-1 text-caption font-medium uppercase tracking-wider text-verde-oliva">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Sigilo Absoluto
                </span>
              </div>
            </Reveal>

            <AnimatedHeading
              as="h1"
              id="contact-title"
              amount={0.3}
              className="font-display text-display-lg leading-[1.04] tracking-[-0.02em] text-grafite md:text-display-xl"
              segments={[
                { text: 'Uma conversa clara para definir seu próximo ' },
                { text: 'passo.', className: 'italic text-terracota' },
              ]}
            />

            <Reveal variant="up" delay={0.2}>
              <p className="mt-5 max-w-2xl text-body-lg font-light leading-relaxed text-grafite/70">
                Seja para adquirir uma nova residência, investir ou disponibilizar seu patrimônio com
                exclusividade, estou à disposição para um atendimento consultivo e discreto.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.6 }}
              className="lg:col-span-7 p-6 sm:p-10 border border-grafite/15 bg-off-white shadow-sm"
            >
              <h2 className="font-display text-display-sm text-grafite mb-2">
                Solicitação de Atendimento
              </h2>
              <p className="text-caption text-grafite/60 mb-8">
                Preencha seus dados para receber um contato direto em até 24 horas.
              </p>
              <ContactForm initialMessage={initialMessage} />
            </motion.div>

            {/* Direct Channels Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-6 sm:p-8 border border-grafite/15 bg-off-white shadow-sm">
                <h2 className="font-display text-xl text-grafite mb-6">
                  Canais Diretos
                </h2>

                <div className="space-y-4">
                  <a
                    href={contactInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-grafite/10 hover:border-verde-oliva/50 hover:bg-verde-oliva/5 transition-all group"
                  >
                    <span className="w-12 h-12 flex items-center justify-center bg-grafite text-off-white group-hover:bg-terracota transition-colors flex-shrink-0">
                      <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-caption uppercase tracking-wider text-grafite/50 mb-0.5">
                        WhatsApp Direto
                      </span>
                      <span className="text-body-base text-grafite font-semibold">
                        {contactInfo.whatsapp}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-4 border border-grafite/10 hover:border-verde-oliva/50 hover:bg-verde-oliva/5 transition-all group"
                  >
                    <span className="w-12 h-12 flex items-center justify-center bg-grafite text-off-white group-hover:bg-terracota transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-caption uppercase tracking-wider text-grafite/50 mb-0.5">
                        E-mail Profissional
                      </span>
                      <span className="text-body-sm text-grafite font-semibold break-all">
                        {contactInfo.email}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 border border-grafite/10 bg-areia/15">
                    <span className="w-12 h-12 flex items-center justify-center bg-areia/40 text-grafite flex-shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-caption uppercase tracking-wider text-grafite/50 mb-0.5">
                        Área de Atuação
                      </span>
                      <span className="text-body-sm text-grafite font-medium">
                        Salvador, Lauro de Freitas e Litoral Norte da Bahia
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-grafite/10 flex items-center gap-2 text-caption text-grafite/60">
                  <Clock className="w-4 h-4 text-verde-oliva" />
                  <span>Atendimento de Segunda a Sábado com agendamento prévio.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}