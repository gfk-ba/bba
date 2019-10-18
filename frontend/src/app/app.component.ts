import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  public ngOnInit() {
    console.log('Site load:', performance.now().toFixed(2), 'ms!!');
    console.log('FE 1.0.2');
  }
}
