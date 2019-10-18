import { Inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { timer } from 'rxjs';
import { flatMap, mapTo, takeUntil } from 'rxjs/operators';
import { Environment } from '../../../environments/environment';
import {
  DocumentsListActionTypes,
  FetchDocumentsList,
} from './documents-list/documents-list.actions';

@Injectable()
export class DocumentEffects {
  @Effect()
  pollDocuments = this.actions$.pipe(
    ofType(DocumentsListActionTypes.StartPolling),
    flatMap(() =>
      timer(0, this.env.documentPollingTimer).pipe(
        takeUntil(
          this.actions$.pipe(
            ofType(DocumentsListActionTypes.StopPolling, DocumentsListActionTypes.StartPolling)
          )
        ),
        mapTo(new FetchDocumentsList())
      )
    )
  );

  constructor(private actions$: Actions, @Inject(APP_ENVIRONMENT) private env: Environment) {}
}
