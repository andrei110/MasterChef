import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Load recipe data
    await model.loadRecipe(id);

    // Render recipe data
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// Search Results
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    await model.loadSearchResults(query);
    console.log(model.state.search);
    resultsView.render(model.getResultsPerPage());
  } catch (err) {
    console.error(`❌🥲${err}`);
  }
};

// App init
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
