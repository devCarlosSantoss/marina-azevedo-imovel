export function formatPrice(price: string): string {
  return price;
}

export function formatSpecs(specs: { suites: number; area: number; parking: number }): string {
  return `${specs.suites} suite${specs.suites > 1 ? 's' : ''} · ${specs.area} m2 · ${specs.parking} vaga${specs.parking > 1 ? 's' : ''}`;
}

export function getWhatsAppLink(propertyTitle?: string): string {
  const baseUrl = 'https://wa.me/5571999994832?text=';
  const message = propertyTitle
    ? `Ola, Marina. Gostaria de agendar uma visita ao imovel "${propertyTitle}".`
    : 'Ola, Marina. Gostaria de conhecer os imoveis disponiveis.';
  return `${baseUrl}${encodeURIComponent(message)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}