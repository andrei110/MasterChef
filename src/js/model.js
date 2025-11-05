import { getJSON } from '../js/helpers.js';
import {
  API_URL_QUERY,
  API_URL_NUTRITION,
  KEY,
  RESULTS_PER_PAGE,
} from '../js/config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // Wait for data
    const data = await getJSON(`${API_URL_NUTRITION(id)}&${KEY}`);
    console.log(data);
    // Move data into the state object
    state.recipe = {
      id: data.id,
      title: data.title,
      publisher: data.sourceName,
      sourceUrl: data.sourceUrl,
      image: data.image,
      servings: 1,
      cookingTime: data.readyInMinutes,
      instructions: data.analyzedInstructions,
      ingredients: data.nutrition.ingredients,
      nutrition: {
        protein: data.nutrition.nutrients.find(n => n.name === 'Protein')
          .amount,
        fats: data.nutrition.nutrients.find(n => n.name === 'Fat').amount,
        carbs: data.nutrition.nutrients.find(n => n.name === 'Carbohydrates')
          .amount,
        calories: data.nutrition.nutrients.find(n => n.name === 'Calories')
          .amount,
      },
    };
    // Set the bookmarked property according to bookmarks array
    state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${API_URL_QUERY}?query=${query}&${KEY}&titleMatch=${query}&number=100`
    );
    console.log(data);
    state.search.results = data.results.map(rec => {
      return {
        id: rec.id,
        image: rec.image,
        title: rec.title,
      };
    });
  } catch (err) {
    console.error(`❌❌${err}`);
    throw err;
  }
};

export const getResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //14
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Return if user wants to update servings below 1
  if (newServings < 1) return;
  // Update state with new servings
  state.recipe.servings = newServings;
  // Create initial values to save them before update
  if (!state.recipe.nutrition.initial) {
    // Initial values for nutrition
    console.log('Creare nutrition initial');
    state.recipe.nutrition.initial = {};
    Object.entries(state.recipe.nutrition).map(
      ([macro, num]) =>
        !macro.includes('initial') &&
        (state.recipe.nutrition.initial[macro] = num)
    );
    // Initial values for ingredients
    state.recipe.ingredients.map(el => (el.amountInitial = el.amount));
  }
  // Update macros
  Object.entries(state.recipe.nutrition).map(
    ([macro, num]) =>
      !macro.includes('initial') &&
      (state.recipe.nutrition[macro] = +(
        state.recipe.nutrition.initial[macro] * newServings
      ).toFixed(2))
  );
  // Update ingredients
  state.recipe.ingredients.map(
    el => (el.amount = +(el.amountInitial * newServings).toFixed(2))
  );
};

export const addBookmark = function () {
  // Mark the recipe as bookmarked
  state.recipe.bookmarked = true;
  // Copy the recipe to bookmarks array
  state.bookmarks.push(state.recipe);
};
