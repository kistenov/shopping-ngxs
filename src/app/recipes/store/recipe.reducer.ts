import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions'

export interface State {
  recipes: Recipe[],
  recipe: Recipe
}

const initialState: State = {
  recipes: [],
  recipe: null
}
export function recipeReducer (
  state = initialState,
  action:RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes:[...action.payload]
      }
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case RecipeActions.UPDATE_RECIPE:
      // these consts preserve imutability of state
      // my logic
      // const updatedRecipes = [...state.recipes];
      // updatedRecipes[action.payload.index] = action.payload.newRecipe;
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) =>{
          return index !== action.payload
        })
      }
    default:
      return state
  }
}