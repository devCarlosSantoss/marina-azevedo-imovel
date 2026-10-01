import type { ContactInfo, ProcessStep, Service } from '../types';

export type { ContactInfo, ProcessStep, Service };

export const contactInfo: ContactInfo = {
  whatsapp: '+55 71 99999-4832',
  whatsappLink: 'https://wa.me/5571999994832',
  email: 'contato@marinaazevedoimoveis.com.br',
  instagram: 'https://instagram.com/marinaazevedoimoveis',
  linkedin: 'https://linkedin.com/in/marinaazevedoimoveis',
  location: 'Salvador e Litoral Norte da Bahia',
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Escuta',
    description: 'Entendo seu momento, suas prioridades, seu orçamento e os critérios que fazem sentido para a sua rotina.',
  },
  {
    number: '02',
    title: 'Curadoria',
    description: 'Seleciono possibilidades alinhadas ao seu perfil, com contexto e transparência.',
  },
  {
    number: '03',
    title: 'Visitas e análise',
    description: 'Organizo visitas e apoio sua leitura de cada imóvel, com atenção aos detalhes que nem sempre aparecem no anúncio.',
  },
  {
    number: '04',
    title: 'Negociação e próximos passos',
    description: 'Acompanho o processo e ajudo a tornar a jornada mais clara, do interesse à conclusão.',
  },
];

export const manifestoIndicators = [
  'Salvador e Litoral Norte',
  'Imóveis residenciais',
  'Compra, venda e investimento',
  'Atendimento presencial e remoto',
];

export function getWhatsAppLink(propertyTitle?: string, propertyUrl?: string): string {
  const baseUrl = 'https://wa.me/5571999994832?text=';
  const message = propertyTitle
    ? `Olá, Marina. Tenho interesse no imóvel "${propertyTitle}"${propertyUrl ? ` (${propertyUrl})` : ''}. Gostaria de mais informações e agendar uma visita.`
    : 'Olá, Marina. Gostaria de conhecer os imóveis disponíveis.';
  return `${baseUrl}${encodeURIComponent(message)}`;
}

export function getPropertyWhatsAppLink(propertyTitle: string): string {
  const baseUrl = 'https://wa.me/5571999994832?text=';
  const message = `Olá, Marina. Tenho interesse no imóvel "${propertyTitle}" (${window.location.href}). Gostaria de mais informações e agendar uma visita.`;
  return `${baseUrl}${encodeURIComponent(message)}`;
}

export const services: Service[] = [
  {
    id: 'buy',
    title: 'Compra',
    description: 'Acompanho o processo de compra do planejamento da busca até a assinatura do contrato de compra e venda, com acompanhamento de financiamento, vistoria e due diligence.',
    icon: 'buy',
  },
  {
    id: 'sell',
    title: 'Venda',
    description: 'Preparo seu imóvel para o mercado com diagnóstico de valor, fotografia profissional e divulgação estratégica. Acompanho toda a negociação e documentação.',
    icon: 'sell',
  },
  {
    id: 'invest',
    title: 'Investimento',
    description: 'Analiso potencial de valorização, configurações de renda e riscos de cada imóvel. Preparo relatórios com projeções para decisões mais embasadas.',
    icon: 'invest',
  },
  {
    id: 'consult',
    title: 'Consultoria',
    description: 'Para clientes de fora do país ou de outras cidades, ofereço assessoria completa: visitas virtuais, análise de documentação e acompanhamento remoto do processo.',
    icon: 'consult',
  },
];