export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      'https://api.spoonacular.com/recipes/658615/information?apiKey=8cc85375e59d42b687c87e8f0de98833'
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`Error: ${data.message} (${data.status})`);
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
