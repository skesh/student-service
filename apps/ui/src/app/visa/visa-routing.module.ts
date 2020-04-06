import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageVisaComponent } from './page-visa/page-visa.component';

const routes: Routes = [{ path: '', component: PageVisaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisaRoutingModule {}
