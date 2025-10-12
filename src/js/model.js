import { getJSON } from '../js/helpers.js';
import { API_URL, API_URL_NUTRITION, KEY } from '../js/config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL_NUTRITION(id)}&${KEY}`);

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

//658615
