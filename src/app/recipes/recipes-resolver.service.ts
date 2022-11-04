import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';

import { Store } from '@ngrx/store';
import { Actions, ofType } from "@ngrx/effects";

import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipe.actions'
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   this.store.dispatch(new RecipeActions.FetchRecipes());
  //   // here I use Actions and ofType operator to then when value is emited take it and unsubscribe automatically
  //   return this.actions$.pipe(lkjlkj;lkj;;;;;
  //     ofType(RecipeActions.SET_RECIPES),
  //     take(1)
  //   )
  // }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes
      }),
      switchMap(recipes => {
        // check the state and if no loaded recipes - we fetch recipes and set them into store
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          // here I use Actions and ofType operator to then when value is emited take it and unsubscribe automatically
          return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1)
          )
        } else {
          return of(recipes);
        }
      })
    )
  }
}

