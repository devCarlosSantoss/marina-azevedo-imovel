import { SEO } from '@/components/ui';
import { Hero } from '@/sections/Hero';
import { Manifesto } from '@/sections/Manifesto';
import { PropertyHighlight } from '@/sections/PropertyHighlight';
import { Regions } from '@/sections/Regions';
import { MarqueeBand } from '@/sections/MarqueeBand';
import { Process } from '@/sections/Process';
import { About } from '@/sections/About';
import { Testimonials } from '@/sections/Testimonials';
import { Articles } from '@/sections/Articles';
import { CTA } from '@/sections/CTA';

export function Home() {
  return (
    <>
      <SEO
        title="Marina Azevedo | Corretora de Imóveis em Salvador e Litoral Norte"
        description="Curadoria imobiliária para comprar, vender ou investir em imóveis de alto padrão em Salvador, Lauro de Freitas, Camaçari e Litoral Norte da Bahia."
        image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
      />
      <Hero />
      <Manifesto />
      <PropertyHighlight />
      <Regions />
      <MarqueeBand />
      <Process />
      <About />
      <Testimonials />
      <Articles />
      <CTA />
    </>
  );
}
