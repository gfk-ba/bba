import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Go, ResetActionTypes } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  flatMap,
  map,
  mapTo
  } from 'rxjs/operators';
import { AccessToken } from './types';
import { environment as env } from '../../../environments/environment';
import {
  LoginActionTypes,
  LoginFetchTokenAction,
  LoginFetchTokenErrorAction,
  LoginFetchTokenSuccessAction,
} from './login.actions';

@Injectable()
export class LoginEffects {
  @Effect()
  fetchToken$ = this.actions$.pipe(
    ofType<LoginFetchTokenAction>(LoginActionTypes.FETCH_TOKEN),
    flatMap((action: LoginFetchTokenAction) => {
      return this.http.post<AccessToken>(`${env.apiUrl}/auth/token`, action.payload).pipe(
        map(a => new LoginFetchTokenSuccessAction(a)),
        catchError((response: HttpErrorResponse) => of(new LoginFetchTokenErrorAction(response)))
      );
    })
  );

  @Effect()
  redirectAfterLogin$ = this.actions$.pipe(
    ofType(LoginActionTypes.FETCH_TOKEN_SUCCESS),
    mapTo(new Go({ path: ['/dashboard'] }))
  );

  @Effect()
  redirectAfterLogout$ = this.actions$.pipe(
    ofType(ResetActionTypes.Reset),
    mapTo(new Go({ path: ['/login'] }))
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
