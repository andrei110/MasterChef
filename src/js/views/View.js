export default class View {
  _data;

  render(data) {
    this._data = data;
    console.log(this._data);
    const markup = this.generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(err) {
    this._clear();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
