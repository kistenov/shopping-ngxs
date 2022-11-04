import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";

import * as RecipeActions from './recipe.actions'
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://angular-shopping-ef480-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes)
    })
  )

    @Effect({dispatch:false})
    storeResipes = this.actions$.pipe(
      ofType(RecipeActions.STORE_RECIPES),
      // withLatestFrom allows to merge a value from another observalble into this obsrevable stream
      withLatestFrom(this.store.select('recipes')),
      switchMap((response) => {
        return this.http
        .put(
          'https://angular-shopping-ef480-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          response[1].recipes
        )
      })
    )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ){}
}