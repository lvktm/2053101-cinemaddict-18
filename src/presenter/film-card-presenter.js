import FilmCardDetailPresenter from './film-card-detail-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../framework/render.js';

export default class FilmCardPresenter {
  #movies = null;
  #comments = null;
  #movie = null;
  #filmCardComponent = null;
  #filmListContainerComponent = null;
  #filmCardDetailPresenter = null;

  constructor(movies, container, comments) {
    this.#movies = movies;
    this.#filmListContainerComponent = container;
    this.#comments = comments;
  }

  init = (movie) => {
    this.#movie = movie;
    this.#filmCardComponent = new FilmCardView(this.#movie);
    this.#filmCardDetailPresenter = new FilmCardDetailPresenter(this.#filmListContainerComponent, this.#comments);

    this.#filmCardComponent.setFilmCardClickHandler(this.#filmCardClickHandler);

    render(this.#filmCardComponent, this.#filmListContainerComponent);

  };

  // Обработчик отрисовывает попап с комментариями
  #filmCardClickHandler = (evt) => {
    const filmCardId = this.#filmCardComponent.getFilmCardId(evt);

    if(!filmCardId) {
      return;
    }

    const filmCard = this.#movies.find((film) => film.id.toString() === filmCardId);
    this.#filmCardDetailPresenter.init(filmCard);
  };
}
