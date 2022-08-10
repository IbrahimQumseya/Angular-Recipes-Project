import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('banana', 10),
    new Ingredient('Apples', 5),
  ];
  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }
  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
