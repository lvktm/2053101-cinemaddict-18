import AbstractView from '../framework/view/abstract-view.js';
import { humanizeReleaseDate, formatMinutesToTime } from '../util.js';

const MIN_SYMBOLS = 0;
const MAX_SYMBOLS = 139;

const createFilmCard = (movie) => {
  const {id,
    comments,
    filmInfo: {
      title,
      poster,
      release: {
        date
      },
      totalRating,
      runtime,
      genre,
      description},
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = movie;

  const releaseDate = humanizeReleaseDate(date);
  const filmRuntime = formatMinutesToTime(runtime);
  const commentsCount = Array.from(comments).length;

  const getShortDescription = () => {
    if(description.length > MAX_SYMBOLS) {
      return `${description.slice(MIN_SYMBOLS, MAX_SYMBOLS) }...`;
    }
    return description;
  };
  const shortDescription = getShortDescription();

  const activateControlButton = (controlButton) => controlButton
    ? ' film-card__controls-item--active'
    : '';

  const toWatchListButton = activateControlButton(watchlist);
  const alreadyWatchedButton = activateControlButton(alreadyWatched);
  const favoriteButton = activateControlButton(favorite);

  return (
    `<article class="film-card" data-id="${ id }">
  <a class="film-card__link">
    <h3 class="film-card__title">${ title }</h3>
    <p class="film-card__rating">${ totalRating }</p>
    <p class="film-card__info">
      <span class="film-card__year">${ releaseDate }</span>
      <span class="film-card__duration">${ filmRuntime }</span>
      <span class="film-card__genre">${ genre }</span>
    </p>
    <img src= ${ poster } alt="" class="film-card__poster">
    <p class="film-card__description">${ shortDescription }</p>
    <span class="film-card__comments">${ commentsCount } comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${ toWatchListButton }" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${ alreadyWatchedButton }" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${ favoriteButton }" type="button">Mark as favorite</button>
  </div>
</article>`);};

export default class FilmCardView extends AbstractView {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createFilmCard(this.movie);
  }

  setToWatchListButtonClickHandler = (callback) => {
    this._callback.toWatchListButtonClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#toWatchListButtonClickHandler);
  };

  #toWatchListButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.toWatchListButtonClick(evt);
  };

  setWatchedButtonClickHandler = (callback) => {
    this._callback.watchedButtonClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#watchedButtonClickHandler);
  };

  #watchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedButtonClick(evt);
  };

  setFavoriteButtonClickHandler = (callback) => {
    this._callback.favoriteButtonClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteButtonClick(evt);
  };

  setFilmCardClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#filmCardClickHandler);
  };

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };

  getFilmCardId = (evt) => evt.target.tagName === 'IMG'
    ? evt.target.parentNode.parentNode.dataset.id
    : null;
}
