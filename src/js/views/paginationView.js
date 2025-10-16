import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.search-results');
  _errorMessage = '';
  _message = '';

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn-pagination');
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  //   generateMarkup() {
  //     // console.log(this._data);
  //   }
}

export default new PaginationView();
