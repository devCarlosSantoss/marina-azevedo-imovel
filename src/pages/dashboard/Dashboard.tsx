import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Building2,
  TrendingUp,
  Star,
  Users,
  Search,
  ExternalLink,
  Trash2,
  RotateCcw,
  LogOut,
  Sparkles,
  CheckCircle,
  MessageSquare,
  MapPin,
  Eye,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProperties } from '@/context/PropertyContext';
import { TiltCard } from '@/components/effects/TiltCard';
import { SEO, WhatsAppIcon } from '@/components/ui';

export function Dashboard() {
  const { user, logout } = useAuth();
  const { properties, deleteProperty, toggleFeatured, resetProperties } = useProperties();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [notification, setNotification] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Portfolio metrics calculation
  const totalVGV = useMemo(() => {
    return properties.reduce((acc, curr) => acc + (curr.price?.value || 0), 0);
  }, [properties]);

  const featuredCount = useMemo(() => {
    return properties.filter((p) => p.featured).length;
  }, [properties]);

  const formattedVGV = useMemo(() => {
    if (totalVGV >= 1_000_000) {
      return `R$ ${(totalVGV / 1_000_000).toFixed(1)}M`;
    }
    return `R$ ${totalVGV.toLocaleString('pt-BR')}`;
  }, [totalVGV]);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesCategory =
        categoryFilter === 'Todos' || prop.category === categoryFilter;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prop.title.toLowerCase().includes(q) ||
        prop.location.neighborhood.toLowerCase().includes(q) ||
        prop.location.city.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [properties, categoryFilter, searchTerm]);

  const handleDelete = (id: string, title: string) => {
    deleteProperty(id);
    setConfirmDeleteId(null);
    showNotification(`Imóvel "${title}" removido com sucesso.`);
  };

  const handleToggleFeatured = (id: string, title: string, current: boolean) => {
    toggleFeatured(id);
    showNotification(
      `Imóvel "${title}" ${current ? 'removido dos' : 'adicionado aos'} destaques da Home.`
    );
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar os imóveis para a lista original de demonstração?')) {
      resetProperties();
      showNotification('Portfólio restaurado para os dados de demonstração padrão.');
    }
  };

  // Mock leads
  const mockLeads = [
    {
      id: 'lead-1',
      name: 'Eduardo Guimarães',
      phone: '5571991234567',
      property: 'Casa Luz do Atlântico',
      budget: 'R$ 2.850.000',
      time: 'Há 2 horas',
      status: 'Novo Lead',
      message: 'Gostaria de agendar uma visita presencial para o próximo sábado.',
    },
    {
      id: 'lead-2',
      name: 'Camila Mendonça',
      phone: '5571988776655',
      property: 'Cobertura Vista Farol',
      budget: 'R$ 1.950.000',
      time: 'Ontem',
      status: 'Visita Agendada',
      message: 'Tem interesse em permuta parcial por imóvel em Alphaville 1.',
    },
    {
      id: 'lead-3',
      name: 'Roberto Dantas',
      phone: '5511977665544',
      property: 'Vila Praia do Forte',
      budget: 'R$ 3.800/dia',
      time: '2 dias atrás',
      status: 'Temporada',
      message: 'Cotação para réveillon (7 diárias em família).',
    },
  ];

  return (
    <>
      <SEO
        title="Dashboard de Gestão | Marina Azevedo"
        description="Painel exclusivo para controle e gestão do portfólio de imóveis de luxo."
      />

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-grafite text-off-white px-5 py-3 shadow-2xl border border-verde-oliva/40 flex items-center gap-3 text-body-sm"
          >
            <CheckCircle className="w-4 h-4 text-verde-oliva" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-28 pb-20 bg-off-white">
        <div className="container-custom">
          {/* Top Bar Greeting & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-grafite/15">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-verde-oliva/40 shadow-md">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'}
                  alt={user?.name || 'Marina'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-display-sm text-grafite">
                    Painel da Corretora
                  </h1>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-verde-oliva/15 text-verde-oliva text-[11px] font-semibold tracking-wider uppercase">
                    Online
                  </span>
                </div>
                <p className="text-body-sm text-grafite/60">
                  {user?.name || 'Marina Azevedo'} • {user?.creci || 'CRECI BA 24.891'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard/cadastrar"
                className="btn-primary !py-2.5 !px-5 text-body-sm flex items-center gap-2 shadow-md bg-grafite hover:bg-terracota"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Imóvel</span>
              </Link>

              <Link
                to="/imoveis"
                target="_blank"
                className="btn-secondary !py-2.5 !px-4 text-body-sm flex items-center gap-2"
                title="Ver catálogo público em nova aba"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Ver no Site</span>
              </Link>

              <button
                onClick={handleReset}
                className="p-2.5 border border-grafite/20 hover:border-grafite text-grafite/60 hover:text-grafite transition-colors"
                title="Restaurar dados padrão de demonstração"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={logout}
                className="p-2.5 border border-grafite/20 hover:border-terracota text-grafite/60 hover:text-terracota transition-colors"
                title="Sair do painel"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
            <TiltCard maxTilt={5}>
              <div className="p-6 bg-off-white border border-grafite/15 hover:border-grafite/40 transition-all shadow-sm">
                <div className="flex items-center justify-between text-grafite/50 mb-3">
                  <span className="text-caption uppercase tracking-wider font-medium">Imóveis Ativos</span>
                  <Building2 className="w-5 h-5 text-verde-oliva" />
                </div>
                <div className="font-display text-display-sm md:text-display-md text-grafite">
                  {properties.length}
                </div>
                <p className="text-caption text-grafite/55 mt-1">Disponíveis no catálogo</p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={5}>
              <div className="p-6 bg-off-white border border-grafite/15 hover:border-grafite/40 transition-all shadow-sm">
                <div className="flex items-center justify-between text-grafite/50 mb-3">
                  <span className="text-caption uppercase tracking-wider font-medium">VGV Total</span>
                  <TrendingUp className="w-5 h-5 text-terracota" />
                </div>
                <div className="font-display text-display-sm md:text-display-md text-grafite">
                  {formattedVGV}
                </div>
                <p className="text-caption text-grafite/55 mt-1">Valor geral em carteira</p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={5}>
              <div className="p-6 bg-off-white border border-grafite/15 hover:border-grafite/40 transition-all shadow-sm">
                <div className="flex items-center justify-between text-grafite/50 mb-3">
                  <span className="text-caption uppercase tracking-wider font-medium">Destaques Home</span>
                  <Star className="w-5 h-5 text-amber-600" />
                </div>
                <div className="font-display text-display-sm md:text-display-md text-grafite">
                  {featuredCount}
                </div>
                <p className="text-caption text-grafite/55 mt-1">Exibidos na primeira página</p>
              </div>
            </TiltCard>

            <TiltCard maxTilt={5}>
              <div className="p-6 bg-off-white border border-grafite/15 hover:border-grafite/40 transition-all shadow-sm">
                <div className="flex items-center justify-between text-grafite/50 mb-3">
                  <span className="text-caption uppercase tracking-wider font-medium">Novos Leads</span>
                  <Users className="w-5 h-5 text-verde-oliva" />
                </div>
                <div className="font-display text-display-sm md:text-display-md text-grafite">
                  {mockLeads.length}
                </div>
                <p className="text-caption text-grafite/55 mt-1">Interesses recentes</p>
              </div>
            </TiltCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Property Management Table (8 cols on lg) */}
            <div className="lg:col-span-8">
              <div className="bg-off-white border border-grafite/15 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display text-xl text-grafite">Portfólio de Imóveis</h2>
                    <p className="text-caption text-grafite/60">
                      Gerencie seu catálogo exibido publicamente no site
                    </p>
                  </div>

                  {/* Search input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-grafite/40" />
                    <input
                      type="text"
                      placeholder="Filtrar por nome ou bairro..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-body-sm bg-transparent border border-grafite/20 focus:outline-none focus:border-grafite"
                    />
                  </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-grafite/10">
                  {['Todos', 'Casa', 'Apartamento', 'Temporada', 'Terreno'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1 text-caption font-medium border transition-colors ${
                        categoryFilter === cat
                          ? 'bg-grafite text-off-white border-grafite'
                          : 'border-grafite/20 text-grafite/70 hover:border-grafite/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-body-sm">
                    <thead>
                      <tr className="border-b border-grafite/15 text-caption uppercase tracking-wider text-grafite/50">
                        <th className="pb-3 font-medium">Imóvel</th>
                        <th className="pb-3 font-medium">Categoria</th>
                        <th className="pb-3 font-medium">Preço</th>
                        <th className="pb-3 font-medium text-center">Destaque</th>
                        <th className="pb-3 font-medium text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-grafite/10">
                      {filteredProperties.map((prop) => (
                        <tr key={prop.id} className="group hover:bg-grafite/5 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded bg-areia/30 overflow-hidden flex-shrink-0 relative">
                                <img
                                  src={prop.images.hero}
                                  alt={prop.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  to={`/imoveis/${prop.slug}`}
                                  className="font-medium text-grafite hover:text-verde-oliva transition-colors truncate block"
                                >
                                  {prop.title}
                                </Link>
                                <p className="text-caption text-grafite/50 truncate flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {prop.location.neighborhood}, {prop.location.city}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="px-2 py-0.5 rounded text-caption bg-areia/40 text-grafite font-medium">
                              {prop.category}
                            </span>
                          </td>
                          <td className="py-4 pr-4 font-medium whitespace-nowrap text-grafite">
                            {prop.price.formatted}
                          </td>
                          <td className="py-4 text-center">
                            <button
                              onClick={() => handleToggleFeatured(prop.id, prop.title, prop.featured)}
                              className={`p-1.5 rounded transition-colors ${
                                prop.featured
                                  ? 'text-amber-600 hover:text-amber-700 bg-amber-500/10'
                                  : 'text-grafite/30 hover:text-grafite/60'
                              }`}
                              title={prop.featured ? 'Remover destaque da Home' : 'Destacar na Home'}
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </button>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/imoveis/${prop.slug}`}
                                target="_blank"
                                className="p-1.5 text-grafite/60 hover:text-grafite transition-colors"
                                title="Visualizar página pública"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>

                              {confirmDeleteId === prop.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDelete(prop.id, prop.title)}
                                    className="px-2 py-1 bg-terracota text-off-white text-[11px] font-medium"
                                  >
                                    Confirmar
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-1 border border-grafite/30 text-[11px]"
                                  >
                                    Não
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDeleteId(prop.id)}
                                  className="p-1.5 text-grafite/40 hover:text-terracota transition-colors"
                                  title="Excluir imóvel"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredProperties.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-grafite/50">
                            Nenhum imóvel corresponde aos filtros selecionados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar: Recent Client Leads (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-off-white border border-grafite/15 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-grafite/10">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-verde-oliva" />
                    <h3 className="font-display text-lg text-grafite">Leads Recentes</h3>
                  </div>
                  <span className="text-caption text-verde-oliva font-medium">3 novos</span>
                </div>

                <div className="space-y-4">
                  {mockLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 bg-areia/15 border border-areia/40 rounded-lg hover:border-grafite/30 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-medium text-grafite text-body-sm">{lead.name}</span>
                        <span className="text-[11px] text-grafite/50">{lead.time}</span>
                      </div>
                      <div className="text-caption text-terracota font-medium mb-2">
                        {lead.property} • {lead.budget}
                      </div>
                      <p className="text-caption text-grafite/70 mb-3 italic">
                        "{lead.message}"
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-grafite/10">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-verde-oliva/15 text-verde-oliva font-medium">
                          {lead.status}
                        </span>
                        <a
                          href={`https://wa.me/${lead.phone}?text=Ol%C3%A1%2C%20${encodeURIComponent(
                            lead.name
                          )}!%20Sou%20Marina%20Azevedo.%20Recebi%20seu%20interesse%20em%20${encodeURIComponent(
                            lead.property
                          )}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-caption font-medium text-grafite hover:text-verde-oliva flex items-center gap-1 transition-colors"
                        >
                          <WhatsAppIcon className="w-3 h-3 text-verde-oliva" />
                          Responder no WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="p-6 bg-grafite text-off-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-terracota/20 rounded-full blur-xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 text-caption text-areia uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-terracota" />
                    <span>Dica da Corretora</span>
                  </div>
                  <p className="text-body-sm text-areia/80 font-light leading-relaxed mb-4">
                    Imóveis cadastrados com fotos de alta resolução e ficha técnica detalhada obtêm até 3x mais contatos qualificados.
                  </p>
                  <Link
                    to="/dashboard/cadastrar"
                    className="inline-flex items-center gap-1 text-caption uppercase tracking-wider text-off-white hover:text-areia font-medium"
                  >
                    + Novo Cadastro →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
