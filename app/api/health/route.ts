import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Verificar variáveis de ambiente
    const envCheck = {
      POSTGRES_HOST: process.env.POSTGRES_HOST || 'NOT SET',
      POSTGRES_PORT: process.env.POSTGRES_PORT || 'NOT SET',
      POSTGRES_DB: process.env.POSTGRES_DB || 'NOT SET',
      POSTGRES_USER: process.env.POSTGRES_USER || 'NOT SET',
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? 'SET' : 'NOT SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    };

    // Tentar conectar ao banco
    let dbStatus = 'ERROR';
    let dbError = null;
    
    try {
      const result = await query('SELECT NOW() as now');
      dbStatus = 'OK';
    } catch (error: any) {
      dbError = error.message;
    }

    return NextResponse.json({
      status: 'running',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      database: {
        status: dbStatus,
        error: dbError,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
    }, { status: 500 });
  }
}
