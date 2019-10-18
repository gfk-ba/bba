import { TestBed } from '@angular/core/testing';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AppEffects } from './app.effects';

describe('AppService', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: APP_ENVIRONMENT, useValue: {} },
      ],
    });

    effects = TestBed.get(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
