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
  const link = `http://localhost:5173/redefinir-senha/${token}`;
  const logoUrl = 'https://via.placeholder.com/150x50?text=Logo'; // substitua pelo seu logo

  const info = await transporter.sendMail({
    from: `"Suporte TI" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Recuperação de senha',
    html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            background: #fff;
            margin: 40px auto;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .header img {
            max-width: 150px;
            height: auto;
          }
          h2 {
            color: #004aad;
            margin-bottom: 25px;
          }
          p {
            color: #333;
            line-height: 1.7;
            margin-bottom: 20px;
            font-size: 16px;
          }
          .btn {
            display: inline-block;
            background-color: #004aad;
            color: white !important;
            padding: 16px 32px;
            margin: 35px 0 45px 0;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(0, 74, 173, 0.3);
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #00317a;
          }
          .footer {
            font-size: 12px;
            color: #999;
            text-align: center;
            margin-top: 50px;
            border-top: 1px solid #eee;
            padding-top: 20px;
          }
          @media (max-width: 480px) {
            .container {
              margin: 20px 10px;
              padding: 20px 15px;
            }
            .btn {
              padding: 14px 26px;
              font-size: 16px;
              margin: 30px 0 40px 0;
            }
            p {
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Logo da Empresa" />
          </div>
          <h2>Recuperação de Senha</h2>
          <p>Olá,</p>
          <p>Recebemos uma solicitação para redefinir a senha da sua conta associada a este e-mail.</p>
          <p>Para continuar, clique no botão abaixo e siga as instruções para criar uma nova senha segura.</p>
          <p style="text-align:center;">
            <a href="${link}" class="btn" target="_blank" rel="noopener noreferrer">Redefinir Senha</a>
          </p>
          <p>Se você não solicitou essa alteração, é possível que outra pessoa tenha tentado acessar sua conta. Nesse caso, recomendamos que você altere sua senha o quanto antes e verifique sua atividade recente.</p>
          <p>O link de redefinição é válido por 30 minutos e só pode ser usado uma vez. Após esse período, será necessário solicitar um novo link.</p>
          <p>Se tiver qualquer dúvida ou precisar de ajuda, entre em contato com o suporte através do e-mail suporte@empresa.com ou pelo telefone (00) 1234-5678.</p>
          <p>Atenciosamente,<br/>Equipe Suporte TI</p>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
            <p>Este é um e-mail automático, por favor, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });

  console.log('E-mail enviado:', info.messageId);
}
