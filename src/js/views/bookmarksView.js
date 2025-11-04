import View from './View.js';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '';
  _message = '';

  generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(rec) {
    return `
        <li class="preview">
            <a href="#${rec.id}" class="preview__link">
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
