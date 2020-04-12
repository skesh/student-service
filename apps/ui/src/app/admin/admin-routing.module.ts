import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBase } from './base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

// { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: ':type', component: AdminBase },
      { path: 'login', component: LoginComponent },
      // { path: 'programs', component: ProgramsManagerComponent, canActivate: [AuthGuard] },
      // { path: 'advantages', component: AdvantagesManagerComponent, canActivate: [AuthGuard] },
      // { path: 'reviews', component: ReviewsManagerComponent, canActivate: [AuthGuard] },
      // { path: 'countries', component: CountryManagerComponent, canActivate: [AuthGuard] },
      // { path: 'offers', component: AdminBase, canActivate: [AuthGuard] },
      // { path: 'feedbacks', component: FeedbacksComponent, canActivate: [AuthGuard] },
      // { path: 'questions', component: QuestionsManagerComponent, canActivate: [AuthGuard] },
      // { path: 'visa', component: VisaManagerComponent, canActivate: [AuthGuard] },
      // { path: 'tours', component: ToursManagerComponent, canActivate: [AuthGuard] },
      // { path: 'articles', component: ArticlesManagerComponent, canActivate: [AuthGuard] },
      // { path: 'profession', component: ProfessionManagerComponent, canActivate: [AuthGuard] },
      // { path: 'banners', component: BannersManagerComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/admin/programs', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
