import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // ES 2015
dayjs.extend(duration); // использование плагина
import { FilterType } from './mock/const.js';

const MINUTES_BEGIN = 0;
const MINUTES_END = 60;
const HOUR_BEGIN = 0;
const HOUR_END = 24;
const DAY_BEGIN = 1;
const DAY_END = 30;
const MONTH_BEGIN = 1;
const MONTH_END = 12;
const YEAR_BEGIN = 1;
const YEAR_END = 2;
const MIN = 0;
const MAX = 1;

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

const randomYearMonthDayHourMinute = () => dayjs().subtract(getRandomInteger(YEAR_BEGIN, YEAR_END), 'year')
  .add(getRandomInteger(MONTH_BEGIN, MONTH_END), 'month')
  .add(getRandomInteger(DAY_BEGIN, DAY_END), 'day')
  .add(getRandomInteger(HOUR_BEGIN, HOUR_END), 'hour')
  .add(getRandomInteger(MINUTES_BEGIN, MINUTES_END), 'minutes');

const formatYearMonthDayHourMinute = (someDate) => dayjs(someDate).format('YYYY/MM/DD HH[:]mm');

const humanizeReleaseDate = (releaseDate) => dayjs(releaseDate).format('YYYY');

const humanizeReleaseDateDetail = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[mm]');

const isEsc = (evt) => evt.key === 'Escape';

const isTrueOrFalse = () => getRandomInteger(MIN, MAX) === MAX;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const isWatchList = (movie) => movie.userDetails.watchlist;
const isHistory = (movie) => movie.userDetails.alreadyWatched;
const isFavorite = (movie) => movie.userDetails.favorite;

const filter = {
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => isWatchList(movie)),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => isHistory(movie)),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => isFavorite(movie))
};

const sortMovieByRating = (movieA, movieB) => movieB.filmInfo.totalRating - movieA.filmInfo.totalRating;

const sortMovieByDate = (movieA, movieB) => dayjs(movieB.filmInfo.release.date).diff(movieA.filmInfo.release.date);

export {getRandomInteger,
  humanizeReleaseDate,
  humanizeReleaseDateDetail,
  formatMinutesToTime,
  randomYearMonthDay,
  randomYearMonthDayHourMinute,
  formatYearMonthDayHourMinute,
  getRandomElement,
  isEsc,
  isTrueOrFalse,
  updateItem,
  filter,
  sortMovieByRating,
  sortMovieByDate
};
