import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/signin', '/signup', '/api/auth/signin', '/api/auth/signup', '/'];
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For API routes, check Authorization header
  if (pathname.startsWith('/api/')) {
    // Skip auth check for auth endpoints
    if (pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  }

  // For page routes, check for authentication
  // This will be handled by client-side redirects in the components
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 