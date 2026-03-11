import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/login', '/register', '/']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path)

  // Se não tem token e está tentando acessar rota protegida
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se está autenticado e tenta acessar login, redireciona para dashboard
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
