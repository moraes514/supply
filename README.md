# Supply - E-commerce Premium

Plataforma e-commerce com estilo **Luxury Street Minimal**, desenvolvida com Next.js 14, TypeScript, Tailwind CSS e Prisma.

## 🎨 Características

- **Design Premium**: Estética futurista com glassmorphism e efeitos de glow vermelho
- **Autenticação Completa**: Sistema de login/registro com NextAuth e bcrypt
- **Carrinho de Compras**: Gerenciamento de estado com Zustand e persistência local
- **Animações Fluidas**: Microinterações com Framer Motion
- **Responsivo**: Design adaptável para todos os dispositivos
- **SEO Otimizado**: Metadata e estrutura semântica

## 🚀 Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **Autenticação**: NextAuth.js com bcrypt
- **State Management**: Zustand

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Instalar dependências**:
```bash
npm install
```

2. **Configurar banco de dados**:
```bash
# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados
npx prisma db push

# Popular com dados de exemplo
npm run db:seed
```

3. **Configurar variáveis de ambiente**:
Copie `.env.example` para `.env` e ajuste conforme necessário.

4. **Iniciar servidor de desenvolvimento**:
```bash
npm run dev
```

5. **Acessar aplicação**:
Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 👤 Usuário de Teste

Após executar o seed, você pode fazer login com:
- **Email**: teste@supply.com
- **Senha**: 123456

## 📁 Estrutura do Projeto

```
supply/
├── app/                    # Páginas e rotas Next.js
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   ├── produto/           # Detalhes do produto
│   ├── carrinho/          # Carrinho de compras
│   └── ...
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI
│   └── product/          # Componentes de produto
├── lib/                   # Utilitários e configurações
│   ├── prisma.ts         # Cliente Prisma
│   ├── auth.ts           # Configuração NextAuth
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Funções utilitárias
├── prisma/               # Schema e migrations
│   ├── schema.prisma     # Modelo do banco de dados
│   └── seed.ts           # Dados de exemplo
└── public/               # Arquivos estáticos
```

## 🎯 Funcionalidades

### Implementadas

- ✅ Sistema de autenticação (login/registro)
- ✅ Catálogo de produtos com filtros
- ✅ Página de detalhes do produto
- ✅ Carrinho de compras
- ✅ Categorias (Masculino, Feminino, Lançamentos, Promoções)
- ✅ Design responsivo
- ✅ Animações premium

### Próximas Implementações

- 🔄 Checkout e processamento de pagamento
- 🔄 Painel do usuário com histórico de pedidos
- 🔄 Rastreamento de pedidos (integração com API real)
- 🔄 Sistema de avaliações
- 🔄 Busca avançada

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Gerar cliente Prisma
npm run db:generate

# Sincronizar schema com banco
npm run db:push

# Popular banco de dados
npm run db:seed
```

## 🎨 Paleta de Cores

- **Preto Absoluto**: `#000000`
- **Vermelho Escuro**: `#8B0000`
- **Vermelho Crimson**: `#DC143C`
- **Cinzas**: `#171717` até `#fafafa`

## 📝 Notas

- O projeto usa SQLite em desenvolvimento para facilitar o setup
- Para produção, recomenda-se PostgreSQL
- As APIs de rastreamento e pagamento estão com implementação mock
- Substitua pelas APIs reais conforme necessário

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Contribuições são bem-vindas!

## 📄 Licença

Este projeto é privado e proprietário.
