import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Go, Reset, StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { tokenSelector } from '../../reducers/login/login.selectors';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavigationComponent extends StoreComponent implements OnInit {
  public isLoggedIn = true;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  ngOnInit() {
    this.subscribeToState(tokenSelector, token => {
      this.isLoggedIn = !!token.accessToken;
    });
  }

  public login() {
    this.dispatch(new Go({ path: ['/login'] }));
  }

  public logout() {
    this.store.dispatch(new Reset());
  }
}
