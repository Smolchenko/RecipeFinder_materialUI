import { useState, useEffect } from "react";
import MultipleSelectChip from "./components/Cuisines";
import IngredientsSelection from "./components/Ingredients";
import AlignItemsList from "./components/Recipes";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";

// const apiKey = "ea04abcb75324c4b94b41268d7e52997";
const apiKey = "06e5b0e43de742888c8362e0be77fb6c";
const minResults = 2;
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const [ingredientsString, setIngredientOptions] = useState("");
  const urlIngredientsString = ingredientsString.replace(/,/g, ",+");

  // const handleIngredients = (event) => {
  //   const cleanInput = event.target.value
  //     .replace(/[^a-zA-Z]+/g, " ")
  //     .replace(/[\s\n]+/g, "")
  //     .trim();
  //   // Only set the ingredientOptions state if the user pressed Enter or left the input
  //   if (event.key === "Enter" || event.type === "blur") {
  //     setIngredientOptions(cleanInput);
  //   } else setIngredientOptions(event.target.value);
  // };
  // const [ingredientOptions, setIngredientOptions] = useState([]);
  // const ingredientsString = ingredientOptions.join(",+");

  //  TS const [personName, setPersonName] = React.useState<string[]>([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const cuisinesString = cuisineOptions.join(",");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // const apiUrl1 = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisinesString}&number=${minResults}&apiKey=${apiKey}`;
    // const apiUrl2 = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=${minResults}&apiKey=${apiKey}`;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisinesString}&includeIngredients=${urlIngredientsString}&number=${minResults}&apiKey=${apiKey}`;

    // const [result1, result2] = await Promise.all([
    //   fetchData(apiUrl1),
    //   fetchData(apiUrl2),
    // ]);
    // const combinedResults = [...result1.results, ...result2];
    // console.log("combinedResults", combinedResults);
    // const uniqueResults = Object.values(
    //   combinedResults.reduce((acc, recipe) => {
    //     if (!acc[recipe.id]) {
    //       acc[recipe.id] = recipe;
    //     }
    //     return acc;
    //   }, {})
    // );
    // console.log("uniqueResults", uniqueResults);
    // In the updated code, we use the spread operator (...) to combine the results of the two API calls into a single array.
    // Then, we use the reduce() method to create an object where each key is a unique recipe id, and the value is the corresponding recipe object.
    // The reduce() method iterates through the combined results array, and for each recipe, it checks if the recipe id already exists in the acc object. If it does not exist, it adds the recipe to the acc object using the recipe id as the key.
    // Finally, we use Object.values() to get an array of the unique recipe objects. The Object.values() method returns an array of the object's values in the same order as a for...in loop over the object's properties.

    const data = await fetchData(apiUrl);
    console.log("data", data);

    // Make a second API call for each recipe to get the sourceUrl, spoonacularSourceUrl, summary...
    const recipePromises = (data.results || data).map((recipe) =>
      fetchData(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
      )
    );
    // const recipePromises = uniqueResults.map((recipe) =>
    //   fetchData(
    //     `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
    //   )
    // );
    console.log("recipePromises", recipePromises);

    const recipeData = await Promise.all(recipePromises);
    console.log("recipeData", recipeData);
    // Add the sourceUrl, spoonacularSourceUrl, summary... to each recipe object
    // const recipesWithSourceUrls = data.results.map((recipe, i) => ({
    //   ...recipe,
    //   sourceUrl: recipeData[i].sourceUrl,
    //   spoonacularSourceUrl: recipeData[i].spoonacularSourceUrl,
    //   summary: recipeData[i].summary,
    // }));
    const recipesWithSourceUrls = (data.results || data).map((recipe, i) => {
      // const recipesWithSourceUrls = uniqueResults.map((recipe, i) => {
      const extendedIngredients = recipeData[i].extendedIngredients.map(
        (ingredient) => ingredient.original // ingredient.name
      );
      return {
        ...recipe,
        cuisine: recipeData[i].cuisines,
        sourceUrl: recipeData[i].sourceUrl,
        spoonacularSourceUrl: recipeData[i].spoonacularSourceUrl,
        summary: recipeData[i].summary,
        extendedIngredients,
      };
    });

    setRecipes(recipesWithSourceUrls);
    console.log("RECIPES", recipesWithSourceUrls);
  };

  const handleClear = (e, type) => {
    e.preventDefault();
    console.log("clear ran");
    // if (type === "ingredients") setIngredientOptions([]);
    if (type === "ingredients") setIngredientOptions("");
    if (type === "cuisines") setCuisineOptions([]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <MultipleSelectChip
          cuisineOptions={cuisineOptions}
          setCuisineOptions={setCuisineOptions}
          name="cuisine-selection"
          onClear={handleClear}
        />
        <IngredientsSelection
          ingredientOptions={ingredientsString}
          // setIngredientOptions={handleIngredients}
          setIngredientOptions={setIngredientOptions}
          name="ingredient-selection"
          onClear={handleClear}
        />
        <Button
          sx={{ m: 2 }}
          name="submit"
          type="submit"
          size="large"
          variant={cuisineOptions.length ? "contained" : "outlined"}
          disabled={!cuisineOptions.length && !ingredientsString.length}
          endIcon={<SendIcon />}
        >
          Fetch
        </Button>
        <p>{cuisinesString}</p>
        <p>{urlIngredientsString}</p>
      </form>
      <AlignItemsList recipes={recipes} />
    </div>
  );
};

export default App;
