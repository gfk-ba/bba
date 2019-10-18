import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../../components/modal/modal.component';
import { State } from '../../reducers';
import { currentDocumentManager } from '../../reducers/document/current-document/current-document.manager';
import { DocumentsListFilter } from '../../reducers/document/documents-list/types';
import { Document, IDocument } from '../../reducers/document/models/document.class';
import { CreateCurrentProject } from '../../reducers/project/current-project/current-project.actions';
import { Project } from '../../reducers/project/models/project.class';
import { FetchProjectsList } from '../../reducers/project/projects-list/projects-list.actions';
import { projectsListManager } from '../../reducers/project/projects-list/projects-list.manager';
import {
  filteredDocumentsListSelector,
  filterSelector,
} from '../../reducers/document/documents-list/documents-list.selectors';
import {
  PollDocumentsListStart,
  PollDocumentsListStop,
  SetDocumentsListFilter,
  ResetDocumentsListFilter,
} from '../../reducers/document/documents-list/documents-list.actions';
import {
  CreateCurrentDocument,
  ResetCurrentDocument,
} from '../../reducers/document/current-document/current-document.actions';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'dcs-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent extends StoreComponent implements OnInit, OnDestroy {
  @ViewChild('processingModal')
  public readonly processingModal: ModalComponent;

  public projects: Project[];
  public documents: Document[];

  public currentDocument: Document;
  public filter: DocumentsListFilter;

  public kindOptions = ['data', 'model', 'result', 'custom'];

  constructor(store: Store<State>, cd: ChangeDetectorRef) {
    super(store, cd);

    this.subscribeToState(projectsListManager.selectors.collection, data => {
      this.projects = data;
    });

    this.subscribeToState(filteredDocumentsListSelector, data => {
      this.documents = data;
    });

    this.subscribeToState(filterSelector, data => {
      this.filter = data;
    });

    this.subscribeToState(currentDocumentManager.selectors.entity, data => {
      this.currentDocument = data;

      if (this.currentDocument.loaded) {
        this.processingModal.show();
        this.dispatch(new ResetCurrentDocument());
      }
    });
  }

  /**
   * Will run just before the component will be rendered;
   * best place to load data, subscribe to changes (...)
   */
  public ngOnInit() {
    this.dispatch(new FetchProjectsList());
    this.dispatch(new PollDocumentsListStart());
  }

  /**
   * Will run when the component is removed,
   * last chance to destroy subscriptions and cleanup to prevent memory leaks
   */
  public ngOnDestroy() {
    super.ngOnDestroy();
    this.dispatch(new PollDocumentsListStop());
  }

  public registerDocument(doc: IDocument) {
    this.dispatch(new CreateCurrentDocument(doc));
  }

  public createProject(data: any) {
    this.dispatch(new CreateCurrentProject(data));
  }

  public filterChanged(data: DocumentsListFilter) {
    this.dispatch(new SetDocumentsListFilter(data));
  }

  public filterReset() {
    this.dispatch(new ResetDocumentsListFilter());
  }

  public updatePolling(modalVisible: boolean) {
    if (modalVisible) {
      this.dispatch(new PollDocumentsListStop());
    } else {
      this.dispatch(new PollDocumentsListStart());
    }
  }
}
