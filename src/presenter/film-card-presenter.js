import FilmCardDetailPresenter from './film-card-detail-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';

export default class FilmCardPresenter {
  #movies = null;
  #comments = null;
  #movie = null;
  #filmCardComponent = null;
  #filmListContainerComponent = null;
  #filmCardDetailComponent = null;
  #changeData = null;

  constructor(movies, container, comments, changeData) {
    this.#movies = movies;
    this.#filmListContainerComponent = container;
    this.#comments = comments;
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#movie);
    this.#filmCardDetailComponent = new FilmCardDetailPresenter(this.#filmListContainerComponent,
      this.#comments,
      this.#changeData);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#filmCardComponent.setToWatchListClick(this.#handleToWatchListClick);

    if(prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainerComponent);
      return;
    }

    if(this.#filmListContainerComponent.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  #handleToWatchListClick = () => {
    this.#movie.userDetails = {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist};
    this.#changeData(this.#movie);
  };

  // Обработчик отрисовывает попап с комментариями
  #handleFilmCardClick = (evt) => {
    const filmCardId = this.#filmCardComponent.getFilmCardId(evt);

    if(!filmCardId) {
      return;
    }

    const filmCard = this.#movies.find((film) => film.id.toString() === filmCardId);
    this.#filmCardDetailComponent.init(filmCard);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmCardDetailComponent);
  };
}
