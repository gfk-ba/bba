import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_ENVIRONMENT } from '@dcs/ngx-tools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiInterceptor } from './api.interceptor';
import { environment } from '../../environments/environment';
import { metaReducers, reducers, State } from '../reducers';
import { LoginGuard } from '../reducers/login/login.guard';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>('Registered Reducers');

export function getReducers() {
  return reducers;
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: APP_ENVIRONMENT, useValue: environment },
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    LoginGuard,
  ],
})
export class CoreModule {
  constructor() {
    registerLocaleData(localeDe);
  }
}
