const serieSchema = require("../models/series.model");
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
    return serieSchema.findById({ _id: serieId });
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
    return seriesFound;
  }

  // punto 2-b
  async showSerieByDate(premier_date) {
    return serieSchema.find({ 'features_seasons.premier_date' : premier_date });
  }

  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.findById({ _id: serieId }).then(() => {
      if (!serieId) throw Error('Serie no encontrada');
      return serieSchema.updateOne(
        { _id:serieId },
        { serie, number_seasons, original_lenguage, features_seasons }
      );
    });
  }

  async removeSerie(serieId) {
    const serieRemove = serieSchema.findById({ _id: serieId });
    return serieSchema.deleteOne(serieRemove);
  }
}

module.exports = SeriesService;
