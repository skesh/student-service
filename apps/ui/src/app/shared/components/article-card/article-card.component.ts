import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDataService } from '../../../core/file-data.service';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnChanges {
  @Input() article: Article;
  image$: Observable<string>;

  constructor(private file: FileDataService) {}

  ngOnChanges() {
    if (this.article && this.article.image) {
      this.image$ = this.file.getFileUrl(this.article.image);
    }
  }
}
