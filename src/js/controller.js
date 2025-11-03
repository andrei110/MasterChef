import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import sideBarView from './views/sideBarView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    sideBarView.closeSideBar();
    // Load recipe data
    await model.loadRecipe(id);

    // Render recipe data
    recipeView.render(model.state.recipe);
    recipeView.setOverlayHeight();
  } catch (err) {
    console.error(err);
  }
};

// Search Results
const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    // Unhide sideBar button (only below 800 px)
    sideBarView.openSideBar();
    // Load recipes
    await model.loadSearchResults(query);
    console.log(model.state.search);
    //Render recipes loaded
    resultsView.render(model.getResultsPerPage(1));
    // Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`❌🥲${err}`);
  }
};

const controlPagination = function (page) {
  console.log(page);
  // Render recipes
  resultsView.render(model.getResultsPerPage(page));
  // Render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  console.log(newServing);
  model.updateServings(newServing);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// App init
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  sideBarView.addHandlerSideBar();
  sideBarView.addHandlerOverlay();
};

init();
