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
  #filmsComponent = new FilmsTemplateView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();
  #renderedMovies = FILM_COUNT_PER_STEP;

  constructor(cinemaddictContainer, movieModel, commentsModel) {
    this.cinemaddictContainer = cinemaddictContainer;
    this.movieModel = movieModel;
    this.movies = [...this.movieModel.allMovies];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.comments];
  }

  // Обработчик отрисовывает попап с комментариями
  #onFilmCardClick = (evt) => {
    const currentElement = evt.target;
    if(currentElement.classList.contains('film-card__poster')) {
      for(let i = 0; i < this.movies.length; i++) {

        if(this.movies[i].id.toString() === currentElement.closest('.film-card').dataset.id) {
          const filmCardDetailComponent = new FilmCardDetailView(this.movies[i]);
          render(filmCardDetailComponent, this.cinemaddictContainer);

          const commentsList = document.querySelector('.film-details__comments-list');

          for(let j = 0; j < this.movies[i].comments.length; j++) {
            const filmCommentsComponent = new CommentsView(this.movies[i].comments[j], this.comments);
            render(filmCommentsComponent, commentsList);
          }

          document.body.classList.add('hide-overflow');

          addListeners(filmCardDetailComponent);
        }
      }
    }
  };

  #onShowMoreButtonClick = () => {
    this.movies
      .slice(this.#renderedMovies, this.#renderedMovies + FILM_COUNT_PER_STEP)
      .forEach((movie) => {
        render(new FilmCardView(movie), this.#filmsListContainerComponent.element);
      });

    this.#renderedMovies += FILM_COUNT_PER_STEP;

    if(this.#renderedMovies >= this.movies.length) {
      this.#showMoreButton.element.style.display = 'none';
      render (new EmptyMessageView(), this.#filmsListContainerComponent.element.parentNode);
    }
  };

  init = () => {
    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.#filmsComponent, this.cinemaddictContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    // Отрисовывает 5 фильмов при загрузке страницы
    for(let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      render(new FilmCardView(this.movies[i]), this.#filmsListContainerComponent.element);
    }

    render(this.#showMoreButton, this.cinemaddictContainer);

    // Добавляет обработчик на клик на контейнер с фильмами
    this.#filmsComponent.setClickHandler(this.#onFilmCardClick);

    // Добавляет обработчик на клик на кнопку show more
    this.#showMoreButton.setClickHandler(this.#onShowMoreButtonClick);
  };
}
