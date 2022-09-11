import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import { isEsc } from '../util.js';
import { render, remove, replace } from '../framework/render.js';

const Mode = {
  POPUPOPENED: 'POPUPOPENED',
  DEFAULT: 'DEFAULT'
};

export default class FilmCardDetailPresenter {
  #container = null;
  #movie = null;
  #comments = null;
  #commentsList = null;
  #filmCardDetailComponent = null;
  #changeData = null;
  #prevFilmCardDetailComponent = null;
  #mode = Mode.DEFAULT;
  #changeMode = null;

  constructor(container, comments, changeData, changeMode) {
    this.#container = container;
    this.#comments = comments;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (movie, evt) => {
    this.#movie = movie;
    this.#prevFilmCardDetailComponent = this.#filmCardDetailComponent;

    this.#filmCardDetailComponent = new FilmCardDetailView(this.#movie);

    this.#filmCardDetailComponent.setCloseButtonHandler(this.#handleCloseButtonClick);
    this.#filmCardDetailComponent.setToWatchListButtonClickHandler(this.#handleToWatchListDetailClick);
    this.#filmCardDetailComponent.setWatchedButtonClickHandler(this.#handleWatchedDetailClick);
    this.#filmCardDetailComponent.setFavoriteButtonClickHandler(this.#handleFavoriteDetailClick);

    const isLittleControlButton = this.#filmCardDetailComponent.isFilmCardControlButton(evt);

    if(this.#mode === Mode.DEFAULT && !isLittleControlButton) {
      this.#renderFilmCardDetail();
      return;
    }

    if(this.#mode === Mode.POPUPOPENED) {
      replace(this.#filmCardDetailComponent, this.#prevFilmCardDetailComponent);
      this.#renderComments();
    }

    remove(this.#prevFilmCardDetailComponent);
  };

  #renderFilmCardDetail = () => {
    this.#changeMode();
    render(this.#filmCardDetailComponent, this.#container);
    this.#renderComments();
    this.#filmCardDetailComponent.changeBodyClass();
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#mode = Mode.POPUPOPENED;
  };

  #renderComments = () => {
    this.#commentsList = this.#filmCardDetailComponent.getCommentsList();

    this.#movie.comments.forEach((comment) => {
      const filmCommentsComponent = new CommentsView(comment, this.#comments);
      render(filmCommentsComponent, this.#commentsList);
    });
  };

  #handleToWatchListDetailClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist};
    this.#changeData(this.#movie, evt);
  };

  #handleWatchedDetailClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched};
    this.#changeData(this.#movie, evt);
  };

  #handleFavoriteDetailClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite};
    this.#changeData(this.#movie, evt);
  };

  #handleCloseButtonClick = () => {
    this.closeFilmCardDetail();
  };

  #handleEscKeyDown = (evt) => {
    if(!isEsc(evt)) {
      return;
    }
    evt.preventDefault();
    this.closeFilmCardDetail();
  };

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT) {
      this.closeFilmCardDetail();
    }
  };

  closeFilmCardDetail = () => {
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmCardDetailComponent.changeBodyClass();
    remove(this.#filmCardDetailComponent);
    this.#filmCardDetailComponent = null;
    this.#mode = Mode.DEFAULT;
  };

}
