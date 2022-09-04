import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import { isEsc } from '../util.js';
import { render, remove, replace } from '../framework/render.js';

export default class FilmCardDetailPresenter {
  #container = null;
  #movie = null;
  #comments = null;
  #commentsList = null;
  #filmCardDetailComponent = null;
  #handleAddToWatchList = null;

  constructor(container, comments, handleAddToWatchList) {
    this.#container = container;
    this.#comments = comments;
    this.#handleAddToWatchList = handleAddToWatchList;
  }

  init = (movie) => {
    this.#movie = movie;

    if(this.#filmCardDetailComponent === null) {
      this.#filmCardDetailComponent = new FilmCardDetailView(this.#movie);
      render(this.#filmCardDetailComponent, this.#container);
    } else {
      this.#closeFilmCardDetail();
      render(this.#filmCardDetailComponent, this.#container);
    }


    this.#renderComments();

    this.#filmCardDetailComponent.changeBodyClass();

    this.#filmCardDetailComponent.setCloseButtonHandler(this.#handleCloseButtonClick);
    this.#filmCardDetailComponent.setAddToWatchListHandler(this.#handlePopupRefresh);

    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #renderComments = () => {
    this.#commentsList = this.#filmCardDetailComponent.getCommentsList();

    this.#movie.comments.forEach((comment) => {
      const filmCommentsComponent = new CommentsView(comment, this.#comments);
      render(filmCommentsComponent, this.#commentsList);
    });
  };

  #handleCloseButtonClick = () => {
    this.#closeFilmCardDetail();
  };

  #handlePopupRefresh = () => {
    this.#handleAddToWatchList();debugger;
    this.init(this.#movie);
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
