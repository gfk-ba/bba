import { Action } from '@ngrx/store';
import { currentDocumentManager, ICurrentDocumentState } from './current-document.manager';

export const currentDocument = (
  state: ICurrentDocumentState = currentDocumentManager.initialState,
  action: Action
): ICurrentDocumentState => {
  switch (
    action.type
    // overwrite or add any actions here, just default redux
  ) {
  }

  return currentDocumentManager.reducer(state, action);
};
