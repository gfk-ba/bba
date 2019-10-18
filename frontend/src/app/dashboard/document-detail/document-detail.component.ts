import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Document } from '../../reducers/document/models/document.class';

@Component({
  selector: 'dcs-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent {
  @Input()
  public document: Document;
}
