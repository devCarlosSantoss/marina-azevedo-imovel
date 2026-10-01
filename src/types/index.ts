export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Casa' | 'Apartamento' | 'Temporada' | 'Terreno';
  location: {
    neighborhood: string;
    city: string;
    state: string;
    region: 'Salvador' | 'Litoral Norte' | 'Lauro de Freitas' | 'Camaçari';
  };
  price: {
    value: number;
    formatted: string;
    type: 'Venda' | 'Diária';
  };
  specs: {
    areaM2: number;
    suites: number;
    bedrooms: number;
    bathrooms: number;
    garageSpots: number;
  };
  description: string[];
  features: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  featured: boolean;
}

export interface Region {
  id: string;
  name: RegionName;
  description: string;
  image: string;
  neighborhoods: string[];
}

export type RegionName = 'Salvador' | 'Litoral Norte' | 'Lauro de Freitas' | 'Camaçari';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  linkedin: string;
  location: string;
}

export type ServiceCategory = 'Compra' | 'Venda' | 'Investimento' | 'Consultoria';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'buy' | 'sell' | 'invest' | 'consult';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}