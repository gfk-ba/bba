import { ActionReducer, combineReducers } from '@ngrx/store';

import { ICurrentProjectState } from './current-project/current-project.manager';
import { currentProject } from './current-project/current-project.reducer';
import { IProjectsListState } from './projects-list/projects-list.manager';
import { projectsList } from './projects-list/projects-list.reducer';

export interface State {
  currentProject: ICurrentProjectState;
  projectsList: IProjectsListState;
}

export const reducer: ActionReducer<State> = combineReducers({
  currentProject,
  projectsList,
});
