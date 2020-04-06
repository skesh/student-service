import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';

const routes: Routes = [
  { path: '', component: BlogPageComponent, data: { filter: null } },
  { path: ':id', component: ArticlePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
