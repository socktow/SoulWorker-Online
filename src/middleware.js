// middleware.js
import { NextResponse } from 'next/server';
import { getUserFromToken } from './lib/auth';

export function middleware(req) {
  const url = req.nextUrl.pathname;
  const token = req.cookies.get('token')?.value;

  const user = getUserFromToken(token);

  // Giả sử bạn muốn chỉ Admin mới vào được /admin
  if (url.startsWith('/admin') && user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
