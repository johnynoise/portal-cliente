// services/emailService.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function enviarEmailRecuperacao(destinatario, token) {
  const link = `http://localhost:5173/redefinir-senha/${token}`; // frontend

  const info = await transporter.sendMail({
    from: `"Suporte TI" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Recuperação de senha',
    html: `
      <h2>Recuperação de Senha</h2>
      <p>Olá! Clique no link abaixo para redefinir sua senha:</p>
      <a href="${link}">${link}</a>
      <p>Este link expira em 30 minutos.</p>
    `,
  });

  console.log('E-mail enviado:', info.messageId);
}
