import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  console.log('📢 [Middleware] Token:', token);

  if (!token) {
    console.log('🚫 [Middleware] Không có token, set X-Auth-Status: not-user');
    const response = NextResponse.next();
    response.headers.set('X-Auth-Status', 'not-user');
    return response;
  }

  const verifyUrl = new URL('/api/user/verify-token', request.url);
  try {
    const res = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const { role } = await res.json();
    console.log('✅ [Middleware] Role từ API:', role);

    const response = NextResponse.next();
    if (role === 'admin') {
      console.log('✅ [Middleware] Xác thực là admin');
      response.headers.set('X-Auth-Status', 'admin');
    } else if (role === 'user') {
      console.log('✅ [Middleware] Xác thực là user');
      response.headers.set('X-Auth-Status', 'user');
    } else {
      console.log('🚫 [Middleware] Role không hợp lệ, set not-user');
      response.headers.set('X-Auth-Status', 'not-user');
    }

    return response;
  } catch (error) {
    console.error('❌ [Middleware] Lỗi xác thực token:', error);
    const response = NextResponse.next();
    response.headers.set('X-Auth-Status', 'not-user');
    return response;
  }
}

export const config = {
  matcher: ['/testmiddleware'],
};
