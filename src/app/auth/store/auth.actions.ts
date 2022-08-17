import { Action } from '@ngrx/store';
import { TCredentials } from '../auth.model';
import { User } from '../user.model';

interface TLogin {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
}

export const LOGIN_START = '[Auth] Login Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] Signup';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] LOGOUT';

interface newTLogin extends TLogin {
  redirect: boolean;
}
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: newTLogin) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: TCredentials) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: TCredentials) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateSuccess
  | AutoLogin
  | ClearError
  | Logout
  | AuthenticateFail
  | LoginStart
  | SignupStart;
