import { OnDestroy } from '@angular/core';
import { ContainerComponent as BaseComponent } from '@dcs/ngx-tools';
import { Subject } from 'rxjs';

export abstract class ContainerComponent extends BaseComponent implements OnDestroy {
  protected onDestroy$ = new Subject();

  /**
   * Will run when the component is removed,
   * last chance to destroy subscriptions and cleanup to prevent memory leaks
   * Needed because of https://github.com/angular/angular/issues/22825
   */
  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
