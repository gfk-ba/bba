import { Action } from '@ngrx/store';
import { AccessToken } from './types';
import { HttpErrorResponse } from '@angular/common/http';

export enum LoginActionTypes {
  FETCH_TOKEN = '[Login] Fetch token',
  FETCH_TOKEN_START = '[Login] Fetch token start',
  FETCH_TOKEN_SUCCESS = '[Login] Fetch token success',
  FETCH_TOKEN_ERROR = '[Login] Fetch token error',
}

export class LoginFetchTokenAction implements Action {
  public readonly type = LoginActionTypes.FETCH_TOKEN;
  constructor(public payload: { email: string; password: string }) {}
}
export class LoginFetchTokenStartAction implements Action {
  public readonly type = LoginActionTypes.FETCH_TOKEN_START;
}
export class LoginFetchTokenSuccessAction implements Action {
  public readonly type = LoginActionTypes.FETCH_TOKEN_SUCCESS;
  constructor(public payload: AccessToken) {}
}
export class LoginFetchTokenErrorAction implements Action {
  public readonly type = LoginActionTypes.FETCH_TOKEN_ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type LoginActions =
  | LoginFetchTokenAction
  | LoginFetchTokenStartAction
  | LoginFetchTokenSuccessAction
  | LoginFetchTokenErrorAction;
