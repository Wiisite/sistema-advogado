-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Authenticated users can view clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can create clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can delete clients" ON public.clients;

-- Habilitar RLS na tabela clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Criar novas políticas para clients
CREATE POLICY "Authenticated users can view clients" 
ON public.clients
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create clients" 
ON public.clients
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update clients" 
ON public.clients
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete clients" 
ON public.clients
FOR DELETE 
USING (auth.role() = 'authenticated');
