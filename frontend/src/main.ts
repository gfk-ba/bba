import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

if (environment.hmr && (module as any)['hot']) {
  import('./hmr').then(m => {
    m.hmrBootstrap(module, bootstrap);
  });
} else {
  bootstrap().catch(err => console.log(err));
}
