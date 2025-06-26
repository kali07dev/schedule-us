// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  // If trying to access API routes without a session, block them
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth') && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Allow auth routes to be public
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Redirect to login if trying to access protected pages without a session
  if (!session && pathname !== '/auth/login' && pathname !== '/auth/signup') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};