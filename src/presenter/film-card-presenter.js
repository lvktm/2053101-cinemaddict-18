import FilmCardDetailPresenter from './film-card-detail-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../framework/render.js';

export default class FilmCardPresenter {
  #container;
  #movies;
  #comments;

  constructor(movies, container, comments) {
    this.#movies = movies;
    this.#container = container;
    this.#comments = comments;
  }

  init(movie) {

    const filmCardComponent = new FilmCardView(movie);
    const filmListContainerComponent = this.#container;

    // Обработчик отрисовывает попап с комментариями
    const filmCardClickHandler = (evt) => {
      const currentElement = evt.target;
      if(currentElement.tagName === 'IMG') {
        this.#movies.forEach((film) => {

          if(film.id.toString() === currentElement.parentNode.parentNode.dataset.id) {
            const filmCardDetailPresenter = new FilmCardDetailPresenter(movie, this.#container, this.#comments);
            filmCardDetailPresenter.renderFilmCardDetail();
          }

        });
      }
    };

    filmCardComponent.setFilmCardClickHandler(filmCardClickHandler);

    render(filmCardComponent, filmListContainerComponent);

  }

}
