import { Action } from '@ngrx/store';
import { currentProjectManager, ICurrentProjectState } from './current-project.manager';

export const currentProject = (
  state: ICurrentProjectState = currentProjectManager.initialState,
  action: Action
): ICurrentProjectState => {
  switch (
    action.type
    // overwrite or add any actions here, just default redux
  ) {
  }

  return currentProjectManager.reducer(state, action);
};
