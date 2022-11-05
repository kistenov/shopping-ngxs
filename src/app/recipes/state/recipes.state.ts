import { HttpClient } from "@angular/common/http";
import { Action, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { FetchRecipes, SetRecipes } from "./recipes.actions";

export interface RecipeStateModel {
  recipes: Recipe[],
  recipe: Recipe
} 

@State<RecipeStateModel>({
  name: 'recipesState',
  defaults: {
    recipes: [],
    recipe: null
  }
})

export class RecipeState {

  constructor(
    private http: HttpClient
  ){}

  @Action(SetRecipes)
  SetRecipes(
    ctx:StateContext<RecipeStateModel>,
    action: SetRecipes
  ) {
    ctx.patchState({
      recipes: action.payload
    })
  }

  @Action(FetchRecipes)
  FetchRecipes(
    ctx: StateContext<RecipeStateModel>,
    action: FetchRecipes
  ){
    return this.http.get<Recipe[]>(
      'https://angular-shopping-ef480-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    ),
    map((recipes:Recipe[]) => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map((recipes:Recipe[]) => {
      return new SetRecipes(recipes)
    })
  }


}