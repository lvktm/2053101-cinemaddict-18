import dayjs from 'dayjs';
import { getRandomInteger, getRandomElement, humanizeReleaseDate } from '../util.js';
import { titles, posters, descriptions, ageRatings, directors, writers, actors, countries,
  MAX_MINUTES, MIN_MINUTES, genres } from './const.js';
import duration from 'dayjs/plugin/duration'; // ES 2015

dayjs.extend(duration); // использование плагина

// console.log(dayjs.duration({minutes: 77}).format('mm'));

const generateTitle = () => getRandomElement(titles);
const generatAlternativeTitle = () => getRandomElement(descriptions);
const generateRaiting = () => Math.round((Math.random() * 100)) / 10;
const generatePoster = () => getRandomElement(posters);
const generateAgeRating = () => getRandomElement(ageRatings);
const generateDirector = () => getRandomElement(directors);
const generateWritersOrActorsOrGenres = (elements) => {
  const namesCount = getRandomInteger(0, 3);
  const filmNames = [];
  for(let i = 0; i <= namesCount; i++) {
    filmNames.push(getRandomElement(elements));
  }
  return filmNames;
};
const generateCountries = () => getRandomElement(countries);
const generateReleaseDate = () => humanizeReleaseDate(dayjs());
const generateRauntime = () => getRandomInteger(MIN_MINUTES, MAX_MINUTES);
const generateDescription = () => getRandomElement(descriptions);
const isTrueOrFalse = () => getRandomInteger(0, 1) === 1;

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
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: isTrueOrFalse()
  }
});


