import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageInternshipComponent } from './page-internship/page-internship.component';

const routes: Routes = [{ path: '', component: PageInternshipComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipRoutingModule {}
