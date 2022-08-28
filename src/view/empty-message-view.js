import AbstractView from '../framework/view/abstract-view.js';

const createEmptyMessage = () => `<h2 class="films-list__title">There are no movies in our database</h2>

<!--
  Значение отображаемого текста зависит от выбранного фильтра:
    * All movies – 'There are no movies in our database'
    * Watchlist — 'There are no movies to watch now';
    * History — 'There are no watched movies now';
    * Favorites — 'There are no favorite movies now'.
-->
</section>`;

export default class EmptyMessageView extends AbstractView {

  get template() {
    return createEmptyMessage();
  }

}
