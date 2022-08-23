import {createElement} from '../render.js';

const createFilmsList = () => '<section class="films-list"></section>';

export default class FilmsListView {
  #filmsListElement;

  get template() {
    return createFilmsList();
  }

  get element() {
    if (!this.#filmsListElement) {
      this.#filmsListElement = createElement(this.template);
    }

    return this.#filmsListElement;
  }

  removeElement() {
    this.#filmsListElement = null;
  }
}
