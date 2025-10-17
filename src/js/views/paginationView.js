import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = '';
  _message = '';

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      const btn = e.target.closest('.btn-pagination');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupBtnPrev(curPage) {
    return `
        <button class="btn btn-pagination btn-pagination__prev" data-goTo=${
          curPage - 1
        }>
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
        </button>
    `;
  }

  _generateMarkupBtnNext(curPage) {
    return `
        <button class="btn btn-pagination btn-pagination__next" data-goTo=${
          curPage + 1
        }>
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generateMarkupBtnNumber(number) {
    return `
        <button class="btn btn-pagination btn-pagination__numb" data-goTo="${number}">
            <span>${number}</span>
        </button>
    `;
  }

  _generateMarkupBtnDots() {
    return `
        <button class="btn btn-pagination btn-pagination__dots" disabled>
            <span>...</span>
        </button>
    `;
  }

  generateMarkup() {
    // console.log(this._data);
    const curPage = this._data.page;
    const totalResults = this._data.results.length;
    const resultsPerPage = this._data.resultsPerPage;
    const pagesNum = Math.ceil(totalResults / resultsPerPage);
    // console.log(curPage, totalResults, resultsPerPage, pagesNum);
    let html = '';

    // Only 1 page of results
    if (pagesNum === 1) return '';
    // Current page > 1, generate left arrow btn
    if (curPage > 1) html += this._generateMarkupBtnPrev(curPage);
    // Current page = 3, generate button 1
    if (curPage === 3) html += this._generateMarkupBtnNumber(1);
    // Current page > 3, generate button 1 and dots button
    if (curPage > 3)
      html += this._generateMarkupBtnNumber(1) + this._generateMarkupBtnDots();
    // Display the previous, current and next buttons
    for (
      let pageLength = curPage - 1;
      pageLength <= curPage + 1;
      pageLength++
    ) {
      // Jump over the button 0
      if (pageLength === 0) continue;
      // Jump over the next button after the button of total pages
      if (pageLength > pagesNum) continue;
      html += `
        <button class="btn btn-pagination btn-pagination__numb ${
          curPage === pageLength ? 'btn-pagination__active' : ''
        }" data-goTo=${pageLength}>
            <span>${pageLength}</span>
        </button>
    `;
    }
    // Current page < total pages -2, generate dots button and total pages button
    if (curPage < pagesNum - 2)
      html +=
        this._generateMarkupBtnDots() + this._generateMarkupBtnNumber(pagesNum);
    // Current page = total pages -2, generate total pages button
    if (curPage === pagesNum - 2)
      html += this._generateMarkupBtnNumber(pagesNum);
    // Current page < total number of pages, generate right arrow btn
    if (curPage < pagesNum) html += this._generateMarkupBtnNext(curPage);
    // Return entire html string
    return html;
  }
}

export default new PaginationView();
