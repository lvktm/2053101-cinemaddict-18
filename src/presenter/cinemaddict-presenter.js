import FilmsTemplateView from '../view/films-template-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmCardDetailView from '../view/film-card-detail-view';
import { render } from '../render.js';


const onClosePopupButtonClick = (filmCardDetailComponent) => () => {
  filmCardDetailComponent.getElement().remove();
};

const onFilmCardClick = (cinemaddictContainer, movie) => (evt) => {
  const currentElement = evt.target;
  if(currentElement.closest('.film-card')) {
    const filmCardDetailComponent = new FilmCardDetailView(movie);
    render(filmCardDetailComponent, cinemaddictContainer);
    const closePopupButton = filmCardDetailComponent.getElement().querySelector('.film-details__close-btn');
    closePopupButton.addEventListener('click', onClosePopupButtonClick(filmCardDetailComponent));
  }
};

export default class CinemaddictPresenter {
  filmsComponent = new FilmsTemplateView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (cinemaddictContainer, movieModel) => {
    this.cinemaddictContainer = cinemaddictContainer;
    this.movieModel = movieModel;
    this.movies = [...this.movieModel.getMovies()];

    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.filmsComponent, this.cinemaddictContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for(let i = 0; i < this.movies.length; i++) {
      render(new FilmCardView(this.movies[i]), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.cinemaddictContainer);

    this.filmsComponent.getElement().addEventListener('click', onFilmCardClick(this.cinemaddictContainer, this.movies[0]));

  };
}
