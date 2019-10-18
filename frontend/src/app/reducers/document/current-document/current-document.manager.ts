import { createSelector } from '@ngrx/store';
import { schema } from 'normalizr';
import { State } from '../../index';
import { currentProjectManager } from '../../project/current-project/current-project.manager';
import { projectsListStateSelector } from '../../project/projects-list/projects-list.manager';
import { Document, IDocument } from '../models/document.class';
import {
  crudEntityManagerFactory,
  INormalizedEntityState,
  generateNormalizedEntityState,
} from '@dcs/ngx-tools';

export interface ICurrentDocumentState extends INormalizedEntityState {
  entities: { documents: { [key: string]: IDocument } };
}

const initialState = generateNormalizedEntityState<ICurrentDocumentState>({ documents: {} });

const documentSchema = new schema.Entity(
  'documents',
  {
    project: currentProjectManager.schema,
    links: [new schema.Entity('documents')],
  },
  {
    idAttribute(entity) {
      return String(entity.id);
    },
    processStrategy(value: IDocument) {
      return {
        ...value,
        project: value.projectId,
        links: value.linkIds,
      };
    },
  }
);

const pureCurrentDocumentStateSelector = (state: State): ICurrentDocumentState => {
  return state.documents.currentDocument;
};

const currentDocumentStateSelector = createSelector(
  [pureCurrentDocumentStateSelector, projectsListStateSelector],
  (documentState, projectsState) => {
    return {
      ...documentState,
      entities: {
        documents: documentState.entities.documents,
        projects: projectsState.entities.projects,
      },
    };
  }
);

export const currentDocumentManager = crudEntityManagerFactory(
  'Current Document',
  initialState,
  currentDocumentStateSelector,
  documentSchema,
  Document
);
