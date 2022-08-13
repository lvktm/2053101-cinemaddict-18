import {createElement} from '../render.js';

const createFilmsList = () => '<section class="films-list"></section>';

export default class FilmsListView {
  getTemplate() {
    return createFilmsList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
