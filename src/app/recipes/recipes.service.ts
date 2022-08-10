import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(
    private slService: ShoppingListService,
  ) {}
  private recipes: Recipe[];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe',
  //     'this is a Test',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('Fries', 12)]
  //   ),
  //   new Recipe(
  //     'Test Recipe1',
  //     'this is a Test1',
  //     'https://img.delicious.com.au/ZCVFCYn_/del/2022/02/chicken-chickpea-curry-163942-1.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 3)]
  //   ),
  // ];

  getRecipes() {
    // this.dataStorage.fetchRecipes();

    return this.recipes?.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
