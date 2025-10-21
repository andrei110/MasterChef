import View from './View.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.search-results__list');
  _errorMessage = '';
  _message = '';

  addHandlerSideBar() {
    document
      .querySelector('.search-results__btn')
      .addEventListener('click', function (e) {
        e.preventDefault();
        document
          .querySelector('.search-results')
          .classList.toggle('search-results__sideBar-toggle');
      });
  }

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

export default new ResultsView();
