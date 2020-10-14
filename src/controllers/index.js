const { getCity } = require('../services/ipLocationService');
const { getCurrent, getForecast } = require('../services/forecastService');

module.exports = {
  location: async (req, res, next) => {
    try {
      const city = await getCity(req);
      res.status(200).json(city);
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  current: async (req, res, next) => {
    try {
      const city = req.params.city || (await getCity(req));
      console.log(city);
      const current = await getCurrent(city);
      res.status(200).json({ status: 'ok', city, current });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  forecast: async (req, res, next) => {
    try {
      const city = req.params.city || (await getCity(req));
      const forecast = await getForecast(city);
      res.status(200).json({ status: 'ok', city, forecast });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
