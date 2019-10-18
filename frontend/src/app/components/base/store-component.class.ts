import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { StoreComponent as BaseComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

export abstract class StoreComponent extends BaseComponent implements OnDestroy {
  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  /**
   * Will run when the component is removed,
   * last chance to destroy subscriptions and cleanup to prevent memory leaks
   * Needed because of https://github.com/angular/angular/issues/22825
   */
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
}
