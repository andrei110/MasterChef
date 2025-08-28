import * as model from './model.js';
import recipeView from './views/recipeView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
