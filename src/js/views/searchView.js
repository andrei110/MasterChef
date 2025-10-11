import View from './View.js';
import icons from '../../img/icons.svg';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _inputSearch = document.querySelector('.search__field');
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
    return query;
  }

  _clearInput() {
    this._inputSearch.value = '';
  }
}

export default new SearchView();
