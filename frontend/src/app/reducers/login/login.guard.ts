import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Go } from '@dcs/ngx-tools';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenSelector } from './login.selectors';
import { State } from '../index';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<State>) {}

  public canActivate(): Observable<boolean> {
    return this.testCanActivate();
  }

  public canActivateChild(): Observable<boolean> {
    return this.testCanActivate();
  }

  protected testCanActivate() {
    return this.store.pipe(
      select(tokenSelector),
      map(token => {
        const hasToken = !!token.accessToken;
        if (!hasToken) {
          this.store.dispatch(new Go({ path: ['login'] }));
        }
        return hasToken;
      })
    );
  }
}
