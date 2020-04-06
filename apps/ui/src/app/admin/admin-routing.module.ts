import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvantagesManagerComponent } from './advantages-manager/advantages-manager.component';
import { ArticlesManagerComponent } from './articles-manager/articles-manager.component';
import { AuthGuard } from './auth.guard';
import { BannersManagerComponent } from './banners-manager/banners-manager.component';
import { CountryManagerComponent } from './country-manager/country-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { ProfessionManagerComponent } from './profession-manager/profession-manager.component';
import { ProgramsManagerComponent } from './programs-manager/programs-manager.component';
import { QuestionsManagerComponent } from './questions-manager/questions-manager.component';
import { ReviewsManagerComponent } from './reviews-manager/reviews-manager.component';
import { ToursManagerComponent } from './tours-manager/tours-manager.component';
import { VisaManagerComponent } from './visa-manager/visa-manager.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'programs', component: ProgramsManagerComponent, canActivate: [AuthGuard] },
      { path: 'advantages', component: AdvantagesManagerComponent, canActivate: [AuthGuard] },
      { path: 'reviews', component: ReviewsManagerComponent, canActivate: [AuthGuard] },
      { path: 'countries', component: CountryManagerComponent, canActivate: [AuthGuard] },
      { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
      { path: 'feedbacks', component: FeedbacksComponent, canActivate: [AuthGuard] },
      { path: 'questions', component: QuestionsManagerComponent, canActivate: [AuthGuard] },
      { path: 'visa', component: VisaManagerComponent, canActivate: [AuthGuard] },
      { path: 'tours', component: ToursManagerComponent, canActivate: [AuthGuard] },
      { path: 'articles', component: ArticlesManagerComponent, canActivate: [AuthGuard] },
      { path: 'profession', component: ProfessionManagerComponent, canActivate: [AuthGuard] },
      { path: 'banners', component: BannersManagerComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/admin/programs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
