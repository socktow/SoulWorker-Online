// src/middleware.js
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  // Public API không cần token
  const publicPaths = ['/api/public', '/api/user/verify-token'];
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  

  if (!token) {
    // API trả JSON 401
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { message: 'Unauthorized: No token' },
        { status: 401 }
      );
    }
    // Page chuyển signin
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  try {
    const verifyRes = await fetch(`${BASE_URL}/api/user/verify-token`, {
      method: 'GET',
      headers: { Cookie: `token=${token}` },
    });

    const data = await verifyRes.json();
    const role = data.role;

    if (!role) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { message: 'Unauthorized: Invalid role' },
          { status: 403 }
        );
      }
      return NextResponse.redirect(`${BASE_URL}/signin`);
    }

    if (pathname.startsWith('/api/admin') || pathname.startsWith('/admin')) {
      if (role !== 'admin') {
        if (pathname.startsWith('/api')) {
          return NextResponse.json(
            { message: 'Forbidden: Admin only' },
            { status: 403 }
          );
        }
        return NextResponse.redirect(`${BASE_URL}/`);
      }
    }

    if (pathname.startsWith('/api/user') || pathname.startsWith('/dashboard')) {
      if (role !== 'user' && role !== 'admin') {
        if (pathname.startsWith('/api')) {
          return NextResponse.json(
            { message: 'Forbidden: User only' },
            { status: 403 }
          );
        }
        return NextResponse.redirect(`${BASE_URL}/signin`);
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error('[Middleware] Verify Token Error:', err);
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { message: 'Unauthorized: Token error' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*',
  ],
};

