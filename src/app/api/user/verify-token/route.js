import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { token } = await request.json();
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload?.role) return NextResponse.json({ role: 'not-user' });
    return NextResponse.json({ role: payload.role });
  } catch {
    return NextResponse.json({ role: 'not-user' });
  }
}
