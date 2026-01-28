# Deploy no Render - Supply E-commerce

## 🚀 Instruções Completas

### 1. Criar PostgreSQL Database

1. No Render Dashboard, clique em **"New +"**
2. Selecione **"PostgreSQL"**
3. Configure:
   - Name: `supply-db`
   - Database: `supply`
   - User: `supply_user`
   - Region: `Oregon (US West)`
   - PostgreSQL Version: `16`
4. Clique em **"Create Database"**
5. **COPIE** a **"Internal Database URL"** (começa com `postgresql://...`)

### 2. Criar Web Service

1. No Render Dashboard, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte seu repositório GitHub `supply`
4. Configure:
   - **Name**: `supply` (ou outro nome de sua preferência)
   - **Region**: `Oregon (US West)` (mesma região do banco)
   - **Branch**: `main`
   - **Root Directory**: deixe em branco
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Adicionar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione:

#### DATABASE_URL
```
Cole aqui a Internal Database URL do PostgreSQL que você criou
Exemplo: postgresql://supply_user:abc123@dpg-xxxx-oregon-postgres.render.com/supply_db
```

#### NEXTAUTH_SECRET
Gere um com PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```
Exemplo: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2`

#### NEXTAUTH_URL
```
https://supply.onrender.com
```
(Substitua "supply" pelo nome que você escolheu para o Web Service)

### 4. Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build (~10-15 minutos)
3. O deploy será feito automaticamente

---

## ⚠️ Limitações do Plano Gratuito

- ⏱️ Build timeout: 15 minutos
- 💾 RAM durante build: 512MB
- 🌐 App "hiberna" após 15min de inatividade
- 📊 PostgreSQL gratuito: 90 dias

---

## 🔧 Troubleshooting

### Erro de Memória
O projeto já está otimizado para o limite de 512MB do Render. Se ainda assim falhar:
- Considere usar Vercel (plano gratuito mais generoso para Next.js)
- Ou fazer upgrade para o plano pago do Render ($7/mês)

### Erro de Build
Verifique se:
- ✅ DATABASE_URL está correta
- ✅ As 3 variáveis de ambiente estão configuradas
- ✅ O banco PostgreSQL está rodando
- ✅ A região do Web Service é a mesma do banco

### Após Deploy
1. Acesse a URL fornecida pelo Render
2. Teste o login: `teste@supply.com` / `123456`
3. Se der erro 500, verifique os logs no dashboard do Render

---

## 📝 Comandos Executados no Deploy

O Render executa automaticamente:

```bash
# Install
npm install

# Build (definido em package.json)
NODE_OPTIONS='--max_old_space_size=480' prisma generate && prisma migrate deploy && next build

# Start
npm start
```

---

## ✅ Checklist Final

Antes de fazer deploy, certifique-se de que:
- [ ] PostgreSQL Database criado no Render
- [ ] DATABASE_URL copiada e adicionada nas variáveis de ambiente
- [ ] NEXTAUTH_SECRET gerado e adicionado
- [ ] NEXTAUTH_URL configurada com a URL do seu app
- [ ] Web Service criado e conectado ao GitHub
- [ ] Branch `main` está atualizada

---

🎉 **Pronto! Seu e-commerce estará online em alguns minutos!**
