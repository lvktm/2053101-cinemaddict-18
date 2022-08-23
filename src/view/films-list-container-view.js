import {createElement} from '../render.js';

const createFilmsListContainer = () => '<div class="films-list__container"></section>';

export default class FilmsListContainerView {
  #filmsListContainerElement;

  get template() {
    return createFilmsListContainer();
  }

  get element() {
    if (!this.#filmsListContainerElement) {
      this.#filmsListContainerElement = createElement(this.template);
    }

    return this.#filmsListContainerElement;
  }

  removeElement() {
    this.#filmsListContainerElement = null;
  }
}
