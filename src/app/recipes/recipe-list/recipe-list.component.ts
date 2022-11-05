import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';

import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { RecipeState } from '../state/recipes.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
    ) {
  }

  ngOnInit() {
    this.subscription = this.store.select(RecipeState)
    .pipe(map(recipeState=> recipeState.recipes))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    // this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
