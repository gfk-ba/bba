import { Injectable } from '@angular/core';
import { Go } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { userCreateActionNames } from './user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  loginUserAfterRegistration = this.actions$.pipe(
    ofType(userCreateActionNames.success),
    mapTo(new Go({ path: ['/login'] }))
  );

  constructor(private actions$: Actions) {}
}
