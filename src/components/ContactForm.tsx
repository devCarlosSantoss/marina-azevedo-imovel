'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, ArrowRight } from 'lucide-react';
import type { ContactFormData } from '@/types';

interface ContactFormProps {
  initialMessage?: string;
}

interface ExtendedContactFormData extends ContactFormData {
  interest?: string;
}

const initialForm: ExtendedContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  interest: 'Comprar imóvel',
};

function validateForm(form: ExtendedContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.name.trim()) errors.name = 'Por favor, informe seu nome completo.';
  else if (form.name.trim().length < 2) errors.name = 'Digite seu nome completo.';

  if (!form.email.trim()) errors.email = 'E-mail é obrigatório para retorno.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Digite um e-mail válido.';

  if (!form.phone.trim()) errors.phone = 'Telefone ou WhatsApp é obrigatório.';
  else {
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) errors.phone = 'Digite um número com DDD válido.';
  }

  if (!form.message.trim()) errors.message = 'Conte brevemente o que você procura.';
  else if (form.message.trim().length < 8) errors.message = 'Mensagem muito curta.';

  return errors;
}

export function ContactForm({ initialMessage = '' }: ContactFormProps) {
  const [form, setForm] = useState<ExtendedContactFormData>({ ...initialForm, message: initialMessage });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      // feedback de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-12 px-6 bg-off-white border border-grafite/15 shadow-xl"
      >
        <div className="w-16 h-16 bg-verde-oliva/15 text-verde-oliva rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-display text-display-sm text-grafite mb-3">
          Solicitação Recebida com Sucesso
        </h3>
        <p className="text-body-base text-grafite/70 leading-relaxed max-w-md mx-auto mb-6">
          Obrigada, <strong>{form.name}</strong>. Marina Azevedo analisará seus critérios e entrará em contato via WhatsApp ou e-mail com opções alinhadas ao seu perfil.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setForm(initialForm);
          }}
          className="px-6 py-2.5 bg-grafite text-off-white text-body-sm font-medium hover:bg-terracota transition-colors"
        >
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-body-sm font-medium text-grafite mb-2">
            Nome completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border ${
              errors.name ? 'border-terracota ring-1 ring-terracota' : 'border-grafite/20'
            } bg-off-white text-grafite focus:outline-none focus:border-verde-oliva transition-colors text-body-base`}
            placeholder="Ex: Carlos Eduardo"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1.5 text-caption text-terracota">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-body-sm font-medium text-grafite mb-2">
            E-mail profissional ou pessoal *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border ${
              errors.email ? 'border-terracota ring-1 ring-terracota' : 'border-grafite/20'
            } bg-off-white text-grafite focus:outline-none focus:border-verde-oliva transition-colors text-body-base`}
            placeholder="seu.email@exemplo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1.5 text-caption text-terracota">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-body-sm font-medium text-grafite mb-2">
            Telefone / WhatsApp *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 border ${
              errors.phone ? 'border-terracota ring-1 ring-terracota' : 'border-grafite/20'
            } bg-off-white text-grafite focus:outline-none focus:border-verde-oliva transition-colors text-body-base`}
            placeholder="(71) 99999-9999"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1.5 text-caption text-terracota">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="interest" className="block text-body-sm font-medium text-grafite mb-2">
            Qual é o seu objetivo principal?
          </label>
          <select
            id="interest"
            name="interest"
            value={form.interest}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-grafite/20 bg-off-white text-grafite focus:outline-none focus:border-verde-oliva transition-colors text-body-base"
          >
            <option value="Comprar imóvel">Quero comprar um imóvel residencial</option>
            <option value="Vender meu imóvel">Quero vender meu imóvel com exclusividade</option>
            <option value="Locação por temporada">Aluguel por temporada no Litoral Norte</option>
            <option value="Investimento imobiliário">Investimento patrimonial</option>
            <option value="Avaliação de mercado">Avaliação imobiliária</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-body-sm font-medium text-grafite mb-2">
            Detalhes do que procura ou do seu imóvel *
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={4}
            className={`w-full px-4 py-3 border ${
              errors.message ? 'border-terracota ring-1 ring-terracota' : 'border-grafite/20'
            } bg-off-white text-grafite focus:outline-none focus:border-verde-oliva transition-colors text-body-base resize-y`}
            placeholder="Ex: Busco casa em condomínio fechado em Vilas ou Busca Vida com pelo menos 4 suítes e área verde..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && <p id="message-error" className="mt-1.5 text-caption text-terracota">{errors.message}</p>}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-4 bg-grafite text-off-white hover:bg-terracota text-body-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-off-white border-t-transparent rounded-full animate-spin" />
              Enviando solicitação...
            </span>
          ) : (
            <>
              <span>Solicitar Atendimento Exclusivo</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center gap-2 text-caption text-grafite/55">
          <Shield className="w-4 h-4 text-verde-oliva flex-shrink-0" />
          <span>Sigilo absoluto de dados • Retorno em até 24h</span>
        </div>
      </div>
    </form>
  );
}
