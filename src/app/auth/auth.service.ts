import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private timer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDate: number) {
    this.timer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDate);
  }

  clearLogoutTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
