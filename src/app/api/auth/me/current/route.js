import { cookies } from 'next/headers';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { jwtVerify } from 'jose';
import { redis } from '@/lib/redis';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }


  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = payload.userId;

    const redisUserId = await redis.get(`token:${token}`);
    if (!redisUserId || redisUserId !== userId) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(userId)
      .select('username email swcoin gameAccount lastLogin')
      .lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('❌ /api/auth/me/current error:', error.message);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
