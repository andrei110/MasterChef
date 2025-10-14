import View from './View.js';
import icons from '../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _inputSearch = document.querySelector('.search__field');
  _searchTitle = document.querySelector('.search-results__title span');
  _errorMessage = '';
  _message = '';

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    const query = this._inputSearch.value;
    this._clearInput();
    this._searchTitle.textContent = `${
      query[0].toUpperCase() + query.slice(1)
    } Recipes`;
    return query;
  }

  _clearInput() {
    this._inputSearch.value = '';
  }
}

export default new SearchView();
