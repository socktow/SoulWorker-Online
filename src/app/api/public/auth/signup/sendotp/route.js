import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { redis } from '@/lib/redis';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Lưu OTP vào Redis
    const redisKey = `otp:${email}`;
    await redis.set(redisKey, otp, { ex: 300 }); // 5 phút

    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.MAIL_API_SECRET;
    const mailUrl = process.env.VERCEL_SEND_OTP_URL;

    if (!secret || !mailUrl) {
      console.error('❌ Config Error: MAIL_API_SECRET hoặc VERCEL_SEND_OTP_URL chưa set.');
      return NextResponse.json({ error: 'Mail server configuration error' }, { status: 500 });
    }

    const raw = `${email}:${otp}:${timestamp}`;
    const signature = crypto.createHmac('sha256', secret).update(raw).digest('hex');

    const response = await fetch(mailUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, timestamp, signature }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Mailserver Error:', result);
      return NextResponse.json({ error: result?.error || 'Failed to send OTP' }, { status: response.status });
    }

    console.log(`✅ OTP sent to ${email}: ${otp}`);
    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
