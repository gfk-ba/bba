import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dcs-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {
  @Input()
  public loading: boolean;
  @Input()
  public updating: boolean;
  @Input()
  public static = false;
  @Input()
  public loadingMessage: string;
  @Input()
  public updatingMessage: string;

  get active(): boolean {
    return this.loading || this.updating;
  }
  get message(): string {
    return this.loadingMessage || this.updatingMessage;
  }
}
