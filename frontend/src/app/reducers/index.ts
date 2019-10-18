import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromDocuments from './document/document.reducer';
import * as fromProjects from './project/project.reducer';
import * as fromLogin from './login/login.reducer';
import { environment } from '../../environments/environment';
import {
  apiError,
  hmrStateSetter,
  IApiErrorState,
  logger,
  resetReducer,
  immutableDevMetaReducer,
} from '@dcs/ngx-tools';

export interface State {
  projects: fromProjects.State;
  documents: fromDocuments.State;
  login: fromLogin.State;
  router: RouterReducerState;
  apiError: IApiErrorState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['login'], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State, any> = {
  projects: fromProjects.reducer,
  documents: fromDocuments.reducer,
  login: fromLogin.reducer,
  router: routerReducer,
  apiError,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [immutableDevMetaReducer, logger, resetReducer, hmrStateSetter, localStorageSyncReducer]
  : [resetReducer, localStorageSyncReducer];
