import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, RouterModule, OverlayModule],
  declarations: [
    MainNavigationComponent,
    LoadingIndicatorComponent,
    ErrorBoxComponent,
    ModalComponent,
  ],
  exports: [MainNavigationComponent, LoadingIndicatorComponent, ErrorBoxComponent, ModalComponent],
})
export class ComponentsModule {}
