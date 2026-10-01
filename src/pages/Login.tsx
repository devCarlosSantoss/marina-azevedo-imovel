import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SEO } from '@/components/ui';

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login, user, logout } = useAuth();

  const [email, setEmail] = useState('marina@azevedoimoveis.com.br');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Erro ao autenticar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    setError('');
    await login('marina@azevedoimoveis.com.br', 'demo1234');
    navigate('/dashboard');
  };

  return (
    <>
      <SEO
        title="Login da Corretora | Marina Azevedo"
        description="Acesso exclusivo ao painel de gestão de imóveis e clientes de Marina Azevedo."
      />

      <div className="min-h-screen pt-20 flex items-center justify-center bg-off-white px-4 py-12">
        <div className="w-full max-w-5xl bg-off-white border border-grafite/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Left Architectural Brand Showcase */}
          <div className="relative lg:col-span-5 bg-grafite text-off-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-grafite/90 via-grafite/80 to-grafite/95 z-0" />

            <div className="relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-caption uppercase tracking-widest text-areia/80 hover:text-off-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao site público
              </Link>

              <div className="font-display text-2xl tracking-tight text-off-white mb-2">
                MARINA AZEVEDO
              </div>
              <p className="text-caption uppercase tracking-widest text-areia/60">
                PORTAL DO CORRETOR • GESTÃO EXCLUSIVA
              </p>
            </div>

            <div className="relative z-10 my-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-off-white/10 border border-off-white/15 text-caption text-areia mb-4">
                <Sparkles className="w-3.5 h-3.5 text-terracota" />
                <span>Ambiente Seguro</span>
              </div>
              <p className="font-display text-display-sm text-off-white font-light italic leading-snug">
                "A gestão do portfólio de imóveis de luxo reflete o mesmo rigor da nossa curadoria."
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-off-white/15 text-caption text-areia/70 flex items-center justify-between">
              <span>CRECI BA 24.891</span>
              <span>Salvador & Litoral Norte</span>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center bg-off-white">
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-verde-oliva/10 text-verde-oliva mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="font-display text-display-sm text-grafite mb-2">
                  Você já está autenticada
                </h2>
                <p className="text-body-sm text-grafite/60 mb-6">
                  Conectada como <strong>{user?.name || 'Marina Azevedo'}</strong> ({user?.email})
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary"
                  >
                    Acessar Dashboard
                  </button>
                  <button
                    onClick={logout}
                    className="btn-secondary"
                  >
                    Encerrar Sessão
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-8">
                  <h2 className="font-display text-display-sm md:text-display-md text-grafite mb-2">
                    Acesso ao Painel
                  </h2>
                  <p className="text-body-sm text-grafite/65">
                    Cadastre novos imóveis, gerencie o catálogo e acompanhe solicitações de clientes.
                  </p>
                </div>

                {/* Quick 1-click Test Button */}
                <div className="mb-6 p-4 rounded-xl bg-areia/25 border border-areia/40 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-caption uppercase tracking-wider font-semibold text-grafite block">
                      Acesso Demonstrativo
                    </span>
                    <span className="text-caption text-grafite/70">
                      Entre instantaneamente sem precisar digitar senhas
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    disabled={isLoading}
                    className="px-4 py-2 bg-grafite text-off-white text-caption font-medium hover:bg-terracota transition-colors whitespace-nowrap shadow-sm"
                  >
                    {isLoading ? 'Entrando...' : 'Entrar como Marina'}
                  </button>
                </div>

                {error && (
                  <div className="p-3 mb-6 bg-terracota/10 border border-terracota/30 text-terracota text-body-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-caption uppercase tracking-wider font-medium text-grafite/80 mb-2">
                      E-mail Profissional
                    </label>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-grafite/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@azevedoimoveis.com.br"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-caption uppercase tracking-wider font-medium text-grafite/80">
                        Senha
                      </label>
                      <span className="text-caption text-grafite/50 italic">
                        Qualquer senha para demonstração
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-grafite/40" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-11 pr-11 py-3 bg-transparent border border-grafite/20 text-grafite text-body-sm focus:outline-none focus:border-grafite transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-grafite/40 hover:text-grafite"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-body-sm text-grafite/70 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-grafite w-4 h-4 rounded"
                      />
                      <span>Manter conectado</span>
                    </label>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 bg-grafite text-off-white text-body-sm font-medium flex items-center justify-center gap-2 hover:bg-verde-oliva transition-all duration-300 shadow-md"
                  >
                    {isLoading ? (
                      <span>Autenticando...</span>
                    ) : (
                      <>
                        <span>Acessar Painel de Controle</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-grafite/10 flex items-center gap-2 text-caption text-grafite/50">
                  <ShieldCheck className="w-4 h-4 text-verde-oliva" />
                  <span>Sessão local sem dependência de banco de dados externo.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

