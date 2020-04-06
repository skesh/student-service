import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';
import { AfsService } from '../../core/afs.service';
import { FileDataService } from '../../core/file-data.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  articleId$ = this.route.params.pipe(pluck('id'));
  atricle$ = this.route.params.pipe(
    pluck('id'),
    switchMap(id => this.afs.getItemById('articles', id))
  );

  image$ = this.atricle$.pipe(
    pluck('image'),
    switchMap((url: string) => (url ? this.file.getFileUrl(url) : null))
  );

  constructor(
    private route: ActivatedRoute,
    private afs: AfsService,
    private file: FileDataService
  ) {}

  ngOnInit() {}
}
