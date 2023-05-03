const nodemailer = require('nodemailer');

async function sendPasswordByEmail(email, password) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      type:'login',
      user: 'plataformaepf@gmail.com', // your email address
      pass: 'wskuqlzfgbixdyub' // your email password
    }
  });

  // send the user's password to their email address
  let info = await transporter.sendMail({
    from: 'plataformaepf@gmail.com', // sender address
    to: email, // user's email address
    subject: 'Recupera Tu Contraseña', // Subject line
    text: `Tu contraseña es: ${password}` // plain text body
  });

  console.log('Mensaje enviado: %s', info.messageId);
}

module.exports = { sendPasswordByEmail };