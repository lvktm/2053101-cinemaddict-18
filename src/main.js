import UserRankView from './view/user-rank-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');

render(new UserRankView(), siteHeaderElement);
