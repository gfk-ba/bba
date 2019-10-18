import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcs-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements OnInit {
  constructor() {}

  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  ngOnInit() {}
}
