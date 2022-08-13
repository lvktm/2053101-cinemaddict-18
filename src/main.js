import UserRankView from './view/user-rank-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new UserRankView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
