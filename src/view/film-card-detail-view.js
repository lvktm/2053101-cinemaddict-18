import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeReleaseDateDetail, formatMinutesToTime } from '../util.js';

const createFilmDetailsNewComment = () => (`
<form class="film-details__new-comment" action="" method="get">
    <div class="film-details__add-emoji-label"><img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile"></div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
</form>
`);

const createFilmCardDetail = (movie) => {
  const {comments,
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      poster,
      ageRating,
      director,
      writers,
      actors,
      release: {
        date,
        releaseCountry
      },
      runtime,
      genre,
      description},
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = movie;

  const releaseDateDetail = humanizeReleaseDateDetail(date);
  const filmRuntime = formatMinutesToTime(runtime);

  const getGenreOrGenres = () => genre.length > 1
    ? 'Genres'
    : 'Genre';

  const genreOrGenres = getGenreOrGenres();

  const createGenres = () => {
    let genreElement = '';

    for(let i = 0; i < genre.length; i++) {
      genreElement += `<span class="film-details__genre">${ genre[i] }</span>`;
    }

    return genreElement;
  };

  const genreElements = createGenres();

  const activateControlButton = (controlButton) => controlButton
    ? ' film-details__control-button--active'
    : '';

  const toWatchListButton = activateControlButton(watchlist);
  const alreadyWatchedButton = activateControlButton(alreadyWatched);
  const favoriteButton = activateControlButton(favorite);

  return (`<section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${ poster }" alt="">
  
            <p class="film-details__age">${ ageRating }</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${ title }</h3>
                <p class="film-details__title-original">${ alternativeTitle }</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${ totalRating }</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${ director }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${ writers }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${ actors }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${ releaseDateDetail }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${ filmRuntime }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${ releaseCountry }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${ genreOrGenres }</td>
                <td class="film-details__cell">
                ${ genreElements }
                </td>
                </td>
              </tr>
            </table>
  
            <p class="film-details__film-description">
              ${ description }
            </p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${ toWatchListButton }" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${ alreadyWatchedButton }" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${ favoriteButton }" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>
  
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ comments.length }</span></h3>
  
          <ul class="film-details__comments-list"></ul>

          ${ createFilmDetailsNewComment() }

        </section>
      </div>
    </div>
  </section>`);
};

export default class FilmCardDetailView extends AbstractStatefulView {

  constructor(movie) {
    super();
    this._state = FilmCardDetailView.parseMovieToState(movie);

    this.#setInnerHandlers();

  }

  get template() {
    return createFilmCardDetail(this._state);
  }

  getCommentsList = () => this.element.querySelector('.film-details__comments-list');

  isFilmCardControlButton = (evt) => evt.target.classList.contains('film-card__controls-item');

  setCloseButtonHandler = (callback) => {
    this._callback.closeButtonClik = callback;
    this
      .element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeButtonHandler);
  };

  #closeButtonHandler = () => {
    this._callback.closeButtonClik();
  };

  setToWatchListButtonClickHandler = (callback) => {
    this._callback.toWatchedListButtonClick = callback;
    this
      .element
      .querySelector('#watchlist')
      .addEventListener('click', this.#watchListButtonClickHandler);
  };

  #watchListButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.toWatchedListButtonClick(evt, this._state);
  };

  setWatchedButtonClickHandler = (callback) => {
    this._callback.watchedButtonClick = callback;
    this
      .element
      .querySelector('#watched')
      .addEventListener('click', this.#watchedButtonClickHandler);
  };

  #watchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedButtonClick(evt, this._state);
  };

  setFavoriteButtonClickHandler = (callback) => {
    this._callback.favoriteButtonClick = callback;
    this
      .element
      .querySelector('#favorite')
      .addEventListener('click', this.#favoriteButtonClickHandler);
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteButtonClick(evt, this._state);
  };

  changeBodyClass = () => document.body.classList.toggle('hide-overflow');

  static parseMovieToState = (movie) => ({...movie
  });

  static parseStateToMovie = (state) => ({...state});


  #emojiListClickHandler = (evt) => {
    evt.preventDefault();

    if(!evt.target.src) {
      return;
    }

    const choosenEmoji = evt.target.parentElement.getAttribute('for');
    const emojiList = document.querySelector('.film-details__emoji-list');
    const radios = emojiList.querySelectorAll('input[type="radio"]');

    for(const radio of radios) {
      if(radio.id === choosenEmoji){
        radio.checked = true;
        this.updateElement({
          radioButton: radio.value,
        });
        console.log(this._state);
      }
    }

  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonHandler(this._callback.closeButtonClik);
    this.setToWatchListButtonClickHandler( this._callback.toWatchedListButtonClick);
    this.setWatchedButtonClickHandler(this._callback.watchedButtonClick);
    this.setFavoriteButtonClickHandler(this._callback.favoriteButtonClick);
  };

  #setInnerHandlers = () => {
    this
      .element
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiListClickHandler);
  };

}
