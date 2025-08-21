import * as model from './model.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    await model.loadRecipe(id);
  } catch (err) {
    console.error(err);
  }
};
controlRecipe();
