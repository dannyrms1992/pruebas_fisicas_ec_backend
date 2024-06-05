'use strict';
const nodemailer = require("nodemailer");
/**
 * A set of functions called "actions" for `send-email`
 */

module.exports = {
  RestorePassword: async (ctx, next) => {
    try {
      const email = ctx.query.email;
      const transporter = nodemailer.createTransport({
        host: "us2.smtp.mailhostbox.com",
        port: 587,
        auth: {
          user: "soporte@pruebasfisicas.ec",
          pass: "kUifb*Y2",
        }
      });
      const code = Math.floor(Math.random() * 90000) + 10000;

      const info = await transporter.sendMail({
        from: '"Pruebas Físicas EC" <soporte@pruebasfisicas.ec>', // dirección del remitente
        to: email, // lista de destinatarios
        subject: "🔒 Restablece tu contraseña - Pruebas Físicas EC", // Asunto
        html: `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restablecimiento de Contraseña</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
          }
          .header img {
            width: 100px;
          }
          .header h1 {
            font-size: 24px;
            margin: 10px 0 0;
          }
          .content {
            padding: 20px 0;
          }
          .content p {
            font-size: 18px;
            line-height: 1.6;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Restablecimiento de Contraseña</h1>
          </div>
          <div class="content">
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Usa el siguiente código para completar el proceso:</p>
            <div class="code">${code}</div>
            <p>Si no has solicitado un restablecimiento de contraseña, por favor ignora este correo.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Pruebas Físicas EC. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>`
      });
      ctx.body = JSON.stringify({
        "code": code,
        "email": email
      
      });

    } catch (err) {
      console.log(err);

      ctx.body = err;
    }
  }
};
