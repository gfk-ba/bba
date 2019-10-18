import { createSelector } from '@ngrx/store';
import { documentsListManager, IDocumentsListState } from './documents-list.manager';
import { State } from '../..';

export const filterSelector = (state: State) =>
  (documentsListManager.selectors.subState(state) as IDocumentsListState).filter;

export const filteredDocumentsListSelector = createSelector(
  [documentsListManager.selectors.collection, filterSelector],
  (documents, filter) => {
    return documents
      .filter(
        doc =>
          filter.kind === 'all' || doc.kind.toLocaleLowerCase() === filter.kind.toLocaleLowerCase()
      )
      .filter(doc => {
        if (!filter.project) {
          return true;
        }

        return doc.project.name.toLocaleLowerCase().includes(filter.project.toLocaleLowerCase());
      })
      .filter(doc => {
        if (!filter.component) {
          return true;
        }

        return (
          doc.description.toLocaleLowerCase().includes(filter.component.toLocaleLowerCase()) ||
          doc.hash.toLocaleLowerCase().includes(filter.component.toLocaleLowerCase())
        );
      });
  }
);
