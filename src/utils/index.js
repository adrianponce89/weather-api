module.exports = {
  convert3HourForecastToDaily: (list) => {
    const daily = [];
    for (let index = 0; index < 5; index++) {
      const slicedList = list.slice(index * 8, index * 8 + 8);
      let accTemp = 0;
      let accFeels_like = 0;
      let temp_min = slicedList[0].main.temp_min;
      let temp_max = slicedList[0].main.temp_max;

      slicedList.forEach((item) => {
        accTemp += item.main.temp;
        accFeels_like += item.main.feels_like;
        temp_min =
          item.main.temp_min < temp_min ? item.main.temp_min : temp_min;
        temp_max =
          item.main.temp_max > temp_max ? item.main.temp_max : temp_max;
      });

      daily[index] = {
        main: {
          temp: accTemp / 8,
          feels_like: accFeels_like / 8,
          temp_min,
          temp_max,
        },
        weather: slicedList[4].weather,
        dt_txt: slicedList[4].dt_txt.substring(0, 10),
      };
    }

    return daily;
  },
};
