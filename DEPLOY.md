# Guia de Deploy no Render - Supply E-commerce

Este guia contém todos os passos necessários para fazer deploy da aplicação Supply no Render.

## 📋 Pré-requisitos

- ✅ Código no GitHub: `https://github.com/moraes514/supply.git`
- ✅ Prisma configurado para PostgreSQL
- ⬜ Conta no Render.com

---

## 🚀 Passo a Passo

### 1. Criar Conta no Render

1. Acesse [render.com](https://render.com)
2. Clique em **"Get Started for Free"**
3. Faça login com sua conta GitHub (recomendado)

### 2. Criar Banco de Dados PostgreSQL

1. No dashboard do Render, clique em **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `supply-db`
   - **Database**: `supply`
   - **User**: (mantenha o padrão)
   - **Region**: escolha a mais próxima (ex: Ohio - US East)
   - **Plan**: **Free** (para teste)
3. Clique em **"Create Database"**
4. ⚠️ **IMPORTANTE**: Copie a **Internal Database URL** - você vai precisar dela!

### 3. Criar Serviço Web

1. No dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub:
   - Clique em **"Connect a repository"**
   - Autorize o Render no GitHub se solicitado
   - Selecione o repositório: **`moraes514/supply`**
3. Configure o serviço:
   - **Name**: `supply-ecommerce` (ou o nome que preferir)
   - **Region**: mesma do banco de dados (Ohio - US East)
   - **Branch**: `main`
   - **Root Directory**: (deixe em branco)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

### 4. Configurar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

```
DATABASE_URL = [Cole aqui a Internal Database URL copiada no passo 2]
NEXTAUTH_SECRET = [Gere uma string aleatória segura - veja abaixo]
NEXTAUTH_URL = https://supply-ecommerce.onrender.com
```

**Para gerar o NEXTAUTH_SECRET**, use um dos métodos:
- Online: https://generate-secret.vercel.app/32
- Terminal: `openssl rand -base64 32`

⚠️ **Ajuste a `NEXTAUTH_URL`** com o nome que você escolheu no passo 3!

### 5. Iniciar Deploy

1. Clique em **"Create Web Service"**
2. O Render iniciará o build automaticamente
3. Aguarde (pode levar 5-10 minutos na primeira vez)
4. Acompanhe os logs em tempo real

### 6. Executar Migrações do Banco

Após o deploy inicial completar:

1. No dashboard do serviço web, vá em **"Shell"** (na barra lateral)
2. Execute os seguintes comandos:

```bash
# Aplicar as migrações
npx prisma migrate deploy

# Popular o banco com dados iniciais
npm run db:seed
```

### 7. Acessar a Aplicação

Sua aplicação estará disponível em:
```
https://supply-ecommerce.onrender.com
```
(ou o nome que você escolheu)

---

## ✅ Verificação

Teste as seguintes funcionalidades:

- [ ] Página inicial carrega
- [ ] Produtos são exibidos
- [ ] Cadastro de novo usuário funciona
- [ ] Login funciona
- [ ] Carrinho funciona
- [ ] Imagens dos produtos aparecem

---

## 🔧 Troubleshooting

### Erro: "Failed to connect to database"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se de estar usando a **Internal Database URL**

### Erro: "NEXTAUTH_URL misconfigured"
- Verifique se a `NEXTAUTH_URL` corresponde ao domínio do Render
- Deve ser: `https://[seu-app-name].onrender.com`

### Build falha
- Verifique os logs no Render
- Certifique-se de que o código foi atualizado no GitHub

### Prisma schema errors
- Execute `npx prisma generate` no shell do Render
- Verifique se as migrações foram aplicadas

---

## 📝 Notas Importantes

- ⚠️ O plano **Free** do Render hiberna após 15 minutos de inatividade
- ⚠️ O primeiro acesso após hibernação pode levar 30-60 segundos
- ⚠️ O banco de dados Free expira após 90 dias
- 💡 Para produção definitiva, considere upgrade para plano pago

---

## 🔄 Atualizações Futuras

Para fazer deploy de novas alterações:

1. Faça commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push origin main
   ```

2. O Render detectará as mudanças e fará re-deploy automaticamente!

---

**Pronto! Sua aplicação está no ar! 🎉**
