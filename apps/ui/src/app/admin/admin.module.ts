import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdvantagesManagerComponent } from './advantages-manager/advantages-manager.component';
import { ArticlesManagerComponent } from './articles-manager/articles-manager.component';
import { BannersManagerComponent } from './banners-manager/banners-manager.component';
import { AdminBase } from './base.component';
import { CountryManagerComponent } from './country-manager/country-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { FieldsService } from './fields.map';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { ProfessionManagerComponent } from './profession-manager/profession-manager.component';
import { ProgramsManagerComponent } from './programs-manager/programs-manager.component';
import { QuestionsManagerComponent } from './questions-manager/questions-manager.component';
import { ReviewsManagerComponent } from './reviews-manager/reviews-manager.component';
import { ToursManagerComponent } from './tours-manager/tours-manager.component';
import { VisaManagerComponent } from './visa-manager/visa-manager.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdvantagesManagerComponent,
    ProgramsManagerComponent,
    ReviewsManagerComponent,
    ReviewsManagerComponent,
    CountryManagerComponent,
    OffersComponent,
    FeedbacksComponent,
    QuestionsManagerComponent,
    VisaManagerComponent,
    ToursManagerComponent,
    ArticlesManagerComponent,
    ProfessionManagerComponent,
    LoginComponent,
    BannersManagerComponent,
    AdminBase,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    DynamicFormModule,
    AngularFireAuthModule,
    CKEditorModule,
  ],
  providers: [DynamicFormComponent, FieldsService],
})
export class AdminModule {}
