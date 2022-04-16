const mailchimp = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP)
const { response } = require("express");

// Función para enviar correos electrónicos
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
      <p><small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae dignissimos voluptas adipisci vitae
          libero perferendis dolorum eius quidem accusantium? Nobis odit doloribus reiciendis accusamus minima modi velit
          assumenda aliquam iste.</small></p>
    </div>
  </body>

  </html>`;
}

function getMessage(emailParams) {
  // Establecemos los parámetros requeridos para el envio del correo electrónico
  return {
    to: emailParams.toEmail,
    from: "erika.1702010705@ucaldas.edu.co",
    subject: "Confirmación pedido serie NombreSerie",
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
    await mailchimp.messages.send(getMessage(emailParams));
    return { message: "Confirmación de pedido recibido ha sido enviada" };
  } catch (error) {
    const message = "No se pudo enviar la order de compra al cliente";
    console.error(message, error);
    if (error.response) console.error(error.response.body);
    return { message };
  }
}

(async() => {
  console.log('Se ha enviado el correo electrónico');
  await sendOrderSerie();
})

module.exports = { sendOrderSerie };
