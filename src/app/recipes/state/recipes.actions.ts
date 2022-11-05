import { Recipe } from "../recipe.model";

export class SetRecipes  {
  static readonly type = '[Recipes] Set Recipes';

  constructor(public payload: Recipe[]){}
}

export class FetchRecipes {

  static readonly type = '[Recipes] Fetch Recipes'
}

export class AddRecipe {
  static readonly type = '[Recipes] Add Recipe';

  constructor(public payload: Recipe){}
}

export class UpdateRecipe  {
  static readonly type = '[Recipes] Update Recipe';

  constructor(public payload:{index: number, newRecipe: Recipe}){}
}

export class DeleteRecipe  {
  static readonly type = '[Recipes] Delete Recipe';

  constructor(public payload: number){}
}

export class StoreRecipes  {
  static readonly type = '[Recipes] Store Recipes';
}