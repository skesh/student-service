import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PageVacationsComponent } from './page-vacations/page-vacations.component';
import { VacationsRoutingModule } from './vacations-routing.module';

@NgModule({
  declarations: [PageVacationsComponent],
  imports: [VacationsRoutingModule, SharedModule],
})
export class VacationsModule {}
