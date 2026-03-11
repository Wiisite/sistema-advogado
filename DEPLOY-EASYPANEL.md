# 🚀 Guia de Deploy no Easypanel

## ✅ Pré-requisitos Concluídos

- ✅ PostgreSQL criado e rodando
- ✅ Schema SQL executado
- ✅ Tabelas criadas
- ✅ Usuário admin criado (admin@sistema.com / admin123)
- ✅ Código migrado para PostgreSQL

---

## 📋 Passo a Passo para Deploy

### **1. Criar Novo Serviço no Easypanel**

1. Acesse o Easypanel
2. Vá no projeto `sistema_escola`
3. Clique em **"+ Adicionar Serviço"** ou **"New Service"**
4. Escolha **"App"** (aplicação)

---

### **2. Configurar o Serviço**

**Nome do Serviço:** `sistema-adv-app` (ou o nome que preferir)

**Tipo:** App / Docker

---

### **3. Configurar Source (Código)**

Você tem 2 opções:

#### **Opção A: GitHub (Recomendado)**

1. Conecte seu repositório GitHub
2. Selecione o branch (geralmente `main` ou `master`)
3. O Easypanel vai detectar o Dockerfile automaticamente

#### **Opção B: Upload Manual**

1. Faça upload do código via interface do Easypanel
2. Ou use Git local do Easypanel

---

### **4. Variáveis de Ambiente**

Adicione estas variáveis de ambiente no Easypanel:

```env
POSTGRES_HOST=sistema_escola_sistema-adv
POSTGRES_PORT=5432
POSTGRES_DB=adv
POSTGRES_USER=postgres
POSTGRES_PASSWORD=@col3340MOC@
JWT_SECRET=adv-sistema-jwt-secret-2024-change-in-production
NODE_ENV=production
```

⚠️ **IMPORTANTE:** Use o host **interno** `sistema_escola_sistema-adv` (não o IP público)

---

### **5. Configurar Porta**

- **Porta do Container:** `3000`
- **Porta Pública:** Escolha uma porta livre ou deixe o Easypanel escolher

---

### **6. Configurar Domínio (Opcional)**

Se você tiver um domínio:
1. Adicione o domínio no Easypanel
2. Configure o DNS apontando para o IP do servidor
3. O Easypanel vai gerar SSL automático

---

### **7. Deploy**

1. Clique em **"Deploy"** ou **"Create"**
2. Aguarde o build (pode levar 3-5 minutos)
3. O Easypanel vai:
   - Fazer build da imagem Docker
   - Instalar dependências
   - Fazer build do Next.js
   - Iniciar o container

---

### **8. Verificar Deploy**

Após o deploy:

1. Acesse a URL fornecida pelo Easypanel
2. Você deve ver a página de login
3. Faça login com:
   - **Email:** `admin@sistema.com`
   - **Senha:** `admin123`

---

## 🔧 Troubleshooting

### **Erro: Cannot connect to database**

- Verifique se o PostgreSQL está rodando
- Confirme que o host é `sistema_escola_sistema-adv` (host interno)
- Verifique se ambos os serviços estão na mesma rede

### **Erro: Build failed**

- Verifique os logs do build no Easypanel
- Confirme que o `Dockerfile` está na raiz do projeto
- Verifique se `next.config.js` tem `output: 'standalone'`

### **Erro: 502 Bad Gateway**

- O container pode estar demorando para iniciar
- Aguarde 1-2 minutos e tente novamente
- Verifique os logs do container

---

## 📊 Comandos Úteis

### **Ver Logs do Container**

No Easypanel, vá em:
- Serviço > Logs

### **Reiniciar Serviço**

No Easypanel:
- Serviço > Restart

### **Rebuild (após mudanças no código)**

No Easypanel:
- Serviço > Rebuild

---

## 🎯 Próximos Passos Após Deploy

1. **Mude a senha do admin**
2. **Configure backup automático do PostgreSQL**
3. **Configure domínio personalizado**
4. **Configure SSL (se não automático)**
5. **Teste todas as funcionalidades**

---

## 📝 Estrutura de Rede no Easypanel

```
┌─────────────────────────────────────┐
│   Easypanel (sistema_escola)       │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  PostgreSQL                  │  │
│  │  Host: sistema_escola_       │  │
│  │        sistema-adv           │  │
│  │  Port: 5432 (interno)        │  │
│  └──────────────────────────────┘  │
│              ↑                      │
│              │ (rede interna)       │
│              ↓                      │
│  ┌──────────────────────────────┐  │
│  │  Next.js App                 │  │
│  │  Port: 3000                  │  │
│  │  Público: via Easypanel      │  │
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Final

- [ ] PostgreSQL rodando
- [ ] Schema SQL executado
- [ ] Serviço Next.js criado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Login funcionando
- [ ] Cadastro de clientes funcionando
- [ ] Todas as páginas acessíveis

---

**Pronto! Sistema em produção!** 🎉
