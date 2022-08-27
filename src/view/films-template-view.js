import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTemplate = () => '<section class="films"></section>';

export default class FilmsTemplateView extends AbstractView {

  get template() {
    return createFilmsTemplate();
  }

}
