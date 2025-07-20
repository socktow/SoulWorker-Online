import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import transporter from '@/lib/nodemailer';

export async function POST(request) {
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
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
      <h2 style="color: #ff4747; text-align: center;">Soulworker VietNam</h2>
      <p>Hi there,</p>
      <p>Your verification code is:</p>
      <div style="font-size: 32px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">${otp}</div>
      <p>This code will expire in <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #888;">If you did not request this code, you can ignore this email.</p>
      <p style="font-size: 12px; color: #888;">&copy; Soulworker VietNam</p>
    </div>
  `,
  });

  return NextResponse.json({ message: 'OTP sent successfully' });
}
