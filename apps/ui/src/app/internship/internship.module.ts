import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InternshipRoutingModule } from './internship-routing.module';
import { PageInternshipComponent } from './page-internship/page-internship.component';

@NgModule({
  declarations: [PageInternshipComponent],
  imports: [InternshipRoutingModule, SharedModule]
})
export class InternshipModule {}
