import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { Recipe } from './recipe.model';
import * as formApp from '../store/app.reducer';
import * as RecipesActions from './store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<formApp.AppState>,
    private action$: Actions
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    // this.store.dispatch(new RecipesActions.FetchRecipes());
    return this.store.select('recipes').pipe(take(1),
      map((state) => state.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          return this.action$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
