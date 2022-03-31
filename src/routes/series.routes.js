const SeriesService = require('../services/series.service');
const seriesModel = require('../models/series.model');
const service = new SeriesService();
const express = require('express');
const seriesRoutes = express.Router();

seriesRoutes.post('/', async (req, res) => {
  try{
    const serie = seriesModel(req.body);
    const data = await service.createSerie(serie);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message:error });
  }
});

seriesRoutes.get('/', async (req, res) => {
  try{
    const data = await service.listSeries();
    res.status(200).json(data)
  } catch (error){
    res.status(404).json({ message:error })
  }
});

seriesRoutes.get('/:serieId', async (req, res, next) => {
  try {
    const {serieId } = req.params;
    const data = await service.showSerie(serieId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// punto 2-a
seriesRoutes.get('/actor/:actorName', async (req, res) => {
  try {
    const { actorName } = req.params;
    const data = await service.showSerieByActor(actorName)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message:error })
  }
});

// punto 2-b
seriesRoutes.get('/premier/:premier_date', async (req, res) => {
  try {
    const { premier_date } = req.params;
    const data = await service.showSerieByDate(premier_date)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message:error })
  }
});

seriesRoutes.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, number_seasons, original_lenguage, features_seasons } = req.body;
    const data = await service.editSerie(
      serieId,
      serie, number_seasons, original_lenguage, features_seasons
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error)
  }
});

seriesRoutes.delete('/:serieId', async (req, res, next) => {
  try{
    const { serieId } = req.params;
    const deleted = await service.removeSerie(serieId)
    res.status(200).json(deleted)
  }catch(error){
    next(error)
  }
});

module.exports = seriesRoutes;
