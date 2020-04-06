import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogRoutingModule } from './blog-routing.module';
import { ArticlePageComponent } from './article-page/article-page.component';

@NgModule({
  imports: [SharedModule, BlogRoutingModule],
  declarations: [BlogPageComponent, ArticlePageComponent]
})
export class BlogModule {}
