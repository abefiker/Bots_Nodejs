const axios = require('axios');

const URL = 'https://api.weatherapi.com/v1/forecast.json';
const forecast_days = 5;
const fetchForcast = async (location) => {
  return await axios({
    url: URL,
    method: 'GET',
    params: {
      key: process.env.WEATHER_API_KEY,
      q: location,
      days: forecast_days,
    },
    responseType: 'json',
  })
    .then((response) => {
      const city = response.data.location.name;
      const { country } = response.data.location;
      const locationName = ` ${city} , ${country}`;
    
      const weatherDate = response.data.forecast.forecastday.map((forecastday) => {
        return {
          date: forecastday.date,

          temperatureMinC: forecastday.day.mintemp_c,
          temperatureMinF: forecastday.day.mintemp_f,
          temperatureMaxC: forecastday.day.maxtemp_c,
          temperatureMaxF: forecastday.day.maxtemp_f,
        };
      });
      return {
        locationName,
        weatherDate,
      };
    })
    .catch((err) => {
      console.error(err);
      throw new Error(`Error fetching forecast for : ${err.message}`);
    });
};

module.exports = {
  fetchForcast,
};
