import View from './View.js';
import icons from '../../img/icons.svg';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = '';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    // console.log(this._data);
    return `
      <div class="recipe__header">
          <div class="recipe__calories">
            <div class="calories calories__container">
              <h1 class="calories__title">Calories</h1>
              <h1 class="calories__value">${Math.floor(
                this._data.nutrition.calories
              )} <span>kcal</span></h1>
            </div>
            <div class="calories__protein calories__container">
              <h3 class="calories__macro calories__protein__title">Protein</h3>
              <h3
                class="calories__macro calories__macro__value calories__protein__value"
              >
                ${this._data.nutrition.protein} <span>g</span>
              </h3>
            </div>
            <div class="calories__fat calories__container">
              <h3 class="calories__macro calories__fat__title">Fats</h3>
              <h3
                class="calories__macro calories__macro__value calories__fat__value"
              >
                ${this._data.nutrition.fats} <span>g</span>
              </h3>
            </div>
            <div class="calories__carbo calories__container">
              <h3 class="calories__macro calories__carbo__title">
                Carbohydrates
              </h3>
              <h3
                class="calories__macro calories__macro__value calories__carbo__value"
              >
                ${this._data.nutrition.carbs} <span>g</span>
              </h3>
            </div>
          </div>

          <figure class="recipe__fig">
            <img
              src="${this._data.image}"
              alt="Recipe Photo"
              class="recipe__img"
            />
            <h1 class="title__main recipe__title">
              <span
                >${this._data.title}</span
              >
            </h1>
          </figure>
        </div>

        
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">Minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-people_alt"></use>
            </svg>
            <span class="recipe__info-data recipe__info-minutes">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">Servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn__servings btn__servings--plus">
                <svg>
                  <use href="${icons}#icon-add_circle_outline"></use>
                </svg>
              </button>
              <button class="btn--tiny btn__servings">
                <svg>
                  <use href="${icons}#icon-minus-outline"></use>
                </svg>
              </button>
            </div>
          </div>
          <button class="btn--round">
            <svg>
              <use href="${icons}#icon-bookmark-outline"></use>
            </svg>
          </button>
        </div>

        
        <div class="recipe__ingredients">
          <h2 class="title--secondary">Recipe Ingredients</h2>
          <ul class="recipe__ingredients-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join('')}
          </ul>
        </div>
        <div class="recipe__directions">
          <div class="recipe__directions-container">
            <h2 class="title--secondary">How to cook it</h2>
            <p class="recipe__directions-text">
              ${this._data.instructions}
            </p>
            
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span>${
                this._data.publisher
              }</span>. Please check out directions at their
              website.
            </p>
            <a href="${this._data.sourceUrl}" class="btn__recipe">
              <span class="btn__recipe-text">Directions</span>
              <svg class="btn__recipe-icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="recipe__ingredients-item">
              <svg class="recipe__ingredients-icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__ingredients-quantity">${ing.amount}</div>
              <div class="recipe__ingredients-description">
                <span class="recipe__ingredients-unit">${ing.unit}</span>
                ${ing.name}
              </div>
            </li>
    `;
  }
}

export default new RecipeView();
