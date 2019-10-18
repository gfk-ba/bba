import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { delay, mapTo } from 'rxjs/operators';
import { GreetUniverse, HomeActionTypes } from './home.actions';

@Injectable()
export class HomeEffects {
  @Effect()
  effect$ = this.actions$.pipe(
    ofType(HomeActionTypes.GreetWorld),
    delay(2000),
    mapTo(new GreetUniverse())
  );

  constructor(private actions$: Actions) {}
}
