import { schema } from 'normalizr';
import { State } from '../../index';
import { IProject, Project } from '../models/project.class';
import {
  crudEntityManagerFactory,
  INormalizedEntityState,
  generateNormalizedEntityState,
} from '@dcs/ngx-tools';

export interface ICurrentProjectState extends INormalizedEntityState {
  entities: { projects: { [key: string]: IProject } };
}

const initialState = generateNormalizedEntityState<ICurrentProjectState>({ projects: {} });

const projectSchema = new schema.Entity(
  'projects',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);

export const currentProjectStateSelector = (state: State): ICurrentProjectState =>
  state.projects.currentProject;

export const currentProjectManager = crudEntityManagerFactory(
  'Current Project',
  initialState,
  currentProjectStateSelector,
  projectSchema,
  Project
);
