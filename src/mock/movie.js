import { getRandomInteger, getRandomElement, randomYearMonthDay, isTrueOrFalse } from '../util.js';
import { titles, posters, descriptions, ageRatings, directors, writers, actors, countries,
  genres, releaseDates, watchingDateMinutesAgo } from './const.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport'; // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'; // ES 2015

dayjs.extend(objectSupport); // использование плагина
dayjs.extend(relativeTime); // использование плагина

const MIN_MINUTES = 30;
const MAX_MINUTES = 150;
const MIN_COMMENTS_ID = 1;
const MAX_COMMENTS_ID = 1000;
const MIN_ELEMENTS = 0;
const MAX_ELEMENTS = 10;
const MIN_WRITERS = 0;
const MAX_WRITERS = 2;

// Создаем массив id для комментариев
const commentsId = Array.from({length: MAX_COMMENTS_ID}, (_value, index) => index);
const generateCommentsId = () => commentsId.splice(MIN_ELEMENTS, getRandomInteger(MIN_ELEMENTS, MAX_ELEMENTS));

const generateTitle = () => getRandomElement(titles);

const generatAlternativeTitle = () => getRandomElement(descriptions);

const generateRaiting = () => getRandomInteger(MIN_ELEMENTS, MAX_ELEMENTS);

const generatePoster = () => getRandomElement(posters);

const generateAgeRating = () => getRandomElement(ageRatings);

const generateDirector = () => getRandomElement(directors);

const generateWritersOrActorsOrGenres = (elements) => {
  const namesCount = getRandomInteger(MIN_WRITERS, MAX_WRITERS);
  const filmNames = [];
  for(let i = MIN_ELEMENTS; i <= namesCount; i++) {
    filmNames.push(getRandomElement(elements));
  }
  return filmNames;
};

const generateCountries = () => getRandomElement(countries);

const generateReleaseDate = () => randomYearMonthDay(releaseDates.MIN, releaseDates.MAX);

const generateRauntime = () => getRandomInteger(MIN_MINUTES, MAX_MINUTES);

const generateDescription = () => getRandomElement(descriptions);

const generateWatchingDate = () => {
  const randomMinutes = getRandomInteger(-watchingDateMinutesAgo, MIN_ELEMENTS);
  return dayjs().add(randomMinutes, 'minutes').toDate();
};

export const generateMovie = () => ({
  id: getRandomInteger(MIN_COMMENTS_ID, MAX_COMMENTS_ID),
  comments: generateCommentsId(),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generatAlternativeTitle(),
    totalRating: generateRaiting(),
    poster: generatePoster(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generateWritersOrActorsOrGenres(writers),
    actors: generateWritersOrActorsOrGenres(actors),
    release: {
      date: generateReleaseDate(),
      releaseCountry: generateCountries()
    },
    runtime: generateRauntime(),
    genre: generateWritersOrActorsOrGenres(genres),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: isTrueOrFalse(),
    alreadyWatched: isTrueOrFalse(),
    watchingDate: generateWatchingDate(),
    favorite: isTrueOrFalse()
  }
});
