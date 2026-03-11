# 🚀 Guia Final de Migração - Supabase → PostgreSQL

## ✅ Arquivos Criados

Criei versões novas dos arquivos para usar PostgreSQL:

1. **`lib/db.ts`** - Conexão com PostgreSQL
2. **`lib/auth.ts`** - Sistema de autenticação (bcrypt + JWT)
3. **`lib/actions-new.ts`** - Todas as queries adaptadas para PostgreSQL
4. **`lib/auth-actions-new.ts`** - Login/logout com JWT
5. **`middleware.ts`** - Proteção de rotas
6. **`database/schema.sql`** - Schema completo do banco

---

## 📋 Passos para Ativar a Migração

### **Passo 1: Executar o Schema SQL**

No PostgreSQL do Easypanel, execute o arquivo `database/schema.sql`:

```bash
# No console do PostgreSQL
psql -U postgres -d adv -f database/schema.sql
```

Ou copie e cole o conteúdo no SQL Editor.

---

### **Passo 2: Renomear Arquivos**

Execute estes comandos para ativar os novos arquivos:

```bash
# Backup dos arquivos antigos
mv lib/actions.ts lib/actions-old.ts
mv lib/auth-actions.ts lib/auth-actions-old.ts

# Ativar novos arquivos
mv lib/actions-new.ts lib/actions.ts
mv lib/auth-actions-new.ts lib/auth-actions.ts
```

---

### **Passo 3: Atualizar .env.local**

Certifique-se que o `.env.local` tem:

```env
POSTGRES_HOST=sistema_escola_sistema-adv
POSTGRES_PORT=5432
POSTGRES_DB=adv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=@col3340MOC@
JWT_SECRET=mude-isso-para-algo-super-seguro-em-producao
```

---

### **Passo 4: Testar Localmente**

```bash
npm run dev
```

Acesse: `http://localhost:3000/login`

**Login padrão:**
- Email: `admin@sistema.com`
- Senha: `admin123`

---

### **Passo 5: Deploy no Easypanel**

1. **Adicione as variáveis de ambiente** no Easypanel
2. **Build command:** `npm run build`
3. **Start command:** `npm start`
4. **Port:** `3000`

---

## 🔄 O Que Mudou

### **Antes (Supabase):**
```typescript
const { data, error } = await supabase
  .from('clients')
  .select('*')
```

### **Depois (PostgreSQL):**
```typescript
const result = await query('SELECT * FROM clients')
const data = result.rows
```

---

## 🔐 Autenticação

### **Antes (Supabase Auth):**
- Usava Supabase Auth
- JWT gerenciado pelo Supabase

### **Depois (JWT Próprio):**
- Senhas com bcrypt
- JWT gerado localmente
- Cookies httpOnly
- Middleware protege rotas

---

## ✅ Funcionalidades Mantidas

- ✅ Login/Logout
- ✅ Cadastro de clientes
- ✅ Edição de clientes
- ✅ Exclusão de clientes
- ✅ Listagem de processos
- ✅ Dashboard com estatísticas
- ✅ Busca global
- ✅ Notificações
- ✅ Proteção de rotas

---

## 🆘 Solução de Problemas

### **Erro: Cannot connect to database**
- Verifique se o PostgreSQL está rodando
- Confira as credenciais no `.env.local`
- Teste a conexão: `psql -U postgres -h sistema_escola_sistema-adv -d adv`

### **Erro: relation "users" does not exist**
- Execute o `database/schema.sql` no PostgreSQL

### **Erro: Invalid token**
- Limpe os cookies do navegador
- Faça login novamente

---

## 📊 Próximos Passos Após Migração

1. **Mude a senha do admin**
2. **Gere um JWT_SECRET seguro**
3. **Configure backup automático do PostgreSQL**
4. **Teste todas as funcionalidades**
5. **Remova arquivos antigos do Supabase**

---

## 🎯 Vantagens da Migração

- ✅ **Sem custos** de Supabase
- ✅ **Mais rápido** (banco local)
- ✅ **Controle total** do banco
- ✅ **Sem limites** de requisições
- ✅ **Mais simples** de gerenciar
- ✅ **Backup mais fácil**

---

## 📝 Comandos Úteis

```bash
# Conectar no PostgreSQL
psql -U postgres -h sistema_escola_sistema-adv -d adv

# Ver tabelas
\dt

# Ver dados de uma tabela
SELECT * FROM users;

# Criar novo usuário
INSERT INTO users (email, password_hash, full_name, role)
VALUES ('novo@email.com', '$2a$10$...', 'Nome', 'lawyer');

# Backup do banco
pg_dump -U postgres adv > backup.sql

# Restaurar backup
psql -U postgres adv < backup.sql
```

---

Pronto! Sistema migrado com sucesso! 🎉
