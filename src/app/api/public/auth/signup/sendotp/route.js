import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import transporter from '@/lib/nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const redisKey = `otp:${email}`;

    await redis.set(redisKey, otp, { ex: 300 }); // 5 phút

    console.log(`Generated OTP for ${email}: ${otp}`);

    await transporter.sendMail({
      from: `"Soulworker VietNam - Send OTP" <gamemaster@kiemhieptinhduyen.com>`,
      to: email,
      subject: 'Your Soulworker VietNam OTP Code',
      text: `Your verification code is ${otp}. This code will expire in 5 minutes.`,
      html: `...`,
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
