import { Routes, Route } from 'react-router-dom';
import { ScrollToTop, ScrollToTopAnchor, SEO } from '@/components/ui';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { MouseGlow } from '@/components/effects/MouseGlow';
import { ScrollProgressBar } from '@/components/anim';
import { AuthProvider } from '@/context/AuthContext';
import { PropertyProvider } from '@/context/PropertyContext';

import { Home } from '@/pages/Home';
import { Properties } from '@/pages/Properties';
import { PropertyDetail } from '@/pages/PropertyDetail';
import { About } from '@/pages/About';
import { Services } from '@/pages/Services';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/dashboard/Dashboard';
import { PropertyCreate } from '@/pages/dashboard/PropertyCreate';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <SEO
          title="Marina Azevedo | Corretora de Imóveis em Salvador e Litoral Norte"
          description="Curadoria imobiliária para comprar, vender ou investir em imóveis de alto padrão em Salvador, Lauro de Freitas, Camaçari e Litoral Norte da Bahia."
          image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        />
        <ScrollToTop />
        <ScrollToTopAnchor />
        <ScrollProgressBar />
        <MouseGlow />
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imoveis" element={<Properties />} />
            <Route path="/imoveis/:slug" element={<PropertyDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/cadastrar" element={<PropertyCreate />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;