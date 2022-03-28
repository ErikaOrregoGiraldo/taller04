require('dotenv').config();
const port = process.env.port;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();

app.listen(port, () => { console.log('Listening the port', port) })
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => console.log("Success connection with mongo"))
        .catch((err) => console.error(err));

app.use(express.json());
routerApi(app);
