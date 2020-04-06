import { NgModule } from '@angular/core';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { SharedModule } from '../shared/shared.module';
import { BlockAuditoriumComponent } from './block-auditorium/block-auditorium.component';
import { BlockIncludedComponent } from './block-included/block-included.component';
import { BlockLivingComponent } from './block-living/block-living.component';
import { BlockPlanComponent } from './block-plan/block-plan.component';
import { BlockProgramInfoComponent } from './block-program-info/block-program-info.component';
import { BlockScheduleComponent } from './block-schedule/block-schedule.component';
import { PageProgramDetailsComponent } from './page-program-details/page-program-details.component';
import { PageProgramsComponent } from './page-programs/page-programs.component';
import { PhotoComponent } from './photo/photo.component';
import { ProgramsRoutingModule } from './programs-routing.module';
import { UpcomingTourComponent } from './upcoming-tour/upcoming-tour.component';

@NgModule({
  declarations: [
    PageProgramsComponent,
    PageProgramDetailsComponent,
    UpcomingTourComponent,
    BlockProgramInfoComponent,
    BlockAuditoriumComponent,
    BlockScheduleComponent,
    BlockLivingComponent,
    BlockIncludedComponent,
    BlockPlanComponent,
    PhotoComponent,
  ],
  imports: [ProgramsRoutingModule, SharedModule, NgxImageGalleryModule],
})
export class ProgramsModule {}
