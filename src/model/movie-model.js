import { generateMovie } from '../mock/movie.js';
const MAX_MOVIES = 20;

export default class MovieModel {
  movies = Array.from({length: MAX_MOVIES}, generateMovie);

  get allMovies() {
    return this.movies;
  }
}
