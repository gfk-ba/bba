import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
import { SetRootState } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;
  let store: Store<any>;

  module.hot.accept();

  bootstrap()
    .then(mod => {
      ngModule = mod;

      if (module.hot.data) {
        store = ngModule.injector.get<Store<any>>(Store);
        store.dispatch(new SetRootState(module.hot.data.state));
      }
    })
    .catch(err => console.log(err));

  module.hot.dispose((data: any) => {
    const appRef: ApplicationRef = ngModule.injector.get<ApplicationRef>(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    store = ngModule.injector.get<Store<any>>(Store);

    store.pipe(take(1)).subscribe(state => {
      data.state = state;
    });
    ngModule.destroy();
    makeVisible();
  });
};
