import axios from "axios";

import {
  fetchRecipesAction,
  fetchSelectedRecipeAction,
} from "../redux/actions";

const END_POINT_BASE_RECIPES = "https://api.spoonacular.com/recipes";
const apiKey = "ea614c5218d94798b66bd17975abd756";
const MAX_PER_PAGE = 30;
const END_POINT_BASE_INGREDIENT =
  "https://api.spoonacular.com/food/ingredients";

export const fetchRecipes = async (dispatch) => {
  try {
    const response = await axios.get(
      `${END_POINT_BASE_RECIPES}/complexSearch`,
      {
        params: {
          apiKey,
          number: MAX_PER_PAGE,
        },
      }
    );
    dispatch(fetchRecipesAction(response.data.results));
  } catch (err) {
    console.log("error ", err);
  }
};

export const fetchSelectedRecipe = async (dispatch, recipeId) => {
  try {
    console.log("dans selected unit");
    const response = await axios.get(
      `${END_POINT_BASE_RECIPES}/${recipeId}/information`,
      {
        params: {
          apiKey,
        },
      }
    );
    console.log("data selected unit = " + JSON.stringify(response.data));
    dispatch(fetchSelectedRecipeAction(response.data));
  } catch (err) {
    console.log("error ", err);
  }
};
