import { Ingredient } from "src/app/shared/ingredient.model";
import { State, Action, StateContext, Selector, createSelector} from '@ngxs/store';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { AddIngredient, AddIngredients, DeleteIngredient, StartEdit, StoptEdit, UpdateUngredient } from "./shopping-list.actions";

export interface ShoppingListStateModel {
  ingredients: Ingredient[];
  editedIndex: number;
}

@State<ShoppingListStateModel>({
  name:'shoppingList',
  defaults: {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ],
    editedIndex: -1,
  }
})

export class ShoppingListState {

// constructor()

  @Action(AddIngredient)
  AddIngredient(
    ctx :StateContext<ShoppingListStateModel>,
    action: AddIngredient
  ){
    ctx.setState(
      patch<ShoppingListStateModel>({
        ingredients: append<Ingredient>([action.payload])
      })
    )
  }
  
  @Action(AddIngredients)
  AddIngredients(
    ctx: StateContext<ShoppingListStateModel>,
    action: AddIngredients
  ){
    ctx.setState(
      patch<ShoppingListStateModel>({
        ingredients: append<Ingredient>(action.payload)
      })
    )
  }

  @Action(UpdateUngredient)
  UpdateIngredient(
    ctx:StateContext<ShoppingListStateModel>,
    action:UpdateUngredient
  ) {
    const state = ctx.getState();

    ctx.setState(
      patch<ShoppingListStateModel>({
        ingredients: updateItem<Ingredient>(
          ingredient => ingredient === state.ingredients[state.editedIndex],
          action.payload
        )
      })
    )
  }

  @Action(DeleteIngredient)
  DeleteIngredient(
    ctx: StateContext<ShoppingListStateModel>
  ) {
    const state = ctx.getState();
    ctx.setState(
      patch<ShoppingListStateModel>({
        ingredients: removeItem<Ingredient>(
          ingredient => ingredient === state.ingredients[state.editedIndex]
        )
      })
    )
  }

  @Action(StartEdit)
  StartEdit(
    {patchState}:StateContext<ShoppingListStateModel>,
    action: StartEdit
  ) {
    patchState({
      editedIndex: action.payload
    })
  }

  @Action(StoptEdit)
  StopEdit(
    {patchState}:StateContext<ShoppingListStateModel>,
  ) {
    patchState({
      editedIndex: -1
    })
  }

  @Selector()
  static ingredients(state:ShoppingListStateModel) {
    return state.ingredients
  }
  

  @Selector()
  static editedIndex(state:ShoppingListStateModel) {
    return state.editedIndex
  }
  
  @Selector()
  static shoppingListState(state:ShoppingListStateModel) {
    return state
  }
}