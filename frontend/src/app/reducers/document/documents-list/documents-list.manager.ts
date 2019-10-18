import { createSelector } from '@ngrx/store';
import { schema } from 'normalizr';
import { DocumentsListFilter } from './types';
import { State } from '../../index';
import { IProject } from '../../project/models/project.class';
import { projectsListStateSelector } from '../../project/projects-list/projects-list.manager';
import { currentDocumentManager } from '../current-document/current-document.manager';
import { Document, IDocument } from '../models/document.class';
import {
  crudCollectionManagerFactory,
  INormalizedCollectionState,
  generateNormalizedCollectionState,
} from '@dcs/ngx-tools';

export interface IDocumentsListState extends INormalizedCollectionState {
  entities: { documents: { [key: string]: IDocument }; projects: { [key: string]: IProject } };
  filter: DocumentsListFilter;
}

const initialState: IDocumentsListState = {
  ...generateNormalizedCollectionState<IDocumentsListState>({
    documents: {},
    projects: {},
  }),
  filter: { component: '', kind: 'all', project: '' },
};

const documentsSchema = new schema.Array(currentDocumentManager.schema);

const pureDocumentsListStateSelector = (state: State): IDocumentsListState => {
  return state.documents.documentsList;
};

const documentsListStateSelector = createSelector(
  [pureDocumentsListStateSelector, projectsListStateSelector],
  (documentsState, projectsState) => {
    return {
      ...documentsState,
      entities: {
        documents: documentsState.entities.documents,
        projects: projectsState.entities.projects,
      },
    };
  }
);

export const documentsListManager = crudCollectionManagerFactory(
  'Documents List',
  'documents',
  initialState,
  currentDocumentManager.actions,
  documentsListStateSelector,
  documentsSchema,
  Document
);
