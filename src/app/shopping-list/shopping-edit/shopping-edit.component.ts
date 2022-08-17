import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import {
  AddIngredient,
  DeleteIngredient,
  StopEdit,
  UpdateIngredient,
} from '../store/shopping-list.actions';
import { InitialState } from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  @ViewChild('f', { static: false }) newForm: NgForm;
  subs: Subscription;
  editMode = false;
  editedItem: Ingredient;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  ngOnInit(): void {
    this.subs = this.store
      .select('shoppingList')
      .subscribe((state: InitialState) => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.newForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit() {
    const value = this.newForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new UpdateIngredient(newIngredient));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.newForm.reset();
  }

  onClear() {
    this.newForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }
  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new DeleteIngredient());

    this.onClear();
  }
}
