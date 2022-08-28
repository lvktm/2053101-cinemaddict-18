import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import { isEsc } from '../util.js';
import { render } from '../framework/render.js';

export default class FilmCardDetailPresenter {
  #container;
  #movie;
  #comments;

  constructor(movie, container, comments) {
    this.#container = container;
    this.#movie = movie;
    this.#comments = comments;
  }

  renderFilmCardDetail = () => {
    const filmCardDetailComponent = new FilmCardDetailView(this.#movie);
    render(filmCardDetailComponent, this.#container);

    const commentsList = document.querySelector('.film-details__comments-list');

    this.#movie.comments.forEach((comment) => {
      const filmCommentsComponent = new CommentsView(comment, this.#comments);
      render(filmCommentsComponent, commentsList);
    });

    document.body.classList.add('hide-overflow');

    // Обработчик на ESC для закрытия попапа
    const escKeyDownHandler = (evt) => {
      if(isEsc(evt)) {
        evt.preventDefault();
        document.removeEventListener('keydown', escKeyDownHandler);
        filmCardDetailComponent.element.remove();
        document.body.classList.remove('hide-overflow');
      }
    };

    // Обработчик на click по кнопке закрытия попапа
    const filmCardDetailCloseButtonClickHandler = () => {
      document.removeEventListener('keydown', escKeyDownHandler);
      filmCardDetailComponent.element.remove();
      document.body.classList.remove('hide-overflow');
    };

    // Добавляет слушателя на кропку закрытия
    const closeFilmCardDetailButton = filmCardDetailComponent.element.querySelector('.film-details__close-btn');
    closeFilmCardDetailButton.addEventListener('click', filmCardDetailCloseButtonClickHandler);
    document.addEventListener('keydown', escKeyDownHandler);
  };

}
