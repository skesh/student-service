import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AfsService } from '../../core/afs.service';
import { ArticleTypes } from '../../shared/enums/article-types.enum';
import { Article } from '../../shared/interfaces/article.interface';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  articles$: Observable<Article[]> = this.afs.getItems('articles');
  articleTypesEnum = ArticleTypes;
  filterType = null;

  get articleTypes() {
    return Object.keys(ArticleTypes);
  }

  filter = (articles: Article[]) =>
    this.filterType ? articles.filter(article => article.type === this.filterType) : articles;

  constructor(private afs: AfsService, private route: ActivatedRoute) {}

  setFilter(type: string) {
    this.filterType = this.filterType === type ? null : type;
  }

  ngOnInit() {
    // TODO: узнать можно ли в таких конструкциях как-то написать as что-то что не повторяться
    if (this.route.snapshot.params['filter']) {
      this.filterType = this.route.snapshot.params['filter'];
    }
  }
}
