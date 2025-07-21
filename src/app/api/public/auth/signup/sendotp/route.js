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

    console.log(`✅ [SEND OTP] Generated OTP for ${email}: ${otp}`);
    console.log(`✅ [SEND OTP] MAIL_USER: ${process.env.MAIL_USER}`);
    console.log(`✅ [SEND OTP] MAIL_HOST: ${transporter.options.host}`);
    console.log(`✅ [SEND OTP] MAIL_PORT: ${transporter.options.port}`);
    console.log(`✅ [SEND OTP] Sending from no-reply@kiemhieptinhduyen.com`);

    await transporter.sendMail({
      from: `"Soulworker VietNam - Send OTP" <no-reply@kiemhieptinhduyen.com>`,
      to: email,
      subject: 'Your Soulworker VietNam OTP Code',
      text: `Your verification code is ${otp}. This code will expire in 5 minutes.`,
      html: `<p>Your verification code is <b>${otp}</b>. This code will expire in 5 minutes.</p>`,
    });

    console.log(`✅ [SEND OTP] Email sent successfully to ${email}`);

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('❌ [SEND OTP] API Error:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
