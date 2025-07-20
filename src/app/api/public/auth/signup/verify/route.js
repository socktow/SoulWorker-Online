import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request) {
  const { email, otp } = await request.json();
  if (!email || !otp) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

  const redisKey = `otp:${email}`;
  const savedOtp = await redis.get(redisKey);

  console.log(`Verifying OTP for ${email}:`);
  console.log(`Client OTP: ${otp}`);
  console.log(`Saved OTP: ${savedOtp}`);

  if (!savedOtp) {
    console.log('OTP expired or not found in Redis');
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }

  if (savedOtp?.toString().trim() !== otp.toString().trim()) {
    console.log('OTP mismatch');
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }


  console.log(`✅ OTP verified successfully for ${email}`);

  await redis.set(`otp_verified:${email}`, 'true', { ex: 600 });
  await redis.del(redisKey);

  return NextResponse.json({ message: 'OTP verified successfully' });
}
