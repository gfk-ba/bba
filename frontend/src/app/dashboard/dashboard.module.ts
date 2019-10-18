import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddProjectComponent } from './add-project/add-project.component';
import { ConfirmDocumentComponent } from './confirm-document/confirm-document.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentLinkGraphComponent } from './document-link-graph/document-link-graph.component';
import { DocumentRegisterComponent } from './document-register/document-register.component';
import { DocumentsGridComponent } from './documents-grid/documents-grid.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    OverlayModule,
    ComponentsModule,
  ],
  declarations: [
    DashboardPageComponent,
    DocumentsGridComponent,
    DocumentRegisterComponent,
    DocumentDetailComponent,
    DocumentLinkGraphComponent,
    AddProjectComponent,
    ConfirmDocumentComponent,
  ],
})
export class DashboardModule {}
