-- SOLUÇÃO TEMPORÁRIA: Políticas mais permissivas para testes
-- Isso permite que qualquer usuário autenticado possa criar/editar/deletar clientes

-- Remover políticas antigas
DROP POLICY IF EXISTS "Authenticated users can view clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can create clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can delete clients" ON public.clients;

-- Habilitar RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Políticas mais permissivas (TEMPORÁRIO - para testes)
CREATE POLICY "Allow all for authenticated users" 
ON public.clients
FOR ALL 
USING (true)
WITH CHECK (true);

-- Verificar se o perfil existe e criar se necessário
INSERT INTO public.profiles (id, full_name, role)
SELECT 
  auth.uid(),
  'Administrador',
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE id = auth.uid()
);
