import type { Article } from '../types';

export type { Article };

export const articles: Article[] = [
  {
    id: 'luz-natural-apartamento',
    title: 'Como observar a luz natural antes de escolher um apartamento',
    excerpt: 'A orientação solar, o entorno e a planta revelam mais sobre o dia a dia do que qualquer foto de anúncio. Um guia prático para visitar com olhar atento.',
    category: 'Guia de visita',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    slug: 'como-observar-luz-natural-apartamento',
  },
  {
    id: 'tres-jeitos-morar-perto-mar',
    title: 'Barra, Vitória ou Graça: três maneiras de viver perto do mar em Salvador',
    excerpt: 'Cada bairro tem ritmo, arquitetura e perfil de morador distintos. Entenda as diferenças para escolher o endereço que combina com sua rotina.',
    category: 'Bairros',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
    slug: 'barra-vitoria-graca-tres-jeitos-morar-perto-mar',
  },
  {
    id: 'avaliar-casa-litoral-norte',
    title: 'O que avaliar em uma casa no Litoral Norte antes de decidir',
    excerpt: 'Infraestrutura, acesso, condição de maré, ventilação e documentação. Os pontos que fazem a diferença entre uma boa compra e um arrependimento.',
    category: 'Investimento',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    slug: 'o-que-avaliar-casa-litoral-norte',
  },
];