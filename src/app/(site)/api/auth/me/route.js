import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { redis } from '@/lib/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Verify JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = payload.userId;

    // 2. Check token in Redis
    const redisUserId = await redis.get(`token:${token}`);
    if (!redisUserId || redisUserId !== userId) {
      return NextResponse.json({ error: 'Token expired or invalid' }, { status: 401 });
    }

    // 3. Fetch user from MongoDB
    await connectMongo();
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    console.error('Auth/me error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
