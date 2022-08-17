import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as formApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<formApp.AppState>) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((state) => state.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(!user, !!user);
      });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
}
