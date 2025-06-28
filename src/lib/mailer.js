import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === 'true', // true for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Gửi OTP đến email người dùng
 * @param {string} to - Email người nhận
 * @param {string} otp - Mã OTP
 */
export async function sendOtpEmail(to, otp) {
  await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to,
    subject: 'Mã xác thực OTP của bạn',
    html: `
      <p>Chào bạn,</p>
      <p>Mã OTP để đăng ký tài khoản SoulWorker của bạn là:</p>
      <h2 style="color: #0070f3">${otp}</h2>
      <p>Mã này sẽ hết hạn sau 5 phút.</p>
      <p>Trân trọng,<br/>${process.env.MAIL_FROM_NAME}</p>
    `,
  });
}
