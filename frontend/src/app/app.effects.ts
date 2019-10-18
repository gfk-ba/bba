import { Inject, Injectable } from '@angular/core';
import { ApiError, ApiRequestActionTypes, APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, tap } from 'rxjs/operators';
import swal from 'sweetalert';
import { Environment } from '../environments/environment';

@Injectable()
export class AppEffects {
  @Effect({ dispatch: false })
  logApiError = this.actions$.pipe(
    ofType<ApiError>(ApiRequestActionTypes.ApiError),
    filter((error: ApiError) => !this.env.ignoreHttpErrors.includes(error.payload.error.status)),

    tap((error: ApiError) => {
      const httpError = error.payload.error;
      swal({
        title: 'API Error',
        text: `Status: ${httpError.status} ${httpError.statusText}

        ${httpError.message}`,
        icon: 'error',
      });
    })
  );

  constructor(public actions$: Actions, @Inject(APP_ENVIRONMENT) private env: Environment) {}
}
