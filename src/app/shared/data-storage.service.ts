import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipesService: RecipesService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.httpClient
      .put(
        'https://ng-course-recipe-book-b40ce-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://ng-course-recipe-book-b40ce-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
