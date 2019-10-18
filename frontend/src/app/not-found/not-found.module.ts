import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';

@NgModule({
  imports: [CommonModule, NotFoundRoutingModule],
  declarations: [NotFoundPageComponent],
})
export class NotFoundModule {}
