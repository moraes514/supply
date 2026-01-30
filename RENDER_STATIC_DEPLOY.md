# Deploy no Render - Static Service

## ✅ Site Totalmente Est ático - Sem Banco de Dados

Este guia explica como fazer deploy do site Supply no **Render Static Service** (100% gratuito).

## Vantagens

- ✅ **Totalmente gratuito** (sem custos mensais)
- ✅ **Sem limites de memória** (não há mais erros de 512MB)
- ✅ **Build rápido** (~1-2 minutos vs 5-10 minutos)
- ✅ **Ultra rápido** (servindo arquivos HTML/CSS/JS estáticos)
- ✅ **Sem dependências** (não precisa de banco de dados PostgreSQL)

## Pré-requisitos

1. Código no GitHub
2. Conta no Render (gratuita)

## Passo a Passo

### 1. Push do Código para GitHub

```bash
cd "c:\Users\Home\OneDrive - SENAC - SP\Área de Trabalho\supply"
git add .
git commit -m "Convertido para site estático sem banco de dados"
git push origin main
```

### 2. Criar Static Site no Render

1. Acesse [render.com](https://render.com)
2. Faça login
3. Clique em **"New +"** → **"Static Site"**
4. Conecte seu repositório GitHub

### 3. Configurar o Deploy

Preencha as configurações:

| Campo | Valor |
|-------|-------|
| **Name** | `supply` (ou qualquer nome) |
| **Branch** | `main` |
| **Root Directory** | (deixe vazio) |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `out` |

### 4. Variáveis de Ambiente

**Nenhuma necessária!** ✅

O site não usa banco de dados nem APIs externas, então não precisa configurar nenhuma variável.

### 5. Deploy

Clique em **"Create Static Site"**

O Render vai:
1. Instalar dependências (`npm install`)
2. Fazer build estático (`npm run build`)
3. Publicar pasta `out/`
4. Fornecer URL pública

**Tempo estimado:** 1-2 minutos

### 6. Acessar o Site

Após o deploy, você receberá uma URL tipo:
```
https://supply.onrender.com
```

## Estrutura do Site Estático

```
out/
├── index.html           # Página inicial
├── masculino.html       # Categoria masculina
├── feminino.html        # Categoria feminina
├── lancamentos.html     # Lançamentos
├── promocoes.html       # Promoções
├── produto/
│   ├── 1.html          # Produto ID 1
│   ├── 2.html          # Produto ID 2
│   └── ...
├── _next/              # Assets (CSS, JS, imagens)
└── ...
```

## Troubleshooting

### Build falhou

Verifique os logs no Render. Possíveis causas:

1. **Erro de dependências**: Execute `npm install` localmente primeiro
2. **Erro de TypeScript**: Verifique se `npm run build` funciona localmente

### Imagens não carregam

Verifique se todas as imagens estão em `/public/images/products/tenis/`

### Página 404

No Render Static Service, todas as rotas são geradas como HTML estático durante o build.

## Atualizações Futuras

Para atualizar o site:

1. Edite `data/products.json` ou código
2. Commit e push:
   ```bash
   git add .
   git commit -m "Atualização de produtos"
   git push origin main
   ```
3. Render faz rebuild automático

## Dados Estáticos

Os produtos estão em:
- `data/products.json` - 37 produtos
- `data/categories.json` - 1 categoria (Tênis)

Para adicionar/editar produtos, edite esses arquivos.

## Performance

- ⚡ **Build time**: ~1-2 minutos
- ⚡ **Load time**: <1 segundo (apenas HTML estático)
- ⚡ **Tamanho**: ~10-20MB (muito menor que antes)

## Suporte

Se tiver problemas, verifique:
1. Build local funciona: `npm run build`
2. Pasta `out/` foi criada
3. Logs do Render para erros específicos
