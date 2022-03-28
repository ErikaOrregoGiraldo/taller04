const express = require("express");
const seriesRoute = require('../routes/series.routes')

function routerApi(app) {
  const router = express.Router();
  // Parte del endpoint estático http://localhost:3000/api/v1
  app.use("/api/v2", router);
  //http://localhost:5000/api/v1/serie
  router.use("/serie", seriesRoute)
}

module.exports = routerApi;
