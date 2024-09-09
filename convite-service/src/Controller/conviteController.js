const mailService = require('../MailService/mailService');

exports.enviarConvite = (req, res) => {
  const { destinatario, titulo, mensagem } = req.body;
  
  
  mailService.sendMail(destinatario, titulo, mensagem)
    .then(() => {
      res.status(200).send('Convite enviado com sucesso!');
    })
    .catch((error) => {
      res.status(500).send('Erro ao enviar convite: ' + error.message);
    });
};
