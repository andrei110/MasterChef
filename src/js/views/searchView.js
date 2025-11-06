import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.header');
  _searchElement = document.querySelector('.search');
  _inputSearch = document.querySelector('.search__field');
  _errorMessage = '';
  _message = '';

  addHandlerSearch(handler) {
    this._searchElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerBookmarks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // e.preventDefault();
      const btn = e.target.closest('.nav__btn');
      if (!btn) return;
      handler();
    });
  }

  getQuery() {
    // Get query from search bar
    const query = this._inputSearch.value;
    // Clear search bar input
    this._clearInput();
    // Text formatting
    const html = `<span>${
      query[0].toUpperCase() + query.slice(1)
    } Recipes</span>`;
    // Clear previous title
    this.clearSearchTitle();
    // Adding formatted title to page
    this.searchTitle.insertAdjacentHTML('afterbegin', html);
    return query;
  }

  _clearInput() {
    this._inputSearch.value = '';
  }
}

export default new SearchView();
