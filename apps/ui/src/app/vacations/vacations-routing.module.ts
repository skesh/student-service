import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageVacationsComponent } from './page-vacations/page-vacations.component';

const routes: Routes = [{ path: '', component: PageVacationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacationsRoutingModule {}
