import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminBase } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgramsManagerComponent } from './programs-manager/programs-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'programs', component: ProgramsManagerComponent, canActivate: [AuthGuard] },
      { path: ':type', component: AdminBase, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/admin/programs', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
