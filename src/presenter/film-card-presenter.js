import FilmCardView from '../view/film-card-view.js';
import { render, remove, replace } from '../framework/render.js';

export default class FilmCardPresenter {
  #movies = null;
  #movie = null;
  #filmCardComponent = null;
  #filmListContainerComponent = null;
  #filmCardDetailPresenter = null;
  #changeData = null;

  constructor(filmCardDetailPresenter, movies, container, changeData) {
    this.#filmCardDetailPresenter = filmCardDetailPresenter;
    this.#movies = movies;
    this.#filmListContainerComponent = container;
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#filmCardComponent = new FilmCardView(this.#movie);

    this.#filmCardComponent.setFilmCardClickHandler(this.#handleFilmCardClick);
    this.#filmCardComponent.setToWatchListButtonClickHandler(this.#handleToWatchListClick);
    this.#filmCardComponent.setWatchedButtonClickHandler(this.#handleWatchedClick);
    this.#filmCardComponent.setFavoriteButtonClickHandler(this.#handleFavoriteClick);

    if(prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListContainerComponent);
      return;
    }

    if(this.#filmListContainerComponent.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  #handleToWatchListClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist};
    this.#changeData(this.#movie, evt);
  };

  #handleWatchedClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched};
    this.#changeData(this.#movie, evt);
  };

  #handleFavoriteClick = (evt) => {
    this.#movie.userDetails = {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite};
    this.#changeData(this.#movie, evt);
  };

  // Обработчик отрисовывает попап с комментариями
  #handleFilmCardClick = (evt) => {
    const filmCardId = this.#filmCardComponent.getFilmCardId(evt);

    if(!filmCardId) {
      return;
    }

    const filmCard = this.#movies.find((film) => film.id.toString() === filmCardId);
    this.#filmCardDetailPresenter.init(filmCard, evt);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmCardDetailPresenter);
  };
}
