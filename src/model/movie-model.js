import { generateMovie } from '../mock/movie.js';

export default class MovieModel {
  movies = Array.from({length: 4}, generateMovie);

  getMovies = () => this.movies;
}
