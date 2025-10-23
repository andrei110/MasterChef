export default class View {
  _data;
  searchTitle = document.querySelector('.search-results__title');
  // Breakpoints
  bp800 = window.matchMedia('(max-width: 800px)');

  render(data) {
    this._data = data;
    console.log(this._data);
    const markup = this.generateMarkup();
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(err) {
    this._clearParentEl();
  }

  _clearParentEl() {
    this._parentElement.innerHTML = '';
  }

  clearSearchTitle() {
    this.searchTitle.innerHTML = '';
  }
}
