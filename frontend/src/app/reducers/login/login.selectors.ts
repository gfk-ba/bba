import { State } from '../index';

export function loginStateSelector(state: State) {
  return state.login;
}

export function tokenSelector(state: State) {
  return loginStateSelector(state).token;
}

export function errorSelector(state: State) {
  return loginStateSelector(state).error;
}
