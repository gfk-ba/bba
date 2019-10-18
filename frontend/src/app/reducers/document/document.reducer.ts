import { ActionReducer, combineReducers } from '@ngrx/store';
import { ICurrentDocumentState } from './current-document/current-document.manager';
import { currentDocument } from './current-document/current-document.reducer';
import { DocumentsListActions } from './documents-list/documents-list.actions';
import { IDocumentsListState } from './documents-list/documents-list.manager';
import { documentsList } from './documents-list/documents-list.reducer';

export interface State {
  currentDocument: ICurrentDocumentState;
  documentsList: IDocumentsListState;
}

export const reducer: ActionReducer<State, DocumentsListActions> = combineReducers({
  currentDocument,
  documentsList,
});
