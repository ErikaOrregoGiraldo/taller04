require("dotenv").config();
const port = process.env.port;
const express = require("express");
const mongoose = require("mongoose");
const routerApi = require("./src/routes");
const email = require("./src/email/email");
const app = express();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./src/handlers/errors.handler");


// importar twilio
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio_client = require("twilio")(accountSID, authToken);

// Funcion para enviar mensajes de texto
twilio_client.messages
  .create({
    body: "Prueba desde la app del uso de twilio",
    from: "+12183068675",
    to: "+573114787887",
  })
  .then((message) => console.log(`Mensaje enviado ${message.sid}`));

app.use(express.urlencoded({extended: false}))
// // Función para el envio del correo electrónico
app.post("/email/confirmation", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await email.sendOrderSerie(data);
    res.status(201).json(response)
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({message: err.message});
  return
})



app.listen(port, () => {
  console.log("Listening the port", port);
});
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Success connection with mongo"))
  .catch((err) => console.error(err));

app.use(express.json());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
