import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTemplate = () => '<section class="films"></section>';

export default class FilmsTemplateView extends AbstractView {

  get template() {
    return createFilmsTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
