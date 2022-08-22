import { generateMovie } from '../mock/movie.js';
const MAX_MOVIES = 5;

export default class MovieModel {
  movies = Array.from({length: MAX_MOVIES}, generateMovie);

  getMovies = () => this.movies;
}
