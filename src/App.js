import { useState, useEffect } from "react";
import MultipleSelectChip from "./components/Cuisines";
import IngredientsSelection from "./components/Ingredients";
import AlignItemsList from "./components/Recipes";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./styles.css";

const apiKey = "06e5b0e43de742888c8362e0be77fb6c";
// const apiKey = "ea04abcb75324c4b94b41268d7e52997";
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
  const [ingredientOptions, setIngredientOptions] = useState([
    "corn",
    // "potato",
  ]);
  // const ingredientsString = ingredientOptions.join(",");
  const ingredientsString = ingredientOptions[0];
  //  TS const [personName, setPersonName] = React.useState<string[]>([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const cuisinesString = cuisineOptions.join(",");
  const [recipes, setRecipes] = useState([]);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${ingredientsString}&number=${minResults}&apiKey=${apiKey}`;
  //   const data = await fetchData(apiUrl);
  //   setRecipes(data.results);
  //   console.log("DATA", data.results);
  // };

  const handleSearch = async (e) => {
    e.preventDefault();

    const apiUrl1 = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisinesString}&number=${minResults}&apiKey=${apiKey}`;
    const apiUrl2 = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString}&number=${minResults}&apiKey=${apiKey}`;
    
    const [result1, result2] = await Promise.all([fetchData(apiUrl1), fetchData(apiUrl2)]);
    const combinedResults = [...result1.results, ...result2];
    const uniqueResults = Object.values(
      combinedResults.reduce((acc, recipe) => {
        if (!acc[recipe.id]) {
          acc[recipe.id] = recipe;
        }
        return acc;
      }, {})
    );

    // const data = await fetchData(apiUrl);
    // console.log("data", data);
    // Make a second API call for each recipe to get the sourceUrl, spoonacularSourceUrl, summary...
    //   const recipePromises = data.results.map((recipe) => {
    //         fetchData(
    //           `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
    //         );
    //       })
    // }

    // const recipePromises = data.results
    //   ? data.results.map((recipe) =>
    //       fetchData(
    //         `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
    //       )
    //     )
    //   : data.map((recipe) =>
    //       fetchData(
    //         `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
    //       )
    //     );

    const recipePromises = (data.results || data).map((recipe) =>
      fetchData(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
      )
    );

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
    if (type === "ingredients") setIngredientOptions([]);
    if (type === "cuisines") setCuisineOptions([]);
  };

  const fetchOptions = async (type, num) => {
    // DOCS -
    // https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2
    // https://api.spoonacular.com/food/ingredients/search?query=banana&number=2&sort=calories&sortDirection=desc&apiKey=06e5b0e43de742888c8362e0be77fb6c

    // CHATGPT -
    const apiUrl = `https://api.spoonacular.com/food/${type}?apiKey=${apiKey}&number=${num}`;
    const data = await fetchData(apiUrl);

    if (type === "cuisines") {
      return data.map((cuisine) => ({
        label: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
        value: cuisine,
      }));
    } else if (type === "ingredients") {
      return data.results
        .filter((ingredient) => ingredient.name !== null)
        .map((ingredient) => ({
          label: ingredient.name,
          value: ingredient.id,
        }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    // const fetchCuisineOptions = async () => {
    //   const cuisines = await fetchOptions("cuisines", 5);
    //   setCuisineOptions(cuisines);
    // };
    // fetchData(
    //   `https://api.spoonacular.com/recipes/cuisines?apiKey=${apiKey}&number=10`
    // didn't work https://api.spoonacular.com/recipes/cuisines?apiKey=06e5b0e43de742888c8362e0be77fb6c&number=10
    // )
    //   .then((data) => {
    //     setCuisineOptions(data.cuisines);
    //     setCuisine(
    //       data.cuisines[Math.floor(Math.random() * data.cuisines.length)]
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // const fetchIngredientOptions = async () => {
    //   const ingredients = await fetchOptions("ingredients", 10);
    //   setIngredientOptions(ingredients);
    // };
    // fetchData(
    //   `https://api.spoonacular.com/food/ingredients/random?apiKey=${apiKey}&number=10`
    // )
    //   .then((data) => {
    //     setIngredientOptions(data.map((ingredient) => ingredient.name));
    //     setIngredients(data.slice(0, 3).map((ingredient) => ingredient.name));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // fetchCuisineOptions();
    // fetchIngredientOptions();
  }, []);

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
          ingredientOptions={ingredientOptions}
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
          disabled={!cuisineOptions.length && !ingredientOptions.length}
          endIcon={<SendIcon />}
        >
          Fetch
        </Button>
        <p>{cuisinesString}</p>
        <p>{ingredientsString}</p>
      </form>
      <AlignItemsList recipes={recipes} />
    </div>
  );
};

export default App;
