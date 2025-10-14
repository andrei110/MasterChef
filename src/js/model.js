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
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL_NUTRITION(id)}&${KEY}`);
    console.log(data);
    state.recipe = {
      id: data.id,
      title: data.title,
      publisher: data.sourceName,
      sourceUrl: data.sourceUrl,
      image: data.image,
      servings: data.servings,
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
  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //14
  return state.search.results.slice(start, end);
};

//658615
