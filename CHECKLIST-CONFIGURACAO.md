# ✅ Checklist de Configuração - Dr. Advogado

Use este checklist para acompanhar o progresso da configuração do Supabase.

---

## 📋 Etapa 1: Criar Conta e Projeto Supabase

- [ ] Acessei https://supabase.com
- [ ] Criei uma conta (GitHub/Google/Email)
- [ ] Cliquei em "New Project"
- [ ] Preenchi:
  - [ ] Nome do projeto: `dr-advogado`
  - [ ] Senha do banco (anotei em local seguro)
  - [ ] Região: South America (São Paulo)
- [ ] Cliquei em "Create new project"
- [ ] Aguardei 2-3 minutos até o projeto estar pronto

---

## 🔑 Etapa 2: Copiar Credenciais

- [ ] Acessei **Settings** (ícone engrenagem) → **API**
- [ ] Copiei **Project URL** (exemplo: `https://xxxxx.supabase.co`)
- [ ] Copiei **anon public key** (chave longa começando com `eyJ...`)
- [ ] Colei ambos no arquivo `.env.local` do projeto
- [ ] Salvei o arquivo `.env.local`

**Arquivo:** `sistema-gestao-adv/.env.local`

---

## 🗄️ Etapa 3: Criar Banco de Dados

- [ ] No Supabase, cliquei em **SQL Editor**
- [ ] Cliquei em **New query**
- [ ] Abri o arquivo `supabase/setup-completo.sql` no VS Code
- [ ] Copiei **TODO** o conteúdo do arquivo
- [ ] Colei no SQL Editor do Supabase
- [ ] Cliquei em **Run** (ou Ctrl+Enter)
- [ ] Aguardei a execução (alguns segundos)
- [ ] Vi mensagem de sucesso

---

## 📦 Etapa 4: Criar Storage Bucket

- [ ] No Supabase, cliquei em **Storage**
- [ ] Cliquei em **Create a new bucket**
- [ ] Preenchi:
  - [ ] Name: `documents`
  - [ ] Public bucket: **DESMARCADO** (privado)
- [ ] Cliquei em **Create bucket**

### 4.1 Configurar Políticas de Storage

- [ ] Cliquei no bucket `documents`
- [ ] Fui em **Policies**
- [ ] Voltei ao **SQL Editor**
- [ ] Abri o arquivo `supabase/storage-policies.sql`
- [ ] Copiei todo o conteúdo
- [ ] Colei no SQL Editor
- [ ] Cliquei em **Run**
- [ ] Vi mensagem de sucesso

---

## 👤 Etapa 5: Criar Primeiro Usuário

- [ ] No Supabase, cliquei em **Authentication**
- [ ] Cliquei em **Users**
- [ ] Cliquei em **Add user** → **Create new user**
- [ ] Preenchi:
  - [ ] Email: ____________________
  - [ ] Password: ____________________
  - [ ] Auto Confirm User: **MARCADO** ✅
- [ ] Cliquei em **Create user**
- [ ] Anotei email e senha em local seguro

### 5.1 Verificar Perfil Criado

- [ ] Fui em **Table Editor**
- [ ] Cliquei na tabela `profiles`
- [ ] Vi um registro com meu usuário
- [ ] (Opcional) Editei o campo `role` para `admin`

---

## 🚀 Etapa 6: Testar o Sistema

- [ ] Abri o terminal no VS Code
- [ ] Executei: `npm install` (se ainda não instalou)
- [ ] Executei: `npm run dev`
- [ ] Aguardei o servidor iniciar
- [ ] Acessei http://localhost:3000

### 6.1 Teste de Login

- [ ] Acessei http://localhost:3000/login
- [ ] Digitei email e senha do usuário criado
- [ ] Cliquei em "Entrar no Sistema"
- [ ] Fui redirecionado para o dashboard
- [ ] Dashboard carregou sem erros ✅

### 6.2 Teste de Cliente

- [ ] Cliquei em **Clientes** no menu
- [ ] Cliquei em **Novo Cliente**
- [ ] Preenchi os dados de teste
- [ ] Cliquei em **Salvar**
- [ ] Cliente apareceu na listagem ✅

### 6.3 Teste de Processo

- [ ] Cliquei em **Processos** no menu
- [ ] Cliquei em **Novo Processo**
- [ ] Preenchi os dados
- [ ] Selecionei o cliente criado
- [ ] Cliquei em **Salvar Processo**
- [ ] Processo apareceu na listagem ✅

### 6.4 Teste de Upload

- [ ] Cliquei em **Documentos** no menu
- [ ] Cliquei em **Upload de Documento**
- [ ] Selecionei um arquivo PDF
- [ ] Escolhi uma categoria
- [ ] Cliquei em **Fazer Upload**
- [ ] Documento apareceu na listagem ✅

---

## ✅ Verificação Final

- [ ] Login funciona perfeitamente
- [ ] Posso criar clientes
- [ ] Posso criar processos
- [ ] Posso fazer upload de documentos
- [ ] Busca global funciona
- [ ] Notificações aparecem
- [ ] Sistema está 100% operacional

---

## 📊 Verificar no Supabase (Opcional)

- [ ] **Table Editor** → `clients` → Tem registros
- [ ] **Table Editor** → `processes` → Tem registros
- [ ] **Table Editor** → `documents` → Tem registros
- [ ] **Storage** → `documents` → Tem arquivos
- [ ] **Authentication** → Usuário ativo

---

## 🎉 Configuração Concluída!

Se todos os itens acima estão marcados, parabéns! 

Seu sistema Dr. Advogado está 100% configurado e pronto para uso.

### Próximos Passos:

1. **Personalizar** o sistema (cores, logo, textos)
2. **Cadastrar dados reais** (clientes, processos)
3. **Configurar backup** automático no Supabase
4. **Fazer deploy** na Vercel (opcional)
5. **Configurar domínio** personalizado (opcional)

---

## 🆘 Problemas?

Se algum item não funcionou:

1. ✅ Verifique o console do navegador (F12)
2. ✅ Confirme que `.env.local` tem as credenciais corretas
3. ✅ Verifique se executou todos os SQLs
4. ✅ Confirme que o bucket `documents` existe
5. ✅ Teste a conexão com Supabase

**Consulte:** `GUIA-TESTE.md` para troubleshooting detalhado
