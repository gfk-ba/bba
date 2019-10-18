import { HttpErrorResponse } from '@angular/common/http';
import { Reset, ResetActionTypes } from '@dcs/ngx-tools';
import { LoginActions, LoginActionTypes } from './login.actions';

export const initialState = {
  token: { expiresIn: 0, accessToken: '' },
  loading: false,
  error: null as HttpErrorResponse | null,
};

export type State = Readonly<typeof initialState>;

export function reducer(state = initialState, action: LoginActions | Reset): State {
  switch (action.type) {
    case LoginActionTypes.FETCH_TOKEN_START:
      return { ...state, loading: true };
    case LoginActionTypes.FETCH_TOKEN_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case LoginActionTypes.FETCH_TOKEN_ERROR:
      return { ...initialState, error: action.payload };

    case ResetActionTypes.Reset:
      return initialState;
  }
  return state;
}
