import { Ingredient } from 'src/app/shared/ingredient.model';

export class AddIngredient {
  static readonly type = '[Shopping List] Add Ingredient';

  constructor(public payload: Ingredient) {}
}

export class AddIngredients {
  static readonly type = '[Shopping List] Add Ingredients';

  constructor(public payload: Ingredient[]){}
}

export class UpdateUngredient {
  static readonly type = '[Shopping List] Update Ingredients';

  constructor(public payload:Ingredient){}
}

export class DeleteIngredient {
  static readonly type = '[Shopping List] Delete Ingredients';
}

export class StartEdit {
  static readonly type = '[Shopping List] Start Edit';
  constructor(public payload:number){}
}
export class StoptEdit {
  static readonly type = '[Shopping List] Stop Edit'
}