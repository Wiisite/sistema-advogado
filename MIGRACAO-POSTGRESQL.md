# 🚀 Guia de Migração para PostgreSQL no Easypanel

## ✅ O Que Foi Feito

Migrei o sistema de **Supabase** para **PostgreSQL próprio** na sua VPS.

### Mudanças Principais:
1. ✅ Instalado bibliotecas: `pg`, `bcryptjs`, `jsonwebtoken`
2. ✅ Criado `lib/db.ts` - Conexão com PostgreSQL
3. ✅ Criado `lib/auth.ts` - Autenticação própria (sem Supabase)
4. ✅ Criado `database/schema.sql` - Schema completo do banco
5. ✅ Atualizado `.env.local` - Credenciais do PostgreSQL

---

## 📋 Passo a Passo para Deploy

### **1. No Easypanel - Criar PostgreSQL**

Você já criou! As credenciais são:
- Host: `sistema_escola_sistema-adv`
- Porta: `5432`
- Database: `adv`
- User: `postgres`
- Password: `@col3340MOC@`

### **2. Executar o Schema SQL**

**Opção A - Via Easypanel:**
1. No Easypanel, vá no serviço PostgreSQL
2. Clique em "Console" ou "Terminal"
3. Execute:
```bash
psql -U postgres -d adv
```
4. Copie e cole todo o conteúdo de `database/schema.sql`
5. Pressione Enter

**Opção B - Via pgAdmin ou DBeaver:**
1. Conecte no PostgreSQL com as credenciais acima
2. Abra o arquivo `database/schema.sql`
3. Execute todo o conteúdo

### **3. Atualizar Variáveis de Ambiente**

No arquivo `.env.local`, as credenciais já estão configuradas:

```env
POSTGRES_HOST=sistema_escola_sistema-adv
POSTGRES_PORT=5432
POSTGRES_DB=adv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=@col3340MOC@
JWT_SECRET=sua-chave-secreta-super-segura-aqui-mude-em-producao
```

⚠️ **IMPORTANTE:** Mude o `JWT_SECRET` para algo único e seguro!

### **4. Próximos Passos - Adaptar o Código**

Agora preciso adaptar os arquivos que usam Supabase para usar PostgreSQL direto:

**Arquivos a adaptar:**
- `lib/actions.ts` - Todas as queries
- `lib/auth-actions.ts` - Sistema de login
- Componentes que usam autenticação

---

## 🔐 Login Padrão Criado

Após executar o schema, você terá um usuário admin:

- **Email:** `admin@sistema.com`
- **Senha:** `admin123`

⚠️ **Mude a senha após o primeiro login!**

---

## 📦 Deploy no Easypanel

### **Configuração do Serviço Next.js:**

1. **Variáveis de Ambiente:**
   - Adicione todas as variáveis do `.env.local`
   
2. **Build Command:**
   ```bash
   npm run build
   ```

3. **Start Command:**
   ```bash
   npm start
   ```

4. **Port:** `3000`

5. **Network:**
   - Certifique-se que o Next.js está na mesma rede do PostgreSQL

---

## 🧪 Testar Localmente Primeiro

Antes de fazer deploy, teste localmente:

1. **Atualize o `.env.local`** com as credenciais
2. **Execute:**
   ```bash
   npm run dev
   ```
3. **Acesse:** `http://localhost:3000`
4. **Faça login** com `admin@sistema.com` / `admin123`

---

## ⚠️ Importante

- **Backup:** Sempre faça backup do banco antes de mudanças
- **Segurança:** Mude o JWT_SECRET em produção
- **Senha Admin:** Mude a senha padrão após primeiro acesso
- **Firewall:** Configure firewall do PostgreSQL para aceitar apenas conexões internas

---

## 🆘 Precisa de Ajuda?

Me avise se tiver algum erro durante:
- Execução do schema SQL
- Conexão com o banco
- Deploy no Easypanel
- Testes locais

Estou aqui para ajudar! 🚀
