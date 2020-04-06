import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageProgramDetailsComponent } from './page-program-details/page-program-details.component';
import { PageProgramsComponent } from './page-programs/page-programs.component';

const routes: Routes = [
  { path: '', component: PageProgramsComponent, data: { filter: null } },
  { path: ':id', component: PageProgramDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsRoutingModule {}
