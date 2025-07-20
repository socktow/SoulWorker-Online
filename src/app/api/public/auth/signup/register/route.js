import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { redis } from '@/lib/redis';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const { username, email, password, role } = await request.json();
    if (!username || !email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    // Kiểm tra OTP đã xác thực chưa
    const otpVerified = await redis.get(`otp_verified:${email}`);
    if (!otpVerified) return NextResponse.json({ error: 'Please verify your email first' }, { status: 403 });
    await redis.del(`otp_verified:${email}`);

    // Phần còn lại giữ nguyên:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: 'Password too short' }, { status: 400 });

    await connectMongo();
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return NextResponse.json({ error: 'User exists' }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const allowedRoles = ['user', 'mod', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const newUser = new User({ username, email, password: hashedPassword, role: userRole });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, username, email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id,
        username,
        email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      token,
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
