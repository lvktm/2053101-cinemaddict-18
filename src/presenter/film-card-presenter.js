import FilmCardDetailPresenter from './film-card-detail-presenter.js';
import FilmCardView from '../view/film-card-view.js';
import { render } from '../framework/render.js';

export default class FilmCardPresenter {
  #movies = null;
  #comments = null;
  #movie = null;
  #filmCardComponent = null;
  #filmListContainerComponent = null;

  constructor(movies, container, comments) {
    this.#movies = movies;
    this.#filmListContainerComponent = container;
    this.#comments = comments;
  }

  init = (movie) => {
    this.#movie = movie;
    this.#filmCardComponent = new FilmCardView(this.#movie);

    // Обработчик отрисовывает попап с комментариями
    const filmCardClickHandler = (evt) => {
      const currentElement = evt.target;
      if(currentElement.tagName === 'IMG') {
        this.#movies.forEach((film) => {

          if(film.id.toString() === currentElement.parentNode.parentNode.dataset.id) {
            const filmCardDetailPresenter = new FilmCardDetailPresenter(this.#movie, this.#filmListContainerComponent, this.#comments);
            filmCardDetailPresenter.renderFilmCardDetail();
          }

        });
      }
    };

    this.#filmCardComponent.setFilmCardClickHandler(filmCardClickHandler);

    render(this.#filmCardComponent, this.#filmListContainerComponent);

  };

}
