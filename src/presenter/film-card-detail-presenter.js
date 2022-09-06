import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import ControlButtonsView from '../view/control-buttons-view.js';
import { isEsc } from '../util.js';
import { render, remove } from '../framework/render.js';

export default class FilmCardDetailPresenter {
  #container = null;
  #movie = null;
  #comments = null;
  #commentsList = null;
  #filmCardDetailComponent = null;
  #changeData = null;
  #controlButtonsComponent = null;

  constructor(container, comments, changeData) {
    this.#container = container;
    this.#comments = comments;
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#movie = movie;

    if(this.#filmCardDetailComponent === null) {
      this.#filmCardDetailComponent = new FilmCardDetailView(this.#movie);
      this.#controlButtonsComponent = new ControlButtonsView(this.#movie);
      render(this.#filmCardDetailComponent, this.#container);
    }


    this.#renderComments();

    this.#filmCardDetailComponent.changeBodyClass();

    this.#filmCardDetailComponent.setCloseButtonHandler(this.#handleCloseButtonClick);
    this.#controlButtonsComponent.setWatchListButtonClick(this.#handleToWatchListDetailClick);

    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #renderComments = () => {
    this.#commentsList = this.#filmCardDetailComponent.getCommentsList();

    this.#movie.comments.forEach((comment) => {
      const filmCommentsComponent = new CommentsView(comment, this.#comments);
      render(filmCommentsComponent, this.#commentsList);
    });
  };

  #handleToWatchListDetailClick = () => {
    this.#movie.userDetails = {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist};
    this.#changeData(this.#movie);
  };

  #handleCloseButtonClick = () => {
    this.#closeFilmCardDetail();
  };

  #handleEscKeyDown = (evt) => {
    if(!isEsc(evt)) {
      return;
    }
    evt.preventDefault();
    this.#closeFilmCardDetail();
  };

  #closeFilmCardDetail = () => {
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmCardDetailComponent.changeBodyClass();
    remove(this.#filmCardDetailComponent);
  };

}
