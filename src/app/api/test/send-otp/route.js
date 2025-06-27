// app/api/test/send-otp/route.js
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/email/sendMail";

export async function POST(req) {
  const body = await req.json();
  const { email, otp } = body;

  if (!email || !otp) {
    return NextResponse.json({ error: "Thiếu email hoặc otp." }, { status: 400 });
  }

  try {
    await sendMail({
      to: email,
      subject: "Mã xác minh OTP của bạn",
      html: `
        <div style="font-family:sans-serif; padding:20px;">
          <h2>Mã xác minh</h2>
          <p>Mã OTP của bạn là: <strong style="font-size:18px;">${otp}</strong></p>
          <p>Mã có hiệu lực trong 5 phút.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    return NextResponse.json({ error: "Không gửi được email." }, { status: 500 });
  }
}
