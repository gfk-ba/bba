import { FormBuilder, FormGroup } from '@angular/forms';
import { equals } from 'ramda';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContainerComponent } from '../../components/base/container-component.class';
import { DocumentsListFilter } from '../../reducers/document/documents-list/types';
import { Document } from '../../reducers/document/models/document.class';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'dcs-documents-grid',
  templateUrl: './documents-grid.component.html',
  styleUrls: ['./documents-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsGridComponent extends ContainerComponent implements OnChanges {
  @Input()
  documents: Document[];
  @Input()
  public kindOptions: string[];
  @Input()
  public filter: DocumentsListFilter;

  @Output()
  public filterChanged = new EventEmitter<DocumentsListFilter>();
  @Output()
  public filterReset = new EventEmitter<void>();

  @Output()
  public modalOpen = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    super();

    this.form = fb.group({
      project: [''],
      kind: [''],
      component: [''],
    });

    this.subscribeToObservable(
      this.form.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged<DocumentsListFilter>(equals)
      ),
      (data: DocumentsListFilter) => {
        // Damn Angular and not immutable data structures
        if (!equals(data, this.filter)) {
          this.filterChanged.next(data);
        }
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.form.setValue(changes.filter.currentValue);
    }
  }

  public resetFilter(): void {
    this.filterReset.next();
  }

  public trackByIdentifier(_index: number, item: any): string {
    return item.identifier;
  }

  public setModalOpen(isOpen: boolean) {
    this.modalOpen.next(isOpen);
  }
}
