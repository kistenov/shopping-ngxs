import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListState } from './state/shopping-list.state';
// import { Store } from '@ngrx/store';
// import * as fromApp from '../store/app.reducer'
// import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<Ingredient[]>;

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select(ShoppingListState.ingredients);
    
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    // this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
