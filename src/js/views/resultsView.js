import View from './View.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.search-results__list');
  _sideBarBtn = document.querySelector('.search-results__btn');
  _errorMessage = '';
  _message = '';

  changeTitle(bookmarks) {
    const html = `<span>${
      bookmarks.length > 0 ? 'Bookmarks' : 'No Bookmarks yet'
    }</span>`;
    // Clear previous title
    this.clearSearchTitle();
    // Adding formatted title to page
    this.searchTitle.insertAdjacentHTML('afterbegin', html);
  }

  generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(rec) {
    const id = +window.location.hash.slice(1);

    return `
        <li class="preview">
            <a href="#${rec.id}" class="preview__link ${
      id === rec.id ? 'preview__link--active' : ''
    }">
              <figure class="preview__fig">
                <img src=${rec.image} alt="Recipe name" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">
                  ${rec.title}
                </h4>
              </div>
            </a>
        </li>
    `;
  }
}

export default new ResultsView();
