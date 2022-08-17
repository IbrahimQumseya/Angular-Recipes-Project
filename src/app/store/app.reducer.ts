import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as formRecipes from '../recipes/store/recipes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.InitialState;
  auth: fromAuth.State;
  recipes: formRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: formRecipes.recipesReducer,
};
