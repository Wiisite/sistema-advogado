# 🧪 Guia de Teste - Dr. Advogado

## Pré-requisitos
- ✅ Projeto Supabase criado
- ✅ Credenciais configuradas no `.env.local`
- ✅ Schema SQL executado
- ✅ Bucket `documents` criado
- ✅ Primeiro usuário criado

---

## 1️⃣ Iniciar o Servidor de Desenvolvimento

```bash
# Instalar dependências (se ainda não instalou)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O sistema deve abrir em: http://localhost:3000

---

## 2️⃣ Testar Login

1. Acesse http://localhost:3000/login
2. Use o email e senha do usuário criado no Supabase
3. Clique em "Entrar no Sistema"
4. Você deve ser redirecionado para `/dashboard`

**✅ Sucesso:** Dashboard carrega sem erros  
**❌ Erro:** Verifique as credenciais no `.env.local`

---

## 3️⃣ Testar Cadastro de Cliente

1. No menu lateral, clique em **Clientes**
2. Clique em **Novo Cliente**
3. Preencha os dados:
   - Nome: João Silva
   - Email: joao@teste.com
   - Telefone: (11) 98765-4321
   - CPF: 123.456.789-00
4. Clique em **Salvar**

**✅ Sucesso:** Cliente aparece na listagem  
**❌ Erro:** Verifique console do navegador (F12)

---

## 4️⃣ Testar Cadastro de Processo

1. No menu lateral, clique em **Processos**
2. Clique em **Novo Processo**
3. Preencha:
   - Número: 0001234-56.2024.8.26.0000
   - Título: Ação de Teste
   - Cliente: Selecione o cliente criado
   - Categoria: Cível
4. Clique em **Salvar Processo**

**✅ Sucesso:** Processo aparece na listagem  
**❌ Erro:** Verifique se o cliente foi criado antes

---

## 5️⃣ Testar Upload de Documento

1. No menu lateral, clique em **Documentos**
2. Clique em **Upload de Documento**
3. Selecione um arquivo PDF de teste
4. Escolha uma categoria
5. Clique em **Fazer Upload**

**✅ Sucesso:** Documento aparece na listagem  
**❌ Erro:** Verifique se o bucket `documents` foi criado e as policies aplicadas

---

## 6️⃣ Testar Agenda

1. No menu lateral, clique em **Agenda**
2. Clique em **Novo Compromisso**
3. Preencha:
   - Título: Audiência de Teste
   - Data/Hora: Escolha uma data futura
   - Local: Fórum Central
   - Cliente: Selecione um cliente
4. Clique em **Salvar**

**✅ Sucesso:** Compromisso aparece na agenda

---

## 7️⃣ Testar Financeiro (Admin)

1. No menu lateral, clique em **Financeiro**
2. Se não for admin, será redirecionado
3. Se for admin, clique em **Novo Lançamento**
4. Preencha os dados de uma fatura
5. Clique em **Cadastrar**

**✅ Sucesso:** Fatura aparece na listagem

---

## 8️⃣ Testar Busca Global

1. No header, use o campo de busca
2. Digite o nome de um cliente ou número de processo
3. Resultados devem aparecer em tempo real

**✅ Sucesso:** Busca retorna resultados corretos

---

## 9️⃣ Testar Notificações

1. Clique no ícone de sino no header
2. Deve abrir painel de notificações
3. Clique em uma notificação não lida
4. Ela deve ser marcada como lida

**✅ Sucesso:** Sistema de notificações funciona

---

## 🔟 Testar WhatsApp (Opcional)

1. Cadastre um cliente com telefone válido
2. Crie um compromisso para amanhã
3. No dashboard, veja o painel de lembretes
4. Clique em "Disparar WhatsApp"
5. Deve abrir WhatsApp Web com mensagem pré-formatada

**✅ Sucesso:** Link do WhatsApp abre corretamente

---

## ⚠️ Problemas Comuns

### Erro: "Invalid API key"
**Solução:** Verifique se copiou a chave correta do Supabase (anon/public)

### Erro: "Failed to fetch"
**Solução:** Verifique se a URL do Supabase está correta no `.env.local`

### Erro: "Permission denied"
**Solução:** Execute o SQL das policies novamente

### Erro: "Storage bucket not found"
**Solução:** Crie o bucket `documents` no Supabase Storage

### Tabelas não aparecem
**Solução:** Execute o arquivo `setup-completo.sql` no SQL Editor

---

## 📊 Verificar no Supabase

Após os testes, verifique no Supabase:

1. **Table Editor** → `clients` → Deve ter registros
2. **Table Editor** → `processes` → Deve ter registros
3. **Table Editor** → `documents` → Deve ter registros
4. **Storage** → `documents` → Deve ter arquivos
5. **Authentication** → **Users** → Deve ter seu usuário

---

## ✅ Checklist Final

- [ ] Login funciona
- [ ] Cadastro de clientes funciona
- [ ] Cadastro de processos funciona
- [ ] Upload de documentos funciona
- [ ] Agenda funciona
- [ ] Busca global funciona
- [ ] Notificações funcionam
- [ ] Financeiro funciona (se admin)
- [ ] WhatsApp funciona

---

## 🎉 Próximos Passos

Se todos os testes passaram:

1. **Personalizar:** Ajuste cores, logo, textos
2. **Dados reais:** Comece a cadastrar dados reais
3. **Backup:** Configure backups automáticos no Supabase
4. **Deploy:** Considere fazer deploy na Vercel
5. **Domínio:** Configure um domínio personalizado

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique o console do navegador (F12)
2. Verifique os logs do Supabase
3. Revise o arquivo `.env.local`
4. Confirme que todas as policies foram criadas
5. Teste a conexão com o Supabase diretamente
