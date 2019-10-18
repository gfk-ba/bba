import { Action } from '@ngrx/store';

export enum HomeActionTypes {
  Greet = '[Home] Greet',
  GreetWorld = '[Home] Greet World',
  GreetUniverse = '[Home] Greet Universe',
}

export class Greet implements Action {
  readonly type = HomeActionTypes.Greet;

  constructor(public payload: string) {}
}

export class GreetWorld implements Action {
  readonly type = HomeActionTypes.GreetWorld;
}

export class GreetUniverse implements Action {
  readonly type = HomeActionTypes.GreetUniverse;
}

export type HomeActions = Greet | GreetWorld | GreetUniverse;
