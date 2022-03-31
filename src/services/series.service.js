const serieSchema = require("../models/series.model");
const Boom = require('@hapi/boom');

class SeriesService {
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(serieSchema.find());
      }, 3000);
    });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then(
      (serieFound) =>  {
        if (!serieFound) throw Boom.notFound('No se encontró la serie');
        return serieFound;
      }
    );
  }

  // punto 2-a
  async showSerieByActor(actorName) {
    const seriesFound = []
    const series = await serieSchema.find()
    series.forEach((serie) => {
      if (serie.features_seasons.cast.includes(actorName)){
        seriesFound.push(serie)
      }
    })

    if (seriesFound.length === 0 ) throw Boom.notFound('No se encontró la serie')
    return seriesFound;
  }

  // punto 2-b
  async showSerieByDate(premier_date) {
    const data = serieSchema.find({ 'features_seasons.premier_date' : premier_date })
    if (data.length === 0 ) throw Boom.notFound('No se encontró la serie')
    return data;
  }

  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.findById({ _id: serieId }).then((serieFound) => {
      if (!serieFound) throw Boom.notFound('No se encontró la serie')
      return serieSchema.updateOne(
        { _id:serieId },
        { serie, number_seasons, original_lenguage, features_seasons }
      );
    });
  }

  async removeSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then(
      (serieFound) => {
        if (!serieFound) throw Boom.notFound('No se encontró la serie');
        return serieSchema.deleteOne(serieFound);
      }
    );
  }
}

module.exports = SeriesService;
