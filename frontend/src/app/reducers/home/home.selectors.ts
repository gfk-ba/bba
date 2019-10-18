import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './home.reducer';

export const homeStateSelector = createFeatureSelector<State>('home');

export const greetingSelector = createSelector([homeStateSelector], state => state.greeting);
