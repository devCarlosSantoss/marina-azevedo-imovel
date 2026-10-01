import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Image as ImageIcon,
  Plus,
  Building2,
  MapPin,
  DollarSign,
  Eye,
} from 'lucide-react';
import { useProperties } from '@/context/PropertyContext';
import { PropertyCard } from '@/components/PropertyCard';
import { SEO } from '@/components/ui';
import type { Property, RegionName } from '@/types';

// Curated high-res architectural photos for fast 1-click test selection
const PRESET_PHOTOS = [
  {
    label: 'Mansão Contemporânea Litoral',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
  },
  {
    label: 'Vila Praia do Forte',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  },
  {
    label: 'Cobertura Vista Mar Vitória',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
  },
  {
    label: 'Residência Alphaville Minimalista',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80',
  },
  {
    label: 'Casa Tropical Busca Vida',
    url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1600&q=80',
  },
];

const PRESET_FEATURES = [
  'Pé-direito duplo',
  'Piscina com borda infinita',
  'Vista mar panorâmica',
  'Automação residencial completa',
  'Suíte master com closet',
  'Cozinha gourmet com ilha',
  'Condomínio fechado com marina',
  'Energia solar e sustentabilidade',
  'Acabamento em mármore travertino',
  'Adega climatizada',
];

export function PropertyCreate() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Property['category']>('Casa');
  const [priceType, setPriceType] = useState<'Venda' | 'Diária'>('Venda');
  const [priceValue, setPriceValue] = useState<number>(3500000);
  const [region, setRegion] = useState<RegionName>('Litoral Norte');
  const [neighborhood, setNeighborhood] = useState('Praia do Forte');
  const [city, setCity] = useState('Mata de São João');
  const [areaM2, setAreaM2] = useState<number>(420);
  const [bedrooms, setBedrooms] = useState<number>(5);
  const [suites, setSuites] = useState<number>(5);
  const [bathrooms, setBathrooms] = useState<number>(6);
  const [garageSpots, setGarageSpots] = useState<number>(4);
  const [heroImage, setHeroImage] = useState(PRESET_PHOTOS[0].url);
  const [description, setDescription] = useState(
    'Projeto arquitetônico exclusivo com amplas aberturas para integração total entre os ambientes sociais e o jardim tropical. Materiais nobres, acabamentos artesanais e alto padrão de sustentabilidade e segurança.'
  );
  const [features, setFeatures] = useState<string[]>([
    'Piscina com borda infinita',
    'Vista mar panorâmica',
    'Automação residencial completa',
    'Suíte master com closet',
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [featured, setFeatured] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formatPrice = (val: number) => {
    return `R$ ${val.toLocaleString('pt-BR')}`;
  };

  const handleToggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  const handleAddCustomFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeatureInput.trim() && !features.includes(newFeatureInput.trim())) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  // Preview Object
  const previewProperty: Property = {
    id: 'preview',
    slug: 'preview-imovel',
    title: title || 'Título do Imóvel de Alto Padrão',
    subtitle: subtitle || 'Subtítulo inspirador destacando a arquitetura e estilo de vida único.',
    category,
    location: {
      region,
      neighborhood: neighborhood || 'Bairro Nobre',
      city: city || 'Salvador',
      state: 'BA',
    },
    price: {
      value: priceValue,
      formatted: formatPrice(priceValue),
      type: priceType,
    },
    specs: {
      areaM2,
      bedrooms,
      suites,
      bathrooms,
      garageSpots,
    },
    description: [description],
    features,
    images: {
      hero: heroImage,
      gallery: [heroImage],
    },
    featured,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, informe o título do imóvel.');
      return;
    }

    setIsSubmitting(true);

    const created = addProperty({
      title: title.trim(),
      subtitle: subtitle.trim() || 'Residência exclusiva com curadoria Marina Azevedo.',
      category,
      location: {
        region,
        neighborhood: neighborhood.trim() || 'Bairro Nobre',
        city: city.trim() || 'Salvador',
        state: 'BA',
      },
      price: {
        value: Number(priceValue) || 0,
        formatted: formatPrice(Number(priceValue) || 0),
        type: priceType,
      },
      specs: {
        areaM2: Number(areaM2) || 0,
        bedrooms: Number(bedrooms) || 0,
        suites: Number(suites) || 0,
        bathrooms: Number(bathrooms) || 0,
        garageSpots: Number(garageSpots) || 0,
      },
      description: [description.trim()],
      features,
      images: {
        hero: heroImage,
        gallery: [
          heroImage,
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80',
        ],
      },
      featured,
    });

    setIsSubmitting(false);
    navigate(`/imoveis/${created.slug}`);
  };

  return (
    <>
      <SEO
        title="Cadastrar Imóvel | Marina Azevedo"
        description="Página de cadastro de imóveis no portfólio exclusivo de Marina Azevedo."
      />

      <div className="min-h-screen pt-28 pb-24 bg-off-white">
        <div className="container-custom">
          {/* Header & Back link */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-grafite/15">
            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-caption uppercase tracking-wider text-grafite/60 hover:text-grafite transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Dashboard
              </Link>
              <h1 className="font-display text-display-sm md:text-display-md text-grafite">
                Cadastrar Novo Imóvel
              </h1>
              <p className="text-body-sm text-grafite/65">
                Preencha os dados abaixo. O imóvel será publicado instantaneamente em todo o site.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-caption text-verde-oliva bg-verde-oliva/10 px-3.5 py-1.5 rounded-full font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Sincronização em Tempo Real</span>
            </div>
          </div>

          {/* 2-column layout: Form (Left) & Live Preview (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Informações Básicas */}
                <div className="p-6 md:p-8 bg-off-white border border-grafite/15 shadow-sm space-y-5">
                  <h3 className="font-display text-lg text-grafite pb-3 border-b border-grafite/10 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-verde-oliva" />
                    <span>1. Informações Principais</span>
                  </h3>

                  <div>
                    <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                      Título do Imóvel *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Mansão Mirante das Dunas"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                    />
                  </div>

                  <div>
                    <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                      Subtítulo Editorial (Destaque do Estilo de Vida)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Arquitetura minimalista integrada ao mar, piscina infinita e automação total."
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Categoria
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Property['category'])}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      >
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Temporada">Temporada</option>
                        <option value="Terreno">Terreno</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Finalidade
                      </label>
                      <select
                        value={priceType}
                        onChange={(e) => setPriceType(e.target.value as 'Venda' | 'Diária')}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      >
                        <option value="Venda">Venda</option>
                        <option value="Diária">Temporada / Diária</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Localização */}
                <div className="p-6 md:p-8 bg-off-white border border-grafite/15 shadow-sm space-y-5">
                  <h3 className="font-display text-lg text-grafite pb-3 border-b border-grafite/10 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-verde-oliva" />
                    <span>2. Localização Nobre</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Região
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value as RegionName)}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      >
                        <option value="Salvador">Salvador</option>
                        <option value="Litoral Norte">Litoral Norte</option>
                        <option value="Lauro de Freitas">Lauro de Freitas</option>
                        <option value="Camaçari">Camaçari</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Bairro / Condomínio
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Praia do Forte / Alphaville"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Cidade
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Salvador, Mata de São João"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Estado
                      </label>
                      <input
                        type="text"
                        disabled
                        value="BA"
                        className="w-full px-4 py-2.5 bg-areia/20 border border-grafite/15 text-grafite/60 text-body-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Valores & Especificações */}
                <div className="p-6 md:p-8 bg-off-white border border-grafite/15 shadow-sm space-y-5">
                  <h3 className="font-display text-lg text-grafite pb-3 border-b border-grafite/10 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-verde-oliva" />
                    <span>3. Valores e Dimensões</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Valor (R$)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={priceValue}
                        onChange={(e) => setPriceValue(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite font-medium"
                      />
                      <span className="text-caption text-verde-oliva font-medium mt-1 block">
                        Exibição: {formatPrice(priceValue)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                        Área Construída / Privativa (m²)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={areaM2}
                        onChange={(e) => setAreaM2(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div>
                      <label className="block text-caption uppercase tracking-wider text-grafite/70 mb-1">
                        Quartos
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider text-grafite/70 mb-1">
                        Suítes
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={suites}
                        onChange={(e) => setSuites(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider text-grafite/70 mb-1">
                        Banheiros
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>

                    <div>
                      <label className="block text-caption uppercase tracking-wider text-grafite/70 mb-1">
                        Vagas
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={garageSpots}
                        onChange={(e) => setGarageSpots(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Fotografia Principal */}
                <div className="p-6 md:p-8 bg-off-white border border-grafite/15 shadow-sm space-y-5">
                  <h3 className="font-display text-lg text-grafite pb-3 border-b border-grafite/10 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-verde-oliva" />
                    <span>4. Fotografia de Capa</span>
                  </h3>

                  <div>
                    <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                      URL da Imagem Principal
                    </label>
                    <input
                      type="url"
                      value={heroImage}
                      onChange={(e) => setHeroImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                    />
                  </div>

                  <div>
                    <span className="block text-caption uppercase tracking-wider font-medium text-grafite/70 mb-2">
                      Ou selecione uma foto de alta resolução em 1 clique:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {PRESET_PHOTOS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setHeroImage(preset.url)}
                          className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
                            heroImage === preset.url
                              ? 'border-terracota shadow-md scale-[1.02]'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 p-1 bg-grafite/80 text-[10px] text-off-white truncate block text-left">
                            {preset.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Diferenciais & Tags */}
                <div className="p-6 md:p-8 bg-off-white border border-grafite/15 shadow-sm space-y-5">
                  <h3 className="font-display text-lg text-grafite pb-3 border-b border-grafite/10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-verde-oliva" />
                    <span>5. Diferenciais & Atributos Exclusivos</span>
                  </h3>

                  <div>
                    <span className="block text-caption uppercase tracking-wider font-medium text-grafite/70 mb-2.5">
                      Selecione os diferenciais deste imóvel:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_FEATURES.map((feat) => {
                        const isSelected = features.includes(feat);
                        return (
                          <button
                            key={feat}
                            type="button"
                            onClick={() => handleToggleFeature(feat)}
                            className={`px-3 py-1.5 text-caption font-medium rounded-full border transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-grafite text-off-white border-grafite'
                                : 'bg-transparent text-grafite/70 border-grafite/25 hover:border-grafite/60'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-verde-oliva" />}
                            <span>{feat}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add custom feature tag */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Adicionar outro diferencial exclusivo..."
                        value={newFeatureInput}
                        onChange={(e) => setNewFeatureInput(e.target.value)}
                        className="flex-1 px-4 py-2 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomFeature}
                        className="px-4 py-2 bg-grafite text-off-white text-caption uppercase font-medium hover:bg-verde-oliva transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-1.5">
                      Descrição Editorial do Imóvel
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva a arquitetura, conforto, vista, integração com a natureza..."
                      className="w-full px-4 py-3 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite leading-relaxed"
                    />
                  </div>

                  {/* Featured on Home Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center gap-3 p-4 bg-areia/20 border border-areia/40 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 accent-terracota"
                      />
                      <div>
                        <span className="text-body-sm font-medium text-grafite block">
                          Destacar na Página Inicial (Home)
                        </span>
                        <span className="text-caption text-grafite/60 block">
                          O imóvel será promovido na vitrine principal de curadoria.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn-secondary w-full sm:w-auto"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto bg-grafite hover:bg-terracota text-off-white shadow-xl"
                  >
                    {isSubmitting ? 'Publicando...' : 'Salvar e Publicar Imóvel'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Interactive Preview */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-grafite">
                    <Eye className="w-4 h-4 text-verde-oliva" />
                    <span className="font-display text-lg">Preview em Tempo Real</span>
                  </div>
                  <span className="text-caption text-grafite/50">
                    Como aparecerá no catálogo
                  </span>
                </div>

                {/* Simulated Property Card */}
                <div className="shadow-2xl">
                  <PropertyCard property={previewProperty} index={0} />
                </div>

                {/* Feature Tags Overview */}
                <div className="p-6 bg-off-white border border-grafite/15 shadow-sm space-y-3">
                  <h4 className="font-display text-body-base text-grafite">
                    Atributos selecionados ({features.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="text-caption px-2.5 py-1 bg-areia/40 text-grafite font-medium rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
