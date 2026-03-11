const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'adv',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
});

async function createAdmin() {
  try {
    console.log('Conectando ao banco de dados...');
    
    // Hash da senha 'admin123'
    const passwordHash = await bcrypt.hash('admin123', 10);
    
    // Criar usuário admin
    await pool.query(`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
    `, ['admin@sistema.com', passwordHash, 'Administrador', 'admin']);
    
    console.log('✅ Usuário admin criado com sucesso!');
    console.log('Email: admin@sistema.com');
    console.log('Senha: admin123');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
