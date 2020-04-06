import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LearningRoutingModule } from './learning-routing.module';
import { PageLearningComponent } from './page-learning/page-learning.component';

@NgModule({
  declarations: [PageLearningComponent],
  imports: [SharedModule, LearningRoutingModule],
})
export class LearningModule {}
