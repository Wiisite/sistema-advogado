-- ============================================
-- STORAGE POLICIES - BUCKET "documents"
-- ============================================
-- Execute no SQL Editor após criar o bucket "documents"
-- ============================================

-- Permitir usuários autenticados fazerem upload
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Permitir usuários autenticados visualizarem documentos
CREATE POLICY "Authenticated users can view documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents');

-- Permitir usuários autenticados atualizarem documentos
CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents');

-- Permitir usuários autenticados deletarem documentos
CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');
