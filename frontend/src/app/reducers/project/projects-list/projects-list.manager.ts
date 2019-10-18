import { schema } from 'normalizr';
import { State } from '../../index';
import { currentProjectManager } from '../current-project/current-project.manager';
import { IProject, Project } from '../models/project.class';
import {
  crudCollectionManagerFactory,
  INormalizedCollectionState,
  generateNormalizedCollectionState,
} from '@dcs/ngx-tools';

export interface IProjectsListState extends INormalizedCollectionState {
  entities: { projects: { [key: string]: IProject } };
}

const initialState = generateNormalizedCollectionState<IProjectsListState>({ projects: {} });

const projectsSchema = new schema.Array(currentProjectManager.schema);

export const projectsListStateSelector = (state: State): IProjectsListState =>
  state.projects.projectsList;

export const projectsListManager = crudCollectionManagerFactory(
  'Projects List',
  'projects',
  initialState,
  currentProjectManager.actions,
  projectsListStateSelector,
  projectsSchema,
  Project
);
