import { ApiGetRequest } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';
import { documentsListManager } from './documents-list.manager';
import { DocumentsListFilter } from './types';

export enum DocumentsListActionTypes {
  StartPolling = '[Documents List] Start Polling',
  StopPolling = '[Documents List] Stop Polling',
  SetFilter = '[Documents List] Set Filter',
  ResetFilter = '[Documents List] Reset Filter',
}

export class FetchDocumentsList extends ApiGetRequest {
  constructor() {
    super('documents', documentsListManager.actions.fetch.base, documentsListManager.schema);
  }
}

export class PollDocumentsListStart implements Action {
  public readonly type = DocumentsListActionTypes.StartPolling;
}

export class PollDocumentsListStop implements Action {
  public readonly type = DocumentsListActionTypes.StopPolling;
}

export class SetDocumentsListFilter implements Action {
  public readonly type = DocumentsListActionTypes.SetFilter;
  constructor(public payload: DocumentsListFilter) {}
}

export class ResetDocumentsListFilter implements Action {
  public readonly type = DocumentsListActionTypes.ResetFilter;
}

export type DocumentsListActions =
  | FetchDocumentsList
  | PollDocumentsListStart
  | PollDocumentsListStop
  | SetDocumentsListFilter
  | ResetDocumentsListFilter;
