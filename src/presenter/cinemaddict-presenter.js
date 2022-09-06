import EmptyMessageView from '../view/empty-message-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsTemplateView from '../view/films-template-view.js';
import FilterView from '../view/filter-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import { render, remove } from '../framework/render.js';
import FilmCardPresenter from './film-card-presenter.js';
import { updateItem } from '../util.js';

const FILM_COUNT_PER_STEP = 5;

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
  #moviePresenters = new Map();

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

  #renderFilter = () => render(new FilterView(), this.#cinemaddictContainer);

  #renderSort = () => render(new SortView(), this.#cinemaddictContainer);

  #renderFilmsListContainer = () => {
    render(this.#filmsComponent, this.#cinemaddictContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
  };

  #renderFilmCard = (movie) => {
    const filmCardPresenter = new FilmCardPresenter(this.#movies
      , this.#filmsListContainerComponent.element
      , this.#comments
      , this.#handleFilmCardChange);
    filmCardPresenter.init(movie);
    this.#moviePresenters.set(movie.id, filmCardPresenter);
  };

  #renderFilmCards = (from, to) => {
    this.#movies
      .slice(from, to)
      .forEach((movie) => this.#renderFilmCard(movie));
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#cinemaddictContainer);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #handleShowMoreButtonClick = () => {
    this.#movies
      .slice(this.#renderedMovies, this.#renderedMovies + FILM_COUNT_PER_STEP)
      .forEach((movie) => this.#renderFilmCard(movie));

    this.#renderedMovies += FILM_COUNT_PER_STEP;

    if(this.#renderedMovies >= this.#movies.length) {
      remove(this.#showMoreButton);
      render (new EmptyMessageView(), this.#filmsListContainerComponent.element.parentNode);
    }
  };

  #handleFilmCardChange = (updatedFilmCard) => {
    this.#movies = updateItem(this.#movies, updatedFilmCard);
    this.#moviePresenters.get(updatedFilmCard.id).init(updatedFilmCard);
  };

  #renderFilmBoard = () => {
    this.#renderFilter();

    this.#renderSort();

    this.#renderFilmsListContainer();

    this.#renderFilmCards(0, FILM_COUNT_PER_STEP);

    this.#renderShowMoreButton();
  };

  #clearFilmList = () => {
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();
    this.#renderedMovies = FILM_COUNT_PER_STEP;
    this.#renderShowMoreButton();
  };

}
