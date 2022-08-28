import CommentsView from '../view/comments-view.js';
import EmptyMessageView from '../view/empty-message-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsTemplateView from '../view/films-template-view.js';
import FilterView from '../view/filter-view.js';
import { isEsc } from '../util.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';

const FILM_COUNT_PER_STEP = 5;

// Добавляет слушателей и к ним обработчики для работы с попапом
const addListeners = (filmCardDetailComponent) => {
  // Обработчик на ESC для закрытия попапа
  const onFilmCardDetailEscKeydown = (evt) => {
    if(isEsc(evt)) {
      evt.preventDefault();
      closeFilmCardDetail(filmCardDetailComponent);
    }
  };

  // Обработчик на click по кнопке закрытия попапа
  const onFilmCardDetailCloseButtonClick = () => {
    closeFilmCardDetail(filmCardDetailComponent);
  };

  // Добавляет слушателя на кропку закрытия
  const closeFilmCardDetailButton = filmCardDetailComponent.element.querySelector('.film-details__close-btn');
  closeFilmCardDetailButton.addEventListener('click', onFilmCardDetailCloseButtonClick);
  document.addEventListener('keydown', onFilmCardDetailEscKeydown);

  // Функция закрытия попапа
  function closeFilmCardDetail() {
    document.removeEventListener('keydown', onFilmCardDetailEscKeydown);
    filmCardDetailComponent.element.remove();
    document.body.classList.remove('hide-overflow');
  }
};

export default class CinemaddictPresenter {
  #cinemaddictContainer = null;
  #movieModel = null;
  #commentsModel = null;
  #movies = null;
  #comments = null;

  #filmsComponent = new FilmsTemplateView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #renderedMovies = FILM_COUNT_PER_STEP;

  constructor(cinemaddictContainer, movieModel, commentsModel) {
    this.#cinemaddictContainer = cinemaddictContainer;
    this.#movieModel = movieModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#movies = [...this.#movieModel.allMovies];
    this.#comments = [...this.#commentsModel.comments];

    this.#renderFilmBoard();
  };

  // Обработчик отрисовывает попап с комментариями
  #onFilmCardClick = (evt) => {
    const currentElement = evt.target;
    if(currentElement.classList.contains('film-card__poster')) {
      for(let i = 0; i < this.#movies.length; i++) {

        if(this.#movies[i].id.toString() === currentElement.closest('.film-card').dataset.id) {
          const filmCardDetailComponent = new FilmCardDetailView(this.#movies[i]);
          render(filmCardDetailComponent, this.#cinemaddictContainer);

          const commentsList = document.querySelector('.film-details__comments-list');

          for(let j = 0; j < this.#movies[i].comments.length; j++) {
            const filmCommentsComponent = new CommentsView(this.#movies[i].comments[j], this.#comments);
            render(filmCommentsComponent, commentsList);
          }

          document.body.classList.add('hide-overflow');

          addListeners(filmCardDetailComponent);
        }
      }
    }
  };

  #renderFilter = () => render(new FilterView(), this.#cinemaddictContainer);

  #renderSort = () => render(new SortView(), this.#cinemaddictContainer);

  #renderFilmsListContainer = () => {
    render(this.#filmsComponent, this.#cinemaddictContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  };

  #renderFilmCard = (movie) => {
    const filmCardComponent = new FilmCardView(movie);
    const filmListContainerComponent = this.#filmsListContainerComponent.element;

    // Добавить к нему обработчик на клик на открытие попапа
    filmCardComponent.setClickHandler(this.#onFilmCardClick);

    // Отрисовать карточку фильма
    render(filmCardComponent, filmListContainerComponent);
  };

  #renderFilmCards = (from, to) => {
    this.#movies
      .slice(from, to)
      .forEach((movie) => this.#renderFilmCard(movie));
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#cinemaddictContainer);
    // Добавляет обработчик на клик на кнопку show more
    this.#showMoreButton.setClickHandler(this.#onShowMoreButtonClick);
  };

  #onShowMoreButtonClick = () => {
    this.#movies
      .slice(this.#renderedMovies, this.#renderedMovies + FILM_COUNT_PER_STEP)
      .forEach((movie) => this.#renderFilmCard(movie));

    this.#renderedMovies += FILM_COUNT_PER_STEP;

    if(this.#renderedMovies >= this.#movies.length) {
      this.#showMoreButton.element.style.display = 'none';
      render (new EmptyMessageView(), this.#filmsListContainerComponent.element.parentNode);
    }
  };

  #renderFilmBoard = () => {
    this.#renderFilter();

    this.#renderSort();

    this.#renderFilmsListContainer();

    this.#renderFilmCards(0, FILM_COUNT_PER_STEP);

    this.#renderShowMoreButton();
  };

}
