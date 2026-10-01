import type { Region } from '../types';

export type { Region };

export const regions: Region[] = [
  {
    id: 'salvador',
    name: 'Salvador',
    description: 'Bairros com história, mar, cultura e diferentes maneiras de viver a cidade.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80',
    neighborhoods: ['Barra', 'Vitória', 'Graça', 'Ondina', 'Rio Vermelho', 'Itapuã', 'Stella Maris'],
  },
  {
    id: 'lauro-freitas',
    name: 'Lauro de Freitas',
    description: 'Mobilidade, estrutura e proximidade com Salvador para uma rotina bem conectada.',
    image: 'https://images.unsplash.com/photo-1582588342216-8b7a5e5b8c5f?w=1600&q=80',
    neighborhoods: ['Busca Vida', 'Vilas do Atlântico', 'Centro', 'Portão', 'Ipitanga'],
  },
  {
    id: 'camacari',
    name: 'Camaçari',
    description: 'Condomínios, áreas em desenvolvimento e possibilidades para morar ou investir.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1600&q=80',
    neighborhoods: ['Alphaville Litoral Norte', 'Guarajuba', 'Jauá', 'Arembepe', 'Centro'],
  },
  {
    id: 'litoral-norte',
    name: 'Litoral Norte',
    description: 'Praia, natureza e imóveis para quem busca mais tempo, espaço e qualidade de vida.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    neighborhoods: ['Praia do Forte', 'Imbassai', 'Diogo', 'Costa do Sauípe', 'Barra do Jacuípe'],
  },
];