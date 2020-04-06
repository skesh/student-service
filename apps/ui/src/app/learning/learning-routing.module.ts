import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLearningComponent } from './page-learning/page-learning.component';

const routes: Routes = [{ path: '', component: PageLearningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningRoutingModule {}
