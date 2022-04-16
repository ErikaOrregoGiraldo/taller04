const formData = require("form-data");
const Mailgun = require("mailgun.js");

require("dotenv").config();
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.API_KEY_MAIL_GUN,
});
const domain = process.env.DOMAIN_MAIL_GUN;

function sendEmailConfirmation() {
  return `<!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <div class="row">
      <div class="col">
        <label>Prueba desde la app</label>
      </div>
    </div>
    <div class="row">
      <p><small></small></p>
    </div>
  </body>

  </html>`;
}

function getMessage(emailParams) {
  return {
    from: "Excited user <erika.1702010705@ucaldas.edu.co>",
    to: emailParams.toEmail,
    subject: `Confirmación pedido serie ${emailParams.orderNroSerie}`,
    text: `Cordial saludo, ${emailParams.customerName}, te confirmamos la recepción de tu pedido
    y se ha generado una factura con orden de compra ${emailParams.orderNroSerie}.
    Agradecemos tu compra.`,
    html: sendEmailConfirmation(
      emailParams.customerName,
      emailParams.orderNroSerie
    ),
  };
}

async function sendOrderSerie(emailParams) {
  try {
    await client.messages.create(domain, getMessage(emailParams));
    return { message: "Confirmación de pedido recibido ha sido enviada" };
  } catch (error) {
    const message = "No se pudo enviar la order de compra al cliente";
    console.error(message, error);
    if (error.response) console.error(error.response.body);
    return { message };
  }
}

async () => {
  console.log("Se ha enviado el correo electrónico");
  await sendOrderSerie();
};

module.exports = { sendOrderSerie };
