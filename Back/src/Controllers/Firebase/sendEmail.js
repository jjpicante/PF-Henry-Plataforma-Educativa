const nodemailer = require("nodemailer");

async function sendPasswordByEmail(email, password) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "login",
      user: "plataformaepf@gmail.com", // your email address
      pass: "wskuqlzfgbixdyub", // your email password
    },
  });

  // send the user's password to their email address
  let info = await transporter.sendMail({
    from: "plataformaepf@gmail.com", // sender address
    to: email, // user's email address
    subject: "Recupera Tu Contraseña", // Subject line
    html: `<html>
      <head>
        <title>Recupera Tu Contraseña</title>
      </head>
      <body>
        <h1>Recupera Tu Contraseña</h1>
        <p>Hemos recibido una solicitud para recuperar tu contraseña.</p>
        <p>Tu contraseña es:</p>
        <p><strong>${password}</strong></p>
        <p>Te recomendamos que cambies tu contraseña una vez que hayas iniciado sesión.</p>
        <p>Si no has solicitado recuperar tu contraseña, por favor ignora este mensaje.</p>
        <p>Gracias,</p>
        <p>El equipo de PlataformaEPF</p>
      </body>
    </html>`,
  });

  console.log("Mensaje enviado: %s", info.messageId);
}

module.exports = { sendPasswordByEmail };