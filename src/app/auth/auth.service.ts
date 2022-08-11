import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData, TCredentials } from './auth.model';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private timer: any;

  constructor(private http: HttpClient, private router: Router) {}
  signUp(credentials: TCredentials) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDyX1F-BJFQ4was5KCXWRh6qPXkheyWR8k',
        credentials
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.HandleAuth(resData);
        })
      );
  }

  login(credentials: TCredentials) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDyX1F-BJFQ4was5KCXWRh6qPXkheyWR8k',
        credentials
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.HandleAuth(resData);
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('auth');
    this.router.navigate(['/auth']);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  autoLogout(expirationDate: number) {
    this.timer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('auth'));
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private HandleAuth(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      new Date(+expirationDate)
    );
    this.user.next(user);
    this.autoLogout(+resData.expiresIn * 1000);
    localStorage.setItem('auth', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = ' this Email does not exist.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'this Password in not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
