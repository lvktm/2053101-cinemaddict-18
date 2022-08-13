import {createElement} from '../render.js';

const createFilmsListContainer = () => '<div class="films-list__container"></section>';

export default class FilmsListContainerView {
  getTemplate() {
    return createFilmsListContainer();
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
