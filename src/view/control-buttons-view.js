import AbstractView from '../framework/view/abstract-view.js';

const createControlButtons = (movie) => {
  const {
    userDetails: {
      watchlist,
      alreadyWatched,
      watchingDate,
      favorite
    }
  } = movie;

  const isAddedToWatchList = () => watchlist
    ? ' film-card__controls-item--active'
    : '';

  const toWatchList = isAddedToWatchList();

  return (
    `<button type="button" class="film-details__control-button film-details__control-button--watchlist ${ toWatchList }" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    `);};

export default class ControlButtonsView extends AbstractView {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  get template() {
    return createControlButtons(this.movie);
  }

  getControlButtons = () => this.element.querySelector('.film-details__controls');

  setAddToWatchListButtonClick = (callback) => {
    this._callback.addToWatchListButtonClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchListHandler);
  };

  #addToWatchListHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchListButtonClick();
  };

}
