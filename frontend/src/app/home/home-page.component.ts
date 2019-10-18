import { Store } from '@ngrx/store';
import { StoreComponent } from '../components/base/store-component.class';
import { State } from '../reducers';
import { Greet, GreetWorld } from '../reducers/home/home.actions';
import { greetingSelector } from '../reducers/home/home.selectors';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'dcs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends StoreComponent implements OnInit, OnDestroy {
  public greeting = '';

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  public ngOnInit() {
    this.subscribeToState(greetingSelector, greeting => {
      this.greeting = greeting;
    });

    setTimeout(() => {
      this.dispatch(new GreetWorld());
    }, 1000);

    setTimeout(() => {
      this.dispatch(new Greet('DCS'));
    }, 5000);
  }
}
