import AbstractView from '../framework/view/abstract-view.js';
import { formatYearMonthDayHourMinute } from '../util.js';

const createComments = (movieComment, allMovieComments) => {

  const filmComment = allMovieComments.find((commentElement) => commentElement.id === movieComment);

  const {
    author,
    comment,
    date,
    emotion
  } = filmComment;

  const commentDate = formatYearMonthDayHourMinute(date);

  return (`
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${ emotion }.png" width="55" height="55" alt="emoji-${ emotion }">
    </span>
    <div>
      <p class="film-details__comment-text">${ comment }</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${ author }</span>
        <span class="film-details__comment-day">${ commentDate }</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );

};


export default class CommentsView extends AbstractView {
  constructor(movieComment, allComments) {
    super();
    this.movieComment = movieComment;
    this.allComments = allComments;
  }

  get template() {
    return createComments(this.movieComment, this.allComments);
  }
}
