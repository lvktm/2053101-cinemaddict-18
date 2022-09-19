import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../mock/const.js';

const createSort = (sortType) => {
  const activateSortButton = (sortButton) => sortButton
    ? ' sort__button--active'
    : '';

  const isDefaultButtonActive = activateSortButton(sortType === 'default');
  const isDateButtonActive = activateSortButton(sortType === 'date');
  const isRatingButtonActive = activateSortButton(sortType === 'rating');

  return (` <ul class="sort">
        <li><a href="#" class="sort__button ${isDefaultButtonActive}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button ${isDateButtonActive}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
        <li><a href="#" class="sort__button ${isRatingButtonActive}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`);};

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSort(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
