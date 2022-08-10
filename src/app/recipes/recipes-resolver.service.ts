import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipesServers: RecipesService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesServers.getRecipes();
    if (recipes?.length === 0) {
      return this.dataStorage.fetchRecipes();
    }else {

      return recipes;
    }

  }
}
