import View from './View.js';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '';
  _message = 'No bookmarks yet. Find a nice recipe and book it 😄';

  generateLoadBookmarksBtn() {
    const html = `
        <div class="btn__bookmarks-more-container">
          <button class="btn btn__bookmarks-more">
            <span>Load all Bookmarks</span>
            <svg>
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
    `;
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  generateMarkup() {
    console.log(this._data.length);
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

export default new BookmarksView();
