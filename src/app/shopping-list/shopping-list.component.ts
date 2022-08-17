import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import * as FromShoppingList from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private logService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.logService.printLog('Hello from shoppingList ngOnINIT');
  }
  onEditItem(id: number) {
    // this.slService.startedEditing.next(id);
    this.store.dispatch(new StartEdit(id));
  }
}
