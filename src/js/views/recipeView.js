import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = '';
  _message = '';

  _generateMarkup() {
    return `
        `;
  }
}

export default new RecipeView();
