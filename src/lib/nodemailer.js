import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail90101.maychuemail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

transporter.verify()
  .then(() => console.log('✅ SMTP connection is ready!'))
  .catch((err) => console.error('❌ SMTP connection failed:', err));

export default transporter;
