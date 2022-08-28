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
      description}
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
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
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

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
