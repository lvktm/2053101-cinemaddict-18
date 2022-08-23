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
import { render } from '../render.js';

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


// Обработчик отрисовывает попап с комментариями
const onFilmCardClick = (cinemaddictContainer, movies, allComments) => (evt) => {
  const currentElement = evt.target;
  if(currentElement.classList.contains('film-card__poster')) {
    for(let i = 0; i < movies.length; i++) {

      if(movies[i].id.toString() === currentElement.closest('.film-card').dataset.id) {
        const filmCardDetailComponent = new FilmCardDetailView(movies[i]);
        render(filmCardDetailComponent, cinemaddictContainer);

        const commentsList = document.querySelector('.film-details__comments-list');

        for(let j = 0; j < movies[i].comments.length; j++) {
          const filmCommentsComponent = new CommentsView(movies[i].comments[j], allComments);
          render(filmCommentsComponent, commentsList);
        }

        document.body.classList.add('hide-overflow');

        addListeners(filmCardDetailComponent);
      }
    }
  }
};

function RenderMovies() {
  let renderedMovies = 0;

  this.addMovies = (container, movies, button) => {

    movies
      .slice(renderedMovies, renderedMovies + FILM_COUNT_PER_STEP)
      .forEach((movie) => {
        render(new FilmCardView(movie), container);
      });

    renderedMovies += FILM_COUNT_PER_STEP;

    if(renderedMovies >= movies.length) {
      button.element.style.display = 'none';
      render (new EmptyMessageView(), container.parentNode);
    }
  };

}

const renderMovies = new RenderMovies();

const onShowMoreButtonClick = (container, movies, button) => () => {
  renderMovies.addMovies(container, movies, button);
};

export default class CinemaddictPresenter {
  #filmsComponent = new FilmsTemplateView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ShowMoreButtonView();

  init = (cinemaddictContainer, movieModel, commentsModel) => {
    this.cinemaddictContainer = cinemaddictContainer;
    this.movieModel = movieModel;
    this.movies = [...this.movieModel.allMovies];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.comments];

    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.#filmsComponent, this.cinemaddictContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    renderMovies.addMovies(this.#filmsListContainerComponent.element, this.movies);

    render(this.#showMoreButton, this.cinemaddictContainer);

    // Добавляет слушателя на контейнер с фильмами
    this.#filmsComponent
      .element
      .addEventListener('click', onFilmCardClick(this.cinemaddictContainer, this.movies, this.comments));

    // Добавляет слушателя на кнопку show more
    this.#showMoreButton
      .element
      .addEventListener('click', onShowMoreButtonClick(this.#filmsListContainerComponent.element, this.movies, this.#showMoreButton));

  };
}
