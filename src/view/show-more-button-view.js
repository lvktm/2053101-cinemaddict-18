import {createElement} from '../render.js';

const createShowMoreButton = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView {
  #showMoreButtonElement;

  get template() {
    return createShowMoreButton();
  }

  get element() {
    if (!this.#showMoreButtonElement) {
      this.#showMoreButtonElement = createElement(this.template);
    }

    return this.#showMoreButtonElement;
  }

  removeElement() {
    this.#showMoreButtonElement = null;
  }
}
