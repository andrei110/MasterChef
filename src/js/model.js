import { getJSON } from '../js/helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=8cc85375e59d42b687c87e8f0de98833`
    );

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
