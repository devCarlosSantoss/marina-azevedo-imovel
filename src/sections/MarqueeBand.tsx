import { Marquee } from '@/components/anim';

const keywords = [
  'Curadoria Imobiliária',
  'Arquitetura',
  'Alto Padrão',
  'Sigilo & Discrição',
  'Salvador',
  'Litoral Norte',
  'Investimento',
  'Bem-viver',
];

export function MarqueeBand() {
  return (
    <section
      aria-label="Áreas de especialidade"
      className="border-y border-grafite/10 bg-cream py-8 md:py-10"
    >
      <Marquee speed={44} className="mask-fade-x">
        {keywords.map((keyword) => (
          <span key={keyword} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-display text-2xl font-medium text-grafite/75 md:px-8 md:text-3xl">
              {keyword}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-terracota" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
