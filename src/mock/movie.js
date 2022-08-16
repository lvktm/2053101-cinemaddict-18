import dayjs from 'dayjs';
import { getRandomElement, humanizeReleaseDate } from '../util.js';
import { titles, posters, descriptions } from './const.js';


const generateTitle = () => getRandomElement(titles);

const generatePoster = () => getRandomElement(posters);

const generateRaiting = () => Math.round((Math.random() * 100)) / 10;

const generateReleaseDate = () => humanizeReleaseDate(dayjs());

const generateDescription = () => getRandomElement(descriptions);

export const generateMovie = () => ({
  id: 0,
  comments: [
    '12', '34'
  ],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: generateRaiting(),
    poster: generatePoster(),
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: generateReleaseDate(),
      releaseCountry: 'Finland'
    },
    runtime: '77',
    genre: [
      'Comedy'
    ],
    description: generateDescription(),
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});


