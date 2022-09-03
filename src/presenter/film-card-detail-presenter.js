import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import { isEsc } from '../util.js';
import { render, remove } from '../framework/render.js';

export default class FilmCardDetailPresenter {
  #container = null;
  #movie = null;
  #comments = null;
  #commentsList;
  #filmCardDetailComponent;

  constructor(container, comments) {
    this.#container = container;
    this.#comments = comments;
  }

  init = (movie) => {
    this.#movie = movie;

    this.#filmCardDetailComponent = new FilmCardDetailView(this.#movie);
    render(this.#filmCardDetailComponent, this.#container);

    this.#commentsList = this.#filmCardDetailComponent.getCommentsList();

    this.#movie.comments.forEach((comment) => {
      const filmCommentsComponent = new CommentsView(comment, this.#comments);
      render(filmCommentsComponent, this.#commentsList);
    });

    this.#filmCardDetailComponent.changeBodyClass();

    this.#filmCardDetailComponent.setCloseButtonHandler(this.#handleCloseButtonClick);

    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleCloseButtonClick = () => {
    this.#closeFilmCardDetail();
  };

  #handleEscKeyDown = (evt) => {
    if(!isEsc) {
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
