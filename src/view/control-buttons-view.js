import AbstractView from '../framework/view/abstract-view.js';

const getControlButtons = (movie) => {
  const {
    userDetails: {
      watchlist,
      alreadyWatched,
      watchingDate,
      favorite
    }
  } = movie;

  return {
    watchlist,
    alreadyWatched,
    favorite
  };
};


export default class ControlButtonsView extends AbstractView {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  getWathListButton = () => document.querySelector('#watchlist');

  setWatchListButtonClick = (callback) => {
    this._callback.controlButtonClick = callback;
    document.querySelector('#watchlist').addEventListener('click', this.#watchListButtonHandler);
  };

  #watchListButtonHandler = (evt) => {
    evt.preventDefault();
    this._callback.controlButtonClick();
    evt.target.classList.toggle('film-details__control-button--active');
  };

}
