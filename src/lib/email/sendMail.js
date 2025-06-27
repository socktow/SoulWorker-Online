// lib/email/sendMail.js
const nodemailer = require("nodemailer");

async function sendMail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  return info;
}

module.exports = { sendMail };
