import {createElement} from '../render.js';

const createFilmsTemplate = () => '<section class="films"></section>';

export default class FilmsTemplateView {
  #filmsTemplateElement;

  get template() {
    return createFilmsTemplate();
  }

  get element() {
    if (!this.#filmsTemplateElement) {
      this.#filmsTemplateElement = createElement(this.template);
    }

    return this.#filmsTemplateElement;
  }

  removeElement() {
    this.#filmsTemplateElement = null;
  }
}
