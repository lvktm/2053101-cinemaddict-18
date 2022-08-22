import { generateComment } from '../mock/comment.js';

export default class CommentModel {
  constructor(movieModel) {
    this.movieModel = movieModel;
    this.movies = movieModel.getMovies();
  }

  getComments = () => {
    const allComments = [];

    this.movies.map((movie) => {
      movie.comments.forEach((commentId) => {
        allComments.push(generateComment(commentId));
      });
    });

    return allComments;
  };
}
