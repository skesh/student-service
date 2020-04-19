import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { SharedModule } from '../shared/shared.module';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
const components = [DynamicFormComponent, DynamicFormFieldComponent];
const datepickerModules = [OwlDateTimeModule, OwlNativeDateTimeModule];

@NgModule({
  declarations: [...components],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ...datepickerModules,
    SharedModule,
    AngularEditorModule,
  ],
  exports: [...components, ...datepickerModules],
  providers: [{ provide: OWL_DATE_TIME_LOCALE, useValue: 'ru' }],
})
export class DynamicFormModule {}
