import { useState } from "react";

import CuisinesSelection from "./components/Cuisines";
import IngredientsSelection from "./components/Ingredients";
import RecipesList from "./components/Recipes";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";

import { apiKey, minResults, fetchData } from "./utils/utils.js";

const App = () => {
  //  TS const [personName, setPersonName] = React.useState<string[]>([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const apiCuisinesString = cuisineOptions.join(",");
  const [ingredientsList, setIngredientsList] = useState("");
  const apiIngredientsString = ingredientsList.replace(/,/g, ",+");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchRecipesUrl = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${apiCuisinesString}&includeIngredients=${apiIngredientsString}&number=${minResults}&apiKey=${apiKey}`;
    const data = await fetchData(searchRecipesUrl);
    const recipePromises = (data.results || data).map((recipe) => {
      const recipeUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      fetchData(recipeUrl);
    });
    const recipeData = await Promise.all(recipePromises);
    const recipesWithAdditionalData = (data.results || data).map(
      (recipe, i) => {
        return {
          ...recipe,
          cuisine: recipeData[i].cuisines,
          sourceUrl: recipeData[i].sourceUrl,
          spoonacularSourceUrl: recipeData[i].spoonacularSourceUrl,
          extendedIngredients: recipeData[i].extendedIngredients.map(
            (ingredient) => ingredient.original
          ),
        };
      }
    );

    setRecipes(recipesWithAdditionalData);
  };

  const handleClear = (e, type) => {
    e.preventDefault();
    if (type === "ingredients") setIngredientsList("");
    if (type === "cuisines") setCuisineOptions([]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <CuisinesSelection
          name="cuisine-selection"
          cuisineOptions={cuisineOptions}
          setCuisineOptions={setCuisineOptions}
          onClear={handleClear}
        />
        <IngredientsSelection
          name="ingredient-selection"
          ingredients={ingredientsList}
          setIngredients={setIngredientsList}
          onClear={handleClear}
        />
        <Button
          name="submit"
          type="submit"
          sx={{ m: 2 }}
          size="large"
          variant={cuisineOptions.length ? "contained" : "outlined"}
          disabled={!cuisineOptions.length && !ingredientsList.length}
          endIcon={<SendIcon />}
        >
          Fetch
        </Button>
        {/* --- FOR TESTING ---
        <p>{apiCuisinesString}</p>
        <p>{apiIngredientsString}</p> */}
      </form>
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default App;
