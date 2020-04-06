import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutPageComponent],
  imports: [SharedModule, AboutRoutingModule]
})
export class AboutModule {}
