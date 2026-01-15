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

  update(data) {
    this._data = data;
    // Generate the string Markup
    const newMarkup = this.generateMarkup();
    // Convert the HTML string to an Object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Select all the elements from the newDOM and currentDOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements); // newDOM Elements
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(currElements); // Current Elements

    // Comparison between currElements and newElements
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // console.log(newEl, currEl, newEl.isEqualNode(currEl));
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  setOverlayHeight() {
    document.querySelector('.overlay').style.height = `${
      document.querySelector('.container').getBoundingClientRect().height
    }px`;
  }

  renderMessage(message = this._message, svg) {
    // Create new message
    const html = `
        <div class="message message__bookmarks">
          <p class="message__text message__bookmarks--text">
            ${message}
            ${
              svg
                ? `
              <svg class="message__icon">
                <use href="src/img/icons.svg#icon-${svg}"></use>
              </svg>
              `
                : ''
            }
          </p>
        </div>
    `;
    // Clear previous content from container
    this._clearParentEl();
    // Add new message into container
    this._parentElement.insertAdjacentHTML('afterbegin', html);
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
