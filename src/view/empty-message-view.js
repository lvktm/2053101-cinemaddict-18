import {createElement} from '../render.js';

const createEmptyMessage = () => `<h2 class="films-list__title">There are no movies in our database</h2>

<!--
  Значение отображаемого текста зависит от выбранного фильтра:
    * All movies – 'There are no movies in our database'
    * Watchlist — 'There are no movies to watch now';
    * History — 'There are no watched movies now';
    * Favorites — 'There are no favorite movies now'.
-->
</section>`;

export default class EmptyMessageView {
  #emptyMessageElement;

  get template() {
    return createEmptyMessage();
  }

  get element() {
    if (!this.#emptyMessageElement) {
      this.#emptyMessageElement = createElement(this.template);
    }

    return this.#emptyMessageElement;
  }

  removeElement() {
    this.#emptyMessageElement = null;
  }
}
