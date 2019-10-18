import { Action } from '@ngrx/store';
import { IProjectsListState, projectsListManager } from './projects-list.manager';

export const projectsList = (
  state: IProjectsListState = projectsListManager.initialState,
  action: Action
): IProjectsListState => {
  switch (
    action.type
    // overwrite or add any actions here, just default redux
  ) {
  }

  return projectsListManager.reducer(state, action);
};
