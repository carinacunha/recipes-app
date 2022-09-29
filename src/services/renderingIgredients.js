const renderingIngredients = (recipe, setRenderIngredients) => {
  const keys = Object.keys(recipe);
  const ingredients = keys.filter((key) => key.includes('Ingredient'));
  const measures = keys.filter((key) => key.includes('Measure'));
  const ingredientsAndMeasures = [];
  ingredients.forEach((ingredient, i) => {
    if (recipe[ingredients[i]] !== '' && recipe[ingredients[i]] !== null) {
      if (recipe[measures[i]] !== '' && recipe[measures[i]] !== null) {
        ingredientsAndMeasures
          .push(`${recipe[ingredients[i]]} - ${recipe[measures[i]]}`);
      } else {
        ingredientsAndMeasures.push(recipe[ingredients[i]]);
      }
    }
  });
  setRenderIngredients(ingredientsAndMeasures);
};

export default renderingIngredients;
