import {createElement} from '../render.js';

const createFooterStatistic = () => '<p>130 291 movies inside</p>';

export default class FooterStatisticView {
  #footerStatisticElement;

  get template() {
    return createFooterStatistic();
  }

  get element() {
    if (!this.#footerStatisticElement) {
      this.#footerStatisticElement = createElement(this.template);
    }

    return this.#footerStatisticElement;
  }

  removeElement() {
    this.#footerStatisticElement = null;
  }
}
