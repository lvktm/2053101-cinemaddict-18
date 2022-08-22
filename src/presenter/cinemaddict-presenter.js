import CommentsView from '../view/comments-view';
import FilmCardDetailView from '../view/film-card-detail-view';
import FilmCardView from '../view/film-card-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListView from '../view/films-list-view';
import FilmsTemplateView from '../view/films-template-view';
import FilterView from '../view/filter-view.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import { render } from '../render.js';


const onClosePopupButtonClick = (filmCardDetailComponent) => () => {
  filmCardDetailComponent.getElement().remove();
};

const onFilmCardClick = (cinemaddictContainer, movies, allComments) => (evt) => {
  const currentElement = evt.target;
  if(currentElement.classList.contains('film-card__poster')) {
    for(let i = 0; i < movies.length; i++) {

      if(movies[i].id.toString() === currentElement.closest('.film-card').dataset.id) {
        const filmCardDetailComponent = new FilmCardDetailView(movies[i]);
        render(filmCardDetailComponent, cinemaddictContainer);

        const commentsList = document.querySelector('.film-details__comments-list');

        for(let j = 0; j < movies[i].comments.length; j++) {
          const filmCommentsComponent = new CommentsView(movies[i].comments[j], allComments);
          render(filmCommentsComponent, commentsList);
        }

        const closePopupButton = filmCardDetailComponent.getElement().querySelector('.film-details__close-btn');
        closePopupButton.addEventListener('click', onClosePopupButtonClick(filmCardDetailComponent));
      }
    }
  }
};

export default class CinemaddictPresenter {
  filmsComponent = new FilmsTemplateView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init = (cinemaddictContainer, movieModel, commentsModel) => {
    this.cinemaddictContainer = cinemaddictContainer;
    this.movieModel = movieModel;
    this.movies = [...this.movieModel.getMovies()];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.getComments()];

    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.filmsComponent, this.cinemaddictContainer);
    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());

    for(let i = 0; i < this.movies.length; i++) {
      render(new FilmCardView(this.movies[i]), this.filmsListContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.cinemaddictContainer);

    this.filmsComponent
      .getElement()
      .addEventListener('click', onFilmCardClick(this.cinemaddictContainer, this.movies, this.comments));

  };
}
