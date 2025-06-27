import { NextResponse } from 'next/server';
import { getUserFromToken, hasPermission } from './auth';

export function withAuth(permission) {
  return async (req, res, next) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const user = getUserFromToken(token);

    if (!hasPermission(user, permission)) {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    // Gắn user vào request để dùng tiếp
    req.user = user;
    return next();
  };
}
