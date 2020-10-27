// const singleForecastItem = {
//   dt: 1602255600,
//   main: {
//     temp: 299.53,
//     feels_like: 298.01,
//     temp_min: 299.53,
//     temp_max: 300.11,
//     pressure: 1022,
//     sea_level: 1022,
//     grnd_level: 948,
//     humidity: 33,
//     temp_kf: -0.58,
//   },
//   weather: [
//     { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
//   ],
//   clouds: {
//     all: 73,
//   },
//   wind: {
//     speed: 1.79,
//     deg: 303,
//   },
//   visibility: 10000,
//   pop: 0,
//   sys: {
//     pod: 'd',
//   },
//   dt_txt: '2020-10-09 15:00:00',
// };

const weekDays = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const getWeekDay = (str) => {
  const date = new Date(str);
  return weekDays[date.getDay()];
};

module.exports = {
  convert3HourForecastToDaily: (list) => {
    const daily = [];
    for (let index = 0; index < 5; index++) {
      const slicedList = list.slice(index * 8, index * 8 + 8);
      let accTemp = 0;
      let accFeels_like = 0;
      let temp_min = slicedList[0].main.temp_min;
      let temp_max = slicedList[0].main.temp_max;
      let weather = slicedList[0].weather;
      let dt_txt = slicedList[0].dt_txt;

      slicedList.forEach((item) => {
        accTemp += item.main.temp;
        accFeels_like += item.main.feels_like;
        temp_min =
          item.main.temp_min < temp_min ? item.main.temp_min : temp_min;
        temp_max =
          item.main.temp_max > temp_max ? item.main.temp_max : temp_max;

        if (item.dt_txt.substring(11) === '12:00:00') {
          weather = item.weather;
          dt_txt = item.dt_txt;
        }
      });

      daily[index] = {
        main: {
          temp: accTemp / 8,
          feels_like: accFeels_like / 8,
          temp_min,
          temp_max,
        },
        weather,
        dt_txt,
        week_day: getWeekDay(dt_txt),
      };
    }

    return daily;
  },
};
