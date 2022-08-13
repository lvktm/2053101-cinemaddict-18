import FilmsTemplateView from '../view/films-template-view';
import FilmsListView from '../view/films-list-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmCardView from '../view/film-card-view';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import { render } from '../render';
import {FILM_CARD_VIEW_AMOUNT} from '../data.js';

export default class CinemaddictPresenter {
  filmsComponent = new FilmsTemplateView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (cinemaddictContainer) => {
    this.cinemaddictContainer = cinemaddictContainer;

    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.filmsComponent, this.cinemaddictContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for(let i = 0; i <= FILM_CARD_VIEW_AMOUNT; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.cinemaddictContainer);

  };
}
