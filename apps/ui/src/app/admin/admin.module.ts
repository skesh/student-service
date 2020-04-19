import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdvantagesManagerComponent } from './advantages-manager/advantages-manager.component';
import { BannersManagerComponent } from './banners-manager/banners-manager.component';
import { AdminBase } from './base/base.component';
import { ConfigurationService } from './configuration.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgramsManagerComponent } from './programs-manager/programs-manager.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdvantagesManagerComponent,
    LoginComponent,
    BannersManagerComponent,
    ProgramsManagerComponent,
    AdminBase,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule,
    DynamicFormModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatTabsModule,
    AngularEditorModule,
  ],
  providers: [DynamicFormComponent, ConfigurationService, DatePipe],
})
export class AdminModule {}
