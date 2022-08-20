import { getRandomInteger, getRandomElement, randomYearMonthDay } from '../util.js';
import { titles, posters, descriptions, ageRatings, directors, writers, actors, countries,
  MAX_MINUTES, MIN_MINUTES, genres, releaseDates, watchingDateMinutesAgo } from './const.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport'; // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'; // ES 2015

dayjs.extend(objectSupport); // использование плагина
dayjs.extend(relativeTime); // использование плагина


const generateTitle = () => getRandomElement(titles);
const generatAlternativeTitle = () => getRandomElement(descriptions);
const generateRaiting = () => Math.round((Math.random() * 100)) / 10;
const generatePoster = () => getRandomElement(posters);
const generateAgeRating = () => getRandomElement(ageRatings);
const generateDirector = () => getRandomElement(directors);
const generateWritersOrActorsOrGenres = (elements) => {
  const namesCount = getRandomInteger(0, 2);
  const filmNames = [];
  for(let i = 0; i <= namesCount; i++) {
    filmNames.push(getRandomElement(elements));
  }
  return filmNames;
};
const generateCountries = () => getRandomElement(countries);

const generateReleaseDate = () => randomYearMonthDay(releaseDates.MIN, releaseDates.MAX);

const generateRauntime = () => getRandomInteger(MIN_MINUTES, MAX_MINUTES);
const generateDescription = () => getRandomElement(descriptions);
const isTrueOrFalse = () => getRandomInteger(0, 1) === 1;
const generateWatchingDate = () => {
  const randomMinutes = getRandomInteger(-watchingDateMinutesAgo, 0);
  return dayjs().add(randomMinutes, 'minutes').toDate();
};

export const generateMovie = () => ({
  id: 0,
  comments: [
    '12', '34'
  ],
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


