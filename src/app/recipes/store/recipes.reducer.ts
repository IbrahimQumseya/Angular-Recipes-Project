import { Recipe } from '../recipe.model';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  RecipesAction,
  SET_RECIPES,
  UPDATE_RECIPE,
} from './recipes.actions';

export interface State {
  recipes: Recipe[];
}
const initialState: State = {
  recipes: [],
};

export function recipesReducer(
  state: State = initialState,
  action: RecipesAction
) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.id],
        ...action.payload.recipe,
      };
      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.id] = updateRecipe;
      return {
        ...state,
        recipes: [],
      };

    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        }),
      };

    default:
      return state;
  }
}
