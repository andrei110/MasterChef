export default class View {
  _data;
  searchTitle = document.querySelector('.search-results__title');
  overlay = document.querySelector('.overlay');
  // Breakpoints
  bp800 = window.matchMedia('(max-width: 800px)');

  render(data) {
    this._data = data;
    console.log(this._data);
    const markup = this.generateMarkup();
    this._clearParentEl();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  setOverlayHeight() {
    document.querySelector('.overlay').style.height = `${
      document.querySelector('.container').getBoundingClientRect().height
    }px`;
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
