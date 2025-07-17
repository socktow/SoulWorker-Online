import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const response = NextResponse.next();

  if (!token) {
    response.headers.set('X-Auth-Status', 'not-user');
    return response;
  }

  try {
    const verifyRes = await fetch(`${BASE_URL}/api/user/verify-token`, {
      method: 'GET',
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const data = await verifyRes.json();
    response.headers.set('X-Auth-Status', data.role || 'not-user');
    return response;
  } catch (err) {
    console.error('[Middleware] Lỗi gọi API verify:', err);
    response.headers.set('X-Auth-Status', 'not-user');
    return response;
  }
}

export const config = {
  matcher: ['/testmiddleware'],
};
