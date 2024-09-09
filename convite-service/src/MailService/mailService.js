const nodemailer = require('nodemailer');

require('dotenv').config();
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    host: "bulk.smtp.mailtrap.io",  // Servidor SMTP Mailtrap
    port: 587,                   // Porta SMTP com STARTTLS
    secure: false,               // Não utilizar SSL direto (usar STARTTLS)
    auth: {
      user: MAIL_USER,          //usuário fornecido pelo Mailtrap
      pass: MAIL_PASS           //password fornecido pelo Mailtrap
    },

  });

exports.sendMail = (destinatario, titulo, mensagem) => {
  const mailOptions = {
    from: "mailtrap@demomailtrap.com",
    to: destinatario,
    subject: titulo,
    text: mensagem
  };

  return transporter.sendMail(mailOptions);
};
