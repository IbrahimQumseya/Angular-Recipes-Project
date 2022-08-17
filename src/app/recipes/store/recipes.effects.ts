import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {}

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, state]) => {
      return this.httpClient.put(
        'https://ng-course-recipe-book-b40ce-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        state.recipes
      );
    })
  );

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),

    switchMap(() => {
      return this.httpClient.get<Recipe[]>(
        'https://ng-course-recipe-book-b40ce-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );
}
