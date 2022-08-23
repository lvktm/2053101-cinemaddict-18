import CommentsView from '../view/comments-view.js';
import FilmCardDetailView from '../view/film-card-detail-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsTemplateView from '../view/films-template-view.js';
import FilterView from '../view/filter-view.js';
import { isEsc } from '../util.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

// Обработчик на ESC
const onFilmCardDetailEscKeydown = (filmCardDetailComponent) => (evt) => {
  if(isEsc(evt)) {
    evt.preventDefault();
    closeFilmCardDetail(filmCardDetailComponent);
  }
};

// Обработчик на click по крестику попапа
const onFilmCardDetailCloseButtonClick = (filmCardDetailComponent) => () => {
  closeFilmCardDetail(filmCardDetailComponent);
};

// Функция закрытия попапа
function closeFilmCardDetail (filmCardDetailComponent) {
  document.removeEventListener('keydown', onFilmCardDetailEscKeydown);
  filmCardDetailComponent.element.remove();
  document.body.classList.remove('hide-overflow');
}

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

        const closePopupButton = filmCardDetailComponent.element.querySelector('.film-details__close-btn');
        document.body.classList.add('hide-overflow');
        closePopupButton.addEventListener('click', onFilmCardDetailCloseButtonClick(filmCardDetailComponent));
        document.addEventListener('keydown', onFilmCardDetailEscKeydown(filmCardDetailComponent));
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
    this.movies = [...this.movieModel.allMovies];
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.comments];

    render(new FilterView(), this.cinemaddictContainer);
    render(new SortView(), this.cinemaddictContainer);
    render(this.filmsComponent, this.cinemaddictContainer);
    render(this.filmsListComponent, this.filmsComponent.element);
    render(this.filmsListContainerComponent, this.filmsListComponent.element);

    for(let i = 0; i < this.movies.length; i++) {
      render(new FilmCardView(this.movies[i]), this.filmsListContainerComponent.element);
    }

    render(new ShowMoreButtonView(), this.cinemaddictContainer);

    this.filmsComponent
      .element
      .addEventListener('click', onFilmCardClick(this.cinemaddictContainer, this.movies, this.comments));

  };
}
