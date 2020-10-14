const fetch = require('node-fetch');

const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

module.exports = {
  getCurrent: async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
    );
    return await response.json();
  },
  getForecast: async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`
    );
    return await response.json();
  },
};
