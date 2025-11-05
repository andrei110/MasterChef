import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import sideBarView from './views/sideBarView.js';
import bookmarksView from './views/bookmarksView.js';

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
    // Update overlay height
    recipeView.setOverlayHeight();
    // Update search results according to the current recipe
    resultsView.update(model.getResultsPerPage());
    // Update the bookmarks window according to the current recipe
    bookmarksView.update(model.state.bookmarks);
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

// Control pagination
const controlPagination = function (page) {
  console.log(page);
  // Render recipes
  resultsView.render(model.getResultsPerPage(page));
  // Render pagination
  paginationView.render(model.state.search);
};

// Control servings
const controlServings = function (newServing) {
  console.log(newServing);
  model.updateServings(newServing);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Add Bookmarks
const controlBookmarks = function () {
  // Add/Remove bookmark
  model.state.recipe.bookmarked
    ? model.deleteBookmark(model.state.recipe.id)
    : model.addBookmark();
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmarks into bookmark menu
  bookmarksView.render(model.state.bookmarks);
  // Render message if there are no bookmarks
  model.state.bookmarks.length === 0 && bookmarksView.renderMessage();
};

// App init
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  sideBarView.addHandlerSideBar();
  sideBarView.addHandlerOverlay();
  recipeView.addHandlerBookmark(controlBookmarks);
};

init();
