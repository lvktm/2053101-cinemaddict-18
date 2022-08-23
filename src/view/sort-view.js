import {createElement} from '../render.js';

const createSort = () => (
  ` <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`);

export default class SortView {
  #sortElement;

  get template() {
    return createSort();
  }

  get element() {
    if (!this.#sortElement) {
      this.#sortElement = createElement(this.template);
    }

    return this.#sortElement;
  }

  removeElement() {
    this.#sortElement = null;
  }
}
