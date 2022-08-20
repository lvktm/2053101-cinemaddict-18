import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // ES 2015
dayjs.extend(duration); // использование плагина

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[mm]');

const isEsc = (evt) => evt.key === 'Escape';

export {getRandomInteger,
  humanizeReleaseDate,
  formatMinutesToTime,
  getRandomElement,
  isEsc
};
