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
  #changeData = null;
  #prevFilmCardDetailComponent = null;

  constructor(container, comments, changeData) {
    this.#container = container;
    this.#comments = comments;
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#movie = movie;
    this.#prevFilmCardDetailComponent = this.#filmCardDetailComponent;

    this.#filmCardDetailComponent = new FilmCardDetailView(this.#movie);

    this.#filmCardDetailComponent.setCloseButtonHandler(this.#handleCloseButtonClick);
    this.#filmCardDetailComponent.setToWatchListButtonClickHandler(this.#handleToWatchListDetailClick);
    this.#filmCardDetailComponent.setWatchedButtonClickHandler(this.#handleWatchedDetailClick);
    this.#filmCardDetailComponent.setFavoriteButtonClickHandler(this.#handleFavoriteDetailClick);

    if(this.#prevFilmCardDetailComponent === null) {
      render(this.#filmCardDetailComponent, this.#container);
      this.#renderComments();

      this.#filmCardDetailComponent.changeBodyClass();

      document.addEventListener('keydown', this.#handleEscKeyDown);
      return;
    }

    if(this.#container.contains(this.#prevFilmCardDetailComponent.element)) {
      replace(this.#filmCardDetailComponent, this.#prevFilmCardDetailComponent);
      this.#renderComments();
    }
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

  #handleWatchedDetailClick = () => {
    this.#movie.userDetails = {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched};
    this.#changeData(this.#movie);
  };

  #handleFavoriteDetailClick = () => {
    this.#movie.userDetails = {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite};
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
    this.#filmCardDetailComponent = null;
  };

}
