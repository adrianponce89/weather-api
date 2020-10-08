const fetch = require("node-fetch");

const getIP = (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  ).split(",")[0];
};

const getCity = async (req) => {
  var ip = getIP(req);
  const ipRes = await fetch(`http://ip-api.com/json/${ip}`);
  const { city } = await ipRes.json();
  return city;
};

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

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
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`
      );
      const current = await currentRes.json();
      res.status(200).json({ status: "ok", city, current });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
  forecast: async (req, res, next) => {
    try {
      const city = req.params.city || (await getCity(req));
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}`
      );
      const forecast = await forecastRes.json();
      res.status(200).json({ status: "ok", city, forecast });
    } catch (err) {
      res.status(400).json({ err });
    }
  },
};
