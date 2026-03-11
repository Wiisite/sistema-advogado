export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(JSON.stringify({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'API is working',
    env: {
      POSTGRES_HOST: process.env.POSTGRES_HOST || 'NOT_SET',
      POSTGRES_PORT: process.env.POSTGRES_PORT || 'NOT_SET',
      POSTGRES_DB: process.env.POSTGRES_DB || 'NOT_SET',
      POSTGRES_USER: process.env.POSTGRES_USER || 'NOT_SET',
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? 'SET' : 'NOT_SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
