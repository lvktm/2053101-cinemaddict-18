import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // ES 2015
dayjs.extend(duration); // использование плагина

const DAY_BEGIN = 1;
const DAY_END = 30;
const MONTH_BEGIN = 1;
const MONTH_END = 12;

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const randomYearMonthDay = (startYear, endYear) => dayjs().year(getRandomInteger(startYear, endYear))
  .month(getRandomInteger(MONTH_BEGIN, MONTH_END))
  .day(getRandomInteger(DAY_BEGIN,DAY_END))
  .toDate();

const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');

const humanizeReleaseDateDetail = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[mm]');

const isEsc = (evt) => evt.key === 'Escape';

export {getRandomInteger,
  humanizeReleaseDate,
  humanizeReleaseDateDetail,
  formatMinutesToTime,
  randomYearMonthDay,
  getRandomElement,
  isEsc
};
