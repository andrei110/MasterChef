import View from './View.js';
import icons from '../../img/icons.svg';

class SideBarView extends View {
  _parentElement = document.querySelector('.search-results');
  _sideBarBtn = document.querySelector('.search-results__btn');
  _errorMessage = '';
  _message = '';

  addHandlerSideBar() {
    this._sideBarBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector('.search-results')
        .classList.toggle('search-results__sideBar-toggle');

      document
        .querySelector('.search-results')
        .classList.contains('search-results__sideBar-toggle')
        ? document.querySelector('.overlay').classList.add('hidden')
        : document.querySelector('.overlay').classList.remove('hidden');

      setTimeout(() => SideBarView.prototype.setOverlayHeight(), 500);
    });
  }

  addHandlerOverlay() {
    document.querySelector('.overlay').addEventListener('click', function () {
      SideBarView.prototype.closeSideBar();
    });
  }

  unhideSideBarBtn() {
    if (!this.bp800.matches) return;
    this._sideBarBtn.classList.remove('hidden');
  }

  closeSideBar() {
    document
      .querySelector('.search-results')
      .classList.add('search-results__sideBar-toggle');
    document.querySelector('.overlay').classList.add('hidden');
  }
}

export default new SideBarView();
