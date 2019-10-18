import { DocumentsListActions, DocumentsListActionTypes } from './documents-list.actions';
import { documentsListManager, IDocumentsListState } from './documents-list.manager';

export const documentsList = (
  state: IDocumentsListState = documentsListManager.initialState,
  action: DocumentsListActions
): IDocumentsListState => {
  switch (action.type) {
    // overwrite or add any actions here, just default redux
    case documentsListManager.actions.fetch.start:
      return { ...state, loading: true };

    case documentsListManager.actions.fetch.success:
      return { ...documentsListManager.reducer(state, action), filter: state.filter };

    case DocumentsListActionTypes.SetFilter:
      return { ...state, filter: action.payload };

    case DocumentsListActionTypes.ResetFilter:
      return { ...state, filter: documentsListManager.initialState.filter };
  }

  return documentsListManager.reducer(state, action);
};
