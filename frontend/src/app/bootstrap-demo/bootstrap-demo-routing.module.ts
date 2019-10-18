import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapDemoPageComponent } from './bootstrap-demo-page/bootstrap-demo-page.component';

const routes: Routes = [{ path: '', component: BootstrapDemoPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BootstrapDemoRoutingModule {}
