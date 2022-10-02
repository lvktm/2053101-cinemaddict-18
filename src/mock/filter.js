import { filter } from '../util.js';

export const generateFilter = (movies) => Object.entries(filter).map(
  ([filterName, filterMovies]) => ({
    name: filterName,
    count: filterMovies(movies).length,
  }),
);
