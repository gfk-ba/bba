import { Injectable } from '@angular/core';
import { Reset } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, flatMap, map, take } from 'rxjs/operators';
import { State } from '../reducers';
import { tokenSelector } from '../reducers/login/login.selectors';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      take(1),
      map(state => tokenSelector(state)),
      flatMap(token => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        return next.handle(request).pipe(
          catchError((e: HttpErrorResponse) => {
            if (e.status === 401) {
              this.store.dispatch(new Reset());
            }
            throw e;
          })
        );
      })
    );
  }
}
