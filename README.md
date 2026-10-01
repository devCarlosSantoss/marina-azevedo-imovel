# Marina Azevedo - Site Institucional Premium

Site institucional para a corretora de imóveis Marina Azevedo, especializada em imóveis residenciais de médio-alto e alto padrão em Salvador e Litoral Norte da Bahia.

## 🚀 Tecnologias

- **React 19** + **TypeScript**
- **Vite 8** - Build tool e dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animações fluidas e performáticas
- **Lucide React** - Ícones minimalistas
- **ESLint** + **TypeScript** - Qualidade de código

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes base reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── OptimizedImage.tsx
│   │   └── Section.tsx
│   ├── Header.tsx       # Header fixo com navegação
│   ├── Footer.tsx       # Rodapé completo
│   └── WhatsAppFloat.tsx # Botão flutuante WhatsApp
├── sections/
│   ├── Hero.tsx         # Hero fullscreen com vídeo/imagem
│   ├── Manifesto.tsx    # Seção de posicionamento
│   ├── Properties.tsx   # Imóveis em destaque + modal
│   ├── Regions.tsx      # Regiões de atuação
│   ├── Process.tsx      # Como trabalho (4 etapas)
│   ├── About.tsx        # Sobre Marina Azevedo
│   ├── Articles.tsx     # Caderno de imóveis (artigos)
│   └── CTA.tsx          # Call to action final
├── data/
│   ├── properties.ts    # Dados dos 6 imóveis
│   ├── regions.ts       # 4 regiões de atuação
│   ├── articles.ts      # 3 artigos do caderno
│   └── contact.ts       # Info de contato + etapas do processo
├── hooks/
│   └── useIntersectionObserver.ts # Hooks para animações
├── utils/
│   └── helpers.ts       # Funções utilitárias
├── types/
│   └── index.ts         # Tipos TypeScript
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globais + design system
```

## 🎨 Design System

### Cores
- **Grafite profundo**: `#1B1D1B` - Textos principais, headers
- **Off-white quente**: `#F4F1EB` - Background principal
- **Areia**: `#D8CFC2` - Divisórias, elementos sutis
- **Verde oliva acinzentado**: `#6C7665` - Acentos, links, CTAs secundários
- **Terracota discreto**: `#A7654E` - Destaques regionais

### Tipografia
- **Títulos**: Cormorant Garamond (via Google Fonts)
- **Textos**: Inter (via Google Fonts)

### Espaçamento
- Escala baseada em 4px com valores customizados (18, 22, 26, 30)

## 🧩 Seções do Site

1. **Header** - Fixo, transparente → sólido no scroll, navegação + CTA WhatsApp
2. **Hero** - Fullscreen, headline editorial, 2 CTAs, indicador de scroll animado
3. **Manifesto** - Posicionamento + 4 indicadores de atuação
4. **Imóveis em Destaque** - 6 imóveis em layout editorial assimétrico, modal com galeria
5. **Regiões** - 4 regiões em grid tipográfico sobre fundo grafite
6. **Como Trabalho** - 4 etapas numeradas com linha conectora
7. **Sobre Marina** - Composição editorial com arquitetura + quote
8. **Caderno de Imóveis** - 3 artigos em grid editorial
9. **CTA Final** - Fundo grafite com imagem arquitetônica em baixa opacidade
10. **Rodapé** - Brand, navegação, redes sociais, copyright, privacidade

## ♿ Acessibilidade

- HTML semântico
- Navegação por teclado
- Focus states visíveis
- Alt texts descritivos
- ARIA labels
- Respeita `prefers-reduced-motion`
- Contraste adequado

## 🔧 SEO

- Meta tags completas (title, description, keywords)
- Open Graph tags
- Twitter Card
- JSON-LD Schema.org (RealEstateAgent)
- Sitemap.xml
- Robots.txt

## 📦 Como Executar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## 📱 Responsividade

- Mobile-first
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Layouts adaptativos para cada seção
- Imagens com lazy loading e sizes otimizados

## 🎬 Animações

Implementadas com Framer Motion:
- Reveal ao entrar no viewport
- Fade + slide up/down
- Scale sutil em hover de imagens
- Header com transição no scroll
- Modal com transição suave
- Indicador de scroll animado
- Parallax leve em imagens

## 📸 Imagens

Todas as imagens utilizam URLs do **Unsplash** (licença livre para uso comercial) como placeholders. Para produção, substituir por fotos reais dos imóveis e da profissional, mantendo os mesmos nomes de arquivo ou atualizando os arrays em `src/data/`.

## 📄 Licença

Projeto desenvolvido para fins educacionais/demonstrativos.