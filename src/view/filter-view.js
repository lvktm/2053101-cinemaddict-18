import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filterItem) => {
  const {name, count} = filterItem;

  return (`
    <a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>
  `);
};

const createNewFilterTemplate = (filtersItems) => {
  const filterItemsTemplate = filtersItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>

    ${ filterItemsTemplate }

  </nav>`);
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createNewFilterTemplate(this.#filters);
  }

}
