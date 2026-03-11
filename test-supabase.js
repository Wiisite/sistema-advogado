// Script de teste da conexão com Supabase
// Execute: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://txfhuevudtojdwhydfoy.supabase.co';
const supabaseKey = 'sb_publishable_NWFH_Ydhd5BmbyA5kV6Pzw_Hwmfc-AM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('🔍 Testando conexão com Supabase...\n');
    
    // Teste 1: Conexão básica
    console.log('✅ Cliente Supabase criado');
    console.log('📍 URL:', supabaseUrl);
    
    // Teste 2: Tentar login
    console.log('\n🔐 Tentando fazer login...');
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'apefia1998@gmail.com',
        password: '@coi3340MOC@'
    });
    
    if (error) {
        console.error('❌ Erro ao fazer login:', error.message);
        console.error('Código:', error.status);
        console.error('Detalhes:', error);
    } else {
        console.log('✅ Login bem-sucedido!');
        console.log('👤 Usuário:', data.user.email);
        console.log('🆔 ID:', data.user.id);
    }
    
    // Teste 3: Verificar tabelas
    console.log('\n📊 Verificando acesso às tabelas...');
    const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
    
    if (profileError) {
        console.error('❌ Erro ao acessar profiles:', profileError.message);
    } else {
        console.log('✅ Tabela profiles acessível');
        console.log('Registros:', profiles?.length || 0);
    }
}

testConnection().catch(console.error);
