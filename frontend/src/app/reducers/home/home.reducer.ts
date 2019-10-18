import { HomeActions, HomeActionTypes } from './home.actions';

export interface State {
  greeting: string;
}

export const initialState: State = {
  greeting: 'Unknown',
};

export function reducer(state = initialState, action: HomeActions): State {
  switch (action.type) {
    case HomeActionTypes.Greet:
      return { ...state, greeting: action.payload };

    case HomeActionTypes.GreetWorld:
      return { ...state, greeting: 'World' };

    case HomeActionTypes.GreetUniverse:
      return { ...state, greeting: 'Universe' };

    default:
      return state;
  }
}
