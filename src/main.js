import UserRankView from './view/user-rank-view.js';
import { render } from './framework/render.js';
import CinemaddictPresenter from './presenter/cinemaddict-presenter.js';
import FooterStatisticView from './view/footer-statistic-view.js';
import MovieModel from './model/movie-model.js';
import CommenstModel from './model/comment-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

const movieModel = new MovieModel();
const commentsModel = new CommenstModel(movieModel);
const cinemaddictPresenter = new CinemaddictPresenter(siteMainElement, movieModel, commentsModel);

render(new UserRankView(), siteHeaderElement);
render(new FooterStatisticView(), siteFooterElement);

cinemaddictPresenter.init();
