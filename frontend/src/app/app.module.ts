import { NgModule } from '@angular/core';
import { ApiRequestEffects, RouterEffects } from '@dcs/ngx-tools';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { DocumentEffects } from './reducers/document/document.effects';
import { LoginEffects } from './reducers/login/login.effects';
import { UserEffects } from './reducers/user/user.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    CoreModule,
    EffectsModule.forRoot([
      AppEffects,
      ApiRequestEffects,
      RouterEffects,
      LoginEffects,
      UserEffects,
      DocumentEffects,
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
